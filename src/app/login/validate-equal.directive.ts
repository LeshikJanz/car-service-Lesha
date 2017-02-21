import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector:`[vEqual][formControlName],
  [vEqual][formControl],[vEqual][ngModel]`,
  providers: [{
    provide: NG_VALIDATORS, useExisting: 
    forwardRef(() => vEqual), multi:true
  }]
})

export class vEqual implements Validator {
  constructor(@Attribute('vEqual') public vEqual: string,
              @Attribute('reflect') public reflect: string) {

  }

  private get isReflect(){
    if(!this.reflect){
      return false;
    }
    return this.reflect === 'true' ? true : false;
  }

  validate(ac: AbstractControl): { [str: string]: any } {
    let value = ac.value;

    let controlValue = ac.root.get(this.vEqual);

    if (controlValue && value !== controlValue.value
      && !this.isReflect) {
      return { vEqual: true };
    }

    if(controlValue && value === controlValue.value 
      && this.isReflect) {
        delete controlValue.errors['vEqual'];
        if(!Object.keys(controlValue.errors).length) {
          controlValue.setErrors(null);
        }
      }
    
    if(controlValue && value !== controlValue.value
      && this.isReflect) {
        controlValue.setErrors({ vEqual: true });
    }


    return null;
  }

}