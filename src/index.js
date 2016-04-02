var q0 = require('wget-q0')
var Kefir = require('kefir')

// kv-like object kv
// device name n
// update ip interval i
module.exports = (kv, n, i, u) => {

  if (!kv || !kv.put)
    throw new Error('please provide a kv-like object!')

  if (!n)
    throw new Error('please enter a device name!')

  if (!i)
    i = 1000

  if (!u)
    u = 'http://ipecho.net/plain'

  function putS (ip) {
    return Kefir.fromNodeCallback(cb => {
      kv.put(n, ip, cb)
    })
  }

  var iS = q0(i, 'http://ipecho.net/plain')

  var uiS = Kefir.stream(emitter => {
    iS.onError(e => {
        emitter.emit(null)
      })
    iS.onValue(e => {
      emitter.emit(e)
    })
  })

  return uiS.skipDuplicates()
    .flatMap(ip => {
    return putS(ip)
  })
}
