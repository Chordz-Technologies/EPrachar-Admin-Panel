import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SuperAdminComponent } from './admin/dashboard/superAdmin/superadmin.component';
import { EditsuperMsgComponent } from './admin/Editforms/editsuper-msg/editsuper-msg.component';
import { EditadminMsgComponent } from './admin/Editforms/editadmin-msg/editadmin-msg.component';
import { AddNewadminComponent } from './admin/Editforms/add-newadmin/add-newadmin.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    // canActivate: [AuthGuard],
    path: '',
    component: HomeComponent, canActivate: [AuthGuard],
    children: [
      // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'user', component: SuperAdminComponent },
      { path: 'edit_superadmin_text/:id', component: EditsuperMsgComponent },
      { path: 'edit_admin_text/:id', component: EditadminMsgComponent },
      { path: 'add_new_admin', component: AddNewadminComponent },
      { path: 'dashboard', component: DashboardComponent },

    ]
  },
  { path: 'login', component: LoginComponent },
  // { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
