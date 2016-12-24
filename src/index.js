function SDK(accessToken, url, apiVersion = 1) {
  if(!accessToken) throw new Error('No access token provided');
  if(!url) throw new Error('No Directus URL provided');

  this.accessToken = accessToken;
  this.url = url;
  this.apiVersion = apiVersion;

  Object.assign(this, require('./methods'));
}

module.exports = SDK;
