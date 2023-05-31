const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");

const app = express();
app.use(helmet());
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

dotenv.config();
//routes
const Login = require("./routes/auth");
const New = require("./routes/auth/new");
const Post = require("./routes/user/posts");

const updateUser = require("./routes/user/update");
const port = process.env.PORT || 4000;

//routes
app.use("/auth/", Login);
app.use("/auth/new", New);
app.use("/user/update", updateUser);
app.use("/user/post", Post);


app.listen(port, () => console.log("servidor esta ligado"));
