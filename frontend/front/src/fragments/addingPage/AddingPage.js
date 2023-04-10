import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {gql} from "@apollo/client";

const config = require('../../config/config.js')
const api = require('../../api/api').api

const client = require('../../api/grapql').client

// const fetch = require('fetch-retry')(global.fetch);


var setErrorFunc
var setSuccessFunc


async function createFile(event){
    return "231231312"
}

async function sendData(event, nav) {
    event.preventDefault()

    let body = {
        'title': event.target[0].value,
        'text': event.target[1].value,
        // 'token': localStorage.getItem('token')
    }

    let file = await createFile(event)

    if (file){
        body.file = file
    }

    client.mutate({
        mutation: gql`
    mutation CreateFishPost($title: String!, $text: String!, $file: String!) {
      fishPostCreateOne(record: {
        title: $title,
        text: $text,
        image: $file
      }) {
        record {
          title
          author
        }
      }
    }
  `, variables: body,
    context: {
        headers: {
            'Authorization': localStorage.getItem('token'),
        },
    },
    }).then((r) => {
            nav('/')
        })


    // //
    // // if (event.target[2].files[0]) {
    // //     let reader = new FileReader()
    // //     reader.readAsDataURL(event.target[2]?.files[0])
    // //
    // //     reader.onload = function () {
    // //         body.file = reader.result
    // //         // socket.emit("ADD_POST", body)
    // //     };
    // //     reader.onerror = function (error) {
    // //         setErrorFunc('Error with image!')
    // //     };
    // }
    // else{
    //     // socket.emit("ADD_POST", body)
    // }

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

function AddingPage(){
    const [error, setError] = useState([])
    const [success, setSuccess] = useState([])

    const nav = useNavigate()

    return (
        <div>
            <div>
                <Alert error={error} />
            </div>
            <div>
                <SuccessAlert success={success}/>
            </div>
            <form className="pt-5" onSubmit={(e) => sendData(e, nav)} encType='multipart/form-data'>
                <div className="mb-3 container">
                    <label htmlFor="title" className="form-label">Название</label>
                    <input type='text' className='form-control col-auto' name='title' id='title' placeholder='названиe поста'/>
                </div>
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



