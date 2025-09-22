'use client';

import { Logo } from '@/components/ui/Logo';

export default function LogoTestPage() {
  const handleLogoClick = () => {
    console.log('Logo clicked!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-center mb-8">Logo Component Test</h1>
        
        {/* Header Variant Tests */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Header Variant</h2>
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <Logo variant="header" size="small" />
            <Logo variant="header" size="medium" />
            <Logo variant="header" size="large" />
            <Logo variant="header" size="medium" clickable onClick={handleLogoClick} />
          </div>
          <p className="text-sm text-muted-foreground">
            Small, Medium, Large, and Clickable (medium) header logos
          </p>
        </section>

        {/* Hero Variant Tests */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Hero Variant</h2>
          <div className="flex items-center gap-8 p-4 border rounded-lg justify-center">
            <Logo variant="hero" size="small" />
            <Logo variant="hero" size="medium" />
            <Logo variant="hero" size="large" />
          </div>
          <p className="text-sm text-muted-foreground">
            Small, Medium, and Large hero logos
          </p>
        </section>

        {/* Footer Variant Tests */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Footer Variant</h2>
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <Logo variant="footer" size="small" />
            <Logo variant="footer" size="medium" />
            <Logo variant="footer" size="large" />
          </div>
          <p className="text-sm text-muted-foreground">
            Small, Medium, and Large footer logos
          </p>
        </section>

        {/* Inline Variant Tests */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Inline Variant</h2>
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <Logo variant="inline" size="small" />
            <Logo variant="inline" size="medium" />
            <Logo variant="inline" size="large" />
          </div>
          <p className="text-sm text-muted-foreground">
            Small, Medium, and Large inline logos
          </p>
        </section>

        {/* Custom Size Tests */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Custom Sizes</h2>
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <Logo size="custom" width={60} height={60} />
            <Logo size="custom" width={100} height={100} />
            <Logo variant="hero" size="custom" width={150} height={150} />
          </div>
          <p className="text-sm text-muted-foreground">
            Custom sized logos: 60x60, 100x100, and 150x150 (hero variant)
          </p>
        </section>

        {/* Accessibility Tests */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Accessibility Features</h2>
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <Logo variant="header" size="medium" clickable onClick={handleLogoClick} alt="Custom Alt Text" />
            <Logo variant="inline" size="medium" alt="Another Custom Alt" />
          </div>
          <p className="text-sm text-muted-foreground">
            Logos with custom alt text. First one is clickable (try tabbing to it).
          </p>
        </section>

        {/* Priority Loading Test */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Priority Loading</h2>
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <Logo variant="hero" size="large" priority />
          </div>
          <p className="text-sm text-muted-foreground">
            Hero logo with priority loading enabled
          </p>
        </section>

        {/* Responsive Test */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Responsive Behavior</h2>
          <div className="p-4 border rounded-lg text-center">
            <Logo variant="hero" size="large" />
          </div>
          <p className="text-sm text-muted-foreground">
            Hero logo that scales responsively (resize window to test)
          </p>
        </section>
      </div>
    </div>
  );
}