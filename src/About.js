import image1 from './kamyabOne.jpg';
import image2 from './kamyabTwo.jpg';
import image3 from './kamyabThree.jpg';
import { Card, Carousel, Image } from 'react-bootstrap';
import { BarLoader } from 'react-spinners';
export default function About(props) {
    if (image1 && image2 && image3) {
        return (
            <div>
                <Card bg="secondary" text="white">
                    <Card.Header>
                        <h2>About</h2>
                    </Card.Header>
                    <Card.Body className="text-center">
                        <Card.Title>
                            <h3>I am Kamyab Rouhifar</h3>
                        </Card.Title>
                        <Card.Text>
                            <h4>
                                I know 3 languages such as <em>Persian</em>,
                                <em> Turkish </em>,and
                                <em> English</em>
                                <br />I know programming languages such as{' '}
                                <code>
                                    <b>JavaScript</b>
                                </code>
                                ,
                                <code>
                                    <b>Java</b>
                                </code>
                                ,
                                <code>
                                    <b>C/C++</b>
                                </code>
                                ,and
                                <code>
                                    <b> Python</b>
                                </code>
                                <br />
                                Mostly I like doing and searching Web
                                application frameworks and libraries
                            </h4>
                        </Card.Text>
                        <Carousel>
                            <Carousel.Item>
                                <Image
                                    width={500}
                                    src={image1}
                                    alt="First slide"
                                    rounded
                                    fluid
                                />
                                <Carousel.Caption>
                                    <h3>First slide</h3>
                                    <p>Ankara, Turkey</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Image
                                    width={500}
                                    src={image2}
                                    alt="Second slide"
                                    rounded
                                    fluid
                                />

                                <Carousel.Caption>
                                    <h3>Second slide</h3>
                                    <p>Seneca,Toronto</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Image
                                    width={500}
                                    src={image3}
                                    alt="Third slide"
                                    rounded
                                    fluid
                                />

                                <Carousel.Caption>
                                    <h3>Third slide</h3>
                                    <p>Seneca,Toronto</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Card.Body>
                    <Card.Footer style={{ fontSize: '2rem' }}>
                        Kamyab Rouhifar &copy; Copyrights - 2021
                    </Card.Footer>
                </Card>
                <br />
            </div>
        );
    } else {
        return (
            <div className="loading">
                <h2>Loading</h2>
                <BarLoader size={150} color="orange" loading />
            </div>
        );
    }
}
