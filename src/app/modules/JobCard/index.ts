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
import { JobCardItemChecklist } from './components/JobCardItemChecklist';
import { JobCardItemGlobal } from './components/JobCardItemGlobal';
import { JobCardItemTimeReport } from './components/JobCardItemTimeReport';

import { JobCardResolve } from './services/JobCardResolve';
import { picService } from './services/picService';
import { TimeReportTab } from "./components/TimeReportTab";

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
    JobCardItemChecklist,
    JobCardItemGlobal,
    JobCardItemTimeReport,
    TimeReportTab
  ],
  providers: [
    JobCardResolve,
    picService
  ]
})

export default class JobCardModule {}
