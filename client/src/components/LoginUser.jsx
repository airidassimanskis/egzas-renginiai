import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const RegisterUser = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // verify
    useEffect(() => {
        const checkIfLoggedIn = () => {
            const token = localStorage.getItem("token")
            if (token) {
                fetch("/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/JSON" },
                    body: JSON.stringify({token})
                })
                window.location.href = "/"
            }
            else {
                console.log("unverified")
            }
        }
        checkIfLoggedIn()
    }, [])


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/JSON"},
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const data = await response.json()
            const token = data.token
            localStorage.setItem("token", token)
            console.log("logged in")
            window.location.href = "/"
        } catch (error) {
            console.log(error)
        }
    }

    
    

    return (
        <Form onSubmit={handleSubmit} className="d-flex-column justify-content-around m-3">
            <Form.Group>
                <Form.Label>E-Mail</Form.Label>
                <Form.Control
                type="email"
                placeholder="example@mail.com"
                onChange={(e) => {setEmail(e.target.value)}}
                required></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                placeholder="*******"
                onChange={(e) => {setPassword(e.target.value)}}
                required></Form.Control>
            </Form.Group>
            <div className="d-grid">
                <Button type="submit" className="btn btn-primary m-3">Login</Button>
            </div>
            <p className="text-center">OR</p>
            <Link to="/register" className="justify-content-center d-flex">Click here to register</Link>
        </Form>
    )
}

export default RegisterUser
