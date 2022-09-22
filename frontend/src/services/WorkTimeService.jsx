import axios from "axios";

export default class WorkTimeService{
    getWorkTimes(){
        return axios.get("http://localhost:9001/workTime/getAll")
    }
}