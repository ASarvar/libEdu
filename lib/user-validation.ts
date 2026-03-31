type AssignableUserRole = 'admin' | 'moderator' | 'user';

export interface ParsedUserFilters {
  role?: AssignableUserRole;
  is_active?: boolean;
  search?: string;
}

export interface ParsedCreateUserInput {
  full_name: string;
  email: string;
  phone?: string;
  password: string;
  role: AssignableUserRole;
}

export interface ParsedUpdateUserInput {
  full_name?: string;
  email?: string;
  phone?: string;
  role?: AssignableUserRole;
  is_active?: boolean;
}

export class UserInputError extends Error {
  status: number;
  code: string;

  constructor(message: string, code: string = 'BAD_REQUEST', status: number = 400) {
    super(message);
    this.name = 'UserInputError';
    this.status = status;
    this.code = code;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function asOptionalString(value: unknown, fieldName: string): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== 'string') {
    throw new UserInputError(`${fieldName} must be a string`, 'INVALID_INPUT');
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function asRequiredString(value: unknown, fieldName: string): string {
  const parsed = asOptionalString(value, fieldName);
  if (!parsed) {
    throw new UserInputError(`${fieldName} is required`, 'MISSING_FIELD');
  }
  return parsed;
}

function asOptionalBoolean(value: unknown, fieldName: string): boolean | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (typeof value !== 'boolean') {
    throw new UserInputError(`${fieldName} must be a boolean`, 'INVALID_INPUT');
  }
  return value;
}

function normalizeEmail(email: string): string {
  return email.toLowerCase();
}

function assertValidEmail(email: string) {
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    throw new UserInputError('email must be a valid email address', 'INVALID_EMAIL');
  }
}

function asAssignableRole(value: unknown, fieldName: string): AssignableUserRole | undefined {
  const parsed = asOptionalString(value, fieldName);
  if (!parsed) {
    return undefined;
  }

  if (parsed !== 'admin' && parsed !== 'moderator' && parsed !== 'user') {
    throw new UserInputError(`${fieldName} must be one of: admin, moderator, user`, 'INVALID_ROLE');
  }

  return parsed;
}

export function parseUserFilters(searchParams: URLSearchParams): ParsedUserFilters {
  const roleRaw = searchParams.get('role');
  const isActiveRaw = searchParams.get('is_active');
  const searchRaw = searchParams.get('search');

  const role = roleRaw ? asAssignableRole(roleRaw, 'role') : undefined;
  const search = searchRaw?.trim() || undefined;

  let is_active: boolean | undefined;
  if (isActiveRaw !== null) {
    if (isActiveRaw === 'true') {
      is_active = true;
    } else if (isActiveRaw === 'false') {
      is_active = false;
    } else {
      throw new UserInputError('is_active must be true or false', 'INVALID_FILTER');
    }
  }

  return {
    role,
    is_active,
    search,
  };
}

export function parseCreateUserInput(raw: unknown): ParsedCreateUserInput {
  if (!isRecord(raw)) {
    throw new UserInputError('Request body must be a JSON object', 'INVALID_INPUT');
  }

  const full_name = asRequiredString(raw.fullName, 'fullName');
  const email = normalizeEmail(asRequiredString(raw.email, 'email'));
  const phone = asOptionalString(raw.phone, 'phone');
  const password = asRequiredString(raw.password, 'password');
  const role = asAssignableRole(raw.role, 'role') ?? 'user';

  assertValidEmail(email);
  if (password.length < 8) {
    throw new UserInputError('password must be at least 8 characters', 'WEAK_PASSWORD');
  }

  return {
    full_name,
    email,
    phone,
    password,
    role,
  };
}

export function parseUpdateUserInput(raw: unknown): ParsedUpdateUserInput {
  if (!isRecord(raw)) {
    throw new UserInputError('Request body must be a JSON object', 'INVALID_INPUT');
  }

  const parsed: ParsedUpdateUserInput = {};

  if ('fullName' in raw) {
    parsed.full_name = asRequiredString(raw.fullName, 'fullName');
  }

  if ('email' in raw) {
    const email = normalizeEmail(asRequiredString(raw.email, 'email'));
    assertValidEmail(email);
    parsed.email = email;
  }

  if ('phone' in raw) {
    parsed.phone = asOptionalString(raw.phone, 'phone') ?? '';
  }

  if ('role' in raw) {
    parsed.role = asAssignableRole(raw.role, 'role');
  }

  if ('isActive' in raw) {
    parsed.is_active = asOptionalBoolean(raw.isActive, 'isActive');
  }

  if (Object.keys(parsed).length === 0) {
    throw new UserInputError('At least one valid field is required', 'NO_CHANGES');
  }

  return parsed;
}
