import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Стратегія щодо upstream","description":"","frontmatter":{},"headers":[],"relativePath":"uk/development/upstream-strategy.md","filePath":"uk/development/upstream-strategy.md"}');
const _sfc_main = { name: "uk/development/upstream-strategy.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="стратегія-щодо-upstream" tabindex="-1">Стратегія щодо upstream <a class="header-anchor" href="#стратегія-щодо-upstream" aria-label="Permalink to &quot;Стратегія щодо upstream&quot;">​</a></h1><p>Бажана послідовність така:</p><ol><li>Спершу вирішувати завдання на рівні пакета.</li><li>Якщо бракує загальної точки розширення, пропонувати її в upstream.</li><li>Локально тримати лише мінімальні тимчасові обходи.</li></ol></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("uk/development/upstream-strategy.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const upstreamStrategy = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  upstreamStrategy as default
};
