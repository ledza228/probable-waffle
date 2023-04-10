import LoginHeaderPart from "./LoginHeaderPart";
import {Link, useNavigate} from "react-router-dom";

function Header({socket}){

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to={'/'} className="navbar-brand">
                    <img src={require('../../static/logo.png')} alt=""
                         width="35" height="29" className="d-inline-block align-text-top"/>
                    <span>Fish Land</span>
                </Link>
            </div>
            <LoginHeaderPart socket={socket} />
        </nav>
    )
}

export default Header

