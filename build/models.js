'use strict';
var UserMessage = (function () {
    function UserMessage(payload) {
        var data = JSON.parse(payload);
        if (!data.name || !data.message) {
            throw new Error("some error");
        }
        this.data = data;
    }
    Object.defineProperty(UserMessage.prototype, "name", {
        get: function () {
            return this.data.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserMessage.prototype, "message", {
        get: function () {
            return this.data.message;
        },
        enumerable: true,
        configurable: true
    });
    return UserMessage;
}());
exports.UserMessage = UserMessage;
