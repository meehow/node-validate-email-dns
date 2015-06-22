'use strict';

var co = require('co');
var validate = require('..');

var randomDomain = Math.random().toString(35).substr(2, 60) + '.com';

describe('Email validation', function() {

  it('succeeds on domain with MX record', function() {
    return co(function * () {
      return yield validate('hostmaster@github.com');
    });
  });

  it('succeeds on domain without MX record, but with A record', function() {
    return co(function * () {
      return yield validate('hostmaster@example.com');
    });
  });

  it('fails on non-existing domain', function() {
    return co(function * () {
      return yield validate('postmaster@' + randomDomain);
    }).then(function() {
      throw new Error('wtf');
    }).catch(function() {});
  });

    it('fails on wrong address', function() {
    return co(function * () {
      return yield validate('postmaster@doesnt_exist.com');
    }).then(function() {
      throw new Error('wtf');
    }).catch(function() {});
  });
});
