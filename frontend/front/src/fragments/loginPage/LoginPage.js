import Alert from "../notifications/Alert";
import SuccessAlert from "../notifications/SuccessAlert";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
const config = require('../../config/config')

let setErrorFunc
let setSuccessFunc

function sendData(event, socket){
    event.preventDefault()

    let body = {
        'login': event.target[0].value,
        'password': event.target[1].value
    }

    socket.emit('LOGIN', body)

    // fetch(config.urls.login_user_url, {
    //     credentials: 'include',
    //     body: JSON.stringify(body),
    //     method: 'POST',
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // }).then(async (r) => {
    //     if (!r.ok){
    //         setSuccessFunc('')
    //         setErrorFunc((await r.json())['status'])
    //         return
    //     }
    //     setErrorFunc('')
    //     setSuccessFunc('Logged in')
    //     localStorage.setItem('refresh_token', (await r.json())['refresh_token'])
    //     window.location = '/'
    // })

    return false
}

function LoginPage({socket}){

    const nav = useNavigate()

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    socket.on("LOGIN", (msg) => {
        if (!msg.error){
            localStorage.setItem('token', msg.token)
            socket.emit('VERIFY', msg.token)
            nav('/')
        }
        else {
            setError(msg.error)
        }
    })

    setErrorFunc = setError
    setSuccessFunc = setSuccess

    return (<div>
        <div>
            <Alert error={error} />
        </div>
        <div>
            <SuccessAlert success={success}/>
        </div>
        <form className="pt-5" onSubmit={(e) => sendData(e, socket)} encType='application/json'>
            <div className="mb-3 container">
                <label htmlFor="login" className="form-label">Login</label>
                <input type='text' className='form-control col-auto' name='login' id='login' placeholder='Логин'/>
            </div>
            <div className="mb-3 container">
                <label className="form-label" htmlFor='password'>Password</label>
                <input type='password' className='form-control' name='password' id='password' placeholder='Пароль'/>
            </div>
            <div className="mb-3 container">
                <input type='submit' className='btn btn-success' value='Войти'/>
            </div>
        </form>
    </div>)
}



export default LoginPage