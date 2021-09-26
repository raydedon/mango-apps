import {useCallback, useState} from "react";
import ParkingBoard from "./ParkingBoard";
import CreateVehicleModal from "./CreateVehicleModal";
import {findFirstEmptyParkingSlot} from "./util";
import Query from "./Query";

export const PARKING_LOT_DIMENSION = [10, 10];
const ParkingApp = () => {
    const [parkingGrid, setParkingGrid] = useState({});
    const [parkingGridByRegNum, setParkingGridByRegNum] = useState({});
    const [parkingGridByColor, setParkingGridByColor] = useState({});
    const onParkVehicleHandler = useCallback((tempVehicle) => {
        const parkingCoordinate = findFirstEmptyParkingSlot(parkingGrid);
        if (parkingCoordinate) {
            const vehicle = {...tempVehicle, ticket: `T-${parkingCoordinate}`, parkingCoordinate};
            const {color, registrationNum} = vehicle;
            parkingGrid[parkingCoordinate] = vehicle;
            setParkingGrid({...parkingGrid});
            
            parkingGridByRegNum[registrationNum] = vehicle;
            setParkingGridByRegNum({...parkingGridByRegNum});
    
            const carsByColor = parkingGridByColor[color] ?? [];
            parkingGridByColor[color] = [...carsByColor, vehicle];
            setParkingGridByColor({...parkingGridByColor});
        }
    }, [parkingGrid, parkingGridByColor, parkingGridByRegNum]);
    
    const onDeleteParkedCarHandler = useCallback((parkingCoordinate) => {
        const vehicle = parkingGrid[parkingCoordinate];
        const {color, registrationNum} = vehicle;
        delete parkingGrid[parkingCoordinate];
        setParkingGrid({...parkingGrid});
        
        delete parkingGridByRegNum[registrationNum];
        setParkingGridByRegNum(parkingGridByRegNum);
        
        const carsByColor = parkingGridByColor[color] ?? [];
        parkingGridByColor[color] = carsByColor.filter(car => car.registrationNum !== registrationNum);
        setParkingGridByColor({...parkingGridByColor});
    }, [parkingGrid, parkingGridByColor, parkingGridByRegNum]);
    return (
        <div className='container'>
            <CreateVehicleModal addVehicle={onParkVehicleHandler} parkingGrid={parkingGrid}/>
            <ParkingBoard parkingGrid={parkingGrid} onDeleteParkedCar={onDeleteParkedCarHandler}/>
            <Query parkingGrid={parkingGrid} parkingGridByRegNum={parkingGridByRegNum} parkingGridByColor={parkingGridByColor}/>
        </div>
    )
}

export {ParkingApp};
export default ParkingApp;
