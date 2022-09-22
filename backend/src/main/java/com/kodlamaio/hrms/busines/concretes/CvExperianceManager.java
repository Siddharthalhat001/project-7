package com.kodlamaio.hrms.busines.concretes;

import com.kodlamaio.hrms.busines.abstracts.CvExperianceService;
import com.kodlamaio.hrms.dataAccess.abstracts.CvDao;
import com.kodlamaio.hrms.dataAccess.abstracts.CvExperianceDao;
import com.kodlamaio.hrms.entities.concretes.CvExperiance;
import com.kodlamaio.hrms.entities.dto.CvExperianceDto;
import com.kodlamaio.hrms.core.utilities.results.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CvExperianceManager implements CvExperianceService {

    private CvExperianceDao cvExperianceDao;
    private CvDao cvDao;

    @Autowired
    public CvExperianceManager(CvExperianceDao cvExperianceDao, CvDao cvDao) {
        this.cvExperianceDao = cvExperianceDao;
        this.cvDao=cvDao;
    }

    @Override
    public Result add(CvExperianceDto cvExperianceDto) {

        if(!this.cvDao.existsById(cvExperianceDto.getCvId())){
            return new ErrorResult("There is no such CV");
        }else if(cvExperianceDto.getCompanyName().length()<=2){
            return new ErrorResult("Company name must be longer than 2 characters");
        }else if(cvExperianceDto.getPosition().length()<=2){
            return new ErrorResult("Position name must be longer than 2 characters");
        }else if(cvExperianceDto.getStartDate() == null){
            return new ErrorResult("Start date cannot be blank");
        }

        CvExperiance cvExperiance =new CvExperiance();
        cvExperiance.setCv(this.cvDao.getById(cvExperianceDto.getCvId()));
        cvExperiance.setCompanyName(cvExperianceDto.getCompanyName());
        cvExperiance.setPosition(cvExperianceDto.getPosition());
        cvExperiance.setStartDate(cvExperianceDto.getStartDate());
        cvExperiance.setEndDate(cvExperianceDto.getEndDate());

        this.cvExperianceDao.save(cvExperiance);
        return new SuccessResult("Was recorded");
    }

    @Override
    public Result delete(int experianceId) {
        if(!this.cvExperianceDao.existsById(experianceId)){
            return new ErrorResult("There is no such experience");
        }
        this.cvExperianceDao.deleteById(experianceId);
        return new SuccessResult("Deleted");
    }

    @Override
    public DataResult<List<CvExperiance>> getByCvId(int id) {

        return new SuccessDataResult<List<CvExperiance>>(this.cvExperianceDao.findByCvId(id),"Data listed");
    }
}
