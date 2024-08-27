import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ElectionAdmin_model } from 'src/app/models';
import { ServiceService } from 'src/app/shared/service.service';
import { ImageCompressionService } from 'src/app/shared/service/image-compression.service';

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
  adminImageData: File | null | undefined;



  constructor(private service: ServiceService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private imageCompressionService: ImageCompressionService) { }

  ngOnInit(): void {
    this.addAdminForm = this.fb.group({
      id: [''],
      adminUsername: [''],
      adminname: [''],
      contactno: this.fb.control('', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('[0-9]*'),
      ]),
      passWord: [''],
      conPassword: [''],
      smessage: this.fb.control('', [
        Validators.required,
        Validators.maxLength(150),
      ]),
      options: this.fb.control('', [Validators.required]),
      // pracharImage: ['']
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
      // pracharImage: superAdmin.a_image
    })


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

  postSuperAdminDetails() {
    // if (!this.adminImageData) {
    //   this.toastr.error('Please select an image.', 'Error');
    //   return;
    // }
    const adminData = {
      a_username: this.addAdminForm.value.adminUsername,
      a_name: this.addAdminForm.value.adminname,
      a_contactno: this.addAdminForm.value.contactno,
      a_password: this.addAdminForm.value.passWord,
      a_confirmpassword: this.addAdminForm.value.conPassword,
      a_message: this.addAdminForm.value.smessage,
      a_typesuperadmin: 0,
      a_typeadmin: this.addAdminForm.value.options === '1' ? 1 : 0,
      a_image: this.adminImageData,
    };

    const { a_username, a_name, a_contactno, a_password, a_confirmpassword, a_message, a_typeadmin, a_image } = adminData;

    if (!a_username || !a_name || !a_contactno || !a_password || !a_confirmpassword || !a_typeadmin || !a_image) {
      this.toastr.error('Please fill all the fields.', 'Error');
      return;
    }

    if (a_password !== a_confirmpassword) {
      this.toastr.error('Password and Confirm Password do not match.', 'Error');
      return;
    }

    if (a_message.length > 150) {
      this.toastr.error('Message cannot be more than 150 characters.', 'Error');
      return;
    }

    // const postData = { ...adminData };

    console.log("Before submitting the data is", adminData);
    // let formData2 = new FormData();
    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(adminData)) {
      console.log(key, value);

      formData.append(key, value)
    }
    console.log("the data is", formData);

    this.service.SuperAdminPost(formData).subscribe((res) => {
      console.log(res)
      if (res === 'success') {
        this.toastr.success('Successfully added', 'Success');
      } else {
        this.toastr.success('Successfully added', 'Success');
      }
    });

    // Reset the form after submitting
    this.addAdminForm.reset();
    this.router.navigate(['/admin'])
  }



  deleteProduct(): void {
    this.service.deleteSuperAdminById(this.AdminId).subscribe(
      () => {
        // console.log('Product deleted successfully');
        this.toastr.success('Admin deleted successfully!', 'Success');
        // Redirect the user to a different page after successful deletion
        this.router.navigate(['/admin']);
      },
      error => {
        console.error('Error deleting product:', error);
      }
    );
  }

  updateproduct() {
    this.ElectionAdmin_model.a_name = this.addAdminForm.value.adminUsername;
    this.ElectionAdmin_model.a_message = this.addAdminForm.value.smessage;
    this.ElectionAdmin_model.a_image = this.addAdminForm.value.pracharImage;


    this.service.updateAdmminById(this.AdminId, this.ElectionAdmin_model).subscribe(res => {
      console.log(res)
      this.toastr.success('Product Updated successfully!', 'Success');
      // alert('updated')
      this.addAdminForm.reset();
      this.router.navigate(['/admin'])
    })

  }



  get Adminmessage(): FormControl {
    return this.addAdminForm.get('smessage') as FormControl;
  }
  get ContactNo(): FormControl {
    return this.addAdminForm.get('contactno') as FormControl;
  }

}
