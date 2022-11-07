/**
 * @file Implements an Express Node HTTP server.
 */
import express, { Request, Response } from 'express';
import { connect } from 'mongoose';
import BookmarkController from './controllers/BookmarkController';
import FollowController from './controllers/FollowController';
import LikeController from './controllers/LikeController';
import MessageController from './controllers/MessageController';
import TuitController from './controllers/TuitController';
import UserController from './controllers/UserController';
import TuitDao from './daos/TuitDao';
import UserDao from './daos/UserDao';
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
app.use(cors());
//app.use(express.json());
app.use(bodyParser.json()); // <--- Here
app.use(bodyParser.urlencoded({ extended: true }));

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}

/**
 * Connect function tries to connect to the mongo database
 * on the specifed url. Prints success message on successful
 * connection.
 */
connect('mongodb://localhost:27017/db', options, (err) => {
    if (err) {
        return console.error(err);
    }
    return console.log("MongoDB connection successful");
});

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!!!!'));

app.get('/hello', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!'));

// Create user dao, controller and add it to express app.
const userDao = new UserDao();
const userController = new UserController(app, userDao);

// Create tuit dao, controller and add it to express app.
const tuitDao = new TuitDao();
const tuitController = new TuitController(app, tuitDao);

// Create like dao, controller and add it to express app.
const likeController = LikeController.getInstance(app);

// Create follow dao, controller and add it to express app.
const followController = FollowController.getInstance(app);

// Create bookmarks dao, controller and add it to express app.
const bookmarkController = BookmarkController.getInstance(app);

// Create message dao, controller and add it to express app.
const messageController = MessageController.getInstance(app);

/*
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
