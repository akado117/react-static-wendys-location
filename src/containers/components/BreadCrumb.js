import React from 'react';
import { Link } from 'react-static';
import { buildCityStateProp } from '../../helpers/DataHelpers'

function BreadCrumb(props) {
    const { location } = props;
    const state = props.state || location && { shortName: location.stProvCod, lowerCaseShortCode: location.stProvCod.toLowerCase() } || undefined
    const city = props.city || location && location.cityNam;

    const base = <Link to="/">LOCATIONS</Link>;
    const stateLink = state ? <span> / <Link to={`/state/${state.lowerCaseShortCode}`}>{state.shortName}</Link></span> : '';
    const cityLink = city ? <span> / <Link to={`/city/${buildCityStateProp({cityNam: city, stProvCod: state.shortName })}`} >{city}</Link></span> : '';
    const storeLink = location ? <span> / WENDY'S - {location.siteAdr1}</span> : '';
    return (
        <div className="bread-crumb">
            {base}
            {stateLink}
            {cityLink}
            {storeLink}
        </div>
    );
}

export default BreadCrumb