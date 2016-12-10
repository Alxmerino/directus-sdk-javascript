const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('sinon-chai'));

const request = require('request');

const DirectusSDK = require('../index');

const client = new DirectusSDK('accessToken-Key', {
  baseUrl: 'http://test.com/api'
});

describe('BaseClient performRequest', () => {
  it('Creates path from template string and variables', () => {
    expect(client.buildPath('/%s/test/%s/', ['foo', 'bar'])).to.equal('/foo/test/bar/');
  });

  it('Performs GET request with correct params', (done) => {
    const getRequestStub = sinon.stub(request, 'get');

    client.performRequest('GET', 'pathFormat', [], {foo: 'bar'}, () => {});

    expect(getRequestStub).to.have.been.calledWith({
      auth: { bearer: 'accessToken-Key' },
      qs: { foo: 'bar' },
      url: 'http://test.com/api/1/pathFormat'
    });

    done();

    getRequestStub.restore();
  });

  it('Performs PATCH request with correct body', (done) => {
    const getRequestStub = sinon.stub(request, 'patch');

    client.performRequest('PATCH', 'pathFormat', [], {foo: 'bar'}, () => {});

    expect(getRequestStub).to.have.been.calledWith({
      auth: { bearer: 'accessToken-Key' },
      body: JSON.stringify({ foo: 'bar' }),
      headers: { 'Content-Type': 'application/json' },
      url: 'http://test.com/api/1/pathFormat'
    });

    done();

    getRequestStub.restore();
  });

  it('Performs POST request with correct body', (done) => {
    const getRequestStub = sinon.stub(request, 'post');

    client.performRequest('POST', 'pathFormat', [], {foo: 'bar'}, () => {});

    expect(getRequestStub).to.have.been.calledWith({
      auth: { bearer: 'accessToken-Key' },
      body: JSON.stringify({ foo: 'bar' }),
      headers: { 'Content-Type': 'application/json' },
      url: 'http://test.com/api/1/pathFormat'
    });

    done();

    getRequestStub.restore();
  });
});
