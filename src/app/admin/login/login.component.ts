import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ElectionAdmin_model } from 'src/app/models';
import { ServiceService } from 'src/app/shared/service.service';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  ElectionAdmin_model: ElectionAdmin_model = new ElectionAdmin_model()
  loginform!: FormGroup;

  isUserLoggedIn!: boolean;

  ngOnInit(): void {
    history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', () => {
      history.pushState(null, document.title, window.location.href);
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const isLoginPage = event.url === '/login'; // Adjust the URL for your login page
        if (isLoginPage) {
          // Disable browser forward option
          history.pushState({}, '', location.href);
        }
      }
    });

    this.loginform = this.fb.group({
      adminname: [''],
      adminpassword: [''],
      options: ['']
    })
  }

  constructor(private logindata: ServiceService, private fb: FormBuilder, private toastr: ToastrService, private router: Router, private authService: AuthService) {
    // this.authService.isLoggedIn.subscribe((loggedIn) => {
    //   this.isUserLoggedIn = loggedIn;
    // });
  }

  loginpost_data() {
    this.ElectionAdmin_model.a_username = this.loginform.value.adminname,
      this.ElectionAdmin_model.a_password = this.loginform.value.adminpassword;
    const selectedOption = this.loginform.value.options;
    this.ElectionAdmin_model.a_typesuperadmin = selectedOption === '2' ? 1 : 0;
    this.ElectionAdmin_model.a_typeadmin = selectedOption === '1' ? 1 : 0;
    // this.ElectionAdmin_model.utypeuser = selectedOption === '3' ? 1 : 0;

    this.logindata.loginpost(this.ElectionAdmin_model).subscribe({
      next: (result: any) => {
        if (result.message === 'Valid User' && result.admin_type === 'Superadmin') {
          const adminId = result.admin_ID;
          // const status = result.status;
          this.router.navigate(['/admin']);
          this.toastr.success('Login successful as a Superadmin!', 'Success');
          const admin_type: string = 'Superadmin';
          this.authService.login(admin_type, adminId);

        } else if (result.message === 'Valid User' && result.admin_type === 'Admin') {
          const adminId = result.admin_ID;
          // const status = result.status;
          this.router.navigate(['/dashboard']);
          this.toastr.success('Login successful as an Admin!', 'Success');
          const admin_type: string = 'Admin';
          this.authService.login(admin_type, adminId);

        } else {
          this.toastr.error('Login failed. Please check your credentials.', 'Error');
        }

      },
      error: (err: any) => {
        console.error('Error:', err);
        this.toastr.error('Invalid credentials. Please check your credentials.', 'Error');
      }
    });
  }


}
