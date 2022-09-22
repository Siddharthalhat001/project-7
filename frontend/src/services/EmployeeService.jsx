import axios from "axios";

export default class EmployeeService{
    getEmployees(){
        return axios.get("http://localhost:9001/api/employee/getall");
    }
    registerEmployee(values){
        return axios.post("http://localhost:9001/api/employee/add",values)
    }

    getMailVerifyedEmployees(){
        return axios.get("http://localhost:9001/api/employee/getMailVerifyTrue")
    }
}