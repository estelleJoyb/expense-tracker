import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { StepperModule } from 'primeng/stepper';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

import { InputTextModule } from 'primeng/inputtext';
import {AuthService} from "../services/auth.service";
import { User } from '../models/user.model';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FloatLabelModule,CheckboxModule,ButtonModule,DividerModule,AvatarModule,InputGroupModule,InputGroupAddonModule,StepperModule,DropdownModule,FormsModule,
    InputNumberModule,
    InputTextModule,

  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent implements OnInit {
  user: User;
  repeatedPassword = '';

  date = new Date(Date.now());

  constructor(private authService: AuthService, private router: Router) {
    this.user = new User('', '', '');
  }

  types: {name: string}[] = [];
  selectedType: {name: string} | undefined;


  ngOnInit() {
      this.types = [
        {name: "Apprenant"},
        {name: "Intervenant"},
        {name: "Administrateur"}
      ];
  }

  register() {

    this.authService.register(this.user.name, this.user.email, this.user.password).subscribe((res: any) => {
      console.log("res", res);
      this.router.navigate(['/login']);
    });
  }
}

