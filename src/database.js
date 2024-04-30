import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {    
    #database = {};

    constructor(){
        this.loadDatabase();
    }

    async loadDatabase() {
        try {
            const data = await fs.readFile(databasePath, "utf-8");
            this.#database = JSON.parse(data);
        } catch (error) {
            console.error("Error loading database:", error);
        }
    }
    
    async #persist() {        
        try {
            await fs.writeFile(databasePath, JSON.stringify(this.#database));
        } catch (error) {
            console.error("Error persisting database:", error);
        }
    }

    async insert(table, data) {
        if (!this.#database[table]) {
            this.#database[table] = [];
        }
        this.#database[table].push(data);
        await this.#persist();
        return data;
    }

    async select(table, search) {
        let data = this.#database[table] ?? []

        if(search){
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }

        return data
    }
}
