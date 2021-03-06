import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate() {
        if (sessionStorage.getItem('User')) {
            return true;
        }
        if (sessionStorage.getItem('Role') == 'Admin') {
            return true;
        }
        else {
            if (sessionStorage.getItem('User') == 'guest' ||
                    sessionStorage.getItem('User') == null) {
                    this.router.navigate(['/login']);
                    return false;
            }
            else{
                this.router.navigate(['/dashboard']);
                return false;
            }
        }
    }
}
