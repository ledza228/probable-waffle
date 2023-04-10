

function Alert({error}){
    console.log(error)
    if (error == ''){
        return
    }

    return (
        <div className='alert alert-primary' role="alert">
            {error}
        </div>
    )
}

export default Alert