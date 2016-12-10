const sinon = require('sinon');
const expect = require('chai').expect;

const DirectusSDK = require('../index');

describe('BaseClient constructor', () => {
  it('Saves accessToken for later use', () => {
    const client = new DirectusSDK('accessToken-Key', {
      baseUrl: 'http://test.com/api'
    });

    expect(client.accessToken).to.equal('accessToken-Key');
  });

  it('Defaults to API version 1', () => {
    const client = new DirectusSDK('accessToken-Key', {
      baseUrl: 'http://test.com/api'
    });

    expect(client.apiVersion).to.equal(1);
  });

  it('Allows to override API version', () => {
    const client = new DirectusSDK('accessToken-Key', {
      baseUrl: 'http://test.com/api',
      apiVersion: 2
    });

    expect(client.apiVersion).to.equal(2);
  });

  it('Errors when not all required options are given', () => {
    // Missing accessToken
    expect(() => {
      const client = new DirectusSDK({});
    }).to.throw(Error);

    // Missing baseUrl / instanceKey
    expect(() => {
      const client = new DirectusSDK('accessToken-Key', {
        apiVersion: 2
      });
    }).to.throw(Error);
  });

  it('Errors when both an instanceKey and baseUrl are given', () => {
    expect(() => {
      const client = new DirectusSDK('accessToken-Key', {
        baseUrl: 'http://test.com/api',
        instanceKey: 'directus-instance'
      });
    }).to.throw(Error);
  });

  it('Sets baseEndpoint based on given instanceKey', () => {
    // Directus Instance
    const client = new DirectusSDK('accessToken-Key', {
      instanceKey: 'directus-instance'
    });

    expect(client.baseEndpoint).to.equal('https://directus-instance.directus.io/api/1/')
  });

  it('Sets baseEndpoint based on given baseUrl', () => {
    // Directus Instance
    const client = new DirectusSDK('accessToken-Key', {
      baseUrl: 'http://test.com/api'
    });

    expect(client.baseEndpoint).to.equal('http://test.com/api/1/')
  });
});
