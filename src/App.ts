import BaseApp from "./BaseApp.js";
import FS from "fs-extra-promise";
import Base from "./classes/FileDesign/Base.js";
import Logger from "./utils/Logger/Logger.js";
import ChildProcess from "child_process";
import "reflect-metadata";
import Path from "path";
import { Dependency, Dependencies } from "ts-modular-bot-types";

class App extends BaseApp {
  constructor() {
    super();
    this.load(Path.resolve("./addons"));
  }

  async load(folder: string) {
    // load all module folders
    const foldersLoaded = await this.loadFolders(folder);
    if (!foldersLoaded) {
      return false;
    }

    // load all the head files from the modules
    const headFilesLoaded = await this.loadHeadFiles();
    if (!headFilesLoaded) {
      return false;
    }

    const npmPackages = await Promise.all(
      this.preloadedFolders.map((x) => this.loadNpmPackages(x))
    );
    if (!npmPackages.every((x) => x)) {
      Logger.internalError(
        "Cannot load all npm packages for one or more of your addons!"
      );
      return false;
    }

    // ensure the dependencies are loaded too
    for (const head of this.preloadedHeadFiles.values()) {
      const dependencies = head.getDependencies();
      Logger.log(`Head: ${head.name} | Dependencies: ${dependencies}`);
      let hasAllDependencies = true;
      const missingDependencies: Dependency[] = [];
      for (const dependency of dependencies) {
        const hasDependency = await this.ensurePreloadedDependency(dependency);
        if (!hasDependency) {
          if (hasAllDependencies) hasAllDependencies = false;
          missingDependencies.push(dependency);
        }
      }
      if (!hasAllDependencies) {
        head.setLoad(false);
        Logger.userError(
          `Cannot load ${
            head.name
          }! Please remove or fix. Missing dependencies: \n${missingDependencies
            .map((x) => Dependency[x])
            .map((x) =>
              x
                .split("_")
                .map((y) => y[0].toUpperCase() + y.slice(1).toLowerCase())
                .join(" ")
            )
            .join("\n")}`
        );
      }
    }

    // inject dependencies
    for (const head of this.preloadedHeadFiles.values()) {
      const entries = head.vars;
      if (!entries) continue;
      for (const [target, key] of entries) {
        const data = Reflect.getMetadata(key, target);
        if (!data) continue;
        const val = data[key].injectWith as Dependency | null;
        if (val === null) continue;
        const dependency = this.preloadedHeadFiles.get(val);
        if (!dependency) continue;
        Object.assign(target, {
          [key]: dependency,
        });
      }
    }

    // load all files
    for (const head of this.preloadedHeadFiles.values()) {
      if (!head.load) continue;
      const isLoadedAlready = await this.ensureDependency(head.type);
      if (isLoadedAlready) continue;
      const loaded = await this.initModule(head.type);
      if (!loaded) {
        Logger.internalError(`Cannot load ${head.name}!`);
        continue;
      }
    }
    return true;
  }

  protected loadNpmPackages(folder: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const isPackageJson = await FS.existsAsync(
        `./addons/${folder}/package.json`
      );
      if (!isPackageJson) return resolve(true);

      ChildProcess.exec(
        `cd "./addons/${folder}" && npm install`,
        (err, stdout, stderr) => {
          if (err) {
            Logger.internalError(`Cannot load npm packages for ${folder}!`);
            return resolve(false);
          }
          Logger.log(stdout);
          return resolve(true);
        }
      );

      // const childProcess = ChildProcess.spawn(`npm install`, {
      //   cwd: `./addons/${folder}`,
      // });
      // childProcess.on("message", (m, handle) => {
      //   Logger.log(m.toString());
      // });
      // childProcess.once("exit", () => {
      //   return resolve(true);
      // });
      // childProcess.once("error", () => {
      //   return resolve(false);
      // });
    });
  }

  protected async initModule(type: Dependency): Promise<boolean> {
    const head = this.preloadedHeadFiles.get(type);
    if (!head) {
      Logger.internalError(`Cannot find head file for ${Dependency[type]}!`);
      return false;
    }

    const dependencies = head.getDependencies();
    for (const dependency of dependencies) {
      const isLoadedAlready = await this.ensureDependency(dependency);
      if (isLoadedAlready) continue;
      const loaded = await this.initModule(dependency);
      if (!loaded) {
        return false;
      }
    }
    try {
      await head.init();
    } catch (error) {
      return false;
    }
    this.loaded.push(head);
    return true;
  }

  protected async loadFolders(folder: string) {
    const subfolders = await FS.readdirAsync(folder);
    Logger.log(`Subfolders: ${subfolders}`);
    for (const folder in subfolders) {
      const isFolder = FS.statSync(
        `./addons/${subfolders[folder]}`
      ).isDirectory();
      if (!isFolder) {
        delete subfolders[folder];
      }
    }
    this.preloadedFolders.push(...subfolders.filter((x) => x !== undefined));
    return true;
  }

  // some change to test repo rename

  protected async loadHeadFiles(): Promise<boolean> {
    for (const folder of this.preloadedFolders) {
      try {
        const headFile: Base = (
          await import(`../../addons/${folder}/out/index.js`)
        ).default;
        Logger.log(
          "Loaded head file // ",
          headFile.name,
          " // ",
          headFile.type
        );
        if (!headFile.load) continue;
        this.preloadedHeadFiles.set(headFile.type, headFile);
      } catch (e) {
        Logger.internalError((e as Error).message, (e as Error).stack);
        continue;
      }
    }
    return true;
  }

  public async ensurePreloadedDependency(
    dependency: Dependency
  ): Promise<boolean> {
    return this.preloadedHeadFiles.has(dependency);
  }

  public async ensureDependency(dependency: Dependency): Promise<boolean> {
    return this.loaded.some((x) => x.type === dependency);
  }
}

export default App;
