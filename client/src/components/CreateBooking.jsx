import React, { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

const CreateBooking = () => {
    const [user_id_body, setUser_id_body] = useState("")
    const [title_body, setTitle_body] = useState("")
    const [description_body, setDescription_body] = useState("")
    const [address_body, setAddress_body] = useState("")
    const [postal_code_body, setPostal_code_body] = useState("")
    const [price_body, setPrice_body] = useState("")
    const [images_body, setImages_body] = useState("")

    // verify
    useEffect(() => {
        const checkIfLoggedIn = () => {
            const token = localStorage.getItem("token")
            if (token) {
                fetch("/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/JSON" },
                    body: JSON.stringify({ token }),
                })
            } else {
                console.log("unverified")
                window.location.href = "/login"
            }
        }
        checkIfLoggedIn()
        getUserInfo()
    }, [])

    const getUserInfo = async () => {
        try {
            const response = await fetch("/profile", {
                method: "GET",
                headers: { "Content-Type": "application/JSON" },
            })
            const user = await response.json()
            setUser_id_body(user._id)
        } catch (error) {
            console.error("Error:", error)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (
            user_id_body === "" ||
            title_body === "" ||
            description_body === "" ||
            address_body === "" ||
            postal_code_body === "" ||
            price_body === "" ||
            images_body === "") {
            console.log("all fields are required")
        } else {
            const submitEvent = async () => {
                try {
                    const response = await fetch("/create", {
                        method: "POST",
                        headers: { "Content-Type": "application/JSON" },
                        body: JSON.stringify({
                            user_id_body,
                            title_body,
                            description_body,
                            address_body,
                            postal_code_body, 
                            price_body,
                            images_body
                        })
                    })
                    if (response.status === 201) {
                        console.log("success")
                        window.location.href = "/"
                    }
                }
                catch (error) {
                    console.log(error)
                }
            }
            submitEvent()
        }
    }

    console.log(
        user_id_body,
        title_body,
        description_body,
        address_body,
        postal_code_body,
        price_body,
        images_body
    )

    return (
        <Form
            onSubmit={handleSubmit}
            className="d-flex-column justify-content-around m-3"
        >
            <Form.Group className="row">
                <div className="col">
                    <div>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            onChange={(e) => {
                                setTitle_body(e.target.value)
                            }}
                            maxLength={50}
                            required
                        ></Form.Control>
                    </div>
                </div>

                <div className="col">
                    <div>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Description"
                            onChange={(e) => {
                                setDescription_body(e.target.value)
                            }}
                            maxLength={500}
                            required
                        ></Form.Control>
                    </div>
                </div>
            </Form.Group>

            <Form.Group className="row">
                <div className="col">
                    <div>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Address"
                            onChange={(e) => {
                                setAddress_body(e.target.value)
                            }}
                            maxLength={50}
                            required
                        ></Form.Control>
                    </div>
                </div>

                <div className="col">
                    <div>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Postal Code"
                            onChange={(e) => {
                                setPostal_code_body(e.target.value)
                            }}
                            maxLength={50}
                            required
                        ></Form.Control>
                    </div>
                </div>
            </Form.Group>

            <Form.Group className="row">
                <div className="col">
                    <div>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="0"
                            onChange={(e) => {
                                setPrice_body(e.target.value)
                            }}
                            max={9999999999}
                            min={0}
                            required
                        ></Form.Control>
                    </div>
                </div>
            </Form.Group>

            <Form.Group>
                <Form.Label>Image</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="https://i.imgur.com/yourimage.png"
                    onChange={(e) => {
                        setImages_body(e.target.value)
                    }}
                    required
                ></Form.Control>
            </Form.Group>

            <Button className="btn m-3" onClick={handleSubmit}>Submit</Button>
        </Form>
    )
}

export default CreateBooking
