import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iresponse } from './response';
import { AccountService } from './account.service';

@Component({
    selector: 'roles',
    templateUrl: 'roles.component.html'
})

export class RolesComponent implements OnInit{
    
    constructor(private _router: Router,
        private _accountService: AccountService) {
    }

    ngOnInit() {

    }
}

