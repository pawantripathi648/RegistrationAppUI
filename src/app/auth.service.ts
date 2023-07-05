import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  public validUser = false;

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (this.validUser) {
      return true; // Allow access to the route
    } else {
      this.router.navigate(['/']); // Redirect to the login page
      return false; // Prevent access to the route
    }
  }
}
