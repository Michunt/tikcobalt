import serverless from 'serverless-http';
import { app } from '../../api/src/cobalt.js';

export const handler = serverless(app);

