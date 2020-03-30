import React, {useEffect} from 'react'
import { Redirect } from 'react-router-dom'

const LogOut = (props) => {
    useEffect(() => {
        props.onLogOut();
    }, []);
    console.log("logging out")
    return <Redirect to="/home" />
};

export default LogOut;