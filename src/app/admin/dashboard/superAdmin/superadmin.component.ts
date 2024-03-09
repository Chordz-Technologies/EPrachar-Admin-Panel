import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.scss']
})
export class SuperAdminComponent {


  // public business!: Business[];
  // public statusList: string[] = ['Active', 'Trial', 'Expired'];
  public dataLoaded: boolean = false;


  displayedColumns: string[] = ['said', 'saname', 'contactno', 'samessage', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  superAdmin: any;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllSuperList();
  }

  getAllSuperList() {
    this.service.getAllSuperAdminDetails().subscribe({
      next: (res: any) => {
        console.log('Successfully retrieved Super Admin', res);
        this.dataLoaded = true;
        this.superAdmin = res.all_admins;
        this.dataSource = new MatTableDataSource(this.superAdmin);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        alert(err);
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onChange(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(id: number) {
    this.router.navigate(['/edit_superadmin_text', id]);
  }

  showUsers(businessId: string) {
    // this.service.setSelectedBusinessId(businessId);
    // this.router.navigate(['/home/multiusers', businessId]);
  }



}
