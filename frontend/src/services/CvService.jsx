import axios from "axios";

export default class CvService{
    getCvs(){
        return axios.get("http://localhost:9001/api/cv/getall");
    }

    getByEmployeeId(id){
        return axios.get("http://localhost:9001/api/cv/getByEmployeeId?employeeId="+id)
    }

    updateGithub(cvId,githubLink){
        return axios.put(`http://localhost:9001/api/cv/updateGithub?cvId=${cvId}&githublink=${githubLink}`)
    }

    updateLinkedin(cvId,linkedin){
        return axios.put(`http://localhost:9001/api/cv/updateLinkedin?cvId=${cvId}&linkedinlink=${linkedin}`)
    }

    updateBiography(cvId,biography){
        return axios.put(`http://localhost:9001/api/cv/updateBiography?biography=${biography}&cvId=${cvId}`)
    }

    deleteGithub(cvId){
        return axios.delete(`http://localhost:9001/api/cv/deleteGithub?cvId=${cvId}`)
    }

    deleteLinkedin(cvId){
        return axios.delete(`http://localhost:9001/api/cv/deleteLinkedin?cvId=${cvId}`)
    }
}