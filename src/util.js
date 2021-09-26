import {PARKING_LOT_DIMENSION} from "./ParkingApp";

export const isVehicleRegistrationNumberDuplicate = (parkingGrid, registrationNum) => {
    return Array.from(Array(PARKING_LOT_DIMENSION[1]).keys()).some(y => !!Array.from(Array(PARKING_LOT_DIMENSION[0]).keys()).some(x => {
        const key = `${x}-${y}`;
        return parkingGrid?.[key]?.registrationNum === registrationNum;
    }));
}

export const findFirstEmptyParkingSlot = (parkingGrid) => {
    let key = '';
    const emptyFound = Array.from(Array(PARKING_LOT_DIMENSION[1]).keys()).some(y => !!Array.from(Array(PARKING_LOT_DIMENSION[0]).keys()).some(x => {
        key = `${x}-${y}`;
        return !parkingGrid?.[key];
    }));

    return emptyFound ? key : undefined;
}
