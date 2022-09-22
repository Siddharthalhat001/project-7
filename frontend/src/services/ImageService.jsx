import axios from "axios";

export default class ImageService{

    upload(cvId,file){
        return axios.post(`http://localhost:9001/api/Cv-Img/upload?cvId=${cvId}`,file)
    }

}