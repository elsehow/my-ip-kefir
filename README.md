# my-ip-kv

associate your ip with a device name, in a kv-like structure (e.g. [level](https://www.npmjs.com/package/level) or [hyperkv](https://github.com/substack/hyperkv) - anything that exposes a method `.put(key, value, cb)`).

## example
```javascript
var sub = require('subleveldown')
var level = require('level')
var db = level('/tmp/k.db')
var hyperlog = require('hyperlog')
var hyperkv = require('hyperkv')
var log = hyperlog(sub(db, 'log'), { valueEncoding: 'json' })
var kv = hyperkv({
  log: log,
  db: sub(db, 'k')
})
var ipkv = require('my-ip-kv')

ipkv(kv, 'juliastreet').log('i put a new IP address in the kv!')
```

try turning your network adaptor on and off - notice it update key value with `null` and `ip` accordingly.

## api

### ipkv(kv, deviceName, [updateInterval=1000], [url='http://ipecho.net/plain']) 

returns a stream of ip addresses that got called on `kv.put`

if we can't retrieve an ip address, key's value in kv gets set to null.

assuming `kv.put` takes a node-style callback `cb(err, res)`, errors and values will be pushed over the stream.


`kv` is a kv-like structure that exposes `kv.put`

`deviceName` is some string, which will be the value of the ip addresses you push

`updateInverval` (ms) how often to check `url` to see if we have a new IP address

`url` is some url that delivers plaintext IP addresses on `wget -qO`

## license

BSD
