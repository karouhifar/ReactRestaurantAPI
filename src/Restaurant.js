import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Card, CardDeck } from 'react-bootstrap';
import Moment from 'react-moment';
import 'moment-timezone';
import { BarLoader } from 'react-spinners';
export default function Restaurant(props) {
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(
            `https://desolate-sea-28067.herokuapp.com/api/restaurants/${props.id}`
        )
            .then((response) => response.json())
            .then((restaurant) => {
                setLoading(false);
                if (restaurant.hasOwnProperty('_id')) {
                    setRestaurant(restaurant);
                } else {
                    setRestaurant(null);
                }
            });
    }, [props.id]);

    if (!loading) {
        if (restaurant) {
            return (
                <div>
                    <Card bg="secondary" text="white">
                        <Card.Header>
                            <Card.Title>
                                <h2>{restaurant.name}</h2>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <h3>
                                {restaurant.address.building}{' '}
                                {restaurant.address.street}
                            </h3>
                            <br />
                            <MapContainer
                                style={{ height: '400px' }}
                                center={[
                                    restaurant.address.coord[1],
                                    restaurant.address.coord[0],
                                ]}
                                zoom={13}
                                scrollWheelZoom={false}
                            >
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker
                                    position={[
                                        restaurant.address.coord[1],
                                        restaurant.address.coord[0],
                                    ]}
                                ></Marker>
                            </MapContainer>
                        </Card.Body>
                    </Card>
                    <br />
                    <CardDeck>
                        {restaurant.grades.map((restaurantSmall, i) => (
                            <Card
                                bg={
                                    restaurantSmall.grade === 'A'
                                        ? 'success'
                                        : restaurantSmall.grade === 'B'
                                        ? 'warning'
                                        : 'danger'
                                }
                                text={
                                    restaurantSmall.grade === 'B'
                                        ? 'black'
                                        : 'white'
                                }
                            >
                                <Card.Header>
                                    <Card.Title key={i}>
                                        grade: {restaurantSmall.grade}
                                    </Card.Title>
                                </Card.Header>
                                <Card.Footer key={i}>
                                    <Card.Text>
                                        Date :
                                        <Moment format="YYYY/MM/DD">
                                            {restaurantSmall.date}
                                        </Moment>
                                    </Card.Text>
                                </Card.Footer>
                            </Card>
                        ))}
                    </CardDeck>
                </div>
            );
        } else {
            return (
                <div>
                    <h3>Restaurant {props.id}</h3>
                    <p>Not Found...</p>
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
