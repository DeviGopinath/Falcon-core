const express = require("express");
const cors = require("cors");
const getAllocation = require("./routes/getAllocation");
const getIndividualProject = require("./routes/getIndividualProject");
const getAllEmployees = require("./routes/getAllEmployees");
const getAllProjects = require("./routes/getAllProjects");
const addMember = require("./routes/addMember");
const addProject = require("./routes/addProject");
const addAllocation = require("./routes/addAllocation");

const dotenv = require("dotenv");
dotenv.config();

const dbService = require("./model/dbService");
const controller = require("./controller/controller");

const app = express();

// middleware

app.use(express.json());
app.use(cors());

//routes

app.use("/allocation/getAllocation", getAllocation);
app.use("/projects/getIndividualProject", getIndividualProject);
app.use("/people/getAllEmployees", getAllEmployees);
app.use("/projects/getAllProject", getAllProjects);
app.use("/people/addMember", addMember);
app.use("/projects/addProject", addProject);
app.use("/addAllocation", addAllocation);

app.listen(process.env.PGSERVERPORT, () => {
    console.log("Running on port 5000");
});
