

function realtimeService(){
    var socketio;
    var room = "student_room";
    var surveys = [];

    function setup(io){
        socketio = io;
        socketio.on('connection', function(socket) {
            socket.on('msg_newteacher', function(socket){
                socket.on('new_room', function(data){
                    surveys.push({socket: socket, room: data.room});
                });
            });
            socket.on('msg_newstudent', function(data){
                if(teacherSocket != undefined){
                    teacherSocket.emit('new_student_connected', {username: data.username});
                }
            });
            socket.on('student_room', function(room){
                socket.join(room);
            });
        });
    }

    function notifyAnswer(answer){
        for(var survey in surveys){
            if(survey.room === answer.room){
                survey.socket.emit('msg_newanser', {answer: answer});
            }
            
        }
    }
    function notifyQuestion(question){
        socketio.sockets.in(question.room).emit('msg_newquestion', {question: question});
    }

    return{
        setup: setup,
        notifyAnswer: notifyAnswer,
        notifyQuestion: notifyQuestion
    }
}

module.exports = new realtimeService();