import Base from "./classes/FileDesign/Base.js";
import { Dependency } from "./types/Dependency.js";

export type HeadFiles = Map<Dependency, Base>;

abstract class BaseApp {
  preloadedFolders: string[] = [];
  preloadedHeadFiles: HeadFiles = new Map<Dependency, Base>();
  loaded: Base[] = [];
  protected abstract loadFolders(folder: string): Promise<boolean>;
  protected abstract loadHeadFiles(): Promise<boolean>;
  abstract load(folder: string): Promise<boolean>;
  abstract ensureDependency(dependency: Dependency): Promise<boolean>;
}

export default BaseApp;
