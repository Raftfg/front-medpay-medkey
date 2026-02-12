/**Import des modules néccessaires */
import Axios from "../caller.services";

let getAllRooms = () => {
    return Axios.get("/rooms");
};

let getRoom = (uuid) => {
    return Axios.get("/rooms/" + uuid);
};
let getFreeBeds = (uuid) => {
    return Axios.get("/room/" + uuid + '/free-beds');
};

let addRoom = (data) => {
    return Axios.post("/rooms", data);
};

let updateRoom = (room) => {
    return Axios.put("/rooms/" + room.uuid, room);
};

let deleteRoom = (uuid) => {
    return Axios.delete("/rooms/" + uuid);
};

export const roomService = {
    getAllRooms,
    getRoom,
    getFreeBeds,
    addRoom,
    updateRoom,
    deleteRoom,
};