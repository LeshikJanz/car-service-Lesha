import { createReducer } from 'utils/createReducer';
import {
  refreshList,
  selectFilter,
  nextPage,
  prevPage,
  setPageNumber,
  setItems
} from '../actions';

interface JobCardPageI {
  number: number;
  size: number;
  filter: string;
  options: any[];
  loading: boolean;
}

const initialState: JobCardPageI = {
  number: 0,
  size: 15,
  filter: 'Open',
  options: ['All', 'Open', 'Close'],
  loading: false
};

export default createReducer({
  [setPageNumber]: (state: any, payload: number) => ({
    ...state,
    number: payload,
    loading: true
  }),
  [nextPage]: (state: any) => ({
    ...state,
    number: state.number + 1,
    loading: true
  }),
  [prevPage]: (state: any) => ({
    ...state,
    number: (state.number > 0) && state.number - 1,
    loading: true
  }),
  [selectFilter]: (state: any, payload: string) => ({
    ...state,
    loading: true,
    filter: state
      .options
      .find((option: string) => option === payload)
  }),
  [refreshList]: (state: any) => ({
    ...initialState,
    loading: true
  }),
  [setItems]: (state: any) => ({
    ...state,
    loading: false
  })
}, initialState);
