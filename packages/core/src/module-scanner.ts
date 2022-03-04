import {ModuleMetadata, ModuleMetadataLoader} from './module.js';
import {Constructor} from './interfaces.js';

export class ModuleScanner {
  public constructor(private entryModule: Constructor, private loader: ModuleMetadataLoader) {}

  scanModule(callback: (metadata: ModuleMetadata) => void): void {
    const visitedModules = new Set<Constructor>();
    const queue: Constructor[] = [this.entryModule];
    for (;;) {
      const moduleToVisit = queue.pop();
      if (typeof moduleToVisit === 'undefined') {
        return;
      }
      if (visitedModules.has(moduleToVisit)) {
        continue;
      }
      const metadata = this.loader.get(moduleToVisit);

      for (const dependency of metadata.requires) {
        if (!visitedModules.has(dependency)) {
          queue.push(dependency);
        }
      }

      callback(metadata);
      visitedModules.add(moduleToVisit);
    }
  }
}