import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { UserStorageService } from './basic/basic-services/user-storage.service';

@Component({
  selector: 'app-root',
  imports: [SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'AttendanceFrontend';
  isEmployeeLoggedIn: boolean = UserStorageService.isEmployeeLoggedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();
  isManagerLoggedIn: boolean = UserStorageService.isManagerLoggedIn();

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((events) => {
      this.isEmployeeLoggedIn = UserStorageService.isEmployeeLoggedIn();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
      this.isManagerLoggedIn = UserStorageService.isManagerLoggedIn();
    });
  }
}
