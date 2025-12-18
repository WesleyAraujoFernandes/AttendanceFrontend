import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-manage-managers',
  imports: [SharedModule],
  templateUrl: './manage-managers.component.html',
  styleUrl: './manage-managers.component.scss',
})
export class ManageManagersComponent {
  projects: any;
  managerForm!: FormGroup;
  constructor(
    private AdminService: AdminService,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.managerForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      projectId: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
    this.getAllProjects();
  }

  getAllProjects() {
    this.AdminService.getProjects().subscribe(
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
    const data = this.managerForm.value;
    data.userRole = 'MANAGER';
    this.AdminService.addUser(data).subscribe(
      (res) => {
        this.message.success('Manager created successfully', {
          nzDuration: 5000,
        });
        this.managerForm.reset();
      },
      (error) => {
        this.message.error(error.error, { nzDuration: 5000 });
      }
    );
  }
}
