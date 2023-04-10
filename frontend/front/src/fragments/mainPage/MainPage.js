import {Link, useLocation, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Post from "./Post";
import * as config from "../../config/config";
import AllElements from "./AllElements";
import {gql} from "@apollo/client";

const api = require('../../api/api')
const client = require('../../api/grapql').client


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


function MainPage() {
    const [currPage, setCurrPage] = useState(GetCurrentPage(useLocation().search))
    const [data, setData] = useState([])
    const [currentUser, setCurrentUser] = useState('')
    const [totalPages, setTotalPages] = useState('')

    let updateDataFun = function () {
        let limit = 5
        let skip = limit * (currPage - 1)

        client.query({
            query: gql`
                query {
                     fishPostMany(limit: ${limit}, skip: ${skip}, sort: _ID_DESC) {
                           text, _id, title, author, createdAt, image
                     }
                }`
        })
        .then((r) => {
            setData(r.data.fishPostMany)
        })

        client.query({
            query: gql`
                query{fishPostCount}
            `
        })
        .then((r) => {
            setTotalPages(Math.ceil(r.data.fishPostCount / limit))
        })
    }

    useEffect(() => {
        updateDataFun()
        let token = localStorage.getItem('token')
    }, [currPage])


    if (!data || !totalPages) {
        return null
    }

    return (
        <div>
            <div className='container mt-5'>
                <Link className='btn btn-primary' to={'/add'}>Написать про рыбалку</Link>
                <AllElements updateDataFun={updateDataFun} data={data} currentUser={currentUser} />
            </div>
            <Pagination totalPages={totalPages} currPage={currPage} setCurrPage={setCurrPage}/>
        </div>
    )
}

export default MainPage