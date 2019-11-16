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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const user_repository_1 = require("./repositories/user.repository");
const bcrypt = require("bcrypt");
const locator_service_1 = require("../locator/locator.service");
let AuthService = class AuthService {
    constructor(userRepository, locatorService) {
        this.userRepository = userRepository;
        this.locatorService = locatorService;
    }
    registerUser(registerDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, address, email, password, latitude, longitude } = registerDto;
            const hashedPass = yield this.hashPassword(password);
            const user = yield this.userRepository.registerUser(firstName, lastName, address, email, hashedPass);
            yield this.locatorService.createLocation(latitude, longitude, user);
            return;
        });
    }
    loginUser(loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = loginDto;
            yield this.userRepository.isValidPassword(email, password);
        });
    }
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt.genSalt();
            return bcrypt.hash(password, salt);
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        locator_service_1.LocatorService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map