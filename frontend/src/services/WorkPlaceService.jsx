import axios from "axios";

export default class WorkPlaceService{
    getWorkPlaces(){
        return axios.get("http://localhost:9001/workPlace/getAll")
    }
}