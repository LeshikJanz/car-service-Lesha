import { combineReducers } from '@ngrx/store';
import page from './pageReducer';
import list from './listReducer';
import item from './itemReducer';
import report from './reportReducer';

export default combineReducers({
  page,
  list,
  item,
  report
});
