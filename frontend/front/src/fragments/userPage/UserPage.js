import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Alert from "../notifications/Alert";
import AllElements from "../mainPage/AllElements";
const api = require('../../api/api')

function Login({user}){
    let bio = ''
    if (user?.bio !== ''){
        bio = user.bio
    }

    return <div className='container'>
        <span className='display-6 lead'>{user.login}</span>
        <div className='mt-auto pt-5 lead'>
            {bio}
        </div>
    </div>
}

function Avatar({user}){
    console.log(user)
    let imageSrc = 'https://avatars.mds.yandex.net/i?id=d0210080a5ca291de51cb5534a8d1b550e006c88-8206955-images-thumbs&n=13'
    if (user?.image !== ''){
        imageSrc = user.image
    }

    return <img src={imageSrc} height='300px' alt=''/>
}


//TODO end control button and add user posts
function ControlButtons({user, currentUser}){
    if (user.login !== currentUser?.login){
        return
    }
    return <div></div>
}

function UserPage({socket}){
    let {login} = useParams()

    const [userData, setUserData] = useState('')
    const [error, setError] = useState('')
    const [me, setMe] = useState('')
    const [posts, setPosts] = useState('')


    let updatePosts = () => {
        socket.emit("USER_POSTS", {'login': login})
    }

    useEffect(()=>{
        socket.emit("VERIFY", {'token': localStorage.getItem('token')})
        socket.emit("USER_BY_LOGIN", {'login': login})
        updatePosts()
    },[])

    socket.on("VERIFY", (msg) => {
        if (!msg.error){
            setMe(msg)
        }
    })

    socket.on("USER_BY_LOGIN", (msg) => {
        if (!msg.error){
            setUserData(msg)
        }
        else {
            setError(msg.error)
        }
    })

    socket.on("USER_POSTS", (msg)=> {
        if (!msg.error){
            setPosts(msg)
        }
    })

    socket.on("DELETE_POST", (msg) => {
        if (!msg.error){
            updatePosts()
        }
    })


    if (!userData && !error && !posts){
        return
    }

    if (error){
        return <Alert error={error}/>
    }

    return <div className='px-3 pt-3'>
        <div className='d-flex justify-content-between'>
            <Avatar user={userData}/>
            <Login user={userData}/>
            <div></div>
        </div>
        <ControlButtons currentUser={me} user={userData}/>
        <AllElements data={posts} currentUser={me} socket={socket} />
    </div>

}

export default UserPage