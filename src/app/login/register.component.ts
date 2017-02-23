import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { userRegister } from './userRegister';
import { AccountService } from './account.service';
import { Response } from '@angular/http';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['./styles/login.css']
})

export class RegisterComponent{
    active = true;
    userRegister = new userRegister("","","","",0,0,"");

    constructor(private _router: Router,
        private accountService: AccountService){

    }

    submitRegister(): void {
        this.accountService.Register(this.userRegister)
        .subscribe(res => 
        {
            if(res.status == 200)
            {
                this._router.navigate(['dashboard']);
            }
        },
        error => 
        {
            var e = error;
        })
        
    }

    clearForm() {
        this.userRegister = new userRegister("","","","",0,0,"");
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }
}