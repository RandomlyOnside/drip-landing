'use client';

import { useRouter } from 'next/navigation';

interface QuickAction {
  label: string;
  onClick?: () => void;
  href?: string;
}

interface QuickActionsProps {
  actions?: QuickAction[];
  className?: string;
}

const defaultActions: QuickAction[] = [
  {
    label: 'Order Again',
    onClick: () => console.log('Order Again clicked') // Placeholder for now
  },
  {
    label: 'Explore',
    href: '/portal/consumer-demo/order'
  },
  {
    label: 'Past Orders',
    href: '/portal/consumer-demo/order-history'
  }
];

export function QuickActions({ actions = defaultActions, className = '' }: QuickActionsProps) {
  const router = useRouter();

  const handleActionClick = (action: QuickAction) => {
    if (action.onClick) {
      action.onClick();
    } else if (action.href) {
      router.push(action.href);
    }
  };

  return (
    <div className={`mb-2 ${className}`}>
      {/* Quick Actions Buttons */}
      <div className="flex flex-wrap gap-2">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => handleActionClick(action)}
            className="px-3 py-1.5 bg-white border border-accent2 text-primary rounded-full hover:bg-accent2/10 hover:border-accent2/80 transition-all text-xs font-medium"
          >
            {action.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="mt-3 border-b border-primary/10"></div>
    </div>
  );
}