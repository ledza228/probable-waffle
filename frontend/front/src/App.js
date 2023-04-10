import './App.css';
import {Route, Routes} from "react-router-dom";
import Header from "./fragments/Header/Header";
import AddingPage from "./fragments/addingPage/AddingPage";
import MainPage from "./fragments/mainPage/MainPage";
import RegisterPage from "./fragments/registerPage/RegisterPage";
import LoginPage from "./fragments/loginPage/LoginPage";
import UserPage from "./fragments/userPage/UserPage";
import {useEffect, useState} from "react";
import { io } from "socket.io-client"

async function fuck(socket){
    if (!socket){
        return
    }
    socket.emit("GET_POSTS", {'page': 1})
}

function App() {

    const [socket, setSocket] = useState()

    useEffect(() => {
        setSocket(io("ws://localhost:5000"))
    }, [])

    if (!socket){
        return
    }

    return (
        <div className="App">
          <Header socket={socket}/>
          <Routes>
            <Route path="/" element={<MainPage socket={socket} />}/>
            <Route path="/add" element={<AddingPage socket={socket} />}/>
            <Route path="/register" element={<RegisterPage socket={socket}/>} />
            <Route path="/login" element={<LoginPage socket={socket} />} />
            <Route path="/user/:login" element={<UserPage socket={socket}/>} />
            {/*<Route path="/logout" element={LogoutFragment()} />*/}
          </Routes>
        </div>
  );
}

export default App;
