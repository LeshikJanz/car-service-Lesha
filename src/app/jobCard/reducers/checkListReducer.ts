import { createReducer } from 'utils/createReducer';
import {
  fetchOrderList,
  confirmOrder,
  declineOrder,
  haveQuestionOrder,
  addComment,
  addPicture
} from '../actions/checkListActions';
import { IState, IItemState } from "../interfaces/checkList";

const initialState: IState = {
  items: []
}

export default createReducer({
  [fetchOrderList]: (state: IState, payload: Array<IItemState>) => ({
    ...state,
    items: payload
  }),
  [confirmOrder]: (state: IState, LineId: number) => ({
    ...state,
    items: state.items.map((current, index) => {
      if (index == LineId-1) {
        return {
          ...current,
          isOrderConfirmed: true,
          isOrderDeclined: false,
          isOrderHaveQuestion: false
        }
      }
      return current;
    })
  }),
  [declineOrder]: (state: IState, LineId: number) => ({
    ...state,
    items: state.items.map((current, index) => {
      if (index == LineId-1) {
        return {
          ...current,
          isOrderConfirmed: false,
          isOrderDeclined: true,
          isOrderHaveQuestion: false
        }
      }
      return current;
    })
  }),
  [haveQuestionOrder]: (state: IState, LineId: number) => ({
    ...state,
    items: state.items.map((current, index) => {
      if (index == LineId-1) {
        return {
          ...current,
          isOrderConfirmed: false,
          isOrderDeclined: false,
          isOrderHaveQuestion: true
        }
      }
      return current;
    })
  }),
  [addComment]: (state: IState, payload: any) => ({
    ...state,
    items: state.items.map((current, index) => {
      if (index == payload.LineId-1) {
        return {
          ...current,
          comment: payload.U_Notes
        }
      }
      return current;
    })
  })

}, initialState)