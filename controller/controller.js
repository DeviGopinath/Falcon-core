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
    async addProject(pid, name, client, estimation, budget) {
        console.log(pid, name, client, estimation, budget + " data");
        try {
            const response = await new Promise((resolve, reject) => {
                connection.query(
                    `INSERT INTO project(pid, name, client, estimation, budget, members) VALUES (${pid}, '${name}', '${client}', ${estimation}, ${budget}, 0) returning pid, name,client, estimation, budget;`,
                    (err, result) => {
                        if (err) reject(new Error(err.message));
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
                    }
                );
            });

            return response;
        } catch (error) {
            console.log("error in reading base data", error);
            return false;
        }
    }

    //////////////////PROJECTS A MEMBER IS NOT A PART OF//////////////
    //get_the_project_into which_a_member_is_not_allocated_in_a_month
    async allocateMember(eid, month) {
        try {
            const response = await new Promise((resolve, reject) => {
                connection.query(
                    `SELECT project.pid FROM project EXCEPT SELECT allocation.pid FROM allocation INNER JOIN employee ON employee.eid = allocation.eid WHERE allocation.month= '${month}' AND employee.eid = ${eid};`,
                    (err, result) => {
                        if (err) reject(new Error(err.message));
                        console.log(result.rows);
                        resolve(result.rows);
                    }
                );
            });
            return response;
        } catch (error) {
            console.log("error in reading all data", error);
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

    /////////////////////MEMBER_COUNT////////////////////////////
    //update_the_member_count_in_individual_project's_page
    async memberCount(data) {
        try {
            const response = await new Promise((resolve, reject) => {
                connection.query(
                    `UPDATE project SET members = members + 1 WHERE pid = ${data} returning pid;`,
                    (err, result) => {
                        if (err) reject(new Error(err.message));

                        resolve(result.rows);
                    }
                );
            });
            return response;
        } catch (error) {
            console.log("error in reading all data", error);
            return false;
        }
    }
    ////////////////////////////////////////////////////////////

    /////////////////////ACTIVE_PROJECTS////////////////////////
    //get_the_count_of_active_projects_in_a_month
    async activeProjects(month) {
        try {
            const response = await new Promise((resolve, reject) => {
                connection.query(
                    `SELECT COUNT (DISTINCT pid) FROM allocation WHERE month = ${month} ;`,
                    (err, result) => {
                        if (err) reject(new Error(err.message));
                        console.log(result.rows);
                        resolve(result.rows);
                    }
                );
            });
            return response;
        } catch (error) {
            console.log("error in reading all data", error);
            return false;
        }
    }
    ////////////////////////////////////////////////////////////

    /////////////////////EMPLOYEE_COUNT////////////////////////
    //get_the_count_of_employees_in_a_month
    async totalMembers(month) {
        try {
            const response = await new Promise((resolve, reject) => {
                connection.query(
                    `SELECT COUNT (DISTINCT eid) FROM allocation WHERE allocation.month= ${month};`,
                    (err, result) => {
                        if (err) reject(new Error(err.message));
                        console.log(result.rows);
                        resolve(result.rows);
                    }
                );
            });
            return response;
        } catch (error) {
            console.log("error in reading all data", error);
            return false;
        }
    }
    ////////////////////////////////////////////////////////////

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

        try {
            const resArr = [];
            const response = await new Promise((resolve, reject) => {
                connection.query(
                    `SELECT employee.eid, employee.name FROM employee WHERE eid IN (SELECT eid FROM employee EXCEPT SELECT eid FROM allocation WHERE allocation.month= ${data});`,
                    (error, result2) => {
                        for (let i = 0; i <= result2.rows.length - 1; i++) {
                            resArr.unshift([
                                {
                                    month: data.replace(/[^a-zA-Z]+/g, ""),
                                    eid: result2.rows[i].eid,
                                    empname: result2.rows[i].name,
                                },
                            ]);
                        }
                        connection.query(
                            `SELECT DISTINCT eid FROM allocation;`,
                            (err, result) => {
                                if (err) reject(new Error(err.message));
                                var l = result.rows.length;
                                result.rows.map((i, j) => {
                                    connection.query(
                                        `SELECT allocation.month, employee.eid, employee.name as empname, project.name, allocation.allocation, allocation.revenue FROM allocation INNER JOIN employee ON employee.eid = allocation.eid INNER JOIN project ON project.pid = allocation.pid WHERE employee.eid = ${i.eid} AND allocation.month = ${data}`,
                                        (error, result1) => {
                                            var item = result1.rows;
                                            resArr.unshift(item);
                                            if (
                                                resArr.length ==
                                                result.rows.length +
                                                    result2.rows.length
                                            ) {
                                                resolve(resArr);
                                            }
                                        }
                                    );
                                });
                            }
                        );
                    }
                );
            });
            return response;
        } catch (error) {
            console.log("error in reading all data", error);
            return false;
        }
    }
    ////////////////////////////////////////////////////////////

    
    ////////////////////////ALLOCATION_&_REVENUE_TAB//////////////////////
    //get_the_info_to_display_in_the_allocation_&revenue_tab
    async allocationTab(pid) {
        try {
            const finalArr = [];
            const resArr = [];
            const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const response = await new Promise((resolve, reject) => {
            connection.query(
                `SELECT distinct employee.eid FROM allocation INNER JOIN employee ON allocation.eid = employee.eid INNER JOIN project on project.pid = allocation.pid WHERE allocation.pid=${pid};`,
                    (error, result2) => {
                        for (let i = 0; i <= result2.rows.length - 1; i++) {
                            resArr.push([{eid: result2.rows[i].eid}],);
                                 }
                                //  console.log(resArr);
                               let l =resArr.length;
                                 resArr.forEach((eachEID,k) => { 
                                    let eid = eachEID[0].eid; 
                                    console.log(eid);
                                    for (let i = 0; i <= monthArr.length - 1; i++) {
                                    // console.log(eachEID, monthArr[i]);                                    
                                    let month = monthArr[i];
                                    
                                    connection.query(
                                        `SELECT employee.name, employee.eid, allocation.allocation, allocation.month, allocation.revenue FROM allocation INNER JOIN employee ON employee.eid = allocation.eid INNER JOIN project ON project.pid = allocation.pid WHERE employee.eid = ${eid} AND project.pid = ${pid} AND allocation.month = '${month}';`,
                                                (error, result1) => {
                                                    var item = result1.rows;
                                                    if(item.length>0){

                                                        resArr[k].push({name: item[0].name,
                                                                        hours: item[0].allocation,
                                                                        revenue: item[0].revenue,
                                                                        month: item[0].month});
                                                    }
                                                        if (resArr[resArr.length-1][0].eid==eid && month=='Dec') { 
                                                           for(i=0; i<resArr.length; i++){
                                                               resArr[i].shift();
                                                               console.log(resArr);
                                                           }
                                                            resolve(resArr);
                                                        }
                                                    //    resArr[resArr.length-1][0].eid==eid && month=='Dec');
                                                   }
                                                );
                                }})
                    }
                );
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
