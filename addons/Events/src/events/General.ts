import Decorators from "../Decorators.js";
import { GeneralEvents as GeneralEventsEnum } from "../enums/CommonEvents.js";
import { EventTypes } from "../enums/EventTypes.js";
import Logger from "ts-logger";

class GeneralEvents {
  @Decorators.bind(GeneralEventsEnum.INFO, EventTypes.ON)
  static on(message: string, ...args: string[]) {
    Logger.log(message, "INFO", ...args);
  }

  @Decorators.bind(GeneralEventsEnum.DEBUG, EventTypes.ON)
  static debug(message: string, ...args: string[]) {
    Logger.log(message, "DEBUG", ...args);
  }

  @Decorators.bind(GeneralEventsEnum.WARN, EventTypes.ON)
  static warn(message: string, ...args: string[]) {
    Logger.warn(message, "WARN", ...args);
  }

  @Decorators.bind(GeneralEventsEnum.ERROR, EventTypes.ON)
  static error(message: string, ...args: string[]) {
    Logger.internalError(message, "ERROR", ...args);
  }

  @Decorators.bind(GeneralEventsEnum.USER_ERROR, EventTypes.ON)
  static userError(message: string, ...args: string[]) {
    Logger.userError(message, "USER ERROR", ...args);
  }
}

export default GeneralEvents;
