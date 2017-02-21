import { createReducer } from 'utils/createReducer';
import {
  toggleList,
  removeItem,
  restoreItems
} from '../actions';

export interface ExampleStateI {
  show: boolean;
  items: any[];
}

const initialState: ExampleStateI = {
  show: false,
  items: [
    { id: 1, name: 'item 1' },
    { id: 2, name: 'item 2' },
    { id: 3, name: 'item 3' },
    { id: 4, name: 'item 4' },
    { id: 5, name: 'item 5' },
    { id: 6, name: 'item 6' },
    { id: 7, name: 'item 7' },
    { id: 8, name: 'item 8' },
  ]
};

export default createReducer({
  [toggleList]: (state: ExampleStateI, payload:boolean) => ({
    ...state,
    show: payload
  }),
  [removeItem]: (state: ExampleStateI, payload: number) => ({
    ...state,
    items: state.items.filter(item => item.id !== payload)
  }),
  [restoreItems]: (state: ExampleStateI) => ({
    ...state,
    items: initialState.items
  })
}, initialState);
