import { logEvent } from 'firebase/analytics';
import { analytics } from './firebase';

// Google Analytics 4 tracking functions
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    console.log('🔥 GA4 Event:', args);
    (window as any).gtag(...args);
  } else {
    console.log('⚠️ GA4 not loaded yet:', args);
  }
};

// Firebase Analytics events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (analytics) {
    console.log('🔥 Firebase Event:', eventName, parameters);
    logEvent(analytics, eventName, parameters);
  } else {
    console.log('⚠️ Firebase Analytics not initialized:', eventName, parameters);
  }
};

// Custom tracking events for your app
export const trackSignupAttempt = (role: 'local' | 'cafe' | 'waitlist') => {
  trackEvent('signup_attempt', {
    user_type: role,
    page_location: window.location.href,
  });
  
  // Also track with GA4
  gtag('event', 'signup_attempt', {
    user_type: role,
    page_location: window.location.href,
  });
};

export const trackSignupSuccess = (role: 'local' | 'cafe' | 'waitlist') => {
  trackEvent('signup_success', {
    user_type: role,
    page_location: window.location.href,
  });
  
  // Track conversion for Google Ads
  gtag('event', 'conversion', {
    send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID}/oVk1CN66vaoZEOWrjPcD`,
    value: 1.0,
    currency: 'USD',
    user_type: role,
  });
  
  // Track with GA4
  gtag('event', 'sign_up', {
    method: 'email',
    user_type: role,
  });
};

export const trackButtonClick = (buttonName: string, section: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    section: section,
    page_location: window.location.href,
  });
  
  gtag('event', 'click', {
    button_name: buttonName,
    section: section,
  });
};

export const trackPageView = (pageName: string) => {
  trackEvent('page_view', {
    page_title: pageName,
    page_location: window.location.href,
  });
  
  gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
    page_title: pageName,
    page_location: window.location.href,
  });
};

export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll', {
    scroll_depth: depth,
    page_location: window.location.href,
  });
  
  gtag('event', 'scroll', {
    scroll_depth: depth,
  });
};

export const trackEmailInputFocus = (section: string) => {
  trackEvent('email_input_focus', {
    section: section,
    page_location: window.location.href,
  });
  
  gtag('event', 'form_engagement', {
    engagement_type: 'email_focus',
    section: section,
  });
};

// Track page view conversion (for specific high-value pages)
export const trackPageViewConversion = () => {
  gtag('event', 'conversion', {
    send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID}/oVk1CN66vaoZEOWrjPcD`,
    value: 1.0,
    currency: 'USD'
  });
};