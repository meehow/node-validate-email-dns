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
