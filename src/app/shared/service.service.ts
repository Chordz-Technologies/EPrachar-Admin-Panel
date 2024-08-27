import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { appConfig, ElectionAdmin_model } from '../models';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Login API
  loginpost(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/adminLogin/`, data);
  }

  //UserDetails API
  getAllSuperAdminDetails(): Observable<any> {
    return this.http.get<any>(`${this.url}/allAdmins/`);
    // return this.http.get<any>("/api/UserDetails/");
  }

  getSuperAdminDetailsById(a_id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/adminDetails/${a_id}/`);
  }

  SuperAdminPost(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/createAdmin/`, data);
  }

  deleteSuperAdminById(a_id: number): Observable<any> {
    return this.http.delete(`${this.url}/deleteAdmin/${a_id}/`);
  }

  updateAdmminById(a_id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/updateAdmin/${a_id}/`, data);
  }

  getUserDetailsByContact(contactno: string): Observable<any> {
    return this.http.get<any>(`${this.url}/getMessagebyCode/${contactno}/`);
  }
}
