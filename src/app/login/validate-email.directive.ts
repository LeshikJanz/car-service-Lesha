import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { UserNameEmailService } from './usersNameEmail.service';
import { Observable } from 'rxjs/Observable';

@Directive({
  selector:`[vEmail][formControlName],
  [vEmail][formControl],[vEmail][ngModel]`,
  providers: [{
    provide: NG_VALIDATORS, useExisting: 
    forwardRef(() => vEmail), multi:true
  }]
})

export class vEmail implements Validator{

    constructor(private userNameEmailService: UserNameEmailService) {

    }

    validate(ac: AbstractControl): { [str: string]: any } {
        let value = ac.value;
        if(!value) {
            return null;
        }

        value = (ac.value as string).toLowerCase();
        this.userNameEmailService.getUsersEmail(value)
        .subscribe(users => 
        {
            var a = users;
            ac.setErrors({ vEmail: true })
            return { vEmail: true };
        },
        error => 
        {
                //console.error(<any>error);
                return null;
        }); 

        return null;
    }
}