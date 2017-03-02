import { createReducer } from 'utils/createReducer';
import {
  viewItem,
  selectTimeReport
} from '../actions';

const initialState = {};

export default createReducer({
  [viewItem]: (state: any) => ({
    ...initialState
  }),
  [selectTimeReport]: (state: any, payload: any) => ({
    ...payload
  })
}, initialState);
