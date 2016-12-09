var mongoose = require('mongoose');
    Schema = mongoose.Schema;

var AnswerSchema = new Schema({
    choice_id: {type: String, required: true},
    question_id:  {type: String, required: true},
    user_id:  {type: String, required: true},
    room: {type: String, required: true},
    date: {type: Date, default: Date.now }
});

mongoose.model("Answer", AnswerSchema);