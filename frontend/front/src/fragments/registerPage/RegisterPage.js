import {useState} from "react";
import SuccessAlert from "../notifications/SuccessAlert";
import Alert from "../notifications/Alert";
import {useNavigate} from "react-router-dom";
const LoginHeaderPart = require('../Header/LoginHeaderPart')

const config = require('../../config/config')


let setErrorFunc;
let setSuccessFunc;

function sendData(event){
    event.preventDefault()

    let body = {
        'login': event.target[0].value,
        'password': event.target[1].value
    }

    fetch(config.urls.register_user_url, {
        credentials: 'include',

        body: JSON.stringify(body),
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
    }).then(async (r) => {
        if (!r.ok){
            setSuccessFunc('')
            setErrorFunc((await r.json())['status'])
            return
        }
        setErrorFunc('')
        setSuccessFunc('Created')
        localStorage.setItem('token', (await r.json())['token'])
        // window.location = '/'
    })

    return false
}


function RegisterPage(){
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const nav = useNavigate()

    setErrorFunc = setError
    setSuccessFunc = setSuccess

    return (
        <div>
            <div>
                <Alert error={error} />
            </div>
            <div>
                <SuccessAlert success={success}/>
            </div>
            <form className="pt-5" onSubmit={(event)=>sendData(event)} encType='application/json'>
                <div className="mb-3 container">
                    <label htmlFor="login" className="form-label">Login</label>
                    <input type='text' className='form-control col-auto' name='login' id='login' placeholder='Логин'/>
                </div>
                <div className="mb-3 container">
                    <label className="form-label" htmlFor='password'>Password</label>
                    <input type='password' className='form-control' name='password' id='password' placeholder='Пароль'/>
                </div>
                <div className="mb-3 container">
                    <input type='submit' className='btn btn-success' value='Регистрация'/>
                </div>
            </form>
        </div>
    )

}


export default RegisterPage