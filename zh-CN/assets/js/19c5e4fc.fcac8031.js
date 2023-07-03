"use strict";(self.webpackChunk_sensejs_sensejs_doc=self.webpackChunk_sensejs_sensejs_doc||[]).push([[435],{4852:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>f});var r=t(9231);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=r.createContext({}),s=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},l=function(e){var n=s(e.components);return r.createElement(p.Provider,{value:n},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,l=a(e,["components","mdxType","originalType","parentName"]),u=s(t),m=o,f=u["".concat(p,".").concat(m)]||u[m]||d[m]||i;return t?r.createElement(f,c(c({ref:n},l),{},{components:t})):r.createElement(f,c({ref:n},l))}));function f(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,c=new Array(i);c[0]=m;var a={};for(var p in n)hasOwnProperty.call(n,p)&&(a[p]=n[p]);a.originalType=e,a[u]="string"==typeof e?e:o,c[1]=a;for(var s=2;s<i;s++)c[s]=t[s];return r.createElement.apply(null,c)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},2984:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>c,default:()=>d,frontMatter:()=>i,metadata:()=>a,toc:()=>s});var r=t(6e3),o=(t(9231),t(4852));const i={id:"injection-scope",sidebar_position:2},c="\u4f9d\u8d56\u6ce8\u5165\u57df",a={unversionedId:"injection/injection-scope",id:"injection/injection-scope",title:"\u4f9d\u8d56\u6ce8\u5165\u57df",description:"\u6240\u6709\u7684\u53ef\u6ce8\u5165\u5bf9\u8c61\u90fd\u5728\u67d0\u4e2a\u57df\u4e2d\u5b9a\u4e49\uff0c\u5c31\u50cf\u5176\u4ed6\u6240\u6709\u7684\u4f9d\u8d56\u6ce8\u5165\u6846\u67b6\u4e00\u6837\uff0cSenseJS \u63d0\u4f9b\u4e86\u4ee5\u4e0b\u6ce8\u5165\u57df\uff1a",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/injection/scopes.md",sourceDirName:"injection",slug:"/injection/injection-scope",permalink:"/zh-CN/docs/injection/injection-scope",draft:!1,editUrl:"https://github.com/sensejs/sensejs/edit/master/website/docs/injection/scopes.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{id:"injection-scope",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"\u63d0\u4f9b\u53ef\u6ce8\u5165\u5bf9\u8c61",permalink:"/zh-CN/docs/injection/defining-injectables"},next:{title:"\u65b9\u6cd5\u8c03\u7528\u5668",permalink:"/zh-CN/docs/injection/method-invoking"}},p={},s=[],l={toc:s},u="wrapper";function d(e){let{components:n,...t}=e;return(0,o.kt)(u,(0,r.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"\u4f9d\u8d56\u6ce8\u5165\u57df"},"\u4f9d\u8d56\u6ce8\u5165\u57df"),(0,o.kt)("p",null,"\u6240\u6709\u7684\u53ef\u6ce8\u5165\u5bf9\u8c61\u90fd\u5728\u67d0\u4e2a\u57df\u4e2d\u5b9a\u4e49\uff0c\u5c31\u50cf\u5176\u4ed6\u6240\u6709\u7684\u4f9d\u8d56\u6ce8\u5165\u6846\u67b6\u4e00\u6837\uff0cSenseJS \u63d0\u4f9b\u4e86\u4ee5\u4e0b\u6ce8\u5165\u57df\uff1a"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"SINGLETON"),"\uff1a\u5728\u8fd9\u4e2a\u57df\u4e2d\u5b9a\u4e49\u7684\u53ef\u6ce8\u5165\u5bf9\u8c61\u5728\u6574\u4e2a\u5e94\u7528\u7684\u751f\u547d\u5468\u671f\u4e2d\u53ea\u4f1a\u88ab\u5b9e\u4f8b\u5316\u4e00\u6b21\uff1b")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"SESSION"),"\uff1a\u5728\u8fd9\u4e2a\u57df\u4e2d\u5b9a\u4e49\u7684\u53ef\u6ce8\u5165\u5bf9\u8c61\u5728\u6bcf\u4e2a\u4f9d\u8d56\u6ce8\u5165\u4f1a\u8bdd\u4e2d\u53ea\u4f1a\u88ab\u5b9e\u4f8b\u5316\u4e00\u6b21\uff0c\u901a\u5e38\u662f\u4e00\u4e2a\u8bf7\u6c42\u7684\u751f\u547d\u5468\u671f\u3002\u5982\u679c\u672a\u6307\u5b9a\uff0c\u8fd9\u662f\u7ec4\u4ef6\u7684\u9ed8\u8ba4\u57df\uff1b")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"TRANSIENT"),"\uff1a\u5728\u8fd9\u4e2a\u57df\u4e2d\u5b9a\u4e49\u7684\u53ef\u6ce8\u5165\u5bf9\u8c61\u5728\u6bcf\u6b21\u6ce8\u5165\u65f6\u90fd\u4f1a\u88ab\u5b9e\u4f8b\u5316\uff0c\u5982\u679c\u6709\u591a\u4e2a\u53c2\u6570\u6ce8\u5165\u4e86\u8fd9\u4e2a\u53ef\u6ce8\u5165\u5bf9\u8c61\uff0c\u90a3\u4e48\u5b83\u5c06\u88ab\u5b9e\u4f8b\u5316\u591a\u6b21\u3002"))),(0,o.kt)("p",null,"\u8981\u6307\u5b9a\u7ec4\u4ef6\u7684\u57df\uff0c\u53ef\u4ee5\u4f7f\u7528 ",(0,o.kt)("inlineCode",{parentName:"p"},"@Scope()")," \u88c5\u9970\u5668\uff0c\u4f8b\u5982\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"\n@Component()\n@Scope(Scope.SINGLETON)\nclass SingletonComponent {\n\n  myMethod() {\n    //...\n  }\n}\n")),(0,o.kt)("p",null,"\u5bf9\u4e8e\u901a\u8fc7\u5de5\u5382\u63d0\u4f9b\u7684\u53ef\u6ce8\u5165\u5bf9\u8c61\uff0c\u53ef\u4ee5\u901a\u8fc7\u5982\u4e0b\u65b9\u5f0f\u6307\u5b9a\u5176\u6240\u5728\u7684\u57df\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"const MyModule = createModule({\n  factories: [{\n    provide: MyInjectable,\n    factory: MyFactory,\n    scope: Scope.SINGLETON\n  }]\n});\n")),(0,o.kt)("p",null,"\u5bf9\u4e8e\u5e38\u91cf\u53ef\u6ce8\u5165\u5bf9\u8c61\u6765\u8bf4\uff0c\u5b83\u4eec\u603b\u662f\u5728 ",(0,o.kt)("inlineCode",{parentName:"p"},"SINGLETON")," \u57df\u4e2d\u3002"))}d.isMDXComponent=!0}}]);