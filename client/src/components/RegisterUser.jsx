import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const RegisterUser = () => {
    const [firstNameRegister, setFirstNameRegister] = useState("")
    const [lastNameRegister, setLastNameRegister] = useState("")
    const [emailRegister, setEmailRegister] = useState("")
    const [passwordRegister, setPasswordRegister] = useState("")

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
            const response = await fetch("/register", {
                method: "POST",
                headers: {"Content-Type": "application/JSON"},
                body: JSON.stringify({
                    firstNameRegister: firstNameRegister,
                    lastNameRegister: lastNameRegister,
                    emailRegister: emailRegister,
                    passwordRegister: passwordRegister
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
                <Form.Group className="row">
                    <div className="col">
                        <div>
                            <Form.Label>First Name</Form.Label>
                        </div>
                        <Form.Control
                        type="text"
                        placeholder="John"
                        onChange={(e) => {setFirstNameRegister(e.target.value)}}
                        required></Form.Control>

                    </div>

                    <div className="col">
                        <div>
                            <Form.Label>Last Name</Form.Label>
                        </div>
                        <Form.Control
                        type="text"
                        placeholder="Doe"
                        onChange={(e) => {setLastNameRegister(e.target.value)}}
                        required></Form.Control>
                    </div>

                </Form.Group>
            </Form.Group>

            <Form.Group>
                <div>
                    <Form.Label>E-Mail</Form.Label>
                </div>
                <Form.Control
                type="email"
                placeholder="example@mail.com"
                onChange={(e) => {setEmailRegister(e.target.value)}}
                required></Form.Control>
            </Form.Group>

            <Form.Group>
                <div>
                    <Form.Label>Password</Form.Label>
                </div>
                <Form.Control
                type="password"
                placeholder="*******"
                onChange={(e) => {setPasswordRegister(e.target.value)}}
                required></Form.Control>
            </Form.Group>
            <div className="d-grid">
                <Button type="submit" className="btn btn-primary m-3">Register</Button>
            </div>
            <p className="text-center">OR</p>
            <Link to="/login" className="justify-content-center d-flex">Click here to login</Link>
        </Form>
    )
}

export default RegisterUser
