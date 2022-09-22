import axios from "axios";

export default class FavoriteService{

    getByCandidateId(candidateId){
        return axios.get(`http://localhost:9001/jobFavorites/getByEmployeeId?employeeId=${candidateId}`)
    }

    addFavorite(candidateId,jobAdId){
        return axios.post(`http://localhost:9001/jobFavorites/addFavorite?employeeId=${candidateId}&jobsId=${jobAdId}`)
    }

    removeFavorite(favoriteId){
        return axios.delete(`http://localhost:9001/jobFavorites/removeFavorite?favoriteId=${favoriteId}`)
    }

}