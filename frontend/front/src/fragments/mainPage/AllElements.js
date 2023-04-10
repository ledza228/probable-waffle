import Post from "./Post";





function AllElements({data, currentUser, updateDataFun, socket}){
    if (data.length === 0){
        return null
    }
    return (
        <div className='mt-5 bg-light d-flex flex-column p-2'>
            {data['data'].map((el) => <OneElement key={el._id} elementData={el} currentUser={currentUser}
                                                  updateDataFun={updateDataFun} socket={socket}/>)}
        </div>
    )
}




function OneElement({elementData, currentUser, updateDataFun, socket}){
    return <Post data={elementData} currentUser={currentUser} updateDataFun={updateDataFun} socket={socket}/>
}


export default AllElements