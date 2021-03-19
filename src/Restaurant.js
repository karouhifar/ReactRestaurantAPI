import { useState, useEffect } from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    LayersControl,
    Tooltip,
} from 'react-leaflet';
import { Card, CardDeck } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import { BarLoader } from 'react-spinners';
export default function Restaurant(props) {
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(
            `https://gentle-mesa-25260.herokuapp.com/api/restaurants/${props.id}`,
            { method: 'GET' }
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
                                zoom={45}
                                scrollWheelZoom={true}
                            >
                                <LayersControl position="topright">
                                    <LayersControl.BaseLayer
                                        checked
                                        name="Mapnik (Default)"
                                    >
                                        <TileLayer
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                    </LayersControl.BaseLayer>
                                    <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
                                        <TileLayer
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                                        />
                                    </LayersControl.BaseLayer>
                                    <Marker
                                        position={[
                                            restaurant.address.coord[1],
                                            restaurant.address.coord[0],
                                        ]}
                                    >
                                        <Tooltip opacity={1} permanent>
                                            <b>{restaurant.name}</b>
                                        </Tooltip>
                                    </Marker>
                                </LayersControl>
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
                    <Card>
                        <Card.Header>
                            <Card.Title>
                                <h3>Restaurant ID: {props.id}</h3>
                                <p>
                                    Not Found... <code> -404</code>
                                </p>
                            </Card.Title>
                        </Card.Header>
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
