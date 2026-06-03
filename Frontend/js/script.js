// --- Database & LocalStorage Synchronization ---

// Mock Initial Data
const defaultUsers = [
  { username: 'admin', name: 'Admin User', email: 'admin@acadex.edu', password: 'admin123', role: 'admin', status: 'Active' },
  { username: 'teacher', name: 'Ms. Carter', email: 'teacher@acadex.edu', password: 'teacher123', role: 'teacher', status: 'Active' },
  { username: 'student', name: 'Olivia Carter', email: 'student@acadex.edu', password: 'student123', role: 'student', status: 'Active' }
];

const defaultStudents = [
  { id: 'S-1001', name: 'Olivia Carter', gender: 'Female', dob: '2005-08-14', class: '10A', email: 'olivia.carter@acadex.edu', gpa: 3.85 },
  { id: 'S-1002', name: 'Liam Bennett', gender: 'Male', dob: '2004-12-02', class: '11B', email: 'liam.bennett@acadex.edu', gpa: 3.72 },
  { id: 'S-1003', name: 'Mia Patel', gender: 'Female', dob: '2005-03-27', class: '10A', email: 'mia.patel@acadex.edu', gpa: 3.96 },
  { id: 'S-1004', name: 'Noah Foster', gender: 'Male', dob: '2003-09-11', class: '12C', email: 'noah.foster@acadex.edu', gpa: 3.55 },
  { id: 'S-1005', name: 'Ava Nguyen', gender: 'Female', dob: '2004-02-19', class: '11B', email: 'ava.nguyen@acadex.edu', gpa: 3.68 },
  { id: 'S-1006', name: 'Ethan James', gender: 'Male', dob: '2005-06-04', class: '10A', email: 'ethan.james@acadex.edu', gpa: 3.42 },
  { id: 'S-1007', name: 'Sophia Rivera', gender: 'Female', dob: '2003-11-09', class: '12C', email: 'sophia.rivera@acadex.edu', gpa: 3.93 },
  { id: 'S-1008', name: 'Mason Brooks', gender: 'Male', dob: '2004-05-23', class: '11B', email: 'mason.brooks@acadex.edu', gpa: 3.29 }
];

const defaultClasses = [
  { id: 'C-10A', name: '10A', teacher: 'Mrs. Lewis', count: 28 },
  { id: 'C-11B', name: '11B', teacher: 'Ms. Carter', count: 26 },
  { id: 'C-12C', name: '12C', teacher: 'Mr. Hudson', count: 24 }
];

const defaultSubjects = [
  { code: 'MAT101', name: 'Mathematics', credits: 4, classes: ['10A', '11B'] },
  { code: 'ENG102', name: 'English Literature', credits: 3, classes: ['10A', '12C'] },
  { code: 'BIO115', name: 'Biology', credits: 4, classes: ['11B', '12C'] },
  { code: 'HIS120', name: 'History', credits: 2, classes: ['10A', '11B', '12C'] }
];

const defaultScores = [
  { id: 'SC-001', student: 'Olivia Carter', subject: 'Mathematics', midterm: 88, final: 92, gpa: 3.6 },
  { id: 'SC-002', student: 'Liam Bennett', subject: 'Biology', midterm: 79, final: 84, gpa: 3.1 },
  { id: 'SC-003', student: 'Mia Patel', subject: 'English Literature', midterm: 94, final: 96, gpa: 3.9 },
  { id: 'SC-004', student: 'Noah Foster', subject: 'History', midterm: 72, final: 78, gpa: 2.9 }
];

const defaultAttendance = [
  { date: '2026-06-02', student: 'Olivia Carter', class: '10A', status: 'Present' },
  { date: '2026-06-02', student: 'Liam Bennett', class: '11B', status: 'Late' },
  { date: '2026-06-02', student: 'Mia Patel', class: '10A', status: 'Present' },
  { date: '2026-06-02', student: 'Noah Foster', class: '12C', status: 'Absent' },
  { date: '2026-06-02', student: 'Ava Nguyen', class: '11B', status: 'Present' },
  { date: '2026-06-02', student: 'Ethan James', class: '10A', status: 'Present' },
  { date: '2026-06-02', student: 'Sophia Rivera', class: '12C', status: 'Late' },
  { date: '2026-06-02', student: 'Mason Brooks', class: '11B', status: 'Present' }
];

const defaultNotifications = [
  { title: 'Semester Orientation', message: 'Welcome to the new semester. Orientation starts on Monday at 9 AM.', recipient: 'All', date: '2026-06-01', priority: 'Medium', status: 'Published' },
  { title: 'Exam Schedule', message: 'Midterm exams will be held between June 15th and June 22nd.', recipient: 'Students', date: '2026-05-30', priority: 'High', status: 'Published' },
  { title: 'Parent Teacher Meeting', message: 'A virtual meeting is scheduled for June 10th at 4 PM.', recipient: 'Administration', date: '2026-05-28', priority: 'Low', status: 'Draft' }
];

const defaultActivities = [
  { text: 'Admin User logged in', time: 'Just now', icon: '👤' },
  { text: 'Attendance updated for Class 10A', time: '1 hour ago', icon: '📅' },
  { text: 'Midterm scores reviewed by Ms. Carter', time: '3 hours ago', icon: '📝' },
  { text: 'New student Olivia Carter registered', time: '1 day ago', icon: '👩‍🎓' }
];

const reportOptions = {
  academic: {
    title: 'Academic Report',
    description: 'Detailed report covering GPA performance, subject performance, and academic progress for the current semester.'
  },
  attendance: {
    title: 'Attendance Report',
    description: 'Summary of student attendance trends including present, absent, and late records for the selected period.'
  },
  transcript: {
    title: 'Student Transcript',
    description: 'Comprehensive transcript view with grades, credit totals, and remarks for each student.'
  }
};

// Data getters and setters
function getDB(key, defaultVal) {
  const data = localStorage.getItem('acadex_' + key);
  if (!data) {
    localStorage.setItem('acadex_' + key, JSON.stringify(defaultVal));
    return defaultVal;
  }
  return JSON.parse(data);
}

function setDB(key, val) {
  localStorage.setItem('acadex_' + key, JSON.stringify(val));
}

// Loaded data
let users = getDB('users', defaultUsers);
let students = getDB('students', defaultStudents);
let classes = getDB('classes', defaultClasses);
let subjects = getDB('subjects', defaultSubjects);
let scores = getDB('scores', defaultScores);
let attendanceRecords = getDB('attendance', defaultAttendance);
let notifications = getDB('notifications', defaultNotifications);
let activities = getDB('activities', defaultActivities);

// Global Variables
let currentStudentPage = 1;
const studentsPerPage = 6;
let studentSortColumn = 'id';
let studentSortDir = 'asc';

let editingStudentId = null;
let editingClassId = null;
let editingSubjectCode = null;
let editingScoreId = null;
let editingUserId = null;

// Log activity function
function logActivity(text, icon = '🔔') {
  activities.unshift({ text, time: 'Just now', icon });
  if (activities.length > 8) activities.pop();
  setDB('activities', activities);
}

// --- Authentication guards ---
function getCurrentUser() {
  const user = sessionStorage.getItem('acadex_currentUser') || localStorage.getItem('acadex_currentUser');
  return user ? JSON.parse(user) : null;
}

function checkAuthentication() {
  const page = document.body.dataset.page;
  const user = getCurrentUser();

  const publicPages = ['login', 'register', 'forgot-password'];
  
  if (publicPages.includes(page)) {
    if (user) {
      window.location.href = 'dashboard.html';
    }
    return;
  }

  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  // Active status check
  const dbUser = users.find(u => u.username === user.username);
  if (dbUser && dbUser.status === 'Inactive') {
    alert('Your account is currently deactivated. Please contact the administrator.');
    sessionStorage.removeItem('acadex_currentUser');
    localStorage.removeItem('acadex_currentUser');
    window.location.href = 'login.html';
    return;
  }

  // Page specific role validations
  if (page === 'users' && user.role !== 'admin') {
    alert('Access Denied. Admin privileges required.');
    window.location.href = 'dashboard.html';
  }

  const restrictedStudentPages = ['students', 'classes', 'subjects'];
  if (restrictedStudentPages.includes(page) && user.role === 'student') {
    alert('Access Denied. Students do not have access to academic management tools.');
    window.location.href = 'dashboard.html';
  }
}

// Dynamic Navigation & UI Headers
function setupLayout() {
  const page = document.body.dataset.page;
  const publicPages = ['login', 'register', 'forgot-password'];
  if (publicPages.includes(page)) return;

  const user = getCurrentUser();
  if (!user) return;

  // Add mobile hamburger trigger layout
  setupMobileHeader();

  // Highlight navigation active state & restrict sidebar navigation based on role
  renderSidebarNav(user);

  // Setup user profile chip in topbar
  setupProfileChip(user);

  // Add backdrop overlay element for mobile
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);
  
  overlay.addEventListener('click', () => {
    document.querySelector('.sidebar').classList.remove('show');
    overlay.classList.remove('show');
  });
}

function setupMobileHeader() {
  const appShell = document.querySelector('.app-shell');
  if (!appShell) return;

  // Check if mobile header already exists
  if (document.querySelector('.mobile-header')) return;

  const mobileHeader = document.createElement('div');
  mobileHeader.className = 'mobile-header';
  mobileHeader.innerHTML = `
    <button class="hamburger-btn" id="mobile-hamburger">☰</button>
    <div class="mobile-brand">
      <div class="logo-circle">A</div>
      <h2>ACADEX</h2>
    </div>
    <div style="width: 28px;"></div>
  `;
  appShell.parentNode.insertBefore(mobileHeader, appShell);

  document.getElementById('mobile-hamburger').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('show');
    document.querySelector('.sidebar-overlay').classList.toggle('show');
  });
}

function renderSidebarNav(user) {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  // Clear or rebuild navigation list
  let nav = sidebar.querySelector('.sidebar-nav');
  if (!nav) return;

  // Role permissions: hide specific links
  const links = nav.querySelectorAll('.sidebar-link');
  links.forEach(link => {
    const href = link.getAttribute('href');
    let allowed = true;

    if (href === 'users.html' && user.role !== 'admin') {
      allowed = false;
    }
    
    const adminOrTeacherOnly = ['students.html', 'classes.html', 'subjects.html'];
    if (adminOrTeacherOnly.includes(href) && user.role === 'student') {
      allowed = false;
    }

    if (allowed) {
      link.classList.remove('hidden');
    } else {
      link.classList.add('hidden');
    }

    // Toggle active page styling
    const page = document.body.dataset.page;
    if (href === `${page}.html`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Ensure Admin sees "User Management" link (check if exists, or append it)
  let userLink = nav.querySelector('a[href="users.html"]');
  if (!userLink && user.role === 'admin') {
    userLink = document.createElement('a');
    userLink.href = 'users.html';
    userLink.className = 'sidebar-link';
    userLink.innerHTML = `<span class="nav-icon">👤</span>User Management`;
    // Insert before report management or footer
    const reportsLink = nav.querySelector('a[href="reports.html"]');
    if (reportsLink) {
      nav.insertBefore(userLink, reportsLink);
    } else {
      nav.appendChild(userLink);
    }
    
    if (document.body.dataset.page === 'users') {
      userLink.classList.add('active');
    }
  }

  // Setup Logout Button
  const sidebarFooter = sidebar.querySelector('.sidebar-footer');
  if (sidebarFooter) {
    sidebarFooter.innerHTML = `
      <a href="profile.html" class="sidebar-link" style="margin-bottom: 8px;"><span class="nav-icon">⚙️</span>Profile Settings</a>
      <button id="logout-btn" class="btn btn-secondary btn-full">Logout</button>
    `;
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
  }
}

function setupProfileChip(user) {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;

  let chip = topbar.querySelector('.profile-chip');
  if (!chip) {
    chip = document.createElement('div');
    chip.className = 'profile-chip';
    topbar.appendChild(chip);
  }

  // Get user avatar letter
  const avatarChar = user.name ? user.name.charAt(0).toUpperCase() : user.role.charAt(0).toUpperCase();
  const displayRole = user.role.charAt(0).toUpperCase() + user.role.slice(1);

  chip.innerHTML = `
    <div class="profile-avatar">${avatarChar}</div>
    <div>
      <strong>${user.name || user.username}</strong>
      <span>${displayRole}</span>
    </div>
  `;

  chip.addEventListener('click', () => {
    window.location.href = 'profile.html';
  });
}

function handleLogout() {
  if (confirm('Are you sure you want to log out?')) {
    sessionStorage.removeItem('acadex_currentUser');
    localStorage.removeItem('acadex_currentUser');
    window.location.href = 'login.html';
  }
}

// --- Page Logic Handlers ---

function initPage() {
  checkAuthentication();
  setupLayout();

  const page = document.body.dataset.page;
  switch (page) {
    case 'login': initLogin(); break;
    case 'register': initRegister(); break;
    case 'forgot-password': initForgotPassword(); break;
    case 'dashboard': initDashboard(); break;
    case 'students': initStudentsPage(); break;
    case 'classes': initClassesPage(); break;
    case 'subjects': initSubjectsPage(); break;
    case 'scores': initScoresPage(); break;
    case 'attendance': initAttendancePage(); break;
    case 'notifications': initNotificationsPage(); break;
    case 'reports': initReportsPage(); break;
    case 'users': initUsersPage(); break;
    case 'profile': initProfilePage(); break;
    default: break;
  }
}

// 1. LOGIN
function initLogin() {
  const form = document.getElementById('login-form');
  const message = document.getElementById('error-message');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = form.username.value.trim().toLowerCase();
    const password = form.password.value.trim();

    const user = users.find(u => u.username.toLowerCase() === username && u.password === password);
    
    if (user) {
      if (user.status === 'Inactive') {
        message.textContent = 'Account inactive. Contact administrator.';
        return;
      }
      
      const rememberMe = document.getElementById('remember-me');
      const sessionData = JSON.stringify({
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role
      });

      if (rememberMe && rememberMe.checked) {
        localStorage.setItem('acadex_currentUser', sessionData);
      } else {
        sessionStorage.setItem('acadex_currentUser', sessionData);
      }

      logActivity(`${user.name || user.username} logged in`, '👤');
      window.location.href = 'dashboard.html';
    } else {
      message.textContent = 'Invalid username or password. Please try again.';
    }
  });
}

// 2. REGISTER
function initRegister() {
  const form = document.getElementById('register-form');
  const message = document.getElementById('error-message');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fullName = form['full-name'].value.trim();
    const email = form.email.value.trim();
    const role = form.role.value;
    const password = form.password.value;
    const confirmPassword = form['confirm-password'].value;

    if (password !== confirmPassword) {
      message.textContent = 'Passwords do not match.';
      return;
    }

    // Check if email or username already exists
    const username = email.split('@')[0].toLowerCase();
    const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    const usernameExists = users.some(u => u.username.toLowerCase() === username);

    if (emailExists || usernameExists) {
      message.textContent = 'An account with this email already exists.';
      return;
    }

    // Add user to db
    const newUser = {
      username: username,
      name: fullName,
      email: email,
      password: password,
      role: role,
      status: 'Active'
    };

    users.push(newUser);
    setDB('users', users);

    // If role is Student, create a matching student record automatically
    if (role === 'student') {
      const studentId = `S-${1000 + students.length + 1}`;
      students.push({
        id: studentId,
        name: fullName,
        gender: 'Other',
        dob: '2005-01-01',
        class: '10A', // default class
        email: email,
        gpa: 0.00
      });
      setDB('students', students);
    }

    logActivity(`New user registered: ${fullName} (${role})`, '👤');
    alert('Registration successful! You can now log in.');
    window.location.href = 'login.html';
  });
}

// 3. FORGOT PASSWORD
function initForgotPassword() {
  const form = document.getElementById('forgot-form');
  const message = document.getElementById('error-message');
  if (!form) return;

  const emailStep = document.getElementById('email-step');
  const otpStep = document.getElementById('otp-step');
  const resetStep = document.getElementById('reset-step');
  
  const otpInput = document.getElementById('otp-code');
  const mockOtpDisplay = document.getElementById('mock-otp');
  
  let targetUser = null;
  let generatedOtp = null;

  // Step 1: Submit Email
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (emailStep.classList.contains('hidden') === false) {
      const email = form.email.value.trim().toLowerCase();
      targetUser = users.find(u => u.email.toLowerCase() === email);
      
      if (!targetUser) {
        message.textContent = 'No account associated with this email address.';
        return;
      }
      
      // Simulate sending OTP
      generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      mockOtpDisplay.textContent = generatedOtp;
      
      emailStep.classList.add('hidden');
      otpStep.classList.remove('hidden');
      message.textContent = '';
      message.style.color = 'var(--success)';
      message.textContent = 'Simulated OTP code sent to your email.';
      
      setTimeout(() => {
        message.style.color = 'var(--danger)';
        message.textContent = '';
      }, 5000);
      return;
    }

    // Step 2: Validate OTP
    if (otpStep.classList.contains('hidden') === false) {
      const enteredOtp = otpInput.value.trim();
      if (enteredOtp !== generatedOtp) {
        message.textContent = 'Invalid OTP code. Please check and try again.';
        return;
      }
      
      otpStep.classList.add('hidden');
      resetStep.classList.remove('hidden');
      message.textContent = '';
      return;
    }

    // Step 3: Reset Password
    if (resetStep.classList.contains('hidden') === false) {
      const newPassword = form['new-password'].value;
      const confirmNewPassword = form['confirm-new-password'].value;

      if (newPassword !== confirmNewPassword) {
        message.textContent = 'Passwords do not match.';
        return;
      }

      // Update password
      targetUser.password = newPassword;
      setDB('users', users);

      logActivity(`Password reset for ${targetUser.name}`, '🔑');
      alert('Password updated successfully. You can now log in.');
      window.location.href = 'login.html';
    }
  });
}

// 4. DASHBOARD
function initDashboard() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  // Greet user in header
  const greetText = document.querySelector('.topbar p');
  if (greetText) {
    const roleCapitalized = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
    greetText.textContent = `Welcome back, ${currentUser.name || currentUser.username}. Review the latest ${roleCapitalized} portal metrics.`;
  }

  // Render quick stats based on role
  renderDashboardStats(currentUser);

  // Render recent activities
  renderDashboardActivities();

  // Render notifications
  renderDashboardNotifications(currentUser);

  // Dynamic widgets for role-based dashboard layout
  setupRoleSpecificWidgets(currentUser);

  // Render GPA charts
  renderDashboardCharts(currentUser);
}

function renderDashboardStats(user) {
  const statStudents = document.getElementById('stat-students');
  const statClasses = document.getElementById('stat-classes');
  const statSubjects = document.getElementById('stat-subjects');
  const statGpa = document.getElementById('stat-gpa');

  if (statStudents) statStudents.textContent = students.length;
  if (statClasses) statClasses.textContent = classes.length;
  if (statSubjects) statSubjects.textContent = subjects.length;
  
  if (statGpa) {
    if (user.role === 'student') {
      // Show student's personal GPA
      const studentData = students.find(s => s.email.toLowerCase() === user.email.toLowerCase());
      statGpa.textContent = studentData ? studentData.gpa.toFixed(2) : '0.00';
      const gpaCardTitle = statGpa.previousElementSibling;
      if (gpaCardTitle) gpaCardTitle.textContent = 'My Academic GPA';
    } else {
      // Show school average GPA
      const average = students.length ? (students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2) : '0.00';
      statGpa.textContent = average;
    }
  }
}

function renderDashboardNotifications(user) {
  const container = document.getElementById('dashboard-notifications');
  if (!container) return;

  container.innerHTML = '';
  
  // Filter notifications: students only see 'Published' and their matching recipient type
  const list = notifications.filter(note => {
    if (user.role === 'student') {
      return note.status === 'Published' && (note.recipient === 'All' || note.recipient === 'Students');
    }
    if (user.role === 'teacher') {
      return note.recipient === 'All' || note.recipient === 'Teachers';
    }
    return true; // Admin sees all
  });

  const displayList = list.slice(0, 3);

  if (displayList.length === 0) {
    container.innerHTML = '<li class="notification-card"><p>No current announcements available.</p></li>';
    return;
  }

  displayList.forEach(note => {
    const item = document.createElement('li');
    item.className = 'notification-card';
    const priorityColor = note.priority === 'High' ? 'badge-danger' : note.priority === 'Medium' ? 'badge-warning' : 'badge-success';
    const statusColor = note.status === 'Published' ? 'badge-success' : 'badge-secondary';
    
    item.innerHTML = `
      <div class="notification-header">
        <strong>${note.title}</strong>
        <span class="badge ${priorityColor}">${note.priority}</span>
      </div>
      <p>${note.message}</p>
      <div class="notification-meta">
        <span>👤 To: ${note.recipient}</span>
        <span>📅 ${note.date}</span>
        ${user.role === 'admin' ? `<span class="badge ${statusColor}">${note.status}</span>` : ''}
      </div>
    `;
    container.appendChild(item);
  });
}

function renderDashboardActivities() {
  const container = document.getElementById('recent-activities-container');
  if (!container) return;

  container.innerHTML = '';
  if (activities.length === 0) {
    container.innerHTML = '<p>No recent activity found.</p>';
    return;
  }

  const timeline = document.createElement('div');
  timeline.className = 'activity-timeline';

  activities.slice(0, 5).forEach(act => {
    const item = document.createElement('div');
    item.className = 'activity-item';
    item.innerHTML = `
      <div class="activity-icon">${act.icon || '🔔'}</div>
      <div class="activity-info">
        <p>${act.text}</p>
        <small>${act.time}</small>
      </div>
    `;
    timeline.appendChild(item);
  });

  container.appendChild(timeline);
}

function setupRoleSpecificWidgets(user) {
  const widgetsContainer = document.getElementById('role-widgets-container');
  if (!widgetsContainer) return;

  widgetsContainer.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'card card-panel';

  if (user.role === 'admin') {
    card.innerHTML = `
      <div class="panel-header">
        <h2>Admin Quick Actions & Logs</h2>
      </div>
      <div class="shortcut-grid">
        <a href="users.html" class="shortcut-card"><span>👤</span>Manage Users</a>
        <a href="students.html" class="shortcut-card"><span>👩‍🎓</span>Students Panel</a>
        <a href="classes.html" class="shortcut-card"><span>🏫</span>Classes Setup</a>
        <a href="notifications.html" class="shortcut-card"><span>🔔</span>Broadcast Alert</a>
      </div>
    `;
  } else if (user.role === 'teacher') {
    card.innerHTML = `
      <div class="panel-header">
        <h2>Teaching Hub</h2>
        <span class="badge badge-primary">Teacher Mode</span>
      </div>
      <div class="shortcut-grid">
        <a href="scores.html" class="shortcut-card"><span>📝</span>Add/Edit Scores</a>
        <a href="attendance.html" class="shortcut-card"><span>📅</span>Track Attendance</a>
        <a href="reports.html" class="shortcut-card"><span>📄</span>Review Reports</a>
        <a href="notifications.html" class="shortcut-card"><span>🔔</span>Post Notice</a>
      </div>
    `;
  } else if (user.role === 'student') {
    // Show student scoreboard
    const studentData = students.find(s => s.email.toLowerCase() === user.email.toLowerCase());
    const studentScores = studentData ? scores.filter(sc => sc.student.toLowerCase() === studentData.name.toLowerCase()) : [];

    let scoreRows = '';
    if (studentScores.length > 0) {
      studentScores.forEach(sc => {
        scoreRows += `
          <div class="assign-item">
            <span>${sc.subject}</span>
            <div>
              <span class="badge badge-primary">Midterm: ${sc.midterm}</span>
              <span class="badge badge-success">Final: ${sc.final}</span>
              <span class="badge badge-warning" style="margin-left: 6px;">GPA: ${sc.gpa.toFixed(2)}</span>
            </div>
          </div>
        `;
      });
    } else {
      scoreRows = '<p>No scores reported for your subjects yet.</p>';
    }

    card.innerHTML = `
      <div class="panel-header">
        <h2>My Scoreboard</h2>
        <span class="badge badge-success">GPA Verified</span>
      </div>
      <div class="assign-panel">
        <div class="assign-list" style="min-height: 180px;">
          ${scoreRows}
        </div>
      </div>
    `;
  }

  widgetsContainer.appendChild(card);
}

function renderDashboardCharts(user) {
  const canvas = document.getElementById('dashboardChart');
  if (!canvas) return;

  // Add Chart.js to document if not present
  if (typeof Chart === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = () => drawChart(canvas, user);
    document.head.appendChild(script);
  } else {
    drawChart(canvas, user);
  }
}

function drawChart(canvas, user) {
  const ctx = canvas.getContext('2d');
  
  if (window.myDashboardChart) {
    window.myDashboardChart.destroy();
  }

  let chartConfig = {};

  if (user.role === 'student') {
    // Student personal subject grades breakdown
    const studentData = students.find(s => s.email.toLowerCase() === user.email.toLowerCase());
    const studentScores = studentData ? scores.filter(sc => sc.student.toLowerCase() === studentData.name.toLowerCase()) : [];
    
    const labels = studentScores.length ? studentScores.map(sc => sc.subject) : ['No Subjects'];
    const midterms = studentScores.length ? studentScores.map(sc => sc.midterm) : [0];
    const finals = studentScores.length ? studentScores.map(sc => sc.final) : [0];

    chartConfig = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Midterm Score',
            data: midterms,
            backgroundColor: 'rgba(79, 70, 229, 0.6)',
            borderColor: 'rgb(79, 70, 229)',
            borderWidth: 1,
            borderRadius: 6
          },
          {
            label: 'Final Score',
            data: finals,
            backgroundColor: 'rgba(30, 64, 175, 0.8)',
            borderColor: 'rgb(30, 64, 175)',
            borderWidth: 1,
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { min: 0, max: 100 }
        }
      }
    };
  } else {
    // Admin / Teacher: Average GPA of each class
    const classGPAs = classes.map(cls => {
      const clsStudents = students.filter(s => s.class === cls.name);
      const avgGPA = clsStudents.length ? (clsStudents.reduce((sum, s) => sum + s.gpa, 0) / clsStudents.length) : 0;
      return { name: cls.name, gpa: parseFloat(avgGPA.toFixed(2)) };
    });

    chartConfig = {
      type: 'bar',
      data: {
        labels: classGPAs.map(c => c.name),
        datasets: [{
          label: 'Class Avg GPA',
          data: classGPAs.map(c => c.gpa),
          backgroundColor: 'rgba(30, 64, 175, 0.7)',
          borderColor: 'rgb(30, 64, 175)',
          borderWidth: 1,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { min: 0, max: 4.0 }
        }
      }
    };
  }

  window.myDashboardChart = new Chart(ctx, chartConfig);
}

// 5. STUDENT MANAGEMENT
function initStudentsPage() {
  const search = document.getElementById('studentSearch');
  const filter = document.getElementById('studentClassFilter');
  const addBtn = document.getElementById('addStudentBtn');
  const cancelBtn = document.getElementById('studentFormCancel');
  const form = document.getElementById('studentForm');
  const exportBtn = document.getElementById('exportStudentsBtn') || createExportBtn();

  populateClassFilter(filter, 'all');
  populateClassSelect(document.getElementById('studentClass'));
  
  if (addBtn) addBtn.addEventListener('click', () => openStudentForm('add'));
  if (cancelBtn) cancelBtn.addEventListener('click', closeStudentForm);
  if (search) search.addEventListener('input', () => { currentStudentPage = 1; renderStudentTable(); });
  if (filter) filter.addEventListener('change', () => { currentStudentPage = 1; renderStudentTable(); });
  if (form) form.addEventListener('submit', handleStudentFormSubmit);
  
  if (exportBtn) {
    exportBtn.addEventListener('click', exportStudentListCSV);
  }

  setupTableSorting();
  renderStudentTable();
}

function createExportBtn() {
  // Check if we need to inject an Export button
  const topbar = document.querySelector('.topbar');
  if (!topbar) return null;

  let btnContainer = topbar.querySelector('.action-buttons-top');
  if (!btnContainer) {
    btnContainer = document.createElement('div');
    btnContainer.className = 'action-buttons-top';
    btnContainer.style.display = 'flex';
    btnContainer.style.gap = '12px';
    const addBtn = document.getElementById('addStudentBtn');
    if (addBtn) {
      addBtn.parentNode.insertBefore(btnContainer, addBtn);
      btnContainer.appendChild(addBtn);
    }
  }

  const exportBtn = document.createElement('button');
  exportBtn.id = 'exportStudentsBtn';
  exportBtn.className = 'btn btn-secondary';
  exportBtn.innerHTML = '📥 Export CSV';
  btnContainer.insertBefore(exportBtn, btnContainer.firstChild);
  return exportBtn;
}

function populateClassFilter(select, defaultValue) {
  if (!select) return;
  select.innerHTML = '<option value="all">All Classes</option>' + classes.map((cls) => `<option value="${cls.name}">${cls.name}</option>`).join('');
  select.value = defaultValue;
}

function populateClassSelect(select) {
  if (!select) return;
  select.innerHTML = classes.map((cls) => `<option value="${cls.name}">${cls.name}</option>`).join('');
}

function setupTableSorting() {
  const table = document.querySelector('.data-table');
  if (!table) return;

  const headers = table.querySelectorAll('thead th');
  // Make relevant columns sortable
  headers.forEach((th, index) => {
    const text = th.textContent.trim().toLowerCase();
    const sortKeys = {
      'id': 'id',
      'full name': 'name',
      'class': 'class',
      'gpa': 'gpa',
      'dob': 'dob'
    };

    if (sortKeys[text]) {
      th.classList.add('sortable');
      th.dataset.sortKey = sortKeys[text];
      
      th.addEventListener('click', () => {
        const key = th.dataset.sortKey;
        if (studentSortColumn === key) {
          studentSortDir = studentSortDir === 'asc' ? 'desc' : 'asc';
        } else {
          studentSortColumn = key;
          studentSortDir = 'asc';
        }
        
        // Update header classes
        headers.forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
        th.classList.add(studentSortDir === 'asc' ? 'sort-asc' : 'sort-desc');

        renderStudentTable();
      });
    }
  });
}

function getFilteredStudents() {
  const searchTerm = document.getElementById('studentSearch').value.trim().toLowerCase();
  const classFilter = document.getElementById('studentClassFilter').value;

  let filtered = students.filter((student) => {
    const matchesSearch = `${student.name} ${student.id} ${student.email}`.toLowerCase().includes(searchTerm);
    const matchesClass = classFilter === 'all' || student.class === classFilter;
    return matchesSearch && matchesClass;
  });

  // Sort
  filtered.sort((a, b) => {
    let valA = a[studentSortColumn];
    let valB = b[studentSortColumn];

    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return studentSortDir === 'asc' ? -1 : 1;
    if (valA > valB) return studentSortDir === 'asc' ? 1 : -1;
    return 0;
  });

  return filtered;
}

function renderStudentTable() {
  const filtered = getFilteredStudents();
  const tbody = document.getElementById('studentTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: var(--text-muted);">No student records match search filters.</td></tr>';
    renderStudentPagination(0);
    return;
  }

  const start = (currentStudentPage - 1) * studentsPerPage;
  const pageItems = filtered.slice(start, start + studentsPerPage);

  pageItems.forEach((student) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${student.id}</strong></td>
      <td>${student.name}</td>
      <td>${student.gender}</td>
      <td>${student.dob}</td>
      <td><span class="badge badge-primary">${student.class}</span></td>
      <td>${student.email}</td>
      <td><strong style="color: var(--primary);">${student.gpa.toFixed(2)}</strong></td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-secondary" onclick="editStudent('${student.id}')">Edit</button>
          <button class="btn btn-danger" onclick="deleteStudent('${student.id}')">Delete</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
  renderStudentPagination(filtered.length);
}

function renderStudentPagination(totalItems) {
  const pagination = document.getElementById('studentPagination');
  if (!pagination) return;
  
  pagination.innerHTML = '';
  const totalPages = Math.max(1, Math.ceil(totalItems / studentsPerPage));

  // Prev Button
  const prevBtn = document.createElement('button');
  prevBtn.textContent = '◀';
  prevBtn.disabled = currentStudentPage === 1;
  prevBtn.addEventListener('click', () => {
    if (currentStudentPage > 1) {
      currentStudentPage--;
      renderStudentTable();
    }
  });
  pagination.appendChild(prevBtn);

  // Page Numbers
  for (let i = 1; i <= totalPages; i += 1) {
    const button = document.createElement('button');
    button.className = i === currentStudentPage ? 'active' : '';
    button.textContent = i;
    button.addEventListener('click', () => {
      currentStudentPage = i;
      renderStudentTable();
    });
    pagination.appendChild(button);
  }

  // Next Button
  const nextBtn = document.createElement('button');
  nextBtn.textContent = '▶';
  nextBtn.disabled = currentStudentPage === totalPages;
  nextBtn.addEventListener('click', () => {
    if (currentStudentPage < totalPages) {
      currentStudentPage++;
      renderStudentTable();
    }
  });
  pagination.appendChild(nextBtn);
}

function openStudentForm(mode, id = null) {
  editingStudentId = null;
  const panel = document.getElementById('studentFormPanel');
  const title = document.getElementById('studentFormTitle');
  const form = document.getElementById('studentForm');
  if (!panel || !form) return;

  form.reset();
  populateClassSelect(document.getElementById('studentClass'));
  
  if (mode === 'edit' && id) {
    const student = students.find((item) => item.id === id);
    if (!student) return;
    editingStudentId = id;
    title.textContent = 'Edit Student Details';
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentGender').value = student.gender;
    document.getElementById('studentDob').value = student.dob;
    document.getElementById('studentClass').value = student.class;
    document.getElementById('studentEmail').value = student.email;
    document.getElementById('studentGpa').value = student.gpa.toFixed(2);
  } else {
    title.textContent = 'Add New Student Record';
  }
  panel.classList.remove('hidden');
  panel.scrollIntoView({ behavior: 'smooth' });
}

function closeStudentForm() {
  const panel = document.getElementById('studentFormPanel');
  if (panel) panel.classList.add('hidden');
  editingStudentId = null;
}

function handleStudentFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('studentName').value.trim();
  const gender = document.getElementById('studentGender').value;
  const dob = document.getElementById('studentDob').value;
  const studentClass = document.getElementById('studentClass').value;
  const email = document.getElementById('studentEmail').value.trim();
  const gpa = Number(document.getElementById('studentGpa').value);

  if (editingStudentId) {
    const student = students.find((item) => item.id === editingStudentId);
    if (student) {
      student.name = name;
      student.gender = gender;
      student.dob = dob;
      student.class = studentClass;
      student.email = email;
      student.gpa = gpa;
      logActivity(`Updated student ${name} details`, '👩‍🎓');
    }
  } else {
    const id = `S-${1000 + students.length + 1}`;
    students.push({ id, name, gender, dob, class: studentClass, email, gpa });
    logActivity(`Added new student record: ${name}`, '👩‍🎓');
  }

  setDB('students', students);
  closeStudentForm();
  renderStudentTable();
}

function editStudent(id) {
  openStudentForm('edit', id);
}

function deleteStudent(id) {
  if (!confirm('Are you sure you want to permanently delete this student record?')) return;
  const index = students.findIndex((item) => item.id === id);
  if (index !== -1) {
    const name = students[index].name;
    students.splice(index, 1);
    setDB('students', students);
    logActivity(`Deleted student record: ${name}`, '🗑️');
    renderStudentTable();
  }
}

function exportStudentListCSV() {
  const filtered = getFilteredStudents();
  if (filtered.length === 0) {
    alert('No students to export.');
    return;
  }

  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += 'ID,Full Name,Gender,DOB,Class,Email,GPA\r\n';

  filtered.forEach(s => {
    const row = `"${s.id}","${s.name}","${s.gender}","${s.dob}","${s.class}","${s.email}",${s.gpa.toFixed(2)}`;
    csvContent += row + '\r\n';
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'ACADEX_Students_List.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 6. CLASS MANAGEMENT
function initClassesPage() {
  const search = document.getElementById('classSearch');
  if (search) search.addEventListener('input', renderClassTable);
  
  const addBtn = document.getElementById('addClassBtn');
  if (addBtn) addBtn.addEventListener('click', () => openClassForm('add'));
  
  const cancelBtn = document.getElementById('classFormCancel');
  if (cancelBtn) cancelBtn.addEventListener('click', closeClassForm);
  
  const form = document.getElementById('classForm');
  if (form) form.addEventListener('submit', handleClassFormSubmit);
  
  const assignClass = document.getElementById('assignStudentClass');
  if (assignClass) assignClass.addEventListener('change', renderAssignStudents);
  
  const assignTeacherClass = document.getElementById('assignTeacherClass');
  if (assignTeacherClass) assignTeacherClass.addEventListener('change', populateTeacherSelection);
  
  const saveTeacherBtn = document.getElementById('saveTeacherBtn');
  if (saveTeacherBtn) saveTeacherBtn.addEventListener('click', saveTeacherAssignment);

  renderClassSelectors();
  renderClassTable();
  renderAssignStudents();
}

function renderClassSelectors() {
  const studentClass = document.getElementById('assignStudentClass');
  const teacherClass = document.getElementById('assignTeacherClass');
  if (!studentClass || !teacherClass) return;

  const selectOptions = classes.map((cls) => `<option value="${cls.id}">${cls.name}</option>`).join('');
  studentClass.innerHTML = selectOptions;
  teacherClass.innerHTML = selectOptions;
  populateTeacherSelection();
}

function renderClassTable() {
  const search = document.getElementById('classSearch');
  const searchTerm = search ? search.value.trim().toLowerCase() : '';
  const body = document.getElementById('classTableBody');
  if (!body) return;

  body.innerHTML = '';
  classes.filter((cls) => `${cls.name} ${cls.teacher}`.toLowerCase().includes(searchTerm)).forEach((cls) => {
    // Dynamic Student count in class
    const studentCount = students.filter(s => s.class === cls.name).length;
    cls.count = studentCount;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${cls.id}</strong></td>
      <td>${cls.name}</td>
      <td>${cls.teacher}</td>
      <td><span class="badge badge-primary">${studentCount} Students</span></td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-secondary" onclick="editClass('${cls.id}')">Edit</button>
          <button class="btn btn-danger" onclick="deleteClass('${cls.id}')">Delete</button>
        </div>
      </td>
    `;
    body.appendChild(row);
  });
}

function renderAssignStudents() {
  const selectedId = document.getElementById('assignStudentClass').value;
  const classInfo = classes.find((cls) => cls.id === selectedId) || classes[0];
  const list = document.getElementById('assignStudentList');
  if (!list || !classInfo) return;

  const assigned = students.filter((student) => student.class === classInfo.name);
  list.innerHTML = assigned.length ? assigned.map((student) => `
    <div class="assign-item">
      <span>${student.name}</span>
      <small>${student.email}</small>
    </div>
  `).join('') : '<p style="color: var(--text-muted);">No students assigned to this class yet.</p>';
}

function populateTeacherSelection() {
  const selectClass = document.getElementById('assignTeacherClass');
  if (!selectClass) return;

  const selectedId = selectClass.value;
  const cls = classes.find((item) => item.id === selectedId);
  const select = document.getElementById('assignTeacherSelect');
  if (cls && select) select.value = cls.teacher;
}

function saveTeacherAssignment() {
  const selectedId = document.getElementById('assignTeacherClass').value;
  const teacher = document.getElementById('assignTeacherSelect').value;
  const cls = classes.find((item) => item.id === selectedId);
  if (cls) {
    cls.teacher = teacher;
    setDB('classes', classes);
    renderClassTable();
    logActivity(`Assigned homeroom teacher ${teacher} to class ${cls.name}`, '🏫');
    alert('Homeroom teacher assigned successfully.');
  }
}

function openClassForm(mode, id = null) {
  editingClassId = null;
  const panel = document.getElementById('classFormPanel');
  const title = document.getElementById('classFormTitle');
  const form = document.getElementById('classForm');
  if (!panel || !form) return;

  form.reset();
  if (mode === 'edit' && id) {
    const cls = classes.find((item) => item.id === id);
    if (!cls) return;
    editingClassId = id;
    title.textContent = 'Edit Class Details';
    document.getElementById('className').value = cls.name;
    document.getElementById('classTeacher').value = cls.teacher;
    document.getElementById('classCount').value = cls.count;
  } else {
    title.textContent = 'Add New Class';
  }
  panel.classList.remove('hidden');
  panel.scrollIntoView({ behavior: 'smooth' });
}

function closeClassForm() {
  const panel = document.getElementById('classFormPanel');
  if (panel) panel.classList.add('hidden');
  editingClassId = null;
}

function handleClassFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('className').value.trim();
  const teacher = document.getElementById('classTeacher').value;
  const count = Number(document.getElementById('classCount').value);

  if (editingClassId) {
    const cls = classes.find((item) => item.id === editingClassId);
    if (cls) {
      cls.name = name;
      cls.teacher = teacher;
      cls.count = count;
      logActivity(`Updated Class ${name} details`, '🏫');
    }
  } else {
    const id = `C-${classes.length + 10}`;
    classes.push({ id, name, teacher, count });
    logActivity(`Added new class: ${name}`, '🏫');
  }

  setDB('classes', classes);
  closeClassForm();
  renderClassSelectors();
  renderClassTable();
}

function editClass(id) {
  openClassForm('edit', id);
}

function deleteClass(id) {
  if (!confirm('Are you sure you want to delete this class record?')) return;
  const index = classes.findIndex((cls) => cls.id === id);
  if (index !== -1) {
    const name = classes[index].name;
    classes.splice(index, 1);
    setDB('classes', classes);
    logActivity(`Deleted class record: ${name}`, '🗑️');
    renderClassSelectors();
    renderClassTable();
  }
}

// 7. SUBJECT MANAGEMENT
function initSubjectsPage() {
  document.getElementById('subjectSearch').addEventListener('input', renderSubjectTable);
  document.getElementById('subjectClassFilter').addEventListener('change', renderSubjectTable);
  document.getElementById('addSubjectBtn').addEventListener('click', () => openSubjectForm('add'));
  document.getElementById('subjectFormCancel').addEventListener('click', closeSubjectForm);
  document.getElementById('subjectForm').addEventListener('submit', handleSubjectFormSubmit);
  populateClassFilter(document.getElementById('subjectClassFilter'), 'all');
  populateSubjectClassSelect(document.getElementById('subjectClasses'));
  renderSubjectTable();
}

function populateSubjectClassSelect(select) {
  if (!select) return;
  select.innerHTML = classes.map((cls) => `<option value="${cls.name}">${cls.name}</option>`).join('');
}

function renderSubjectTable() {
  const searchTerm = document.getElementById('subjectSearch').value.trim().toLowerCase();
  const classFilter = document.getElementById('subjectClassFilter').value;
  const tbody = document.getElementById('subjectTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  
  const filtered = subjects.filter((subject) => {
    const matchesSearch = `${subject.code} ${subject.name}`.toLowerCase().includes(searchTerm);
    const matchesClass = classFilter === 'all' || subject.classes.includes(classFilter);
    return matchesSearch && matchesClass;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No subjects found matching the criteria.</td></tr>';
    return;
  }

  filtered.forEach((subject) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${subject.code}</strong></td>
      <td>${subject.name}</td>
      <td><span class="badge badge-secondary">${subject.credits} Credits</span></td>
      <td>${subject.classes.map(c => `<span class="badge badge-primary" style="margin-right: 4px;">${c}</span>`).join('')}</td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-secondary" onclick="editSubject('${subject.code}')">Edit</button>
          <button class="btn btn-danger" onclick="deleteSubject('${subject.code}')">Delete</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function openSubjectForm(mode, code = null) {
  editingSubjectCode = null;
  const panel = document.getElementById('subjectFormPanel');
  const title = document.getElementById('subjectFormTitle');
  const form = document.getElementById('subjectForm');
  if (!panel || !form) return;

  form.reset();
  populateSubjectClassSelect(document.getElementById('subjectClasses'));
  if (mode === 'edit' && code) {
    const subject = subjects.find((item) => item.code === code);
    if (!subject) return;
    editingSubjectCode = code;
    title.textContent = 'Edit Subject details';
    document.getElementById('subjectCode').value = subject.code;
    document.getElementById('subjectCode').disabled = true;
    document.getElementById('subjectName').value = subject.name;
    document.getElementById('subjectCredits').value = subject.credits;
    Array.from(document.getElementById('subjectClasses').options).forEach((option) => {
      option.selected = subject.classes.includes(option.value);
    });
  } else {
    title.textContent = 'Add New Subject';
    document.getElementById('subjectCode').disabled = false;
  }
  panel.classList.remove('hidden');
  panel.scrollIntoView({ behavior: 'smooth' });
}

function closeSubjectForm() {
  const panel = document.getElementById('subjectFormPanel');
  if (panel) panel.classList.add('hidden');
  editingSubjectCode = null;
}

function handleSubjectFormSubmit(event) {
  event.preventDefault();
  const code = document.getElementById('subjectCode').value.trim().toUpperCase();
  const name = document.getElementById('subjectName').value.trim();
  const credits = Number(document.getElementById('subjectCredits').value);
  const selectedClasses = Array.from(document.getElementById('subjectClasses').selectedOptions).map((option) => option.value);

  if (editingSubjectCode) {
    const subject = subjects.find((item) => item.code === editingSubjectCode);
    if (subject) {
      subject.name = name;
      subject.credits = credits;
      subject.classes = selectedClasses;
      logActivity(`Updated details of Subject: ${name}`, '📚');
    }
  } else {
    // Code validation
    if (subjects.some(sub => sub.code === code)) {
      alert('Subject code already exists.');
      return;
    }
    subjects.push({ code, name, credits, classes: selectedClasses });
    logActivity(`Added new academic subject: ${name}`, '📚');
  }

  setDB('subjects', subjects);
  closeSubjectForm();
  renderSubjectTable();
}

function editSubject(code) {
  openSubjectForm('edit', code);
}

function deleteSubject(code) {
  if (!confirm('Are you sure you want to delete this subject?')) return;
  const index = subjects.findIndex((item) => item.code === code);
  if (index !== -1) {
    const name = subjects[index].name;
    subjects.splice(index, 1);
    setDB('subjects', subjects);
    logActivity(`Deleted subject: ${name}`, '🗑️');
    renderSubjectTable();
  }
}

// 8. SCORE MANAGEMENT
function initScoresPage() {
  document.getElementById('scoreSearch').addEventListener('input', renderScoreTable);
  document.getElementById('addScoreBtn').addEventListener('click', () => openScoreForm('add'));
  document.getElementById('scoreFormCancel').addEventListener('click', closeScoreForm);
  document.getElementById('scoreForm').addEventListener('submit', handleScoreFormSubmit);
  document.getElementById('midtermScore').addEventListener('input', updateProjectedGpa);
  document.getElementById('finalScore').addEventListener('input', updateProjectedGpa);
  populateScoreSelectors();
  renderScoreTable();
}

function populateScoreSelectors() {
  const studentSelect = document.getElementById('scoreStudent');
  const subjectSelect = document.getElementById('scoreSubject');
  if (!studentSelect || !subjectSelect) return;

  studentSelect.innerHTML = students.map((student) => `<option value="${student.name}">${student.name}</option>`).join('');
  subjectSelect.innerHTML = subjects.map((subject) => `<option value="${subject.name}">${subject.name}</option>`).join('');
}

function renderScoreTable() {
  const searchTerm = document.getElementById('scoreSearch').value.trim().toLowerCase();
  const tbody = document.getElementById('scoreTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  
  const filtered = scores.filter((score) => `${score.student} ${score.subject}`.toLowerCase().includes(searchTerm));
  
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No student score records found.</td></tr>';
    document.getElementById('scoreGpaValue').textContent = '0.00';
    return;
  }

  filtered.forEach((score) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${score.student}</strong></td>
      <td>${score.subject}</td>
      <td>${score.midterm}</td>
      <td>${score.final}</td>
      <td><strong style="color: var(--primary);">${score.gpa.toFixed(2)}</strong></td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-secondary" onclick="editScore('${score.id}')">Edit</button>
          <button class="btn btn-danger" onclick="deleteScore('${score.id}')">Delete</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
  
  const average = scores.length ? (scores.reduce((sum, item) => sum + item.gpa, 0) / scores.length).toFixed(2) : '0.00';
  document.getElementById('scoreGpaValue').textContent = average;
}

function openScoreForm(mode, id = null) {
  editingScoreId = null;
  const panel = document.getElementById('scoreFormPanel');
  const title = document.getElementById('scoreFormTitle');
  const form = document.getElementById('scoreForm');
  if (!panel || !form) return;

  form.reset();
  populateScoreSelectors();
  document.getElementById('scoreGpa').value = '';
  if (mode === 'edit' && id) {
    const score = scores.find((item) => item.id === id);
    if (!score) return;
    editingScoreId = id;
    title.textContent = 'Modify Student Grade Details';
    document.getElementById('scoreStudent').value = score.student;
    document.getElementById('scoreSubject').value = score.subject;
    document.getElementById('midtermScore').value = score.midterm;
    document.getElementById('finalScore').value = score.final;
    document.getElementById('scoreGpa').value = score.gpa.toFixed(2);
  } else {
    title.textContent = 'Record New Grade';
  }
  panel.classList.remove('hidden');
  panel.scrollIntoView({ behavior: 'smooth' });
}

// Update calculated student GPA
function updateProjectedGpa() {
  const midterm = Number(document.getElementById('midtermScore').value) || 0;
  const final = Number(document.getElementById('finalScore').value) || 0;
  const projected = ((midterm * 0.4 + final * 0.6) / 100) * 4;
  const gpaInput = document.getElementById('scoreGpa');
  if (gpaInput) gpaInput.value = projected ? projected.toFixed(2) : '0.00';
}

function closeScoreForm() {
  const panel = document.getElementById('scoreFormPanel');
  if (panel) panel.classList.add('hidden');
  editingScoreId = null;
}

function handleScoreFormSubmit(event) {
  event.preventDefault();
  const student = document.getElementById('scoreStudent').value;
  const subject = document.getElementById('scoreSubject').value;
  const midterm = Number(document.getElementById('midtermScore').value);
  const final = Number(document.getElementById('finalScore').value);
  const gpa = Number(document.getElementById('scoreGpa').value);

  if (editingScoreId) {
    const score = scores.find((item) => item.id === editingScoreId);
    if (score) {
      score.student = student;
      score.subject = subject;
      score.midterm = midterm;
      score.final = final;
      score.gpa = gpa;
      logActivity(`Updated ${student}'s score in ${subject}`, '📝');
    }
  } else {
    const id = `SC-${scores.length + 1}`;
    scores.push({ id, student, subject, midterm, final, gpa });
    logActivity(`Added academic score for ${student} in ${subject}`, '📝');
  }

  // Recalculate student overall GPA in base students list
  updateOverallStudentGPA(student);

  setDB('scores', scores);
  closeScoreForm();
  renderScoreTable();
}

function updateOverallStudentGPA(studentName) {
  const studentScores = scores.filter(s => s.student.toLowerCase() === studentName.toLowerCase());
  const studentObj = students.find(s => s.name.toLowerCase() === studentName.toLowerCase());
  if (studentObj) {
    const totalGpa = studentScores.reduce((sum, item) => sum + item.gpa, 0);
    studentObj.gpa = studentScores.length ? parseFloat((totalGpa / studentScores.length).toFixed(2)) : 0.00;
    setDB('students', students);
  }
}

function editScore(id) {
  openScoreForm('edit', id);
}

function deleteScore(id) {
  if (!confirm('Are you sure you want to remove this student score entry?')) return;
  const index = scores.findIndex((item) => item.id === id);
  if (index !== -1) {
    const sName = scores[index].student;
    scores.splice(index, 1);
    setDB('scores', scores);
    updateOverallStudentGPA(sName);
    logActivity(`Removed grade record for ${sName}`, '🗑️');
    renderScoreTable();
  }
}

// 9. ATTENDANCE MANAGEMENT
function initAttendancePage() {
  const search = document.getElementById('attendanceSearch');
  const classFilter = document.getElementById('attendanceClassFilter') || createAttendanceClassFilter();
  const dateInput = document.getElementById('attendanceDate') || createAttendanceDatePicker();

  if (search) search.addEventListener('input', renderAttendanceTable);
  
  if (classFilter) {
    populateClassFilter(classFilter, classes[0].name);
    classFilter.addEventListener('change', renderAttendanceTable);
  }

  if (dateInput) {
    dateInput.addEventListener('change', renderAttendanceTable);
  }

  const saveBtn = document.getElementById('saveAttendanceBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      saveCurrentAttendanceState();
      alert('Daily attendance records saved successfully in local storage.');
    });
  }

  const reportBtn = document.getElementById('attendanceReportBtn');
  if (reportBtn) {
    reportBtn.addEventListener('click', () => {
      window.location.href = 'reports.html?type=attendance';
    });
  }

  renderAttendanceTable();
}

function createAttendanceClassFilter() {
  const actions = document.querySelector('.panel-actions');
  if (!actions) return null;

  const filterGrp = document.createElement('div');
  filterGrp.className = 'filter-group';
  filterGrp.innerHTML = `
    <label for="attendanceClassFilter">Class</label>
    <select id="attendanceClassFilter"></select>
  `;
  actions.appendChild(filterGrp);
  return document.getElementById('attendanceClassFilter');
}

function createAttendanceDatePicker() {
  const actions = document.querySelector('.panel-actions');
  if (!actions) return null;

  const today = new Date().toISOString().split('T')[0];

  const dateGrp = document.createElement('div');
  dateGrp.className = 'filter-group';
  dateGrp.innerHTML = `
    <label for="attendanceDate">Date</label>
    <input type="date" id="attendanceDate" value="${today}" />
  `;
  actions.insertBefore(dateGrp, actions.firstChild);
  return document.getElementById('attendanceDate');
}

function renderAttendanceTable() {
  const search = document.getElementById('attendanceSearch');
  const searchTerm = search ? search.value.trim().toLowerCase() : '';
  const classFilter = document.getElementById('attendanceClassFilter').value;
  const dateVal = document.getElementById('attendanceDate').value;
  
  const tbody = document.getElementById('attendanceTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';

  // Get students of selected class
  const classStudents = students.filter(s => classFilter === 'all' || s.class === classFilter);

  if (classStudents.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: var(--text-muted);">No student enrolled in this class.</td></tr>';
    updateAttendanceSummary(0, 0, 0);
    return;
  }

  classStudents.forEach(student => {
    if (searchTerm && !student.name.toLowerCase().includes(searchTerm)) return;

    // Check if an attendance record exists in our DB for this date & student
    let record = attendanceRecords.find(r => r.date === dateVal && r.student.toLowerCase() === student.name.toLowerCase());
    
    // If not, default to "Present"
    if (!record) {
      record = { date: dateVal, student: student.name, class: student.class, status: 'Present' };
      // Save it memory-only for now, until user saves
    }

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${student.name}</strong></td>
      <td><span class="badge badge-primary">${student.class}</span></td>
      <td>
        <select class="attendance-select" data-student="${student.name}" onchange="updateAttendanceStatus('${student.name}', this.value)">
          <option value="Present" ${record.status === 'Present' ? 'selected' : ''}>Present</option>
          <option value="Absent" ${record.status === 'Absent' ? 'selected' : ''}>Absent</option>
          <option value="Late" ${record.status === 'Late' ? 'selected' : ''}>Late</option>
        </select>
      </td>
    `;
    tbody.appendChild(row);
  });

  calculateSummaryForSelection(classStudents, dateVal);
}

function calculateSummaryForSelection(classStudents, dateVal) {
  let present = 0;
  let absent = 0;
  let late = 0;

  classStudents.forEach(s => {
    const r = attendanceRecords.find(rec => rec.date === dateVal && rec.student.toLowerCase() === s.name.toLowerCase());
    const status = r ? r.status : 'Present';

    if (status === 'Present') present++;
    else if (status === 'Absent') absent++;
    else if (status === 'Late') late++;
  });

  updateAttendanceSummary(present, absent, late);
}

function updateAttendanceSummary(present, absent, late) {
  const pCount = document.getElementById('presentCount');
  const aCount = document.getElementById('absentCount');
  const lCount = document.getElementById('lateCount');

  if (pCount) pCount.textContent = present;
  if (aCount) aCount.textContent = absent;
  if (lCount) lCount.textContent = late;
}

function updateAttendanceStatus(studentName, newStatus) {
  const dateVal = document.getElementById('attendanceDate').value;
  const classFilter = document.getElementById('attendanceClassFilter').value;

  // Find or create record in local database array
  let record = attendanceRecords.find(r => r.date === dateVal && r.student.toLowerCase() === studentName.toLowerCase());

  if (record) {
    record.status = newStatus;
  } else {
    // Find class of student
    const student = students.find(s => s.name.toLowerCase() === studentName.toLowerCase());
    attendanceRecords.push({
      date: dateVal,
      student: studentName,
      class: student ? student.class : classFilter,
      status: newStatus
    });
  }

  // Update dynamic summaries
  const classStudents = students.filter(s => classFilter === 'all' || s.class === classFilter);
  calculateSummaryForSelection(classStudents, dateVal);
}

function saveCurrentAttendanceState() {
  const dateVal = document.getElementById('attendanceDate').value;
  const classFilter = document.getElementById('attendanceClassFilter').value;
  const selects = document.querySelectorAll('.attendance-select');

  selects.forEach(sel => {
    const sName = sel.dataset.student;
    const val = sel.value;
    
    let record = attendanceRecords.find(r => r.date === dateVal && r.student.toLowerCase() === sName.toLowerCase());
    if (record) {
      record.status = val;
    } else {
      const student = students.find(s => s.name.toLowerCase() === sName.toLowerCase());
      attendanceRecords.push({
        date: dateVal,
        student: sName,
        class: student ? student.class : classFilter,
        status: val
      });
    }
  });

  setDB('attendance', attendanceRecords);
  logActivity(`Updated attendance for class ${classFilter} on ${dateVal}`, '📅');
}

// 10. NOTIFICATION MANAGEMENT
function initNotificationsPage() {
  const form = document.getElementById('notificationForm');
  if (form) form.addEventListener('submit', handleNotificationSubmit);
  
  // Set default date picker value to today
  const dateInput = document.getElementById('notificationDate');
  if (dateInput) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  // Add Priority and Status HTML controls dynamically if not present
  setupNotificationExtraControls();
  
  // Render history list
  renderNotificationHistory();
}

function setupNotificationExtraControls() {
  const form = document.getElementById('notificationForm');
  if (!form) return;

  const grid = form.querySelector('.form-grid');
  if (!grid) return;

  // Add priority and status if not already inside the HTML template
  if (!document.getElementById('notificationPriority')) {
    const priorityLabel = document.createElement('label');
    priorityLabel.innerHTML = `
      Priority Level
      <select id="notificationPriority">
        <option value="Low">Low</option>
        <option value="Medium" selected>Medium</option>
        <option value="High">High</option>
      </select>
    `;
    grid.appendChild(priorityLabel);
  }

  if (!document.getElementById('notificationStatus')) {
    const statusLabel = document.createElement('label');
    statusLabel.innerHTML = `
      Status
      <select id="notificationStatus">
        <option value="Published">Published</option>
        <option value="Draft">Draft</option>
      </select>
    `;
    grid.appendChild(statusLabel);
  }
}

function handleNotificationSubmit(event) {
  event.preventDefault();
  const title = document.getElementById('notificationTitle').value.trim();
  const message = document.getElementById('notificationMessage').value.trim();
  const recipient = document.getElementById('notificationRecipient').value;
  const date = document.getElementById('notificationDate').value;
  
  const priority = document.getElementById('notificationPriority').value;
  const status = document.getElementById('notificationStatus').value;

  notifications.unshift({ title, message, recipient, date, priority, status });
  setDB('notifications', notifications);

  event.target.reset();
  document.getElementById('notificationDate').value = new Date().toISOString().split('T')[0];

  renderNotificationHistory();
  logActivity(`Notification broadcast: ${title} (${status})`, '🔔');
  alert(`Announcement successfully saved as ${status}.`);
}

function renderNotificationHistory() {
  const container = document.getElementById('notificationHistory');
  if (!container) return;

  const currentUser = getCurrentUser();

  // Filter based on roles:
  const filtered = notifications.filter(note => {
    if (currentUser.role === 'student') {
      return note.status === 'Published' && (note.recipient === 'All' || note.recipient === 'Students');
    }
    if (currentUser.role === 'teacher') {
      return note.recipient === 'All' || note.recipient === 'Teachers';
    }
    return true; // Admin views all
  });

  if (filtered.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 24px;">No notifications found.</p>';
    return;
  }

  container.innerHTML = filtered.map((note) => {
    const priorityBadge = note.priority === 'High' ? 'badge-danger' : note.priority === 'Medium' ? 'badge-warning' : 'badge-success';
    const statusBadge = note.status === 'Published' ? 'badge-success' : 'badge-secondary';
    
    return `
      <div class="notification-card">
        <div class="notification-header">
          <strong>${note.title}</strong>
          <div>
            <span class="badge ${priorityBadge}" style="margin-right: 6px;">${note.priority}</span>
            <span class="badge ${statusBadge}">${note.status}</span>
          </div>
        </div>
        <p>${note.message}</p>
        <div class="notification-meta">
          <span>👥 Send to: ${note.recipient}</span>
          <span>📅 Date: ${note.date}</span>
        </div>
      </div>
    `;
  }).join('');
}

// 11. REPORT MANAGEMENT
function initReportsPage() {
  // Listen for selection change
  document.querySelectorAll('input[name="reportType"]').forEach((input) => {
    input.addEventListener('change', () => renderReportPreview(input.value));
  });

  // Action click hooks
  const pdfBtn = document.getElementById('exportPdfBtn');
  const excelBtn = document.getElementById('exportExcelBtn');
  const transcriptBtn = document.getElementById('downloadTranscriptBtn');

  if (pdfBtn) pdfBtn.addEventListener('click', simulateExportPDF);
  if (excelBtn) excelBtn.addEventListener('click', simulateExportExcel);
  if (transcriptBtn) transcriptBtn.addEventListener('click', simulateDownloadTranscript);

  // If reports page was loaded with hash or query parameters (e.g. ?type=attendance)
  const urlParams = new URLSearchParams(window.location.search);
  const typeParam = urlParams.get('type') || 'academic';

  const radio = document.querySelector(`input[name="reportType"][value="${typeParam}"]`);
  if (radio) {
    radio.checked = true;
    renderReportPreview(typeParam);
  } else {
    renderReportPreview('academic');
  }
}

function renderReportPreview(type) {
  const preview = document.getElementById('reportPreview');
  if (!preview) return;

  const report = reportOptions[type];
  if (!report) return;

  // Format content output dynamically
  let dynamicHTML = `
    <div style="margin-bottom: 24px;">
      <h3 style="font-size: 1.4rem; font-weight: 700; color: var(--primary); margin-bottom: 8px;">${report.title}</h3>
      <p style="color: var(--text-muted); font-size: 0.95rem;">${report.description}</p>
    </div>
  `;

  if (type === 'academic') {
    // Render statistical summary in preview card
    const average = students.length ? (students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2) : '0.00';
    const topGpas = students.filter(s => s.gpa >= 3.8).length;

    dynamicHTML += `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 28px;">
        <div style="background: var(--surface-alt); padding: 16px; border-radius: var(--radius-md);">
          <small style="color: var(--text-muted); font-weight: 600;">Overall Average GPA</small>
          <div style="font-size: 1.8rem; font-weight: 800; color: var(--primary); margin-top: 4px;">${average}</div>
        </div>
        <div style="background: var(--surface-alt); padding: 16px; border-radius: var(--radius-md);">
          <small style="color: var(--text-muted); font-weight: 600;">Honor Roll Students (GPA >= 3.8)</small>
          <div style="font-size: 1.8rem; font-weight: 800; color: var(--success); margin-top: 4px;">${topGpas} Students</div>
        </div>
      </div>
      <div>
        <h4 style="font-weight:700; margin-bottom: 10px;">Highest Performing Classes</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
          ${classes.map(c => {
            const clsStudents = students.filter(s => s.class === c.name);
            const avg = clsStudents.length ? (clsStudents.reduce((sum, s) => sum + s.gpa, 0) / clsStudents.length).toFixed(2) : '0.00';
            return `<li style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding-bottom:6px;"><span>Class ${c.name}</span><strong>GPA ${avg}</strong></li>`;
          }).join('')}
        </ul>
      </div>
    `;
  } else if (type === 'attendance') {
    const present = attendanceRecords.filter(r => r.status === 'Present').length;
    const absent = attendanceRecords.filter(r => r.status === 'Absent').length;
    const late = attendanceRecords.filter(r => r.status === 'Late').length;
    const total = present + absent + late;
    const attendanceRate = total ? ((present + late) / total * 100).toFixed(1) : '100.0';

    dynamicHTML += `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 28px;">
        <div style="background: var(--surface-alt); padding: 16px; border-radius: var(--radius-md);">
          <small style="color: var(--text-muted); font-weight: 600;">Attendance Rate</small>
          <div style="font-size: 1.8rem; font-weight: 800; color: var(--success); margin-top: 4px;">${attendanceRate}%</div>
        </div>
        <div style="background: var(--surface-alt); padding: 16px; border-radius: var(--radius-md);">
          <small style="color: var(--text-muted); font-weight: 600;">Excused/Lates</small>
          <div style="font-size: 1.8rem; font-weight: 800; color: var(--warning); margin-top: 4px;">${late} Records</div>
        </div>
      </div>
      <div>
        <h4 style="font-weight:700; margin-bottom: 10px;">Recent Absences</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
          ${attendanceRecords.filter(r => r.status === 'Absent').slice(0, 4).map(r => `
            <li style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding-bottom:6px;">
              <span>${r.student} (${r.class})</span>
              <span class="badge badge-danger">${r.status}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  } else if (type === 'transcript') {
    // Student dropdown selector for transcript layout view
    dynamicHTML += `
      <div style="margin-bottom: 20px;" class="no-print">
        <label style="font-weight: 600; color: var(--text-muted);">Select Student
          <select id="transcriptStudentSelector" style="width: 100%; max-width: 320px; margin-top: 6px; padding: 10px; border-radius: var(--radius-sm); border:1px solid var(--border);">
            ${students.map(s => `<option value="${s.id}">${s.name} (${s.id})</option>`).join('')}
          </select>
        </label>
      </div>
      <div id="transcriptTargetArea" style="border: 1px dashed var(--border); padding: 24px; border-radius: var(--radius-md);">
        <!-- transcript loaded here -->
      </div>
    `;
  }

  preview.innerHTML = dynamicHTML;

  // If transcript tab is active, bind events
  if (type === 'transcript') {
    const selector = document.getElementById('transcriptStudentSelector');
    if (selector) {
      selector.addEventListener('change', () => loadStudentTranscript(selector.value));
      loadStudentTranscript(selector.value);
    }
  }
}

function loadStudentTranscript(studentId) {
  const target = document.getElementById('transcriptTargetArea');
  if (!target) return;

  const s = students.find(item => item.id === studentId);
  if (!s) {
    target.innerHTML = '<p>No student records selected.</p>';
    return;
  }

  // Get student grades
  const studentScores = scores.filter(sc => sc.student.toLowerCase() === s.name.toLowerCase());

  let tableRows = '';
  let creditTotal = 0;
  if (studentScores.length > 0) {
    studentScores.forEach(sc => {
      // Lookup credit in subject DB
      const sub = subjects.find(sub => sub.name.toLowerCase() === sc.subject.toLowerCase());
      const credits = sub ? sub.credits : 3;
      creditTotal += credits;

      // Grade text
      const letterGrade = sc.gpa >= 3.6 ? 'A' : sc.gpa >= 3.0 ? 'B' : sc.gpa >= 2.0 ? 'C' : 'D';

      tableRows += `
        <tr>
          <td>${sub ? sub.code : 'SUB-01'}</td>
          <td>${sc.subject}</td>
          <td>${credits}</td>
          <td>${sc.midterm}</td>
          <td>${sc.final}</td>
          <td><strong>${letterGrade}</strong> (GPA ${sc.gpa.toFixed(2)})</td>
        </tr>
      `;
    });
  } else {
    tableRows = '<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No academic records logged for this student.</td></tr>';
  }

  target.innerHTML = `
    <div class="transcript-card">
      <div class="transcript-header">
        <div class="university-info">
          <h1>ACADEX UNIVERSITY</h1>
          <p>Office of Academic Records • Registrar Department</p>
          <p>100 University Ave, Education Center</p>
        </div>
        <div class="stamp">ACADEMIC OFFICIAL</div>
      </div>
      <div class="transcript-student-details">
        <div>
          <p><strong>Student Name:</strong> ${s.name}</p>
          <p><strong>Student ID:</strong> ${s.id}</p>
          <p><strong>Gender:</strong> ${s.gender}</p>
        </div>
        <div>
          <p><strong>Enrollment Class:</strong> ${s.class}</p>
          <p><strong>Date of Birth:</strong> ${s.dob}</p>
          <p><strong>Report Date:</strong> ${new Date().toISOString().split('T')[0]}</p>
        </div>
      </div>
      <table class="transcript-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Course Name</th>
            <th>Credits</th>
            <th>Midterm</th>
            <th>Final</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
      <div class="transcript-footer">
        <div class="transcript-summary">
          <p><strong>Cumulative GPA:</strong> ${s.gpa.toFixed(2)}</p>
          <p><strong>Total Credits Completed:</strong> ${creditTotal} Credits</p>
          <p><strong>Academic Standing:</strong> ${s.gpa >= 3.0 ? 'Good Standing' : 'Academic Probation'}</p>
        </div>
        <div class="transcript-signature">
          <p>Official Registrar</p>
          <div class="transcript-signature-line">Mr. Robert Vance</div>
        </div>
      </div>
    </div>
  `;
}

function simulateExportPDF() {
  const activeReportRadio = document.querySelector('input[name="reportType"]:checked');
  const type = activeReportRadio ? activeReportRadio.value : 'academic';
  
  if (type === 'transcript') {
    // Best way to export transcript to PDF is triggering the browser's print utility
    // We already styled the print stylesheet in CSS to strip out sidebar and buttons!
    window.print();
  } else {
    // Show spinner modal/loading simulator
    const btn = document.getElementById('exportPdfBtn');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '⏳ Generating PDF...';
    
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
      alert('Academic PDF Report has been downloaded to your downloads folder.');
    }, 1500);
  }
}

function simulateExportExcel() {
  const btn = document.getElementById('exportExcelBtn');
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '⏳ Exporting Sheet...';

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = originalText;
    
    // Simulate downloading Excel spreadsheet by triggering a CSV of the data
    const activeRadio = document.querySelector('input[name="reportType"]:checked').value;
    let csvContent = 'data:text/csv;charset=utf-8,';
    
    if (activeRadio === 'attendance') {
      csvContent += 'Date,Student Name,Class,Status\r\n';
      attendanceRecords.forEach(r => {
        csvContent += `"${r.date}","${r.student}","${r.class}","${r.status}"\r\n`;
      });
    } else {
      csvContent += 'ID,Student Name,Class,Overall GPA\r\n';
      students.forEach(s => {
        csvContent += `"${s.id}","${s.name}","${s.class}",${s.gpa.toFixed(2)}\r\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ACADEX_Report_${activeRadio}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Excel Report exported successfully.');
  }, 1200);
}

function simulateDownloadTranscript() {
  const radio = document.querySelector('input[name="reportType"]:checked');
  if (!radio || radio.value !== 'transcript') {
    alert('Please switch to the "Student Transcript" option to export transcripts.');
    return;
  }

  const selector = document.getElementById('transcriptStudentSelector');
  const studentName = selector ? selector.options[selector.selectedIndex].text : 'Student';
  
  const btn = document.getElementById('downloadTranscriptBtn');
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '⏳ Downloading Transcript...';

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = originalText;
    alert(`Transcript file for ${studentName} generated. Download starting.`);
    window.print();
  }, 1000);
}

// 12. USER MANAGEMENT (ADMIN ONLY)
function initUsersPage() {
  const searchInput = document.getElementById('userSearch');
  if (searchInput) {
    searchInput.addEventListener('input', renderUserTable);
  }

  const cancelBtn = document.getElementById('userFormCancel');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeUserForm);
  }

  const form = document.getElementById('userForm');
  if (form) {
    form.addEventListener('submit', handleUserFormSubmit);
  }

  renderUserTable();
}

function renderUserTable() {
  const searchInput = document.getElementById('userSearch');
  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const tbody = document.getElementById('userTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  
  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm) || 
    u.email.toLowerCase().includes(searchTerm) ||
    u.username.toLowerCase().includes(searchTerm) ||
    u.role.toLowerCase().includes(searchTerm)
  );

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No users found.</td></tr>';
    return;
  }

  filtered.forEach(u => {
    const isChecked = u.status === 'Active' ? 'checked' : '';
    const roleColor = u.role === 'admin' ? 'badge-danger' : u.role === 'teacher' ? 'badge-primary' : 'badge-success';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div style="font-weight: 700;">${u.name || u.username}</div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">@${u.username}</div>
      </td>
      <td>${u.email}</td>
      <td><span class="badge ${roleColor}">${u.role}</span></td>
      <td>
        <label class="switch">
          <input type="checkbox" ${isChecked} onchange="toggleUserStatus('${u.username}', this.checked)">
          <span class="slider"></span>
        </label>
      </td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-secondary" onclick="editUser('${u.username}')">Edit</button>
          <button class="btn btn-danger" onclick="deleteUser('${u.username}')" ${u.username === 'admin' ? 'disabled' : ''}>Delete</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function toggleUserStatus(username, isActive) {
  const user = users.find(u => u.username === username);
  if (user) {
    const newStatus = isActive ? 'Active' : 'Inactive';
    
    // Prevent self-deactivation
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.username === username && newStatus === 'Inactive') {
      alert('You cannot deactivate your own administrative account.');
      renderUserTable();
      return;
    }

    user.status = newStatus;
    setDB('users', users);
    logActivity(`Status of user @${username} changed to ${newStatus}`, '👤');
  }
}

function openUserForm(username) {
  editingUserId = null;
  const panel = document.getElementById('userFormPanel');
  const title = document.getElementById('userFormTitle');
  const form = document.getElementById('userForm');
  if (!panel || !form) return;

  form.reset();
  const user = users.find(u => u.username === username);
  if (user) {
    editingUserId = username;
    title.textContent = `Edit Details of @${username}`;
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userRole').value = user.role;
    
    panel.classList.remove('hidden');
    panel.scrollIntoView({ behavior: 'smooth' });
  }
}

function closeUserForm() {
  const panel = document.getElementById('userFormPanel');
  if (panel) panel.classList.add('hidden');
  editingUserId = null;
}

function handleUserFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim();
  const role = document.getElementById('userRole').value;

  if (editingUserId) {
    const user = users.find(u => u.username === editingUserId);
    if (user) {
      user.name = name;
      user.email = email;
      user.role = role;
      
      // Update session if editing self
      const currentUser = getCurrentUser();
      if (currentUser && currentUser.username === editingUserId) {
        currentUser.name = name;
        currentUser.email = email;
        currentUser.role = role;
        sessionStorage.setItem('acadex_currentUser', JSON.stringify(currentUser));
        localStorage.setItem('acadex_currentUser', JSON.stringify(currentUser));
        setupProfileChip(currentUser);
      }

      setDB('users', users);
      logActivity(`Admin updated details for user @${editingUserId}`, '👤');
      closeUserForm();
      renderUserTable();
    }
  }
}

function editUser(username) {
  openUserForm(username);
}

function deleteUser(username) {
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.username === username) {
    alert('You cannot delete your own logged-in account.');
    return;
  }

  if (!confirm(`Are you sure you want to permanently delete user @${username}?`)) return;
  
  const index = users.findIndex(u => u.username === username);
  if (index !== -1) {
    users.splice(index, 1);
    setDB('users', users);
    
    // Also delete from student database if they were a student
    const studentIndex = students.findIndex(s => s.email.toLowerCase() === username.toLowerCase() + '@acadex.edu' || s.email.toLowerCase().split('@')[0] === username);
    if (studentIndex !== -1) {
      students.splice(studentIndex, 1);
      setDB('students', students);
    }

    logActivity(`Admin deleted account: @${username}`, '🗑️');
    renderUserTable();
  }
}

// 13. USER PROFILE MANAGEMENT
function initProfilePage() {
  const user = getCurrentUser();
  if (!user) return;

  // Render static role info
  const roleVal = document.getElementById('profileDisplayRole');
  if (roleVal) {
    roleVal.textContent = user.role.toUpperCase();
    const roleColor = user.role === 'admin' ? 'badge-danger' : user.role === 'teacher' ? 'badge-primary' : 'badge-success';
    roleVal.className = `badge ${roleColor}`;
  }

  // Pre-fill forms
  const nameInput = document.getElementById('profileName');
  const emailInput = document.getElementById('profileEmail');

  if (nameInput) nameInput.value = user.name || '';
  if (emailInput) emailInput.value = user.email || '';

  // Left card info display
  const avatarCard = document.querySelector('.profile-large-avatar');
  if (avatarCard) {
    avatarCard.textContent = user.name ? user.name.charAt(0).toUpperCase() : user.role.charAt(0).toUpperCase();
  }

  const nameTitle = document.querySelector('.profile-card h3');
  if (nameTitle) nameTitle.textContent = user.name || user.username;

  // Register submit events
  const profileForm = document.getElementById('profileDetailsForm');
  if (profileForm) {
    profileForm.addEventListener('submit', handleProfileUpdate);
  }

  const passwordForm = document.getElementById('profilePasswordForm');
  if (passwordForm) {
    passwordForm.addEventListener('submit', handlePasswordUpdate);
  }
}

function handleProfileUpdate(event) {
  event.preventDefault();
  const name = document.getElementById('profileName').value.trim();
  const email = document.getElementById('profileEmail').value.trim();

  const user = getCurrentUser();
  if (!user) return;

  // Update in users array
  const dbUser = users.find(u => u.username === user.username);
  if (dbUser) {
    dbUser.name = name;
    dbUser.email = email;
    setDB('users', users);

    // If role is student, sync name in students list
    if (user.role === 'student') {
      const studentObj = students.find(s => s.email.toLowerCase() === user.email.toLowerCase());
      if (studentObj) {
        studentObj.name = name;
        studentObj.email = email;
        setDB('students', students);
      }
    }

    // Update current session
    user.name = name;
    user.email = email;
    
    if (sessionStorage.getItem('acadex_currentUser')) {
      sessionStorage.setItem('acadex_currentUser', JSON.stringify(user));
    } else {
      localStorage.setItem('acadex_currentUser', JSON.stringify(user));
    }

    // Refresh UI headers
    setupProfileChip(user);
    const avatarCard = document.querySelector('.profile-large-avatar');
    if (avatarCard) avatarCard.textContent = name.charAt(0).toUpperCase();
    const nameTitle = document.querySelector('.profile-card h3');
    if (nameTitle) nameTitle.textContent = name;

    logActivity(`${user.username} updated profile information`, '⚙️');
    alert('Profile settings successfully updated.');
  }
}

function handlePasswordUpdate(event) {
  event.preventDefault();
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmNewPassword = document.getElementById('confirmNewPassword').value;
  
  const user = getCurrentUser();
  if (!user) return;

  // Verify current password matches DB
  const dbUser = users.find(u => u.username === user.username);
  if (!dbUser || dbUser.password !== currentPassword) {
    alert('Incorrect current password.');
    return;
  }

  if (newPassword !== confirmNewPassword) {
    alert('Passwords do not match.');
    return;
  }

  dbUser.password = newPassword;
  setDB('users', users);

  logActivity(`${user.username} changed security password`, '🔑');
  event.target.reset();
  alert('Security password has been updated.');
}

// Bind to window for global inline clicks
window.editStudent = editStudent;
window.deleteStudent = deleteStudent;
window.editClass = editClass;
window.deleteClass = deleteClass;
window.editSubject = editSubject;
window.deleteSubject = deleteSubject;
window.editScore = editScore;
window.deleteScore = deleteScore;
window.updateAttendanceStatus = updateAttendanceStatus;
window.toggleUserStatus = toggleUserStatus;
window.editUser = editUser;
window.deleteUser = deleteUser;

document.addEventListener('DOMContentLoaded', initPage);
