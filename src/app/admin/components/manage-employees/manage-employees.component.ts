import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-manage-employees',
  imports: [SharedModule],
  templateUrl: './manage-employees.component.html',
  styleUrl: './manage-employees.component.scss',
})
export class ManageEmployeesComponent {
  employeeForm!: FormGroup;
  projects: any;

  constructor(private adminService: AdminService, private fb: FormBuilder) {}

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      projectId: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    this.getAllProjects();
  }

  getAllProjects() {
    this.adminService.getProjects().subscribe(
      (res) => {
        this.projects = res;
        console.log(this.projects);
      },
      (error) => {
        console.log('Failed to fetch projects');
      }
    );
  }
}
