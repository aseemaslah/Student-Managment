import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {


private http = inject(HttpClient);

  login(username: string, password: string) {
    return this.http.post<any>(`http://localhost:3000/auth/login`, {
      username,
      password
    });
  }

}
