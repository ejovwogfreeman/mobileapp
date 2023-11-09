const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { initializeSocket } = require("./middlewares/socketMiddleware");

// const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

const port = process.env.PORT || 5000;

app.use("/api/files/", require("./routes/fileRoutes"));
app.use("/api/auth/", require("./routes/authRoutes"));
app.use("/api/users/", require("./routes/userRoutes"));
app.use("/api/riders/", require("./routes/riderRoutes"));
app.use("/api/admin/", require("./routes/adminRoutes"));
// app.use("/api/conversation/", require("./routes/conversationRoutes"));
// app.use("/api/message/", require("./routes/messageRoutes"));

server.listen(port, () => {
  console.log(`server running on port ${port}`);
});

initializeSocket(server);
