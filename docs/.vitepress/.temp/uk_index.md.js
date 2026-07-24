import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"dyvo-vitepress","description":"","frontmatter":{},"headers":[],"relativePath":"uk/index.md","filePath":"uk/index.md"}');
const _sfc_main = { name: "uk/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="dyvo-vitepress" tabindex="-1">dyvo-vitepress <a class="header-anchor" href="#dyvo-vitepress" aria-label="Permalink to &quot;dyvo-vitepress&quot;">​</a></h1><p>Пакет із повторно використовуваною темою, фічами та утилітами для VitePress.</p><p>Цей сайт документації є частиною репозиторію і навмисно використовується для dogfooding пакета.</p><ul><li>Почніть з <a href="./getting-started">Початку роботи</a></li><li>Перегляньте <a href="./architecture">Архітектуру</a></li><li>Прочитайте <a href="./specification">Специфікацію</a></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("uk/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
