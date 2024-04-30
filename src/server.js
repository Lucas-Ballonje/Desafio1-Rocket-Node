import { createApp } from "./route.js";

const app = createApp();


app.listen(3333, () => {
    console.log("Funcionando");
})