import { NgModule } from '@angular/core';

import { TranslatePipe } from 'app/translate/translate.pipe';
import { TimeNoSecondsPipe } from 'app/pipes/timeNoSecondsPipe';

@NgModule({
  declarations: [
    TranslatePipe,
    TimeNoSecondsPipe
  ],
  exports: [
    TranslatePipe,
    TimeNoSecondsPipe
  ]
})

export default class SharedModule {}
