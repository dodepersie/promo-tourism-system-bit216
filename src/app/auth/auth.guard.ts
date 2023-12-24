import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateFn,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user_id = localStorage.getItem('user_id');
    const restrictedRoutes = ['/register-merchant'];

    if (user_id) {
      if (restrictedRoutes.includes(state.url)) {
        this.router.navigate(['/user-dashboard']);
        return false;
      }
      return true;
    } else {
      if (!restrictedRoutes.includes(state.url)) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
  }
}

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(PermissionsService).canActivate(next, state);
};
