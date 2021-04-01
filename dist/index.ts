/**
 * @ Author: <Alexandr Nikulin> (nekulin@mail.ru)
 * @ Github: https://github.com/SashokNekulin
 * @ Create Time: 2021-03-11 14:53:43
 * @ Modified time: 2021-04-01 15:25:39
 * @ Copyrights: (c) 2020 umapi.ru
 * @ License: MIT
 * @ Description:
 */

import manufactures from "./data/manufactures";
import years from "./data/years";
import regions from "./data/regions";

interface VinDecode {
    wmi: string,
    vds: string,
    vis: string
}
interface VinDecodeRrezult extends VinDecode {
    manufacturer: string | null,
    country: any | null,
    year: any | null
}

export default class UmapiVinDecode {

    private vin: string | null = null

    private REGEX: RegExp = /^(?<wmi>[0-9A-HJ-NPR-Z]{3})(?<vds>[0-9A-HJ-NPR-Z]{6})(?<vis>[0-9A-HJ-NPR-Z]{8})$/

    private decode: VinDecode

    constructor(vin: string) {
        this.vin = vin
        this.spelerVin()
        if (!this.vin) throw Error('the vin parameter error')
        const _match = this.vin.match(this.REGEX)
        if (!_match) throw Error('the vin parameter error')
        this.decode = {
            wmi: _match[1],
            vds: _match[2],
            vis: _match[3]
        }
    }

    private spelerVin = (): string | null => {
        const new_str = this.vin ? this.vin.toUpperCase().replace(/[^A-Z0-9]/g, '') : null
        return new_str && new_str.length === 17 ? new_str : null
    }

    /**
     * Получить WMI
     */
    getWmi(): string {
        return this.decode.wmi
    }
    /**
     * Получить VDS
     */
    getVds(): string {
        return this.decode.vds
    }
    /**
     * Получить VIS
     */
    getVis(): string {
        return this.decode.vis
    }
    /**
     * Получить информацию по VIN
     */
    getDecodeVin(): VinDecodeRrezult {
        return {
            wmi: this.getWmi(),
            vds: this.getVds(),
            vis: this.getVis(),
            manufacturer: this.identifyManufacturer(),
            country: this.identifyCountry(),
            year: this.identifyModelYear()
        }
    }
    /**
     * Список производителей
     *
     * @link https://en.wikipedia.org/wiki/Vehicle_identification_number#List_of_common_WMI
     * @link https://en.wikibooks.org/wiki/Vehicle_Identification_Numbers_(VIN_codes)/World_Manufacturer_Identifier_(WMI)#List_of_all_WMIs
     */
    identifyManufacturer() {
        return manufactures[this.decode.wmi] ?? manufactures[this.decode.wmi[0] + this.decode.wmi[1]] ?? null;
    }
    /**
     * Список регионов
     *
     * @link https://en.wikipedia.org/wiki/Vehicle_identification_number#Country_or_Region_codes
     * @link https://en.wikibooks.org/wiki/Vehicle_Identification_Numbers_(VIN_codes)/World_Manufacturer_Identifier_(WMI)#WMI_Regions
     */
    identifyCountry() {
        if (!regions[this.decode.wmi[0]]) {
            return null;
        }
        const search = regions[this.decode.wmi[0]].countries
        for (const element in search) {
            if (element.indexOf(this.decode.wmi[1]) > -1) {
                return { region: regions[this.decode.wmi[0]].region, name: search[element] }
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
        const pattern = /^[0-9]+$/;
        const seven = pattern.test(this.getVds()[3])
        const comingYear = String((new Date()).getFullYear() + 1)
        const search = this.decode.vis[0]
        let certainYears = []
        for (const key in years) {
            if (years[key] === search) {
                certainYears.push(key)
            }
            if (comingYear === key) {
                break;
            }
        }
        const a = certainYears[0] ? certainYears[0] : ''
        const b = certainYears[1] ? certainYears[1] : ''
        return seven ? a : b
    }
}