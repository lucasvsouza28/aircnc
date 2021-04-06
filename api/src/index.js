require('dotenv').config();
require('./mongo-client');
const cors = require('cors');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
const app = express();

const server = http.createServer(app);
const options = { 
    cors:true,
    origins:["*"],
 };
const io = socketio(server, options);

const { UserModel } = require('./models');
const {    
    UserRouter,
    SpotRouter,
    DashboardRouter,
    BookingRouter,
} = require('./routers/index.js');

const port = process.env.PORT || 3000;
const connectedUsers = {};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '../uploads')));

app.use(async (req, res, next) => {

    req.io = io;
    req.connectedUsers = connectedUsers;

    const { user_id } = req.headers;

    if (user_id){
        const user = await UserModel.findById(user_id);

        if (!user){
            return res.status(400).json({ message: 'User not found' });
        }        
    }

    next();
});

app.use('/dashboard', DashboardRouter);
app.use('/user', UserRouter);
app.use('/spot', SpotRouter);
app.use('/booking', BookingRouter);

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    console.log('user ' + user_id + ' connected with id ' + socket.id)
    connectedUsers[user_id] = socket.id;
});

server.listen(port, () => {
    console.log(`Aircnc API listening on port ${port}`);
})