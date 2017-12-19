import React from 'react';
import { getRouteProps } from 'react-static';

export default getRouteProps(({ location }) => {
    return (
        <div>
            {JSON.stringify(location)}
        </div>
    );
});
