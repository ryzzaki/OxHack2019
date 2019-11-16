"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const notificator_service_1 = require("./notificator.service");
const notificator_controller_1 = require("./notificator.controller");
const locator_module_1 = require("../locator/locator.module");
let NotificatorModule = class NotificatorModule {
};
NotificatorModule = __decorate([
    common_1.Module({
        imports: [locator_module_1.LocatorModule],
        providers: [notificator_service_1.NotificatorService],
        controllers: [notificator_controller_1.NotificatorController],
    })
], NotificatorModule);
exports.NotificatorModule = NotificatorModule;
//# sourceMappingURL=notificator.module.js.map