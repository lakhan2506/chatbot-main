const express = require('express');
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const cors = require('cors')
const authRoutes = require('./routes/auth');
const chatRoutes = require("./routes/chatRoutes");
const bodyParser = require('body-parser');



dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use("/api/chat",chatRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
