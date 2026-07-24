import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Початок роботи","description":"","frontmatter":{},"headers":[],"relativePath":"uk/getting-started.md","filePath":"uk/getting-started.md"}');
const _sfc_main = { name: "uk/getting-started.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="початок-роботи" tabindex="-1">Початок роботи <a class="header-anchor" href="#початок-роботи" aria-label="Permalink to &quot;Початок роботи&quot;">​</a></h1><p><code>dyvo-vitepress</code> — це повторно використовуваний пакет для сайтів на базі VitePress.</p><p>Пакет має надавати:</p><ul><li>ядро теми;</li><li>повторно використовувані фічі;</li><li>спільні конфігураційні утиліти.</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("uk/getting-started.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const gettingStarted = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  gettingStarted as default
};
