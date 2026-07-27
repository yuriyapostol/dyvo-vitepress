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
- кольори: `info`, `tip`, `warning`, `danger`, `success`;
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
  <DyvoBadge text="З зображенням" image-src="/logo.svg" image-alt="Логотип проєкту" />
  <DyvoBadge text="Кастомний слот" image-alt="Логотип проєкту">
    <template #image>
      <img src="/logo.svg" alt="Логотип проєкту" />
    </template>
  </DyvoBadge>
</div>

```md
<DyvoBadge text="Стабільно" color="success" variant="soft" />
<DyvoBadge text="Експериментально" color="warning" variant="outline" />
<DyvoBadge text="GitHub" color="info" variant="accent" href="https://github.com/yuriyapostol/dyvo-vitepress" />
<DyvoBadge text="З зображенням" image-src="/logo.svg" image-alt="Логотип проєкту" />
<DyvoBadge text="Кастомний слот" image-alt="Логотип проєкту">
  <template #image>
    <img src="/logo.svg" alt="Логотип проєкту" />
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
    avatar-src="/logo.svg"
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
  avatar-src="/logo.svg"
  href="https://example.com/team/yuriy"
  color="tip"
  variant="accent"
/>
```

## Порівняння з `Badge` у VitePress

Використовуй вбудований `Badge` з VitePress, коли потрібен невеликий inline-маркер всередині тексту, наприклад:

<div style="margin: 16px 0;">
  API Reference <Badge type="tip" text="stable" />
</div>

```md
API Reference <Badge type="tip" text="stable" />
```

Використовуй `DyvoBadge`, коли потрібні:

- більші візуальні варіанти;
- поведінка клікабельного бейджа;
- підтримка зображень;
- явне керування розміром;
- pill-like компонент, який може стояти окремо в контенті.

Використовуй `DyvoUserBadge`, коли потрібні:

- аватар;
- швидка прив’язка до GitHub-профілю;
- відображення автора або учасника.

Коротко:

- `Badge` з VitePress — простіший inline-примітив.
- `DyvoBadge` — гнучкіший theme-level бейдж.
- `DyvoUserBadge` — спеціалізований бейдж автора поверх `DyvoBadge`.
