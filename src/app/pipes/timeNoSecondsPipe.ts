import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'timeNoSeconds'})
export class TimeNoSecondsPipe implements PipeTransform {
  transform(value: string): string {
    if(value){
        return value.slice(0,5);
    }
    else{
        return value;
    }
  }
}