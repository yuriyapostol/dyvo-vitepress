import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Локальна розробка","description":"","frontmatter":{},"headers":[],"relativePath":"uk/development/local-development.md","filePath":"uk/development/local-development.md"}');
const _sfc_main = { name: "uk/development/local-development.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="локальна-розробка" tabindex="-1">Локальна розробка <a class="header-anchor" href="#локальна-розробка" aria-label="Permalink to &quot;Локальна розробка&quot;">​</a></h1><p>Репозиторій має підтримувати незалежну розробку пакета і документації в межах однієї кодової бази.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("uk/development/local-development.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const localDevelopment = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  localDevelopment as default
};
