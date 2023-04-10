import {useEffect} from "react";

const config = require('../../config/config')

function LogoutFragment() {
    useEffect(()=>{
        fetch(config.urls.logout_user_url, {
            credentials: 'include',
            method: 'POST',
        }).then(async (r) => {
            if (!r.ok){
                return
            }
            window.location = '/'
        })
    })
    return <div>Trying Logout</div>
}


export default LogoutFragment