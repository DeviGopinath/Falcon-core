const query = {
    query1: "SELECT name, email, eid FROM employee;",
    query2: "SELECT pid, name, client, estimation, budget, members FROM project;",
    query3: "SELECT project.name as projname , employee.name, employee.eid, allocation.rate FROM allocation INNER JOIN employee ON allocation.eid = employee.eid INNER JOIN project on project.pid = allocation.pid WHERE allocation.pid=$1;",
    query4: "SELECT allocation.month, employee.name, project.name, allocation.allocation, allocation.revenue FROM allocation INNER JOIN employee ON employee.eid = allocation.eid INNER JOIN project ON project.pid = allocation.pid WHERE allocation.month = $1;"
};

module.exports = query;
