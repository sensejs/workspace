"use strict";(self.webpackChunk_sensejs_sensejs_doc=self.webpackChunk_sensejs_sensejs_doc||[]).push([[312],{4852:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var r=n(9231);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),d=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=d(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=d(n),m=o,h=u["".concat(s,".").concat(m)]||u[m]||c[m]||a;return n?r.createElement(h,l(l({ref:t},p),{},{components:n})):r.createElement(h,l({ref:t},p))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[u]="string"==typeof e?e:o,l[1]=i;for(var d=2;d<a;d++)l[d]=n[d];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5464:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>c,frontMatter:()=>a,metadata:()=>i,toc:()=>d});var r=n(6e3),o=(n(9231),n(4852));const a={id:"hello-world",sidebar_position:2},l="Examples",i={unversionedId:"introduction/hello-world",id:"introduction/hello-world",title:"Examples",description:"In this article, we will show you what a SenseJS application looks like with two simple examples.",source:"@site/docs/introduction/examples.md",sourceDirName:"introduction",slug:"/introduction/hello-world",permalink:"/docs/introduction/hello-world",draft:!1,editUrl:"https://github.com/sensejs/sensejs/edit/master/website/docs/introduction/examples.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{id:"hello-world",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Installation",permalink:"/docs/introduction/installation"},next:{title:"Dependency Injection",permalink:"/docs/injection/"}},s={},d=[{value:"Set up",id:"set-up",level:2},{value:"Hello world",id:"hello-world",level:2},{value:"Dependency injection",id:"dependency-injection",level:2},{value:"RandomNumberModule",id:"randomnumbermodule",level:3},{value:"HttpModules",id:"httpmodules",level:3},{value:"Entrypoint",id:"entrypoint",level:3},{value:"Running",id:"running",level:3}],p={toc:d},u="wrapper";function c(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"examples"},"Examples"),(0,o.kt)("p",null,"In this article, we will show you what a SenseJS application looks like with two simple examples."),(0,o.kt)("p",null,"The code of the examples in this article can be found at ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/sensejs/sensejs/tree/master/examples/"},"examples"),"\nfolder in the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/sensejs/sensejs"},"SenseJS repository"),"."),(0,o.kt)("h2",{id:"set-up"},"Set up"),(0,o.kt)("p",null,"To run the example from the SenseJS repository, you need to install the dependencies first."),(0,o.kt)("p",null,"Note that the SenseJS repository uses ",(0,o.kt)("a",{parentName:"p",href:"https://pnpm.io/"},"pnpm")," as the package manager, so you should run the following"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"pnpm i -r\n")),(0,o.kt)("p",null,"to install the dependencies."),(0,o.kt)("p",null,"However, if you would like to write the code from scratch, you need to set up a Node.js project with the following\npackages installed."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"reflect-metadata"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"@sensejs/http"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"@sensejs/core"),". These packages are required to run this example.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"typescript"),". It should be the dev dependency of your project unless you have it installed globally.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Optionally include ",(0,o.kt)("inlineCode",{parentName:"p"},"ts-node")," in your dev dependencies, we'll use it to run the demo. you can also compile the source file\nmanually before running the app."))),(0,o.kt)("p",null,"Also, you need to configure the ",(0,o.kt)("inlineCode",{parentName:"p"},"tsconfig.json"),", as instructed in ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction/installation"},"the previous article"),"."),(0,o.kt)("h2",{id:"hello-world"},"Hello world"),(0,o.kt)("p",null,"There is only a single file named ",(0,o.kt)("inlineCode",{parentName:"p"},"main.ts")," in this example, with the following content."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"import 'reflect-metadata';\nimport {createKoaHttpModule, Controller, GET} from '@sensejs/http';\nimport {ApplicationRunner, ModuleClass, OnModuleCreate} from '@sensejs/core';\n\n@Controller('/')\nclass HelloWorldController {\n\n  @GET('/')\n  helloWorld() {\n    return 'hello world';\n  }\n\n}\n\n@ModuleClass({\n  requires: [\n    createKoaHttpModule({\n      components: [HelloWorldController],\n      httpOption: {\n        listenAddress: 'localhost',\n        listenPort: 8080,\n      }\n    })\n  ]\n})\nclass HelloWorldApp {\n\n  @OnModuleStart()\n  onModuleCreate() {\n    console.log('service started');\n  }\n}\n\nApplicationRunner.instance.start(HelloWorldApp);\n")),(0,o.kt)("p",null,"You can run this simple http service via"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"ts-node main.ts\n")),(0,o.kt)("p",null,"The above code create simple HTTP service that will listen at ",(0,o.kt)("inlineCode",{parentName:"p"},"localhost:8080"),"."),(0,o.kt)("p",null,"After starting it, you shall be able to visit ",(0,o.kt)("inlineCode",{parentName:"p"},"http://localhost:8080/")," with an HTTP client, e.g. curl, to see the\noutput from this app."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ curl localhost:8080\nhello world\n")),(0,o.kt)("p",null,"Each time we send an HTTP request to ",(0,o.kt)("inlineCode",{parentName:"p"},"http://localhost:8080/"),", an instance of ",(0,o.kt)("inlineCode",{parentName:"p"},"HelloWorldController")," will be\ninstantiated and the method ",(0,o.kt)("inlineCode",{parentName:"p"},"helloWorld")," will be invoked, and the return value will be sent back to the HTTP client."),(0,o.kt)("h2",{id:"dependency-injection"},"Dependency injection"),(0,o.kt)("p",null,"In this example, we will show you how dependency injection works."),(0,o.kt)("p",null,"The code of this example can be found at ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/sensejs/sensejs/tree/master/examples/injection"},"./examples/injection")),(0,o.kt)("p",null,"In this example, we separate the code into three parts."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"random-number.ts"),": contains a simple component ",(0,o.kt)("inlineCode",{parentName:"p"},"RandomNumberGenerator")," and a controller ",(0,o.kt)("inlineCode",{parentName:"p"},"RandomNumberController")," for querying or mutating the state\nof ",(0,o.kt)("inlineCode",{parentName:"p"},"RandomNumberGenerator"),", and exporting it as a module ",(0,o.kt)("inlineCode",{parentName:"p"},"RandomNumberModule"),".")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"http.module.ts"),": containing the code for setting up an HTTP server, including all middleware")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"index.ts"),": the entry point of the application, which imports ",(0,o.kt)("inlineCode",{parentName:"p"},"RandomNumberModule")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"HttpModule")," and start the\napplication."))),(0,o.kt)("h3",{id:"randomnumbermodule"},"RandomNumberModule"),(0,o.kt)("p",null,"In this section we focused on file ",(0,o.kt)("inlineCode",{parentName:"p"},"random-number.module.ts")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"@Component()\n@Scope(Scope.SINGLETON)\nclass RandomNumberGenerator {\n\n  private state: number = Date.now() >>> 0; // Truncate the value of Date.now() into a 32-bit integer\n\n  reseed(seed: number) {\n    this.state = seed >>>= 0;\n    return this.state;\n  }\n\n  query() {\n    return this.state;\n  }\n\n  next() {\n    this.state = (this.state * 64829 + 0x5555) >>> 0;\n    return this.state;\n  }\n}\n")),(0,o.kt)("p",null,"As you see, the class ",(0,o.kt)("inlineCode",{parentName:"p"},"RandomNumberGenerator")," is decorated with ",(0,o.kt)("inlineCode",{parentName:"p"},"@Component()"),", which makes it an injectable component."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"\n@Controller('/')\nclass RandomNumberController {\n\n  constructor(@Inject(RandomNumberGenerator) private generator: RandomNumberGenerator,\n              @InjectLogger() private logger: Logger) {}\n\n  @GET('state')\n  async get() {\n    const state = this.generator.query();\n    return {state};\n  }\n\n  @POST('next')\n  async nextRandom() {\n    const value = this.generator.next();\n    this.logger.info('Generated random number: ', value);\n    return {value};\n  }\n\n  @POST('reseed')\n  async reseed(@Body() body: any) {\n    const seed = Number(body?.seed);\n    if (!Number.isInteger(seed)) {\n      this.logger.warn('Invalid seed %s, ignored', seed);\n    } else {\n      this.generator.reseed(seed);\n    }\n    return {state: this.generator.query()};\n  }\n}\n\n")),(0,o.kt)("p",null,"The above class provides an HTTP controller to query or mutate the state of ",(0,o.kt)("inlineCode",{parentName:"p"},"RandomNumberGenerator"),", its constructor\nhas two parameters."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"the first one requires an instance of ",(0,o.kt)("inlineCode",{parentName:"li"},"RandomNumberGenerator"),", which is defined previously,"),(0,o.kt)("li",{parentName:"ul"},"and the second one requires an instance of ",(0,o.kt)("inlineCode",{parentName:"li"},"Logger"),".")),(0,o.kt)("p",null,"They will be instantiated and injected automatically when the controller is instantiated by the framework."),(0,o.kt)("p",null,"When handling requests, the framework will instantiate an instance of ",(0,o.kt)("inlineCode",{parentName:"p"},"RandomNumberController"),", and invoke the\nappropriate method, and if the method needs parameters, the framework will inject them automatically based on the\ndecorator of each parameter."),(0,o.kt)("p",null,"For example, when handling, ",(0,o.kt)("inlineCode",{parentName:"p"},"POST /seed"),", the ",(0,o.kt)("inlineCode",{parentName:"p"},"seed")," field from the request body will be injected as the parameter\ntoe the ",(0,o.kt)("inlineCode",{parentName:"p"},"reseed")," method."),(0,o.kt)("p",null,"At the end of this file, ",(0,o.kt)("inlineCode",{parentName:"p"},"RandomNumberGenerator")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"RandomNumberController")," are packaged into a module\n",(0,o.kt)("inlineCode",{parentName:"p"},"RandomNumberModule"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"\nexport const RandomNumberModule = createModule({\n  components: [RandomNumberGenerator, RandomNumberController]\n});\n")),(0,o.kt)("h3",{id:"httpmodules"},"HttpModules"),(0,o.kt)("p",null,"In this section, we focused on another file ",(0,o.kt)("inlineCode",{parentName:"p"},"./src/http.module.ts"),"."),(0,o.kt)("p",null,"We'll explain the content of this file in reverse order."),(0,o.kt)("p",null,"At the end of this file, a module is created by ",(0,o.kt)("inlineCode",{parentName:"p"},"createKoaHttpModule"),", just like what we did in the hello world example,\nbut this time two middlewares are added."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"export const HttpModule = createKoaHttpModule({\n  // We need to list RandomNumberModule here so that RandomNumberController can be discovered\n  requires: [SenseLogModule, RandomNumberModule],\n\n  // The order must not be changed, since REQUEST_ID is not defined before RequestIdMiddleware\n  middlewares: [\n    RequestIdMiddleware,\n    ContextualLoggingMiddleware\n  ],\n\n  httpOption: {\n    listenAddress: 'localhost',\n    listenPort: 8080,\n  },\n});\n\n")),(0,o.kt)("p",null,"There are two middleware defined prior to the HTTP module."),(0,o.kt)("p",null,"The first one, ",(0,o.kt)("inlineCode",{parentName:"p"},"RequestIdMiddleware")," assigns a request-id to each request, and bound it to a symbol ",(0,o.kt)("inlineCode",{parentName:"p"},"REQUEST_ID"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"import {randomUUID} from 'crypto';\n\nconst REQUEST_ID = Symbol('REQUEST_ID');\n\n@Middleware({\n  provides: [REQUEST_ID]\n})\nclass RequestIdMiddleware {\n\n  async intercept(next: (requestId: string) => Promise<void>) {\n    const requestId = randomUUID();\n    // The parameter passed to next() will be bound to REQUEST_ID\n    await next(requestId);\n  }\n}\n")),(0,o.kt)("p",null,"The second one, ",(0,o.kt)("inlineCode",{parentName:"p"},"ContextualLoggingMiddleware")," injects the request-id bound in previous middleware and attaches it to a\nlogger builder, and in fact it overrides the LoggerBuilder in this request, so all logger created in this request will\nshare the same request-id, and their output can be grouped by the request-id easily. This is very useful when you want\nto distinguish the logs from different concurrent requests."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"\n@Middleware({\n  provides: [LoggerBuilder]\n})\nclass ContextualLoggingMiddleware {\n\n  constructor(\n    // It'll be injected with a value provided by the previous interceptor\n    @Inject(REQUEST_ID) private requestId: string,\n    // It'll be injected with the LoggerBuilder defined in the global\n    @InjectLogger() private logger: Logger\n  ) {}\n\n  async intercept(next: (lb: LoggerBuilder) => Promise<void>) {\n    this.logger.debug('Associate LoggerBuilder with requestId=%s', this.requestId);\n    const slb = defaultLoggerBuilder.setTraceId(this.requestId);\n    // The parameter passed to next() will be bound to LoggerBuilder\n    await next(slb);\n  }\n\n}\n\n")),(0,o.kt)("h3",{id:"entrypoint"},"Entrypoint"),(0,o.kt)("p",null,"In the entry file, we need to import ",(0,o.kt)("inlineCode",{parentName:"p"},'"reflect-metadata"')," at the first place. Then we just create a module and mark it\nas an entrypoint."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"import 'reflect-metadata';\nimport {EntryPoint, ModuleClass} from '@sensejs/core';\nimport {HttpModule} from './http.js';\n\n@EntryPoint()\n@ModuleClass({\n  requires: [\n    HttpModule\n  ],\n})\nclass App {\n}\n\n")),(0,o.kt)("p",null,"That's it."),(0,o.kt)("h3",{id:"running"},"Running"),(0,o.kt)("p",null,"You can run this app and send requests with curl, you'll see output like this"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'% curl http://localhost:8080/state\n{"state":4005820056}\n\n% curl http://localhost:8080/next -XPOST\n{"value":2405846925}\n\n% curl http://localhost:8080/next -XPOST\n{"value":1207935726}\n\n% curl http://localhost:8080/reseed -d \'seed=1111\'\n{"state":1111}\n\n% curl http://localhost:8080/reseed -d \'seed=invalid\'\n{"state":1111}\n\ncurl http://localhost:8080/next -XPOST\n{"value":72046864}\n\n')),(0,o.kt)("p",null,"On the application log, you'll see something like"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"+ 16:51:05.494 ContextualLoggingMiddleware - | Associate LoggerBuilder with requestId=25c469ea-2c9f-4ade-9d1f-a2603e509402\n+ 16:51:09.609 ContextualLoggingMiddleware - | Associate LoggerBuilder with requestId=19ad7258-08b6-4fec-8d0b-042067fa5bf8\n+ 16:51:09.609 RandomNumberController 19ad7258-08b6-4fec-8d0b-042067fa5bf8 | Generated random number:  2405846925\n+ 16:51:11.922 ContextualLoggingMiddleware - | Associate LoggerBuilder with requestId=9b9c909b-ba79-48f2-8fa4-febd39dc781f\n+ 16:51:11.923 RandomNumberController 9b9c909b-ba79-48f2-8fa4-febd39dc781f | Generated random number:  1207935726\n+ 16:51:16.972 ContextualLoggingMiddleware - | Associate LoggerBuilder with requestId=fa3c6df8-ccca-48d4-85ba-88520ca98986\n+ 16:51:20.076 ContextualLoggingMiddleware - | Associate LoggerBuilder with requestId=7d840e09-f95d-48e2-b398-e60cf192e801\n+ 16:51:20.077 RandomNumberController 7d840e09-f95d-48e2-b398-e60cf192e801 | Invalid seed NaN, ignored\n+ 16:51:22.194 ContextualLoggingMiddleware - | Associate LoggerBuilder with requestId=67ce037b-5d64-4a16-a57d-fba78ceed8f8\n+ 16:51:22.194 RandomNumberController 67ce037b-5d64-4a16-a57d-fba78ceed8f8 | Generated random number:  72046864\n")))}c.isMDXComponent=!0}}]);