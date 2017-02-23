"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var checkListActions_1 = require("../actions/checkListActions");
var CheckListButtons = (function () {
    function CheckListButtons(store) {
        var _this = this;
        this.store = store;
        this.commentActive = false;
        store
            .select('checklist')
            .subscribe(function (state) {
            _this.items$ = state.items;
            _this.isOrderConfirmed$ = state.isOrderConfirmed;
            _this.isOrderDeclined$ = state.isOrderDeclined;
            _this.isOrderHaveQuestion$ = state.isOrderHaveQuestion;
            _this.comment$ = state.comment;
        });
    }
    CheckListButtons.prototype.confirmOrder = function (item) {
        this.store.dispatch(checkListActions_1.confirmOrder(item.LineId));
    };
    CheckListButtons.prototype.declineOrder = function (item) {
        this.store.dispatch(checkListActions_1.declineOrder(item.LineId));
    };
    CheckListButtons.prototype.haveQuestionOrder = function (item) {
        this.store.dispatch(checkListActions_1.haveQuestionOrder(item.LineId));
    };
    CheckListButtons.prototype.input = function (event) {
        event.stopPropagation();
    };
    CheckListButtons.prototype.saveComment = function (item) {
        this.store.dispatch(checkListActions_1.addComment(item));
    };
    CheckListButtons.prototype.comment = function (event) {
        if (event.target.parentElement.parentElement.parentElement.className.search('active') != -1) {
            event.stopPropagation();
        }
        event.target.parentElement.parentElement.parentElement.replaceWith(event.target.parentElement.parentElement.parentElement);
        this.commentActive = !this.commentActive;
    };
    return CheckListButtons;
}());
__decorate([
    core_1.Input()
], CheckListButtons.prototype, "selected", void 0);
__decorate([
    core_1.Input()
], CheckListButtons.prototype, "item", void 0);
__decorate([
    core_1.Input()
], CheckListButtons.prototype, "items", void 0);
__decorate([
    core_1.Input()
], CheckListButtons.prototype, "commentActive", void 0);
CheckListButtons = __decorate([
    core_1.Component({
        selector: 'checkListButtons',
        templateUrl: 'checkListButtons.html',
        styleUrls: ['../styles/checkList.css']
    })
], CheckListButtons);
exports.CheckListButtons = CheckListButtons;
