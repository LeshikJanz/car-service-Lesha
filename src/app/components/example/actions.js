"use strict";
var createAction_1 = require("utils/createAction");
var createAction = createAction_1.scopedCreator('EXAMPLE');
exports.toggleList = createAction('TOGGLE_LIST_OF_ITEMS');
exports.removeItem = createAction('REMOVE_ITEM_FROM_LIST');
exports.restoreItems = createAction('RESTORE_REMOVED_ITEMS');
//# sourceMappingURL=actions.js.map