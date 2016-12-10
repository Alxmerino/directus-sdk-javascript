const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('sinon-chai'));

const request = require('request');

const DirectusSDK = require('../index');

const client = new DirectusSDK('accessToken-Key', {
  baseUrl: 'http://test.com/api'
});

describe('ClientRemote methods', () => {
  it('getTables', () => {
    const requestStub = sinon.stub(request, 'get');
    client.getTables();
    requestStub.restore();
    expect(requestStub).to.have.been.calledWith({
      auth: { bearer: 'accessToken-Key' },
      qs: {},
      url: 'http://test.com/api/1/tables'
    });
  });

  it('getTable', () => {
    expect(() => {
      client.getTable();
    }).to.throw(Error);

    const requestStub = sinon.stub(request, 'get');
    client.getTable('test');
    requestStub.restore();
    expect(requestStub).to.have.been.calledWith({
      auth: { bearer: 'accessToken-Key' },
      qs: {},
      url: 'http://test.com/api/1/tables/test'
    });
  });

  it('getColumns', () => {
    expect(() => {
      client.getColumns();
    }).to.throw(Error);

    const requestStub = sinon.stub(request, 'get');
    client.getColumns('test', {foo: 'bar'});
    requestStub.restore();
    expect(requestStub).to.have.been.calledWith({
      auth: { bearer: 'accessToken-Key' },
      qs: {foo: 'bar'},
      url: 'http://test.com/api/1/tables/test/columns'
    });
  });

  it('getColumn', () => {
    expect(() => {
      client.getColumn();
    }).to.throw(Error);

    const requestStub = sinon.stub(request, 'get');
    client.getColumn('test', 'baz');
    requestStub.restore();
    expect(requestStub).to.have.been.calledWith({
      auth: { bearer: 'accessToken-Key' },
      qs: {},
      url: 'http://test.com/api/1/tables/test/columns/baz'
    });
  });

  it('getEntries', () => {
    expect(() => {
      client.getEntries();
    }).to.throw(Error);

    const requestStub = sinon.stub(request, 'get');
    client.getEntries('test', {foo: 'bar'});
    requestStub.restore();
    expect(requestStub).to.have.been.calledWith({
      auth: { bearer: 'accessToken-Key' },
      qs: {foo: 'bar'},
      url: 'http://test.com/api/1/tables/test/rows'
    });
  });

  it('getEntry', () => {
    expect(() => {
      client.getEntry();
    }).to.throw(Error);

    const requestStub = sinon.stub(request, 'get');
    client.getEntry('test', 2, {foo: 'bar'});
    requestStub.restore();
    expect(requestStub).to.have.been.calledWith({
      auth: { bearer: 'accessToken-Key' },
      qs: {foo: 'bar'},
      url: 'http://test.com/api/1/tables/test/rows/2'
    });
  });

  it('getUsers', () => {
    const entryStub = sinon.stub(client, 'getEntries');

    client.getUsers({foo: 'bar'});

    entryStub.restore();
    expect(entryStub).to.have.been.calledWith('directus_users', {foo: 'bar'});
  });

  it('getUser', () => {
    const entryStub = sinon.stub(client, 'getEntry');

    client.getUser(2, {foo: 'bar'});

    entryStub.restore();
    expect(entryStub).to.have.been.calledWith('directus_users', 2, {foo: 'bar'});
  });

  it('getGroups', () => {
    const requestStub = sinon.stub(request, 'get');
    client.getGroups('test');
    requestStub.restore();
    expect(requestStub).to.have.been.calledWith({
      auth: { bearer: 'accessToken-Key' },
      qs: {},
      url: 'http://test.com/api/1/groups'
    });
  });

  it('getGroup', () => {
    expect(() => {
      client.getGroup();
    }).to.throw(Error);

    const requestStub = sinon.stub(request, 'get');
    client.getGroup(2, {foo: 'bar'});
    requestStub.restore();
    expect(requestStub).to.have.been.calledWith({
      auth: { bearer: 'accessToken-Key' },
      qs: {foo: 'bar'},
      url: 'http://test.com/api/1/groups/2'
    });
  });

  /**
   * Methods that still need a test:
   * - getGroupPrivileges
   * - getFiles
   * - getFile
   * - getSettings
   * - getSettingsByCollection
   * - createEntry
   * - updateEntry
   * - deleteEntry
   * - createUser
   * - updateUser
   * - deleteUser
   * - createFile
   * - updateFile
   * - deleteFile
   */
});
