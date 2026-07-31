# Бейджі

Тема надає два кастомні компоненти бейджів:

- `DyvoBadge` для універсальних бейджів з підписом, варіантами оформлення, розмірами, опційним слотом зображення і посиланням.
- `DyvoUserBadge` для бейджів користувача або автора з ім’ям, аватаром і опційною інтеграцією з GitHub-профілем.

Оскільки тема розширює стандартну тему VitePress, оригінальний `Badge` з VitePress теж лишається доступним.

## Доступність

`DyvoBadge` і `DyvoUserBadge` глобально реєструються темою, тому їх можна напряму використовувати в markdown і на Vue-сторінках документації:

```html
<DyvoBadge text="Стабільно" />
<DyvoUserBadge name="Yuriy Apostol" github="yuriyapostol" />
```

## `DyvoBadge`

`DyvoBadge` підтримує:

- текст через проп `text` або default slot;
- кольори через `color`: `info`, `tip`, `warning`, `danger`, `success`;
- варіанти: `soft`, `accent`, `solid`, `outline`, `plain`;
- розміри: `small`, `medium`, `large`;
- вертикальне вирівнювання через `verticalAlign`: `unset`, `baseline`, `middle`, `super`, `sub`;
- опційне зображення через параметри `imageSrc` / `imageAlt` або слот `image`;
- опційне посилання через `href`;
- інтерактивний стан через `interactive`;
- вимкнений стан через `disabled`.

Приклад:

<div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center; margin: 16px 0;">
  <DyvoBadge text="Стабільно" color="success" variant="soft" />
  <DyvoBadge text="Експериментально" color="warning" variant="outline" />
  <DyvoBadge text="GitHub" color="info" variant="accent" href="https://github.com/yuriyapostol/dyvo-vitepress" />
  <DyvoBadge text="З зображенням" image-src="https://github.com/yuriyapostol.png?size=80" image-alt="Логотип проєкту" />
</div>

```html
<DyvoBadge text="Стабільно" color="success" variant="soft" />
<DyvoBadge text="Експериментально" color="warning" variant="outline" />
<DyvoBadge text="GitHub" color="info" variant="accent" href="https://github.com/yuriyapostol/dyvo-vitepress" />
<DyvoBadge text="З зображенням" image-src="https://github.com/yuriyapostol.png?size=80" image-alt="Логотип проєкту" />
```

Підпис можна передавати і через default slot:

<div style="margin: 16px 0;">
  <DyvoBadge color="tip" variant="solid">Рекомендовано</DyvoBadge>
</div>

```html
<DyvoBadge color="tip" variant="solid">Рекомендовано</DyvoBadge>
```

Кастомне зображення через слот `image`:

<div style="margin: 16px 0;">
  <DyvoBadge text="Кастомний слот" image-alt="Логотип проєкту">
    <template #image>
      <img src="https://avatars.githubusercontent.com/u/252810981?s=64&v=4" alt="Логотип проєкту" />
    </template>
  </DyvoBadge>
</div>

```html
<DyvoBadge text="Кастомний слот" image-alt="Логотип проєкту">
  <template #image>
    <img src="https://avatars.githubusercontent.com/u/252810981?s=64&v=4" alt="Логотип проєкту" />
  </template>
</DyvoBadge>
```

Розміри:

<div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center; margin: 16px 0;">
  <DyvoBadge size="large" image="https://github.com/yuriyapostol.png?size=80">large</DyvoBadge>
  <DyvoBadge size="medium" image="https://github.com/yuriyapostol.png?size=80">medium</DyvoBadge>
  <DyvoBadge size="small" image="https://github.com/yuriyapostol.png?size=80">small</DyvoBadge>
</div>

```html
<DyvoBadge size="large" image="https://github.com/yuriyapostol.png?size=80">large</DyvoBadge>
<DyvoBadge size="medium" image="https://github.com/yuriyapostol.png?size=80">medium</DyvoBadge>
<DyvoBadge size="small" image="https://github.com/yuriyapostol.png?size=80">small</DyvoBadge>
```

Компактні бейджі також добре працюють у заголовках:

<div style="display:grid; gap:8px; margin:16px 0;">
  <h1 style="margin:0; padding:0; border:0;">Заголовок першого рівня <DyvoBadge color="info" variant="solid">h1</DyvoBadge></h1>
  <h2 style="margin:0; padding:0; border:0;">Заголовок другого рівня <DyvoBadge>h2</DyvoBadge></h2>
  <h3 style="margin:0; padding:0; border:0;">Заголовок третього рівня <DyvoBadge color="warning">h3</DyvoBadge></h3>
</div>

```html
# Заголовок першого рівня <DyvoBadge color="info" variant="solid">h1</DyvoBadge>
## Заголовок другого рівня <DyvoBadge>h2</DyvoBadge>
### Заголовок третього рівня <DyvoBadge color="warning">h3</DyvoBadge>
```

Нижче наведено типові поєднання кольорів і варіантів:

<style>
.badge-matrix tr:nth-child(2n) {
  background: transparent;
}
</style>

<table class="badge-matrix">
<thead>
<tr>
<th><code>soft</code></th>
<th><code>accent</code></th>
<th><code>solid</code></th>
<th><code>outline</code></th>
<th><code>plain</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><DyvoBadge color="info" variant="soft">info</DyvoBadge></td>
<td><DyvoBadge color="info" variant="accent">info</DyvoBadge></td>
<td><DyvoBadge color="info" variant="solid">info</DyvoBadge></td>
<td><DyvoBadge color="info" variant="outline">info</DyvoBadge></td>
<td><DyvoBadge color="info" variant="plain">info</DyvoBadge></td>
</tr>
<tr>
<td><DyvoBadge color="tip" variant="soft">tip</DyvoBadge></td>
<td><DyvoBadge color="tip" variant="accent">tip</DyvoBadge></td>
<td><DyvoBadge color="tip" variant="solid">tip</DyvoBadge></td>
<td><DyvoBadge color="tip" variant="outline">tip</DyvoBadge></td>
<td><DyvoBadge color="tip" variant="plain">tip</DyvoBadge></td>
</tr>
<tr>
<td><DyvoBadge color="warning" variant="soft">warning</DyvoBadge></td>
<td><DyvoBadge color="warning" variant="accent">warning</DyvoBadge></td>
<td><DyvoBadge color="warning" variant="solid">warning</DyvoBadge></td>
<td><DyvoBadge color="warning" variant="outline">warning</DyvoBadge></td>
<td><DyvoBadge color="warning" variant="plain">warning</DyvoBadge></td>
</tr>
<tr>
<td><DyvoBadge color="danger" variant="soft">danger</DyvoBadge></td>
<td><DyvoBadge color="danger" variant="accent">danger</DyvoBadge></td>
<td><DyvoBadge color="danger" variant="solid">danger</DyvoBadge></td>
<td><DyvoBadge color="danger" variant="outline">danger</DyvoBadge></td>
<td><DyvoBadge color="danger" variant="plain">danger</DyvoBadge></td>
</tr>
<tr>
<td><DyvoBadge color="success" variant="soft">success</DyvoBadge></td>
<td><DyvoBadge color="success" variant="accent">success</DyvoBadge></td>
<td><DyvoBadge color="success" variant="solid">success</DyvoBadge></td>
<td><DyvoBadge color="success" variant="outline">success</DyvoBadge></td>
<td><DyvoBadge color="success" variant="plain">success</DyvoBadge></td>
</tr>
</tbody>
</table>

Для зворотної сумісності рядкове URL-значення в `image` теж працює, але явний проп для адреси зображення тепер `imageSrc`.

`color`, `variant`, `size` і `verticalAlign` також можна передавати через атрибут `class` із префіксними назвами класів:

```html
<DyvoBadge class="color-success variant-solid size-medium vertical-align-middle">Вирівняний бейдж</DyvoBadge>
```

Оформлення бейджа також можна змінювати через CSS-змінні, передані в атрибуті `style`:

<div style="margin: 16px 0;">
  <DyvoBadge
    variant="accent"
    style="--dyvo-badge-current-text-color: #48a103; --dyvo-badge-current-bg-color: #48a10330;"
  >
    Кастомний зелений
  </DyvoBadge>
</div>

```html
<DyvoBadge
  variant="accent"
  style="--dyvo-badge-current-text-color: #48a103; --dyvo-badge-current-bg-color: #48a10330;"
>
  Кастомний зелений
</DyvoBadge>
```

## `DyvoUserBadge`

`DyvoUserBadge` обгортає `DyvoBadge` і додає дефолти для користувача або автора.

Він підтримує:

- обов’язковий `name`;
- опційний GitHub handle у `github`;
- опційний `href`, який перевизначає посилання;
- опційні `avatarSrc` і `avatarAlt`;
- опційний `text` для перевизначення видимого підпису;
- ті самі `color`, `variant`, `size`, `interactive` і `disabled`, що й `DyvoBadge`.

Якщо передано `github`:

- посиланням за замовчуванням стає `https://github.com/<handle>`;
- аватаром за замовчуванням стає `https://github.com/<handle>.png?size=80`.

Приклади:

<div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center; margin: 16px 0;">
  <DyvoUserBadge name="Yuriy Apostol" github="yuriyapostol" />
  <DyvoUserBadge
    name="Project maintainer"
    text="Maintainer"
    avatar-src="https://github.com/yuriyapostol.png?size=80"
    href="https://example.com/team/yuriy"
    color="tip"
    variant="accent"
  />
</div>

```html
<DyvoUserBadge name="Yuriy Apostol" github="yuriyapostol" />
<DyvoUserBadge
  name="Project maintainer"
  text="Maintainer"
  avatar-src="https://github.com/yuriyapostol.png?size=80"
  href="https://example.com/team/yuriy"
  color="tip"
  variant="accent"
/>
```

`DyvoUserBadge` також зручно використовувати inline, поруч із текстом:

<p style="margin: 12px 0 0;"><DyvoUserBadge name="Юрій Апостол" github="yuriyapostol" /> - приклад використання `DyvoUserBadge` з текстом у тому ж рядку.</p>

## Порівняння з `Badge` у VitePress

`DyvoBadge` проєктувався так, щоб лишатися сумісним із типовими сценаріями використання стандартного `Badge` з VitePress, але водночас давати ширші можливості стилізації, посилань, розмірів і зображень.

Тому немає потреби змішувати `Badge` і `DyvoBadge` в одній документації, якщо ти не хочеш свідомо підтримувати дві різні візуальні системи.

Якщо потрібен один універсальний компонент, `DyvoBadge` можна використовувати і для простих inline-маркерів:

<div style="margin: 16px 0;">
  API Reference <DyvoBadge color="tip" variant="soft" size="small" text="stable" />
</div>

```html
API Reference <DyvoBadge color="tip" variant="soft" size="small" text="stable" />
```

Використовуй `DyvoBadge`, коли потрібні:

- один консистентний стиль бейджів по всьому сайту;
- сумісність із простими inline-бейджами;
- більші візуальні варіанти;
- інтерактивна поведінка бейджа;
- підтримка зображень;
- явне керування розміром;
- pill-like компонент, який може стояти окремо в контенті.

Якщо в markdown уже використовується стандартний `Badge` з VitePress, рекомендований шлях міграції — підключити окремий compatibility-wrapper, а не розширювати `DyvoBadge` legacy-пропсами.

Для цього пакет експортує компонент `Badge`, але він не реєструється автоматично. Його можна підключити вручну у своїй темі:

```ts
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { Badge, theme as dyvoTheme } from '@yuriyapostol/dyvo-vitepress'

const theme: Theme = {
  extends: dyvoTheme,
  enhanceApp(ctx) {
    dyvoTheme.enhanceApp?.(ctx)
    ctx.app.component('Badge', Badge)
  }
}

export default theme
```

Такий wrapper зберігає VitePress-style API з пропом `type` і передає його в `DyvoBadge` через `color`, тому існуючий markdown може й далі використовувати, наприклад:

```html
API Reference <Badge type="tip" text="stable" />
```