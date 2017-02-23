import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import SharedModule from 'app/modules/Share';

import { JobCardRoutes } from './routes';
import { JobCardLayout } from './components/JobCardLayout';
import { JobCardNavigation } from './components/JobCardNavigation';
import { JobCardSearch } from './components/JobCardSearch';
import { JobCardFilter } from './components/JobCardFilter';
import { JobCardList } from './components/JobCardList';
import { JobCardListPager } from './components/JobCardListPager';
import { JobCardItem } from './components/JobCardItem';
import { JobCardItemBody } from './components/JobCardItemBody';
import { JobCardItemHeader } from './components/JobCardItemHeader';
import { JobCardItemTabs } from './components/JobCardItemTabs';

import { JobCardResolve } from './services/JobCardResolve';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(JobCardRoutes)
  ],
  declarations: [
    JobCardLayout,
    JobCardNavigation,
    JobCardSearch,
    JobCardFilter,
    JobCardList,
    JobCardListPager,
    JobCardItem,
    JobCardItemBody,
    JobCardItemHeader,
    JobCardItemTabs
  ],
  providers: [
    JobCardResolve
  ]
})

export default class JobCardModule {}
