import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Конфігурація","description":"","frontmatter":{},"headers":[],"relativePath":"uk/usage/configuration.md","filePath":"uk/usage/configuration.md"}');
const _sfc_main = { name: "uk/usage/configuration.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="конфігурація" tabindex="-1">Конфігурація <a class="header-anchor" href="#конфігурація" aria-label="Permalink to &quot;Конфігурація&quot;">​</a></h1><p>Сайт-споживач має по можливості тримати site-specific конфігурацію поза пакетом.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("uk/usage/configuration.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const configuration = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  configuration as default
};
