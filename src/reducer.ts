import { combineReducers } from '@ngrx/store';
import example from './app/components/example/reducers';
import JobCard from './app/modules/JobCard/reducers';

export default combineReducers({
  example,
  JobCard
});
