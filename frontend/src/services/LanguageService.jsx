import axios from "axios";

export default class LanguageService{

    getByCvId(cvId){
        return axios.get(`http://localhost:9001/api/language/getByCvId?cvId=${cvId}`)
    }

    deleteLanguage(languageId){
        return axios.delete(`http://localhost:9001/api/language/deleteLanguage?languageId=${languageId}`)
    }

    addLanguage(language){
        return axios.post("http://localhost:9001/api/language/addLanguage",language)
    }
}