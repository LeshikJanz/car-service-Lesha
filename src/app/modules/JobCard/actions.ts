import { scopedCreator } from 'utils/createAction';

const createAction = scopedCreator('JOB_CARD');

export const refreshList = createAction('REFRESH_LIST');
export const selectFilter = createAction('SELECT_FILTER');
export const searchItem = createAction('SEARCH_ITEM');
export const setItems = createAction('SET_JOB_CARDS_LIST');
export const viewItem = createAction('VIEW_JOB_CARD');
