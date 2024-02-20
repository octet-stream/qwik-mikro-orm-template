import { j as jsx, b as _renderSSR, c as _pauseFromContexts, F as Fragment, s as setPlatform, d as componentQrl, i as inlinedQrl, u as useDocumentHead, e as useLocation, f as _jsxC, g as _jsxQ, h as _fnSignal, k as _jsxS, l as _wrapSignal, R as RouterOutlet, S as ServiceWorkerRegister, Q as QwikCityProvider } from "./q-BCdeYlRM.js";
/**
 * @license
 * @builder.io/qwik/server 1.4.5
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var SYNC_QRL = "<sync>";
function createPlatform(opts, resolvedManifest) {
  const mapper = resolvedManifest == null ? void 0 : resolvedManifest.mapper;
  const mapperFn = opts.symbolMapper ? opts.symbolMapper : (symbolName) => {
    var _a;
    if (mapper) {
      const hash = getSymbolHash(symbolName);
      const result = mapper[hash];
      if (!result) {
        if (hash === SYNC_QRL) {
          return [hash, ""];
        }
        const isRegistered = (_a = globalThis.__qwik_reg_symbols) == null ? void 0 : _a.has(hash);
        if (isRegistered) {
          return [symbolName, "_"];
        }
        console.error("Cannot resolve symbol", symbolName, "in", mapper);
      }
      return result;
    }
  };
  const serverPlatform = {
    isServer: true,
    async importSymbol(_containerEl, url, symbolName) {
      var _a;
      const hash = getSymbolHash(symbolName);
      const regSym = (_a = globalThis.__qwik_reg_symbols) == null ? void 0 : _a.get(hash);
      if (regSym) {
        return regSym;
      }
      let modulePath = String(url);
      if (!modulePath.endsWith(".js")) {
        modulePath += ".js";
      }
      const module = __require(modulePath);
      if (!(symbolName in module)) {
        throw new Error(`Q-ERROR: missing symbol '${symbolName}' in module '${modulePath}'.`);
      }
      return module[symbolName];
    },
    raf: () => {
      console.error("server can not rerender");
      return Promise.resolve();
    },
    nextTick: (fn) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(fn());
        });
      });
    },
    chunkForSymbol(symbolName) {
      return mapperFn(symbolName, mapper);
    }
  };
  return serverPlatform;
}
async function setServerPlatform(opts, manifest2) {
  const platform = createPlatform(opts, manifest2);
  setPlatform(platform);
}
var getSymbolHash = (symbolName) => {
  const index = symbolName.lastIndexOf("_");
  if (index > -1) {
    return symbolName.slice(index + 1);
  }
  return symbolName;
};
function createTimer() {
  if (typeof performance === "undefined") {
    return () => 0;
  }
  const start = performance.now();
  return () => {
    const end = performance.now();
    const delta = end - start;
    return delta / 1e6;
  };
}
function getBuildBase(opts) {
  let base = opts.base;
  if (typeof opts.base === "function") {
    base = opts.base(opts);
  }
  if (typeof base === "string") {
    if (!base.endsWith("/")) {
      base += "/";
    }
    return base;
  }
  return "/build/";
}
var QWIK_LOADER_DEFAULT_MINIFIED = '((e,t)=>{const n="__q_context__",s=window,o=new Set,i=t=>e.querySelectorAll(t),a=(e,t,n=t.type)=>{i("[on"+e+"\\\\:"+n+"]").forEach((s=>f(s,e,t,n)))},r=(e,t)=>e.getAttribute(t),l=t=>{if(void 0===t._qwikjson_){let n=(t===e.documentElement?e.body:t).lastElementChild;for(;n;){if("SCRIPT"===n.tagName&&"qwik/json"===r(n,"type")){t._qwikjson_=JSON.parse(n.textContent.replace(/\\\\x3C(\\/?script)/gi,"<$1"));break}n=n.previousElementSibling}}},c=(e,t)=>new CustomEvent(e,{detail:t}),f=async(t,s,o,i=o.type)=>{const a="on"+s+":"+i;t.hasAttribute("preventdefault:"+i)&&o.preventDefault();const c=t._qc_,f=null==c?void 0:c.li.filter((e=>e[0]===a));if(f&&f.length>0){for(const e of f)await e[1].getFn([t,o],(()=>t.isConnected))(o,t);return}const b=r(t,a);if(b){const s=t.closest("[q\\\\:container]"),i=new URL(r(s,"q:base"),e.baseURI);for(const a of b.split("\\n")){const r=new URL(a,i),c=r.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",f=performance.now();let b;const d=a.startsWith("#");if(d)b=(s.qFuncs||[])[Number.parseInt(c)];else{const e=import(\n/* @vite-ignore */\nr.href.split("#")[0]);l(s),b=(await e)[c]}const p=e[n];if(t.isConnected)try{e[n]=[t,o,r],d||u("qsymbol",{symbol:c,element:t,reqTime:f}),await b(o,t)}finally{e[n]=p}}}},u=(t,n)=>{e.dispatchEvent(c(t,n))},b=e=>e.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase())),d=async e=>{let t=b(e.type),n=e.target;for(a("-document",e,t);n&&n.getAttribute;)await f(n,"",e,t),n=e.bubbles&&!0!==e.cancelBubble?n.parentElement:null},p=e=>{a("-window",e,b(e.type))},q=()=>{var n;const a=e.readyState;if(!t&&("interactive"==a||"complete"==a)&&(t=1,u("qinit"),(null!=(n=s.requestIdleCallback)?n:s.setTimeout).bind(s)((()=>u("qidle"))),o.has("qvisible"))){const e=i("[on\\\\:qvisible]"),t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n.target),f(n.target,"",c("qvisible",n)))}));e.forEach((e=>t.observe(e)))}},w=(e,t,n,s=!1)=>e.addEventListener(t,n,{capture:s,passive:!1}),v=t=>{for(const n of t)o.has(n)||(w(e,n,d,!0),w(s,n,p),o.add(n))};if(!e.qR){const t=s.qwikevents;Array.isArray(t)&&v(t),s.qwikevents={push:(...e)=>v(e)},w(e,"readystatechange",q),q()}})(document);';
var QWIK_LOADER_DEFAULT_DEBUG = '(() => {\n    ((doc, hasInitialized) => {\n        const win = window;\n        const events =  new Set;\n        const querySelectorAll = query => doc.querySelectorAll(query);\n        const broadcast = (infix, ev, type = ev.type) => {\n            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((target => dispatch(target, infix, ev, type)));\n        };\n        const getAttribute = (el, name) => el.getAttribute(name);\n        const resolveContainer = containerEl => {\n            if (void 0 === containerEl._qwikjson_) {\n                let script = (containerEl === doc.documentElement ? doc.body : containerEl).lastElementChild;\n                while (script) {\n                    if ("SCRIPT" === script.tagName && "qwik/json" === getAttribute(script, "type")) {\n                        containerEl._qwikjson_ = JSON.parse(script.textContent.replace(/\\\\x3C(\\/?script)/gi, "<$1"));\n                        break;\n                    }\n                    script = script.previousElementSibling;\n                }\n            }\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {\n            const attrName = "on" + onPrefix + ":" + eventName;\n            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n            const ctx = element._qc_;\n            const relevantListeners = null == ctx ? void 0 : ctx.li.filter((li => li[0] === attrName));\n            if (relevantListeners && relevantListeners.length > 0) {\n                for (const listener of relevantListeners) {\n                    await listener[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                }\n                return;\n            }\n            const attrValue = getAttribute(element, attrName);\n            if (attrValue) {\n                const container = element.closest("[q\\\\:container]");\n                const base = new URL(getAttribute(container, "q:base"), doc.baseURI);\n                for (const qrl of attrValue.split("\\n")) {\n                    const url = new URL(qrl, base);\n                    const symbolName = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n                    const reqTime = performance.now();\n                    let handler;\n                    const isSync = qrl.startsWith("#");\n                    if (isSync) {\n                        handler = (container.qFuncs || [])[Number.parseInt(symbolName)];\n                    } else {\n                        const module = import(\n                        /* @vite-ignore */\n                        url.href.split("#")[0]);\n                        resolveContainer(container);\n                        handler = (await module)[symbolName];\n                    }\n                    const previousCtx = doc.__q_context__;\n                    if (element.isConnected) {\n                        try {\n                            doc.__q_context__ = [ element, ev, url ];\n                            isSync || emitEvent("qsymbol", {\n                                symbol: symbolName,\n                                element: element,\n                                reqTime: reqTime\n                            });\n                            await handler(ev, element);\n                        } finally {\n                            doc.__q_context__ = previousCtx;\n                        }\n                    }\n                }\n            }\n        };\n        const emitEvent = (eventName, detail) => {\n            doc.dispatchEvent(createEvent(eventName, detail));\n        };\n        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n        const processDocumentEvent = async ev => {\n            let type = camelToKebab(ev.type);\n            let element = ev.target;\n            broadcast("-document", ev, type);\n            while (element && element.getAttribute) {\n                await dispatch(element, "", ev, type);\n                element = ev.bubbles && !0 !== ev.cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast("-window", ev, camelToKebab(ev.type));\n        };\n        const processReadyStateChange = () => {\n            var _a;\n            const readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                hasInitialized = 1;\n                emitEvent("qinit");\n                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));\n                if (events.has("qvisible")) {\n                    const results = querySelectorAll("[on\\\\:qvisible]");\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "", createEvent("qvisible", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {\n            capture: capture,\n            passive: !1\n        });\n        const push = eventNames => {\n            for (const eventName of eventNames) {\n                if (!events.has(eventName)) {\n                    addEventListener(doc, eventName, processDocumentEvent, !0);\n                    addEventListener(win, eventName, processWindowEvent);\n                    events.add(eventName);\n                }\n            }\n        };\n        if (!doc.qR) {\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && push(qwikevents);\n            win.qwikevents = {\n                push: (...e) => push(e)\n            };\n            addEventListener(doc, "readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})();';
var QWIK_LOADER_OPTIMIZE_MINIFIED = '((e,t)=>{const n="__q_context__",s=window,o=new Set,i=t=>e.querySelectorAll(t),a=(e,t,n=t.type)=>{i("[on"+e+"\\\\:"+n+"]").forEach((s=>f(s,e,t,n)))},r=(e,t)=>e.getAttribute(t),l=t=>{if(void 0===t._qwikjson_){let n=(t===e.documentElement?e.body:t).lastElementChild;for(;n;){if("SCRIPT"===n.tagName&&"qwik/json"===r(n,"type")){t._qwikjson_=JSON.parse(n.textContent.replace(/\\\\x3C(\\/?script)/gi,"<$1"));break}n=n.previousElementSibling}}},c=(e,t)=>new CustomEvent(e,{detail:t}),f=async(t,s,o,i=o.type)=>{const a="on"+s+":"+i;t.hasAttribute("preventdefault:"+i)&&o.preventDefault();const c=t._qc_,f=null==c?void 0:c.li.filter((e=>e[0]===a));if(f&&f.length>0){for(const e of f)await e[1].getFn([t,o],(()=>t.isConnected))(o,t);return}const b=r(t,a);if(b){const s=t.closest("[q\\\\:container]"),i=new URL(r(s,"q:base"),e.baseURI);for(const a of b.split("\\n")){const r=new URL(a,i),c=r.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",f=performance.now();let b;const d=a.startsWith("#");if(d)b=(s.qFuncs||[])[Number.parseInt(c)];else{const e=import(\n/* @vite-ignore */\nr.href.split("#")[0]);l(s),b=(await e)[c]}const p=e[n];if(t.isConnected)try{e[n]=[t,o,r],d||u("qsymbol",{symbol:c,element:t,reqTime:f}),await b(o,t)}finally{e[n]=p}}}},u=(t,n)=>{e.dispatchEvent(c(t,n))},b=e=>e.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase())),d=async e=>{let t=b(e.type),n=e.target;for(a("-document",e,t);n&&n.getAttribute;)await f(n,"",e,t),n=e.bubbles&&!0!==e.cancelBubble?n.parentElement:null},p=e=>{a("-window",e,b(e.type))},q=()=>{var n;const a=e.readyState;if(!t&&("interactive"==a||"complete"==a)&&(t=1,u("qinit"),(null!=(n=s.requestIdleCallback)?n:s.setTimeout).bind(s)((()=>u("qidle"))),o.has("qvisible"))){const e=i("[on\\\\:qvisible]"),t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n.target),f(n.target,"",c("qvisible",n)))}));e.forEach((e=>t.observe(e)))}},w=(e,t,n,s=!1)=>e.addEventListener(t,n,{capture:s,passive:!1}),v=t=>{for(const n of t)o.has(n)||(w(e,n,d,!0),w(s,n,p),o.add(n))};if(!e.qR){const t=s.qwikevents;Array.isArray(t)&&v(t),s.qwikevents={push:(...e)=>v(e)},w(e,"readystatechange",q),q()}})(document);';
var QWIK_LOADER_OPTIMIZE_DEBUG = '(() => {\n    ((doc, hasInitialized) => {\n        const win = window;\n        const events = new Set;\n        const querySelectorAll = query => doc.querySelectorAll(query);\n        const broadcast = (infix, ev, type = ev.type) => {\n            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((target => dispatch(target, infix, ev, type)));\n        };\n        const getAttribute = (el, name) => el.getAttribute(name);\n        const resolveContainer = containerEl => {\n            if (void 0 === containerEl._qwikjson_) {\n                let script = (containerEl === doc.documentElement ? doc.body : containerEl).lastElementChild;\n                while (script) {\n                    if ("SCRIPT" === script.tagName && "qwik/json" === getAttribute(script, "type")) {\n                        containerEl._qwikjson_ = JSON.parse(script.textContent.replace(/\\\\x3C(\\/?script)/gi, "<$1"));\n                        break;\n                    }\n                    script = script.previousElementSibling;\n                }\n            }\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {\n            const attrName = "on" + onPrefix + ":" + eventName;\n            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n            const ctx = element._qc_;\n            const relevantListeners = null == ctx ? void 0 : ctx.li.filter((li => li[0] === attrName));\n            if (relevantListeners && relevantListeners.length > 0) {\n                for (const listener of relevantListeners) {\n                    await listener[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                }\n                return;\n            }\n            const attrValue = getAttribute(element, attrName);\n            if (attrValue) {\n                const container = element.closest("[q\\\\:container]");\n                const base = new URL(getAttribute(container, "q:base"), doc.baseURI);\n                for (const qrl of attrValue.split("\\n")) {\n                    const url = new URL(qrl, base);\n                    const symbolName = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n                    const reqTime = performance.now();\n                    let handler;\n                    const isSync = qrl.startsWith("#");\n                    if (isSync) {\n                        handler = (container.qFuncs || [])[Number.parseInt(symbolName)];\n                    } else {\n                        const module = import(\n                        /* @vite-ignore */\n                        url.href.split("#")[0]);\n                        resolveContainer(container);\n                        handler = (await module)[symbolName];\n                    }\n                    const previousCtx = doc.__q_context__;\n                    if (element.isConnected) {\n                        try {\n                            doc.__q_context__ = [ element, ev, url ];\n                            isSync || emitEvent("qsymbol", {\n                                symbol: symbolName,\n                                element: element,\n                                reqTime: reqTime\n                            });\n                            await handler(ev, element);\n                        } finally {\n                            doc.__q_context__ = previousCtx;\n                        }\n                    }\n                }\n            }\n        };\n        const emitEvent = (eventName, detail) => {\n            doc.dispatchEvent(createEvent(eventName, detail));\n        };\n        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n        const processDocumentEvent = async ev => {\n            let type = camelToKebab(ev.type);\n            let element = ev.target;\n            broadcast("-document", ev, type);\n            while (element && element.getAttribute) {\n                await dispatch(element, "", ev, type);\n                element = ev.bubbles && !0 !== ev.cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast("-window", ev, camelToKebab(ev.type));\n        };\n        const processReadyStateChange = () => {\n            var _a;\n            const readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                hasInitialized = 1;\n                emitEvent("qinit");\n                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));\n                if (events.has("qvisible")) {\n                    const results = querySelectorAll("[on\\\\:qvisible]");\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "", createEvent("qvisible", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {\n            capture: capture,\n            passive: !1\n        });\n        const push = eventNames => {\n            for (const eventName of eventNames) {\n                if (!events.has(eventName)) {\n                    addEventListener(doc, eventName, processDocumentEvent, !0);\n                    addEventListener(win, eventName, processWindowEvent);\n                    events.add(eventName);\n                }\n            }\n        };\n        if (!doc.qR) {\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && push(qwikevents);\n            win.qwikevents = {\n                push: (...e) => push(e)\n            };\n            addEventListener(doc, "readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})();';
function getQwikLoaderScript(opts = {}) {
  if (Array.isArray(opts.events) && opts.events.length > 0) {
    const loader = opts.debug ? QWIK_LOADER_OPTIMIZE_DEBUG : QWIK_LOADER_OPTIMIZE_MINIFIED;
    return loader.replace("window.qEvents", JSON.stringify(opts.events));
  }
  return opts.debug ? QWIK_LOADER_DEFAULT_DEBUG : QWIK_LOADER_DEFAULT_MINIFIED;
}
function getPrefetchResources(snapshotResult, opts, resolvedManifest) {
  if (!resolvedManifest) {
    return [];
  }
  const prefetchStrategy = opts.prefetchStrategy;
  const buildBase = getBuildBase(opts);
  if (prefetchStrategy !== null) {
    if (!prefetchStrategy || !prefetchStrategy.symbolsToPrefetch || prefetchStrategy.symbolsToPrefetch === "auto") {
      return getAutoPrefetch(snapshotResult, resolvedManifest, buildBase);
    }
    if (typeof prefetchStrategy.symbolsToPrefetch === "function") {
      try {
        return prefetchStrategy.symbolsToPrefetch({ manifest: resolvedManifest.manifest });
      } catch (e) {
        console.error("getPrefetchUrls, symbolsToPrefetch()", e);
      }
    }
  }
  return [];
}
function getAutoPrefetch(snapshotResult, resolvedManifest, buildBase) {
  const prefetchResources = [];
  const qrls = snapshotResult == null ? void 0 : snapshotResult.qrls;
  const { mapper, manifest: manifest2 } = resolvedManifest;
  const urls = /* @__PURE__ */ new Map();
  if (Array.isArray(qrls)) {
    for (const obj of qrls) {
      const qrlSymbolName = obj.getHash();
      const resolvedSymbol = mapper[qrlSymbolName];
      if (resolvedSymbol) {
        addBundle(manifest2, urls, prefetchResources, buildBase, resolvedSymbol[1]);
      }
    }
  }
  return prefetchResources;
}
function addBundle(manifest2, urls, prefetchResources, buildBase, bundleFileName) {
  const url = buildBase + bundleFileName;
  let prefetchResource = urls.get(url);
  if (!prefetchResource) {
    prefetchResource = {
      url,
      imports: []
    };
    urls.set(url, prefetchResource);
    const bundle = manifest2.bundles[bundleFileName];
    if (bundle) {
      if (Array.isArray(bundle.imports)) {
        for (const importedFilename of bundle.imports) {
          addBundle(manifest2, urls, prefetchResource.imports, buildBase, importedFilename);
        }
      }
    }
  }
  prefetchResources.push(prefetchResource);
}
function getValidManifest(manifest2) {
  if (manifest2 != null && manifest2.mapping != null && typeof manifest2.mapping === "object" && manifest2.symbols != null && typeof manifest2.symbols === "object" && manifest2.bundles != null && typeof manifest2.bundles === "object") {
    return manifest2;
  }
  return void 0;
}
function workerFetchScript() {
  const fetch = `Promise.all(e.data.map(u=>fetch(u))).finally(()=>{setTimeout(postMessage({}),9999)})`;
  const workerBody = `onmessage=(e)=>{${fetch}}`;
  const blob = `new Blob(['${workerBody}'],{type:"text/javascript"})`;
  const url = `URL.createObjectURL(${blob})`;
  let s = `const w=new Worker(${url});`;
  s += `w.postMessage(u.map(u=>new URL(u,origin)+''));`;
  s += `w.onmessage=()=>{w.terminate()};`;
  return s;
}
function prefetchUrlsEventScript(prefetchResources) {
  const data = {
    bundles: flattenPrefetchResources(prefetchResources).map((u) => u.split("/").pop())
  };
  return `document.dispatchEvent(new CustomEvent("qprefetch",{detail:${JSON.stringify(data)}}))`;
}
function flattenPrefetchResources(prefetchResources) {
  const urls = [];
  const addPrefetchResource = (prefetchResources2) => {
    if (Array.isArray(prefetchResources2)) {
      for (const prefetchResource of prefetchResources2) {
        if (!urls.includes(prefetchResource.url)) {
          urls.push(prefetchResource.url);
          addPrefetchResource(prefetchResource.imports);
        }
      }
    }
  };
  addPrefetchResource(prefetchResources);
  return urls;
}
function getMostReferenced(prefetchResources) {
  const common = /* @__PURE__ */ new Map();
  let total = 0;
  const addPrefetchResource = (prefetchResources2, visited2) => {
    if (Array.isArray(prefetchResources2)) {
      for (const prefetchResource of prefetchResources2) {
        const count = common.get(prefetchResource.url) || 0;
        common.set(prefetchResource.url, count + 1);
        total++;
        if (!visited2.has(prefetchResource.url)) {
          visited2.add(prefetchResource.url);
          addPrefetchResource(prefetchResource.imports, visited2);
        }
      }
    }
  };
  const visited = /* @__PURE__ */ new Set();
  for (const resource of prefetchResources) {
    visited.clear();
    addPrefetchResource(resource.imports, visited);
  }
  const threshold = total / common.size * 2;
  const urls = Array.from(common.entries());
  urls.sort((a, b) => b[1] - a[1]);
  return urls.slice(0, 5).filter((e) => e[1] > threshold).map((e) => e[0]);
}
function applyPrefetchImplementation(prefetchStrategy, prefetchResources, nonce) {
  const prefetchImpl = normalizePrefetchImplementation(prefetchStrategy == null ? void 0 : prefetchStrategy.implementation);
  const prefetchNodes = [];
  if (prefetchImpl.prefetchEvent === "always") {
    prefetchUrlsEvent(prefetchNodes, prefetchResources, nonce);
  }
  if (prefetchImpl.linkInsert === "html-append") {
    linkHtmlImplementation(prefetchNodes, prefetchResources, prefetchImpl);
  }
  if (prefetchImpl.linkInsert === "js-append") {
    linkJsImplementation(prefetchNodes, prefetchResources, prefetchImpl, nonce);
  } else if (prefetchImpl.workerFetchInsert === "always") {
    workerFetchImplementation(prefetchNodes, prefetchResources, nonce);
  }
  if (prefetchNodes.length > 0) {
    return jsx(Fragment, { children: prefetchNodes });
  }
  return null;
}
function prefetchUrlsEvent(prefetchNodes, prefetchResources, nonce) {
  const mostReferenced = getMostReferenced(prefetchResources);
  for (const url of mostReferenced) {
    prefetchNodes.push(
      jsx("link", {
        rel: "modulepreload",
        href: url,
        nonce
      })
    );
  }
  prefetchNodes.push(
    jsx("script", {
      "q:type": "prefetch-bundles",
      dangerouslySetInnerHTML: prefetchUrlsEventScript(prefetchResources) + `;document.dispatchEvent(new CustomEvent('qprefetch', {detail:{links: [location.pathname]}}))`,
      nonce
    })
  );
}
function linkHtmlImplementation(prefetchNodes, prefetchResources, prefetchImpl) {
  const urls = flattenPrefetchResources(prefetchResources);
  const rel = prefetchImpl.linkRel || "prefetch";
  for (const url of urls) {
    const attributes = {};
    attributes["href"] = url;
    attributes["rel"] = rel;
    if (rel === "prefetch" || rel === "preload") {
      if (url.endsWith(".js")) {
        attributes["as"] = "script";
      }
    }
    prefetchNodes.push(jsx("link", attributes, void 0));
  }
}
function linkJsImplementation(prefetchNodes, prefetchResources, prefetchImpl, nonce) {
  const rel = prefetchImpl.linkRel || "prefetch";
  let s = ``;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s += `let supportsLinkRel = true;`;
  }
  s += `const u=${JSON.stringify(flattenPrefetchResources(prefetchResources))};`;
  s += `u.map((u,i)=>{`;
  s += `const l=document.createElement('link');`;
  s += `l.setAttribute("href",u);`;
  s += `l.setAttribute("rel","${rel}");`;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s += `if(i===0){`;
    s += `try{`;
    s += `supportsLinkRel=l.relList.supports("${rel}");`;
    s += `}catch(e){}`;
    s += `}`;
  }
  s += `document.body.appendChild(l);`;
  s += `});`;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s += `if(!supportsLinkRel){`;
    s += workerFetchScript();
    s += `}`;
  }
  if (prefetchImpl.workerFetchInsert === "always") {
    s += workerFetchScript();
  }
  prefetchNodes.push(
    jsx("script", {
      type: "module",
      "q:type": "link-js",
      dangerouslySetInnerHTML: s,
      nonce
    })
  );
}
function workerFetchImplementation(prefetchNodes, prefetchResources, nonce) {
  let s = `const u=${JSON.stringify(flattenPrefetchResources(prefetchResources))};`;
  s += workerFetchScript();
  prefetchNodes.push(
    jsx("script", {
      type: "module",
      "q:type": "prefetch-worker",
      dangerouslySetInnerHTML: s,
      nonce
    })
  );
}
function normalizePrefetchImplementation(input) {
  return { ...PrefetchImplementationDefault, ...input };
}
var PrefetchImplementationDefault = {
  linkInsert: null,
  linkRel: null,
  workerFetchInsert: null,
  prefetchEvent: "always"
};
var DOCTYPE = "<!DOCTYPE html>";
async function renderToStream(rootNode, opts) {
  var _a;
  let stream = opts.stream;
  let bufferSize = 0;
  let totalSize = 0;
  let networkFlushes = 0;
  let firstFlushTime = 0;
  let buffer = "";
  let snapshotResult;
  const inOrderStreaming = ((_a = opts.streaming) == null ? void 0 : _a.inOrder) ?? {
    strategy: "auto",
    maximunInitialChunk: 5e4,
    maximunChunk: 3e4
  };
  const containerTagName = opts.containerTagName ?? "html";
  const containerAttributes = opts.containerAttributes ?? {};
  const nativeStream = stream;
  const firstFlushTimer = createTimer();
  const buildBase = getBuildBase(opts);
  const resolvedManifest = resolveManifest(opts.manifest);
  function flush() {
    if (buffer) {
      nativeStream.write(buffer);
      buffer = "";
      bufferSize = 0;
      networkFlushes++;
      if (networkFlushes === 1) {
        firstFlushTime = firstFlushTimer();
      }
    }
  }
  function enqueue(chunk) {
    const len = chunk.length;
    bufferSize += len;
    totalSize += len;
    buffer += chunk;
  }
  switch (inOrderStreaming.strategy) {
    case "disabled":
      stream = {
        write: enqueue
      };
      break;
    case "direct":
      stream = nativeStream;
      break;
    case "auto":
      let count = 0;
      let forceFlush = false;
      const minimunChunkSize = inOrderStreaming.maximunChunk ?? 0;
      const initialChunkSize = inOrderStreaming.maximunInitialChunk ?? 0;
      stream = {
        write(chunk) {
          if (chunk === "<!--qkssr-f-->") {
            forceFlush || (forceFlush = true);
          } else if (chunk === "<!--qkssr-pu-->") {
            count++;
          } else if (chunk === "<!--qkssr-po-->") {
            count--;
          } else {
            enqueue(chunk);
          }
          const chunkSize = networkFlushes === 0 ? initialChunkSize : minimunChunkSize;
          if (count === 0 && (forceFlush || bufferSize >= chunkSize)) {
            forceFlush = false;
            flush();
          }
        }
      };
      break;
  }
  if (containerTagName === "html") {
    stream.write(DOCTYPE);
  } else {
    stream.write("<!--cq-->");
    if (opts.qwikLoader) {
      if (opts.qwikLoader.include === void 0) {
        opts.qwikLoader.include = "never";
      }
      if (opts.qwikLoader.position === void 0) {
        opts.qwikLoader.position = "bottom";
      }
    } else {
      opts.qwikLoader = {
        include: "never"
      };
    }
    if (!opts.qwikPrefetchServiceWorker) {
      opts.qwikPrefetchServiceWorker = {};
    }
    if (!opts.qwikPrefetchServiceWorker.include) {
      opts.qwikPrefetchServiceWorker.include = false;
    }
    if (!opts.qwikPrefetchServiceWorker.position) {
      opts.qwikPrefetchServiceWorker.position = "top";
    }
  }
  if (!opts.manifest) {
    console.warn(
      `Missing client manifest, loading symbols in the client might 404. Please ensure the client build has run and generated the manifest for the server build.`
    );
  }
  await setServerPlatform(opts, resolvedManifest);
  const injections = resolvedManifest == null ? void 0 : resolvedManifest.manifest.injections;
  const beforeContent = injections ? injections.map((injection) => jsx(injection.tag, injection.attributes ?? {})) : void 0;
  const renderTimer = createTimer();
  const renderSymbols = [];
  let renderTime = 0;
  let snapshotTime = 0;
  await _renderSSR(rootNode, {
    stream,
    containerTagName,
    containerAttributes,
    serverData: opts.serverData,
    base: buildBase,
    beforeContent,
    beforeClose: async (contexts, containerState, _dynamic, textNodes) => {
      var _a2, _b, _c, _d, _e, _f, _g;
      renderTime = renderTimer();
      const snapshotTimer = createTimer();
      snapshotResult = await _pauseFromContexts(contexts, containerState, void 0, textNodes);
      const children = [];
      if (opts.prefetchStrategy !== null) {
        const prefetchResources = getPrefetchResources(snapshotResult, opts, resolvedManifest);
        if (prefetchResources.length > 0) {
          const prefetchImpl = applyPrefetchImplementation(
            opts.prefetchStrategy,
            prefetchResources,
            (_a2 = opts.serverData) == null ? void 0 : _a2.nonce
          );
          if (prefetchImpl) {
            children.push(prefetchImpl);
          }
        }
      }
      const jsonData = JSON.stringify(snapshotResult.state, void 0, void 0);
      children.push(
        jsx("script", {
          type: "qwik/json",
          dangerouslySetInnerHTML: escapeText(jsonData),
          nonce: (_b = opts.serverData) == null ? void 0 : _b.nonce
        })
      );
      if (snapshotResult.funcs.length > 0) {
        children.push(
          jsx("script", {
            "q:func": "qwik/json",
            dangerouslySetInnerHTML: serializeFunctions(snapshotResult.funcs),
            nonce: (_c = opts.serverData) == null ? void 0 : _c.nonce
          })
        );
      }
      const needLoader = !snapshotResult || snapshotResult.mode !== "static";
      const includeMode = ((_d = opts.qwikLoader) == null ? void 0 : _d.include) ?? "auto";
      const includeLoader = includeMode === "always" || includeMode === "auto" && needLoader;
      if (includeLoader) {
        const qwikLoaderScript = getQwikLoaderScript({
          events: (_e = opts.qwikLoader) == null ? void 0 : _e.events,
          debug: opts.debug
        });
        children.push(
          jsx("script", {
            id: "qwikloader",
            dangerouslySetInnerHTML: qwikLoaderScript,
            nonce: (_f = opts.serverData) == null ? void 0 : _f.nonce
          })
        );
      }
      const extraListeners = Array.from(containerState.$events$, (s) => JSON.stringify(s));
      if (extraListeners.length > 0) {
        let content = `window.qwikevents.push(${extraListeners.join(", ")})`;
        if (!includeLoader) {
          content = `window.qwikevents||=[];${content}`;
        }
        children.push(
          jsx("script", {
            dangerouslySetInnerHTML: content,
            nonce: (_g = opts.serverData) == null ? void 0 : _g.nonce
          })
        );
      }
      collectRenderSymbols(renderSymbols, contexts);
      snapshotTime = snapshotTimer();
      return jsx(Fragment, { children });
    },
    manifestHash: (resolvedManifest == null ? void 0 : resolvedManifest.manifest.manifestHash) || "dev"
  });
  if (containerTagName !== "html") {
    stream.write("<!--/cq-->");
  }
  flush();
  const isDynamic = snapshotResult.resources.some((r) => r._cache !== Infinity);
  const result = {
    prefetchResources: void 0,
    snapshotResult,
    flushes: networkFlushes,
    manifest: resolvedManifest == null ? void 0 : resolvedManifest.manifest,
    size: totalSize,
    isStatic: !isDynamic,
    timing: {
      render: renderTime,
      snapshot: snapshotTime,
      firstFlush: firstFlushTime
    },
    _symbols: renderSymbols
  };
  return result;
}
function resolveManifest(manifest2) {
  if (!manifest2) {
    return void 0;
  }
  if ("mapper" in manifest2) {
    return manifest2;
  }
  manifest2 = getValidManifest(manifest2);
  if (manifest2) {
    const mapper = {};
    Object.entries(manifest2.mapping).forEach(([key, value]) => {
      mapper[getSymbolHash(key)] = [key, value];
    });
    return {
      mapper,
      manifest: manifest2
    };
  }
  return void 0;
}
var escapeText = (str) => {
  return str.replace(/<(\/?script)/gi, "\\x3C$1");
};
function collectRenderSymbols(renderSymbols, elements) {
  var _a;
  for (const ctx of elements) {
    const symbol = (_a = ctx.$componentQrl$) == null ? void 0 : _a.getSymbol();
    if (symbol && !renderSymbols.includes(symbol)) {
      renderSymbols.push(symbol);
    }
  }
}
var Q_FUNCS_PREFIX = 'document.currentScript.closest("[q\\\\:container]").qFuncs=';
function serializeFunctions(funcs) {
  return Q_FUNCS_PREFIX + `[${funcs.join(",\n")}]`;
}
async function setServerPlatform2(manifest2) {
  const platform = createPlatform({ manifest: manifest2 }, resolveManifest(manifest2));
  setPlatform(platform);
}
const manifest = { "manifestHash": "tbfz99", "symbols": { "s_02wMImzEAbk": { "origin": "../node_modules/.pnpm/@builder.io+qwik-city@1.4.5_@types+node@20.11.19/node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityProvider_component_useTask", "canonicalFilename": "s_02wmimzeabk", "hash": "02wMImzEAbk", "ctxKind": "function", "ctxName": "useTask$", "captures": true, "parent": "s_TxCFOy819ag", "loc": [27091, 36262] }, "s_0KDLYDrBz0s": { "origin": "components/Card.tsx", "displayName": "Card_component", "canonicalFilename": "s_0kdlydrbz0s", "hash": "0KDLYDrBz0s", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [147, 321] }, "s_8gdLBszqbaM": { "origin": "../node_modules/.pnpm/@builder.io+qwik-city@1.4.5_@types+node@20.11.19/node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component", "canonicalFilename": "s_8gdlbszqbam", "hash": "8gdLBszqbaM", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [38246, 40918] }, "s_AXfkOub3zOE": { "origin": "routes/layout.tsx", "displayName": "RootLayout_component", "canonicalFilename": "s_axfkoub3zoe", "hash": "AXfkOub3zOE", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [582, 718] }, "s_NBYS2QjSJGQ": { "origin": "components/TodoCard.tsx", "displayName": "TodoCard_component", "canonicalFilename": "s_nbys2qjsjgq", "hash": "NBYS2QjSJGQ", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [746, 1074] }, "s_Nk9PlpjQm9Y": { "origin": "../node_modules/.pnpm/@builder.io+qwik-city@1.4.5_@types+node@20.11.19/node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "GetForm_component", "canonicalFilename": "s_nk9plpjqm9y", "hash": "Nk9PlpjQm9Y", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [51079, 52430] }, "s_TxCFOy819ag": { "origin": "../node_modules/.pnpm/@builder.io+qwik-city@1.4.5_@types+node@20.11.19/node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityProvider_component", "canonicalFilename": "s_txcfoy819ag", "hash": "TxCFOy819ag", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [23821, 36549] }, "s_WmYC5H00wtI": { "origin": "../node_modules/.pnpm/@builder.io+qwik-city@1.4.5_@types+node@20.11.19/node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityMockProvider_component", "canonicalFilename": "s_wmyc5h00wti", "hash": "WmYC5H00wtI", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [36833, 38127] }, "s_b2vi3MZWnR4": { "origin": "head.tsx", "displayName": "Head_component", "canonicalFilename": "s_b2vi3mzwnr4", "hash": "b2vi3MZWnR4", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [237, 855] }, "s_e0ssiDXoeAM": { "origin": "../node_modules/.pnpm/@builder.io+qwik-city@1.4.5_@types+node@20.11.19/node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "RouterOutlet_component", "canonicalFilename": "s_e0ssidxoeam", "hash": "e0ssiDXoeAM", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [7931, 8645] }, "s_emq0iIDlPOo": { "origin": "root.tsx", "displayName": "root_component", "canonicalFilename": "s_emq0iidlpoo", "hash": "emq0iIDlPOo", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [431, 778] }, "s_vHb0AY2MS70": { "origin": "routes/index.tsx", "displayName": "TodoPage_component", "canonicalFilename": "s_vhb0ay2ms70", "hash": "vHb0AY2MS70", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [1050, 2124] }, "s_RPDJAz33WLA": { "origin": "../node_modules/.pnpm/@builder.io+qwik-city@1.4.5_@types+node@20.11.19/node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityProvider_component_useStyles", "canonicalFilename": "s_rpdjaz33wla", "hash": "RPDJAz33WLA", "ctxKind": "function", "ctxName": "useStyles$", "captures": false, "parent": "s_TxCFOy819ag", "loc": [23876, 23910] }, "s_A5bZC7WO00A": { "origin": "../node_modules/.pnpm/@builder.io+qwik-city@1.4.5_@types+node@20.11.19/node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "routeActionQrl_action_submit", "canonicalFilename": "s_a5bzc7wo00a", "hash": "A5bZC7WO00A", "ctxKind": "function", "ctxName": "submit", "captures": true, "parent": null, "loc": [41964, 43598] }, "s_DyVc0YBIqQU": { "origin": "../node_modules/.pnpm/@builder.io+qwik-city@1.4.5_@types+node@20.11.19/node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "spa_init", "canonicalFilename": "s_dyvc0ybiqqu", "hash": "DyVc0YBIqQU", "ctxKind": "function", "ctxName": "spaInit", "captures": false, "parent": null, "loc": [1391, 6872] }, "s_wOIPfiQ04l4": { "origin": "../node_modules/.pnpm/@builder.io+qwik-city@1.4.5_@types+node@20.11.19/node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "serverQrl_stuff", "canonicalFilename": "s_woipfiq04l4", "hash": "wOIPfiQ04l4", "ctxKind": "function", "ctxName": "stuff", "captures": true, "parent": null, "loc": [46920, 48965] }, "s_BUbtvTyvVRE": { "origin": "../node_modules/.pnpm/@builder.io+qwik-city@1.4.5_@types+node@20.11.19/node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityMockProvider_component_goto", "canonicalFilename": "s_bubtvtyvvre", "hash": "BUbtvTyvVRE", "ctxKind": "function", "ctxName": "goto", "captures": false, "parent": "s_WmYC5H00wtI", "loc": [37248, 37326] }, "s_Osdg8FnYTw4": { "origin": "../node_modules/.pnpm/@builder.io+qwik-city@1.4.5_@types+node@20.11.19/node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component_handlePrefetch", "canonicalFilename": "s_osdg8fnytw4", "hash": "Osdg8FnYTw4", "ctxKind": "function", "ctxName": "handlePrefetch", "captures": false, "parent": "s_8gdLBszqbaM", "loc": [38989, 39320] }, "s_fX0bDjeJa0E": { "origin": "../node_modules/.pnpm/@builder.io+qwik-city@1.4.5_@types+node@20.11.19/node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityProvider_component_goto", "canonicalFilename": "s_fx0bdjeja0e", "hash": "fX0bDjeJa0E", "ctxKind": "function", "ctxName": "goto", "captures": true, "parent": "s_TxCFOy819ag", "loc": [25160, 26479] }, "s_p9MSze0ojs4": { "origin": "../node_modules/.pnpm/@builder.io+qwik-city@1.4.5_@types+node@20.11.19/node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "GetForm_component_form_onSubmit", "canonicalFilename": "s_p9msze0ojs4", "hash": "p9MSze0ojs4", "ctxKind": "function", "ctxName": "_jsxS", "captures": true, "parent": "s_Nk9PlpjQm9Y", "loc": [51386, 52083] }, "s_pIf0khHUxfY": { "origin": "../node_modules/.pnpm/@builder.io+qwik-city@1.4.5_@types+node@20.11.19/node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component_handleClick", "canonicalFilename": "s_pif0khhuxfy", "hash": "pIf0khHUxfY", "ctxKind": "function", "ctxName": "handleClick", "captures": true, "parent": "s_8gdLBszqbaM", "loc": [39747, 40267] } }, "mapping": { "s_02wMImzEAbk": "q-Dx_vboBs.js", "s_0KDLYDrBz0s": "q-CQOinMcf.js", "s_8gdLBszqbaM": "q-BqvqpKB4.js", "s_AXfkOub3zOE": "q-DnacZLuZ.js", "s_NBYS2QjSJGQ": "q-BQUTwqcc.js", "s_Nk9PlpjQm9Y": "q-DI3uco-7.js", "s_TxCFOy819ag": "q-Dx_vboBs.js", "s_WmYC5H00wtI": "q-Dd7NA-Re.js", "s_b2vi3MZWnR4": "q-Z5SESiQD.js", "s_e0ssiDXoeAM": "q-C09v-t1d.js", "s_emq0iIDlPOo": "q-DI1EDess.js", "s_vHb0AY2MS70": "q-BJOP3UMW.js", "s_RPDJAz33WLA": "q-Dx_vboBs.js", "s_A5bZC7WO00A": "q-DU2OJCeM.js", "s_DyVc0YBIqQU": "q-fJkQnue_.js", "s_wOIPfiQ04l4": "q-DloBs3uZ.js", "s_BUbtvTyvVRE": "q-Dd7NA-Re.js", "s_Osdg8FnYTw4": "q-BqvqpKB4.js", "s_fX0bDjeJa0E": "q-Dx_vboBs.js", "s_p9MSze0ojs4": "q-DI3uco-7.js", "s_pIf0khHUxfY": "q-BqvqpKB4.js" }, "bundles": { "q-BJOP3UMW.js": { "size": 1062, "imports": ["q-C0VGK_Ln.js", "q-CAtsXEfr.js", "q-CBk6tas_.js", "q-CPnWhdnH.js"], "origins": ["src/entry_TodoPage.js", "src/s_vhb0ay2ms70.js"], "symbols": ["s_vHb0AY2MS70"] }, "q-BPWr2Cgn.js": { "size": 322, "imports": ["q-CBk6tas_.js"], "dynamicImports": ["q-Bq36Wx9q.js"], "origins": ["@qwik-city-entries"] }, "q-Bq36Wx9q.js": { "size": 2539, "origins": ["node_modules/.pnpm/@builder.io+qwik-city@1.4.5_@types+node@20.11.19/node_modules/@builder.io/qwik-city/service-worker.mjs", "src/routes/service-worker.ts"] }, "q-BQUTwqcc.js": { "size": 505, "imports": ["q-C0VGK_Ln.js", "q-CBk6tas_.js", "q-CPnWhdnH.js"], "origins": ["src/entry_TodoCard.js", "src/s_nbys2qjsjgq.js"], "symbols": ["s_NBYS2QjSJGQ"] }, "q-BqvqpKB4.js": { "size": 1786, "imports": ["q-C0VGK_Ln.js", "q-CBk6tas_.js"], "origins": ["src/entry_Link.js", "src/s_8gdlbszqbam.js", "src/s_osdg8fnytw4.js", "src/s_pif0khhuxfy.js"], "symbols": ["s_8gdLBszqbaM", "s_Osdg8FnYTw4", "s_pIf0khHUxfY"] }, "q-C09v-t1d.js": { "size": 462, "imports": ["q-C0VGK_Ln.js", "q-CBk6tas_.js"], "origins": ["src/entry_RouterOutlet.js", "src/s_e0ssidxoeam.js"], "symbols": ["s_e0ssiDXoeAM"] }, "q-C0VGK_Ln.js": { "size": 10066, "imports": ["q-CBk6tas_.js"], "dynamicImports": ["q-C09v-t1d.js", "q-DI3uco-7.js", "q-DU2OJCeM.js", "q-Dx_vboBs.js", "q-fJkQnue_.js"], "origins": ["@qwik-city-sw-register", "node_modules/.pnpm/@builder.io+qwik-city@1.4.5_@types+node@20.11.19/node_modules/@builder.io/qwik-city/index.qwik.mjs"] }, "q-CAtsXEfr.js": { "size": 512, "imports": ["q-C0VGK_Ln.js", "q-CBk6tas_.js"], "dynamicImports": ["q-BJOP3UMW.js"], "origins": ["src/routes/index.tsx"] }, "q-CBk6tas_.js": { "size": 49110, "origins": ["node_modules/.pnpm/@builder.io+qwik@1.4.5_@types+node@20.11.19_undici@6.6.2/node_modules/@builder.io/qwik/core.min.mjs"] }, "q-CPnWhdnH.js": { "size": 1420, "imports": ["q-C0VGK_Ln.js", "q-CBk6tas_.js"], "dynamicImports": ["q-BQUTwqcc.js", "q-CQOinMcf.js"], "origins": ["node_modules/.pnpm/@qwikest+icons@0.0.13_@builder.io+qwik@1.4.5/node_modules/@qwikest/icons/lib/lu.qwik.mjs", "src/components/Card.tsx", "src/components/TodoCard.tsx"] }, "q-CQOinMcf.js": { "size": 262, "imports": ["q-CBk6tas_.js"], "origins": ["src/entry_Card.js", "src/s_0kdlydrbz0s.js"], "symbols": ["s_0KDLYDrBz0s"] }, "q-CZK_xU5Y.js": { "size": 339, "imports": ["q-CBk6tas_.js"], "dynamicImports": ["q-DI1EDess.js"], "origins": ["src/global.css", "src/root.tsx"] }, "q-D5z-lxYq.js": { "size": 442, "imports": ["q-CBk6tas_.js"], "dynamicImports": ["q-DnacZLuZ.js"], "origins": ["src/routes/layout.tsx"] }, "q-Dd7NA-Re.js": { "size": 996, "imports": ["q-C0VGK_Ln.js", "q-CBk6tas_.js"], "origins": ["src/entry_QwikCityMockProvider.js", "src/s_bubtvtyvvre.js", "src/s_wmyc5h00wti.js"], "symbols": ["s_BUbtvTyvVRE", "s_WmYC5H00wtI"] }, "q-DI1EDess.js": { "size": 757, "imports": ["q-C0VGK_Ln.js", "q-CBk6tas_.js"], "dynamicImports": ["q-Z5SESiQD.js"], "origins": ["src/entry_root.js", "src/head.tsx", "src/s_emq0iidlpoo.js"], "symbols": ["s_emq0iIDlPOo"] }, "q-DI3uco-7.js": { "size": 1212, "imports": ["q-C0VGK_Ln.js", "q-CBk6tas_.js"], "origins": ["src/entry_GetForm.js", "src/s_nk9plpjqm9y.js", "src/s_p9msze0ojs4.js"], "symbols": ["s_Nk9PlpjQm9Y", "s_p9MSze0ojs4"] }, "q-DloBs3uZ.js": { "size": 890, "imports": ["q-C0VGK_Ln.js", "q-CBk6tas_.js"], "origins": ["src/entry_serverQrl.js", "src/s_woipfiq04l4.js"], "symbols": ["s_wOIPfiQ04l4"] }, "q-DnacZLuZ.js": { "size": 230, "imports": ["q-CBk6tas_.js"], "origins": ["src/entry_RootLayout.js", "src/s_axfkoub3zoe.js"], "symbols": ["s_AXfkOub3zOE"] }, "q-DU2OJCeM.js": { "size": 751, "imports": ["q-CBk6tas_.js"], "origins": ["src/entry_routeActionQrl.js", "src/s_a5bzc7wo00a.js"], "symbols": ["s_A5bZC7WO00A"] }, "q-Dx_vboBs.js": { "size": 5822, "imports": ["q-C0VGK_Ln.js", "q-CBk6tas_.js"], "dynamicImports": ["q-BPWr2Cgn.js", "q-CAtsXEfr.js", "q-D5z-lxYq.js"], "origins": ["@qwik-city-plan", "src/entry_QwikCityProvider.js", "src/s_02wmimzeabk.js", "src/s_fx0bdjeja0e.js", "src/s_rpdjaz33wla.js", "src/s_txcfoy819ag.js"], "symbols": ["s_02wMImzEAbk", "s_fX0bDjeJa0E", "s_RPDJAz33WLA", "s_TxCFOy819ag"] }, "q-fJkQnue_.js": { "size": 2286, "origins": ["src/entry_spaInit.js", "src/s_dyvc0ybiqqu.js"], "symbols": ["s_DyVc0YBIqQU"] }, "q-Z5SESiQD.js": { "size": 671, "imports": ["q-C0VGK_Ln.js", "q-CBk6tas_.js"], "origins": ["src/entry_Head.js", "src/s_b2vi3mzwnr4.js"], "symbols": ["s_b2vi3MZWnR4"] } }, "injections": [{ "tag": "style", "location": "head", "attributes": { "data-src": "/build/q-Cx3v5Yvk.css", "dangerouslySetInnerHTML": '/*! tailwindcss v3.3.3 | MIT License | https://tailwindcss.com\n */*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container{width:100%}@media (min-width: 450px){.container{max-width:450px}}.mx-auto{margin-left:auto;margin-right:auto}.flex{display:flex}.hidden{display:none}.h-screen{height:100vh}.w-full{width:100%}.w-screen{width:100vw}.flex-1{flex:1 1 0%}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-5{gap:1.25rem}.rounded-md{border-radius:.375rem}.border-neutral-200{--tw-border-opacity: 1;border-color:rgb(229 229 229 / var(--tw-border-opacity))}.bg-inherit{background-color:inherit}.bg-neutral-100{--tw-bg-opacity: 1;background-color:rgb(245 245 245 / var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.\\!p-0{padding:0!important}.p-5{padding:1.25rem}.py-5{padding-top:1.25rem;padding-bottom:1.25rem}.pl-5{padding-left:1.25rem}.pr-5{padding-right:1.25rem}.text-center{text-align:center}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-neutral-800{--tw-text-opacity: 1;color:rgb(38 38 38 / var(--tw-text-opacity))}.shadow-md{--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1);--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.outline-none{outline:2px solid transparent;outline-offset:2px}html{line-height:1;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}body{padding:0;margin:0;line-height:inherit}@media (prefers-color-scheme: dark){.dark\\:bg-neutral-800{--tw-bg-opacity: 1;background-color:rgb(38 38 38 / var(--tw-bg-opacity))}.dark\\:bg-neutral-900{--tw-bg-opacity: 1;background-color:rgb(23 23 23 / var(--tw-bg-opacity))}.dark\\:text-neutral-200{--tw-text-opacity: 1;color:rgb(229 229 229 / var(--tw-text-opacity))}}@media (min-width: 450px){.mobile\\:w-mobile{width:450px}.mobile\\:px-0{padding-left:0;padding-right:0}}\n' } }], "version": "1", "options": { "target": "client", "buildMode": "production", "entryStrategy": { "type": "smart" } }, "platform": { "qwik": "1.4.5", "vite": "", "rollup": "4.12.0", "env": "node", "os": "darwin", "node": "21.6.2" } };
const s_b2vi3MZWnR4 = () => {
  const head = useDocumentHead();
  const loc = useLocation();
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: [
      /* @__PURE__ */ _jsxQ("title", null, null, head.title, 1, null),
      /* @__PURE__ */ _jsxQ("link", null, {
        href: _fnSignal((p0) => p0.url.href, [
          loc
        ], "p0.url.href"),
        rel: "canonical"
      }, null, 3, null),
      /* @__PURE__ */ _jsxQ("meta", null, {
        content: "width=device-width, initial-scale=1.0",
        name: "viewport"
      }, null, 3, null),
      /* @__PURE__ */ _jsxQ("link", null, {
        href: "/favicon.svg",
        rel: "icon",
        type: "image/svg+xml"
      }, null, 3, null),
      head.meta.map((m) => /* @__PURE__ */ _jsxS("meta", {
        ...m
      }, null, 0, m.key)),
      head.links.map((l) => /* @__PURE__ */ _jsxS("link", {
        ...l
      }, null, 0, l.key)),
      head.styles.map((s) => /* @__PURE__ */ _jsxS("style", {
        ...s.props,
        dangerouslySetInnerHTML: _wrapSignal(s, "style")
      }, null, 0, s.key))
    ]
  }, 1, "cH_0");
};
const Head = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_b2vi3MZWnR4, "s_b2vi3MZWnR4"));
const s_emq0iIDlPOo = () => /* @__PURE__ */ _jsxC(QwikCityProvider, {
  children: [
    /* @__PURE__ */ _jsxQ("head", null, null, [
      /* @__PURE__ */ _jsxQ("meta", null, {
        charSet: "utf-8"
      }, null, 3, null),
      /* @__PURE__ */ _jsxQ("link", null, {
        href: "/manifest.json",
        rel: "manifest"
      }, null, 3, null),
      /* @__PURE__ */ _jsxC(Head, null, 3, "fY_0")
    ], 1, null),
    /* @__PURE__ */ _jsxQ("body", null, {
      class: "bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200",
      lang: "en"
    }, [
      /* @__PURE__ */ _jsxC(RouterOutlet, null, 3, "fY_1"),
      /* @__PURE__ */ _jsxC(ServiceWorkerRegister, null, 3, "fY_2")
    ], 1, null)
  ]
}, 1, "fY_3");
const Root = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_emq0iIDlPOo, "s_emq0iIDlPOo"));
function ssrEntry(opts) {
  return renderToStream(/* @__PURE__ */ _jsxC(Root, null, 3, "5z_0"), {
    manifest,
    ...opts,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang: "en-us",
      ...opts.containerAttributes
    }
  });
}
export {
  ssrEntry as a,
  manifest as m,
  setServerPlatform2 as s
};
