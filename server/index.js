const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { fileURLToPath } = require("url");
const usersRoutes = require("./routes/users");
const db = require("./models");
const logger = require("../server/utils/logger.js");

/** CONFIGURATIONS */
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(
  "/assets",
  express.static(
    path.join(
      path.dirname(fileURLToPath("file:///" + require.resolve("."))),
      "public/assets"
    )
  )
);

/** FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/** DATA BASE SYNC */
// db.sequelize.sync().then((req) => {
// listening to server connection
app.listen(process.env.PORT, () => {
  logger.info("Connection has been established successfully.");
});
// });

// routes for the user API
app.use("/api/users", usersRoutes);
