"use strict";
var createAction_1 = require("../../../utils/createAction");
var createAction = createAction_1.scopedCreator('CHECKLIST');
exports.fetchOrderList = createAction('FETCH_ORDER_LIST');
exports.confirmOrder = createAction('CONFIRM_ORDER');
exports.declineOrder = createAction('DECLINE_ORDER');
exports.haveQuestionOrder = createAction('HAVE_QUESTION_ABOUT_ORDER');
exports.addComment = createAction('ADD_COMMENT_TO_ORDER');
exports.addPicture = createAction('ADD_PICTURE_TO_ORDER');
//# sourceMappingURL=checkListActions.js.map