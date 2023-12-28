// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthed = localStorage.getItem('isAuthed');

    if (isAuthed && JSON.parse(isAuthed)) {
      return true; // Allow access to the route
    } else {
      this.router.navigate(['']); // Redirect to home page if not authenticated
      return false; // Block access to the route
    }
  }
}
