import { createReducer } from 'utils/createReducer';
import {
  setItems,
  searchItem
} from '../actions';

interface JobCardListI {
  value: any[]
}

const initialState: JobCardListI = {
  value: []
};

export default createReducer({
  [setItems]: (state: any, payload: any) => ({
    ...payload
  }),
  [searchItem]: (state: any, payload: string) => ({
    ...state,
    value: state.value.filter((item: any) => item.DocNum.indexOf(Number(payload)) > 0)
  })
}, initialState);
