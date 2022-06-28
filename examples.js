const { justProvinces, provinces } = require('./lib/index')

async function run() {
    const [pureList, fullList] = [await justProvinces(), await provinces()]
    console.table(pureList)
    console.table(fullList)
}

run()



