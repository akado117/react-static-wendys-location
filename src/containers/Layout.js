import React from 'react';
import { getRouteProps, Link } from 'react-static';
import { splitIntoThreeArrays, buildCityStateProp, buildCityStateStoreNumLink, formateTelephone } from '../helpers/DataHelpers';

function buildListElement(key, to, text) {
    return <li key={key}><Link to={to} >{text}</Link></li>
}


function getStatesList(splitObj) {
    const { first, second, third } = splitObj;//stateObjects
    return (
        <div>
            <h1>Wendy's Resturant Locations & Hours</h1>
            <hr />
            <h2>Browse by State or Province</h2>
            <div className="list-holder row">
                <ul className="col-md-4">
                    {first.map(obj => buildListElement(obj.lowerCaseShortCode, `/state/${obj.lowerCaseShortCode}`, obj.name))}
                </ul>
                <ul className="col-md-4">
                    {second.map(obj => buildListElement(obj.lowerCaseShortCode, `/state/${obj.lowerCaseShortCode}`, obj.name))}
                </ul>
                <ul className="col-md-4">
                    {third.map(obj => buildListElement(obj.lowerCaseShortCode, `/state/${obj.lowerCaseShortCode}`, obj.name))}
                </ul>
            </div>
        </div>
    );
}

function getCitiesList(splitObj, currentState) {
    const { first, second, third } = splitObj;//city strings
    return (
        <div>
            <h1>Find a Wendy's Restaurant Location in <span className="state-title">{currentState.name ? currentState.name : ''}</span></h1>
            <hr />
            <h2>Browse by City</h2>
            <div className="row">
                <ul className="col-md-4">
                    {first.map(city => buildListElement(city, `/city/${buildCityStateProp({ stProvCod: currentState.lowerCaseShortCode, cityNam: city })}`, city))}
                </ul>
                <ul className="col-md-4">
                    {second.map(city => buildListElement(city, `/city/${buildCityStateProp({ stProvCod: currentState.lowerCaseShortCode, cityNam: city })}`, city))}
                </ul>
                <ul className="col-md-4">
                    {third.map(city => buildListElement(city, `/city/${buildCityStateProp({ stProvCod: currentState.lowerCaseShortCode, cityNam: city })}`, city))}
                </ul>
            </div>
        </div>
    );
}

function buildLocationLinkText(location) {
    return `${location.siteAdr1.toLowerCase()}, ${location.stProvCod}, ${location.zipCod}, ${formateTelephone(location.storeFon)}`;
}

function getLocationsList(locations) {
    const { stProvNam, cityNam } = locations[0];
    return (
        <div className="location-container">
            <h1>Find a Wendy's Restaurant Location in <span className="state-title">{cityNam.toLowerCase()}, {stProvNam.toLowerCase()}</span>
            </h1>
            <hr />
            <h2>{cityNam} Locations</h2>
            <div className="row locations-list">
                <ul className="col-xs-12">
                    {locations.map(location => <li key={location.siteNum}><Link
                        to={`/location/${buildCityStateStoreNumLink(location)}`} >{buildLocationLinkText(location)}</Link></li>)}
                </ul>
            </div>
        </div>
    );
}

export default getRouteProps(({ cities, states, locations, currentState }) => {
    let splitProp;
    if (cities) splitProp = splitIntoThreeArrays(cities);
    if (states) splitProp = splitIntoThreeArrays(states, 'name');
    if (locations) splitProp = locations;
    let comp;
    if (states) comp = getStatesList(splitProp);
    if (cities) comp = getCitiesList(splitProp, currentState);
    if (locations) comp = getLocationsList(splitProp);
    return (
        <div className="layout-container container">
            {comp}
        </div>
    );
});