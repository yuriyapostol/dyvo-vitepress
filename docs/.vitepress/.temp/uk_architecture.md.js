import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Архітектура","description":"","frontmatter":{},"headers":[],"relativePath":"uk/architecture.md","filePath":"uk/architecture.md"}');
const _sfc_main = { name: "uk/architecture.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="архітектура" tabindex="-1">Архітектура <a class="header-anchor" href="#архітектура" aria-label="Permalink to &quot;Архітектура&quot;">​</a></h1><p>Репозиторій одночасно містить:</p><ul><li>вихідний код пакета в <code>src/</code>;</li><li>сайт документації пакета в <code>docs/</code>.</li></ul><p>Пакет має лишатися легким під час використання і відкривати назовні лише документовані entry points.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("uk/architecture.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const architecture = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  architecture as default
};
