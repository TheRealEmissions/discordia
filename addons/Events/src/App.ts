import BaseApp from "./BaseApp.js";
import { DiscordEvents, GeneralEvents } from "./enums/CommonEvents.js";
import { EventTypes } from "./enums/EventTypes.js";

class App extends BaseApp {
  loadedEvents: any[] = [];
  constructor() {
    super();
  }

  @App.bind(GeneralEvents.INFO, EventTypes.ON)
  info(message: string) {
    console.debug("EVENTS => INFO => ", message);
  }

  init() {
    BaseApp.events.emit(GeneralEvents.INFO, "Events loaded");
  }

  static bind(
    eventName: GeneralEvents | DiscordEvents | string,
    type: EventTypes = EventTypes.ON
  ) {
    return (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) => {
      switch (type) {
        case EventTypes.ON:
          BaseApp.events.on(eventName, (...args: any[]) => {
            descriptor.value(...args);
          });
          break;
        case EventTypes.ONCE:
          BaseApp.events.once(eventName, (...args: any[]) => {
            descriptor.value(...args);
          });
          break;
      }
    };
  }
}

export default App;
