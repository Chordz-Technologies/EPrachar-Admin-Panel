import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-webpage',
  templateUrl: './webpage.component.html',
  styleUrls: ['./webpage.component.scss']
})
export class WebpageComponent implements OnInit {
  adminDetails: any;

  constructor(private adminService: ServiceService) { }

  ngOnInit(): void {
    let adminIdkey: any = location.href.split('/');
    adminIdkey = adminIdkey[adminIdkey.length - 1];
    console.log(adminIdkey);

    this.fetchAdminDetails(Number(adminIdkey));
  }

  fetchAdminDetails(id: number): void {
    this.adminService.getSuperAdminDetailsById(id).subscribe(
      (response) => {
        this.adminDetails = response.admin_details;
        console.log("Info on webpage", this.adminDetails);
      },
      (error) => {
        console.error('Error fetching admin details:', error);
      }
    );
  }
}
