import React, { useState, useEffect } from "react"
import Card from "react-bootstrap/Card"
import "./css/Offers.css"

const Offers = () => {
    const [allEvents, setAllEvents] = useState([])
    const [user, setUser] = useState([])

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
        getEvents()
    }, [])

    const getEvents = async () => {
        const res = await fetch("/events", {
            method: "GET",
            headers: { "Content-Type": "application/JSON" },
        })
        await res
            .json()
            .then((data) => setAllEvents(data))
            .catch((error) => console.log(error))
    }

    const getUserInfo = async () => {
        if (localStorage.getItem("token")){
            try {
                const response = await fetch("/profile", {
                    method: "GET",
                    headers: { "Content-Type": "application/JSON" },
                })
                const user = await response.json()
                setUser(user)
            } catch (error) {
                console.error("Error:", error)
            }
        }
        else{
            return
        }
    }

    const approveEvent = async (eventid) => {
        const response = await fetch("/approveevent", {
            method: "POST",
            headers: { "Content-Type": "application/JSON" },
            body: JSON.stringify({
                eventid
            })
        })
        const rez = await response.json()
        console.log(rez)
    }
    const deleteEvent = async (eventid) => {
        const response = await fetch("/deleteevent", {
            method: "POST",
            headers: { "Content-Type": "application/JSON" },
            body: JSON.stringify({
                eventid
            })
        })
        const rez = await response.json()
        console.log(rez)
    }

    const banUser = async (userid) => {
        const response = await fetch("/deleteuser", {
            method: "POST",
            headers: { "Content-Type": "application/JSON" },
            body: JSON.stringify({
                userid
            })
        })
        const rez = await response.json()
        console.log(rez)

    }

    useEffect(() => {
        getUserInfo()
    }, [])

    console.log(allEvents)

    if (user.role === "admin") {
        console.log("admin")
        return (
            <div className="d-flex justify-content-center flex-wrap">
                {allEvents.map((item, index) => (
                    <Card style={{ width: "18rem" }} key={index} className="m-3">
                        <Card.Img variant="top" src={item.images} height={200} className="offer-image" />
                        <Card.Body>
                            <Card.Title className="offer-title">{item.title}</Card.Title>
                            <Card.Text className="offer-desc">{item.description}</Card.Text>
                            <Card.Text className="offer-location"><b>{item.address}</b></Card.Text>
                            <Card.Text className="offer-price"><b>{item.price} &euro;</b></Card.Text>
                            <Card.Text><b>STATUS: {item.status}</b></Card.Text>
                            <Card.Text><b>CREATED BY: {item.user_id}</b></Card.Text>
                            <div className="d-flex justify-content-around">
                                <button className="btn btn-success" onClick={() => {
                                    approveEvent(item._id)
                                }}>Approve</button>
                                <button className="btn btn-danger" onClick={() => {
                                    deleteEvent(item._id)
                                }}>Delete</button>
                                <button className="btn btn-danger" onClick={() => {
                                    banUser(item.user_id)
                                }}>Ban user</button>

                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        )
    }
    else {
        return (
            <div className="d-flex justify-content-center flex-wrap">
                {allEvents.map((item, index) => (
                    item.status === "approved"
                        ? <Card style={{ width: "18rem" }} key={index} className="m-2">
                            <Card.Img variant="top" src={item.images} height={200} className="offer-image" />
                            <Card.Body>
                                <Card.Title className="offer-title">{item.title}</Card.Title>
                                <Card.Text className="offer-desc">{item.description}</Card.Text>
                                <Card.Text className="offer-location"><b>{item.address}</b></Card.Text>
                                <Card.Text className="offer-price"><b>{item.price} &euro;</b></Card.Text>
                            </Card.Body>
                        </Card>
                        : null
                ))}
            </div>
        )

    }
}

export default Offers
