import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Встановлення","description":"","frontmatter":{},"headers":[],"relativePath":"uk/usage/installation.md","filePath":"uk/usage/installation.md"}');
const _sfc_main = { name: "uk/usage/installation.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="встановлення" tabindex="-1">Встановлення <a class="header-anchor" href="#встановлення" aria-label="Permalink to &quot;Встановлення&quot;">​</a></h1><p>Спершу пакет можна підключати локально через залежність <code>file:</code>, а пізніше публікувати звичайним способом.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("uk/usage/installation.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const installation = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  installation as default
};
