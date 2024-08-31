// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-logout',
//   standalone: true,
//   imports: [],
//   templateUrl: './logout.component.html',
//   styleUrl: './logout.component.scss'
// })
// export class LogoutComponent {

// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: '',
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }
}
