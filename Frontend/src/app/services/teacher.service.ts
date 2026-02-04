import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private API = 'http://localhost:3000/api/teachers';

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }

  updateTeacher(id: string, data: any): Observable<any> {
    return this.http.put(`${this.API}/${id}`, data);
  }

  deleteTeacher(id: string): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }






}
