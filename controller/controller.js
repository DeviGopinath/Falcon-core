const connection = require("../model/dbService");

const query = require("../queries/query");

let instance = null;
class Controller {
    static getDbServiceInstance() {
        return instance ? instance : new Controller();
    }

    async insertData(data) {
        try {
            const response = await new Promise((resolve, reject) => {
                const month = data.month;
                const data1 = data.data1;
                const data2 = data.data2;
                const data3 = data.data3;
                const data4 = data.data4;
                const data5 = data.data5;
                const data6 = data.data6;
                const data7 = data.data7;

                connection.query(
                    query.query4,
                    [month, data1, data2, data3, data4, data5, data6, data7],
                    (err, result) => {
                        if (err) reject(new Error(err.message));

                        resolve(result);
                    }
                );
            });

            return response !== 0 ? true : false;
        } catch (error) {
            console.log("error in write", error);
            return false;
        }
    }

    async getDateData(unit, fromdate, todate) {
        try {
            const response = await new Promise((resolve, reject) => {
                connection.query(
                    query.query2,
                    [fromdate, todate, unit],
                    (err, results) => {
                        if (err) reject(new Error(err.message));

                        resolve(results.rows);
                    }
                );
            });
            return response;
        } catch (error) {
            console.log("error in reading date data", error);
            return false;
        }
    }

    async getData(data) {
        console.log(data + "data");
        try {
            const response = await new Promise((resolve, reject) => {
                connection.query(query.query1, [data], (err, result) => {
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

    async getAllData(data) {
        try {
            const response = await new Promise((resolve, reject) => {
                connection.query(query.query3, [data], (err, result) => {
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

    async getAuth(data) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `select pwd from authdata where username='${data}';`;
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    //console.log(result.rows);
                    resolve(result);
                });
            });
            return response;
        } catch (error) {
            console.log("login failed", error);
            return false;
        }
    }
    async userExist(data) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `select * from authdata where username='${data}';`;
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    //console.log(result.rows);

                    resolve(result);
                });
            });
            return response;
        } catch (error) {
            console.log("query failed", error);
            return false;
        }
    }
    async insertNewUser(username, password) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `insert into authdata(username,pwd)  values('${username}','${password}') returning *;`;
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    //console.log(result.rows);

                    resolve(result);
                });
            });
            return response;
        } catch (error) {
            console.log("query failed", error);
            return false;
        }
    }
}

module.exports = Controller;
