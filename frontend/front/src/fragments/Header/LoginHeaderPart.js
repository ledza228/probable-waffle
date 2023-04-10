import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
const config = require('../../config/config')


const api = require('../../api/api').api

function AuthReadyUser({user, nav, socket}){
    // console.log(user)
    return (
        <div className='d-flex flex-row'>
            <span className='navbar mx-0'>
                <Link to={'/user/' + user.login}>{user.login}</Link>
            </span>
            <a className='btn btn-outline-primary my-2 my-sm-0 mx-3' type='button' onClick={()=>logout(nav, socket)}>Logout</a>
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

function logout(nav, socket){
    localStorage.removeItem('token')
    socket.emit("VERIFY", null)
}

function LoginHeaderPart({socket}){
    const [userData, setUserData] = useState('')
    const [error, setError] = useState('')
    const nav = useNavigate()


    useEffect(async () =>{
        socket.emit("VERIFY", {'token': localStorage.getItem('token')})

    }, [])

    socket.on("VERIFY", (msg) => {
        if (!msg.error){
            setUserData(msg)
            setError('')
        }
        else {
            setError(msg.error)
            setUserData('')
        }
    })

    if (!userData && !error){
        return
    }

    if (error){
        return <AnonUser />
    }
    return <AuthReadyUser user={userData} nav={nav} socket={socket}/>
}



export default LoginHeaderPart