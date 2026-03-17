const fs = require('fs')
let s = fs.readFileSync('.env','utf8')
function fix(key){
  const re = new RegExp('('+key+'="postgresql:\\/\\/[^:]+:)([^@\"]+)(@[^\"]+")')
  if(re.test(s)){
    s = s.replace(re, (m,p,a,b,c) => p + encodeURIComponent(b) + c)
    return true
  }
  return false
}
const d1 = fix('DATABASE_URL')
const d2 = fix('DIRECT_URL')
fs.writeFileSync('.env', s)
console.log('DATABASE_URL encoded:', d1, 'DIRECT_URL encoded:', d2)
