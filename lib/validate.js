'use strict';

var dns = require('dns');

var emailRe = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/;

function dnsResolve(hostname, rrtype) {
  return function(callback) {
    dns.resolve(hostname, rrtype, callback);
  };
}

module.exports = function * checkEmail(email) {
  if (!emailRe.test(email)) return false;
  var hostname = email.split('@')[1];
  var record;
  for (var type of ['MX', 'A']) {
    try {
      record = yield dnsResolve(hostname, type);
    } catch (e) {}
    if (record) return true;
  }
};
