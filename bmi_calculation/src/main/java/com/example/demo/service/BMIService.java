package com.example.demo.service;

import com.example.demo.entity.BMI_Info;

import java.util.List;

public interface BMIService {

    float save(BMI_Info bmiInfo);

    void calculate(BMI_Info bmiInfo);

    List<BMI_Info> findAll();

}
