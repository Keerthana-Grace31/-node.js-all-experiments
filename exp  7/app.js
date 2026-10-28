const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());

const db= mysql.createPool({
    host: "localhost",
    user: "root",
    password:"1234",
    database: "25WH1A05P1"
});

db.getConnection()
    .then((connection) => {
        console.log("MYSQL Connected");
        connection.release();
    })
    .catch(error => {
        console.log("MYSQL Connection Failed: ", error.message);
    });

    app.get("/", (req, res) => {
        res.send("Welcome to Student API");
    });
    //get
    app.get("/Students", async (req, res) => {
        try {
            const [rows] = await db.execute("SELECT * FROM Students");
            res.json(rows);
        } catch (error) {
            
            res.send("Database Error: " + error.message);
        }
    });
    //post 
    app.post("/Students", async (req, res) => {
        try {
            const { Rollno,Name, Age,} = req.body;
           
            await db.execute("INSERT INTO Students (Rollno, Name, Age) VALUES (?, ?, ?)", [Rollno, Name, Age]);
            res.send("Student added successfully");
        } catch (error) {
            res.status(500).send("Database Error: " + error.message);
        }
    });
    //put
    app.put("/Students/:id", async (req, res) => {
        try {
            const { Rollno,Name, Age } = req.body;
           await db.execute("UPDATE Students SET Rollno = ?, Name = ?, Age = ? WHERE id = ?", [Rollno, Name, Age, req.params.id]);
            res.send("Student updated successfully");
        } catch (error) {
            res.send("Database Error: " + error.message);
        }
    });
    //Delete
    app.delete("/Students/:id", async (req, res) => {
        try {
            await db.execute("DELETE FROM Students WHERE id = ?", [req.params.id]);
            res.send("Student deleted successfully");
        } catch (error) {
            res.send("Database Error: " + error.message);
        }
    });
    

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
