import { combineReducers } from '@ngrx/store';
import page from './pageReducer';
import list from './listReducer';
import item from './itemReducer';

export default combineReducers({
  page,
  list,
  item
});
