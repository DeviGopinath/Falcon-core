const connection = require("../model/dbService");

const query = require("../queries/query");

let instance = null;
class Controller {
    static getDbServiceInstance() {
        return instance ? instance : new Controller();
    }

    //////////////////ADD MEMBER///////////////////////
    //add_a_member_to_employee's_table
    async addMember(eid, name, email) {
        try {
            const response = await new Promise((resolve, reject) => {
                connection.query(
                    `INSERT INTO employee VALUES (${eid}, '${name}', '${email}') returning eid, name, email;`,
                    (err, result) => {
                        if (err) reject(new Error(err.message));
                        console.log("result", result);
                        resolve(result.rows);
                    }
                );
            });

            return response;
        } catch (error) {
            console.log("error in reading base data", error);
            return false;
        }
    }

    //////////////////ADD PROJECT///////////////////////
    //add_a_member_to_project's_table
    async addProject(pid, name, client, estimation, budget, members) {
        console.log(pid, name, client, estimation, budget, members + "data");
        try {
            const response = await new Promise((resolve, reject) => {
                connection.query(
                    `INSERT INTO project VALUES (${pid}, '${name}', '${client}', ${estimation}, ${budget}, ${members}) returning pid, name,client, estimation, budget, members;`,
                    (err, result) => {
                        if (err) reject(new Error(err.message));
                        console.log(result.rows);
                        //resolve(result.rows);
                    }
                );
            });

            return response;
        } catch (error) {
            console.log("error in reading base data", error);
            return false;
        }
    }


    //////////////////ADD ALLOCATION///////////////////////
    //add_an_allocation_to_allocation's_table
    async addAllocation(eid, pid, rate, allocation, month, revenue) {
        try {
            const response = await new Promise((resolve, reject) => {
                connection.query(
                    `INSERT INTO allocation (eid, pid, rate, allocation, month, revenue) VALUES (${eid}, ${pid}, ${rate}, ${allocation}, '${month}', ${revenue}) returning eid, pid, rate, allocation, month, revenue;`,
                 (err, result) => {
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


    //////////////////INDIVIDUAL_PROJECT////////////////////
    //get_the_info_to_display_in_the_individual_project
    async getIndividualProject(data) {
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


    ////////////////////////ALLOCATION//////////////////////
    //get_the_info_to_display_in_the_allocation_detail's_page
    async getAllocation(data1) {
        var data = data1;
        console.log(data);

        try {
            const resArr = [];
            const response = await new Promise((resolve, reject) => {
                connection.query(`SELECT eid FROM employee;`, (err, result) => {
                    if (err) reject(new Error(err.message));
                    var l = result.rows.length;
                    console.log(l);
                    result.rows.map((i, j) => {
                        console.log(i.eid, data, j);
                        connection.query(
                            `SELECT allocation.month, employee.eid, employee.name as empname, project.name, allocation.allocation, allocation.revenue FROM allocation INNER JOIN employee ON employee.eid = allocation.eid INNER JOIN project ON project.pid = allocation.pid WHERE employee.eid = ${i.eid} AND allocation.month = ${data}`,
                            (error, result1) => {
                                var item = result1.rows;
                                resArr.push(item);
                                console.log(resArr.length, result.rows.length);
                                if (resArr.length === result.rows.length) {
                                    resolve(resArr);
                                }
                            }
                        );
                    });
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
