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
const location_dto_1 = require("./dto/location.dto");
const user_entity_1 = require("../auth/entities/user.entity");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const locator_service_1 = require("./locator.service");
let LocatorController = class LocatorController {
    constructor(locatorService) {
        this.locatorService = locatorService;
    }
    updateLocation(locationDto, user) {
        return this.locatorService.updateLocation(locationDto, user);
    }
};
__decorate([
    common_1.Post('/update'),
    __param(0, common_1.Body(common_1.ValidationPipe)), __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [location_dto_1.LocationDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], LocatorController.prototype, "updateLocation", null);
LocatorController = __decorate([
    common_1.Controller('/api/locator'),
    __metadata("design:paramtypes", [locator_service_1.LocatorService])
], LocatorController);
exports.LocatorController = LocatorController;
//# sourceMappingURL=locator.controller.js.map