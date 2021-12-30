const connection = require("../model/dbService");

const query = require("../queries/query");

let instance = null;
class Controller {
    static getDbServiceInstance() {
        return instance ? instance : new Controller();
    }

    //////////////////INDIVIDUAL_PROJECT////////////////////
    //get_the_info_to_display_in_the_individual_project
    async getIndividualProject(data) {
        console.log(data + "data");
        try {
            const response = await new Promise((resolve, reject) => {
                connection.query(query.query3, [data], (err, result) => {
                    if (err) reject(new Error(err.message));

                    resolve(result.rows);
                });
            });

            return response;
        } catch (error) {
            console.log("error in reading base data", error);
            return false;
        }
    }

    /////////////////////EMPLOYEE////////////////////////////
    //get_the_info_to_display_in_the_employee_detail's_page
    async getAllEmployees() {
        try {
            const response = await new Promise((resolve, reject) => {
                connection.query(query.query1, (err, result) => {
                    if (err) reject(new Error(err.message));

                    resolve(result.rows);
                });
            });
            return response;
        } catch (error) {
            console.log("error in reading all data", error);
            return false;
        }
    }
    ////////////////////////////////////////////////////////////

    ////////////////////////PROJECT//////////////////////
    //get_the_info_to_display_in_the_project_detail's_page
    async getAllProjects() {
        try {
            const response = await new Promise((resolve, reject) => {
                connection.query(query.query2, (err, result) => {
                    if (err) reject(new Error(err.message));

                    resolve(result.rows);
                });
            });
            return response;
        } catch (error) {
            console.log("error in reading all data", error);
            return false;
        }
    }
    ////////////////////////////////////////////////////////////

    ////////////////////////ALLOCATION//////////////////////
    //get_the_info_to_display_in_the_allocation_detail's_page
    async getAllocation(data1) {
        try {
            const empArr = [];
            const resArr = [];
            const response = await new Promise((resolve, reject) => {
                connection.query(`SELECT eid FROM employee;`,  (err, result) => {
                    // console.log(result.rows);
                    if (err) reject(new Error(err.message));
                    for (var i of result.rows) {
                        empArr.push(i.eid);
                    }
                    for (var j in empArr){
                        var b = parseInt(empArr[j]);
                        connection.query(`SELECT allocation.month, employee.eid, employee.name, project.name, allocation.allocation, allocation.revenue FROM allocation INNER JOIN employee ON employee.eid = allocation.eid INNER JOIN project ON project.pid = allocation.pid WHERE employee.eid = ${b} AND allocation.month = ${data1};`,  (err, result) => {
                        if (err) reject(new Error(err.message));
                        resArr.push(result.rows);
                        console.log(resArr);
                        resolve(resArr);
                    });
                }
                });
            });
            return response;    
        } catch (error) {
            console.log("error in reading all data", error);
            return false;
        }
    }
    ////////////////////////////////////////////////////////////
}

module.exports = Controller;
