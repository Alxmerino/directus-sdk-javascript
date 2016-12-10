const BaseClient = require('./BaseClient');
const q = require('q');
const Args = require('args-js');

class ClientRemote extends BaseClient {
  constructor() {
    super(...arguments);
  }

  /**
   * Gets list of all tables
   *
   * @param {fn}    callback (optional)
   */
  getTables() {
    const args = Args([
      {callback:  Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    this.performRequest('GET', this.endpoints.tableList, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }

  /**
   * Get information of single table
   * @param {str} table (required)
   * @param {fn} callback (optional)
   */
  getTable() {
    const args = Args([
      {table: Args.STRING | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [
      args.table
    ];

    this.performRequest('GET', this.endpoints.tableInformation, variables, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }

  /**
   * Get all columns from a single table
   *
   * @param {string}  table    (required)
   * @param {obj}     params  (optional)
   * @param {fn}      callback (optional)
   */
  getColumns() {
    const args = Args([
      {table: Args.STRING | Args.Required},
      {params: Args.OBJECT | Args.Optional, _default: {}},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [
      args.table
    ];

    this.performRequest('GET', this.endpoints.columnList, variables, args.params, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }

  /**
   * Get info of single column
   * @param {str} table (required)
   * @param {str} column (required)
   * @param {fn} callback (optional)
   */
  getColumn() {
    const args = Args([
      {table: Args.STRING | Args.Required},
      {column: Args.STRING | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [
      args.table, args.column
    ];

    this.performRequest('GET', this.endpoints.columnInformation, variables, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }

  /**
   * Get multiple items from a table
   *
   * @param {string}  table     (required)
   * @param {obj}     params   (optional)
   * @param {fn}      callback  (optional)
   */
  getEntries() {
    const args = Args([
      {table: Args.STRING | Args.Required},
      {params: Args.OBJECT | Args.Optional, _default: {}},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [
      args.table
    ];

    this.performRequest('GET', this.endpoints.tableEntries, variables, args.params, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }

  /**
   * Get a single item from a table
   *
   * @param {string}  table     (required)
   * @param {int}     id        (required)
   * @param {obj}     params   (optional)
   * @param {fn}      callback  (optional)
   */
  getEntry() {
    const args = Args([
      {table: Args.STRING | Args.Required},
      {id: Args.INT | Args.Required},
      {params: Args.OBJECT | Args.Optional, _default: {}},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);
    const deferred = q.defer();

    const variables = [
      args.table,
      args.id
    ];

    this.performRequest('GET', this.endpoints.tableEntry, variables, args.params, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }

  /**
   * Get all users, groups and permissions
   *
   * @param {obj} params (optional)
   * @param {fn} callback (optional)
   */
  getUsers() {
    const args = Args([
      {params: Args.OBJECT | Args.Optional, _default: {}},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);
    return this.getEntries('directus_users', args.params, args.callback);
  }

  /**
   * Get single user
   *
   * @param {int}   id        (required)
   * @param {obj}   params   (optional)
   * @param {fn}    callback  (optional)
   */
  getUser() {
    const args = Args([
      {id: Args.INT | Args.Required},
      {params: Args.OBJECT | Args.Optional, _default: {}},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);
    return this.getEntry('directus_users', args.id, args.params, args.callback);
  }

  /**
   * Get all user groups
   *
   * @param {obj} params (optional)
   * @param {fn} callback (optional)
   */
  getGroups() {
    const args = Args([
      {params: Args.OBJECT | Args.Optional, _default: {}},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    this.performRequest('GET', this.endpoints.groupList, args.params, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }

  /**
   * Get single user group
   *
   * @param {int} id
   * @param {obj} params
   */
  getGroup() {
    const args = Args([
      {id: Args.INT | Args.Required},
      {params: Args.OBJECT | Args.Optional, _default: {}}
    ], arguments);

    const deferred = q.defer();

    const variables = [
      args.id
    ];

    this.performRequest('GET', this.endpoints.groupInformation, variables, args.params, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }

  /**
   * Get privileges of group
   *
   * @param {int} id
   * @param {fn} callback
   */
  getGroupPrivileges() {
    const args = Args([
      {id: Args.INT | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.id];

    this.performRequest('GET', this.endpoints.groupPrivileges, variables, args.params, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }

  /**
   * Get files
   *
   * @param {obj} params
   * @param {fn} callback
   */
  getFiles() {
    const args = Args([
      {params: Args.OBJECT | Args.Optional, _default: {}},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    this.performRequest('GET', this.endpoints.fileList, args.params, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }

  /**
   * Get info of single file
   *
   * @param {int} id
   * @param {obj} params
   * @param {fn} callback
   */
  getFile() {
    const args = Args([
      {id: Args.INT | Args.Required},
      {params: Args.OBJECT | Args.Optional, _default: {}},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.id];

    this.performRequest('GET', this.endpoints.fileInformation, variables, args.params, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }

  /**
   * Get settings
   *
   * @param {fn} callback (optional)
   */
  getSettings() {
    const args = Args([
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    this.performRequest('GET', this.endpoints.settingList, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }

  /**
   * Get settings by collection name
   *
   * @param {str} collectionName (required)
   * @param {fn} callback (optional)
   */
  getSettingsByCollection() {
    const args = Args([
      {collectionName: Args.STRING | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.collectionName];

    this.performRequest('GET', this.endpoints.settingCollection, variables, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }

  /**
   * @TODO: add getMessages endpoint support
   *     -> endpoint not available in APIv1
   *
   * @param {fn} callback
   */
  getMessages() {
    const args = Args([
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    deferred.reject('');

    return deferred.nodeify(args.callback);
  }

  /**
   * Create new entry
   *
   * @param {str} table
   * @param {obj} data to be submitted
   * @param {fn} callback
   */
  createEntry() {
    const args = Args([
      {table: Args.STRING | Args.Required},
      {data: Args.OBJECT | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.table];

    this.performRequest('POST', this.endpoints.tableEntries, variables, args.data, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }

  /**
   * Update single row in table
   *
   * @param {str} table
   * @param {int} id
   * @param {obj} data
   * @param {fn} callback
   */
  updateEntry() {
    const args = Args([
      {table: Args.STRING | Args.Required},
      {id: Args.INT | Args.Required},
      {data: Args.OBJECT | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.table, args.id];

    this.performRequest('PATCH', this.endpoints.tableEntry, variables, args.data, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }

  /**
   * Delete single entry
   *
   * @param {str} table (required)
   * @param {int} id (required)
   * @param {bool} deleteFromDB [soft-delete or delete] (optional)
   */
  deleteEntry() {
    const args = Args([
      {table: Args.STRING | Args.Required},
      {id: Args.INT | Args.Required},
      {deleteFromDB: Args.BOOL | Args.Optional, _default: false},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.table, args.id];

    if(args.deleteFromDB) {
      this.performRequest('DELETE', this.endpoints.tableEntry, variables, (err, res) => {
        if(err) deferred.reject(err);
        deferred.resolve(res);
      });
    } else {
      this.performRequest('PATCH', this.endpoints.tableEntry, variables, {active: 0}, (err, res) => {
        if(err) deferred.reject(err);
        deferred.resolve(res);
      });
    }

    return deferred.promise.nodeify(args.callback);
  }

  /**
   * Create entry in directus_users tables
   *
   * @param {obj} data (required)
   * @param {fn} callback (optional)
   */
  createUser() {
    const args = Args([
      {data: Args.OBJECT | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    this.createEntry('directus_users', args.data, args.callback);
  }

  /**
   * Update entry in directus_users table
   *
   * @param {int} id (required)
   * @param {ob} data (required)
   * @param {fn} callback (optional)
   */
  updateUser() {
    const args = Args([
      {id: Args.INT | Args.Required},
      {data: Args.OBJECT | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    this.updateEntry('directus_users', args.id, args.data, args.callback);
  }

  /**
   * Delete entry from directus_users table
   *
   * @param {int} id (required)
   * @param {bool} deleteFromDB [soft-delete or delete] (optional)
   * @param {fn} callback (optional)
   */
  deleteUser() {
    const args = Args([
      {id: Args.INT | Args.Required},
      {deleteFromDB: Args.BOOL | Args.Optional, _default: false},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    this.deleteEntry('directus_users', args.id, args.deleteFromDB, args.callback);
  }

  /**
   * Create entry in directus_files tables
   *
   * @param {obj} data (required)
   * @param {fn} callback (optional)
   */
  createFile() {
    const args = Args([
      {data: Args.OBJECT | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    this.createEntry('directus_files', args.data, args.callback);
  }

  /**
   * Update entry in directus_files table
   *
   * @param {int} id (required)
   * @param {ob} data (required)
   * @param {fn} callback (optional)
   */
  updateFile() {
    const args = Args([
      {id: Args.INT | Args.Required},
      {data: Args.OBJECT | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    this.updateEntry('directus_files', args.id, args.data, args.callback);
  }

  /**
   * Delete entry from directus_files table
   *
   * @param {int} id (required)
   * @param {bool} deleteFromDB [soft-delete or delete] (optional)
   * @param {fn} callback (optional)
   */
  deleteFile() {
    const args = Args([
      {id: Args.INT | Args.Required},
      {deleteFromDB: Args.BOOL | Args.Optional, _default: false},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    this.deleteEntry('directus_files', args.id, args.deleteFromDB, args.callback);
  }
}

module.exports = ClientRemote;
