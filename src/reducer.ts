import { combineReducers } from '@ngrx/store';
import example from './app/components/example/reducers';
import checklist from './app/jobCard/reducers/checkListReducer';
import JobCard from './app/modules/JobCard/reducers';

export default combineReducers({
  example,
  checklist,
  JobCard
});
