// Performance optimization utilities

/**
 * Debounce function calls to prevent excessive execution
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function calls to limit execution frequency
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Memoize function results to avoid redundant calculations
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>) => {
    const key = resolver ? resolver(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Lazy load components for better performance
 */
export function lazyLoad<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
): React.LazyExoticComponent<T> {
  return React.lazy(() => 
    importFunc().catch(() => {
      if (fallback) {
        return { default: fallback };
      }
      throw new Error('Failed to load component');
    })
  );
}

/**
 * Intersection Observer for lazy loading
 */
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };
  
  return new IntersectionObserver(callback, defaultOptions);
}

/**
 * Virtual scrolling helper for large lists
 */
export class VirtualScroller {
  private containerHeight: number = 0;
  private itemHeight: number = 0;
  private totalItems: number = 0;
  private scrollTop: number = 0;
  
  constructor(
    containerHeight: number,
    itemHeight: number,
    totalItems: number
  ) {
    this.containerHeight = containerHeight;
    this.itemHeight = itemHeight;
    this.totalItems = totalItems;
  }
  
  getVisibleRange(scrollTop: number): { start: number; end: number } {
    this.scrollTop = scrollTop;
    
    const start = Math.floor(scrollTop / this.itemHeight);
    const visibleCount = Math.ceil(this.containerHeight / this.itemHeight);
    const end = Math.min(start + visibleCount + 1, this.totalItems);
    
    return { start, end };
  }
  
  getOffsetY(index: number): number {
    return index * this.itemHeight;
  }
  
  getTotalHeight(): number {
    return this.totalItems * this.itemHeight;
  }
}

/**
 * Memory management utilities
 */
export class MemoryManager {
  private static cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private static maxCacheSize = 100;
  private static cleanupInterval = 5 * 60 * 1000; // 5 minutes
  
  static set(key: string, data: any, ttl: number = 5 * 60 * 1000): void {
    // Cleanup old entries if cache is full
    if (this.cache.size >= this.maxCacheSize) {
      this.cleanup();
    }
    
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }
  
  static get(key: string): any | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }
    
    // Check if entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }
  
  static delete(key: string): boolean {
    return this.cache.delete(key);
  }
  
  static clear(): void {
    this.cache.clear();
  }
  
  static cleanup(): void {
    const now = Date.now();
    
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }
  
  static getSize(): number {
    return this.cache.size;
  }
}

// Auto-cleanup cache periodically
if (typeof window !== 'undefined') {
  setInterval(() => {
    MemoryManager.cleanup();
  }, MemoryManager.cleanupInterval);
}

/**
 * Image optimization helper
 */
export function optimizeImageUrl(url: string, width: number, height?: number): string {
  if (!url) return '';
  
  // For GitHub avatars, we can optimize the URL
  if (url.includes('githubusercontent.com') || url.includes('avatars.githubusercontent.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?size=${width}`;
  }
  
  // For other URLs, return as-is (could be extended for other image services)
  return url;
}

/**
 * Preload critical resources
 */
export function preloadResource(url: string, type: 'image' | 'script' | 'style'): void {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = type === 'image' ? 'preload' : type === 'script' ? 'prefetch' : 'preload';
  link.as = type;
  link.href = url;
  document.head.appendChild(link);
}

/**
 * Batch DOM updates for better performance
 */
export function batchDOMUpdates(updates: (() => void)[]): void {
  if (typeof window === 'undefined') {
    updates.forEach(update => update());
    return;
  }
  
  // Use requestAnimationFrame for smooth updates
  requestAnimationFrame(() => {
    updates.forEach(update => update());
  });
}

/**
 * Measure performance of function execution
 */
export function measurePerformance<T extends (...args: any[]) => any>(
  func: T,
  name: string = 'Function'
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    const start = performance.now();
    const result = func(...args);
    const end = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name} took ${(end - start).toFixed(2)}ms`);
    }
    
    return result;
  };
}

/**
 * Optimize scroll events
 */
export function createOptimizedScrollHandler(
  handler: (scrollTop: number) => void,
  throttleMs: number = 16 // ~60fps
): (event: Event) => void {
  let ticking = false;
  
  return (event: Event) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = (event.target as Element)?.scrollTop || 0;
        handler(scrollTop);
        ticking = false;
      });
      ticking = true;
    }
  };
} 