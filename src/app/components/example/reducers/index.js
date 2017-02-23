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
var actions_1 = require("../actions");
var initialState = {
    show: false,
    items: [
        { id: 1, name: 'item 1' },
        { id: 2, name: 'item 2' },
        { id: 3, name: 'item 3' },
        { id: 4, name: 'item 4' },
        { id: 5, name: 'item 5' },
        { id: 6, name: 'item 6' },
        { id: 7, name: 'item 7' },
        { id: 8, name: 'item 8' },
    ]
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createReducer_1.createReducer((_a = {},
    _a[actions_1.toggleList] = function (state, payload) { return (__assign({}, state, { show: payload })); },
    _a[actions_1.removeItem] = function (state, payload) { return (__assign({}, state, { items: state.items.filter(function (item) { return item.id !== payload; }) })); },
    _a[actions_1.restoreItems] = function (state) { return (__assign({}, state, { items: initialState.items })); },
    _a), initialState);
var _a;
//# sourceMappingURL=index.js.map