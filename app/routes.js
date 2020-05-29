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


    // Tyep Attendence
    var student_attendence_type = require('./controller/student_attendence_type');
    app.route('/attendence/student_attendence_type')
        .get(student_attendence_type.GetAttendenceType);
    app.route('/attendence/student_attendence_type/:id')
        .get(student_attendence_type.GetAttendenceTypeById);
    app.route('/attendence/student_attendence_type')
        .put(student_attendence_type.InsertAttendenceType);
    app.route('/attendence/student_attendence_type')
        .post(student_attendence_type.UpdateAttendenceType);
    app.route('/attendence/student_attendence_type/:id')
        .delete(student_attendence_type.DeleteAttendenceType);
};