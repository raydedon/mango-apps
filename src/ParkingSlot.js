import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCar, faTrashAlt } from '@fortawesome/fontawesome-free-solid'
import {Button, Overlay, Tooltip} from "react-bootstrap";
import {useCallback, useRef, useState} from "react";
fontawesome.library.add(faCar, faTrashAlt);

const ParkingSlot = (props) => {
    const {vehicle, parkingCoordinate, onDeleteParkedCar} = props;
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const onShowHandler = useCallback(() => setShow(true), []);
    const onHideHandler = useCallback(() => setShow(false), []);
    const onDeleteClickHandler = useCallback(() => onDeleteParkedCar(parkingCoordinate), [onDeleteParkedCar, parkingCoordinate]);
    
    if (!vehicle) return <div className='car-slot'>&nbsp;</div>;
    
    return (
        <div className='car-slot'>
            <Button ref={target} onMouseEnter={onShowHandler} onMouseOut={onHideHandler} onMouseOver={onShowHandler} variant='link'>
                <FontAwesomeIcon icon='car' size='2x' color={vehicle.color}/>
            </Button>
            <Button onClick={onDeleteClickHandler} variant='link' className='delete-icon'>
                <FontAwesomeIcon icon='trash-alt' size='xs' color=' color='/>
            </Button>
            <Overlay target={target.current} show={show} placement="right">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        <div>
                            <div>{vehicle.registrationNum}</div>
                            <div>{vehicle.brand}</div>
                            <div>{vehicle.model}</div>
                            <div>{vehicle.color}</div>
                        </div>
                    </Tooltip>
                )}
            </Overlay>
        </div>
    )
}

export {ParkingSlot};
export default ParkingSlot;
