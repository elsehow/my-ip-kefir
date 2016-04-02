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
var test = require('tape')
var mod = require('..')

test('errors when i dont give name or kv', t => {
  t.plan(2)
  t.throws(() => {
    var S = mod(db)
  })
  t.throws(() => {
    var S = mod({}, 'juliastreet')
  })

})

test('sets ip' , t => {
  t.plan(1)
  var mod = require('..')
  var S = mod(kv, 'juliastreet')
  S.onValue(i => {
    t.ok(i, 'put an ip address')
    t.end()
    process.exit(0)
  })
  S.onError(e => {
    t.notOk(e, 'shouldnt see an error!')
  })
})
