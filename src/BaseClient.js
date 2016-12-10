const vsprintf = require('sprintf-js').vsprintf;
const request = require('request');
const Args = require('args-js');

/**
 * Abstract Base Client Remote
 *
 * based on the php version by Welling Guzmán
 *
 * @author Rijk van Zanten <rijkvanzanten@me.com>
 */
class BaseClient {
  /**
   * Constructor of Client
   *
   * @param {str} accessToken
   * @param {obj} options
   */
  constructor() {
    const args = Args([
      {accessToken: Args.STRING | Args.Required},
      {options: Args.OBJECT | Args.Required}
    ], arguments);

    this.apiVersion = args.options.apiVersion || 1;
    this.accessToken = args.accessToken;

    if(!args.options.instanceKey && !args.options.baseUrl) throw new Error('You need to provide an instance key to a hosted Directus installation, or provide your own base url.');
    if(args.options.instanceKey && args.options.baseUrl) throw new Error("You can't provide an instance key and a base url. Please choose one of the two connection methods."); // eslint-disable-line

    if(args.options.instanceKey) {
      this.instanceKey = args.options.instanceKey;
      this.baseEndpoint = `https://${args.options.instanceKey}.directus.io/api/${this.apiVersion}/`;
    } else {
      if(args.options.baseUrl.match(/api\/?$/)) {
        this.baseEndpoint = `${args.options.baseUrl.replace(/\/$/g, '')}/${this.apiVersion}/`;
      } else {
        this.baseEndpoint = `${args.options.baseUrl.replace(/\/$/g, '')}/api/${this.apiVersion}/`;
      }
    }
  }

  performRequest() {
    const args = Args([
      {method: Args.STRING | Args.Required},
      {pathFormat: Args.STRING | Args.Required},
      {variables: Args.ARRAY | Args.Optional, _default: []},
      {paramsOrBody: Args.OBJECT | Args.Optional, _default: {}},
      {callback: Args.FUNCTION | Args.Required}
    ], arguments);

    const url = args.pathFormat.indexOf('%s') === -1 ?
      this.baseEndpoint + args.pathFormat :
      this.baseEndpoint + this.buildPath(args.pathFormat, args.variables);

    const errorHandler = function(err, res, body) {
      if(err) throw new Error(err);

      if(!err && res.statusCode == 200) {
        args.callback(null, JSON.parse(body));
      } else if(res.statusCode == 500) {
        args.callback(url + ' returned internal server error (500)');
      } else if(res.statusCode == 404) {
        args.callback(url + ' returned not found (404)');
      } else if(res.statusCode == 403) {
        args.callback(url + ' returned not authorized (403)');
      }
    };

    switch(args.method) {
      case 'GET':
        request.get({
          auth: {
            bearer: this.accessToken
          },
          qs: args.paramsOrBody,
          url,
        }, errorHandler);
        break;

      case 'POST':
        request.post({
          auth: {
            bearer: this.accessToken
          },
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(args.paramsOrBody),
          url,
        }, errorHandler);
        break;

      case 'PATCH':
        request.patch({
          auth: {
            bearer: this.accessToken
          },
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(args.paramsOrBody),
          url,
        }, errorHandler);
        break;

      case 'DELETE':
        request.delete({
          auth: {
            bearer: this.accessToken
          },
          url
        }, errorHandler);
        break;
    }
  }

  buildPath(pathFormat, variables) {
    return vsprintf(pathFormat, variables);
  }

  get endpoints() {
    return {
      tableEntries:       'tables/%s/rows',
      tableEntry:         'tables/%s/rows/%s',
      tableList:          'tables',
      tableInformation:   'tables/%s',
      tablePreferences:   'tables/%s/preferences',
      columnList:         'tables/%s/columns',
      columnInformation:  'tables/%s/columns/%s',
      groupList:          'groups',
      groupInformation:   'groups/%s',
      groupPrivileges:    'privileges/%s',
      fileList:           'files',
      fileInformation:    'files/%s',
      settingList:        'settings',
      settingCollection:  'settings/%s'
    };
  }
}

module.exports = BaseClient;
