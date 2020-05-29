'use strict';

module.exports = function (app) {

    // Student Attendence
    var student_attendence = require('./controller/student_attendence');
    app.route('/attendence/student_attendence')
        .get(student_attendence.GetStudentAttendence);
    app.route('/attendence/student_attendence/:id')
        .get(student_attendence.GetStudentAttendenceById);
    app.route('/attendence/student_attendence')
        .put(student_attendence.InsertStudentAttendence);
    app.route('/attendence/student_attendence')
        .post(student_attendence.UpdateStudentAttendence);
};