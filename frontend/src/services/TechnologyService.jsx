import axios from "axios";

export default class TechnologyService{

    getByCvId(cvId){
        return axios.get(`http://localhost:9001/api/CvPrgSkills/getByCvId?cvId=${cvId}`)
    }

    addScholl(technology){
        return axios.post("http://localhost:9001/api/CvPrgSkills/addSkill",technology)
    }

    deleteSchool(technologyId){
        return axios.delete(`http://localhost:9001/api/CvPrgSkills/removeSkill?technologyId=${technologyId}`)
    }
}