import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  

  private http=inject(HttpClient);

  createTeacher(teacherData: any) {
    return this.http.post<any>('http://localhost:3000/admin/create-teacher', teacherData);
  }

  createClass(classData: any) {
    return this.http.post<any>('http://localhost:3000/admin/create-class', classData);
  }

  createAdmin(adminData: any) {
    return this.http.post<any>('http://localhost:3000/admin/create-admin', adminData);
  }

  assignTeacher(assignmentData: any) {
    return this.http.post<any>('http://localhost:3000/admin/assign-teacher', assignmentData);
  }

  getTeachers() {
    return this.http.get<any>('http://localhost:3000/admin/teachers');
  }

  getClasses() {
    return this.http.get<any>('http://localhost:3000/admin/classes');
  }

  getStudents() {
    return this.http.get<any>('http://localhost:3000/admin/students');
  }

  createStudent(studentData: any) {
    return this.http.post<any>('http://localhost:3000/admin/create-student', studentData);
  }

  addExamMarks(marksData: any) {
    return this.http.post<any>('http://localhost:3000/teacher/marks', marksData);
  }

  getTeacherAttendanceReport(filters?: any) {
    const params = new URLSearchParams();
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    
    const queryString = params.toString();
    const url = queryString ? `http://localhost:3000/admin/teacher-attendance-report?${queryString}` : 'http://localhost:3000/admin/teacher-attendance-report';
    return this.http.get<any>(url);
  }

  getTeacherClassSummary() {
    return this.http.get<any>('http://localhost:3000/admin/teacher-class-summary');
  }

  getStudentAttendanceSummary(studentId: string) {
    return this.http.get<any>(`http://localhost:3000/admin/student-attendance/${studentId}`);
  }

  getClassAttendanceSummary(classId: string) {
    return this.http.get<any>(`http://localhost:3000/admin/class-attendance/${classId}`);
  }

  getExamReport() {
    return this.http.get<any>('http://localhost:3000/admin/exam-report');
  }

  getTeacherClasses() {
    return this.http.get<any>('http://localhost:3000/admin/teacher-classes');
  }

  getDashboardStats() {
    return this.http.get<any>('http://localhost:3000/admin/dashboard-stats');
  }

  getTeacherDashboardStats() {
    return this.http.get<any>('http://localhost:3000/admin/teacher-dashboard-stats');
  }

  getStudentDashboardStats() {
    return this.http.get<any>('http://localhost:3000/admin/student-dashboard-stats');
  }

  getTeacherStudents() {
    return this.http.get<any>('http://localhost:3000/teacher/students');
  }

  markAttendance(attendanceData: any) {
    return this.http.post<any>('http://localhost:3000/teacher/attendance', attendanceData);
  }

  viewAttendance() {
    return this.http.get<any>('http://localhost:3000/teacher/attendance');
  }

  getStudentAttendance() {
    return this.http.get<any>('http://localhost:3000/student/attendance');
  }
}
