# Analytics Setup Guide

## Overview
Your Local Drip site now has comprehensive tracking with Firebase Analytics, Google Analytics 4, and Google Ads conversion tracking.

## What's Been Added

### 1. Firebase Analytics
- Enhanced Firebase configuration with Analytics
- Custom event tracking for user interactions
- Automatic page view tracking

### 2. Google Analytics 4 (GA4)
- Complete GA4 integration with gtag
- Custom events for button clicks, signups, and scroll depth
- Page view tracking with custom parameters

### 3. Google Ads Conversion Tracking
- Conversion events for successful signups
- Separate tracking for local users vs café partners
- Ready for campaign optimization

### 4. Custom Event Tracking
- **Button Clicks**: All CTA buttons tracked with context
- **Signup Events**: Attempt and success tracking
- **Scroll Depth**: 25%, 50%, 75%, 100% milestones
- **Page Views**: Enhanced with custom parameters

## Setup Steps

### 1. Update Environment Variables
Copy your `.env.local.example` to `.env.local` and fill in:

```bash
# Firebase (you already have these)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=local-drip-landing.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=local-drip-landing
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=local-drip-landing.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=528207041937
NEXT_PUBLIC_FIREBASE_APP_ID=1:528207041937:web:c6f98aaa0ffd3198947630
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-FPP97MX41R

# Google Analytics 4 - GET THIS FROM GA4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Ads - ALREADY CONFIGURED
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-1055069669
```

### 2. Set Up Google Analytics 4

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new GA4 property for your site
3. Get your Measurement ID (starts with G-)
4. Add it to your `.env.local` file

### 3. Google Ads Conversion Tracking (Already Set Up!)

✅ **Conversion ID**: AW-1055069669  
✅ **Conversion Label**: oVk1CN66vaoZEOWrjPcD  
✅ **Tracking**: Signup completions with $1.00 USD value

Your Google Ads conversion tracking is already configured and will track:
- Successful signups (both local users and café partners)
- Page view conversions for high-value actions
- Attribution back to your Google Ads campaigns

### 4. Enable Firebase Analytics

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `local-drip-landing`
3. Go to Analytics > Dashboard
4. Link to your Google Analytics property if prompted

## Events Being Tracked

### Firebase Analytics Events
- `signup_attempt` - When user opens signup modal
- `signup_success` - When signup completes successfully
- `button_click` - All CTA button interactions
- `page_view` - Page visits with context
- `scroll` - Scroll depth milestones

### Google Analytics Events
- `sign_up` - Successful signups (GA4 recommended event)
- `conversion` - For Google Ads optimization
- `click` - Button interactions
- `scroll` - Scroll tracking

## Viewing Your Data

### 1. Built-in Dashboard
Visit `/admin` on your site to see:
- Real-time signup statistics
- Recent signups breakdown
- Quick links to external dashboards

### 2. Google Analytics
- Real-time users and events
- Conversion tracking
- Audience insights
- Traffic sources

### 3. Firebase Analytics
- User engagement metrics
- Event parameters
- Audience segments
- Retention analysis

### 4. Google Ads
- Conversion tracking
- Campaign performance
- ROI measurement

## Key Metrics to Monitor

### Conversion Funnel
1. **Page Views** → How many people visit
2. **Button Clicks** → How many engage with CTAs
3. **Signup Attempts** → How many start the process
4. **Signup Success** → How many complete it

### User Segmentation
- **Local Users** vs **Café Partners**
- **Traffic Sources** (organic, paid, social)
- **Device Types** (mobile, desktop)
- **Geographic Location**

## Optimization Tips

### 1. A/B Testing
- Test different CTA button text
- Try different value propositions
- Experiment with form placement

### 2. Conversion Rate Optimization
- Monitor where users drop off
- Optimize high-traffic, low-conversion pages
- Improve mobile experience

### 3. Marketing Attribution
- Track which channels drive quality signups
- Optimize ad spend based on conversion data
- Identify your best-performing content

## Troubleshooting

### Events Not Showing
1. Check browser console for errors
2. Verify environment variables are set
3. Ensure you're testing on the correct domain
4. Check Firebase/GA4 real-time reports

### Conversions Not Tracking
1. Verify Google Ads conversion ID is correct
2. Test signup flow in incognito mode
3. Check Google Ads conversion tracking setup

## Next Steps

1. **Set up your tracking IDs** in `.env.local`
2. **Deploy and test** the tracking
3. **Create Google Ads campaigns** with conversion tracking
4. **Set up automated reports** in GA4
5. **Monitor and optimize** based on data

Your analytics setup is now comprehensive and ready to provide valuable insights into your user behavior and marketing performance!