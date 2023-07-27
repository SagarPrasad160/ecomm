require("dotenv").config();
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const connect = require("./config/db");

const fileUpload = require("express-fileupload");

const authRoutes = require("./routes/authRoute");
const productRoutes = require("./routes/productsRoute");
const uploadRoutes = require("./routes/uploadRoute");
const cartRoutes = require("./routes/cartRoute");

// Connect db
connect();
app.use(express.json());
// use body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// serve static assets
app.use(express.static("./public"));
// cookie session
app.use(
  cookieSession({
    keys: ["afdasfasf"],
  })
);
// routes
app.use(authRoutes);
app.use(productRoutes);
app.use(uploadRoutes);
app.use(cartRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
