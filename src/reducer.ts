import { combineReducers } from '@ngrx/store';
import example from './app/components/example/reducers';
import checklist from './app/jobCard/reducers/checkListReducer';

export default combineReducers({
  example,
  checklist
});
