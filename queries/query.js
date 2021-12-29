// const query = {
// 	query1: 'SELECT details.cat_id, unit.unit, details.employee_count FROM details INNER JOIN unit ON details.unit_id = unit.unit_id AND data_month = $1;',
// 	query2: 'SELECT details.cat_id, details.data_month,details.employee_count FROM details INNER JOIN  unit ON details.unit_id=unit.unit_id WHERE details.data_month >= $1 AND details.data_month <= $2 AND unit.unit=$3',
// 	query3: 'SELECT category.category, unit.unit, details.employee_count FROM details INNER JOIN unit ON details.unit_id = unit.unit_id INNER JOIN category ON details.cat_id = category.cat_id AND data_month = $1',
// 	query4: 'CALL insert_data ($1 ,$2 , $3  ,$4 , $5 ,$6 ,$7 ,$8)',
// };

// module.exports = query;

const query = {
    query1: "SELECT name, email, eid FROM employee;",
    query2: "SELECT pid, name, client, estimation, budget, members FROM project;",
    query3: "SELECT project.name as projname	, employee.name, employee.eid, allocation.rate FROM allocation INNER JOIN employee ON allocation.eid = employee.eid INNER JOIN project on project.pid = allocation.pid WHERE allocation.pid=$1;",
};

module.exports = query;
