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
exports.GetAttendenceType = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    var sql = `SELECT * FROM attendence_type`
    if (req.query.id != undefined) {
        sql = sql + ' WHERE id=' + req.query.id
    }
    sql = sql + `  ORDER BY type ASC`
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

exports.GetAttendenceTypeById = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    var sql = `SELECT * FROM attendence_type WHERE id=` + req.params.id
    sql = sql + `  ORDER BY type ASC`
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


exports.InsertAttendenceType = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

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
    var check_sql = `SELECT count(*) as count FROM attendence_type WHERE type='` + body.type + `'`
    var sql = `INSERT INTO attendence_type (` + keys + `) VALUES (` + values + `)`;
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



exports.UpdateAttendenceType = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

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
    var check_sql = `SELECT count(*) as count FROM attendence_type WHERE type='` + body.type + `' AND id!=` + body.id
    var sql = `UPDATE attendence_type SET ` + myJSON + ` WHERE id = ` + body.id;
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


exports.DeleteAttendenceType = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    var id = req.params.id
    var sql = `DELETE FROM attendence_type WHERE id = ` + id;
    connection.query(sql,
        function (error, result, fields) {
            if (error) {
                messages = "Internal server error";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.errorRes(elapseTime, messages, res);
            } else {
                messages = "Success Delete Data";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.successPost(elapseTime, messages, res);
            }
        });


};
