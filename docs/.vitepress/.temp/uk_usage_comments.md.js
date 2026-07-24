import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Коментарі","description":"","frontmatter":{},"headers":[],"relativePath":"uk/usage/comments.md","filePath":"uk/usage/comments.md"}');
const _sfc_main = { name: "uk/usage/comments.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="коментарі" tabindex="-1">Коментарі <a class="header-anchor" href="#коментарі" aria-label="Permalink to &quot;Коментарі&quot;">​</a></h1><p>Фіча коментарів має містити повторно використовувану інтеграцію з обговореннями, починаючи з Giscus.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("uk/usage/comments.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const comments = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  comments as default
};
