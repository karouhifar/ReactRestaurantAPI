import { Link } from 'react-router-dom';
import { Card, CardColumns } from 'react-bootstrap';

export default function NotFound(props) {
    const myStyleMain = {
        fontSize: '2rem',
        fontFamily: 'Cursive',
        padding: '10px',
    };
    return (
        <div>
            <Card style={myStyleMain}>
                <Card.Header>
                    <Card.Title>
                        <h1>
                            Not Found<code>-404</code>
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
