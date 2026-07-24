import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Тема","description":"","frontmatter":{},"headers":[],"relativePath":"uk/usage/theme.md","filePath":"uk/usage/theme.md"}');
const _sfc_main = { name: "uk/usage/theme.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="тема" tabindex="-1">Тема <a class="header-anchor" href="#тема" aria-label="Permalink to &quot;Тема&quot;">​</a></h1><p>Тема пакета має обгортати стандартні можливості VitePress і додавати повторно використовувану кастомну поведінку.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("uk/usage/theme.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const theme = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  theme as default
};
