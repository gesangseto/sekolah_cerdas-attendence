'use strict';

var response = require('../response');
var connection = require('../connection');


const perf = require('execution-time')();
var dateFormat = require('dateformat');
var datetime = require('node-datetime');

var dt = datetime.create();
var status_code = "";
var messages = "";
var elapseTime = "";
exports.GetStudentAttendence = function (req, res) {
    perf.start();
    var total = 0; connection.query("SELECT session_id FROM `sch_settings` ;",
        function (error, result, fields) {
            var session_id = result[0]['session_id']
            var sql = `SELECT a.id as attendence_id,b.id as student_session_id, c.id as student_id, d.id as attendence_type_id,e.id as class_id, f.id as sub_class_id, d.type as type,a.*, concat(c.firstname,' ',c.lastname) AS name,
            c.admission_no as admission_no, c.roll_no as roll_no,c.mobileno as mobileno , e.class as class,f.section as sub_kelas
                            FROM student_attendences AS a
                            JOIN student_session as b
                            ON a.student_session_id = b.id
                            JOIN students as c
                            ON b.student_id = c.id
                            JOIN attendence_type as d
                            ON a.attendence_type_id=d.id
                            JOIN classes as e on e.id=b.class_id
                            JOIN sections as f on f.id=b.section_id
                            WHERE  b.session_id=`+ session_id
            if (req.query.class_id != undefined) {
                sql = sql + ' AND b.class_id=' + req.query.class_id
            }
            if (req.query.sub_class_id != undefined) {
                sql = sql + ' AND b.section_id=' + req.query.sub_class_id
            }
            if (req.query.date != undefined) {
                sql = sql + ` AND a.date='` + req.query.date + `'`
            }
            if (req.query.student_id != undefined) {
                sql = sql + ` AND b.student_id='` + req.query.student_id + `'`
            }
            sql = sql + `  ORDER BY b.student_id ASC`
            connection.query(sql, function (error, result, fields) {
                if (error) {
                    messages = "Internal server error";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.errorRes(elapseTime, messages, res);
                } else {






                    /*
                    INI YANG MAU DI UBAH
                    Test nya lewat postman
                    */
                    var rowsTranslate = {};
                    var rowsTotal = []
                    result.forEach(element => {
                        if (!rowsTranslate[element.student_id]) {
                            rowsTranslate[element.student_id] = element

                            rowsTranslate[element.student_id].attendence = [];
                            rowsTranslate[element.student_id].attendence.push(element.date)
                        }
                        total = total + 1;
                        rowsTotal.push(rowsTranslate)
                    })
                    console.log(rowsTotal)
                    /*
                    BATAS AKHIR NYA DISINI
                    */



                    messages = "Success";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.successGet(elapseTime, messages, total, result, res);
                }
            });
        })


};


exports.GetStudentAttendenceById = function (req, res) {
    perf.start();
    var total = 0;
    var sql = `SELECT * FROM student_attendences`
    if (req.params.id != undefined) {
        sql = sql + ' WHERE id=' + req.params.id
    }
    sql = sql + ' ORDER BY id'
    connection.query(sql, function (error, result, fields) {
        if (error) {
            messages = "Internal server error";
            elapseTime = perf.stop();
            elapseTime = elapseTime.time.toFixed(2);
            response.errorRes(elapseTime, messages, res);
        } else {
            result.forEach(element => {
                total = total + 1;
            })
            messages = "Success";
            elapseTime = perf.stop();
            elapseTime = elapseTime.time.toFixed(2);
            response.successGet(elapseTime, messages, total, result, res);
        }
    });
};


exports.InsertStudentAttendence = function (req, res) {
    perf.start();
    var total = 0;
    var body = req.body
    var values = []
    var keys = []
    for (let value of Object.values(body)) {
        values.push("'" + value + "'"); // John, then 30
    }
    for (let key in body) {
        keys.push(key); // John, then 30
    }
    var check_sql = `SELECT count(*) as count FROM student_attendences WHERE student_session_id=` + body.student_session_id + ` AND date='` + body.date + `'`
    var sql = `INSERT INTO student_attendences (` + keys + `) VALUES (` + values + `)`;
    connection.query(check_sql,
        function (error, result, fields) {
            if (result[0]['count'] > 0) {
                messages = "Failed Insert, Duplicate data";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.successPost(elapseTime, messages, res);
            } else {
                connection.query(sql,
                    function (error, result, fields) {
                        if (error) {
                            messages = "Internal server error";
                            elapseTime = perf.stop();
                            elapseTime = elapseTime.time.toFixed(2);
                            response.errorRes(elapseTime, messages, res);
                        } else {
                            messages = "Success Insert Data";
                            elapseTime = perf.stop();
                            elapseTime = elapseTime.time.toFixed(2);
                            response.successPost(elapseTime, messages, res);
                        }
                    });
            }
        });

};



exports.UpdateStudentAttendence = function (req, res) {
    perf.start();
    var total = 0;
    var body = req.body
    var values = []
    var keys = []
    var data = []
    for (let value of Object.values(body)) {
        values.push("'" + value + "'"); // John, then 30
    }
    for (let key in body) {
        keys.push(key); // John, then 30
    }
    var i;
    for (i in keys) {
        data.push(keys[i] + '=' + values[i])
    }
    var myJSON = JSON.stringify(data);
    myJSON = myJSON.replace(/["]/g, '');
    myJSON = myJSON.replace('[', '');
    myJSON = myJSON.replace(']', '');
    var check_sql = `SELECT count(*) as count FROM student_attendences WHERE id!=` + body.id + ` AND student_session_id=` + body.student_session_id + ` AND date='` + body.date + `'`
    var sql = `UPDATE student_attendences SET ` + myJSON + ` WHERE id=` + body.id;
    connection.query(check_sql,
        function (error, result, fields) {
            if (result[0]['count'] > 0) {
                messages = "Failed Update, Duplicate data";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.successPost(elapseTime, messages, res);
            } else {
                connection.query(sql,
                    function (error, result, fields) {
                        if (error) {
                            messages = "Internal server error";
                            elapseTime = perf.stop();
                            elapseTime = elapseTime.time.toFixed(2);
                            response.errorRes(elapseTime, messages, res);
                        } else {
                            messages = "Success Update Data";
                            elapseTime = perf.stop();
                            elapseTime = elapseTime.time.toFixed(2);
                            response.successPost(elapseTime, messages, res);
                        }
                    });
            }
        })


};
