import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import routes from './src';
import * as swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import helmet from 'helmet';
import cors from 'cors';
import { connect } from './src/config'
const app = express();
const port = process.env.PORT ? process.env.PORT : 4000
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
connect();
    // create swagger documentation link
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    // call main routes given in src folder
app.use("/", routes);
    // create server with port given in .env file or 4000
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server Running here 👉 http://localhost:${port}`);
    });
}

export default app;