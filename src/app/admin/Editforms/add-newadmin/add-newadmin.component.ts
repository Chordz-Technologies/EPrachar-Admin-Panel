import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectionAdmin_model } from 'src/app/models';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-add-newadmin',
  templateUrl: './add-newadmin.component.html',
  styleUrls: ['./add-newadmin.component.scss']
})
export class AddNewadminComponent implements OnInit {
  addAdminForm!: FormGroup;
  ElectionAdmin_model: ElectionAdmin_model = new ElectionAdmin_model();
  AdminId!: number; // Variable to store the ID of the product to be edited

  showsubmit!: boolean;
  showupdate!: boolean;
  showdelete!: boolean;
  superAdminimageData: File | null | undefined;


  constructor(private service: ServiceService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.addAdminForm = this.fb.group({
      id: [''],
      adminUsername: [''],
      adminname: [''],
      contactno: [''],
      passWord: [''],
      conPassword: [''],
      smessage: this.fb.control('', [
        Validators.required,
        Validators.maxLength(150),
      ]),
      options: this.fb.control('', [Validators.required]),
      // superAdminImage: ['']
    })
    // Get the ID of the product from the route parameters
    this.route.params.subscribe(val => {
      this.AdminId = val['id']; // Assuming the parameter name is 'id'
      // Fetch the product details using the ID and populate the form
      this.service.getSuperAdminDetailsById(this.AdminId).subscribe({
        next: (res) => {
          this.onedit(res.admin_details);
          console.log('Super Admin Details:', res.admin_details);
        }, error: (err) => {
          console.log(err)
        }
      });
      // return this.AdminId;
    });

    this.addAdminForm.reset()
    this.showsubmit = true;
    this.showupdate = false;
    this.showdelete = false;
  }

  onedit(superAdmin: ElectionAdmin_model) {
    this.showsubmit = false;
    this.showupdate = true;
    this.showdelete = true;
    this.addAdminForm.setValue({
      // id: superAdmin.a_id,
      adminUsername: superAdmin.a_username,
      adminname: superAdmin.a_name,
      contactno: superAdmin.a_contactno,
      // passWord: superAdmin.a_name,
      // conPassword: superAdmin.a_name,
      smessage: superAdmin.a_message,
      // superAdminImage: superAdmin.saimage
    })


  }

  postSuperAdminDetails() {
    const adminData = {
      a_username: this.addAdminForm.value.adminUsername,
      a_name: this.addAdminForm.value.adminname,
      a_contactno: this.addAdminForm.value.contactno,
      a_password: this.addAdminForm.value.passWord,
      a_confirmpassword: this.addAdminForm.value.conPassword,
      a_message: this.addAdminForm.value.smessage,
      a_typesuperadmin: 0,
      a_typeadmin: this.addAdminForm.value.options === '1' ? 1 : 0,
      // saimage: this.superAdminimageData,
    };

    const { a_username, a_name, a_contactno, a_password, a_confirmpassword, a_message } = adminData;

    if (!a_username || !a_name || !a_contactno || !a_password || !a_confirmpassword) {
      alert('Please fill all the fields.');
      return;
    }

    if (a_password !== a_confirmpassword) {
      alert('Password and Confirm Password do not match.');
      return;
    }

    if (a_message.length > 150) {
      alert('Message cannot be more than 150 characters.');
      return;
    }

    const postData = { ...adminData };

    this.service.SuperAdminPost(postData).subscribe((res) => {
      console.log(res)
      if (res === 'success') {
        alert('Successfully added');
      } else {
        alert('Successfully added');
      }
    });

    // Reset the form after submitting
    this.addAdminForm.reset();
  }



  deleteProduct(): void {
    this.service.deleteSuperAdminById(this.AdminId).subscribe(
      () => {
        // console.log('Product deleted successfully');
        alert('Product deleted successfully!');
        // Redirect the user to a different page after successful deletion
        this.router.navigate(['/user']);
      },
      error => {
        console.error('Error deleting product:', error);
      }
    );
  }

  updateproduct() {
    this.ElectionAdmin_model.a_name = this.addAdminForm.value.adminUsername;
    this.ElectionAdmin_model.a_message = this.addAdminForm.value.smessage;
    // this.ElectionAdmin_model.saimage = this.addAdminForm.value.superAdminImage;


    this.service.updateAdmminById(this.AdminId, this.ElectionAdmin_model).subscribe(res => {
      console.log(res)
      alert('Product Updated successfully!');
      // alert('updated')
      this.addAdminForm.reset();
      this.router.navigate(['/user'])
    })

  }

  get Adminmessage(): FormControl {
    return this.addAdminForm.get('smessage') as FormControl;
  }

}
