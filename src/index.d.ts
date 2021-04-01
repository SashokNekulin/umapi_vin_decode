/**
 * @ Author: <Alexandr Nikulin> (nekulin@mail.ru)
 * @ Github: https://github.com/SashokNekulin
 * @ Create Time: 2021-03-11 14:53:43
 * @ Modified time: 2021-04-01 15:25:39
 * @ Copyrights: (c) 2020 umapi.ru
 * @ License: MIT
 * @ Description:
 */
interface VinDecode {
    wmi: string;
    vds: string;
    vis: string;
}
interface VinDecodeRrezult extends VinDecode {
    manufacturer: string | null;
    country: any | null;
    year: any | null;
}
export default class UmapiVinDecode {
    private vin;
    private REGEX;
    private decode;
    constructor(vin: string);
    private spelerVin;
    /**
     * Получить WMI
     */
    getWmi(): string;
    /**
     * Получить VDS
     */
    getVds(): string;
    /**
     * Получить VIS
     */
    getVis(): string;
    /**
     * Получить информацию по VIN
     */
    getDecodeVin(): VinDecodeRrezult;
    /**
     * Список производителей
     *
     * @link https://en.wikipedia.org/wiki/Vehicle_identification_number#List_of_common_WMI
     * @link https://en.wikibooks.org/wiki/Vehicle_Identification_Numbers_(VIN_codes)/World_Manufacturer_Identifier_(WMI)#List_of_all_WMIs
     */
    identifyManufacturer(): string;
    /**
     * Список регионов
     *
     * @link https://en.wikipedia.org/wiki/Vehicle_identification_number#Country_or_Region_codes
     * @link https://en.wikibooks.org/wiki/Vehicle_Identification_Numbers_(VIN_codes)/World_Manufacturer_Identifier_(WMI)#WMI_Regions
     */
    identifyCountry(): {
        region: string;
        name: string;
    } | null;
    /**
     * Список годов выпуска
     *
     * @link https://en.wikipedia.org/wiki/Vehicle_identification_number#Model_year_encoding
     * @link https://en.wikibooks.org/wiki/Vehicle_Identification_Numbers_(VIN_codes)/Model_year
     */
    identifyModelYear(): string;
}
export {};
