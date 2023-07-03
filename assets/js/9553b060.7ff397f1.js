"use strict";(self.webpackChunk_sensejs_sensejs_doc=self.webpackChunk_sensejs_sensejs_doc||[]).push([[831],{4852:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>y});var o=t(9231);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=o.createContext({}),s=function(e){var n=o.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},u=function(e){var n=s(e.components);return o.createElement(p.Provider,{value:n},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},m=o.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=s(t),m=r,y=c["".concat(p,".").concat(m)]||c[m]||d[m]||i;return t?o.createElement(y,a(a({ref:n},u),{},{components:t})):o.createElement(y,a({ref:n},u))}));function y(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,a=new Array(i);a[0]=m;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l[c]="string"==typeof e?e:r,a[1]=l;for(var s=2;s<i;s++)a[s]=t[s];return o.createElement.apply(null,a)}return o.createElement.apply(null,t)}m.displayName="MDXCreateElement"},685:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var o=t(6e3),r=(t(9231),t(4852));const i={id:"entrypoint",sidebar_pos:2},a="Entry point",l={unversionedId:"module/entrypoint",id:"module/entrypoint",title:"Entry point",description:"Every application has an entry point, in SenseJS, an entry point is a module.",source:"@site/docs/module/entry-point.md",sourceDirName:"module",slug:"/module/entrypoint",permalink:"/docs/module/entrypoint",draft:!1,editUrl:"https://github.com/sensejs/sensejs/edit/master/website/docs/module/entry-point.md",tags:[],version:"current",frontMatter:{id:"entrypoint",sidebar_pos:2},sidebar:"tutorialSidebar",previous:{title:"Defining Modules",permalink:"/docs/module/defining-modules"}},p={},s=[{value:"Utility applications",id:"utility-applications",level:2},{value:"Daemon applications",id:"daemon-applications",level:2},{value:"Conclusion",id:"conclusion",level:2}],u={toc:s},c="wrapper";function d(e){let{components:n,...t}=e;return(0,r.kt)(c,(0,o.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"entry-point"},"Entry point"),(0,r.kt)("p",null,"Every application has an entry point, in SenseJS, an entry point is a module."),(0,r.kt)("p",null,"Usually, applications can be divided into two categories: one is utility applications that run once and exits when\nthe job is done or failed; the other is long-running applications that keep running and waiting for requests,\na.k.a. daemons or servers."),(0,r.kt)("h2",{id:"utility-applications"},"Utility applications"),(0,r.kt)("p",null,"In SenseJS, such an application can be started through:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"@Module({ requires: [OtherModules] })\nclass MyApp {\n    main() {\n    }\n}\n\nApplicationRunner.instance.run(MyApp, 'main');\n")),(0,r.kt)("p",null,"the second argument of ",(0,r.kt)("inlineCode",{parentName:"p"},"ApplicationRunner.instance.run")," is the name of the entry function. Once the control-flow leaves\nthe ",(0,r.kt)("inlineCode",{parentName:"p"},"main")," function, the framework will destroy all components and exit the process."),(0,r.kt)("h2",{id:"daemon-applications"},"Daemon applications"),(0,r.kt)("p",null,"Such an application can be started through:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"@Module({ requires: [OtherModules] })\nclass MyApp {\n    @OnModuleStart()\n    onModuleStart() {\n        // Start listening for requests\n    }\n    @OnModuleStop()\n    onModuleStop() {\n        // Stop listening for requests\n    }\n}\nApplicationRunner.instance.start(MyApp);\n")),(0,r.kt)("p",null,"or through decorators:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"@Entrypoint()\n@Module({ requires: [OtherModules] })\nclass MyApp {\n  @OnModuleStart()\n  onModuleStart() {\n    // Start listening for requests\n  }\n  @OnModuleStop()\n  onModuleStop() {\n    // Stop listening for requests\n  }\n}\n")),(0,r.kt)("p",null,"In addition to the ",(0,r.kt)("inlineCode",{parentName:"p"},"@OnModuleCreated"),"/",(0,r.kt)("inlineCode",{parentName:"p"},"@OnModuleDestroyed")," hooks, applications running in this way will also invoke\n",(0,r.kt)("inlineCode",{parentName:"p"},"@OnModuleStart"),"/",(0,r.kt)("inlineCode",{parentName:"p"},"@OnModuleStop"),"."),(0,r.kt)("p",null,"Such an app will not exit until ",(0,r.kt)("inlineCode",{parentName:"p"},"ProcessManager.exit()")," is called or any exit signals are received. SenseJS also ensures\nall ",(0,r.kt)("inlineCode",{parentName:"p"},"@OnModuleStop")," hooks are invoked before the app exits."),(0,r.kt)("h2",{id:"conclusion"},"Conclusion"),(0,r.kt)("p",null,"A typical SenseJS application is a collection of modules. Some modules are organizing injectables, while some modules\nare managing initialization and de-initialization of I/O resources, and an entry module that depends on all the others.\nBased on the dependency graph of all the modules, SenseJS can gracefully start up and shut down your application."))}d.isMDXComponent=!0}}]);