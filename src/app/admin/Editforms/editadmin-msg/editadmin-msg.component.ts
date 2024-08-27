import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ElectionAdmin_model } from 'src/app/models';
import { ServiceService } from 'src/app/shared/service.service';
import { ImageCompressionService } from 'src/app/shared/service/image-compression.service';

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
  adminImageData: File | null | undefined;




  constructor(private service: ServiceService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private imageCompressionService: ImageCompressionService) { }

  ngOnInit(): void {

    this.AdminForm = this.fb.group({
      id: [''],
      // supername: [''],
      smessage: this.fb.control('', [
        Validators.required,
        Validators.maxLength(150),
      ]),
      pracharImage: ['']
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
    this.AdminForm.patchValue({
      id: superAdmin.a_id,
      // supername: superAdmin.a_name,
      smessage: superAdmin.a_message,
      // pracharImage: superAdmin.a_image
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
      this.toastr.error('Please fill all the fields.', 'Error');
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
        this.toastr.success('Successfully added', 'Success');
      } else {
        this.toastr.error('Something went wrong.', 'Error');
      }
    });

    // Reset the form after submitting
    this.AdminForm.reset();




  }

  deleteAdmin(): void {
    this.service.deleteSuperAdminById(this.superAdminId).subscribe(
      () => {
        // console.log('Admin deleted successfully');
        alert('Admin deleted successfully!');
        // Redirect the user to a different page after successful deletion
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Error deleting Admin:', error);
      }
    );
  }

  updateAdmin() {
    const adminToUpdate = {
      a_id: this.AdminForm.value.id,
      a_message: this.AdminForm.value.smessage,
      ...(this.adminImageData ? { a_image: this.adminImageData } : {})
    };

    const { a_id, a_message } = adminToUpdate;

    if (!a_id || !a_message) {
      this.toastr.error('Please fill all the fields.', 'Error');
      return;
    }

    if (a_message.length > 150) {
      this.toastr.error('Message cannot be more than 150 characters.', 'Error');
      return;
    }

    // Dynamic URL to append
    const dynamicURL = `https://election.beatsacademy.in/#/webpage/${a_id}`;

    // Check if the URL is already present in the message
    if (!a_message.includes(dynamicURL)) {
      adminToUpdate.a_message = `${a_message.trim()}\n${dynamicURL}`;
    }

    console.log('Before submitting the data is', adminToUpdate);

    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(adminToUpdate)) {
      console.log(key, value);
      formData.append(key, value);
    }

    console.log('the data is', formData);

    this.service.updateAdmminById(this.superAdminId, formData).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Updated successfully!', 'Success');
        this.AdminForm.reset();
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Update failed!', 'Error');
      }
    });
  }



  // for image upload

  onImageSelected(product: any) {

    const fileList: FileList = product.target.files;
    if (fileList.length > 0) {
      this.adminImageData = fileList[0];
      console.log('Selected image:', this.adminImageData);
    } else {
      this.adminImageData = null; // Reset file if no file is selected
    }

  }
  // onImageSelected(product: any) {
  //   const fileList: FileList = product.target.files;
  //   if (fileList.length > 0) {
  //     const imageFile: File = fileList[0];
  //     if (imageFile.size > 2 * 1024 * 1024) {
  //       // Image size is greater than 2MB, compress it
  //       this.imageCompressionService.compressImage(imageFile).then(compressedFile => {
  //         // Now you have the compressed file, assign it to adminImageData
  //         this.adminImageData = compressedFile;
  //       }).catch(error => {
  //         console.error('Error compressing image:', error);
  //       });
  //     } else {
  //       // Image size is within limit, assign it directly
  //       this.adminImageData = imageFile;
  //     }
  //   }
  // }


  get Adminmessage(): FormControl {
    return this.AdminForm.get('smessage') as FormControl;
  }

}
