# my-ip-kefir

a kefir stream of your IP addresses

## example
```javascript
ipkv().log('i put a new IP address in the kv!')
```

try turning your network adaptor on and off - notice it update key value with `null` and `ip` accordingly.

## api

### ipkv([updateInterval=1000], [url='http://ipecho.net/plain']) 

returns a stream of ip addresses 

`updateInverval` (ms) how often to check `url` to see if we have a new IP address

`url` is some url that delivers plaintext IP addresses on `wget -qO`

## license

BSD
