'use strict';

var dns = require('dns');

var emailRe = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/;

var hostnameSpecificRules = [{
  hostname: /g(oogle)?mail\.com/i,
  validate: function(username) {
    if (username.split('+')[0].length < 6) return false;
    return true;
  },
}, {
  hostname: /yahoo\.(com|[a-z]{2})/i,
  validate: function(username) {
    if (username.length < 4) return false;
    return true;
  },
}];

function validUsernameForHostname(username, hostname) {
  for (var rule of hostnameSpecificRules) {
    if (rule.hostname.test(hostname)) {
      return rule.validate(username, hostname);
    }
  }
  return true;
}

function dnsResolve(hostname, rrtype) {
  return function(callback) {
    dns.resolve(hostname, rrtype, callback);
  };
}

module.exports = function * checkEmail(email) {
  email = email.toLowerCase();
  if (!emailRe.test(email)) return false;
  var emailParts = email.split('@');
  var username = emailParts[0];
  var hostname = emailParts[1];
  if (!validUsernameForHostname(username, hostname)) return false;
  var record;
  for (var type of ['MX', 'A']) {
    try {
      record = yield dnsResolve(hostname, type);
    } catch (e) {}
    if (record) return true;
  }
  return false;
};
