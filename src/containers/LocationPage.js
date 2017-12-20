import React from 'react';
import { getRouteProps } from 'react-static';
import { formateTelephone } from '../helpers/DataHelpers';
import GMap from './components/GMap';
import BreadCrumb from './components/BreadCrumb';

const hour = { startTime: '10:00 am', closeTime: '11:00 pm' };
const storeHours = {
    Monday: hour,
    Tuesday: hour,
    Wednesday: hour,
    Thursday: hour,
    Friday: hour,
    Saturday: hour,
    Sunday: hour,
}

const amenities = {
    mobile: false,
    mobilepay: false,
    wifi: true,
    late: true,
    breakfast: false,
    'always_open': true,
    freestyle: true,
};

const amenitiesText = {
    mobile: 'Mobile Ordering',
    mobilepay: 'Mobile Payment',
    wifi: 'Wi-fi',
    late: 'Open Late',
    breakfast: 'Breakfast',
    'always_open': 'Open 24 Hours',
    freestyle: 'Coca-Cola Freestyle',
};
function getStoreHours(location) {
    const days = Object.keys(storeHours).map(key => <li key={key}><span className="day">{key}</span><span className="time">{storeHours[key].startTime} - {storeHours[key].closeTime}</span></li>);
    return (
        <div className="hours">
            <ol>
                {days}
            </ol>
        </div>
    );
}

function getAmenities(location) {
    const amenitiesElements = Object.keys(amenities).map(key => (
        <li className="" key={key}>
            <div className="icon">
                <img src={`/images/common/amenities/ic_brown_${key}_${amenities[key] ? 'normal' : 'disabled'}.png`} />
            </div>
            <div className="serv-text">
                {amenitiesText[key]}
            </div>
        </li>
    ));
    return (
        <ul className="services">
            {amenitiesElements}
        </ul>
    );
}

export default getRouteProps(({ location }) => {
    return (
        <div className="container location-page">
            <div className="col-xs-12">
                <BreadCrumb location={location} />
                <h1>Quality, Fresh and Fast: Hamburgers & Food in {location.cityNam.toLowerCase()},{location.stProvCod} {location.zipCod}</h1>
                <hr />
                <div className="row">
                    <div className="col-sm-12 col-md-4">
                        <div className="address">
                            <p className="street-address-1">{location.siteAdr1.toLowerCase()}</p>
                            <p className="street-address-2"><span className="city-name">{location.cityNam.toLowerCase()}</span>, {location.stProvCod} {location.zipCod}</p>
                            <p className="phone"><a href={`tel:${location.storeFon}`}>{formateTelephone(location.storeFon)}</a></p>
                        </div>
                        {getStoreHours()}
                        <hr />
                        <a href={`http://maps.google.com/?daddr=${location.latitudeNum},${location.longitudeNum}`} className="directions-link" >Get Directions</a>
                        <hr />
                        {getAmenities()}
                    </div>
                    <div className="hidden-xs hidden-sm col-md-8">
                        <GMap location={location} manualZoom={12} />
                    </div>
                </div>
            </div>
        </div>

    );
});
