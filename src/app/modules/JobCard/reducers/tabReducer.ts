import { createReducer } from 'utils/createReducer';
import { openTimeReportTab, openCheckListTab, openPartsIssueTab } from "../actions";

const initialState = {
  isCheckListOpen: false,
  isTimeReportOpen: false,
  isPartsIssueOpen: false
};

export default createReducer({
  [openCheckListTab]: (state: any) => ({
  ...state,
  isCheckListOpen: !state.isCheckListOpen
}),
  [openTimeReportTab]: (state: any) => ({
    ...state,
    isTimeReportOpen: !state.isTimeReportOpen
  }),
  [openPartsIssueTab]: (state: any) => ({
    ...state,
    isPartsIssueOpen: !state.isPartsIssueOpen
  }),
}, initialState);