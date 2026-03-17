const fs = require('fs')
let s = fs.readFileSync('.env','utf8')
function fix(key){
  const prefix = key + '="postgresql://'
  const i = s.indexOf(prefix)
  if(i === -1) return false
  const start = i + prefix.length
  const j = s.indexOf('"', start)
  if(j === -1) return false
  const credAndHost = s.slice(start, j) // username:password@host:port/...?
  const colon = credAndHost.indexOf(':')
  if(colon === -1) return false
  const user = credAndHost.slice(0, colon)
  const afterUser = credAndHost.slice(colon + 1)
  const lastAt = afterUser.lastIndexOf('@')
  if(lastAt === -1) return false
  const password = afterUser.slice(0, lastAt)
  const rest = afterUser.slice(lastAt + 1)
  const encPassword = encodeURIComponent(password)
  const newCredAndHost = user + ':' + encPassword + '@' + rest
  s = s.slice(0, start) + newCredAndHost + s.slice(j)
  return true
}
const d1 = fix('DATABASE_URL')
const d2 = fix('DIRECT_URL')
fs.writeFileSync('.env', s)
console.log('fixed:', {d1,d2})
