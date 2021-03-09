const MANUFACTURERS = require('./data/manufacturers.json')
const REGIONS = require('./data/regions.json')
const YEARS = require('./data/years.json')

const REGEX = /^(?<wmi>[0-9A-HJ-NPR-Z]{3})(?<vds>[0-9A-HJ-NPR-Z]{6})(?<vis>[0-9A-HJ-NPR-Z]{8})$/

class DecodeVin {

    constructor(_vin, _wmi, _vds, _vis) {
        this._vin = _vin
        this._wmi = _wmi
        this._vds = _vds
        this._vis = _vis
    }

}

const spelerVin = (str) => {
    let new_str = String(str).toUpperCase().replace(/[^A-Z0-9]/g, '')
    return new_str.length === 17 ? new_str : null
}

module.exports = class UMAPI_VIN_DECODE {
    #decodeVin
    constructor(vin) {
        vin = spelerVin(vin)
        if (!!!vin) throw Error('Неправильно указан вин код!')
        vin = vin.match(REGEX)
        if (!!!vin) throw Error('Неправильно указан вин код!')
        this.#decodeVin = new DecodeVin(vin.input, vin.groups.wmi, vin.groups.vds, vin.groups.vis)
    }

    /**
     * Получить VIN
     */
    getVin() {
        return this.#decodeVin._vin
    }
    /**
     * Получить WMI
     */
    getWmi() {
        return this.#decodeVin._wmi
    }
    /**
     * Получить VDS
     */
    getVds() {
        return this.#decodeVin._vds
    }
    /**
     * Получить VIS
     */
    getVis() {
        return this.#decodeVin._vis
    }
    /**
     * Получить информацию по VIN
     */
    getDecodeVin() {
        return {
            vin: this.getVin(),
            wmi: this.getWmi(),
            vds: this.getVds(),
            vis: this.getVis(),
            manufacturer: this.identifyManufacturer(),
            country: this.identifyCountry(),
            years: this.identifyModelYear()
        }
    }
    /**
     * Список производителей
     *
     * @link https://en.wikipedia.org/wiki/Vehicle_identification_number#List_of_common_WMI
     * @link https://en.wikibooks.org/wiki/Vehicle_Identification_Numbers_(VIN_codes)/World_Manufacturer_Identifier_(WMI)#List_of_all_WMIs
     */
    identifyManufacturer() {
        return MANUFACTURERS[this.#decodeVin._wmi] ?? MANUFACTURERS[this.#decodeVin._wmi[0] + this.#decodeVin._wmi[1]] ?? null;
    }
    /**
     * Список регионов
     *
     * @link https://en.wikipedia.org/wiki/Vehicle_identification_number#Country_or_Region_codes
     * @link https://en.wikibooks.org/wiki/Vehicle_Identification_Numbers_(VIN_codes)/World_Manufacturer_Identifier_(WMI)#WMI_Regions
     */
    identifyCountry() {
        if (! REGIONS[this.#decodeVin._wmi[0]]) {
            return null;
        }
        const search = REGIONS[this.#decodeVin._wmi[0]].countries
        for (const element in search) {
            if(element.indexOf(this.#decodeVin._wmi[1]) > -1) {
                return {region: REGIONS[this.#decodeVin._wmi[0]].region , name: search[element]}
            }
        }
        return null
    }
    /**
     * Список годов выпуска
     *
     * @link https://en.wikipedia.org/wiki/Vehicle_identification_number#Model_year_encoding
     * @link https://en.wikibooks.org/wiki/Vehicle_Identification_Numbers_(VIN_codes)/Model_year
     */
    identifyModelYear() {
        const comingYear = String((new Date()).getFullYear() + 1)
        const search = this.#decodeVin._vis[0]
        let certainYears = []
        let possible = ''
        for (const key in YEARS) {
            if(YEARS[key] === search) {
                possible = key
                certainYears.push(key)
            }
            if (comingYear === key) {
                break;
            }
        }
        return {all: certainYears, possible: possible}
    }
}

