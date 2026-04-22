DROP DATABASE IF EXISTS `bmi_calculator`;
CREATE DATABASE bmi_calculator;
USE bmi_calculator;

-- ================= USER =================

DROP TABLE IF EXISTS user;

CREATE TABLE user (
  user_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45),
  last_name VARCHAR(45),
  email VARCHAR(45),
  password VARCHAR(45),
  PRIMARY KEY (user_id)
);

-- ================= BMI =================

CREATE TABLE bmi_info (
  id INT NOT NULL AUTO_INCREMENT,
  height FLOAT,
  weight FLOAT,
  bmi_value FLOAT,
  user_id INT,
  PRIMARY KEY (id),

  CONSTRAINT fk_user_bmi
  FOREIGN KEY (user_id) REFERENCES user(user_id)
  ON DELETE CASCADE
);

ALTER TABLE bmi_info
ADD bmi_category VARCHAR(45);