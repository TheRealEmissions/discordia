Base of Modular Series
===

This is the Base of the Discord Modular Series. This Series attempts to create a fully modular, drop-in-and-go system for Discord Bots which enables developers to develop for a singular system. This system is designed to be as modular as possible, and as such, is designed to be as easy to use as possible.

Helper NPM Modules
===
The Base of Modular Series comes with a few helper modules to make your life easier. They often include abstract classes, interfaces and more. They'll help with development.

All commands start with `npm i --save`, following a space and:
- ts-modular-bot-file-design
- ts-modular-bot-types
- ts-modular-tsconfig

Both `ts-modular-bot-file-design` and `ts-modular-bot-types` are required modules for developing with the Modular Series. Not using them may result in errors. 

To ensure compatibility between modules, please ensure you are using the tsconfig.json file provided by `ts-modular-tsconfig`. This is a required module for developing with the Modular Series. Not using it may result in errors. You can import it into your own `tsconfig.json` with the following:
```json
{
  "extends": "ts-modular-tsconfig/tsconfig.json"
}
```

Helper Addons
===

Although you won't be implementing these addons into your specific addon, you'll still be able to access their functionality.
All addons contain a free types module that can be downloaded from NPM.

All addons' types follow the same pattern when published to NPM and will always be published by `realemissions`.
- Format: `ts-modular-bot-addon-<addon_name>-types`

For each module you wish to use, you should bind a variable to your BaseApp class (you can call this whatever you please):
```ts

import { Base } from 'ts-modular-bot-file-design';
import { Dependency, Decorators } from 'ts-modular-bot-types';

class BaseApp extends Base {
  // ...

  @Decorators.inject(Dependency.MyAddon)
  public myAddon!: MyAddon;

  // ...
}
```
where MyAddon refers to the interface provided by the types module you have downloaded.
You should then declare an injection using the `@inject(Dependency)` decorator as shown above where Dependency is the enum provided by `ts-modular-bot-types`. You may need to download the development version of `ts-modular-bot-types` if your addon is not yet published - development versions will contain all unpublished addons after request.

Addons that import one another will not approved. If two addons each want to import the other and contain functionality that would be useful, each author should contact one another to discuss the possibility of merging the two addons into one or abstracting their addons more and expanding their addons into more addons to allow the import of one another's addons.

Developing with the Modular Series
===

Full documentation can be found <here>.

As a TL;DR, all modules should follow this particular format and be coded in TypeScript where possible.
- The name of the folder for the addon should be descriptive enough to ensure just by reading it you are knowledgeable of what it is.
- You should have an index.ts file which exports the main class of the addon. (explained further down)
- You should have a `src` folder in the root of your addon.
- The `src` folder should contain:
  - `BaseApp.ts` which should be an abstract class and which extends `Base` from `ts-modular-bot-file-design`
  - `App.ts` which extends `BaseApp.ts`
  - Any other folders & files necessary for your project.
- `App.ts`'s main purpose is for functionality.
- `BaseApp.ts`'s main purpose is for definition.
- If you've setup your `tsconfig.json` correctly, you'll be able to compile to JavaScript using `npx tsc` - ensure you do this **prior** to posting a new update.
- As addons will not be ran directly, you do not need to worry about having an entry file in `package.json`.