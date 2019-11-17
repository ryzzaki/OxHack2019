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
const axios_1 = require("axios");
const locator_service_1 = require("../locator/locator.service");
const admin = require("firebase-admin");
const env_config_1 = require("../config/env.config");
let NotificatorService = class NotificatorService {
    constructor(locatorService) {
        this.locatorService = locatorService;
    }
    callHelp(originDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { originLat, originLong, ambulanceEta, description } = originDto;
            const etaInSeconds = ambulanceEta * 60;
            const relativeUsers = yield this.calculateDistance(originLong, originLat);
            const sorted = relativeUsers.sort((a, b) => (a.travelTime > b.travelTime) ? 1 : ((b.travelTime > a.travelTime) ? -1 : 0));
            for (const person of sorted) {
                if (person.travelTime > etaInSeconds) {
                    break;
                }
                else {
                    yield this.sendNotifications(originLat, originLong, person.length, person.travelTime, person.id, etaInSeconds, description);
                }
            }
        });
    }
    callHelpHard() {
        return __awaiter(this, void 0, void 0, function* () {
            const etaInSeconds = 6 * 60;
            const relativeUsers = yield this.calculateDistance(-1.257726, 51.752022);
            const sorted = relativeUsers.sort((a, b) => (a.travelTime > b.travelTime) ? 1 : ((b.travelTime > a.travelTime) ? -1 : 0));
            for (const person of sorted) {
                if (person.travelTime > etaInSeconds) {
                    break;
                }
                else {
                    yield this.sendNotifications(51.752022, -1.257726, person.length, person.travelTime, person.id, etaInSeconds, 'Something').catch(err => { return; });
                }
            }
        });
    }
    sendNotifications(originLat, originLong, length, travelTime, userId, ambulanceEta, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const serviceAccount = require('../../oxfordhack2019-99a45-firebase-adminsdk-ocfvv-cb67a5d2e6.json');
            if (!admin.apps.length) {
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                    databaseURL: 'https://oxfordhack2019-99a45.firebaseio.com',
                });
            }
            const registrationTokens = [
                'eDz3vM_Cwuo:APA91bGPJ9dbqndV92eTSmrYXlUrtti_YFxev0oj0epAYBr082pdNl45k2D0c0c2YAiFzl7hvIFVImecxk7JNxskqBAr2KEzQa9LKm97vtBmExpuZ9wzTQLWXQkZeXB7C72sCZgdRQeE',
            ];
            const message = {
                notification: {
                    title: 'EMERGENCY',
                    body: `PERSON IN VICINITY OF ${length} METRES NEEDS YOUR AID!`,
                },
                android: {
                    ttl: ambulanceEta * 1000,
                    notification: {
                        color: '#f45342',
                        sound: 'default',
                    },
                },
                data: {
                    longitude: String(originLong),
                    latitude: String(originLat),
                    userId: String(userId),
                    lengthInMeters: String(length),
                    travelTimeInSeconds: String(travelTime),
                    description: String(description),
                },
                tokens: registrationTokens,
            };
            admin.messaging().sendMulticast(message)
                .then((response) => {
                console.log(response.successCount + ' messages were sent successfully');
                console.log(response);
            })
                .catch((error) => {
                console.log('Error sending message:', error);
            });
        });
    }
    calculateDistance(originLat, originLong) {
        return __awaiter(this, void 0, void 0, function* () {
            const userIds = [];
            const listCoordinates = [];
            const relativeUsers = [];
            const locations = yield this.locatorService.getAllLocations();
            for (const location of locations) {
                userIds.push(location.userId);
                listCoordinates.push([location.longitude, location.latitude]);
            }
            const api = env_config_1.default.serverSettings.azureApi;
            const data = yield this.constructData(originLat, originLong, listCoordinates);
            const result = yield axios_1.default.post(api, data);
            const matrix = result.data.matrix[0];
            for (const route of matrix) {
                let relativeUser = {
                    userId: userIds.shift(),
                    length: route.response.routeSummary.lengthInMeters,
                    travelTime: route.response.routeSummary.travelTimeInSeconds,
                };
                relativeUsers.push(relativeUser);
            }
            return relativeUsers;
        });
    }
    constructData(originLat, originLong, listCoordinates) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                origins: {
                    type: 'MultiPoint',
                    coordinates: [
                        [
                            originLong,
                            originLat,
                        ],
                    ],
                },
                destinations: {
                    type: 'MultiPoint',
                    coordinates: listCoordinates,
                },
            };
            return data;
        });
    }
};
NotificatorService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [locator_service_1.LocatorService])
], NotificatorService);
exports.NotificatorService = NotificatorService;
//# sourceMappingURL=notificator.service.js.map