# directus-sdk-javascript
> WIP - Directus SDK for JavaScript (Node and Browser)

<p align="center">
<img src="https://s3.amazonaws.com/f.cl.ly/items/3Q2830043H1Y1c1F1K2D/directus-logo-stacked.png" alt="Directus Logo"/>
</p>

[![NPM](https://nodei.co/npm/directus-sdk-javascript.png)](https://nodei.co/npm/directus-sdk-javascript/)

## Work in progress

## Install

`npm install directus-sdk-javascript`

## Usage

### Directus Hosted
```javascript
const DirectusSDK = require('directus-sdk-javascript');

const client = new DirectusSDK('user-token', {
  // the sub-domain in your instance url
  instanceKey: 'user--instance'
});

client.getEntries('articles', (err, res) => {
  if(err) throw err;
  res.forEach((article) => {
    console.log(article.title);
  });
});
```

### Own Server
```javascript
const DirectusSDK = require('directus-sdk-javascript');

const client = new DirectusSDK('user-token', {
  baseUrl: 'http://yoursite.com/api',
  apiVersion: 1 // Optional - default 1
});

client.getEntries('articles', (err, res) => {
  if(err) throw err;
  res.forEach((article) => {
    console.log(article.title);
  });
});
```

## Supported Methods / Endpoints

_All methods can be used with either callbacks **or** promises_

_For more info on what parameters are supported: check the [official Directus API docs](http://getdirectus.com/api/overview/api-overview)_

```javascript
client.getTables([Function callback]);
```

```javascript
client.getTable(String table, [Function callback]);
```


```javascript
client.getColumns(String table, [Object params, Function callback]);
```

```javascript
client.getColumn(String table, String column, [Function callback]);
```


```javascript
client.getEntries(String table, [Object params, Function callback]);
```

```javascript
client.getEntry(String table, Number id, [Object params, Function callback]);
```

```javascript
client.createEntry(String table, Object data, [Function callback]);
```

```javascript
client.updateEntry(String table, Number id, Object data, [Function callback]);
```

```javascript
client.deleteEntry(String table, Number id, [deleteFromDB: Boolean = false, Function callback]);
```


```javascript
client.getUser([Object params, Function callback]);
```

```javascript
client.getUser(Number id, [Object params, Function callback]);
```

```javascript
client.createUse(Object data, [Function callback]);
```

```javascript
client.updateUser(Number id, Object data, [Function callback]);
```

```javascript
client.deleteUser(Number id, [deleteFromDB: Boolean = false, Function callback]);
```


```javascript
client.getGroup([Object params, Function callback]);
```

```javascript
client.getGroup(Number id, [Object params, Function callback]);
```

```javascript
client.getGroupPrivileges(Number id, [Function callback]);
```


```javascript
client.getFile([Object params, Function callback]);
```

```javascript
client.getFile(Number id, Object params, Function callback]);
```

```javascript
client.createFile(Object data, [Function callback]);
```

```javascript
client.updateFile(Number id, Object data, [Function callback]);
```

```javascript
client.deleteFile(Number id, [deleteFromDB: Boolean = false, Function callback]);
```


```javascript
client.getSettings([Function callback]);
```

```javascript
client.getSettingsByCollection(String collectionName, [Function callback]);
```
