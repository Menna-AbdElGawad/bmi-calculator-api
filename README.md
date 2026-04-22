# bmi.tracker

> A full-stack BMI calculator with persistent history — built with Spring Boot & vanilla JS.

![Java](https://img.shields.io/badge/Java-17+-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=flat-square&logo=springboot&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-CSS3-E34F26?style=flat-square&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

---

## Overview

**bmi.tracker** is a sleek, dark-themed web application that calculates your Body Mass Index in both **metric** and **imperial** units and stores every result in a database so you can track your progress over time.

The frontend is a zero-dependency, single-page app. The backend is a RESTful Spring Boot API backed by JPA / any relational database.

---

## Features

- ⚡ **Instant BMI calculation** — metric (m / kg) and imperial (in / lbs) support
- 🗂️ **Persistent history** — every result is saved and displayed in a clean timeline
- 🎨 **Color-coded categories** — Underweight · Normal · Overweight · Obese
- 📱 **Fully responsive** — works great on mobile and desktop
- 🔌 **REST API** — easy to integrate with any other client

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Java 17+, Spring Boot 3, Spring Data JPA |
| Database | Any JPA-compatible DB (H2, MySQL, PostgreSQL…) |
| Frontend | HTML5, CSS3, JS (no frameworks) |
| Fonts | Syne · DM Sans (Google Fonts) |

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
