import axios from "axios";

export default class SchoolService{

    getByCvId(cvId){
        return axios.get(`http://localhost:9001/api/CvSchool/getByCvId?cvId=${cvId}`)
    }

    addScholl(school){
        return axios.post("http://localhost:9001/api/CvSchool/addSchool",school)
    }

    deleteSchool(schoolId){
        return axios.delete(`http://localhost:9001/api/CvSchool/deleteSchool?schoolId=${schoolId}`)
    }
}