# Library Platform Database Setup

## PostgreSQL Setup

### 1. Install PostgreSQL
Download and install PostgreSQL from https://www.postgresql.org/download/

### 2. Create Database
```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE kutubxona_db;

# Connect to database
\c kutubxona_db

# Run the schema
\i database/schema.sql
```

### 3. Generate Superadmin Password Hash
```bash
# Install bcryptjs globally if needed
npm install -g bcryptjs

# Generate hash (replace 'YourPassword123!' with your desired password)
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YourPassword123!', 10, (err, hash) => console.log(hash));"
```

### 4. Update Schema with Real Password Hash
Edit `database/schema.sql` and replace `$2b$10$YourBcryptHashHere` with the hash generated above.

Then re-run the INSERT statement:
```sql
INSERT INTO users (full_name, email, phone, password_hash, role, email_verified, is_active)
VALUES (
    'Super Admin',
    'superadmin@kutubxona.uz',
    '+998712334567',
    'YOUR_ACTUAL_BCRYPT_HASH',
    'superadmin',
    true,
    true
);
```

## Environment Configuration

### 1. Create .env file
```bash
cp .env.example .env
```

### 2. Update .env with your database credentials
```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=kutubxona_db
DB_PASSWORD=your_postgres_password
DB_PORT=5432

NEXT_PUBLIC_APP_URL=http://localhost:3000
SESSION_SECRET=your-super-secret-key-change-this
```

## Install Dependencies

```bash
npm install
```

This will install:
- `pg` - PostgreSQL client
- `bcryptjs` - Password hashing
- `uuid` - Generate unique IDs
- And their TypeScript type definitions

## Run Development Server

```bash
npm run dev
```

## Default Superadmin Credentials

After setting up the database with the superadmin user:
- **Email**: superadmin@kutubxona.uz
- **Password**: (whatever you set when generating the hash)

## User Roles

### Superadmin
- Full system access
- Can create/edit/delete admin and user accounts
- Cannot be modified or deleted
- Only one superadmin exists

### Admin
- Can view all users
- Can create/edit/delete user accounts
- Cannot create other admins (only superadmin can)
- Cannot modify/delete superadmin
- Created by superadmin

### User
- Standard library member
- Can access personal profile
- Can view borrowed books, reservations, etc.
- Created through signup or by admin

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration (creates 'user' role)
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user session

### Admin (requires admin/superadmin role)
- `GET /api/admin/users` - List all users
- `POST /api/admin/users` - Create new user
- `GET /api/admin/users/[id]` - Get user by ID
- `PATCH /api/admin/users/[id]` - Update user
- `DELETE /api/admin/users/[id]` - Delete user

## Pages

### Public
- `/login` - Login page
- `/signup` - Registration page (creates regular users)

### Admin (requires admin/superadmin role)
- `/admin/dashboard` - Admin dashboard with user management
- `/admin/users/create` - Create new user
- `/admin/users/[id]` - Edit user

### User (requires authentication)
- `/profile` - User profile page

## Security Features

1. **Password Hashing**: bcrypt with salt rounds of 10
2. **Session Management**: UUID-based session tokens with 7-day expiry
3. **Role-Based Access Control**: Superadmin > Admin > User hierarchy
4. **HTTP-Only Cookies**: Session tokens stored in HTTP-only cookies
5. **Audit Logging**: All user management actions are logged
6. **SQL Injection Protection**: Parameterized queries
7. **CSRF Protection**: Built-in Next.js CSRF protection

## Database Tables

- `users` - User accounts with roles
- `sessions` - Active user sessions
- `audit_logs` - Action audit trail
- `password_reset_tokens` - Password reset functionality (ready for implementation)

## Next Steps

1. Implement password reset functionality
2. Add email verification
3. Implement borrowed books tracking
4. Add book reservation system
5. Create event management
6. Build full catalog system
