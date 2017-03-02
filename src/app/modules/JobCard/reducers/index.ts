import { combineReducers } from '@ngrx/store';
import page from './pageReducer';
import list from './listReducer';
import item from './itemReducer';
import report from './reportReducer';
import tabs from './tabReducer';

export default combineReducers({
  page,
  list,
  item,
  report,
  tabs
});
