package com.example.demo.service;

import com.example.demo.dao.BMIRepository;
import com.example.demo.entity.BMI_Info;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BMIServiceImp implements BMIService {
    public BMIRepository bmiRepository;

    @Autowired
    public BMIServiceImp(BMIRepository bmiRepository) {
        this.bmiRepository = bmiRepository;
    }

    @Override
    @Transactional
    public void calculate(BMI_Info bmiInfo) {

        float height = bmiInfo.getHeight();
        float weight = bmiInfo.getWeight();

        float bmi;

        if(bmiInfo.getBmi_unit().equals("metric")) {
            bmi = weight / (height * height);
        } else {
            bmi = (weight / (height * height)) * 703;
        }

        bmiInfo.setHeight(height);
        bmiInfo.setWeight(weight);
        bmiInfo.setBmi_value(bmi);

        if(bmi < 18.5) {
            bmiInfo.setBmi_category("Underweight");
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            bmiInfo.setBmi_category("Normal weight");
        } else if (bmi >= 25 && bmi <= 29.9) {
            bmiInfo.setBmi_category("Overweight");
        } else if (bmi >= 30) {
            bmiInfo.setBmi_category("Obese");
        }

        save(bmiInfo);
    }

    @Transactional
    @Override
    public float save(BMI_Info bmiInfo) {

        bmiRepository.save(bmiInfo);
        return (bmiInfo.getBmi_value());
    }

    @Override
    public List<BMI_Info> findAll() {
        return bmiRepository.findAll();
    }

}
