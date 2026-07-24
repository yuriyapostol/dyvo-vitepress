import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"News","description":"","frontmatter":{},"headers":[],"relativePath":"usage/news.md","filePath":"usage/news.md"}');
const _sfc_main = { name: "usage/news.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="news" tabindex="-1">News <a class="header-anchor" href="#news" aria-label="Permalink to &quot;News&quot;">​</a></h1><p>The news feature is intended to provide reusable listing and metadata components for markdown-backed news content.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("usage/news.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const news = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  news as default
};
