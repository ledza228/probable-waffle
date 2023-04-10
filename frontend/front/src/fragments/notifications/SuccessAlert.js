

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

export default SuccessAlert