import './App.css';
import {
    Button,
    Col,
    Container,
    Form,
    FormControl,
    Nav,
    Navbar,
    Row,
} from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Restaurants from './Restaurants';
import Restaurant from './Restaurant';
import About from './About';
import Notfound from './NotFound';
import { gsap } from 'gsap';
function App() {
    let [searchString, setSearchString] = useState('');
    let history = useHistory();
    const revealRefs = useRef([]);
    revealRefs.current = [];

    const addToRefs = (el) => {
        if (el && !revealRefs.current.includes(el)) {
            revealRefs.current.push(el);
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
        history.push(
            `/restaurants?borough=${
                searchString.charAt(0).toUpperCase() +
                searchString.slice(1).toLowerCase()
            }`
        );
    }

    useEffect(() => {
        gsap.from(revealRefs.current, {
            duration: 1,
            autoAlpha: 0,
            ease: 'none',
            delay: 1,
            stagger: 1,
        });
    }, []);

    return (
        <div>
            <div ref={addToRefs}>
                <Navbar expand="lg" bg="dark" variant="dark">
                    <LinkContainer to="/">
                        <Navbar.Brand>New York Restaurants</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer to="/restaurants">
                                <Nav.Link>Full List</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/about">
                                <Nav.Link>About</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        <Form onSubmit={handleSubmit} inline>
                            <FormControl
                                type="text"
                                placeholder="Look for Borough"
                                className="mr-sm-3"
                                value={searchString}
                                onChange={(e) =>
                                    setSearchString(e.target.value)
                                }
                            />
                            <Button type="submit" variant="outline-warning">
                                Search
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <br />
            <Container>
                <Row>
                    <Col>
                        <div ref={addToRefs}>
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    render={() => (
                                        <Redirect to="/Restaurants" />
                                    )} //res.redirect('/');
                                />

                                <Route
                                    
                                    path="/Restaurants"
                                    render={(props) => (
                                        <Restaurants
                                            query={props.location.search}
                                        />
                                    )}
                                />

                                <Route
                                    path="/Restaurant/:id"
                                    render={(props) => (
                                        <Restaurant
                                            id={props.match.params.id}
                                        />
                                    )}
                                />

                                <Route
                                    exact
                                    path="/about"
                                    render={() => <About />}
                                />

                                <Route render={() => <Notfound />} />
                            </Switch>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
