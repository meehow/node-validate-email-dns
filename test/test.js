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

  it('succeeds on gmail address with 6 characters username', function * () {
    assert(yield validate('asdasd@gmail.com'));
  });

  it('succeeds on yahoo address with 4 characters username', function * () {
    assert(yield validate('four@yahoo.com'));
  });

  it('fails on gmail address with less than 6 characters username', function * () {
    assert.equal(yield validate('asd+asd@googlemail.com'), false);
  });

  it('fails on yahoo address with less than 4 characters username', function * () {
    assert.equal(yield validate('asd@yahoo.de'), false);
  });

  it('fails on non-existing domain', function * () {
    assert.equal(yield validate('postmaster@' + randomDomain), false);
  });

  it('fails on wrong address', function * () {
    assert.equal(yield validate('postmaster@doesnt_exist.com'), false);
  });
});
