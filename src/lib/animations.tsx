import React from 'react';

// Lightweight animation utilities to replace framer-motion for better performance

export interface AnimationProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  ease?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
}

// Simple fade-in animation component
export function FadeIn({ 
  children, 
  className = '', 
  style = {}, 
  delay = 0, 
  duration = 300,
  ease = 'ease-out'
}: AnimationProps) {
  const animationStyle = {
    opacity: 0,
    animation: `fadeIn ${duration}ms ${ease} ${delay}ms forwards`,
    ...style,
  };

  return (
    <div className={`animate-fade-in ${className}`} style={animationStyle}>
      {children}
    </div>
  );
}

// Slide-up animation component
export function SlideUp({ 
  children, 
  className = '', 
  style = {}, 
  delay = 0, 
  duration = 300,
  ease = 'ease-out'
}: AnimationProps) {
  const animationStyle = {
    opacity: 0,
    transform: 'translateY(20px)',
    animation: `slideUp ${duration}ms ${ease} ${delay}ms forwards`,
    ...style,
  };

  return (
    <div className={`animate-slide-up ${className}`} style={animationStyle}>
      {children}
    </div>
  );
}

// Scale animation component
export function Scale({ 
  children, 
  className = '', 
  style = {}, 
  delay = 0, 
  duration = 200,
  ease = 'ease-out'
}: AnimationProps) {
  const animationStyle = {
    transform: 'scale(0.95)',
    animation: `scale ${duration}ms ${ease} ${delay}ms forwards`,
    ...style,
  };

  return (
    <div className={`animate-scale ${className}`} style={animationStyle}>
      {children}
    </div>
  );
}

// Stagger animation for lists
export function StaggerContainer({ 
  children, 
  className = '', 
  staggerDelay = 50 
}: { 
  children: React.ReactNode; 
  className?: string; 
  staggerDelay?: number;
}) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            delay: index * staggerDelay,
            ...child.props,
          });
        }
        return child;
      })}
    </div>
  );
}

// Conditional animation wrapper
export function AnimatePresence({ 
  children, 
  show = true 
}: { 
  children: React.ReactNode; 
  show?: boolean;
}) {
  if (!show) return null;
  return <>{children}</>;
}

// Performance-optimized button with hover effects
export function AnimatedButton({ 
  children, 
  className = '', 
  onClick,
  disabled = false,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`transition-all duration-200 ease-out hover:scale-105 active:scale-95 ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

// Performance-optimized card with hover effects
export function AnimatedCard({ 
  children, 
  className = '', 
  onClick,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

// Utility to add animation classes to CSS
export const animationCSS = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scale {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }

  .animate-fade-in {
    animation: fadeIn 300ms ease-out forwards;
  }

  .animate-slide-up {
    animation: slideUp 300ms ease-out forwards;
  }

  .animate-scale {
    animation: scale 200ms ease-out forwards;
  }

  .animate-stagger > * {
    animation-delay: calc(var(--stagger-index, 0) * 50ms);
  }
`;

// Hook for intersection observer animations
export function useIntersectionAnimation(
  threshold: number = 0.1,
  rootMargin: string = '0px'
) {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

// Performance-optimized list rendering
export function VirtualList<T>({
  items,
  renderItem,
  itemHeight = 60,
  containerHeight = 400,
  overscan = 5,
}: {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight?: number;
  containerHeight?: number;
  overscan?: number;
}) {
  const [scrollTop, setScrollTop] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length,
    Math.floor(scrollTop / itemHeight) + visibleCount + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div key={startIndex + index} style={{ height: itemHeight }}>
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 