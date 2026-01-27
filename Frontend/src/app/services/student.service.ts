import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private http = inject(HttpClient);

  submitLeave(leaveData: any) {
    return this.http.post<any>('http://localhost:3000/student/submit-leave', leaveData);
  }

  getMyAttendance() {
    return this.http.get<any>('http://localhost:3000/student/attendance');
  }

  getMyMarks() {
    return this.http.get<any>('http://localhost:3000/student/marks');
  }

  getMyLeaves() {
    return this.http.get<any>('http://localhost:3000/student/leaves');
  }

  getDashboardStats() {
    return this.http.get<any>('http://localhost:3000/student/dashboard-stats');
  }
}