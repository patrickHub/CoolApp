var mongoose = require('mongoose');
    Schema = mongoose.Schema;

var Choice = new Schema({
    title: {type: String, required: true},
    isAnswer: {type: Boolean, default: false}
})

var ChoiceAnswer = new Schema({
    choice: {type: Schema.Types.ObjectId, ref: 'Choice'},
    totalAnswers: {type: Number, default: 0}
})

var PollSchema = new Schema({
    title: {type: String, required: true}
})

var QuestionSchema = new Schema({
    description: {type: String, required: true},
    choices: [Choice],
    date: {type: Date, default: Date.now },
    poll: { type: Schema.Types.ObjectId, ref: 'Poll' },
    isAnswered: {type: Boolean, default: false}
});

var AnswerSchema = new Schema({
    question: {type: Schema.Types.ObjectId, ref: 'Question'},
    choice: {type: Schema.Types.ObjectId, ref: 'Choice'},
    student:  {type: Schema.Types.ObjectId, ref: 'Student'}
});

var StatisticSchema = new Schema({
    question: {type: Schema.Types.ObjectId, ref: 'Question'},
    choicesAnswers: [ChoiceAnswer]
})

var StudentSchema = new Schema({
    fullName: {type: String, required: true, index: {unique: true}}
})

mongoose.model("Poll", PollSchema);
mongoose.model("Question", QuestionSchema);
mongoose.model("Answer", AnswerSchema);
mongoose.model("Statistic", StatisticSchema);
mongoose.model("Student", StudentSchema);
