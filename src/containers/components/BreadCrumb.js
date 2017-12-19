import React from 'react';
import { Link } from 'react-static';
import {Link} from "@types/react-router-dom/index.d";

function BreadCrumb({city, state, store}) {
    const base = city || state || store ? <Link to="/">LOCATIONS</Link> : '';
    const stateLink = state ? <span> / <Link to={`/${state}`}>{state}</Link></span> : '';
    const cityLink = city ? <span> / <Link to={`/${city.replace(' ', '-')}-${state}`} >{city}</Link></span> : '';
    const storeLink = store ? <span> / <Link to={`/${city.replace(' ', '-')}-${state}-${store.number}`} >{`Wendy's - ${store.address}`}</Link></span> : '';
    return (
        <div className="bread-crumb">
            {base}
            {stateLink}
            {cityLink}
            {storeLink}
        </div>
    );
}