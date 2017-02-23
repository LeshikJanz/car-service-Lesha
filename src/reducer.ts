import { combineReducers } from '@ngrx/store';
import checklist from './app/jobCard/reducers/checkListReducer';
import JobCard from './app/modules/JobCard/reducers';

export default combineReducers({
  checklist,
  JobCard
});
