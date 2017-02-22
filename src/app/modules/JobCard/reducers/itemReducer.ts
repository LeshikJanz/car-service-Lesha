import { createReducer } from 'utils/createReducer';
import {
  setItems,
  viewItem
} from '../actions';

const initialState: any = {};

export default createReducer({
  [setItems]: (state: any, payload: any) => ({
    ...payload.value[0]
  }),
  [viewItem]: (state: any, payload: any) => ({
    ...payload
  })
}, initialState);
