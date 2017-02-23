import { createReducer } from 'utils/createReducer';
import {
  setItems,
  viewItem,
  selectTab
} from '../actions';

const initialState: any = {
  object: {},
  tabs: {
    GL: false,
    CL: false,
    TR: false
  }
};

export default createReducer({
  [setItems]: (state: any, payload: any) => ({
    ...initialState,
    object: payload.value[0]
  }),
  [viewItem]: (state: any, payload: any) => ({
    ...initialState,
    object: payload
  }),
  [selectTab]: (state: any, payload: any) => ({
    ...state,
    tabs: ({
      [payload]: true
    })
  })
}, initialState);
