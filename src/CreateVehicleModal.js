import {Button, Form, Modal} from "react-bootstrap";
import {useCallback, useEffect, useState} from "react";
import {isVehicleRegistrationNumberDuplicate} from "./util";

const CreateVehicleModal = (props) => {
    const {addVehicle, parkingGrid} = props
    const [show, setShow] = useState(false);
    const [registrationNum, setRegistrationNum] = useState('');
    const [color, setColor] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    
    useEffect(() => {
        if(!show) {
            setRegistrationNum('');
            setColor('#563d7c');
            setBrand('');
            setModel('');
        }
    }, [show])
    
    const onCloseHandler = useCallback(() => {
        setShow(false);
    }, []);

    const onSubmitHandler = useCallback(() => {
        if(registrationNum === '') return null;
        if(isVehicleRegistrationNumberDuplicate(parkingGrid, registrationNum)) return null;
        setShow(false);
        addVehicle({registrationNum, color, brand, model});
    }, [addVehicle, registrationNum, color, brand, model, parkingGrid]);

    const onShowHandler = useCallback(() => setShow(true), []);
    
    const onRegistrationNumChangeHandler = useCallback((e) => {
        setRegistrationNum(e.target.value);
    }, []);
    
    const onBrandChangeHandler = useCallback((e) => {
        setBrand(e.target.value);
    }, []);
    
    const onModelChangeHandler = useCallback((e) => {
        setModel(e.target.value);
    }, []);
    
    const onColorChangeHandler = useCallback((e) => {
        setColor(e.target.value);
    }, []);
    
    return (
        <>
            <Button variant="primary" onClick={onShowHandler}>
                Park a Vehicle.
            </Button>
            
            <Modal show={show} onHide={onCloseHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Vehicle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicRegistration">
                            <Form.Label>Registration Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter Registration Number" value={registrationNum} onChange={onRegistrationNumChangeHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicBrand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text" placeholder="Enter Brand" value={brand} onChange={onBrandChangeHandler} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicModel">
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" placeholder="Enter Model" value={model} onChange={onModelChangeHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Label htmlFor="exampleColorInput">Vehicle Color</Form.Label>
                            <Form.Control
                                type="color"
                                defaultValue="#563d7c"
                                title="Choose color of Vehicle"
                                onChange={onColorChangeHandler}
                                value={color}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCloseHandler}>Close</Button>
                    <Button variant="primary" onClick={onSubmitHandler}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export {CreateVehicleModal};
export default CreateVehicleModal;
