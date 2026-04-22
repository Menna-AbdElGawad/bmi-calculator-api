package com.example.demo.rest;

import com.example.demo.entity.BMI_Info;
import com.example.demo.service.BMIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/bmi")
public class SaveResultRestController {
    BMIService bmiService;

    @Autowired
    public SaveResultRestController(BMIService bmiService) {
        this.bmiService = bmiService;
    }

    @GetMapping("/history")
    public List<BMI_Info> history() {
        return bmiService.findAll();
    }

    @PostMapping("/save")
    public BMI_Info save(@RequestBody BMI_Info bmiInfo) {
        bmiService.save(bmiInfo);
        return bmiInfo;
    }
}
