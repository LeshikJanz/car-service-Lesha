import { scopedCreator } from '../../../utils/createAction';

const createAction = scopedCreator('CHECKLIST');

export const fetchOrderList = createAction('FETCH_ORDER_LIST');
export const confirmOrder = createAction('CONFIRM_ORDER');
export const declineOrder = createAction('DECLINE_ORDER');
export const haveQuestionOrder = createAction('HAVE_QUESTION_ABOUT_ORDER');
export const addComment = createAction('ADD_COMMENT_TO_ORDER');
export const addPicture = createAction('ADD_PICTURE_TO_ORDER');
