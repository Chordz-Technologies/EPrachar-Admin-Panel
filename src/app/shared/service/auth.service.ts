import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: BehaviorSubject<boolean>;

  constructor() {
    // Initialize isLoggedIn BehaviorSubject based on the value stored in localStorage
    const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
    const initialLoggedInStatus = storedLoggedInStatus
      ? JSON.parse(storedLoggedInStatus)
      : false;
    this.isLoggedIn = new BehaviorSubject<boolean>(initialLoggedInStatus);
  }

  getAdminType(): string {
    return localStorage.getItem('adminType') || ''; // Retrieving admin type from localStorage
  }

  login(adminType: string, adminId: string) {
    // Your login logic here
    // Set admin type in localStorage, or wherever you store admin information
    localStorage.setItem('adminType', adminType); // Setting admin type in localStorage
    localStorage.setItem('adminId', adminId);
    // localStorage.setItem('status', status);
    // localStorage.setItem('isLoggedIn', 'true'); // Update isLoggedIn status in localStorage
    this.isLoggedIn.next(true);
  }

  isLoggedIn2() {
    return !!localStorage.getItem('adminType');
  }

  logout() {
    // Your logout logic here
    // Clear admin type and isLoggedIn status from localStorage
    localStorage.removeItem('adminType');
    localStorage.removeItem('adminId');
    // localStorage.removeItem('status');
    // localStorage.removeItem('isLoggedIn');
    this.isLoggedIn.next(false);
    // history.pushState(null, '', '/');
  }
}
