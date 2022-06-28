
const axios = require('axios')
const { justProvinces, provinces } = require('../cache')


async function getState() {
    return new Promise(async function (resolve, reject) {
        try {
            let { data } = await axios.get('https://divar.ir')
            const [startingPhrase, endingPhrase] = ['window.__PRELOADED_STATE__ =', 'redirectOnChange\\":true}}']
            const [from, to] = [
                data.indexOf(startingPhrase) + startingPhrase.length + 1,
                data.indexOf(endingPhrase) + endingPhrase.length + 1
            ]
            const state = JSON.parse(eval(data.slice(from, to)))
            return resolve(state)
        } catch (e) {
            reject(e)
        }
    })
}

function getProvinceFromState(state) {
    return state["multiCity"]["data"]["children"]
}

function cityObjectBuilder(city) {
    return {
        id: city.id,
        name: city.name,
        slug: city.slug
    }
}

function provinceObjectBuilder(province, withCity = true) {
    return {
        id: province.id,
        name: province.name,
        slug: province.slug,
        cities: withCity ? province.children.slice(1, -1).map(cityObjectBuilder) : []
    }
}

async function getProvinces() {
    return new Promise(async function (resolve, reject) {
        try {
            let state = await getState()
            const ProvinceList = getProvinceFromState(state)
            const output = ProvinceList.map(provinceObjectBuilder)
            // console.log(JSON.stringify(output))
            resolve(output)
        } catch (e) {
            reject(e)
        }
    })
}

async function getProvincesNames() {
    return new Promise(async function (resolve, reject) {
        try {
            let state = await getState()
            const ProvinceList = getProvinceFromState(state)
            const output = ProvinceList.map(s => provinceObjectBuilder(s, false))
            // console.log(JSON.stringify(output))
            resolve(output)
        } catch (e) {
            reject(e)
        }
    })
}

getProvinces().then()

module.exports = {
    justProvinces: getProvincesNames,
    provinces: getProvinces,
    offline: { justProvinces, provinces }
}