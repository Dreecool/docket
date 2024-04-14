const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const PORT = 3001;



mongoose.connect("mongodb+srv://anaDeArmaz:khemzzy@cluster0.4e3ok2n.mongodb.net/todoist_db?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});


const Register = require('./model/register');
const Task = require('./model/addTaskModel');
const StickyWall = require('./model/stickyWallModel');

app.use(express.json());
app.use(
  cors({
    origin: ["https://docket-rose.vercel.app"],
    methods: ["POST, GET, DELETE, PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const registerRoutes = require('./modules/registerUser');
const loginRoutes  = require('./modules/loginUser');
const getUserRoutes = require('./modules/getCredentials')
const addTaskRoutes = require('./modules/addTask');
const getTaskRoutes = require('./modules/getTask');
const getOverDueTask = require('./modules/overDueTask');
const updateTask = require('./modules/editTask')
const deleteTask = require('./modules/deleteTask')
const upcommingTask = require('./modules/upcommingTask')
const fStickyWall = require('./modules/addStickyWall')

app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/user', getUserRoutes);
app.use("/addTask", addTaskRoutes);
app.use("/getTask", getTaskRoutes);
app.use("/overDueTask", getOverDueTask);
app.use("/updateTask", updateTask);
app.use("/deleteTask", deleteTask);
app.use("/upcommingTask", upcommingTask)
app.use("/stickyWall", fStickyWall);


app.listen(PORT, () => {
    console.log(`PORT is listening to ${PORT}`)
})
