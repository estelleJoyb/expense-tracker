import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { of, throwError } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: () => true // Simuler une réponse de service
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate') // Espionner la méthode navigate
          }
        }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if authenticated', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    expect(guard.canActivate()).toBeTrue();
  });

  it('should redirect if not authenticated', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    const result = guard.canActivate();
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
