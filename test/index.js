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

test('gets ip' , t => {
  t.plan(1)
  var mod = require('..')
  var S = mod()
  S.onValue(i => {
    t.ok(i, 'get an ip address')
    t.end()
  })
  S.onError(e => {
    t.notOk(e, 'shouldnt see an error!')
  })
})

test('validates ip' , t => {
  var mod = require('..')
  var S = mod(1000, 'http://cnn.com')
  S.onValue(i => {
    t.notOk(i, 'we shouldnt see this trash')
    t.end()
    process.exit(0)
  })
  setTimeout(() => {
    t.end()
    process.exit(0)
  }, 1000)
})
