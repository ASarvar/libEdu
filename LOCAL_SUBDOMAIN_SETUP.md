# Local Subdomain Development Guide

## Localhost-da subdomen bilan ishlash

### Windows (hosts fayli orqali)

1. Administratot sifatida Notepad-ni oching
2. Quyidagi faylni oching:
   ```
   C:\Windows\System32\drivers\etc\hosts
   ```

3. Quyidagi qatorlarni qo'shing:
   ```
   127.0.0.1    tashkent.localhost
   127.0.0.1    samarkand.localhost
   127.0.0.1    bukhara.localhost
   127.0.0.1    andijan.localhost
   ```

4. Faylni saqlang

### macOS/Linux (hosts fayli orqali)

1. Terminal ochib quyidagi buyruqni kiriting:
   ```bash
   sudo nano /etc/hosts
   ```

2. Quyidagi qatorlarni qo'shing:
   ```
   127.0.0.1    tashkent.localhost
   127.0.0.1    samarkand.localhost
   127.0.0.1    bukhara.localhost
   127.0.0.1    andijan.localhost
   ```

3. `Ctrl+O` keyin `Enter` - saqlash
4. `Ctrl+X` - chiqish

### Server ishga tushirish

```bash
npm run dev
```

### Subdomenlarga kirish

- **Asosiy sayt**: http://localhost:3000
- **Tashkent kutubxonasi**: http://tashkent.localhost:3000
- **Samarqand kutubxonasi**: http://samarkand.localhost:3000
- **Buxoro kutubxonasi**: http://bukhara.localhost:3000
- **Andijon kutubxonasi**: http://andijan.localhost:3000

## Sayt yaratish

1. Superadmin sifatida kiriting: http://localhost:3000/admin/sites
2. "Yangi sayt yaratish" tugmasini bosing
3. Formani to'ldiring:
   - Subdomen: `tashkent` (faqat kichik harf, raqam, tire)
   - Nomi: `Toshkent viloyat kutubxonasi`
   - Logo yuklang (PNG/SVG, max 1MB)
   - Header style tanlang (1-7)
   - Footer style tanlang (1-3)
   - Home style tanlang (1-7)
   - Rang tanlang
   - Contact ma'lumotlarini kiriting

4. "Sayt yaratish" tugmasini bosing

5. Saytni ko'rish uchun: http://tashkent.localhost:3000

## Muhim:

- Har bir sayt o'zining layout, theme, va ranglariga ega
- Moderatorlar faqat o'z saytlariga kontent qo'sha oladi
- Adminlar bir nechta sayt boshqarishi mumkin
- Superadmin barcha saytlarni ko'radi va boshqaradi

## Texnik ma'lumot:

- Subdomen logic [`proxy.ts`](proxy.ts) faylida
- Layout selection [`components/layout/Layout.tsx`](components/layout/Layout.tsx) da
- Site API [`app/api/admin/sites/route.ts`](app/api/admin/sites/route.ts) da
- Database schema [`prisma/schema.prisma`](prisma/schema.prisma) da
