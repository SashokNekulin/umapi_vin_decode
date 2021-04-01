# umapi_vin_decode
======

Nodejs модуль для декодирования вин кода автомобиля

Документация wiki:

[List_of_common_WMI](https://en.wikipedia.org/wiki/Vehicle_identification_number#List_of_common_WMI) , [List_of_all_WMIs](https://en.wikibooks.org/wiki/Vehicle_Identification_Numbers_(VIN_codes)/World_Manufacturer_Identifier_(WMI)#List_of_all_WMIs)

[Country_or_Region_codes](https://en.wikipedia.org/wiki/Vehicle_identification_number#Country_or_Region_codes) , [WMI_Regions](https://en.wikibooks.org/wiki/Vehicle_Identification_Numbers_(VIN_codes)/World_Manufacturer_Identifier_(WMI)#WMI_Regions)

[Model_year_encoding](https://en.wikipedia.org/wiki/Vehicle_identification_number#Model_year_encoding) , [Model_year](https://en.wikibooks.org/wiki/Vehicle_Identification_Numbers_(VIN_codes)/Model_year)


## Установка
```
npm install umapi_vin_decode
```

## Тест
```
npm run test
```

## Использование

Подключение:
```js
var UmapiVinDecode = require('umapi_vin_decode').default

try {
    var vin = new UmapiVinDecode('your_vin_code')
    console.log( vin.getDecodeVin() )
} catch (error) {
    console.log( error.message )
}
```

### Получить информацию по VIN:
```js
console.log( vin.getDecodeVin() )
```

### Получить WMI:
```js
console.log( vin.getWmi() )
```

### Получить VDS:
```js
console.log( vin.getVds() )
```

### Получить VIS:
```js
console.log( vin.getVis() )
```

### Производитель:
```js
console.log( vin.identifyManufacturer() )
```
### Регион:
```js
console.log( vin.identifyCountry() )
```
### Год выпуска:
```js
console.log( vin.identifyModelYear() )
```

## Автор

[Alexandr Nikulin](https://github.com/SashokNekulin/), e-mail: [nekulin@mail.ru](mailto:nekulin@mail.ru)