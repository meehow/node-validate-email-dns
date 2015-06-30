[![Code Climate](https://codeclimate.com/github/meehow/node-validate-email-dns/badges/gpa.svg)](https://codeclimate.com/github/meehow/node-validate-email-dns)

Installation
------------

`npm install validate-email-dns`


Usage
-----

```javascript
var co = require('co');
var validate = require('validate-email-dns');

co.wrap(validate)('test@example.com').then(function(correct) {
  if (correct) {
    console.log('This email address is correct');
  } else {
    console.log('This email address is incorrect');
  }
});
```

Features
--------
* Flow based on generators
* Checks if domain name is registered and has valid `MX` or `A` record
* Domain specific rules for popular email providers
