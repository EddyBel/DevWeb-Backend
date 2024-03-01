const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

// App
app.set("PORT", 3000);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_LOCATIONS?.split(",") ?? ["localhost:5050"],
    methods: ["GET"],
    credentials: true,
  })
);

// Usa las rutas
app.use("/api", require("./src/routes/information"));
app.use("/api/blog", require("./src/routes/articles"));
app.use("/api/github", require("./src/routes/github"));

// Run backend
app.listen(app.get("PORT"), () => {
  console.log("Run server: ", app.get("PORT"));
});
