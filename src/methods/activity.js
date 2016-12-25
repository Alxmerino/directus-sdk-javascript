const Args = require('args-js');
const q = require('q');

module.exports = {
  getActivity: function() {
    const args = Args([
      {params: Args.OBJECT | Args.Optional, _default: {}},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    this.performRequest('GET', this.endpoints.activity, args.params, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }
};
