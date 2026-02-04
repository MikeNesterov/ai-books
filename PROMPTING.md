# Руководство по Промптингу (Prompting Guide)

Чтобы сохранить единый стиль и похожих персонажей при использовании разных нейросетей (Midjourney, Stable Diffusion, DALL-E), используйте следующую структуру.

## Структура Промпта (Mega-Prompt)

`[СТИЛЬ] + [ПЕРСОНАЖ] + [ДЕЙСТВИЕ/СЦЕНА] + [ОКРУЖЕНИЕ] + [ДЕТАЛИ/ОСВЕЩЕНИЕ]`

### 1. Токен Стиля (Всегда в начале)
> modern anime style, studio ghibli inspired but with 3D volume, vibrant and lively colors, volumetric lighting, cinematic atmosphere, high depth of field, 8k, masterpiece, child-friendly PG rating.

### 2. Токен Персонажа (Копировать из файла персонажа)
Для Джоаны всегда используйте (из `Мир и Лор/Персонажи/Джоана.md`):
> Joana, young woman photographer, early 20s, medium-length chestnut brown hair tied back in a low ponytail, warm brown eyes (important: brown not blue), cheerful expressive face, slightly tanned skin, wearing a beige multi-pocket safari vest over a cream-white long-sleeve shirt with rolled-up sleeves, olive green cargo pants, brown hiking boots, brown backpack

### 3. Сцена и Окружение (Меняется для каждого кадра)
Описывайте конкретное действие.
> *Example*: sitting on a park bench looking at photos, autumn park background with falling leaves.

## Пример полного промпта
> modern anime style, studio ghibli inspired but with 3D volume, vibrant and lively colors, volumetric lighting, cinematic atmosphere, high depth of field, 8k, masterpiece, child-friendly PG rating, **Joana, young woman photographer, early 20s, medium-length chestnut brown hair tied back in a low ponytail, warm brown eyes (important: brown not blue), cheerful expressive face, slightly tanned skin, wearing a beige multi-pocket safari vest over a cream-white long-sleeve shirt with rolled-up sleeves, olive green cargo pants**, holding a camera and looking surprised, dark stormy jungle background, glowing magical particles in the air, mystical atmosphere.
