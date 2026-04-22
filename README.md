# 🧠 bmi.tracker

> **A sleek full-stack BMI tracker with persistent history — built with Spring Boot & vanilla JavaScript.**  
> Track your health. See your progress. Stay consistent.

---

![Java](https://img.shields.io/badge/Java-17+-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5/CSS3-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Overview

**bmi.tracker** is a clean, responsive web application that calculates your Body Mass Index (BMI) in both **metric** and **imperial** units.

Every calculation is stored in a database, allowing you to **track your health journey over time** through a beautiful history timeline.

- ⚡ Instant BMI calculation  
- 🗂️ Persistent history tracking  
- 🎨 Smart color-coded health categories  
- 📱 Fully responsive UI  
- 🔌 RESTful backend API  

---

## 🚀 Features

### ⚡ Smart BMI Calculator
Supports both:
- Metric → kg / m  
- Imperial → lbs / inches  

### 🗂️ History Tracking
Every result is saved automatically and displayed chronologically.

### 🎨 Visual Health Indicators
- 🔵 Underweight  
- 🟢 Normal weight  
- 🟡 Overweight  
- 🔴 Obese  

### 📱 Responsive Design
Works seamlessly on mobile, tablet, and desktop.

### 🔌 Clean REST API
Easily extendable or connectable to other frontends.

---

## 🛠️ Tech Stack

| Layer | Technology |
|------|------------|
| Backend | Java 17+, Spring Boot 3 |
| Data | Spring Data JPA |
| Database | H2 / MySQL / PostgreSQL |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| UI Style | Dark-themed, minimal design |

---

## Project Structure

```
├── src/main/java/com/example/demo/
│   ├── dao/
│   │   └── BMIRepository.java          # JPA Repository
│   ├── entity/
│   │   └── BMI_Info.java               # BMI entity / DB model
│   ├── service/
│   │   ├── BMIService.java             # Service interface
│   │   └── BMIServiceImp.java          # Business logic & BMI formula
│   └── rest/
│       ├── BMIRestController.java      # POST /api/bmi/calculate
│       └── SaveResultRestController.java# GET /api/bmi/history
│
└── frontend/
    ├── index.html
    ├── style.css
    └── app.js
```

---

## Getting Started

### Prerequisites

- Java 17+
- Maven or Gradle
- A running database (or use H2 in-memory for quick start)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/bmi-tracker.git
cd bmi-tracker
```

### 2. Configure the database

Edit `src/main/resources/application.properties`:

```properties
# Example — H2 in-memory (no setup needed)
spring.datasource.url=jdbc:h2:mem:bmidb
spring.datasource.driver-class-name=org.h2.Driver
spring.jpa.hibernate.ddl-auto=update

# Example — MySQL
# spring.datasource.url=jdbc:mysql://localhost:3306/bmidb
# spring.datasource.username=root
# spring.datasource.password=secret
```

### 3. Run the backend

```bash
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080`.

### 4. Open the frontend

Open `frontend/index.html` directly in your browser — no build step needed.

---

## API Reference

### `POST /api/bmi/calculate`

Calculates BMI, categorizes the result, and saves it to the database.

**Request body**
```json
{
  "height": 1.75,
  "weight": 70,
  "bmi_unit": "metric"
}
```

**Response**
```json
{
  "id": 1,
  "height": 1.75,
  "weight": 70.0,
  "bmi_value": 22.9,
  "bmi_category": "Normal weight",
  "bmi_unit": "metric"
}
```

---

### `GET /api/bmi/history`

Returns all saved BMI records.

**Response**
```json
[
  {
    "id": 1,
    "height": 1.75,
    "weight": 70.0,
    "bmi_value": 22.9,
    "bmi_category": "Normal weight",
    "bmi_unit": "metric"
  }
]
```

---

## BMI Categories

| BMI Range | Category |
|---|---|
| < 18.5 | 🔵 Underweight |
| 18.5 – 24.9 | 🟢 Normal weight |
| 25.0 – 29.9 | 🟡 Overweight |
| ≥ 30.0 | 🔴 Obese |

---

## Formula

| Unit System | Formula |
|---|---|
| Metric | `BMI = weight(kg) / height(m)²` |
| Imperial | `BMI = (weight(lbs) / height(in)²) × 703` |

---

## License

This project is open source and available under the [MIT License](LICENSE).
