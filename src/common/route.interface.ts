import {NextFunction,Response,Request,Router} from "express";

export interface IRouteController {
    path: string;
    func: (req: Request, res: Response, next: NextFunction) => void;
    method:keyof Pick<Router,'get' | 'post' | 'delete' | 'patch' | 'put'>
}