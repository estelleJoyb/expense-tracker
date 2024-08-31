import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FloatLabelModule,
    CheckboxModule,
    ButtonModule,
    DividerModule,
    AvatarModule,
    InputTextModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  public login(): void {
    this.authService.login(this.username, this.password).subscribe((res) => {
      this.authService.setToken(res);
      this.router.navigate(['/transactions']);
    });
  }
}
