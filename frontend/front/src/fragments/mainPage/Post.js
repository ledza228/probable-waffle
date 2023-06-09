import {Link} from "react-router-dom";
import {client} from "../../api/grapql";
import {gql} from "@apollo/client";

const api = require('../../api/api')


async function deleteOnClick(posts, event, updateDataFun) {
    let postId = event.target.id
    console.log(postId)

    client.mutate({
        mutation: gql`
          mutation RemoveFishPost($_id: MongoID!) {
              fishPostRemoveById(_id: $_id) {
                recordId
              }
            }`, variables: {
            _id: postId
        },
        context: {
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
        },
    })
    .then((r) => {
        updateDataFun()
    })
}

function DeleteButton({currentUser, data, updateDataFun}){
    if (currentUser.login !== data.author){
        return
    }
    return <div>
        <button className='btn btn-danger' onClick={(e)=>{
            deleteOnClick(null,e, updateDataFun)
        }} id={data._id}>Delete</button>
    </div>
}

function Photo({data}){
    console.log(data)
    if (data['image'] !== null){
        let addr = 'http://localhost:4000'
        return (
            <img src={addr + data.image} width={400} alt={''}></img>
        )
    }
}

function Post({data, currentUser, updateDataFun}){
    return (
        <div className='p-3 border border-2 mb-4'>
            <div className='border-bottom d-flex flex-column bd-highlight mb-3 pl-3 font-monospace'>
                <div className='d-flex justify-content-between'>
                <span className='p-1 bd-highlight fs-5'>
                    {data.title}
                </span>
                <DeleteButton currentUser={currentUser} data={data} updateDataFun={updateDataFun} />
                </div>
                <span className='p-1 bd-highlight text-black-50 fw-light'>
                    {'автор: '}
                    <Link to={'/user/' + data.author}>{ data.author}</Link>
                    {'  '}
                    <span className='p-0 bd-highlight'>
                        {data.createdAt.toLocaleString()}
                    </span>
                </span>
            </div>
            <div className='d-flex flex-raw'>
            <Photo data={data} />
            <p className='p-2'>
                {data.text}
            </p>
            </div>
        </div>
    )
}


export default Post