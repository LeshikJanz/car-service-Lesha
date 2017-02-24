import { createReducer } from 'utils/createReducer';
import {
  viewItem,
  selectTab,
  confirmOrder,
  declineOrder,
  haveQuestionOrder,
  addComment,
} from '../actions';

const initialState: any = {
  object: {},
  collections: {},
  tabs: {
    GL: false,
    CL: false,
    TR: false
  }
};

export default createReducer({
  [viewItem]: (state: any, payload: any) => ({
    ...state,
    object: payload,
    collections: Object
      .keys(payload)
      .filter(key => key.indexOf('XIS_JOB') >= 0)
      .map(key => [key, payload[key]])
      .reduce((obj, [ key, value ]: any) => ({ ...obj, [key]: value }), {})
  }),
  [selectTab]: (state: any, payload: any) => ({
    ...state,
    tabs: ({
      [payload]: true
    })
  }),
  [confirmOrder]: (state: any, payload: any) => ({
    ...state,
  }),
  [declineOrder]: (state: any, payload: number) => ({
    ...state,
  }),
  [haveQuestionOrder]: (state: any, payload: number) => ({
    ...state,
  }),
  [addComment]: (state: any, payload: any) => ({
    ...state,
  })
}, initialState);
