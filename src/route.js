import { randomUUID } from "crypto";
import express from "express";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/buildRoutePath.js"

export function createApp() {
    const app = express();

    app.use(express.json());

    const database = new Database()

    app.post("/tasks", (req, res) => {
        const { title, description, updated_at } = req.body;

        const date = new Date();

        const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');

        const task = {
            id: randomUUID(),
            title,
            description,
            created_at: formattedDate,
            completed_at: null,
            updated_at,
        };

        database.insert("tasks", task);


        res.status(201).json(task);
    });

    app.get("/tasks", (req, res) => {
        const { search } = req.query
        
        const task = database.select("tasks", search ? {
            id: search,
            title: search,
            description: search,
            created_at: search,
            completed_at: search,
            updated_at: search,
            
        } : null)        

        res.status(200).json(task); 
    })

    app.get("/tasks/:title", (req, res) => {

        const { title } = req.params        
        const search = req.body
        
        const task = database.select("tasks/:title", title, {
            description: search,
            updated_at: search
        })                     
        
        console.log(req.params);

        res.status(200).json(task); 
    })

    return app;
}
