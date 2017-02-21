import { createReducer } from 'utils/createReducer';

export interface JobCardCollectionsStateI {
  XIS_JOBS2: any;
  XIS_JOBS9: any;
  XIS_JOBS11: any;
}

const initialState: JobCardCollectionsStateI = {
  XIS_JOBS2: {
    DocEntry: null,
    LineId: null,
    U_Dep: null,
    U_PartCode: null,
    U_PartName: null,
    U_Qntty: null,
    job2Dirty: false
  },
  XIS_JOBS9: {
    DocEntry: null,
    LineId: null,
    VisOrder: null,
    Object: null,
    LogInst: null,
    U_RsrcCode: null,
    U_RsrcDesc: null,
    U_SchedDsc: null,
    U_StrtDate: null,
    U_StrtTime: null,
    U_EndDate: null,
    U_EndTime: null,
    U_Duration: null,
    U_Done: null,
    U_Choice1: null,
    U_Choice2: null,
    U_Notes: null,
    U_Assigned: null,
    U_Source: null,
    U_Log: null,
    U_TaskCode: null,
    U_TaskName: null,
    U_TaskStts: null,
    U_StrtHour: null,
    U_EndHour: null,
    U_Attach: null,
    U_SortOrder: null,
    job9Dirty: false,
    pic: null
  },
  XIS_JOBS11: {
    LineId: null,
    DocEntry: null,
    U_JobLine: null,
    U_EMPID: null,
    U_RprtType: null,
    U_FromDt: null,
    U_FromHr: null,
    U_ToHr: null,
    U_TotalHrs: null,
    newLine: false,
    startTime: null,
    endTime: null
  }
};

export default createReducer({

}, initialState);
