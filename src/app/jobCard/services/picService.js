"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
//import { Observable } from 'rxjs/Rx';
var picService = (function () {
    function picService() {
        this.URL = 'http://localhost:57939/api/Upload/PostFile';
    }
    picService.prototype.makeFileRequest = function (path, files) {
        var formData = new FormData(), xhr = new XMLHttpRequest();
        for (var i = 0; i < files.length; i++) {
            formData.append(path, files[i], files[i].name);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                }
                else {
                }
            }
        };
        xhr.upload.onprogress = function (event) {
        };
        xhr.open('POST', this.URL + "(" + path + ")", true);
        xhr.send(formData);
    };
    picService.prototype.loadPic = function (path) {
        return null;
    };
    return picService;
}());
picService = __decorate([
    core_1.Injectable()
], picService);
exports.picService = picService;
//# sourceMappingURL=picService.js.map