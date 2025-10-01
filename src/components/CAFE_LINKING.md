# Cafe Linking Implementation

## Overview
Successfully linked the nearby cafes on the portal home page to the order flow, directing users to the menu page with the selected cafe pre-selected.

## Implementation Details

### ✅ Navigation Flow
**Home Page → Menu Page**
- **From**: `/portal/consumer-demo` (home page)
- **To**: `/portal/consumer-demo/order/menu?cafe={cafeName}`
- **Method**: Next.js router navigation for optimal performance

### ✅ User Experience
1. **Click anywhere on cafe card** → navigates to menu page
2. **Click "Order" button** → same navigation (with event.stopPropagation())
3. **Offline cafes** → "Order" button disabled and shows "Offline"
4. **Visual feedback** → hover effects and cursor pointer

### ✅ Technical Implementation

#### Router Integration
```tsx
import { useRouter } from 'next/navigation';

const router = useRouter();
const handleCafeClick = (cafeName: string) => {
  router.push(`/portal/consumer-demo/order/menu?cafe=${encodeURIComponent(cafeName)}`);
};
```

#### Clickable Cards
```tsx
<div 
  className="...cursor-pointer"
  onClick={() => handleCafeClick(cafe.name)}
>
```

#### Order Button
```tsx
<button 
  onClick={(e) => {
    e.stopPropagation();
    handleCafeClick(cafe.name);
  }}
  disabled={cafe.status.toLowerCase().includes('offline')}
  className={`${
    cafe.status.toLowerCase().includes('offline')
      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
      : 'bg-accent1 text-white hover:bg-accent1/90 active:scale-95'
  }`}
>
  {cafe.status.toLowerCase().includes('offline') ? 'Offline' : 'Order'}
</button>
```

### ✅ URL Parameters
The cafe name is passed as a URL parameter to the menu page:
- **Format**: `?cafe=Local%20Drip%20Coffee`
- **Encoding**: URL-encoded for special characters and spaces
- **Usage**: Menu page can read this parameter to pre-select the cafe

### ✅ Cafe Status Handling
- **Online cafes**: Show "Order" button in accent color
- **Offline cafes**: Show "Offline" button (disabled, grayed out)
- **Status display**: Shows preparation time or offline status

### ✅ Visual Improvements
- **Hover effects**: Cards lift slightly on hover
- **Cursor pointer**: Indicates clickability
- **Button states**: Active, hover, and disabled states
- **Consistent styling**: Matches existing design system

## Order Flow Integration

### Step 1: Select Cafe (Current Implementation)
- ✅ Home page cafes link to menu page
- ✅ Order page cafes link to menu page
- ✅ URL parameter passes selected cafe

### Step 2: Browse Menu
- 📍 **Next**: Menu page should read `?cafe` parameter
- 📍 **Next**: Display selected cafe name/info
- 📍 **Next**: Show menu items for that cafe

### Step 3: Customize & Add to Cart
- 📍 **Next**: Item customization page
- 📍 **Next**: Add to cart functionality

### Step 4: Checkout
- 📍 **Next**: Cart review and checkout

## Testing Scenarios

### ✅ Functional Testing
1. **Click cafe card** → Should navigate to menu page
2. **Click "Order" button** → Should navigate to menu page
3. **Click offline cafe** → Button should be disabled
4. **URL parameter** → Should include encoded cafe name

### ✅ Visual Testing
1. **Hover effects** → Cards should lift and change border
2. **Button states** → Order button should show hover/active states
3. **Offline state** → Button should be grayed out and disabled
4. **Mobile responsive** → Should work on all screen sizes

## Benefits

1. **Seamless UX**: Direct path from discovery to ordering
2. **Context preservation**: Cafe selection carries through the flow
3. **Clear visual cues**: Users understand cafes are clickable
4. **Accessibility**: Proper button states and keyboard navigation
5. **Performance**: Uses Next.js router for fast navigation

## Future Enhancements

1. **Menu filtering**: Show only items available at selected cafe
2. **Cafe details**: Display more info about selected cafe on menu page
3. **Favorites**: Remember user's preferred cafes
4. **Location-based**: Sort cafes by distance from user
5. **Real-time status**: Update cafe availability in real-time

The nearby cafes on the home page now provide a direct path to ordering, creating a smooth user experience from discovery to purchase.