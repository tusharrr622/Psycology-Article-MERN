const express = require('express');
const mongoose = require('mongoose');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const session = require('express-session');
const bodyParser = require('body-parser');

const cors = require('cors');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const { assert } = require('console');



const salt = bcrypt.genSaltSync(10);
const secret = 'saesgrfsg415sr';

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        })
        res.json(userDoc)

    } catch (error) {
        res.status(400).json(error)
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.findOne({ username });
        if (!userDoc) {
            return res.status(400).json('Invalid username or password');
        }

        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({ username, id: userDoc._id }, secret, {}, function (err, token) {
                if (err) {
                    console.error('JWT sign error:', err);
                    return res.status(500).json('Error creating token');
                }
                res.cookie('token', token).json({
                    id: userDoc._id,
                    username
                });
            });
        } else {
            res.status(400).json('Invalid username or password');
        }
    } catch (error) {
        console.error('Login endpoint error:', error);
        res.status(500).json('An error occurred during login');
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json("ok");
})
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    try {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);

        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json('Unauthorized: Token not found');
        }

        jwt.verify(token, secret, async (err, info) => {
            if (err) {
                console.error('Token verification error:', err); // Add detailed error logging
                return res.status(401).json('Invalid token');
            }

            const { title, summary, content } = req.body;

            const postDoc = await Post.create({
                title,
                summary,
                content,
                cover: newPath,
                author: info.id,
            })

            res.json(postDoc);
        });
    } catch (error) {
        console.error('Post endpoint error:', error);
        res.status(500).json('An error occurred in the post endpoint');
    }
});

app.get('/post', async (req, res) => {
    res.json(await Post.find({})
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(20)
    )
})

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate("author", ["username"]);
    res.json(postDoc);

})
app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            res.status(400).json('you are not the author');
        }
        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
        })
        res.json(postDoc)
    })

})
mongoose.connect("mongodb+srv://root:bdqhIHVgI1mN0NrR@cluster0.y6n2ajn.mongodb.net/?retryWrites=true&w=majority").then(
    app.listen(3000, () => {
        console.log(`App is connected database.`)
    })

)
