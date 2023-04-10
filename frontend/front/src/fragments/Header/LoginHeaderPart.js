import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
const config = require('../../config/config')


const api = require('../../api/api').api

function AuthReadyUser({user, nav, setUserData}){
    // console.log(user)
    return (
        <div className='d-flex flex-row'>
            <span className='navbar mx-0'>
                <Link to={'/user/' + user.login}>{user.login}</Link>
            </span>
            <a className='btn btn-outline-primary my-2 my-sm-0 mx-3' type='button' onClick={()=>logout(nav, setUserData)}>Logout</a>
        </div>
    )
}

function AnonUser(){
    return (
        <div className='d-flex flex-row'>
            <Link className='btn btn-outline-primary my-2 my-sm-0 mx-0' type='button' to='/register'>Register</Link>
            <Link className='btn btn-outline-success my-2 my-sm-0 mx-3' type='button' to='/login'>Login</Link>
        </div>
    )
}

function logout(nav, setUserData){
    localStorage.removeItem('token')
    //todo restart
    fetch(config.urls.logout_user_url, {
        credentials: 'include',
        method: 'POST'
    })
    .then((r) => {
        setUserData('logout')
        // nav('/')
    })
}

function LoginHeaderPart(){
    const [userData, setUserData] = useState('')
    const [error, setError] = useState('')
    const nav = useNavigate()

    //todo add graphql

    useEffect(() =>{

        api.getCurrentUserInfo()
            .then(r => {
                setUserData(r)
            })
            .catch((r) => {
                setError(r)
            })
        // socket.emit("VERIFY", {'token': localStorage.getItem('token')})

    }, [])

    // // socket.on("VERIFY", (msg) => {
    // //     if (!msg.error){
    // //         setUserData(msg)
    // //         setError('')
    // //     }
    // //     else {
    // //         setError(msg.error)
    // //         setUserData('')
    // //     }
    // })

    if (!userData && !error){
        return
    }

    if (error){
        return <AnonUser />
    }
    return <AuthReadyUser user={userData} nav={nav} setUserData={setError}/>
}



export default LoginHeaderPart