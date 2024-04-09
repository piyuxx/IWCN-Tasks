const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const app = express();
//path.resolve()
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 3306;
const db = mysql.createConnection({
    host: "bmidsmaajxzllss82tvh-mysql.services.clever-cloud.com",
    user: "uydngimqprcr4hkl",
    password: "s3eBJXFav9yD3OwGUYl9",
    database: "bmidsmaajxzllss82tvh",
});
app.use((req, res, next) => {
    // Allow requests from all origins
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Set allowed HTTP methods
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    // Set allowed headers
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    // Continue to next middleware
    next();
});

app.post("/add_user", (req, res) => {
    const sql =
        "INSERT INTO notes_detail (`title`,`description`) VALUES (?, ?)";
    const values = [req.body.title, req.body.description];
    db.query(sql, values, (err, result) => {
        if (err)
            return res.json({ message: "Something unexpected has occured" + err });
        return res.json({ success: "Student added successfully" });
    });
});

app.get("/students", (req, res) => {
    const sql = "SELECT * FROM notes_detail";
    db.query(sql, (err, result) => {
        if (err) res.json({ message: "Server error" });
        return res.json(result);
    });
});

app.get("/get_student/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM student_details WHERE `id`= ?";
    db.query(sql, [id], (err, result) => {
        if (err) res.json({ message: "Server error" });
        return res.json(result);
    });
});

app.post("/edit_user/:id", (req, res) => {
    const id = req.params.id;
    const sql =
        "UPDATE student_details SET `name`=?, `email`=?, `age`=?, `gender`=? WHERE id=?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender,
        id,
    ];
    db.query(sql, values, (err, result) => {
        if (err)
            return res.json({ message: "Something unexpected has occured" + err });
        return res.json({ success: "Student updated successfully" });
    });
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM notes_detail WHERE id=?";
    const values = [id];
    db.query(sql, values, (err, result) => {
        if (err)
            return res.json({ message: "Something unexpected has occured" + err });
        return res.json({ success: "Student updated successfully" });
    });
});

app.listen(port, () => {
    console.log(`listening on port ${port} `);
});