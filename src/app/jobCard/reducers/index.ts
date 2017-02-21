import { combineReducers } from '@ngrx/store';
import collections from './collectionsReducer';
import page from './pageReducer';

export default combineReducers({
  collections,
  page
});
