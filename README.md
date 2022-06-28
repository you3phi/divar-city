# 🌍 Iran Provinces Full List

A npm package for get provinces and cities from divar.ir | opensource iran provinces and cities

## ⚙️ Usage

There are two async function :

|                |Function name                          |Description                         |
|----------------|-------------------------------|-----------------------------|
|Just List|`const {justProvinces} = require('cityir')`            |returns a Promise to fetch Array of all provinces [online]          |
|List with cities           |`const {provinces} = require('cityir')`            |returns a Promise to fetch Array of all provinces with cities of each province [online]            |
|Just List|`const {justProvinces} = require('cityir').offline`            |returns an Array of all provinces [offline]          |
|List with cities           |`const {provinces} = require('cityir').offline`            |returns an Array of all provinces with cities of each province [offline]            |

# Examples

```javascript
// async example to fetch online data
const { justProvinces, provinces } = require('./lib/index')

async  function  run() {
 const [pureList, fullList] = [await  justProvinces(), await  provinces()]
 console.table(pureList)
 console.table(fullList)
}
run()
```

```javascript
// sync offline data - read from cached file
const { justProvinces, provinces } = require('./lib/index').offline

console.table(justProvinces)
console.table(provinces)
```
