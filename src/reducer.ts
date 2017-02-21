import { combineReducers } from '@ngrx/store';
import example from './app/components/example/reducers';
import JobCard from './app/jobCard/reducers';

export default combineReducers({
  example,
  JobCard
});
