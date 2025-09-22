'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export type LogoVariant = 'header' | 'hero' | 'footer' | 'inline' | 'icon';
export type LogoSize = 'small' | 'medium' | 'large' | 'custom';

export interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  width?: number;
  height?: number;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
  priority?: boolean;
  alt?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  role?: string;
}

// Logo aspect ratio: 712.5:157.5 ≈ 4.52:1
const LOGO_ASPECT_RATIO = 712.5 / 157.5;

// Predefined size configurations for each variant
const variantSizes = {
  header: {
    small: { width: Math.round(32 * LOGO_ASPECT_RATIO), height: 32 },
    medium: { width: Math.round(40 * LOGO_ASPECT_RATIO), height: 40 },
    large: { width: Math.round(48 * LOGO_ASPECT_RATIO), height: 48 },
  },
  hero: {
    small: { width: Math.round(80 * LOGO_ASPECT_RATIO), height: 80 },
    medium: { width: Math.round(120 * LOGO_ASPECT_RATIO), height: 120 },
    large: { width: Math.round(200 * LOGO_ASPECT_RATIO), height: 200 },
  },
  footer: {
    small: { width: Math.round(24 * LOGO_ASPECT_RATIO), height: 24 },
    medium: { width: Math.round(32 * LOGO_ASPECT_RATIO), height: 32 },
    large: { width: Math.round(40 * LOGO_ASPECT_RATIO), height: 40 },
  },
  inline: {
    small: { width: Math.round(20 * LOGO_ASPECT_RATIO), height: 20 },
    medium: { width: Math.round(24 * LOGO_ASPECT_RATIO), height: 24 },
    large: { width: Math.round(32 * LOGO_ASPECT_RATIO), height: 32 },
  },
  icon: {
    small: { width: 16, height: 16 },
    medium: { width: 24, height: 24 },
    large: { width: 32, height: 32 },
  },
};

// Responsive classes for each variant
const variantClasses = {
  header: 'md:scale-100 sm:scale-90 scale-75',
  hero: 'lg:scale-100 md:scale-90 sm:scale-75 scale-60',
  footer: 'scale-100',
  inline: 'scale-100',
  icon: 'scale-100',
};

export function Logo({
  variant = 'inline',
  size = 'medium',
  width,
  height,
  className,
  clickable = false,
  onClick,
  priority = false,
  alt = 'Local Drip Logo',
  ariaLabel,
  ariaDescribedBy,
  role,
}: LogoProps) {
  const [imageError, setImageError] = useState(false);
  const [svgError, setSvgError] = useState(false);

  // Determine dimensions
  const dimensions = width && height 
    ? { width, height }
    : size === 'custom' 
      ? { width: width || 32, height: height || 32 }
      : variantSizes[variant][size as keyof typeof variantSizes[typeof variant]];

  // Generate descriptive alt text based on context
  const getDescriptiveAltText = () => {
    if (alt !== 'Local Drip Logo') return alt; // Use custom alt if provided
    
    const contextualDescriptions = {
      header: 'Local Drip logo - Navigate to homepage',
      hero: 'Local Drip - Premium coffee delivery service',
      footer: 'Local Drip logo',
      inline: 'Local Drip logo',
      icon: 'Local Drip icon'
    };
    
    return clickable && variant === 'header' 
      ? contextualDescriptions.header
      : contextualDescriptions[variant];
  };

  const descriptiveAlt = getDescriptiveAltText();
  const effectiveAriaLabel = ariaLabel || (clickable ? descriptiveAlt : undefined);

  // Handle image load errors
  const handleImageError = () => {
    if (!svgError) {
      setSvgError(true);
    } else {
      setImageError(true);
    }
  };

  // Handle click events
  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (clickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      handleClick();
    }
  };

  // Determine image source based on error state and variant
  const getImageSrc = () => {
    if (imageError) {
      return null; // Will show fallback text
    }
    // Use the drip icon for icon variant, otherwise use the full logo
    return variant === 'icon' ? '/images/ld-color-drip.svg' : '/images/ld-color.svg';
  };

  const imageSrc = getImageSrc();

  // Fallback text component with proper accessibility
  const FallbackText = () => (
    <span 
      className={cn(
        'font-bold text-primary select-none',
        'contrast-more:text-black contrast-more:dark:text-white', // High contrast support
        variant === 'hero' && 'text-2xl md:text-3xl lg:text-4xl',
        variant === 'header' && 'text-lg md:text-xl',
        variant === 'footer' && 'text-sm md:text-base',
        variant === 'inline' && 'text-base',
        variant === 'icon' && 'text-xs',
        className
      )}
      style={{ 
        width: dimensions.width, 
        height: dimensions.height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      role={role || (clickable ? 'button' : 'img')}
      aria-label={descriptiveAlt}
      aria-describedby={ariaDescribedBy}
    >
      Local Drip
    </span>
  );

  // If all images failed to load, show fallback text
  if (imageError || !imageSrc) {
    return clickable ? (
      <button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          // Enhanced focus indicators for accessibility
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded',
          'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          'transition-all duration-200 hover:scale-105 active:scale-95',
          // High contrast mode support
          'contrast-more:focus:ring-4 contrast-more:focus:ring-black contrast-more:dark:focus:ring-white',
          className
        )}
        aria-label={effectiveAriaLabel}
        aria-describedby={ariaDescribedBy}
        role={role || 'button'}
        tabIndex={0}
      >
        <FallbackText />
      </button>
    ) : (
      <FallbackText />
    );
  }

  // Image component with enhanced accessibility
  const ImageComponent = () => (
    <Image
      src={imageSrc}
      alt={descriptiveAlt}
      width={dimensions.width}
      height={dimensions.height}
      priority={priority}
      onError={handleImageError}
      className={cn(
        'object-contain transition-all duration-200',
        variantClasses[variant],
        !clickable && 'select-none',
        // High contrast support
        'contrast-more:contrast-125 contrast-more:brightness-110',
        className
      )}
      draggable={false}
      role={role || (clickable ? undefined : 'img')}
      aria-describedby={ariaDescribedBy}
    />
  );

  // Return clickable or non-clickable version with full accessibility support
  return clickable ? (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        // Enhanced focus indicators with multiple fallbacks
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded',
        'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        'transition-all duration-200 hover:scale-105 active:scale-95',
        'inline-flex items-center justify-center',
        // High contrast mode support
        'contrast-more:focus:ring-4 contrast-more:focus:ring-black contrast-more:dark:focus:ring-white',
        // Ensure minimum touch target size for mobile accessibility
        'min-w-[44px] min-h-[44px]'
      )}
      aria-label={effectiveAriaLabel}
      aria-describedby={ariaDescribedBy}
      role={role || 'button'}
      tabIndex={0}
      // Add screen reader announcements for state changes
      aria-live="polite"
    >
      <ImageComponent />
    </button>
  ) : (
    <div 
      className="inline-flex items-center justify-center"
      role={role || 'img'}
      aria-label={descriptiveAlt}
      aria-describedby={ariaDescribedBy}
    >
      <ImageComponent />
    </div>
  );
}