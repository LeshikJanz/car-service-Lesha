import { createReducer } from 'utils/createReducer';
import {
    viewItem,
    selectTab,
    orderStatus,
    startTimer,
    stopTimer
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
  [orderStatus]: (state: any, payload: any) => ({
    ...state,
    collections: ({
      ...state.collections,
      ...payload.collection
    })
  }),
  [startTimer]:  (state: any, payload: any) => ({
    ...state,
    collections: {
      ...state.collections,
      XIS_JOBS11Collection: [
        ...state.collections.XIS_JOBS11Collection,
        payload
      ]
    }
  }),
  [stopTimer]:  (state: any, payload: any) => ({
    ...state,
    collections: {
      ...state.collections,
      XIS_JOBS11Collection: payload
    }
  })
}, initialState);