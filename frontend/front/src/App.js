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

    return (
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<MainPage  />}/>
            <Route path="/add" element={<AddingPage  />}/>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage  />} />
            <Route path="/user/:login" element={<UserPage />} />
            {/*<Route path="/logout" element={LogoutFragment()} />*/}
          </Routes>
        </div>
  );
}

export default App;
