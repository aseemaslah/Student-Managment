import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/teacher';

  getLeaveRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/leave-requests`);
  }

  updateLeaveStatus(leaveId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/leave-requests/${leaveId}/status`, { status });
  }
}