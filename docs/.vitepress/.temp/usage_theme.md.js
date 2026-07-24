import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Theme","description":"","frontmatter":{},"headers":[],"relativePath":"usage/theme.md","filePath":"usage/theme.md"}');
const _sfc_main = { name: "usage/theme.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="theme" tabindex="-1">Theme <a class="header-anchor" href="#theme" aria-label="Permalink to &quot;Theme&quot;">​</a></h1><p>The package theme should wrap VitePress default capabilities and add reusable custom behavior.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("usage/theme.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const theme = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  theme as default
};
