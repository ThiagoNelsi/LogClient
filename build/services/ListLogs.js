"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListLogsService = void 0;
var ListLogsService = /** @class */ (function () {
    function ListLogsService(logRepository) {
        this.logRepository = logRepository;
    }
    ListLogsService.prototype.exec = function () {
        return this.logRepository.list();
    };
    return ListLogsService;
}());
exports.ListLogsService = ListLogsService;
