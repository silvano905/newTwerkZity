import React from 'react';
import {useSelector} from 'react-redux';

//material ui imports
import { Alert} from '@material-ui/lab';


const Alerts = () => {
    //get alerts from state /react hooks
    const alerts = useSelector(state => state.alert);

    //return alerts if not null and greater than 0
    return (
        alerts !== null &&
        alerts.length > 0 &&
        alerts.map(alert => (
            <Alert severity={alert.alertType} key={alert.id}>
                {alert.msg}
            </Alert>
        ))
    )
}

export default Alerts;
