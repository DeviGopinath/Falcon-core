const connection = require("../model/dbService");

const query = require("../queries/query");

let instance = null;
class Controller {
    static getDbServiceInstance() {
        return instance ? instance : new Controller();
    }

    //////////////////INDIVIDUAL_PROJECT////////////////////
    //get_the_info_to_display_in_the_individual_project
    async getData(data) {
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
    async getAllEmployees(data) {
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
    async getAllProjects(data) {
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
}

module.exports = Controller;
