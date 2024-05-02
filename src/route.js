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
        const { description, updated_at, completed_at } = req.query
        
        const task = database.select("tasks", title, {
            title,
            description,            
            completed_at
        })                     

        res.status(200).json(task); 
    })

    app.delete("/tasks/:id", (req, res) => {
        const { id } = req.params                    

        const isDelete = database.delete("tasks", id);
        
        if(isDelete){
            return res.writeHead(204).end()            
        } else {
            return res.status(404).json({ error: "ID não existe" })
        }

    })

    app.put("/tasks/:id", (req, res) => {
        const { id } = req.params;
        const { title, description } = req.body;
        const updated_at = new Date().toISOString();
    
        const task = database.select("tasks", id);
    
        if (!task) {
            return res.status(404).json({ error: "Tarefa não encontrada" });
        }
    
        if (!title && !description) {
            return res.status(400).json({ error: "É preciso o title e o description" });
        }
    
        const updatedData = { title, description, updated_at };
        database.update("tasks", id, updatedData);
    
        return res.status(204).end();

    })

    app.patch("/tasks/:id/complete", (req, res) => {        
        const { id } = req.params
        const task = database.select("tasks", id);
    
        if (!task) {
            return res.status(404).json({ error: "Tarefa não encontrada" });
        }

        const isCompleted = !task.completed_at;
        const updatedData = {
            completed_at: isCompleted ? new Date().toISOString() : null,
            updated_at: new Date().toISOString()
        }

        database.patch("tasks", id, updatedData)

        return res.status(204).end()
    })

    return app;
}
