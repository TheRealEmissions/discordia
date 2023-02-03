Base of Discordia
===

This is the Base of Discordia. Discordia attempts to create a fully modular, drop-in-and-go system for Discord Bots which enables developers to develop for a singular system. This system is designed to be as modular as possible, and as such, is designed to be as easy to use as possible.

Helper NPM Modules
===
The Base of Modular Series comes with a few helper modules to make your life easier. They often include abstract classes, interfaces and more. They'll help with development.

All commands start with `npm i --save`, following a space and:
- discordia-file-design
- discordia-types
- discordia-tsconfig

Both `discordia-file-design` and `discordia-types` are required modules for developing with the Modular Series. Not using them may result in errors. 

To ensure compatibility between modules, please ensure you are using the tsconfig.json file provided by `discordia-tsconfig`. This is a required module for developing with the Modular Series. Not using it may result in errors. You can import it into your own `tsconfig.json` with the following:
```json
{
  "extends": "discordia-tsconfig/tsconfig.json"
}
```

Helper Addons
===

Although you won't be implementing these addons into your specific addon, you'll still be able to access their functionality.
All addons contain a free types module that can be downloaded from NPM.

All addons' types follow the same pattern when published to NPM and will always be published by `realemissions`.
- Format: `discordia-<addonname>-types`

For each module you wish to use, you should bind a variable to your BaseApp class (you can call this whatever you please):
```ts

import { Base } from 'discordia-file-design';
import { Dependency, Dependencies } from 'discordia-types';

class BaseApp extends Base {
  // ...

  @Dependencies.inject(Dependency.MY_ADDON)
  static myAddon!: MyAddon;

  // ...
}
```
where MyAddon refers to the interface provided by the types module you have downloaded.
You should then declare an injection using the `@Dependencies.inject(Dependency)` decorator as shown above where Dependency is the enum provided by `discordia-types`. You may need to download the development version of `discordia-types` if your addon is not yet published - development versions will contain all unpublished addons after request.

Addons that import one another will not approved. If two addons each want to import the other and contain functionality that would be useful, each author should contact one another to discuss the possibility of merging the two addons into one or abstracting their addons more and expanding their addons into more addons to allow the import of one another's addons.

Availability of the injection occurs after the first call of init(). You should not attempt to use the injection before this point.

Developing with the Modular Series
===

Full documentation can be found <here>.

As a TL;DR, all modules should follow this particular format and be coded in TypeScript.
- The name of the folder for the addon should be descriptive enough to ensure just by reading it you are knowledgeable of what it is.
- You should have an index.ts file which exports the main class of the addon as default and any further exports necessary, such as enums. (explained further down)
- You should have a `src` folder in the root of your addon.
- The `src` folder should contain:
  - `BaseApp.ts` which should be an abstract class and which extends `Base` from `ts-modular-bot-file-design`
  - `App.ts` which extends `BaseApp.ts`
  - Any other folders & files necessary for your project.
- `App.ts`'s main purpose is for functionality.
- `BaseApp.ts`'s main purpose is for definition.
- If you've setup your `tsconfig.json` correctly, you'll be able to compile to JavaScript using `npx tsc` - ensure you do this **prior** to posting a new update.
- Your package.json entry file should be `out/index.js`
- Your package.json types property should be `types/<addon>/index.d.ts`
- Your package.json type property should be `module` (import and export is superior!)

Get setup fast
===

Run this command in terminal to get setup fast with addon creation:

`git clone therealemissions/discordia-template`

This will get you setup immediately with all the files you need. You should then run

`npm i --save`