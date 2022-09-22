package com.kodlamaio.hrms.busines.concretes;


import com.kodlamaio.hrms.dataAccess.abstracts.EmployeeDao;
import com.kodlamaio.hrms.entities.concretes.Employee;
import com.kodlamaio.hrms.entities.dto.EmployeeRegisterDto;
import com.kodlamaio.hrms.busines.abstracts.*;
import com.kodlamaio.hrms.core.utilities.results.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Pattern;

@Service
public class EmployeeManager implements EmployeeService {

    private EmployeeDao employeeDao;
    private NationalValidationService nationalValidationService;
    private UserService userService;
    private ActivationCodeService activationCodeService;
    private EmailService emailService;

    @Autowired
    public EmployeeManager(EmployeeDao employeeDao, NationalValidationService nationalValidationService, UserService userService, ActivationCodeService activationCodeService, EmailService emailService) {
        this.employeeDao = employeeDao;
        this.nationalValidationService=nationalValidationService;
        this.userService=userService;
        this.activationCodeService=activationCodeService;
        this.emailService=emailService;
    }

    @Override
    public DataResult<List<Employee>> getAll() {
        return new SuccessDataResult<List<Employee>>(this.employeeDao.findAll(),"Data listed");
    }

    @Override
    public DataResult<Employee> getByNationalNumber(String nationalNumber) {
        return new SuccessDataResult<Employee>(this.employeeDao.findByNationalNumber(nationalNumber),"Listed");
    }

    @Override
    public DataResult<Employee> getByEmail(String email) {
        return new SuccessDataResult<Employee>(this.employeeDao.findByEmail(email),"Listed");
    }

    @Override
    public Result add(EmployeeRegisterDto candidateDto) {
        if(!candidateDto.getPassword().equals(candidateDto.getRePassword())){
            return new ErrorResult("Check if the passwords are the same!");
        }
        Employee employee =new Employee();
        employee.setFirstName(candidateDto.getFirstName());
        employee.setLastName(candidateDto.getLastName());
        employee.setNationalNumber(candidateDto.getNationalNumber());
        employee.setDateOfBirth(candidateDto.getBirthDate());
        employee.setEmail(candidateDto.getEmail());
        employee.setPassword(candidateDto.getPassword());

        if(employee.getPassword().length() <=6){
            return new ErrorResult("Password must be longer than 6 characters");
        }else if(!isEmailValid(employee.getEmail())){
            return new ErrorResult("The email is not in the correct format");
        }else if(nationalValidationService.validate(employee)){
            employee.setMailVerify(false);
            this.employeeDao.save(employee);
            this.emailService.sendVerifyEmail(employee,this.activationCodeService.createActivationCode(employee));
            return new SuccessResult(employee.getEmail()+" A confirmation link has been sent to your email address. After your account is confirmed, you can log in!");
        }else{
            return new ErrorResult("There is an error!");
        }


    }

    @Override
    public DataResult<List<Employee>> getMailVerifyTrue() {
        return new SuccessDataResult<List<Employee>>(this.employeeDao.findByMailVerifyTrue(),"Data listed");
    }

    private final String EMAIL_PATTERN = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+.(com|org|net|edu|gov|mil|biz|info|mobi)(.[A-Z]{2})?$";

    public boolean isEmailValid(String emailInput) {
        Pattern pattern = Pattern.compile(EMAIL_PATTERN, Pattern.CASE_INSENSITIVE);
        return pattern.matcher(emailInput).find();
    }
}
