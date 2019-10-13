import {Handler, NextFunction, Request, Response} from 'express';
import {serverError} from '../status.json';

export default (fn: Handler) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next))
            .catch((error) => {
                console.log(error);
                res.sendStatus(serverError);
            });
    };