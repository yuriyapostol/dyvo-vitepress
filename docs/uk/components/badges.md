# Бейджі

Тема надає два кастомні компоненти бейджів:

- `DyvoBadge` для універсальних бейджів з підписом, варіантами оформлення, розмірами, опційним слотом зображення і посиланням.
- `DyvoUserBadge` для бейджів користувача або автора з ім’ям, аватаром і опційною інтеграцією з GitHub-профілем.

Оскільки тема розширює стандартну тему VitePress, оригінальний `Badge` з VitePress теж лишається доступним.

## Доступність

`DyvoBadge` і `DyvoUserBadge` глобально реєструються темою, тому їх можна напряму використовувати в markdown і на Vue-сторінках документації:

```md
<DyvoBadge text="Стабільно" />
<DyvoUserBadge name="Yuriy Apostol" github="yuriyapostol" />
```

## `DyvoBadge`

`DyvoBadge` підтримує:

- текст через проп `text` або default slot;
- кольори через `color`: `info`, `tip`, `warning`, `danger`, `success`;
- варіанти: `soft`, `accent`, `solid`, `outline`, `plain`;
- розміри: `small`, `medium`, `large`;
- опційне зображення через слот `image` і `imageSrc` / `imageAlt`;
- опційне посилання через `href`;
- інтерактивний стан через `clickable`;
- вимкнений стан через `disabled`.

Приклад:

<div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center; margin: 16px 0;">
  <DyvoBadge text="Стабільно" color="success" variant="soft" />
  <DyvoBadge text="Експериментально" color="warning" variant="outline" />
  <DyvoBadge text="GitHub" color="info" variant="accent" href="https://github.com/yuriyapostol/dyvo-vitepress" />
  <DyvoBadge text="З зображенням" image-src="https://github.com/yuriyapostol.png?size=80" image-alt="Логотип проєкту" />
  <DyvoBadge text="Кастомний слот" image-alt="Логотип проєкту">
    <template #image>
      <img src="https://github.com/yuriyapostol.png?size=80" alt="Логотип проєкту" />
    </template>
  </DyvoBadge>
</div>

```md
<DyvoBadge text="Стабільно" color="success" variant="soft" />
<DyvoBadge text="Експериментально" color="warning" variant="outline" />
<DyvoBadge text="GitHub" color="info" variant="accent" href="https://github.com/yuriyapostol/dyvo-vitepress" />
<DyvoBadge text="З зображенням" image-src="https://github.com/yuriyapostol.png?size=80" image-alt="Логотип проєкту" />
<DyvoBadge text="Кастомний слот" image-alt="Логотип проєкту">
  <template #image>
    <img src="https://github.com/yuriyapostol.png?size=80" alt="Логотип проєкту" />
  </template>
</DyvoBadge>
```

Підпис можна передавати і через default slot:

<div style="margin: 16px 0;">
  <DyvoBadge color="tip" variant="solid">Рекомендовано</DyvoBadge>
</div>

```md
<DyvoBadge color="tip" variant="solid">Рекомендовано</DyvoBadge>
```

Для зворотної сумісності рядкове URL-значення в `image` теж працює, але явний проп для адреси зображення тепер `imageSrc`.

## `DyvoUserBadge`

`DyvoUserBadge` обгортає `DyvoBadge` і додає дефолти для користувача або автора.

Він підтримує:

- обов’язковий `name`;
- опційний GitHub handle у `github`;
- опційний `href`, який перевизначає посилання;
- опційні `avatarSrc` і `avatarAlt`;
- опційний `text` для перевизначення видимого підпису;
- ті самі `color`, `variant`, `size`, `clickable` і `disabled`, що й `DyvoBadge`.

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

```md
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

## Вітрина бейджів

# Заголовок першого рівня <DyvoBadge color="info" variant="solid">h1</DyvoBadge>

## Заголовок другого рівня <DyvoBadge>h2</DyvoBadge>

### Заголовок третього рівня <DyvoBadge color="warning">h3</DyvoBadge>

<p><DyvoUserBadge name="Юрій Апостол" github="yuriyapostol" /> - приклад використання `DyvoUserBadge` з текстом у тому ж рядку.</p>

<br>
<DyvoBadge
  color="info"
  variant="soft"
  image="https://github.com/yuriyapostol.png?size=80"
  size="large"
>Юрій Апостол</DyvoBadge>
<span> DyvoBadge можна використовувати із зображенням.</span>

<br>
<DyvoBadge
  color="tip"
  variant="soft"
  image="https://github.com/yuriyapostol.png?size=80"
  size="large"
>large</DyvoBadge>
<DyvoBadge
  color="tip"
  variant="soft"
  image="https://github.com/yuriyapostol.png?size=80"
  size="medium"
>medium</DyvoBadge>
<DyvoBadge
  color="tip"
  variant="soft"
  image="https://github.com/yuriyapostol.png?size=80"
  size="small"
>small</DyvoBadge>

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

## Порівняння з `Badge` у VitePress

`DyvoBadge` проєктувався так, щоб лишатися сумісним із типовими сценаріями використання стандартного `Badge` з VitePress, але водночас давати ширші можливості стилізації, посилань, розмірів і зображень.

Тому немає потреби змішувати `Badge` і `DyvoBadge` в одній документації, якщо ти не хочеш свідомо підтримувати дві різні візуальні системи.

Якщо потрібен один універсальний компонент, `DyvoBadge` можна використовувати і для простих inline-маркерів:

<div style="margin: 16px 0;">
  API Reference <DyvoBadge color="tip" variant="soft" size="small" text="stable" />
</div>

```md
API Reference <DyvoBadge color="tip" variant="soft" size="small" text="stable" />
```

Використовуй `DyvoBadge`, коли потрібні:

- один консистентний стиль бейджів по всьому сайту;
- сумісність із простими inline-бейджами;
- більші візуальні варіанти;
- поведінка клікабельного бейджа;
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

```md
API Reference <Badge type="tip" text="stable" />
```

Використовуй `DyvoUserBadge`, коли потрібні:

- аватар;
- швидка прив’язка до GitHub-профілю;
- відображення автора або учасника.

Коротко:

- `DyvoBadge` може одночасно виконувати роль і простого inline-бейджа, і більш потужного theme-level бейджа.
- `DyvoUserBadge` — спеціалізований бейдж автора поверх `DyvoBadge`.
