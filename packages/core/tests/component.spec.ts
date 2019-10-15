import 'reflect-metadata';
import {Component, ComponentFactory, getComponentMetadata} from '../src/component';
import {AsyncContainerModule, Container, injectable, interfaces} from 'inversify';
import {ComponentMetadata} from '../src/interfaces';

async function mockBind<T>(metadata: ComponentMetadata<T>) {
    const container: Container = new Container({skipBaseClassChecks: true});
    container.load(new AsyncContainerModule(async (bind, unbind, isBound, rebind) => {
        await metadata.onBind(bind, unbind, isBound, rebind);
    }));
    return container;
}


describe('Component', () => {


    test('getComponent', async () => {
        @Component()
        class MyComponent {
        }

        const metadata = getComponentMetadata(MyComponent);
        const container = await mockBind(metadata);
        expect(container.get(MyComponent)).toBeInstanceOf(MyComponent);

        class NonComponent {
        }

        expect(() => getComponentMetadata(NonComponent)).toThrow();


    });

    test('Component using string as id', async () => {
        const id = Date.now().toString();

        @Component({id})
        class MyComponent {
        }

        const metadata = getComponentMetadata(MyComponent);
        const container = await mockBind(metadata);
        expect(container.get(id)).toBeInstanceOf(MyComponent);

    });

    test('Component using symbol as id', async () => {
        const id = Symbol();

        @Component({id})
        class MyComponent {
        }

        const metadata = getComponentMetadata(MyComponent);
        const container = await mockBind(metadata);
        expect(container.get(id)).toBeInstanceOf(MyComponent);
    });

    test('Component using symbol as id', async () => {
        abstract class BaseClass {

        }

        @Component({id: BaseClass})
        class MyComponent extends BaseClass {
        }

        const metadata = getComponentMetadata(MyComponent);
        const container = await mockBind(metadata);
        expect(container.get(BaseClass)).toBeInstanceOf(MyComponent);

    });
    test('Component explicit using self as component id', async () => {
        @Component({id: MyComponent})
        class MyComponent {
        }

        const metadata = getComponentMetadata(MyComponent);
        const container = await mockBind(metadata);
        expect(container.get(MyComponent)).toBeInstanceOf(MyComponent);

    });

    test('Component cannot using non-base class as component id', () => {
        expect(() => {
            abstract class BaseClass {

            }

            @Component({id: BaseClass})
            class MyComponent {
            }

        }).toThrow();
    });
});

describe('Component.Factory', () => {
    test('Factory', async () => {

        @injectable()
        class MyComponent {
        }

        @Component.Factory({provide: MyComponent})
        class Factory extends ComponentFactory<MyComponent> {

            build(context: interfaces.Context): MyComponent {
                return new MyComponent();
            }
        }

        const metadata = getComponentMetadata(Factory);
        const container = await mockBind(metadata);

        expect(container.get(MyComponent)).toBeInstanceOf(MyComponent);
    });

});
