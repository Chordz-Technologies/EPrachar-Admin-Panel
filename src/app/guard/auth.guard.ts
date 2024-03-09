import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../shared/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private service: AuthService,
    private router: Router
  ) { }

  canActivate() {
    if (this.service.isLoggedIn2()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
