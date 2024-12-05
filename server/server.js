// const express = require("express")
// require("dotenv").config()
// const dbConnect = require("./config/dbconnect")
// const initRoutes = require("./routes")
// const cookieParser = require("cookie-parser")
// const cors = require("cors")

// const app = express()
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     methods: ["POST", "PUT", "GET", "DELETE"],
//     credentials: true,
//   })
// )
// app.use(cookieParser())
// const port = process.env.PORT || 8888
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
// dbConnect()
// initRoutes(app)

// app.listen(port, () => {
//   console.log("Server running on the port: " + port)
// })

const express = require("express");
require("dotenv").config();  // Để sử dụng các biến môi trường trong .env
const dbConnect = require("./config/dbconnect");  // Hàm kết nối cơ sở dữ liệu
const initRoutes = require("./routes");  // Hàm khởi tạo các routes
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Cấu hình CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Cho phép yêu cầu từ domain của frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức HTTP được phép
    credentials: true,  // Cho phép gửi cookie và token trong request
  })
);

// Middleware để phân tích cookie
app.use(cookieParser());

// Các middleware phân tích JSON và URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Kết nối cơ sở dữ liệu
dbConnect();

// Khởi tạo các routes
initRoutes(app);

// Lắng nghe server
const port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
