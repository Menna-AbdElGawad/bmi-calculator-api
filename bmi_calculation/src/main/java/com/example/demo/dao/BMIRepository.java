package com.example.demo.dao;

import com.example.demo.entity.BMI_Info;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BMIRepository extends JpaRepository<BMI_Info, Integer> {
}