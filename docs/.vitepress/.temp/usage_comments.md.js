import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Comments","description":"","frontmatter":{},"headers":[],"relativePath":"usage/comments.md","filePath":"usage/comments.md"}');
const _sfc_main = { name: "usage/comments.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="comments" tabindex="-1">Comments <a class="header-anchor" href="#comments" aria-label="Permalink to &quot;Comments&quot;">​</a></h1><p>The comments feature is intended to host reusable discussion integration, starting with Giscus.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("usage/comments.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const comments = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  comments as default
};
