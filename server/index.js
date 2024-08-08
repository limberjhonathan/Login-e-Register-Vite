import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

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

app.post("/register", (req, res) => {
    const username = req.body.UserName;
    const email = req.body.Email;
    const password = req.body.Password;

    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const values = [username, email, password];
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

    const sql = "SELECT * FROM users WHERE username = ? && password = ?";
    const values = [sentloginUserName, sentloginPassword];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.json({ error: err}); 
        }
        if(results.length > 0){
            res.send(results)
        }else{
            res.send({message: 'Creadentials Don`t match!' })
        }
    });
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
