var UMAPI_VIN_DECODE = require('../index');

try {
    var vin = new UMAPI_VIN_DECODE('VF1B56SK512502164')

    // Получить информацию по VIN:

    console.log(vin.getDecodeVin())

    // Получить VIN:

    console.log(vin.getVin())

    // Получить WMI:

    console.log(vin.getWmi())

    // Получить VDS:

    console.log(vin.getVds())

    // Получить VIS:

    console.log(vin.getVis())

    // Список производителей:

    console.log(vin.identifyManufacturer())

    // Список регионов:

    console.log(vin.identifyCountry())

    // Список годов выпуска:

    console.log(vin.identifyModelYear())
} catch (error) {
    console.log(error.message)
}


