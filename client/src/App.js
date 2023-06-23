import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import NavBar from "./components/NavBar"
import Home from "./components/Home"
import RegisterUser from "./components/RegisterUser"
import LoginUser from "./components/LoginUser"
import CreateBooking from "./components/CreateBooking"
function App() {
    return (
        <Router>
            <div className="App">
                
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<LoginUser/>} />
                    <Route path="/register" element={<RegisterUser/>} />
                    <Route path="/create" element={<CreateBooking/>} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
