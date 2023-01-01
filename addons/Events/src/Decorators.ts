import BaseApp from "./BaseApp.js";
import { GeneralEvents, DiscordEvents } from "./enums/CommonEvents.js";
import { EventTypes } from "./enums/EventTypes.js";

class Decorators {
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

export default Decorators;
