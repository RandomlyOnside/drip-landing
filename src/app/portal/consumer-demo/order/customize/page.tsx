'use client';

import { useState, useEffect } from 'react';
import { Layout, QuickActions, MiniCart, StepProgressBar } from '@/components/consumer';
import { useToast } from '@/lib/toast';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart, CartItem } from '@/contexts';
import { ArrowLeft } from 'lucide-react';

export default function CustomizePage() {
  const [progressWidth, setProgressWidth] = useState(0);
  const { cartItems, addToCart, getTotalItems } = useCart();
  const { showSuccess } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemName = searchParams.get('item') || 'Selected Item';
  const cafeName = searchParams.get('cafe') || 'Selected Cafe';
  const basePrice = parseFloat(searchParams.get('price') || '4.50');

  // Customization options
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [selectedShots, setSelectedShots] = useState(2);
  const [flavorDropdowns, setFlavorDropdowns] = useState<string[]>(['']);
  const [addInDropdowns, setAddInDropdowns] = useState<string[]>(['']);

  // Animate progress bar on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth(60); // Step 2.1 progress
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const customizationOptions = {
    sizes: [
      { name: 'Small', price: -0.50 },
      { name: 'Medium', price: 0 },
      { name: 'Large', price: 0.50 },
      { name: 'Extra Large', price: 1.00 }
    ],
    shots: [
      { count: 1, price: -0.50 },
      { count: 2, price: 0 },
      { count: 3, price: 0.75 },
      { count: 4, price: 1.50 }
    ],
    flavors: [
      { name: 'Vanilla', price: 0.65 },
      { name: 'Caramel', price: 0.65 },
      { name: 'Hazelnut', price: 0.65 },
      { name: 'Cinnamon', price: 0.65 }
    ],
    addIns: [
      { name: 'Extra Hot', price: 0 },
      { name: 'Extra Foam', price: 0 },
      { name: 'Whipped Cream', price: 0.75 },
      { name: 'Extra Shot', price: 0.75 }
    ]
  };

  const calculateTotalPrice = () => {
    let total = basePrice;

    // Size adjustment
    const sizeOption = customizationOptions.sizes.find(s => s.name === selectedSize);
    if (sizeOption) total += sizeOption.price;

    // Shots adjustment
    const shotOption = customizationOptions.shots.find(s => s.count === selectedShots);
    if (shotOption) total += shotOption.price;

    // Flavors
    flavorDropdowns.forEach(flavor => {
      if (flavor) {
        const flavorOption = customizationOptions.flavors.find(f => f.name === flavor);
        if (flavorOption) total += flavorOption.price;
      }
    });

    // Add-ins
    addInDropdowns.forEach(addIn => {
      if (addIn) {
        const addInOption = customizationOptions.addIns.find(a => a.name === addIn);
        if (addInOption) total += addInOption.price;
      }
    });

    return total;
  };

  const addFlavorDropdown = () => {
    setFlavorDropdowns(prev => [...prev, '']);
  };

  const removeFlavorDropdown = (index: number) => {
    setFlavorDropdowns(prev => prev.filter((_, i) => i !== index));
  };

  const updateFlavorDropdown = (index: number, value: string) => {
    setFlavorDropdowns(prev => prev.map((item, i) => i === index ? value : item));
  };

  const addAddInDropdown = () => {
    setAddInDropdowns(prev => [...prev, '']);
  };

  const removeAddInDropdown = (index: number) => {
    setAddInDropdowns(prev => prev.filter((_, i) => i !== index));
  };

  const updateAddInDropdown = (index: number, value: string) => {
    setAddInDropdowns(prev => prev.map((item, i) => i === index ? value : item));
  };

  const handleAddToCart = () => {
    const customizations = [
      selectedSize,
      `${selectedShots} shot${selectedShots > 1 ? 's' : ''}`,
      ...flavorDropdowns.filter(f => f),
      ...addInDropdowns.filter(a => a)
    ].join(' • ');

    const newItem: CartItem = {
      id: `${Date.now()}-${Math.random()}`,
      name: itemName,
      price: calculateTotalPrice(),
      quantity: 1,
      customizations
    };

    addToCart(newItem);
    // Visual feedback provided by CartBadge update
  };

  const handleBackToMenu = () => {
    router.back();
  };

  const handleCheckout = () => {
    window.location.href = '/portal/consumer-demo/order/cart';
  };

  return (
    <Layout cafeName={cafeName}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            Customize {itemName}
          </h1>
          <p className="text-sm text-primary/70">{cafeName}</p>
        </div>

        {/* Quick Actions */}
        <QuickActions className="mb-4" />

        {/* Step Progress Bar */}
        <StepProgressBar
          stepNumber={2.1}
          stepTitle="Step 2.1: Customize Item"
          progress={60}
          showCart={true}
          onCartClick={() => window.location.href = '/portal/consumer-demo/order/cart'}
        />

        {/* Customization Options */}
        <div className="space-y-6">
          {/* Size Selection */}
          <div className="bg-white border border-primary/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-primary mb-3">Size</h3>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full p-3 border border-primary/20 rounded-lg text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent1"
            >
              {customizationOptions.sizes.map((size) => (
                <option key={size.name} value={size.name}>
                  {size.name} {size.price > 0 ? `(+$${size.price})` : size.price < 0 ? `(-$${Math.abs(size.price)})` : '(Base)'}
                </option>
              ))}
            </select>
          </div>

          {/* Shots Selection */}
          <div className="bg-white border border-primary/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-primary mb-3">Espresso Shots</h3>
            <select
              value={selectedShots}
              onChange={(e) => setSelectedShots(parseInt(e.target.value))}
              className="w-full p-3 border border-primary/20 rounded-lg text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent1"
            >
              {customizationOptions.shots.map((shot) => (
                <option key={shot.count} value={shot.count}>
                  {shot.count} Shot{shot.count > 1 ? 's' : ''} {shot.price > 0 ? `(+$${shot.price})` : shot.price < 0 ? `(-$${Math.abs(shot.price)})` : '(Base)'}
                </option>
              ))}
            </select>
          </div>

          {/* Flavors Selection */}
          <div className="bg-white border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-primary">Flavors (Optional)</h3>
              <button
                onClick={addFlavorDropdown}
                className="p-2 hover:bg-primary/5 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              {flavorDropdowns.map((selectedFlavor, index) => (
                <div key={index} className="flex gap-2">
                  <select
                    value={selectedFlavor}
                    onChange={(e) => updateFlavorDropdown(index, e.target.value)}
                    className="flex-1 p-3 border border-primary/20 rounded-lg text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent1"
                  >
                    <option value="">Select a flavor...</option>
                    {customizationOptions.flavors.map((flavor) => (
                      <option key={flavor.name} value={flavor.name}>
                        {flavor.name} (+${flavor.price})
                      </option>
                    ))}
                  </select>
                  {flavorDropdowns.length > 1 && (
                    <button
                      onClick={() => removeFlavorDropdown(index)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Add-ins Selection */}
          <div className="bg-white border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-primary">Add-ins (Optional)</h3>
              <button
                onClick={addAddInDropdown}
                className="p-2 hover:bg-primary/5 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              {addInDropdowns.map((selectedAddIn, index) => (
                <div key={index} className="flex gap-2">
                  <select
                    value={selectedAddIn}
                    onChange={(e) => updateAddInDropdown(index, e.target.value)}
                    className="flex-1 p-3 border border-primary/20 rounded-lg text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent1"
                  >
                    <option value="">Select an add-in...</option>
                    {customizationOptions.addIns.map((addIn) => (
                      <option key={addIn.name} value={addIn.name}>
                        {addIn.name} {addIn.price > 0 ? `(+$${addIn.price})` : '(Free)'}
                      </option>
                    ))}
                  </select>
                  {addInDropdowns.length > 1 && (
                    <button
                      onClick={() => removeAddInDropdown(index)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add to Cart Section */}
        <div className="mt-8 bg-white border-2 border-accent2 rounded-lg p-4">
          {/* Header with drink name and total price */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-primary">{itemName}</h3>
            <div className="text-xl font-bold text-primary">${calculateTotalPrice().toFixed(2)}</div>
          </div>

          {/* Customization details */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-primary/70 flex-1">
              {selectedSize} • {selectedShots} shot{selectedShots > 1 ? 's' : ''}
              {flavorDropdowns.filter(f => f).length > 0 && ` • ${flavorDropdowns.filter(f => f).join(', ')}`}
              {addInDropdowns.filter(a => a).length > 0 && ` • ${addInDropdowns.filter(a => a).join(', ')}`}
            </p>

            {/* Action buttons */}
            <div className="flex items-center gap-2 ml-4">
              {/* Back to Menu button */}
              <button
                onClick={handleBackToMenu}
                className="p-2 text-primary hover:bg-gray-100 rounded-lg transition-colors"
                title="Back to Menu"
              >
                <ArrowLeft size={20} />
              </button>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 bg-accent1 text-white rounded-lg hover:bg-accent1/90 transition-colors font-medium text-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Mini Cart */}
        <MiniCart
          items={cartItems}
          onCheckout={handleCheckout}
          className="mt-6"
        />
      </div>
    </Layout>
  );
}