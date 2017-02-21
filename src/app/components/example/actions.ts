import { scopedCreator } from 'utils/createAction';

const createAction = scopedCreator('EXAMPLE');

export const toggleList = createAction('TOGGLE_LIST_OF_ITEMS');
export const removeItem = createAction('REMOVE_ITEM_FROM_LIST');
export const restoreItems = createAction('RESTORE_REMOVED_ITEMS');
