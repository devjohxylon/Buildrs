// Security utilities for input sanitization and validation

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== 'string') return '';
  
  // Remove potentially dangerous HTML tags and attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, '')
    .replace(/<input\b[^>]*>/gi, '')
    .replace(/<textarea\b[^<]*(?:(?!<\/textarea>)<[^<]*)*<\/textarea>/gi, '')
    .replace(/<select\b[^<]*(?:(?!<\/select>)<[^<]*)*<\/select>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '');
}

/**
 * Sanitize plain text content
 */
export function sanitizeText(text: string): string {
  if (!text || typeof text !== 'string') return '';
  
  return text
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .trim();
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate URL format
 */
export function validateUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

/**
 * Validate GitHub username format
 */
export function validateGitHubUsername(username: string): boolean {
  if (!username || typeof username !== 'string') return false;
  
  const githubUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
  return githubUsernameRegex.test(username.trim());
}

/**
 * Validate and sanitize user input
 */
export function validateUserInput(input: any, type: 'text' | 'email' | 'url' | 'github' | 'html'): string {
  if (!input || typeof input !== 'string') return '';
  
  const sanitized = input.trim();
  
  switch (type) {
    case 'email':
      return validateEmail(sanitized) ? sanitized : '';
    case 'url':
      return validateUrl(sanitized) ? sanitized : '';
    case 'github':
      return validateGitHubUsername(sanitized) ? sanitized : '';
    case 'html':
      return sanitizeHtml(sanitized);
    case 'text':
    default:
      return sanitizeText(sanitized);
  }
}

/**
 * Generate CSRF token
 */
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Validate CSRF token
 */
export function validateCSRFToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken || typeof token !== 'string' || typeof storedToken !== 'string') {
    return false;
  }
  
  return token === storedToken;
}

/**
 * Rate limiting helper
 */
export class RateLimiter {
  private requests: Map<string, { count: number; resetTime: number }> = new Map();
  
  constructor(
    private maxRequests: number = 100,
    private windowMs: number = 15 * 60 * 1000 // 15 minutes
  ) {}
  
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const requestData = this.requests.get(identifier);
    
    if (!requestData || now > requestData.resetTime) {
      this.requests.set(identifier, { count: 1, resetTime: now + this.windowMs });
      return true;
    }
    
    if (requestData.count >= this.maxRequests) {
      return false;
    }
    
    requestData.count++;
    return true;
  }
  
  getRemainingRequests(identifier: string): number {
    const requestData = this.requests.get(identifier);
    if (!requestData) return this.maxRequests;
    
    const now = Date.now();
    if (now > requestData.resetTime) {
      return this.maxRequests;
    }
    
    return Math.max(0, this.maxRequests - requestData.count);
  }
}

/**
 * Sanitize object properties recursively
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T, allowedKeys: string[] = []): Partial<T> {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return {} as Partial<T>;
  }
  
  const sanitized: Partial<T> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    // Skip if key is not in allowed keys (if specified)
    if (allowedKeys.length > 0 && !allowedKeys.includes(key)) {
      continue;
    }
    
    if (typeof value === 'string') {
      sanitized[key as keyof T] = sanitizeText(value) as T[keyof T];
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key as keyof T] = sanitizeObject(value, allowedKeys) as T[keyof T];
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      sanitized[key as keyof T] = value as T[keyof T];
    }
  }
  
  return sanitized;
}

/**
 * Validate and sanitize form data
 */
export function validateFormData(data: Record<string, any>, schema: Record<string, 'text' | 'email' | 'url' | 'github' | 'html'>): Record<string, string> {
  const validated: Record<string, string> = {};
  
  for (const [key, type] of Object.entries(schema)) {
    const value = data[key];
    validated[key] = validateUserInput(value, type);
  }
  
  return validated;
}

/**
 * Escape special characters for safe HTML output
 */
export function escapeHtml(text: string): string {
  if (!text || typeof text !== 'string') return '';
  
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return text.replace(/[&<>"'/]/g, (match) => htmlEscapes[match]);
}

/**
 * Generate secure random string
 */
export function generateSecureRandomString(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars.charAt(array[i] % chars.length);
    }
  } else {
    // Fallback for environments without crypto
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }
  
  return result;
} 