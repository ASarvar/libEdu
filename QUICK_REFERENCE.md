# 🚀 Quick Reference - Admin Dashboard Improvements

## 📦 New Files Created

```
lib/
├── middleware-auth.ts      # Middleware auth helpers
├── rate-limit.ts           # Rate limiting utility  
├── api-auth.ts             # API auth wrappers
├── client-auth.ts          # Client-side auth HOC
└── dynamic-imports.ts      # Performance helpers

components/admin/
└── AdminComponents.tsx     # Reusable UI components

public/css/
└── admin-components.css    # Component styles

app/
├── 403/page.tsx           # Forbidden page
├── (admin)/layout.tsx     # Admin route group
└── (public)/layout.tsx    # Public route group
```

---

## 🔐 Protecting API Routes

### Quick Pattern (Recommended):
```typescript
import { withAuthAndRateLimit } from '@/lib/api-auth';

export const GET = withAuthAndRateLimit(
  async (request, user) => {
    // user is already authenticated!
    return NextResponse.json({ data: user.id });
  },
  { allowedRoles: ['admin', 'superadmin'] }
);
```

### Available Wrappers:
```typescript
withAuth()              // Auth only
withRateLimit()         // Rate limit only
withAuthAndRateLimit()  // Both (recommended)
```

---

## 🛡️ Protecting Admin Pages

### Quick Pattern (Recommended):
```typescript
import { withAdminAuth, User } from '@/lib/client-auth';

interface MyPageProps {
  user: User;  // Auto-provided
}

const MyPage: React.FC<MyPageProps> = ({ user }) => {
  return <div>Welcome {user.full_name}!</div>;
};

export default withAdminAuth(MyPage, {
  allowedRoles: ['admin', 'superadmin']
});
```

### Using Hook Instead:
```typescript
import { useAdminAuth } from '@/lib/client-auth';

const MyPage = () => {
  const { user, loading, error } = useAdminAuth(['admin']);
  
  if (loading) return <div>Loading...</div>;
  return <div>Content</div>;
};
```

---

## 🎨 Using Admin Components

### Import Components:
```typescript
import {
  AdminCard,
  AdminTable,
  AdminButton,
  AdminBadge,
  AdminAlert,
  Admin FormGroup,
  AdminStatsCard,
  AdminModal
} from '@/components/admin/AdminComponents';

// Import styles in layout
import '@/public/css/admin-components.css';
```

### Quick Examples:

#### Card:
```tsx
<AdminCard title="Users" actions={<AdminButton>Add</AdminButton>}>
  Content here
</AdminCard>
```

#### Table:
```tsx
<AdminTable
  data={users}
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
  ]}
  loading={loading}
/>
```

#### Button:
```tsx
<AdminButton 
  variant="primary" 
  icon="fa-save"
  loading={saving}
  onClick={handleSave}
>
  Save
</AdminButton>
```

#### Form:
```tsx
<AdminFormGroup label="Email" required error={errors.email}>
  <input type="email" value={email} onChange={...} />
</AdminFormGroup>
```

#### Stats:
```tsx
<AdminStatsCard
  title="Total Users"
  value={123}
  icon="fa-users"
  color="blue"
  trend={{ value: 12, isPositive: true }}
/>
```

#### Modal:
```tsx
<AdminModal
  isOpen={show}
  onClose={() => setShow(false)}
  title="Edit User"
  footer={
    <AdminButton onClick={save}>Save</AdminButton>
  }
>
  Form content
</AdminModal>
```

---

## ⚡ Performance - Dynamic Imports

### Import Helper:
```typescript
import { Swiper, CountUp, loadGsap } from '@/lib/dynamic-imports';
```

### Components (Auto-loaded):
```tsx
<Swiper>
  <SwiperSlide>Content</SwiperSlide>
</Swiper>

<CountUp end={100} />
```

### Imperative (Manual load):
```typescript
useEffect(() => {
  const init = async () => {
    const gsap = await loadGsap();
    gsap.to('.element', { opacity: 1 });
  };
  init();
}, []);
```

---

## 🔒 Rate Limits (Current)

- **Login:** 5 attempts / 15 min
- **API:** 100 requests / min
- **Register:** 3 attempts / hour

### Custom Rate Limit:
```typescript
import { withRateLimit, RATE_LIMITS } from '@/lib/api-auth';

export const POST = withRateLimit(
  async (request) => { /* ... */ },
  RATE_LIMITS.PASSWORD_RESET
);
```

---

## 📋 Component Variants

### Button:
`primary` | `secondary` | `danger` | `success` | `warning`

### Badge:
`success` | `danger` | `warning` | `info` | `default`

### Alert:
`success` | `error` | `warning` | `info`

### Stats Card:
`blue` | `green` | `red` | `yellow` | `purple`

---

## 🐛 Common Issues

### "User prop undefined"
→ Wrap component with `withAdminAuth()`

### "Styles not loading"
→ Import in layout: `import '@/public/css/admin-components.css'`

### "Middleware redirect loop"
→ Check `/login` and `/403` are NOT protected

### "Rate limit not persisting"
→ Expected with in-memory storage, use Redis for production

---

## 📖 Full Documentation

- **Complete Guide:** [`ADMIN_IMPROVEMENTS_GUIDE.md`](ADMIN_IMPROVEMENTS_GUIDE.md)
- **Example Page:** [`EXAMPLE_ADMIN_PAGE.tsx`](EXAMPLE_ADMIN_PAGE.tsx)
- **Summary:** [`IMPLEMENTATION_SUMMARY.md`](IMPLEMENTATION_SUMMARY.md)

---

## ✅ Migration Checklist

### For API Routes
- [ ] Import `withAuthAndRateLimit`
- [ ] Replace manual auth checks
- [ ] Export using wrapper
- [ ] Test endpoint

### For Admin Pages  
- [ ] Import `withAdminAuth` and `User`
- [ ] Add user prop to component
- [ ] Remove manual auth code
- [ ] Wrap export
- [ ] Test page access

### For New Features
- [ ] Use component library
- [ ] Apply consistent styling
- [ ] Follow security patterns
- [ ] Add to documentation

---

**Quick Start:** Copy [`EXAMPLE_ADMIN_PAGE.tsx`](EXAMPLE_ADMIN_PAGE.tsx) for new admin pages!

**Last Updated:** February 11, 2026
