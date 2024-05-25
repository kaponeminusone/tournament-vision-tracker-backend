import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(()=>{

    main();

})()

async function main(){
    //TODO: await base de datos

    new Server({
        port: envs.PORT,
        routes: new AppRoutes().routes 
    })
    .start();
}