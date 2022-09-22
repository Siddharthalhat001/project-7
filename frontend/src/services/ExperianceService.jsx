import axios from "axios";

export default class ExperianceService{

    add(experiance){
        return axios.post("http://localhost:9001/api/CvExperiance/add",experiance)
    }

    delete(experianceId){
        return axios.delete(`http://localhost:9001/api/CvExperiance/delete?experianceId=${experianceId}`)
    }

    getByCvId(cvId){
        return axios.get(`http://localhost:9001/api/CvExperiance/getByCvId?id=${cvId}`)
    }
}