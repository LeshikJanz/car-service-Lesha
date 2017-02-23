import { scopedCreator } from 'utils/createAction';

const createAction = scopedCreator('JOB_CARD');

export const refreshList = createAction('REFRESH_LIST');
export const selectFilter = createAction('SELECT_FILTER');
export const searchItem = createAction('SEARCH_ITEM');

export const setItems = createAction('SET_JOB_CARDS_LIST');
export const viewItem = createAction('VIEW_JOB_CARD');

export const selectTab = createAction('SELECT_ITEM_TAB');

export const nextPage = createAction('NEXT_PAGE');
export const prevPage = createAction('PREV_PAGE');
export const setPageNumber = createAction('SET_PAGE_NUMBER');
