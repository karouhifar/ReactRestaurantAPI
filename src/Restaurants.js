import { useState, useEffect, useRef, useCallback } from 'react';
import queryString from 'query-string';
import { Card, Table, Pagination } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { gsap, Power3 } from 'gsap';
function Restaurants(props) {
    const [restaurants, setRestaurants] = useState(null);
    const [page, setPage] = useState(1);
    let history = useHistory();
    const perPage = 10;
    const myStyleMain = {
        fontSize: '2rem',
        fontFamily: 'Cursive',
        padding: '10px',
    };

    useEffect(() => {
        let url = '';
        if (props.query) {
            const parsed = queryString.parse(props.query);
            console.log(parsed.borough);
            url = `https://desolate-sea-28067.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}&borough=${parsed.borough}`;
        } else
            url = `https://desolate-sea-28067.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setRestaurants(data);
                setPage((page) => page);
            })
            .catch((err) => {
                console.log('There is an error:' + err);
            });
    }, [props.query, page]);
    function previousPage() {
        if (page > 1) {
            setPage((page) => page - 1);
        }
    }

    function nextPage() {
        setPage((page) => page + 1);
    }

    const SASF = useRef([]);
    SASF.current = [];
    const SA = useCallback(
        (el) => {
            if (restaurants && el && !SASF.current.includes(el)) {
                SASF.current.push(el);
            }
        },
        [restaurants]
    );

    useEffect(() => {
        if (SASF && restaurants) {
            const tl = new gsap.timeline();
            tl.from(SASF.current, {
                duration: 1,
                autoAlpha: 0,
                ease: 'power2.out',
                stagger: 1,
                y: -500,
            });
        }
    }, [restaurants]);

    if (restaurants) {
        if (restaurants.length) {
            return (
                <div>
                    <style type="text/css">
                        {`
                thead{background-color:blue;}
                `}
                    </style>

                    <Card bg="secondary" text="white">
                        <Card.Header>
                            <h2>Restaurant List</h2>
                        </Card.Header>
                        <Card.Body className="text-center">
                            <p>
                                Full list of restaurants. Optionally sorted by
                                borough
                            </p>
                            <br />
                            <div>
                                <Table
                                    responsive
                                    striped
                                    bordered
                                    hover
                                    variant="dark"
                                >
                                    <thead>
                                        <tr>
                                            <th>name</th>
                                            <th>address</th>
                                            <th>borough</th>
                                            <th>cuisine</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {restaurants.map((restaurant, i) => (
                                            <tr
                                                ref={SA}
                                                key={restaurant._id}
                                                onClick={() => {
                                                    history.push(
                                                        `/restaurant/${restaurant._id}`
                                                    );
                                                }}
                                            >
                                                <td>{restaurant.name}</td>
                                                <td>
                                                    {
                                                        restaurant.address
                                                            .building
                                                    }{' '}
                                                    {restaurant.address.street}
                                                </td>
                                                <td>{restaurant.borough}</td>
                                                <td>{restaurant.cuisine}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            <Pagination>
                                <Pagination.Prev onClick={previousPage} />
                                <Pagination.Item>{page}</Pagination.Item>
                                <Pagination.Next onClick={nextPage} />
                            </Pagination>
                        </Card.Body>
                    </Card>
                    <br />
                </div>
            );
        } else {
            return (
                <div>
                    <Card style={myStyleMain}>
                        <Card.Header>
                            <Card.Title>
                                <h1>
                                    Bad Request<code>-400</code>
                                </h1>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <p>We can't find what you're looking for...</p>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">
                                <p>
                                    <Link to="/">Return Home</Link>
                                </p>
                            </small>
                        </Card.Footer>
                    </Card>
                </div>
            );
        }
    } else {
        return (
            <div className="loading">
                <h2>Loading</h2>
                <BarLoader size={150} color="orange" loading />
            </div>
        );
    }
}

export default Restaurants;
