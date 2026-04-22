package com.example.demo.rest;

import com.example.demo.entity.BMI_Info;
import com.example.demo.service.BMIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/bmi")
public class BMIRestController {

    private BMIService bmiService;

    @Autowired
    public BMIRestController(BMIService bmiService) {
        this.bmiService = bmiService;
    }

    @PostMapping("/calculate")
    public BMI_Info addBMI(@RequestBody BMI_Info bmiInfo) {
        bmiService.calculate(bmiInfo);
        bmiService.save(bmiInfo);
        return bmiInfo;
    }

}
