"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveLogService = void 0;
var SaveLogService = /** @class */ (function () {
    function SaveLogService(logRepository, socket) {
        this.logRepository = logRepository;
        this.socket = socket;
    }
    SaveLogService.prototype.exec = function (log) {
        this.logRepository.create(log);
        this.socket.emit('newLog', log);
    };
    return SaveLogService;
}());
exports.SaveLogService = SaveLogService;
