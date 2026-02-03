# Site-Specific Localization Guide

## Tuzilma

Har bir sayt uchun alohida translation fayllar:

```
public/
  locales/
    uz/translation.json          # Asosiy sayt (default)
    ru/translation.json
    en/translation.json
    sites/
      tashkent/                   # Toshkent kutubxonasi
        uz/translation.json
        ru/translation.json
        en/translation.json
      samarkand/                  # Samarqand kutubxonasi
        uz/translation.json
        ru/translation.json
        en/translation.json
      bukhara/                    # Buxoro kutubxonasi
        uz/translation.json
        ru/translation.json
        en/translation.json
```

## Qanday ishlaydi

1. **Fallback tizimi:**
   - Avval site-specific translation izlanadi
   - Topilmasa, default (main site) translation ishlatiladi
   - Har bir key individual override qilish mumkin

2. **Merge strategiyasi:**
   ```javascript
   // Default translation
   {
     "banner": { "title": "Respublika kutubxonasi" },
     "services": { "title": "Xizmatlar" }
   }

   // Site-specific override (faqat banner.title)
   {
     "banner": { "title": "Toshkent kutubxonasi" }
   }

   // Natija
   {
     "banner": { "title": "Toshkent kutubxonasi" },  // Overridden
     "services": { "title": "Xizmatlar" }            // Default
   }
   ```

## Yangi sayt uchun translation qo'shish

### 1-usul: Manual yaratish

```bash
# Yangi sayt papkasini yaratish
mkdir -p public/locales/sites/andijan/{uz,ru,en}

# Translation fayllarni yaratish
touch public/locales/sites/andijan/uz/translation.json
touch public/locales/sites/andijan/ru/translation.json
touch public/locales/sites/andijan/en/translation.json
```

### 2-usul: Template nusxalash

```bash
# Tashkent templateidan nusxalash
cp -r public/locales/sites/tashkent public/locales/sites/andijan

# Keyin fayllarni tahrirlash
```

## Translation fayl strukturasi

### Minimal struktura (faqat override kerak bo'lgan):

```json
{
  "site": {
    "name": "Andijon viloyat kutubxonasi",
    "welcome": "Andijon viloyat kutubxonasiga xush kelibsiz"
  },
  "banner": {
    "title": "Andijon - Ma'rifat markazi"
  }
}
```

### To'liq struktura (barcha qismlar):

```json
{
  "site": {
    "name": "...",
    "welcome": "...",
    "description": "..."
  },
  "banner": {
    "title": "...",
    "subtitle": "...",
    "description": "...",
    "cta": "..."
  },
  "services": {
    "title": "...",
    "library": "...",
    "digital": "...",
    "events": "...",
    "children": "..."
  },
  "contact": {
    "title": "...",
    "address": "...",
    "phone": "...",
    "email": "...",
    "workingHours": "..."
  },
  "about": {
    "title": "...",
    "history": "...",
    "mission": "..."
  },
  "news": {
    "title": "...",
    "readMore": "...",
    "latest": "..."
  }
}
```

## Componentda ishlatish

```tsx
import { useTranslation } from 'react-i18next';

function Banner() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('banner.title')}</h1>
      <p>{t('banner.description')}</p>
      <button>{t('banner.cta')}</button>
    </div>
  );
}
```

## Debugging

### Translation yuklanganini tekshirish:

```javascript
// Browser console-da
console.log(i18n.store.data);
```

### Current language:

```javascript
console.log(i18n.language); // "Uz", "Ru", or "En"
```

### Key mavjudligini tekshirish:

```javascript
console.log(i18n.exists('banner.title')); // true/false
```

## Best Practices

1. **Har doim default translation-ni to'ldiring** - Site-specific translation ixtiyoriy
2. **Consistent keys** - Barcha saytlarda bir xil key nomlaridan foydalaning
3. **Namespace** - Katta projektlar uchun namespace ishlatish tavsiya etiladi
4. **Version control** - Translation fayllarni git-da saqlang
5. **Review process** - Translation o'zgarishlarini code review qiling

## Misollar

### Toshkent saytida foydalanish:

```
URL: http://tashkent.localhost:3000
Translation: /public/locales/sites/tashkent/uz/translation.json
```

### Samarqand saytida foydalanish:

```
URL: http://samarkand.localhost:3000
Translation: /public/locales/sites/samarkand/uz/translation.json
```

### Asosiy saytda (subdomen yo'q):

```
URL: http://localhost:3000
Translation: /public/locales/uz/translation.json (default)
```

## Troubleshooting

**Problem:** Translation yuklanmayapti

**Yechim:**
1. Fayl yo'lini tekshiring: `public/locales/sites/{subdomain}/{lang}/translation.json`
2. JSON syntax xatolarini tekshiring
3. Browser console-da error bormi qarang
4. Cache-ni tozalang: `Ctrl+Shift+R` (hard refresh)

**Problem:** Ba'zi key-lar ko'rinmayapti

**Yechim:**
1. Key nomini to'g'ri yozganingizni tekshiring
2. Default translation-da key mavjudligini tekshiring
3. JSON strukturasini tekshiring (nested objects)

## Yangi til qo'shish

Agar yangi til qo'shmoqchi bo'lsangiz (masalan, O'zbekcha lotin):

1. Default translation qo'shing:
```bash
mkdir public/locales/uz-latn
# translation.json yaratish
```

2. `lib/siteI18n.ts` faylini yangilang:
```javascript
const defaultResources = {
  Uz: { ... },
  Ru: { ... },
  En: { ... },
  'Uz-Latn': { ... }  // Yangi til
};
```

3. Har bir sayt uchun yangi til faylini qo'shing (ixtiyoriy)

## API Integration

Kelajakda database-dan translation yuklanishi uchun:

```javascript
// lib/siteI18n.ts-ga qo'shish
export async function loadDynamicTranslations(siteId) {
  const response = await fetch(`/api/translations/${siteId}`);
  const data = await response.json();
  return data.translations;
}
```

Bu hozircha implementatsiya qilinmagan, lekin kerak bo'lganda qo'shish mumkin.
