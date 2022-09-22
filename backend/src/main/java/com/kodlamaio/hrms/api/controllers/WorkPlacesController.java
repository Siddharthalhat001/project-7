package com.kodlamaio.hrms.api.controllers;

import com.kodlamaio.hrms.busines.abstracts.WorkPlaceService;
import com.kodlamaio.hrms.core.utilities.results.DataResult;
import com.kodlamaio.hrms.entities.concretes.WorkPlace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/workPlace")
@CrossOrigin
public class WorkPlacesController {

    private WorkPlaceService workPlaceService;

    @Autowired
    public WorkPlacesController(WorkPlaceService workPlaceService) {
        this.workPlaceService = workPlaceService;
    }

    @GetMapping("/getAll")
    public DataResult<List<WorkPlace>> getAll(){
        return this.workPlaceService.getAll();
    }
}
