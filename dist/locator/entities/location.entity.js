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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../auth/entities/user.entity");
let Location = class Location extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'bigint' }),
    __metadata("design:type", Number)
], Location.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne(type => user_entity_1.User, { eager: false }),
    __metadata("design:type", user_entity_1.User)
], Location.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Location.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({ type: 'decimal' }),
    __metadata("design:type", Number)
], Location.prototype, "latitude", void 0);
__decorate([
    typeorm_1.Column({ type: 'decimal' }),
    __metadata("design:type", Number)
], Location.prototype, "longitude", void 0);
Location = __decorate([
    typeorm_1.Entity()
], Location);
exports.Location = Location;
//# sourceMappingURL=location.entity.js.map