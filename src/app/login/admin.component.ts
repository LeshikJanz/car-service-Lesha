import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'admin',
    templateUrl: 'admin.component.html'
})

export class AdminComponent {
    constructor( 
    private _router: Router){

    }

    gotoRegister(): void{
        this._router.navigate(['register']);
    }

    gotoRoles(): void{
        this._router.navigate(['roles']);
    }
}