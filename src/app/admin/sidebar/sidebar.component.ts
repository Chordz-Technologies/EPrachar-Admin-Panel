import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;


  constructor(
    private router: Router
  ) {
    // this.router.navigateByUrl('/user')
  }


  // Assume you have a method to handle login result
  handleLoginResult(result: any) {
    if (result.message === 'Valid User' && result.admin_type === 'Admin') {
      this.isLoggedIn = true;
      this.isAdmin = true;
    } else {
      this.isLoggedIn = false;
      this.isAdmin = false;
    }
  }

  logout() {
    localStorage.removeItem('adminType');
    this.router.navigate(['login']);
  }
}
