import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ServiceService } from './shared/service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'E-Prachar';
  adminImageUrl: string = ''; // This will hold the image URL

  constructor(
    private meta: Meta,
    private titleService: Title,
    private adminService: ServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let adminIdkey: any = location.href.split('/');
    adminIdkey = adminIdkey[adminIdkey.length - 1];
    console.log(adminIdkey);

    this.fetchAdminDetails(Number(adminIdkey));
  }

  fetchAdminDetails(a_id: number): void {
    const apiUrl = `https://electionapi.beatsacademy.in/adminDetails/${a_id}/`;
    this.adminService.getSuperAdminDetailsById(a_id).subscribe(data => {
      const admin = data.admin_details;

      if (admin) {
        this.updateMetaTags({
          title: 'E-Prachar - ' + admin.a_name,
          description: admin.a_message,
          imageUrl: admin.a_image, // Use the updated image URL
          url: `https://election.beatsacademy.in/#/webpage/${admin.a_id}`
        });
      } else {
        console.error('No admin details found.');
      }
    }, error => {
      console.error('Error fetching admin details:', error);
    });
  }

  updateMetaTags({
    title,
    description,
    imageUrl,
    url
  }: {
    title: string;
    description: string;
    imageUrl: string;
    url: string;
  }): void {
    this.titleService.setTitle(title);
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:url', content: url });
  }
}
