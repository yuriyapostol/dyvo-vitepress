import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Новини","description":"","frontmatter":{},"headers":[],"relativePath":"uk/usage/news.md","filePath":"uk/usage/news.md"}');
const _sfc_main = { name: "uk/usage/news.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="новини" tabindex="-1">Новини <a class="header-anchor" href="#новини" aria-label="Permalink to &quot;Новини&quot;">​</a></h1><p>Фіча новин має надавати повторно використовувані компоненти списків і метаданих для markdown-новин.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("uk/usage/news.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const news = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  news as default
};
