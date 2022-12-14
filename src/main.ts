import {App} from "./app";
import {LoggerService} from "./logger/logger.service";
import {UsersController} from "./users/users.controller";
import {ExeptionFilter} from "./error/exeption.filter";
import {Container} from "inversify";
import {LoggerInterface} from "./logger/logger.interface";
import {TYPES} from "./types";
import {ExeptionFilterInterface} from "./error/exeption.filter.interface";


    // const logger = new LoggerService()
    // const app = new App(
    //     logger,
    //     new UsersController(logger),
    //     new ExeptionFilter(logger))
    // await app.init()
    const appContainer =new Container();
    appContainer.bind<LoggerInterface>(TYPES.LoggerInterface).to(LoggerService)
    appContainer.bind<ExeptionFilterInterface>(TYPES.ExeptionFilter).to(ExeptionFilter)
    appContainer.bind<UsersController>(TYPES.UsersController).to(UsersController)
    appContainer.bind<App>(TYPES.Application).to(App)
    const app = appContainer.get<App>(TYPES.Application)
     app.init()

export {app,appContainer}