import axios from "axios";

export default class UserService{
    login(values){
        return axios.post("http://localhost:9001/api/users/login",values)
    }
}