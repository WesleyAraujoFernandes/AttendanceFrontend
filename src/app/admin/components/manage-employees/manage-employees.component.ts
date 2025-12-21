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
  employees: any;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      projectId: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    this.getAllProjects();
    this.getAllEmployees();
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

  submitForm() {
    const data = this.employeeForm.value;
    data.userRole = 'EMPLOYEE';
    this.adminService.addUser(data).subscribe(
      (res) => {
        this.message.success('Employee created successfully', {
          nzDuration: 5000,
        });
        this.employeeForm.reset();
        this.getAllEmployees();
      },
      (error) => {
        this.message.error(error.error, { nzDuration: 5000 });
      }
    );
  }

  getAllEmployees() {
    this.adminService.getAllEmployees().subscribe(
      (res) => {
        this.employees = res;
        console.log(this.employees);
      },
      (error) => {
        console.log('Failed to fetch employees');
      }
    );
  }
}
