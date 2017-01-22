"use strict";
var Choice = (function () {
    function Choice(title, isAnswer) {
        if (isAnswer === void 0) { isAnswer = false; }
        this.title = title;
        this.isAnswer = isAnswer;
    }
    return Choice;
}());
exports.Choice = Choice;
var Question = (function () {
    function Question() {
        this.choices = [];
    }
    return Question;
}());
exports.Question = Question;
//# sourceMappingURL=question.js.map