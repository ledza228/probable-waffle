import Post from "./Post";





function AllElements({data, currentUser, updateDataFun}){
    if (data.length === 0){
        return null
    }
    return (
        <div className='mt-5 bg-light d-flex flex-column p-2'>
            {data.map((el) => <OneElement key={el._id} elementData={el} currentUser={currentUser}
                                                  updateDataFun={updateDataFun} />)}
        </div>
    )
}




function OneElement({elementData, currentUser, updateDataFun}){
    return <Post data={elementData} currentUser={currentUser} updateDataFun={updateDataFun} />
}


export default AllElements