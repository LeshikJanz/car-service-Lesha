import { createReducer } from 'utils/createReducer';
import {
  refreshList,
  selectFilter
} from '../actions';

interface JobCardPageI {
  size: number;
  filter: string;
  options: any[];
}

const initialState: JobCardPageI = {
  size: 15,
  filter: 'Open',
  options: ['All', 'Open', 'Close']
};

export default createReducer({
  [selectFilter]: (state: any, payload: string) => ({
    ...state,
    filter: state
      .options
      .find((option: string) => option === payload)
  }),
  [refreshList]: (state: any) => ({
    ...initialState
  })
}, initialState);
