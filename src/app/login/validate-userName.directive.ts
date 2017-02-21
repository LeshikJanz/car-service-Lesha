import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { UserNameEmailService } from './usersNameEmail.service';

@Directive({
  selector:`[vUserName][formControlName],
  [vUserName][formControl],[vUserName][ngModel]`,
  providers: [{
    provide: NG_VALIDATORS, useExisting: 
    forwardRef(() => vUserName), multi:true
  }]
})

export class vUserName implements Validator{

    constructor(private userNameEmailService: UserNameEmailService) {

    }


    validate(ac: AbstractControl): { [str: string]: any } {
        let value = ac.value;
        if(!value) {
            return null;
        }

        value = (ac.value as string).toLowerCase();
        this.userNameEmailService.getUsersNames(value)
        .subscribe(users => 
        {
            var a = users;
            ac.setErrors({ vUserName: true })
            return { vUserName: true };
        },
        error => 
        {
                //console.error(<any>error);
                return null;
        }); 

        return null;
    }
}