import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import { PostgresSQLDatabase } from "./infrastructure/database/postgresql";

(()=>{

    main();

})()

async function main(){
  
    PostgresSQLDatabase.connect()
    .then(() => console.log("Database connected"))
    .catch((err) => { throw new Error("Database Prisma is not connected") });
   

    new Server({
        port: envs.PORT,
        routes: new AppRoutes().routes 
    })
    .start();
}