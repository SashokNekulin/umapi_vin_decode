"use strict";
/**
 * @ Author: <Alexandr Nikulin> (nekulin@mail.ru)
 * @ Github: https://github.com/SashokNekulin
 * @ Create Time: 2021-03-11 14:53:43
 * @ Modified time: 2021-04-01 15:25:39
 * @ Copyrights: (c) 2020 umapi.ru
 * @ License: MIT
 * @ Description:
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var manufactures_1 = __importDefault(require("./data/manufactures"));
var years_1 = __importDefault(require("./data/years"));
var regions_1 = __importDefault(require("./data/regions"));
var UmapiVinDecode = /** @class */ (function () {
    function UmapiVinDecode(vin) {
        var _this = this;
        this.vin = null;
        this.REGEX = /^(?<wmi>[0-9A-HJ-NPR-Z]{3})(?<vds>[0-9A-HJ-NPR-Z]{6})(?<vis>[0-9A-HJ-NPR-Z]{8})$/;
        this.spelerVin = function () {
            var new_str = _this.vin ? _this.vin.toUpperCase().replace(/[^A-Z0-9]/g, '') : null;
            return new_str && new_str.length === 17 ? new_str : null;
        };
        this.vin = vin;
        this.spelerVin();
        if (!this.vin)
            throw Error('the vin parameter error');
        var _match = this.vin.match(this.REGEX);
        if (!_match)
            throw Error('the vin parameter error');
        this.decode = {
            wmi: _match[1],
            vds: _match[2],
            vis: _match[3]
        };
    }
    /**
     * Получить WMI
     */
    UmapiVinDecode.prototype.getWmi = function () {
        return this.decode.wmi;
    };
    /**
     * Получить VDS
     */
    UmapiVinDecode.prototype.getVds = function () {
        return this.decode.vds;
    };
    /**
     * Получить VIS
     */
    UmapiVinDecode.prototype.getVis = function () {
        return this.decode.vis;
    };
    /**
     * Получить информацию по VIN
     */
    UmapiVinDecode.prototype.getDecodeVin = function () {
        return {
            wmi: this.getWmi(),
            vds: this.getVds(),
            vis: this.getVis(),
            manufacturer: this.identifyManufacturer(),
            country: this.identifyCountry(),
            year: this.identifyModelYear()
        };
    };
    /**
     * Список производителей
     *
     * @link https://en.wikipedia.org/wiki/Vehicle_identification_number#List_of_common_WMI
     * @link https://en.wikibooks.org/wiki/Vehicle_Identification_Numbers_(VIN_codes)/World_Manufacturer_Identifier_(WMI)#List_of_all_WMIs
     */
    UmapiVinDecode.prototype.identifyManufacturer = function () {
        var _a, _b;
        return (_b = (_a = manufactures_1.default[this.decode.wmi]) !== null && _a !== void 0 ? _a : manufactures_1.default[this.decode.wmi[0] + this.decode.wmi[1]]) !== null && _b !== void 0 ? _b : null;
    };
    /**
     * Список регионов
     *
     * @link https://en.wikipedia.org/wiki/Vehicle_identification_number#Country_or_Region_codes
     * @link https://en.wikibooks.org/wiki/Vehicle_Identification_Numbers_(VIN_codes)/World_Manufacturer_Identifier_(WMI)#WMI_Regions
     */
    UmapiVinDecode.prototype.identifyCountry = function () {
        if (!regions_1.default[this.decode.wmi[0]]) {
            return null;
        }
        var search = regions_1.default[this.decode.wmi[0]].countries;
        for (var element in search) {
            if (element.indexOf(this.decode.wmi[1]) > -1) {
                return { region: regions_1.default[this.decode.wmi[0]].region, name: search[element] };
            }
        }
        return null;
    };
    /**
     * Список годов выпуска
     *
     * @link https://en.wikipedia.org/wiki/Vehicle_identification_number#Model_year_encoding
     * @link https://en.wikibooks.org/wiki/Vehicle_Identification_Numbers_(VIN_codes)/Model_year
     */
    UmapiVinDecode.prototype.identifyModelYear = function () {
        var pattern = /^[0-9]+$/;
        var seven = pattern.test(this.getVds()[3]);
        var comingYear = String((new Date()).getFullYear() + 1);
        var search = this.decode.vis[0];
        var certainYears = [];
        for (var key in years_1.default) {
            if (years_1.default[key] === search) {
                certainYears.push(key);
            }
            if (comingYear === key) {
                break;
            }
        }
        var a = certainYears[0] ? certainYears[0] : '';
        var b = certainYears[1] ? certainYears[1] : '';
        return seven ? a : b;
    };
    return UmapiVinDecode;
}());
exports.default = UmapiVinDecode;
//# sourceMappingURL=index.js.map