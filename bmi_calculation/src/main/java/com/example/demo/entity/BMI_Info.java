package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
public class BMI_Info {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "height")
    private Float height;

    @Column(name = "weight")
    private Float weight;

    @Column(name = "bmi_value")
    private Float bmi_value;

    @Column(name = "bmi_category")
    private String bmi_category;

    private String bmi_unit;


    public BMI_Info() {}

    public BMI_Info(Float height, Float weight, Float bmi_value, String bmi_category) {
        this.height = height;
        this.weight = weight;
        this.bmi_value = bmi_value;
        this.bmi_category = bmi_category;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Float getHeight() {
        return height;
    }

    public void setHeight(Float height) {
        this.height = height;
    }

    public Float getWeight() {
        return weight;
    }

    public void setWeight(Float weight) {
        this.weight = weight;
    }

    public String getBmi_category() {
        return bmi_category;
    }

    public void setBmi_category(String bmi_category) {
        this.bmi_category = bmi_category;
    }

    public Float getBmi_value() {
        return bmi_value;
    }

    public void setBmi_value(Float bmi_value) {
        this.bmi_value = bmi_value;
    }

    public String getBmi_unit() {
        return bmi_unit;
    }

    public void setBmi_unit(String bmi_unit) {
        this.bmi_unit = bmi_unit;
    }
}
