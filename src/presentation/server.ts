import express, { Router } from 'express';
import morgan from 'morgan';

interface Options{

    port?: number;
    routes: Router;
}

export class Server {

    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port = 3000, routes} = options;

        this.port = port;
        this.routes = routes;

    }

    async start(){

        //Middlewares
        this.app.use(morgan('dev'))
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(this.routes);

        this.app.listen(this.port, () =>{
            console.log(`Server listening on port ${this.port}`);
        })

    }
    
}