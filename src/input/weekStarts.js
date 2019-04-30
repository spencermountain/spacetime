const countriesLong = require('../data/countries').longCountries;
const countriesIso = require('../data/countries').shortCountries;
const stewardName = require('../data/countries').stewardName;

const territoryName = require('../data/countries').territoryName;
const dayIndexes = require('../data/countries').dayIndexes;
const days = require('../data/days')
const spacetime = require('../spacetime');

module.exports = weekStarts = (country = '') => {
    // if country not set as an argument
    if (country === '') {
        country = getCurrentCountry();
        weekStarts(country);
    }

  // search for country (in english) and return index of a week day
  // 0 - sun, 1 - mon, 6 - sat, -1 - wrong input
  const countryIndex = findCountryIndex(country);
  const weekDays = days.long();
    if (countryIndex !== -1) {
      return weekDays[
        dayIndexes[countryIndex]
      ];
    }
  return -1;
};

function getCurrentCountry() {

    // TODO: (optional?) get current location - 
    // state and call weekStarts
    let countryName = 'united states';
    const time = spacetime.now().timezone();
    return countryName;
}

  /**
   * searches for country in an array, if no found
   * returns -1
   * @param string country 
   * @returns index of country in an array
   */
function findCountryIndex(country) {

  let index = -1;
  let countries;
  
    if (country.length > 3) {
      countries = countriesLong;
    } else if (country.length === 3) {
      countries = countriesIso;
    }

    // search countries arrays for index of country
    index = iterateCountries(countries, country);
    
    // when country was found return it's index
    if (index !== -1) { return index; }
    
    // if no country matched - search if it's one of territories
    if (index === -1) {
      countries = territoryName;
        for (const i of countries.keys()) {
          for (const j of countries[i].keys()) {
            if (countries[i][j].indexOf(country.toLowerCase()) !== -1) {
              index = i;
              break;
            }
          }
        }

      // searches for steward counry in array of countries
      // and a country was found (index !== -1)
        if (index !== -1) {
          let country = stewardName[index];
          countries = countriesLong;
          index = iterateCountries(countries, country);
        }
        
      return index;
    }
}

function iterateCountries(countries, country) {
  for (let index = 0; index<countries.length; index++) {
    if (countries[index].indexOf(country.toLowerCase()) !== -1) {
      return index;
    }
  }
}

/*
Abkhazia 1
Afghanistan 6
Albania 1
Algeria 6
Andorra 1
Angola 1
Antigua and Barbuda 1
Argentina   0
Armenia 1
Artsakh 1
Australia   1
Austria 1
Azerbaijan  1
The Bahamas 1
Bahrain 6
Bangladesh 6
Barbados 1
Belarus 1
Belgium 1
Belize  0
Benin 1
Bhutan 1
Bolivia 0
Bosnia and Herzegovina 1
Botswana 1
Brazil  0
Brunei  1
Bulgaria    1
Burkina Faso    1
Burundi 1
Cambodia 1
Cameroon 1
Canada  0
Cape Verde 1
Central African Republic 1
Chad    1
Chile   0
China   0
Colombia    0
Comoros 6
Democratic Republic of the Congo    1
Republic of the Congo   1
Cook Islands 1
Costa Rica  0
Croatia 1
Cuba 1
Cyprus 1
Czech Republic  1
Denmark 1
Djibouti 1
Dominica 1
Dominican Republic  0
East Timor 1
Ecuador 0
Egypt   6
El Salvador 0
Equatorial Guinea 1
Eritrea 1
Estonia 1
Ethiopia 1
Fiji 1
Finland 1
France  1
Gabon 1
The Gambia 1
Georgia 1
Germany 1
Ghana 1
Greece  1
Grenada 1
Guatemala   0
Guinea 1
Guinea-Bissau 1
Guyana 1
Haiti 1
Honduras    0
Hong Kong   0
Hungary 1
Iceland 1
India   1
Indonesia   1
Iran    6
Iraq    6
Ireland 1
Israel  0
Italy   1
Ivory Coast 1
Jamaica 0
Japan   0
Jordan  6
Kazakhstan  1
Kenya   0
Kiribati 1
Kosovo  1
Kuwait  6
Kyrgyzstan  1
Laos 1
Latvia  1
Lebanon 1
Lesotho 1
Liberia 1
Libya   6
Liechtenstein 1
Lithuania   1
Luxembourg  1
Madagascar 1
Macao   0
Malawi 1
Malaysia    1
Maldives 1
Mali 1
Malta 1
Marshall Islands 1
Mauritania 6
Mauritius 1
Mexico  0
Micronesia 1
Moldova 1
Monaco  1
Mongolia    1
Montenegro 1
Morocco 1
Mozambique 1
Myanmar 1
Namibia 1
Nauru 1
Nepal 1
Netherlands 1
New Zealand 1
Nicaragua   0
Niger 1
Nigeria 1
Niue 1
North Korea 0
Northern Cyprus 1
North Macedonia   1
Norway  1
Oman    6
Pakistan    1
Palau 0
Palestine 6
Panama  0
Papua New Guinea 1
Paraguay    1
Peru    0
Philippines 0
Poland  1
Portugal    1
Puerto Rico 0
Qatar   6
Romania 1
Russia  1
Rwanda 1
Sahrawi Arab Democratic Republic 6
Saint Kitts and Nevis 1
Saint Lucia 1
Saint Vincent and the Grenadines 1
Samoa 0
San Marino 1
São Tomé and Príncipe 1
Saudi Arabia    6
Senegal 1
Serbia  1
Seychelles 1
Sierra Leone 1
Singapore   1
Slovakia    1
Slovenia 1
Solomon Islands 1
Somalia 6
South Africa    0
South Korea 0
South Ossetia 1
South Sudan 6
Spain   1
Sri Lanka 1
Sudan 6
Suriname 1
Swaziland 1
Sweden  1
Switzerland 1
Syria   6
Taiwan  0
Tajikistan 6
Tanzania 1
Thailand    1
Togo 1
Tonga 1
Transnistria 1
Trinidad and Tobago 1
Tunisia 1
Turkey  1
Turkmenistan 1
Tuvalu 1
Uganda 1
Ukraine 1
United Arab Emirates    6
United Kingdom  1
United States   0
Uruguay 1
Uzbekistan  1
Vanuatu 1
Vatican City 1
Venezuela   0
Vietnam 1
Yemen   6
Zambia 1
Zimbabwe    0
*/