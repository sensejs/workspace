"use strict";(self.webpackChunk_sensejs_sensejs_doc=self.webpackChunk_sensejs_sensejs_doc||[]).push([[847],{4852:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>h});var o=t(9231);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,o,i=function(e,n){if(null==e)return{};var t,o,i={},r=Object.keys(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var s=o.createContext({}),p=function(e){var n=o.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},d=function(e){var n=p(e.components);return o.createElement(s.Provider,{value:n},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},u=o.forwardRef((function(e,n){var t=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=p(t),u=i,h=c["".concat(s,".").concat(u)]||c[u]||m[u]||r;return t?o.createElement(h,a(a({ref:n},d),{},{components:t})):o.createElement(h,a({ref:n},d))}));function h(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var r=t.length,a=new Array(r);a[0]=u;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l[c]="string"==typeof e?e:i,a[1]=l;for(var p=2;p<r;p++)a[p]=t[p];return o.createElement.apply(null,a)}return o.createElement.apply(null,t)}u.displayName="MDXCreateElement"},8754:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>a,default:()=>m,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var o=t(6e3),i=(t(9231),t(4852));const r={id:"method-invoking",sidebar_position:3},a="Method Invoker",l={unversionedId:"injection/method-invoking",id:"injection/method-invoking",title:"Method Invoker",description:"Except for start up, almost all dependency injections is triggered by the method invoker, especially for daemon",source:"@site/docs/injection/method-invoker.md",sourceDirName:"injection",slug:"/injection/method-invoking",permalink:"/docs/injection/method-invoking",draft:!1,editUrl:"https://github.com/sensejs/sensejs/edit/master/website/docs/injection/method-invoker.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{id:"method-invoking",sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Injection Scope",permalink:"/docs/injection/injection-scope"},next:{title:"Module",permalink:"/docs/module/"}},s={},p=[{value:"Example",id:"example",level:2},{value:"Explanation",id:"explanation",level:2}],d={toc:p},c="wrapper";function m(e){let{components:n,...t}=e;return(0,i.kt)(c,(0,o.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"method-invoker"},"Method Invoker"),(0,i.kt)("p",null,"Except for start up, almost all dependency injections is triggered by the method invoker, especially for daemon\napplications."),(0,i.kt)("p",null,"As mentioned before, the method invoker is the core of SenseJS framework, functionalities in SenseJS including\nbut not limited to HTTP-support are based on it."),(0,i.kt)("p",null,"This article will guide you on how to use the method invoker."),(0,i.kt)("h2",{id:"example"},"Example"),(0,i.kt)("p",null,"The following example shows how to invoke a method of a component with the help of the method invoker."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"const symbol1 = Symbol();\nconst symbol2 = Symbol();\n\n@Component()\nclass TargetComponent {\n  targetMethod(\n    @Inject('foobar') foobar: string, // will get 'FOOBAR' from FooMiddleware\n    @Inject(symbol1) foo: string,     // will get 'FOO' from the first argument of `invoke`\n    @Inject(symbol2) bar: string,     // will get 'BAR' from the second argument of `invoke`\n  ) {\n    console.log(foo, bar, foobar);\n  }\n}\n\n@Middleware({\n  provides: ['foobar']\n})\nclass FooMidlleware {\n  constructor(@Inject(symbol1) private foo: string, @Inject(symbol2) private bar: string) {\n\n  }\n\n  async handle(next: (foo: string) => Promise<void>) {\n    await next(this.foo + this.bar);\n  }\n}\n\n@EntryPoint()\n@Module({\n  components: [TargetComponent]\n})\nclass MyModule {\n\n  timer?: NodeJS.Timer;\n\n  @OnModuleStart()\n  onModuleStart(@Inject(Container) container: Container) {\n\n    this.timer = setInterval(() => {\n\n      container.createMethodInvoker(\n        TagetComponent,\n        'targetMethod',\n        [FooMidlleware], // The middlewares that configured for this invokation\n        symbol1, // the injectable id for the first argument of `invoke`\n        symbol2, // the injectable id for the second argument of `invoke`\n      ).invoke(\n        'FOO', // will bound to `symbol1`\n        'BAR', // will bound to `symbol2`\n      );\n    }, 1000);\n  }\n\n  @OnModuleStop()\n  onModuleStop() {\n    if (this.timer) {\n      clearInterval(this.timer);\n    }\n  }\n\n}\n\n\n")),(0,i.kt)("h2",{id:"explanation"},"Explanation"),(0,i.kt)("p",null,"In the example code, we define a module ",(0,i.kt)("inlineCode",{parentName:"p"},"MyModule")," with a component ",(0,i.kt)("inlineCode",{parentName:"p"},"TargetComponent"),"."),(0,i.kt)("p",null,"In the ",(0,i.kt)("inlineCode",{parentName:"p"},"OnModuleStart")," hook of ",(0,i.kt)("inlineCode",{parentName:"p"},"MyModule"),", we create a timer that periodically invoke the method ",(0,i.kt)("inlineCode",{parentName:"p"},"targetMethod")," of\n",(0,i.kt)("inlineCode",{parentName:"p"},"TargetComponent")," with the help of the method invoker, with additional injectables supplied:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Injectables bound to ",(0,i.kt)("inlineCode",{parentName:"p"},'"foobar"')," is supplied by the middleware ",(0,i.kt)("inlineCode",{parentName:"p"},"FooMiddleware"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Injectables bound ",(0,i.kt)("inlineCode",{parentName:"p"},"symbol1")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"symbol2")," are supplied through the parameter of ",(0,i.kt)("inlineCode",{parentName:"p"},"invoke")," method"))),(0,i.kt)("p",null,"Note that these injectables are not defined elsewhere in this example, they are only available during the invocation\nsession."),(0,i.kt)("p",null,"Even if any of them is defined elsewhere, the supplied value will override the defined one."),(0,i.kt)("p",null,"Also note that ",(0,i.kt)("inlineCode",{parentName:"p"},"this.container.createMethodInvoker().invoke()")," initiates a new session of dependency injection, which\nmeans that injectables within ",(0,i.kt)("inlineCode",{parentName:"p"},"Scope.SESSION"),", will be instantiated for each invocation."))}m.isMDXComponent=!0}}]);