package com.kodlamaio.hrms.busines.concretes;

import com.kodlamaio.hrms.busines.abstracts.CvService;
import com.kodlamaio.hrms.dataAccess.abstracts.EmployeeDao;
import com.kodlamaio.hrms.dataAccess.abstracts.CvDao;
import com.kodlamaio.hrms.dataAccess.abstracts.CvImgDao;
import com.kodlamaio.hrms.entities.concretes.Cv;
import com.kodlamaio.hrms.entities.concretes.CvImg;
import com.kodlamaio.hrms.core.utilities.results.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CvManager implements CvService {

    private CvDao cvDao;
    private EmployeeDao employeeDao;
    private CvImgDao cvImgDao;

    @Autowired
    public CvManager(CvDao cvDao, EmployeeDao employeeDao, CvImgDao cvImgDao) {
        this.cvDao = cvDao;
        this.employeeDao = employeeDao;
        this.cvImgDao = cvImgDao;
    }

    @Override
    public Result add(int employeeId) {
        Cv cv=new Cv();
        cv.setEmployee(this.employeeDao.getById(employeeId));

        this.cvDao.save(cv);
        CvImg cvImg =new CvImg();
        cvImg.setCv(cv);
        cvImg.setImageUrl("https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg");
        this.cvImgDao.save(cvImg);
        return new SuccessResult("Was recorded");
    }



    @Override
    public DataResult<List<Cv>> getAll() {
        return new SuccessDataResult<List<Cv>>(this.cvDao.findAll(),"Data listed");
    }

    @Override
    public DataResult<Cv> getByCvId(int cvId) {
        if(!this.cvDao.existsById(cvId)){
            return new ErrorDataResult<Cv>("There is no such CV");
        }
        return new SuccessDataResult<Cv>(this.cvDao.getById(cvId),"Data listed");
    }

    @Override
    public DataResult<Cv> getByEmployeeId(int employeeId) {
        if(this.cvDao.findByEmployeeId(employeeId) == null){
            return new ErrorDataResult<Cv>("There is no such candidate");
        }
        return new SuccessDataResult<Cv>(this.cvDao.findByEmployeeId(employeeId),"Data listed");
    }

    @Override
    public Result updateGithub(String githublink, int cvId) {

        if(!this.cvDao.existsById(cvId)){
            return new ErrorResult("There is no such CV");
        }else if(!githublink.startsWith("https://github.com")){
            if(!githublink.startsWith("github.com")){
                return new ErrorResult("Not a valid github link");
            }
        }

        Cv cv=this.cvDao.getById(cvId);
        cv.setGithub(githublink);
        this.cvDao.save(cv);
        return new SuccessResult("Was recorded");
    }

    @Override
    public Result deleteGithub(int cvId) {
        if(!this.cvDao.existsById(cvId)){
            return new ErrorResult("There is no such CV");
        }
        Cv cv=this.cvDao.getById(cvId);
        cv.setGithub(null);
        this.cvDao.save(cv);

        return new SuccessResult("Github address removed");
    }

    @Override
    public Result updateLinkedin(String linkedinlink, int cvId) {
        if(!this.cvDao.existsById(cvId)){
            return new ErrorResult("There is no such CV");
        }else if(!linkedinlink.startsWith("https://www.linkedin.com") &&
                !linkedinlink.startsWith("www.linkedin.com") &&
                !linkedinlink.startsWith("https://linkedin.com") &&
                !linkedinlink.startsWith("linkedin.com")){
            return new ErrorResult("Not a valid linked in address");
        }
        Cv cv=this.cvDao.getById(cvId);
        cv.setLinkedin(linkedinlink);
        this.cvDao.save(cv);
        return new SuccessResult("Was recorded");
    }

    @Override
    public Result deleteLinkedin(int cvId) {
        if(!this.cvDao.existsById(cvId)){
            return new ErrorResult("There is no such CV");
        }
        Cv cv=this.cvDao.getById(cvId);
        cv.setLinkedin(null);
        this.cvDao.save(cv);
        return new SuccessResult("Linkedin address deleted");
    }

    @Override
    public Result updateBiography(String biography, int cvId) {
        if(!this.cvDao.existsById(cvId)){
            return new ErrorResult("There is no such CV");
        }else if(biography.length()<=2){
            return new ErrorResult("Biography must be longer than 2 characters");
        }
        Cv cv=this.cvDao.getById(cvId);
        cv.setBiography(biography);
        this.cvDao.save(cv);
        return new SuccessResult("Biography Was recorded");
    }

    @Override
    public Result deleteBiography(int cvId) {
        if(!this.cvDao.existsById(cvId)){
            return new ErrorResult("There is no such CV");
        }
        Cv cv=this.cvDao.getById(cvId);
        cv.setBiography(null);
        this.cvDao.save(cv);
        return new SuccessResult("Biography deleted");
    }

}
