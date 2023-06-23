import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"

function NavBar() {
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        const checkIfLoggedIn = () => {
            const token = localStorage.getItem("token")
            if (token) {
                fetch("/verify", {
                    method: "POST",
                    mode: "cors",
                    headers: { "Content-Type": "application/JSON" },
                    body: JSON.stringify({ token }),
                })
                setIsLogged(true)
            } else {
                setIsLogged(false)
            }
        }
        checkIfLoggedIn()
    }, [])


    // const logoutuser = async () => {
    //     try {
    //         const response = await fetch("/logout", {
    //             method: "GET",
    //             headers: { "Content-Type": "application/JSON" },
    //         })
    //         const res = await response.json()
    //     } catch (error) {
    //         console.error("Error:", error)
    //     }
    // }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                    <Nav>
                        {isLogged ? (
                            <Nav.Link
                                className="align-right"
                                href="/create">
                                <Button>Create</Button>
                            </Nav.Link>
                        ) : null}
                        {isLogged ? (
                            <Nav.Link
                                href="/"
                                className="align-right"
                                onClick={() => { 
                                    localStorage.clear()
                                }}>
                                <Button className="btn-danger">Logout</Button>
                            </Nav.Link>
                        ) : (
                            <Nav.Link href="/login"><Button>Login</Button></Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar
