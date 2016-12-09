var mongoose = require('mongoose');
    Schema = mongoose.Schema;

var Choice = new Schema({
    title: {type: String, required: true},
    isAnswer: {type: Boolean, default: false}
})

var QuestionSchema = new Schema({
    description: {type: String, required: true},
    choices: [Choice],
    date: {type: Date, default: Date.now },
    room: {type: String, required: true}
});

mongoose.model("Question", QuestionSchema);
