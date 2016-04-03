var request = require('request');
var Kefir = require('kefir')
var addr = require('ip-address')
var Address6 = addr.Address6;
var Address4 = addr.Address4;

module.exports = (i, u) => {

  if (!i)
    i = 1000

  if (!u)
    u = 'http://ipecho.net/plain'

  function get (url) {
    return Kefir.stream(emitter => {
      request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          emitter.emit(body) // Show the HTML for the Google homepage. 
        }
        else
          emitter.error(error)
      })
    })
  }

  var iS = Kefir.merge([
        Kefir.constant(1),
        Kefir.interval(i),
      ])
      .map(x => u)
      .flatMap(get)

  var i4S = iS
      .filter(a => {
        var ad = new Address4(a)
        return ad.isValid()
      })
  var i6S = iS
      .filter(a => {
        var ad = new Address6(a)
        return ad.isValid()
      })


  var i46S = Kefir.merge([i6S, i4S])

  var uiS = Kefir.stream(emitter => {
    i46S.onError(e => {
        emitter.emit(null)
      })
    i46S.onValue(e => {
      emitter.emit(e)
    })
  })

  return uiS.skipDuplicates()
}
