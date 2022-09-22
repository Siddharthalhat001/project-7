package com.kodlamaio.hrms.busines.concretes;

import com.kodlamaio.hrms.busines.abstracts.CvSchoolService;
import com.kodlamaio.hrms.dataAccess.abstracts.CvDao;
import com.kodlamaio.hrms.dataAccess.abstracts.CvSchoolDao;
import com.kodlamaio.hrms.entities.concretes.CvSchool;
import com.kodlamaio.hrms.entities.dto.CvSchoolDto;
import com.kodlamaio.hrms.core.utilities.results.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CvSchoolManager implements CvSchoolService {

    private CvSchoolDao cvSchoolDao;
    private CvDao cvDao;

    @Autowired
    public CvSchoolManager(CvSchoolDao cvSchoolDao, CvDao cvDao) {
        this.cvSchoolDao = cvSchoolDao;
        this.cvDao=cvDao;
    }

    @Override
    public Result addSchool(CvSchoolDto cvSchoolDto) {

        if(!this.cvDao.existsById(cvSchoolDto.getCvId())){
            return new ErrorResult("There is no such CV");
        }else if(cvSchoolDto.getName().length()<=2){
            return new ErrorResult("School name must be longer than 2 characters");
        }else if(cvSchoolDto.getDepartment().length()<=2){
            return new ErrorResult("Section name must be longer than 2 characters");
        }else if(cvSchoolDto.getStartDate()==null){
            return new ErrorResult("Start date cannot be left blank");
        }

        CvSchool cvSchool =new CvSchool();
        cvSchool.setCv(this.cvDao.getById(cvSchoolDto.getCvId()));
        cvSchool.setName(cvSchoolDto.getName());
        cvSchool.setDepartment(cvSchoolDto.getDepartment());
        cvSchool.setStartDate(cvSchoolDto.getStartDate());
        cvSchool.setEndDate(cvSchoolDto.getEndDate());

        this.cvSchoolDao.save(cvSchool);
        return new SuccessResult("School added");
    }

    @Override
    public Result deleteSchool(int schoolId) {
        if(!this.cvSchoolDao.existsById(schoolId)){
            return new ErrorResult("There is no such school");
        }
        this.cvSchoolDao.deleteById(schoolId);
        return new SuccessResult("School deleted");
    }

    @Override
    public DataResult<List<CvSchool>> getByCvId(int cvId) {
        if(this.cvSchoolDao.findByCvId(cvId)==null){
            return new ErrorDataResult<List<CvSchool>>("There is no such CV");
        }
        return new SuccessDataResult<List<CvSchool>>(this.cvSchoolDao.findByCvId(cvId),"Data listed");
    }
}
