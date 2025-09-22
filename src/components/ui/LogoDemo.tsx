'use client';

import { Logo } from './Logo';

export function LogoDemo() {
  return (
    <div className="p-8 space-y-8 bg-white">
      <h1 className="text-2xl font-bold mb-6">Logo Component Demo</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-lg font-semibold mb-4">Full Logo Variants</h2>
          <div className="flex flex-wrap items-center gap-8">
            <div className="text-center">
              <Logo variant="header" size="medium" />
              <p className="text-sm mt-2">Header (Medium)</p>
            </div>
            <div className="text-center">
              <Logo variant="hero" size="large" />
              <p className="text-sm mt-2">Hero (Large)</p>
            </div>
            <div className="text-center">
              <Logo variant="footer" size="small" />
              <p className="text-sm mt-2">Footer (Small)</p>
            </div>
            <div className="text-center">
              <Logo variant="inline" size="medium" />
              <p className="text-sm mt-2">Inline (Medium)</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Icon Variant (New)</h2>
          <div className="flex flex-wrap items-center gap-8">
            <div className="text-center">
              <Logo variant="icon" size="small" />
              <p className="text-sm mt-2">Icon (Small - 16px)</p>
            </div>
            <div className="text-center">
              <Logo variant="icon" size="medium" />
              <p className="text-sm mt-2">Icon (Medium - 24px)</p>
            </div>
            <div className="text-center">
              <Logo variant="icon" size="large" />
              <p className="text-sm mt-2">Icon (Large - 32px)</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Clickable Icons</h2>
          <div className="flex flex-wrap items-center gap-8">
            <div className="text-center">
              <Logo 
                variant="icon" 
                size="medium" 
                clickable 
                onClick={() => alert('Icon clicked!')} 
              />
              <p className="text-sm mt-2">Clickable Icon</p>
            </div>
            <div className="text-center">
              <Logo 
                variant="header" 
                size="medium" 
                clickable 
                onClick={() => alert('Header logo clicked!')} 
              />
              <p className="text-sm mt-2">Clickable Header</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Usage Context Examples</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded">
              <Logo variant="icon" size="small" />
              <span>Icon in compact navigation</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded">
              <Logo variant="icon" size="medium" />
              <span>Icon in mobile menu</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded">
              <Logo variant="inline" size="small" />
              <span>Full logo inline with text</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}