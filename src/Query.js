import {useCallback, useState} from "react";
import {Form, ListGroup} from "react-bootstrap";

const Query = (props) => {
    const {parkingGridByRegNum, parkingGridByColor} = props;
    const [queryColor, setQueryColor] = useState();
    const onColorChangeHandler = useCallback((e) => {
        setQueryColor(e.target.value);
    }, []);

    const [registrationNumber, setRegistrationNumber] = useState();
    const onRegistrationNumberChangeHandler = useCallback((e) => {
        setRegistrationNumber(e.target.value);
    }, []);
    return (
        <div>
            <div>
                <h5>Registration number & Ticket number by color</h5>
                <Form.Group className="mb-3" controlId="formBasicColor">
                    <Form.Label>Car Color</Form.Label>
                    <Form.Control type="text" placeholder="Enter Car Color" value={queryColor} onChange={onColorChangeHandler}/>
                </Form.Group>
                <ListGroup>
                    {parkingGridByColor?.[queryColor]?.map(vehicle => <ListGroup.Item>{vehicle?.registrationNum}, {vehicle?.ticket}</ListGroup.Item>)}
                </ListGroup>
            </div>
            <div>
                <h5>Ticket number of a Registered Car</h5>
                <Form.Group className="mb-3" controlId="formBasicRegistration">
                    <Form.Label>Registration Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Registration Number" value={registrationNumber} onChange={onRegistrationNumberChangeHandler}/>
                </Form.Group>
                <ListGroup>
                    <ListGroup.Item>{parkingGridByRegNum?.[registrationNumber]?.ticket}</ListGroup.Item>
                </ListGroup>
            </div>
        </div>
    );
}

export {Query};
export default Query
