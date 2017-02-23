"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var createReducer_1 = require("utils/createReducer");
var checkListActions_1 = require("../actions/checkListActions");
var initialState = {
    items: []
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createReducer_1.createReducer((_a = {},
    _a[checkListActions_1.fetchOrderList] = function (state, payload) { return (__assign({}, state, { items: payload })); },
    _a[checkListActions_1.confirmOrder] = function (state, LineId) { return (__assign({}, state, { items: state.items.map(function (current, index) {
            if (index == LineId - 1) {
                return __assign({}, current, { isOrderConfirmed: true, isOrderDeclined: false, isOrderHaveQuestion: false });
            }
            return current;
        }) })); },
    _a[checkListActions_1.declineOrder] = function (state, LineId) { return (__assign({}, state, { items: state.items.map(function (current, index) {
            if (index == LineId - 1) {
                return __assign({}, current, { isOrderConfirmed: false, isOrderDeclined: true, isOrderHaveQuestion: false });
            }
            return current;
        }) })); },
    _a[checkListActions_1.haveQuestionOrder] = function (state, LineId) { return (__assign({}, state, { items: state.items.map(function (current, index) {
            if (index == LineId - 1) {
                return __assign({}, current, { isOrderConfirmed: false, isOrderDeclined: false, isOrderHaveQuestion: true });
            }
            return current;
        }) })); },
    _a[checkListActions_1.addComment] = function (state, payload) { return (__assign({}, state, { items: state.items.map(function (current, index) {
            if (index == payload.LineId - 1) {
                return __assign({}, current, { comment: payload.U_Notes });
            }
            return current;
        }) })); },
    _a), initialState);
var _a;
//# sourceMappingURL=checkListReducer.js.map