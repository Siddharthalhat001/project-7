package com.kodlamaio.hrms.busines.concretes;

import com.kodlamaio.hrms.busines.abstracts.LanguageService;
import com.kodlamaio.hrms.dataAccess.abstracts.CvDao;
import com.kodlamaio.hrms.dataAccess.abstracts.LanguageDao;
import com.kodlamaio.hrms.entities.concretes.Language;
import com.kodlamaio.hrms.entities.dto.LanguageForSetDto;
import com.kodlamaio.hrms.core.utilities.results.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LanguageManager implements LanguageService {

    private LanguageDao languageDao;
    private CvDao cvDao;

    @Autowired
    public LanguageManager(LanguageDao languageDao,CvDao cvDao) {
        this.languageDao = languageDao;
        this.cvDao=cvDao;
    }

    @Override
    public Result addLanguage(LanguageForSetDto languageForSetDto) {

        if(!this.cvDao.existsById(languageForSetDto.getCvId())){
            return new ErrorResult("There is no such CV");
        }else if(languageForSetDto.getName().length()<=2){
            return new ErrorResult("Language name must be longer than 2 characters");
        }else if(Integer.parseInt(languageForSetDto.getLevel()) <=0 || Integer.parseInt(languageForSetDto.getLevel()) >=6){
            return new ErrorResult("Language level must be a value from 1-5");
        }

        Language language=new Language();
        language.setCv(this.cvDao.getById(languageForSetDto.getCvId()));
        language.setName(languageForSetDto.getName());
        language.setLevel(languageForSetDto.getLevel());

        this.languageDao.save(language);
        return new SuccessResult("Language Was recorded");
    }

    @Override
    public Result deleteLanguage(int languageId) {
        if(!this.languageDao.existsById(languageId)){
            return new ErrorResult("No such language found");
        }
        this.languageDao.deleteById(languageId);
        return new SuccessResult("Added!");
    }

    @Override
    public DataResult<List<Language>> getByCvId(int cvId) {
        if(!this.cvDao.existsById(cvId)){
            return new ErrorDataResult<List<Language>>("There is no such CV");
        }
        return new SuccessDataResult<List<Language>>(this.languageDao.findByCvId(cvId),"Listed");
    }
}
