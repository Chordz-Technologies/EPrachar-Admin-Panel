import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public dataLoaded: boolean = false;


  displayedColumns: string[] = ['said', 'saname', 'samessage', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  superAdmin: any;
  input: any;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    // this.getAllSuperList();
    // Check if the admin type is "Admin" in local storage
    const adminType = localStorage.getItem('adminType');
    if (adminType === 'Admin') {
      // Call the method to fetch super admin details based on the admin type
      this.getSuperAdminDetailsBasedOnLocalStorage();
    }
  }

  getSuperAdminDetailsBasedOnLocalStorage() {
    // Get admin type and ID from local storage
    const adminType = localStorage.getItem('adminType');
    const adminId = localStorage.getItem('adminId');

    // If admin type and ID exist in local storage
    if (adminType && adminId) {
      // Call the API to fetch super admin details
      this.service.getAllSuperAdminDetails().subscribe({
        next: (res: any) => {
          console.log('Successfully retrieved Super Admin', res);
          // Filter the super admin data based on the admin type and ID from local storage
          this.superAdmin = res.all_admins.filter((admin: any) => admin.a_typeadmin == 1 && admin.a_id == adminId);
          this.dataLoaded = true;
          this.dataSource = new MatTableDataSource(this.superAdmin);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (err: any) => {
          alert(err);
        }
      });
    } else {
      // Handle case where admin type or ID is missing from local storage
      console.log('Admin type or ID missing from local storage');
    }
  }

  // getAllSuperList() {
  //   this.service.getAllSuperAdminDetails().subscribe({
  //     next: (res: any) => {
  //       console.log('Successfully retrieved Super Admin', res);
  //       // Mocking logged-in user data, replace this with actual data retrieval logic
  //       const loggedInAdminType = "Admin"; // Example: "Admin" or "Superadmin"
  //       const loggedInAdminID = 2; // Example: ID of the logged-in user

  //       // Filter the super admin data based on logged-in admin type and ID
  //       if (loggedInAdminType === "Admin") {
  //         this.superAdmin = res.all_admins.filter((admin: any) => admin.a_typesuperadmin !== 1 || admin.a_id === loggedInAdminID);
  //       } else {
  //         this.superAdmin = res.all_admins;
  //       }

  //       this.dataLoaded = true;
  //       this.dataSource = new MatTableDataSource(this.superAdmin);
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
  //     },
  //     error: (err: any) => {
  //       alert(err);
  //     }
  //   });
  // }


  // getAllSuperList() {
  //   this.service.getAllSuperAdminDetails().subscribe({
  //     next: (res: any) => {
  //       console.log('Successfully retrieved Super Admin', res);
  //       this.dataLoaded = true;
  //       this.superAdmin = res.all_admins;
  //       this.dataSource = new MatTableDataSource(this.superAdmin);
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
  //     },
  //     error: (err: any) => {
  //       alert(err);
  //     }
  //   });
  // }


  edit(id: number) {
    this.router.navigate(['/edit_admin_text', id]);
  }


}
