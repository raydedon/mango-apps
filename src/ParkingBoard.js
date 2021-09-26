import ParkingSlot from "./ParkingSlot";
import {PARKING_LOT_DIMENSION} from "./ParkingApp";

const ParkingBoard = (props) => {
    const {parkingGrid, onDeleteParkedCar} = props;
    
    return (
        <div className='parking-board-wrapper'>
            {Array.from(Array(PARKING_LOT_DIMENSION[1]).keys()).map(y => Array.from(Array(PARKING_LOT_DIMENSION[0]).keys()).map(x => <ParkingSlot key={`${x}-${y}`} vehicle={parkingGrid[`${x}-${y}`]} parkingCoordinate={`${x}-${y}`} onDeleteParkedCar={onDeleteParkedCar}/>))}
        </div>
    );
}

export {ParkingBoard}
export default ParkingBoard;
