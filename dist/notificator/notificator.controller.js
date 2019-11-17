"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const notificator_service_1 = require("./notificator.service");
const origin_dto_1 = require("./dto/origin.dto");
let NotificatorController = class NotificatorController {
    constructor(notificatorService) {
        this.notificatorService = notificatorService;
    }
    callHelp(originDto) {
        this.notificatorService.callHelp(originDto);
        return;
    }
    test() {
        this.notificatorService.sendNotifications(30, 30, 30, 30, 30, 300);
        return;
    }
};
__decorate([
    common_1.Post('/call'),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [origin_dto_1.OriginDto]),
    __metadata("design:returntype", Promise)
], NotificatorController.prototype, "callHelp", null);
__decorate([
    common_1.Get('/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificatorController.prototype, "test", null);
NotificatorController = __decorate([
    common_1.Controller('/api/notificator'),
    __metadata("design:paramtypes", [notificator_service_1.NotificatorService])
], NotificatorController);
exports.NotificatorController = NotificatorController;
//# sourceMappingURL=notificator.controller.js.map