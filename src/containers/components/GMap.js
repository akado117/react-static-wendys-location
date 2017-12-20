import React from 'react';
const { compose, withProps, withState, withHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} = require("react-google-maps");

const MapWithControlledZoom = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `500px` }} />,
    }),
    withState('zoom', 'onZoomChange', 8),
    withHandlers(() => {
        const refs = {
            map: undefined,
        }

        return {
            onMapMounted: () => ref => {
                refs.map = ref
            },
            onZoomChanged: ({ onZoomChange }) => () => {
                onZoomChange(refs.map.getZoom())
            }
        }
    }),
    withScriptjs,
    withGoogleMap
)(props => {
    const lat = parseFloat(props.location.latitudeNum);
    const lng = parseFloat(props.location.longitudeNum);
    return (<GoogleMap
        defaultCenter={{ lat, lng }}
        zoom={props.manualZoom || props.zoom}
        ref={props.onMapMounted}
        onZoomChanged={props.onZoomChanged}
    >
        <Marker
            position={{ lat, lng }}
            // onClick={props.onToggleOpen}
        >
        </Marker>
    </GoogleMap>
    );
});

export default MapWithControlledZoom;