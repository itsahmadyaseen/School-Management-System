import { configDotenv } from "dotenv";
import express from "express";
import { connection } from "./database/connection.js";
import cookieParser from "cookie-parser";
import studentRoutes from "./routes/student.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import classRoutes from "./routes/class.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import questionRoutes from "./routes/question.routes.js";
import testRoutes from "./routes/test.routes.js";
import resultRoutes from "./routes/result.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import cors from "cors";

const app = new express();
configDotenv();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
connection();

app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/teachers", teacherRoutes);
app.use("/api/v1/classes", classRoutes);
app.use("/api/v1/subjects", subjectRoutes);
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/tests", testRoutes);
app.use("/api/v1/results", resultRoutes);
app.use("/api/v1/attendance", attendanceRoutes);

app.listen(process.env.PORT, () => {
  console.log("Port is running on", process.env.PORT);
});
