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

    select(table, search) {
        let data = this.#database[table] ?? []        
        if(search) {
            data = data.filter(table => {
                return table.title?.toLowerCase() === search.toLowerCase();
            })
        }

        return data
    }

    delete(table, id){
        const rowIndex = this.#database[table].findIndex(row => row.id == id)
        if(rowIndex > -1){
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
            return true
        } else {
            return false
        }
    }
    update(table, id, data){
        const rowIndex = this.#database[table].findIndex(row => row.id == id)        
        if(rowIndex > -1){
            this.#database[table][rowIndex] = { 
                ...this.#database[table][rowIndex],
                ...data
            }
            this.#persist()
        }
    }
}
