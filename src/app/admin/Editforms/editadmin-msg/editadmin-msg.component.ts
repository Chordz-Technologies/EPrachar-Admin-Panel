import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectionAdmin_model } from 'src/app/models';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-editadmin-msg',
  templateUrl: './editadmin-msg.component.html',
  styleUrls: ['./editadmin-msg.component.scss']
})
export class EditadminMsgComponent {
  AdminForm!: FormGroup;
  ElectionAdmin_model: ElectionAdmin_model = new ElectionAdmin_model();
  superAdminId!: number; // Variable to store the ID of the product to be edited

  showsubmit!: boolean;
  showupdate!: boolean;
  showdelete!: boolean;
  superAdminimageData: File | null | undefined;


  constructor(private service: ServiceService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.AdminForm = this.fb.group({
      id: [''],
      // supername: [''],
      smessage: this.fb.control('', [
        Validators.required,
        Validators.maxLength(150),
        Validators.pattern('[0-9]*'),
      ]),
      // superAdminImage: ['']
    })
    // Get the ID of the product from the route parameters
    this.route.params.subscribe(val => {
      this.superAdminId = val['id']; // Assuming the parameter name is 'id'
      // Fetch the product details using the ID and populate the form
      this.service.getSuperAdminDetailsById(this.superAdminId).subscribe({
        next: (res) => {
          this.onedit(res.admin_details);
          console.log('Super Admin Details:', res.admin_details);
        }, error: (err) => {
          console.log(err)
        }
      });
      // return this.superAdminId;
    });

    this.AdminForm.reset()
    this.showsubmit = true;
    this.showupdate = false;
    this.showdelete = false;
  }

  onedit(superAdmin: ElectionAdmin_model) {
    this.showsubmit = false;
    this.showupdate = true;
    this.showdelete = true;
    this.AdminForm.setValue({
      id: superAdmin.a_id,
      // supername: superAdmin.a_name,
      smessage: superAdmin.a_message,
      // superAdminImage: superAdmin.saimage
    })


  }

  postSuperAdminDetails() {

    const adminData = {
      // a_name: this.AdminForm.value.supername,
      a_id: this.AdminForm.value.id,
      a_message: this.AdminForm.value.smessage,
      // saimage: this.superAdminimageData,
    }

    let postData = { ...adminData };

    if (!postData.a_id || !postData.a_message) {
      alert('Please fill all the fields.');
      return;
    }

    console.log("Before submitting the data is", postData);
    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(postData)) {
      formData.append(key, value);
    }
    console.log("the data is", formData);
    this.service.SuperAdminPost(formData).subscribe((res) => {
      console.log(res)
      if (res === 'success') {
        alert('Successfully added');
      } else {
        alert('Something went wrong.');
      }
    });

    // Reset the form after submitting
    this.AdminForm.reset();




  }

  // deleteAdmin(): void {
  //   this.service.deleteSuperAdminById(this.superAdminId).subscribe(
  //     () => {
  //       // console.log('Admin deleted successfully');
  //       alert('Admin deleted successfully!');
  //       // Redirect the user to a different page after successful deletion
  //       this.router.navigate(['/dashboard']);
  //     },
  //     error => {
  //       console.error('Error deleting Admin:', error);
  //     }
  //   );
  // }

  updateAdmin() {
    this.ElectionAdmin_model.a_name = this.AdminForm.value.supername;
    this.ElectionAdmin_model.a_message = this.AdminForm.value.smessage;
    // this.ElectionAdmin_model.saimage = this.AdminForm.value.superAdminImage;


    this.service.updateAdmminById(this.superAdminId, this.ElectionAdmin_model).subscribe(res => {
      console.log(res)
      alert(' Updated successfully!');
      // alert('updated')
      this.AdminForm.reset();
      this.router.navigate(['/dashboard'])
    })

  }


  get Adminmessage(): FormControl {
    return this.AdminForm.get('smessage') as FormControl;
  }

}
