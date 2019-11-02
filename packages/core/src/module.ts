import {Abstract, ComponentFactory, ComponentScope, ConstantProvider, Constructor, FactoryProvider} from './interfaces';
import {AsyncContainerModule, Container, decorate, injectable, interfaces} from 'inversify';
import {getComponentMetadata} from './component';


@injectable()
export abstract class ModuleClass {

    // constructor(private container: Container) {
    //
    // }

    async onCreate(container: Container): Promise<void> {
    }

    async onDestroy(container: Container): Promise<void> {
    }
}

export type ModuleConstructor = Constructor<ModuleClass, []>;

export interface ModuleOption {
    /**
     * Dependencies of this module, must be decorated
     */
    requires?: ModuleConstructor[],

    /**
     * Components provided by this module
     */
    components?: (Constructor<unknown> | Abstract<unknown>)[],

    factories?: FactoryProvider<unknown>[],

    constants?: ConstantProvider<unknown>[],
}

export interface ModuleMetadata {
    requires: ModuleConstructor[];
}

const MODULE_REFLECT_SYMBOL: unique symbol = Symbol('MODULE_REFLECT_SYMBOL');

export function getModuleMetadata(target: ModuleConstructor): ModuleMetadata {
    const result = Reflect.getMetadata(MODULE_REFLECT_SYMBOL, target);
    if (!result) {
        throw new Error('target is not decorated with @Module annotation');
    }
    return result;
}

export function setModuleMetadata(module: ModuleConstructor, metadata: ModuleMetadata) {

    decorate(injectable(), module);

    for (const module of metadata.requires) {
        if (!Reflect.getMetadata(MODULE_REFLECT_SYMBOL, module)) {
            throw new Error('This module are requiring an invalid module');
        }
    }
    Reflect.defineMetadata(MODULE_REFLECT_SYMBOL, metadata, module);
}


export function Module(spec: ModuleOption = {}): ModuleConstructor {
    const componentList = spec.components || [];
    const factories = spec.factories || [];
    const constants = spec.constants || [];

    const containerModule = new AsyncContainerModule(async (bind, unbind, isBound, rebind) => {
        constants.forEach((constantProvider) => {
            bind(constantProvider.provide).toConstantValue(constantProvider.value);
        });
        await Promise.all(
            componentList
                .map(getComponentMetadata)
                .map(async metadata => {
                    return metadata.onBind(bind, unbind, isBound, rebind);
                }));
        factories.forEach((factoryProvider: FactoryProvider<unknown>) => {
            const {provide, scope, factory} = factoryProvider;
            const binding = bind(provide).toDynamicValue((context: interfaces.Context) => {
                const factoryInstance = context.container.resolve<ComponentFactory<unknown>>(factory);
                return factoryInstance.build(context);
            });
            switch (scope) {
            case ComponentScope.REQUEST:
                binding.inRequestScope();
                break;
            case ComponentScope.SINGLETON:
                binding.inSingletonScope();
                break;
            default:
                binding.inTransientScope();
                break;
            }
        });
    });


    const moduleConstructor: ModuleConstructor = (class extends ModuleClass {

        async onCreate(container: Container) {
            return container.loadAsync(containerModule);
        }

        async onDestroy(container: Container) {
            return container.unload(containerModule);
        }
    });

    setModuleMetadata(moduleConstructor, {
        requires: spec.requires || [],
    });
    return moduleConstructor;
}


