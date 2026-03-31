type SiteStyle =
  | 'header1'
  | 'header2'
  | 'header3'
  | 'header4'
  | 'header5'
  | 'header6'
  | 'header7'
  | 'footer1'
  | 'footer2'
  | 'footer3'
  | 'home1'
  | 'home2'
  | 'home3'
  | 'home4'
  | 'home5'
  | 'home6'
  | 'home7';

export interface ParsedCreateSiteInput {
  subdomain: string;
  name: string;
  description?: string;
  logo_url?: string;
  logo_path?: string;
  primary_color?: string;
  secondary_color?: string;
  contact_email?: string;
  contact_phone?: string;
  contact_address?: string;
  facebook_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  header_style?: SiteStyle;
  footer_style?: SiteStyle;
  home_style?: SiteStyle;
  enable_dark_mode?: boolean;
  custom_css?: string;
}

export type ParsedUpdateSiteInput = Partial<Omit<ParsedCreateSiteInput, 'subdomain'>> & {
  is_active?: boolean;
};

export class SiteInputError extends Error {
  status: number;
  code: string;

  constructor(message: string, code: string = 'BAD_REQUEST', status: number = 400) {
    super(message);
    this.name = 'SiteInputError';
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
    throw new SiteInputError(`${fieldName} must be a string`, 'INVALID_INPUT');
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function asRequiredString(value: unknown, fieldName: string): string {
  const parsed = asOptionalString(value, fieldName);
  if (!parsed) {
    throw new SiteInputError(`${fieldName} is required`, 'MISSING_FIELD');
  }
  return parsed;
}

function asOptionalBoolean(value: unknown, fieldName: string): boolean | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== 'boolean') {
    throw new SiteInputError(`${fieldName} must be a boolean`, 'INVALID_INPUT');
  }

  return value;
}

function assertSubdomain(subdomain: string) {
  if (!/^[a-z0-9-]{3,50}$/.test(subdomain)) {
    throw new SiteInputError(
      'subdomain must be 3-50 chars and contain only lowercase letters, numbers, hyphens',
      'INVALID_SUBDOMAIN',
    );
  }
}

function assertHexColor(color: string, fieldName: string) {
  if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
    throw new SiteInputError(
      `${fieldName} must be in hex format (#RRGGBB)`,
      'INVALID_COLOR',
    );
  }
}

function assertEmail(email: string, fieldName: string) {
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    throw new SiteInputError(`${fieldName} must be a valid email`, 'INVALID_EMAIL');
  }
}

function assertUrl(url: string, fieldName: string) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      throw new Error('invalid protocol');
    }
  } catch {
    throw new SiteInputError(`${fieldName} must be a valid URL`, 'INVALID_URL');
  }
}

function asOptionalStyle(value: unknown, fieldName: string): SiteStyle | undefined {
  const parsed = asOptionalString(value, fieldName);
  if (!parsed) {
    return undefined;
  }

  const allowed = new Set<SiteStyle>([
    'header1',
    'header2',
    'header3',
    'header4',
    'header5',
    'header6',
    'header7',
    'footer1',
    'footer2',
    'footer3',
    'home1',
    'home2',
    'home3',
    'home4',
    'home5',
    'home6',
    'home7',
  ]);

  if (!allowed.has(parsed as SiteStyle)) {
    throw new SiteInputError(`${fieldName} has unsupported value`, 'INVALID_STYLE');
  }

  return parsed as SiteStyle;
}

export function parseCreateSiteInput(raw: unknown): ParsedCreateSiteInput {
  if (!isRecord(raw)) {
    throw new SiteInputError('Request body must be a JSON object', 'INVALID_INPUT');
  }

  const subdomain = asRequiredString(raw.subdomain, 'subdomain').toLowerCase();
  const name = asRequiredString(raw.name, 'name');

  assertSubdomain(subdomain);

  const primary_color = asOptionalString(raw.primary_color, 'primary_color');
  const secondary_color = asOptionalString(raw.secondary_color, 'secondary_color');
  const contact_email = asOptionalString(raw.contact_email, 'contact_email');
  const facebook_url = asOptionalString(raw.facebook_url, 'facebook_url');
  const instagram_url = asOptionalString(raw.instagram_url, 'instagram_url');
  const twitter_url = asOptionalString(raw.twitter_url, 'twitter_url');

  if (primary_color) assertHexColor(primary_color, 'primary_color');
  if (secondary_color) assertHexColor(secondary_color, 'secondary_color');
  if (contact_email) assertEmail(contact_email, 'contact_email');
  if (facebook_url) assertUrl(facebook_url, 'facebook_url');
  if (instagram_url) assertUrl(instagram_url, 'instagram_url');
  if (twitter_url) assertUrl(twitter_url, 'twitter_url');

  return {
    subdomain,
    name,
    description: asOptionalString(raw.description, 'description'),
    logo_url: asOptionalString(raw.logo_url, 'logo_url'),
    logo_path: asOptionalString(raw.logo_path, 'logo_path'),
    primary_color,
    secondary_color,
    contact_email,
    contact_phone: asOptionalString(raw.contact_phone, 'contact_phone'),
    contact_address: asOptionalString(raw.contact_address, 'contact_address'),
    facebook_url,
    instagram_url,
    twitter_url,
    header_style: asOptionalStyle(raw.header_style, 'header_style'),
    footer_style: asOptionalStyle(raw.footer_style, 'footer_style'),
    home_style: asOptionalStyle(raw.home_style, 'home_style'),
    enable_dark_mode: asOptionalBoolean(raw.enable_dark_mode, 'enable_dark_mode'),
    custom_css: asOptionalString(raw.custom_css, 'custom_css'),
  };
}

export function parseUpdateSiteInput(raw: unknown): ParsedUpdateSiteInput {
  if (!isRecord(raw)) {
    throw new SiteInputError('Request body must be a JSON object', 'INVALID_INPUT');
  }

  const parsed: ParsedUpdateSiteInput = {};

  if ('name' in raw) parsed.name = asRequiredString(raw.name, 'name');
  if ('description' in raw) parsed.description = asOptionalString(raw.description, 'description') ?? '';
  if ('logo_url' in raw) parsed.logo_url = asOptionalString(raw.logo_url, 'logo_url') ?? '';
  if ('logo_path' in raw) parsed.logo_path = asOptionalString(raw.logo_path, 'logo_path') ?? '';

  if ('primary_color' in raw) {
    const value = asOptionalString(raw.primary_color, 'primary_color') ?? '';
    if (value) assertHexColor(value, 'primary_color');
    parsed.primary_color = value;
  }

  if ('secondary_color' in raw) {
    const value = asOptionalString(raw.secondary_color, 'secondary_color') ?? '';
    if (value) assertHexColor(value, 'secondary_color');
    parsed.secondary_color = value;
  }

  if ('contact_email' in raw) {
    const value = asOptionalString(raw.contact_email, 'contact_email') ?? '';
    if (value) assertEmail(value, 'contact_email');
    parsed.contact_email = value;
  }

  if ('contact_phone' in raw) parsed.contact_phone = asOptionalString(raw.contact_phone, 'contact_phone') ?? '';
  if ('contact_address' in raw) parsed.contact_address = asOptionalString(raw.contact_address, 'contact_address') ?? '';

  if ('facebook_url' in raw) {
    const value = asOptionalString(raw.facebook_url, 'facebook_url') ?? '';
    if (value) assertUrl(value, 'facebook_url');
    parsed.facebook_url = value;
  }

  if ('instagram_url' in raw) {
    const value = asOptionalString(raw.instagram_url, 'instagram_url') ?? '';
    if (value) assertUrl(value, 'instagram_url');
    parsed.instagram_url = value;
  }

  if ('twitter_url' in raw) {
    const value = asOptionalString(raw.twitter_url, 'twitter_url') ?? '';
    if (value) assertUrl(value, 'twitter_url');
    parsed.twitter_url = value;
  }

  if ('header_style' in raw) parsed.header_style = asOptionalStyle(raw.header_style, 'header_style');
  if ('footer_style' in raw) parsed.footer_style = asOptionalStyle(raw.footer_style, 'footer_style');
  if ('home_style' in raw) parsed.home_style = asOptionalStyle(raw.home_style, 'home_style');
  if ('enable_dark_mode' in raw) parsed.enable_dark_mode = asOptionalBoolean(raw.enable_dark_mode, 'enable_dark_mode');
  if ('custom_css' in raw) parsed.custom_css = asOptionalString(raw.custom_css, 'custom_css') ?? '';
  if ('is_active' in raw) parsed.is_active = asOptionalBoolean(raw.is_active, 'is_active');

  if (Object.keys(parsed).length === 0) {
    throw new SiteInputError('At least one valid field is required', 'NO_CHANGES');
  }

  return parsed;
}
