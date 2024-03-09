import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/service/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  registerForm = this.builder.group({
    id: this.builder.control('', Validators.required),
    adminname: this.builder.control('', Validators.required),
    adminpassword: this.builder.control('', Validators.required),
    // password: this.builder.control('',
    //   Validators.compose([Validators.required, Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    // isActive: this.builder.control(false),
  });

  registration() {
    // if (this.registerForm.valid) {
    //     this.service.registerData(this.registerForm.value).subscribe(((res: any) => {
    //       this.toastr.success('Please contact to admin','Registraton Successfull');
    //       this.router.navigate(['login'])
    //     }))

    //   } else {
    //     this.toastr.warning('Please Enter Valid Data');
    //   }
  }

}
