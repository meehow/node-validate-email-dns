'use strict';

var assert = require('assert');
require('co-mocha');

var validate = require('..');

var randomDomain = Math.random().toString(35).substr(2, 60) + '.com';

describe('Email validation', function() {
  it('succeeds on domain with MX record', function * () {
    assert(yield validate('hostmaster@github.com'));
  });

  it('succeeds on domain without MX record, but with A record', function * () {
    assert(yield validate('hostmaster@example.com'));
  });

  it('fails on gmail address with less than 6 characters username', function * () {
    assert.equal(yield validate('asd+asd@googlemail.com'), false);
  });

  it('fails on non-existing domain', function * () {
    assert.equal(yield validate('postmaster@' + randomDomain), false);
  });

  it('fails on wrong address', function * () {
    assert.equal(yield validate('postmaster@doesnt_exist.com'), false);
  });
});
