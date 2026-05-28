[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/e_CNHJva)
# 🎓 Acadex – Hệ Thống Quản Lý Sinh Viên

Một hệ thống quản lý sinh viên toàn diện trên nền tảng Web, giúp tối ưu hóa quy trình quản lý thông tin học vụ, lớp học, điểm số, điểm danh và các hoạt động học tập trong nhà trường.

---

## 📌 Tổng Quan Dự Án

Trong phương pháp quản lý truyền thống, thông tin sinh viên thường được lưu trữ bằng giấy tờ hoặc bảng tính rời rạc, dễ gây sai sót và khó tra cứu. **EduManage** được xây dựng nhằm giải quyết triệt để vấn đề đó bằng cách tập trung toàn bộ dữ liệu vào một nền tảng duy nhất, hỗ trợ phân quyền rõ ràng giữa Quản trị viên (Admin), Giảng viên (Teacher) và Sinh viên (Student).

### 🎯 Mục tiêu chính:
* **Số hóa & Trung tâm hóa:** Loại bỏ quy trình thủ công, giảm khối lượng giấy tờ.
* **Chính xác & Bảo mật:** Tăng tính đồng nhất của dữ liệu, mã hóa thông tin nhạy cảm.
* **Tự động hóa:** Tự động tính toán điểm trung bình (GPA), xuất báo cáo trực quan.

---

## 🚀 Công Nghệ Sử Dụng

| Thành phần | Công nghệ đề xuất |
| :--- | :--- |
| **Frontend** | HTML5 + CSS3 + JavaScript|
| **Backend** | Java (Spring Boot) |
| **Database** | MySQL |
| **Tools & Testing** | Git & GitHub, Postman, Figma |

---

## 📦 Hướng Dẫn Cài Đặt (Local Setup)

### 📋 Điều kiện tiên quyết
* Máy tính đã cài đặt **Node.js** (Phiên bản 18.x trở lên)
* Hệ quản trị cơ sở dữ liệu **MySQL**

### 🛠️ Các bước triển khai
1. **Clone mã nguồn dự án về máy:**
   ```bash
   git clone https://github.com/FUSU26SWR302/project-course-swr302_group-04.git

  ## ✨ Tính Năng Nổi Bật & Phân Quyền
Hệ thống được thiết kế với giải pháp phân quyền chặt chẽ (RBAC) chia làm 3 nhóm vai trò:

📑 Tóm tắt quyền hạn nhanh:
Admin (Quản trị viên): Toàn quyền quản lý tài khoản, cấu hình hệ thống, quản lý hồ sơ gốc (Sinh viên, Lớp học, Môn học).

Teacher (Giảng viên): Quản lý học vụ, nhập/sửa điểm, thực hiện điểm danh, xuất báo cáo chuyên cần và GPA lớp chủ nhiệm.

Student (Sinh viên): Đăng nhập xem hồ sơ cá nhân, theo dõi bảng điểm chi tiết, lịch sử điểm danh và nhận thông báo.

🔍 Yêu Cầu Hệ Thống & Use Cases Chi Tiết
🛠️ Yêu Cầu Chức Năng (Functional Requirements)
FR01: Hệ thống cho phép người dùng đăng nhập/đăng xuất an toàn.

FR02: Hệ thống cho phép Admin thực hiện các thao tác CRUD Sinh viên, Lớp học, Môn học.

FR03: Hệ thống cho phép tìm kiếm và lọc sinh viên theo nhiều tiêu chí.

FR04: Hệ thống cho phép Giáo viên nhập, chỉnh sửa và quản lý điểm số.

FR05: Hệ thống tự động tính điểm trung bình tích lũy (GPA) của sinh viên.

FR06: Hệ thống cho phép Giáo viên điểm danh trực tuyến và theo dõi chuyên cần.

FR07: Hệ thống hỗ trợ tạo và xuất báo cáo thống kê dưới dạng Excel/PDF.

🛡️ Yêu Cầu Phi Chức Năng (Non-functional Requirements)
NFR01 (Hiệu năng): Thời gian phản hồi của hệ thống dưới 3 giây đối với các tác vụ thông thường.

NFR02 (Bảo mật): Toàn bộ mật khẩu người dùng phải được mã hóa một chiều trước khi lưu vào DB.

NFR03 (Khả dụng): Hệ thống hoạt động liên tục 24/7, giao diện responsive thân thiện trên nhiều thiết bị.

NFR04 (Toàn vẹn): Hệ thống đảm bảo tính nhất quán dữ liệu và hỗ trợ cơ chế sao lưu (Backup) tự động.

## 🔍 Yêu Cầu Hệ Thống & Use Cases Chi Tiết

<details>
<summary><b>🎯 Nhấn vào đây để xem chi tiết 50 Use Cases của hệ thống EduManage</b></summary>

<br>

| ID | Tên Use Case | Tác Nhân (Actors) | Nhóm Chức Năng |
| :--- | :--- | :--- | :--- |
| **UC01** | Login | Admin, Teacher, Student | Authentication Module |
| **UC02** | Logout | Admin, Teacher, Student | Authentication Module |
| **UC03** | Change Password | Admin, Teacher, Student | Authentication Module |
| **UC04** | Forgot Password | Admin, Teacher, Student | Authentication Module |
| **UC05** | Reset Password | Admin | Authentication Module |
| **UC06** | Manage User Accounts | Admin | Account Management Module |
| **UC07** | Create User Account | Admin | Account Management Module |
| **UC08** | Disable User Account | Admin | Account Management Module |
| **UC09** | View Dashboard | Admin, Teacher | Dashboard Module |
| **UC10** | Add Student | Admin | Student Management Module |
| **UC11** | Edit Student Information | Admin | Student Management Module |
| **UC12** | Delete Student | Admin | Student Management Module |
| **UC13** | Search Student | Admin, Teacher | Student Management Module |
| **UC14** | Filter Student List | Admin, Teacher | Student Management Module |
| **UC15** | View Student Details | Admin, Teacher | Student Management Module |
| **UC16** | Upload Student Avatar | Admin, Student | Student Management Module |
| **UC17** | Import Student Data | Admin | Student Management Module |
| **UC18** | Export Student Data | Admin | Student Management Module |
| **UC19** | Register New Student | Admin | Student Management Module |
| **UC20** | Assign Student to Class | Admin | Student Management Module |
| **UC21** | Remove Student from Class | Admin | Student Management Module |
| **UC22** | View Student List | Admin, Teacher | Student Management Module |
| **UC23** | Update Student Profile | Student | Student Management Module |
| **UC24** | View Personal Profile | Student | Student Management Module |
| **UC25** | Add Class | Admin | Class Management Module |
| **UC26** | Edit Class Information | Admin | Class Management Module |
| **UC27** | Delete Class | Admin | Class Management Module |
| **UC28** | View Class List | Admin, Teacher | Class Management Module |
| **UC29** | Search Class | Admin | Class Management Module |
| **UC30** | Assign Homeroom Teacher | Admin | Class Management Module |
| **UC31** | Add Subject | Admin | Subject Management Module |
| **UC32** | Edit Subject | Admin | Subject Management Module |
| **UC33** | Delete Subject | Admin | Subject Management Module |
| **UC34** | Assign Subject to Class | Admin | Subject Management Module |
| **UC35** | Add Score | Teacher | Score Management Module |
| **UC36** | Edit Score | Teacher | Score Management Module |
| **UC37** | Delete Score | Teacher | Score Management Module |
| **UC38** | View Student Scores | Teacher, Student | Score Management Module |
| **UC39** | Calculate GPA | System | Score Management Module |
| **UC40** | Generate Academic Report | Admin, Teacher | Reporting Module |
| **UC41** | Download Transcript | Student | Reporting Module |
| **UC42** | Send Notifications | Admin | Notification Module |
| **UC43** | View Attendance | Teacher, Student | Attendance Module |
| **UC44** | Record Attendance | Teacher | Attendance Module |
| **UC45** | Generate Attendance Report | Admin, Teacher | Attendance Module |
| **UC46** | Approve Student Registration | Admin | Student Management Module |
| **UC47** | Archive Student Records | Admin | System Management Module |
| **UC48** | Restore Archived Data | Admin | System Management Module |
| **UC49** | View System Logs | Admin | System Management Module |
| **UC50** | Backup Database | System | System Management Module |

</details>

📐 Kiến Trúc Cơ Sở Dữ Liệu (Database Schema)
Dưới đây là cấu trúc các bảng thực thể được thiết kế chuẩn hóa để đảm bảo toàn vẹn dữ liệu:

1. Bảng Sinh Viên (Student)
student_id (VARCHAR - PK): Mã số sinh viên.

full_name (VARCHAR): Họ và tên sinh viên.

dob (DATE): Ngày tháng năm sinh.

gender (VARCHAR): Giới tính.

email (VARCHAR - Unique): Địa chỉ email liên hệ.

phone (VARCHAR): Số điện thoại.

address (TEXT): Địa chỉ thường trú.

class_id (VARCHAR - FK): Thuộc lớp học nào (Liên kết tới bảng Class).

2. Bảng Lớp Học (Class)
class_id (VARCHAR - PK): Mã lớp học.

class_name (VARCHAR): Tên lớp học (Ví dụ: KHMT01).

homeroom_teacher (VARCHAR): Tên hoặc mã giảng viên chủ nhiệm.

3. Bảng Môn Học (Subject)
subject_id (VARCHAR - PK): Mã môn học.

subject_name (VARCHAR): Tên môn học (Ví dụ: Cấu trúc dữ liệu và giải thuật).

4. Bảng Điểm Số (Score)
score_id (VARCHAR - PK): Mã định danh điểm số.

student_id (VARCHAR - FK): Liên kết với bảng Student.

subject_id (VARCHAR - FK): Liên kết với bảng Subject.

score (FLOAT): Điểm số (Thang điểm 10 hoặc hệ 4).

5. Bảng Điểm Danh (Attendance)
attendance_id (VARCHAR - PK): Mã lượt điểm danh.

student_id (VARCHAR - FK): Liên kết với bảng Student.

attendance_date (DATE): Ngày điểm danh.

status (VARCHAR): Trạng thái (Hiện diện, Vắng có phép, Vắng không phép).

6. Bảng Tài Khoản (Account)
username (VARCHAR - PK): Tên đăng nhập (Thường trùng với Mã SV hoặc Mã GV).

password (VARCHAR): Mật khẩu (Đã mã hóa).

role (VARCHAR): Vai trò trong hệ thống (Admin, Teacher, Student).

🔮 Định Hướng Phát Triển (Future Roadmap)
[ ] Phát triển ứng dụng di động (Mobile App) tối ưu trải nghiệm cho sinh viên.

[ ] Tích hợp tính năng điểm danh thông minh bằng mã QR Code hoặc nhận diện khuôn mặt.

[ ] Gửi thông báo tự động (Điểm số, Nhắc nhở học tập) qua Email hoặc Telegram OTP.

[ ] Thiết kế giao diện Dark Mode hiện đại và hỗ trợ Đa ngôn ngữ (Việt - Anh).

[ ] Ứng dụng AI/Data Analytics hỗ trợ phân tích kết quả, dự đoán xu hướng học tập của sinh viên.

🚫 Phạm Vi Dự Án (Out of Scope)
Để tập trung vào lõi quản lý học vụ, dự án hiện tại không bao gồm:

Thanh toán học phí trực tuyến.

Phòng chat Realtime giữa các sinh viên.

Hệ thống gọi video (Video Call) trực tuyến.


📄 Bản Quyền (License)
Dự án này được phát triển hoàn toàn vì mục đích học tập, nghiên cứu và không sử dụng cho mục đích thương mại.
