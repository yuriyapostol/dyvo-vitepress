import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Local Development","description":"","frontmatter":{},"headers":[],"relativePath":"development/local-development.md","filePath":"development/local-development.md"}');
const _sfc_main = { name: "development/local-development.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="local-development" tabindex="-1">Local Development <a class="header-anchor" href="#local-development" aria-label="Permalink to &quot;Local Development&quot;">​</a></h1><p>The repository should support independent package development and documentation development in the same codebase.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("development/local-development.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const localDevelopment = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  localDevelopment as default
};
