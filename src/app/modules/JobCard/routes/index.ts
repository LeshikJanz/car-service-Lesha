import { Routes } from '@angular/router'
import { LoginGuard } from 'app/login/login-guard.service';
import { JobCardLayout } from '../components/JobCardLayout';
import { JobCardResolve } from '../services/JobCardResolve';

export const JobCardRoutes: Routes = [
  {
    path: 'job-card-cl',
    component: JobCardLayout,
    canActivate: [LoginGuard],
    resolve: {
      JCData: JobCardResolve
    }
  }
];
