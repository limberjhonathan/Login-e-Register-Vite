import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'plantdb',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

const SECRET_KEY = '838HHJSK_*&2sol2)ks';

const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1m' });
};

app.post("/register", async (req, res) => {
    const username = req.body.UserName;
    const email = req.body.Email;
    const password = req.body.Password;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const values = [username, email, hashedPassword];
    db.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.json({ Error: "Error" }); 
        } else {
            return res.json({ Success: "User registered successfully" });
        }
    });
});

app.post("/login", (req, res)=>{
    const sentloginUserName = req.body.LoginUserName
    const sentloginPassword = req.body.LoginPassword

    const sql = "SELECT * FROM users WHERE username = ?";

    db.query(sql, [sentloginUserName], async (err, results) => {
        if (err) {
            console.log(err);
            return res.json({ error: err }); 
        }

        if (results.length > 0) {
            const user = results[0];
            const match = await bcrypt.compare(sentloginPassword, user.password);

            if (match) {
                const token = generateToken(user);
                // console.log("---->", token)
                res.send({ message: 'Login successful', user: user, results: results, token});
            } else {
                res.send({ message: 'Credentials don’t match!' });
            }
        } else {
            res.send({ message: 'User not found!' });
        }
    });
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
