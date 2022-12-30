import { HeadFile } from "ts-modular-bot-file-design";
import { Decorators, Dependency } from "ts-modular-bot-types";

abstract class BaseApp extends HeadFile {
  constructor() {
    super();
  }

  type = Dependency.COMMAND_HANDLER;
  name: string = "Command Handler";
  load = true;

  abstract init(): void;
  getDependencies(): Dependency[] {
    return [];
  }
}

export default BaseApp;
