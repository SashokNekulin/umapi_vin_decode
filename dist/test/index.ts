import UmapiVinDecode from "../index"
/*
const use1 = new UM('VF1BG0B0525612531')
const getDecodeVin1 = use1.getDecodeVin()
console.log(getDecodeVin1)
*/
const vin = new UmapiVinDecode('VF30A9HR8BS105632')

console.log('Получить информацию по VIN: ', vin.getDecodeVin() )
console.log('Получить WMI: ', vin.getWmi() )
console.log('Получить VDS: ', vin.getVds() )
console.log('Получить VIS: ', vin.getVis() )
console.log('Производитель: ', vin.identifyManufacturer() )
console.log('Регион: ', vin.identifyCountry() )
console.log('Год выпуска: ', vin.identifyModelYear() )
