/**
 * @file Implements an Express Node HTTP server.
 */
import express, { Request, Response } from 'express';
import { connect } from 'mongoose';
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}

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

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
