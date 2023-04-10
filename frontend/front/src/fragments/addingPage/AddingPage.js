import {useState} from "react";
import {useNavigate} from "react-router-dom";

const config = require('../../config/config.js')
const api = require('../../api/api').api
const fetch = require('fetch-retry')(global.fetch);


var setErrorFunc
var setSuccessFunc

async function sendData(event, socket) {
    event.preventDefault()

    let body = {
        'title': event.target[0].value,
        'text': event.target[1].value,
        'token': localStorage.getItem('token')
    }


    if (event.target[2].files[0]) {
        let reader = new FileReader()
        reader.readAsDataURL(event.target[2]?.files[0])

        reader.onload = function () {
            body.file = reader.result
            socket.emit("ADD_POST", body)
        };
        reader.onerror = function (error) {
            setErrorFunc('Error with image!')
        };
    }
    else{
        socket.emit("ADD_POST", body)
    }

    return false
}


function Alert({error}){
    console.log(error)
    if (error == ''){
        return
    }
    setSuccessFunc('')
    return (
        <div className='alert alert-primary' role="alert">
            {error}
        </div>
    )
}

function SuccessAlert({success}){
    if (success == ''){
        return
    }
    return (
        <div className='alert alert-success' role="alert">
            {success}
        </div>
    )
}

function AddingPage({socket}){
    const [error, setError] = useState([])
    const [success, setSuccess] = useState([])

    const nav = useNavigate()


    socket.on("ADD_POST", msg => {
        if (!msg.error){
            nav('/')
        }
        else {
            setError(msg.error)
        }
    })

    return (
        <div>
            <div>
                <Alert error={error} />
            </div>
            <div>
                <SuccessAlert success={success}/>
            </div>
            <form className="pt-5" onSubmit={(e) => sendData(e, socket)} encType='multipart/form-data'>
                <div className="mb-3 container">
                    <label htmlFor="title" className="form-label">Название</label>
                    <input type='text' className='form-control col-auto' name='title' id='title' placeholder='названиe поста'/>
                </div>
                {/*<div className="mb-3 container">*/}
                {/*    <label className="form-label" htmlFor='name'>Имя</label>*/}
                {/*    <input type='text' className='form-control' name='name' id='name' placeholder="не обязательно"/>*/}
                {/*</div>*/}
                <div className="mb-3 container">
                    <label className="form-label" htmlFor='text'>Текст</label>
                    <textarea className='form-control col-auto' rows='9' name='text' id='text'/>
                </div>
                <div className="mb-3 container">
                    <label className="form-label" htmlFor='file'>Фото</label>
                    <input type='file' id='file' name='file' className='form-control col-auto' multiple/>
                </div>
                <div className="mb-3 container">
                    <input type='submit' className='btn btn-success' value='Создать'/>
                </div>
            </form>
        </div>
    )
}

export default AddingPage



