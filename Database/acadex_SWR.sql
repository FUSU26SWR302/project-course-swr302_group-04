CREATE DATABASE Acadex;
GO

USE Acadex;
GO


CREATE TABLE Account (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('Admin', 'Teacher', 'Student'))
);

CREATE TABLE Teacher (
    teacher_id VARCHAR(50) PRIMARY KEY,
    full_name NVARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    FOREIGN KEY (teacher_id) REFERENCES Account(username) ON DELETE CASCADE
);


CREATE TABLE Class (
    class_id VARCHAR(50) PRIMARY KEY,
    class_name NVARCHAR(100) NOT NULL,
    homeroom_teacher_id VARCHAR(50),
    FOREIGN KEY (homeroom_teacher_id) REFERENCES Teacher(teacher_id) ON DELETE SET NULL
);


CREATE TABLE Student (
    student_id VARCHAR(50) PRIMARY KEY,
    full_name NVARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    gender NVARCHAR(10),
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    address NVARCHAR(255),
    class_id VARCHAR(50),
    FOREIGN KEY (student_id) REFERENCES Account(username) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES Class(class_id) ON DELETE SET NULL
);


CREATE TABLE Subject (
    subject_id VARCHAR(50) PRIMARY KEY,
    subject_name NVARCHAR(150) NOT NULL
);


CREATE TABLE Score (
    score_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    subject_id VARCHAR(50) NOT NULL,
    score FLOAT CHECK (score >= 0 AND score <= 10),
    FOREIGN KEY (student_id) REFERENCES Student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES Subject(subject_id) ON DELETE CASCADE
);


CREATE TABLE Attendance (
    attendance_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    attendance_date DATE NOT NULL,
    status NVARCHAR(50) NOT NULL CHECK (status IN (N'Present', N'Absent_Excused', N'Absent_Unexcused')),
    FOREIGN KEY (student_id) REFERENCES Student(student_id) ON DELETE CASCADE
);