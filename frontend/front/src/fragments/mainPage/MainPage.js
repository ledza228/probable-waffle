import {Link, useLocation, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Post from "./Post";
import * as config from "../../config/config";
import AllElements from "./AllElements";

const api = require('../../api/api')


function GetCurrentPage(searchString) {
    let params = new URLSearchParams(searchString)
    let currPage = params.get('page')

    if (currPage === undefined || currPage == null || currPage < 1) {
        currPage = '1'
    }
    return currPage
}

function Pagination({totalPages, currPage, setCurrPage}) {

    if (!totalPages || !currPage) {
        return null
    }

    let pages = []
    for (let i = currPage - 2; i < currPage + 2; i++) {
        if (i <= 0 || i > totalPages) {
            continue
        }
        pages.push(i)
    }
    if (pages.indexOf(1) === -1)
        pages.unshift(1)
    if (pages.indexOf(totalPages) === -1)
        pages.push(totalPages)
    return (
        <div className='d-flex justify-content-center flex-nowrap mt-4'>
            <ul className='pagination pagination-sm'>
                {pages.map((v) => PaginationButton(v, currPage, setCurrPage))}
            </ul>
        </div>
    )
}

function PaginationButton(val, current, setCurrPage) {
    if (val == current) {
        return <li className='page-item disabled'>
            <a onClick={() => {
                setCurrPage(val)
            }} className='page-link' tabIndex='-1'>{val}</a>
        </li>
    }
    return <li className='page-item'>
        <a onClick={() => {
            setCurrPage(val)
        }} className='page-link'>{val}</a>
    </li>
}

async function fetchElements(page) {
    return await (await fetch(config.urls.fetch_posts_url + '?' + new URLSearchParams({page: page}))).json()
}


function MainPage({socket}) {
    const [currPage, setCurrPage] = useState(GetCurrentPage(useLocation().search))
    const [data, setData] = useState([])
    const [currentUser, setCurrentUser] = useState('')
    let updateDataFun = function () {
        socket.emit("GET_POSTS", {'page': currPage})
    }

    useEffect(() => {
        updateDataFun()
        let token = localStorage.getItem('token')
        if (token){
            socket.emit("VERIFY", {'token': localStorage.getItem('token')})
        }
    }, [currPage])

    socket.on("VERIFY", (msg) => {
        if (!msg.error){
            setCurrentUser(msg)
        }
    })

    socket.on("GET_POSTS", (msg) => {
        setData(msg)
    })

    socket.on("DELETE_POST", (msg) => {
        if (!msg.error){
            updateDataFun()
        }
    })

    if (!data) {
        return null
    }
    return (
        <div>
            <div className='container mt-5'>
                <Link className='btn btn-primary' to={'/add'}>Написать про рыбалку</Link>
                <AllElements updateDataFun={updateDataFun} data={data} currentUser={currentUser} socket={socket}/>
            </div>
            <Pagination totalPages={data['totalPages']} currPage={currPage} setCurrPage={setCurrPage}/>
        </div>
    )
}

export default MainPage