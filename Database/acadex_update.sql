

-- 1. Bảng Account
CREATE TABLE Account (
    account_id VARCHAR(20) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    [status] VARCHAR(20) DEFAULT 'Active'
);

-- 2. Bảng Semester
CREATE TABLE Semester (
    semester_id VARCHAR(20) PRIMARY KEY,
    semester_name NVARCHAR(50) NOT NULL,
    start_date DATE,
    end_date DATE
);

-- 3. Bảng Subject
CREATE TABLE Subject (
    subject_id VARCHAR(20) PRIMARY KEY,
    subject_code VARCHAR(20) UNIQUE NOT NULL,
    subject_name NVARCHAR(100) NOT NULL,
    credits INT,
    [status] VARCHAR(20) DEFAULT 'Active'
);

-- 4. Bảng Teacher
CREATE TABLE Teacher (
    teacher_id VARCHAR(20) PRIMARY KEY,
    account_id VARCHAR(20),
    full_name NVARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    CONSTRAINT FK_Teacher_Account FOREIGN KEY (account_id) REFERENCES Account(account_id)
);

-- 5. Bảng Class
CREATE TABLE Class (
    class_id VARCHAR(20) PRIMARY KEY,
    class_name NVARCHAR(100) NOT NULL,
    teacher_id VARCHAR(20),
    CONSTRAINT FK_Class_Teacher FOREIGN KEY (teacher_id) REFERENCES Teacher(teacher_id)
);

-- 6. Bảng Student
CREATE TABLE Student (
    student_id VARCHAR(20) PRIMARY KEY,
    account_id VARCHAR(20),
    full_name NVARCHAR(100) NOT NULL,
    dob DATE,
    gender NVARCHAR(10),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    address NVARCHAR(255),
    class_id VARCHAR(20),
    gpa FLOAT,
    [status] VARCHAR(20),
    CONSTRAINT FK_Student_Account FOREIGN KEY (account_id) REFERENCES Account(account_id),
    CONSTRAINT FK_Student_Class FOREIGN KEY (class_id) REFERENCES Class(class_id)
);

-- 7. Bảng Teacher_Subject
CREATE TABLE Teacher_Subject (
    teacher_subject_id VARCHAR(20) PRIMARY KEY,
    teacher_id VARCHAR(20),
    subject_id VARCHAR(20),
    CONSTRAINT FK_TS_Teacher FOREIGN KEY (teacher_id) REFERENCES Teacher(teacher_id),
    CONSTRAINT FK_TS_Subject FOREIGN KEY (subject_id) REFERENCES Subject(subject_id)
);

-- 8. Bảng Class_Subject
CREATE TABLE Class_Subject (
    class_subject_id VARCHAR(20) PRIMARY KEY,
    class_id VARCHAR(20),
    subject_id VARCHAR(20),
    teacher_id VARCHAR(20),
    semester_id VARCHAR(20),
    CONSTRAINT FK_CS_Class FOREIGN KEY (class_id) REFERENCES Class(class_id),
    CONSTRAINT FK_CS_Subject FOREIGN KEY (subject_id) REFERENCES Subject(subject_id),
    CONSTRAINT FK_CS_Teacher FOREIGN KEY (teacher_id) REFERENCES Teacher(teacher_id),
    CONSTRAINT FK_CS_Semester FOREIGN KEY (semester_id) REFERENCES Semester(semester_id)
);

-- 9. Bảng Score
CREATE TABLE Score (
    score_id VARCHAR(20) PRIMARY KEY,
    student_id VARCHAR(20),
    subject_id VARCHAR(20),
    semester_id VARCHAR(20),
    score_value FLOAT NOT NULL,
    CONSTRAINT FK_Score_Student FOREIGN KEY (student_id) REFERENCES Student(student_id),
    CONSTRAINT FK_Score_Subject FOREIGN KEY (subject_id) REFERENCES Subject(subject_id),
    CONSTRAINT FK_Score_Semester FOREIGN KEY (semester_id) REFERENCES Semester(semester_id)
);

-- 10. Bảng ScoreComponent
CREATE TABLE ScoreComponent (
    component_id VARCHAR(20) PRIMARY KEY,
    score_id VARCHAR(20),
    component_name NVARCHAR(50) NOT NULL,
    [weight] FLOAT NOT NULL,
    grade FLOAT NOT NULL,
    CONSTRAINT FK_Component_Score FOREIGN KEY (score_id) REFERENCES Score(score_id) ON DELETE CASCADE
);

-- 11. Bảng Attendance
CREATE TABLE Attendance (
    attendance_id VARCHAR(20) PRIMARY KEY,
    student_id VARCHAR(20),
    class_subject_id VARCHAR(20),
    attendance_date DATE NOT NULL,
    [status] VARCHAR(20),
    CONSTRAINT FK_Attendance_Student FOREIGN KEY (student_id) REFERENCES Student(student_id),
    CONSTRAINT FK_Attendance_CS FOREIGN KEY (class_subject_id) REFERENCES Class_Subject(class_subject_id)
);

-- 12. Bảng LearningMaterial
CREATE TABLE LearningMaterial (
    material_id VARCHAR(20) PRIMARY KEY,
    title NVARCHAR(200) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    class_subject_id VARCHAR(20),
    uploaded_by VARCHAR(20),
    upload_date DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Material_CS FOREIGN KEY (class_subject_id) REFERENCES Class_Subject(class_subject_id),
    CONSTRAINT FK_Material_Teacher FOREIGN KEY (uploaded_by) REFERENCES Teacher(teacher_id)
);

-- 13. Bảng StudentRequest
CREATE TABLE StudentRequest (
    request_id VARCHAR(20) PRIMARY KEY,
    student_id VARCHAR(20),
    request_type NVARCHAR(50) NOT NULL,
    reason NVARCHAR(MAX) NOT NULL,
    [status] VARCHAR(20) DEFAULT 'Pending',
    processed_by VARCHAR(20),
    created_date DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Request_Student FOREIGN KEY (student_id) REFERENCES Student(student_id),
    CONSTRAINT FK_Request_Account FOREIGN KEY (processed_by) REFERENCES Account(account_id)
);

-- 14. Bảng Notification
CREATE TABLE Notification (
    notification_id VARCHAR(20) PRIMARY KEY,
    title NVARCHAR(200) NOT NULL,
    content NVARCHAR(MAX) NOT NULL,
    sender_id VARCHAR(20),
    created_date DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Notification_Sender FOREIGN KEY (sender_id) REFERENCES Account(account_id)
);

-- 15. Bảng SystemLog
CREATE TABLE SystemLog (
    log_id VARCHAR(20) PRIMARY KEY,
    account_id VARCHAR(20),
    action NVARCHAR(255) NOT NULL,
    log_time DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Log_Account FOREIGN KEY (account_id) REFERENCES Account(account_id)
);