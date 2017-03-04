import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import SharedModule from 'app/modules/Share';

import { JobCardRoutes } from './routes';
import { JobCardLayout } from './components/Main/JobCardLayout';
import { JobCardNavigation } from './components/Navigation/JobCardNavigation';
import { JobCardSearch } from './components/Navigation/JobCardSearch';
import { JobCardFilter } from './components/Navigation/JobCardFilter';
import { JobCardList } from './components/Navigation/JobCardList';
import { JobCardListPager } from './components/Navigation/JobCardListPager';
import { JobCardItem } from './components/Main/JobCardItem';
import { JobCardItemBody } from './components/Main/JobCardItemBody';
import { JobCardItemHeader } from './components/Main/JobCardItemHeader';
import { JobCardItemChecklist } from './components/CheckList/JobCardItemChecklist';
import { JobCardItemGlobal } from './components/Main/JobCardItemGlobal';
import { JobCardItemTimeReport } from './components/TimeReport/JobCardItemTimeReport';

import { PartsIssueLayout } from './components/PartsIssue/PartsIssueLayout';
import { PartsIssueHeader } from './components/PartsIssue/PartsIssueHeader';
import { PartsIssueBody } from './components/PartsIssue/PartsIssueBody';

import { JobCardResolve } from './services/JobCardResolve';
import { picService } from './services/picService';
import { TimeReportTab } from "./components/TimeReport/TimeReportTab";
import { CheckListTab } from "./components/CheckList/CheckListTab";
import { PartsIssueTab } from "./components/PartsIssue/PartsIssueTab";
import { DropDownTabMain } from "./components/PartsIssue/DropDownTabMain";
import { DropDownTabInternal } from "./components/PartsIssue/DropDownTabInternal";
import { DropDownTabItem } from "./components/PartsIssue/PartsIssueSingleDetail";

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
    PartsIssueLayout,
    PartsIssueHeader,
    PartsIssueBody,
    JobCardItemTimeReport,
    TimeReportTab,
    CheckListTab,
    PartsIssueTab,
    DropDownTabMain,
    DropDownTabInternal,
    DropDownTabItem
  ],
  providers: [
    JobCardResolve,
    picService
  ]
})

export default class JobCardModule {
}
