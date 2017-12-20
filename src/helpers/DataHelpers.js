import { sortBy, startCase } from 'lodash';

export function splitIntoThreeArrays(array, propToCompare) {
    const totalLength = array.length;
    const typeOfArrayMembers = typeof array[0];
    const arraysToReturn = {
        first: [],
        second: [],
        third: [],
    };
    const firstBreakIndex = parseInt(totalLength / 3, 10);
    const secondBreakIndex = parseInt(firstBreakIndex * 2, 10);
    let currentLetter;

    if (typeOfArrayMembers === 'object') {
        array.forEach((obj, idx) => {
            if (idx === firstBreakIndex || idx === secondBreakIndex) currentLetter = obj[propToCompare][0];
            if (idx <= firstBreakIndex || (idx < secondBreakIndex && obj[propToCompare][0] === currentLetter)) return arraysToReturn.first.push(obj);
            if (idx <= secondBreakIndex || (idx > secondBreakIndex && obj[propToCompare][0] === currentLetter)) return arraysToReturn.second.push(obj);
            return arraysToReturn.third.push(obj);
        });
    }
    if (typeOfArrayMembers === 'string') {
        array.forEach((obj, idx) => {
            if (idx === firstBreakIndex || idx === secondBreakIndex) currentLetter = obj[0];
            if (idx <= firstBreakIndex || (idx < secondBreakIndex && obj[0] === currentLetter)) return arraysToReturn.first.push(obj);
            if (idx <= secondBreakIndex || (idx > secondBreakIndex && obj[0] === currentLetter)) return arraysToReturn.second.push(obj);
            return arraysToReturn.third.push(obj);
        });
    }

    return arraysToReturn;
}

export function formateTelephone(phoneNum) {
    return `(${phoneNum.substring(0, 3)}) ${phoneNum.substring(0, 3)}-${phoneNum.substring(6)}`;
}

export function buildCityStateProp(store) {
    return `${store.cityNam.replace(/\s+/g, '-')}-${store.stProvCod}`.toLowerCase();
}

export function buildCityStateStoreNumLink(store) {
    return `${store.cityNam.replace(/\s+/g, '-')}-${store.stProvCod}-${store.siteNum}`.toLowerCase();
}

export function sortTransformedStoreData(storesData) {
    const dataToReturn = {};
    dataToReturn.states = sortBy(storesData.states, 'name');
    const cities = {}; //sortCities
    Object.keys(storesData.cities).forEach((key) => {
        cities[key] = storesData.cities[key].sort();
    });
    dataToReturn.cities = cities;
    dataToReturn.locations = storesData.locations;
    return dataToReturn;
}

export function transformGetAllStoresResponse(stores) {
    const returnData = {
        states: { name: [], shortName: [], lowerCaseShortCode: [] },//start out as arrays to make indexOf viable then combine at end
        cities: {},// prop is stateShortName
        locations: {}, //prop is city-stateShortName
    };
    console.log(stores[0])
    stores.forEach((store, idx) => {
        //if (idx > 200) return;
        const lwrCsProvCode = store.stProvCod.toLowerCase();
        if (returnData.states.shortName.indexOf(store.stProvCod) === -1) { //add shortcode and name to state array if not already there
            returnData.states.shortName.push(store.stProvCod);
            returnData.states.lowerCaseShortCode.push(lwrCsProvCode);
            returnData.states.name.push(store.stProvNam.toLowerCase());
        }
        const lwrCsCity = store.cityNam.toLowerCase();//build out cities object (cities are not sorted
        if (!returnData.cities[lwrCsProvCode]) {
            returnData.cities[lwrCsProvCode] = [lwrCsCity];
        } else if (returnData.cities[lwrCsProvCode].indexOf(lwrCsCity) === -1) {
            returnData.cities[lwrCsProvCode].push(lwrCsCity);
        }
        const lwrCsCitystate = buildCityStateProp(store);
        const { siteNum, siteNam, siteAdr1, cityNam, stProvCod, stProvNam, zipCod, latitudeNum, longitudeNum, storeFon } = store;
        if (!returnData.locations[lwrCsCitystate]) {
            returnData.locations[lwrCsCitystate] = [{ siteNum, siteNam, siteAdr1, cityNam, stProvCod, stProvNam, zipCod, latitudeNum, longitudeNum, storeFon }];
        } else {
            returnData.locations[lwrCsCitystate].push({ siteNum, siteNam, siteAdr1, cityNam, stProvCod, stProvNam, zipCod, latitudeNum, longitudeNum, storeFon });
        }
    });
    const statesArry = [];
    returnData.states.shortName.forEach((shortName, idx) => {//convert states back into an object ARR
        statesArry.push({
            shortName,
            name: returnData.states.name[idx],
            lowerCaseShortCode: returnData.states.lowerCaseShortCode[idx],
        });
    });
    returnData.states = statesArry;
    return sortTransformedStoreData(returnData);
}