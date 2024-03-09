import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { appConfig, ElectionAdmin_model } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = ' http://localhost:3000/configData';

  constructor(private http: HttpClient) { }

  adminLogin(): Observable<any> {
    // Make a POST request to your admin login API endpoint
    // Adjust the URL and request body as per your API requirements
    return this.http.post<any>('https://electionapi.beatsacademy.in/adminLogin/', { /* Add any request body if required */ });
  }


  // Login API
  loginpost(data: any): Observable<any> {
    return this.http.post<any>(`https://electionapi.beatsacademy.in/adminLogin/`, data);
  }

  //UserDetails API
  getAllSuperAdminDetails(): Observable<any> {
    return this.http.get<any>("https://electionapi.beatsacademy.in/allAdmins/");
    // return this.http.get<any>("/api/UserDetails/");
  }

  getSuperAdminDetailsById(a_id: number): Observable<any> {
    return this.http.get<any>(`https://electionapi.beatsacademy.in/adminDetails/${a_id}/`);
  }

  SuperAdminPost(data: any): Observable<Object> {
    return this.http.post<any>(`https://electionapi.beatsacademy.in/createAdmin/`, data);
  }

  deleteSuperAdminById(a_id: number): Observable<any> {
    return this.http.delete(`https://electionapi.beatsacademy.in/deleteAdmin/${a_id}/`);
  }

  updateAdmminById(a_id: number, data: ElectionAdmin_model): Observable<any> {
    return this.http.put<ElectionAdmin_model>(`https://electionapi.beatsacademy.in/updateAdmin/${a_id}`, data);
  }

}
