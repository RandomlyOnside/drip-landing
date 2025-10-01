'use client';

import { useState } from 'react';
import { Layout, QuickActions } from '@/components/consumer';
import { MockDataService } from '@/lib/mockDataService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/lib/toast';

export default function ProfilePage() {
  const mockUser = MockDataService.getMockConsumerUser();
  const { showSuccess, showInfo, showError } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
  });

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    orderUpdates: true,
    promotionalEmails: false,
  });

  // Collapsible state
  const [isPersonalInfoExpanded, setIsPersonalInfoExpanded] = useState(false);
  const [isMembershipExpanded, setIsMembershipExpanded] = useState(false);
  const [isWalletExpanded, setIsWalletExpanded] = useState(false);
  const [isNotificationsExpanded, setIsNotificationsExpanded] = useState(false);

  // Mock membership data
  const mockMembership = {
    level: 'Gold',
    since: 'January 2024',
    benefits: ['Free delivery', '10% discount', 'Priority support'],
    familyMembers: [
      { email: 'jane.doe@email.com', status: 'Active' },
      { email: 'teen.doe@email.com', status: 'Pending' }
    ]
  };

  // Mock wallet data
  const mockWallet = {
    cards: [
      {
        id: 1,
        type: 'Visa',
        last4: '4242',
        expiry: '12/26',
        isDefault: true
      }
    ],
    balance: 25.50
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSettingToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSaveProfile = () => {
    // Mock save action - in real app would make API call
    console.log('Saving profile:', formData);
    showSuccess('Profile updated successfully!');
  };

  const handleSaveSettings = () => {
    // Mock save action - in real app would make API call
    console.log('Saving settings:', settings);
    showSuccess('Notification settings saved!');
  };

  const handleChangeAvatar = () => {
    showInfo('Avatar upload feature coming soon!');
  };

  const handleChangePassword = () => {
    showInfo('Password change feature coming soon!');
  };

  const handleUpdateEmail = () => {
    showInfo('Email update feature coming soon!');
  };

  const handleDeleteAccount = () => {
    showError('Account deletion requires additional verification');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Avatar Card - At the very top */}
        <div className="bg-white border border-primary/20 rounded-lg p-4 sm:p-6 mb-6">
          <div className="flex items-center gap-4">
            {/* Avatar on the left */}
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-10 h-10 text-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            
            {/* User info on the right */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary mb-1">{mockUser.name}</h3>
              <p className="text-sm text-primary/70 mb-1">{mockUser.email}</p>
              <p className="text-sm text-primary/60">(555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions 
          actions={[
            { label: 'Profile', href: '/portal/consumer-demo/profile' },
            { label: 'Order History', href: '/portal/consumer-demo/order-history' }
          ]}
          className="mb-4" 
        />

        {/* Top Orders Section */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-primary mb-3">Top Orders</h2>
          
          {/* Top Orders - 3 items in a row */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { id: 1, name: 'Vanilla Latte', cafe: 'Local Drip Coffee', price: 4.50, orderCount: 12 },
              { id: 2, name: 'Americano', cafe: 'Bean There Cafe', price: 3.25, orderCount: 8 },
              { id: 3, name: 'Cappuccino', cafe: 'Morning Brew', price: 4.00, orderCount: 6 }
            ].map((item) => (
              <div key={item.id} className="bg-white border border-primary/20 rounded-lg p-2 hover:shadow-md hover:border-accent1/40 transition-all">
                {/* Header with logo and cafe name */}
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">L</span>
                  </div>
                  <p className="text-xs text-primary/70 truncate">{item.cafe}</p>
                </div>
                
                {/* Item name */}
                <h3 className="text-xs font-semibold text-primary truncate mb-1.5">{item.name}</h3>
                
                {/* Footer with cost, order count and reorder icon */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-primary">${item.price}</span>
                    <span className="text-xs text-primary/60">Ordered {item.orderCount}x</span>
                  </div>
                  <button className="p-1 hover:bg-primary/5 rounded transition-colors">
                    <svg className="w-4 h-4 text-primary/70 hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-b border-primary/10"></div>
        </div>

        {/* Cool Stats Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-primary mb-3">Your Stats</h2>
          
          {/* Stats - 3 cards in a row */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white border border-primary/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary mb-1">47</div>
              <div className="text-xs text-primary/70">Total Orders</div>
            </div>
            
            <div className="bg-white border border-primary/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-accent1 mb-1">$312</div>
              <div className="text-xs text-primary/70">Total Spent</div>
            </div>
            
            <div className="bg-white border border-primary/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-accent2 mb-1">8</div>
              <div className="text-xs text-primary/70">Cafes Visited</div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="mt-4 border-b border-primary/10"></div>
        </div>

        <div className="space-y-6">
            {/* Personal Information Card */}
            <div className="bg-white border border-primary/20 rounded-lg p-4 sm:p-6">
              <div 
                className={`flex items-center justify-between cursor-pointer ${isPersonalInfoExpanded ? 'mb-4' : 'mb-0'}`}
                onClick={() => setIsPersonalInfoExpanded(!isPersonalInfoExpanded)}
              >
                <h2 className="text-sm font-medium text-primary">
                  Personal Information
                </h2>
                <div className="text-primary/40">
                  {isPersonalInfoExpanded ? '▼' : '▶'}
                </div>
              </div>

              {isPersonalInfoExpanded && (
                <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthday">Birthday</Label>
                    <Input
                      id="birthday"
                      name="birthday"
                      type="date"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="123 Main St, City, State 12345"
                    className="w-full"
                  />
                </div>
                </div>
              )}
            </div>

            {/* Membership Card */}
            <div className="bg-white border border-primary/20 rounded-lg p-4 sm:p-6">
              <div 
                className={`flex items-center justify-between cursor-pointer ${isMembershipExpanded ? 'mb-4' : 'mb-0'}`}
                onClick={() => setIsMembershipExpanded(!isMembershipExpanded)}
              >
                <h2 className="text-sm font-medium text-primary">
                  Membership
                </h2>
                <div className="text-primary/40">
                  {isMembershipExpanded ? '▼' : '▶'}
                </div>
              </div>

              {isMembershipExpanded && (
                <div className="space-y-4">
                  {/* Membership Level */}
                  <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-yellow-800">{mockMembership.level} Member</span>
                      <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Active</span>
                    </div>
                    <p className="text-xs text-yellow-700">Member since {mockMembership.since}</p>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-sm font-medium text-primary mb-2">Benefits</h3>
                    <div className="space-y-1">
                      {mockMembership.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-accent2 rounded-full"></div>
                          <span className="text-xs text-primary/70">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Family Members */}
                  <div>
                    <h3 className="text-sm font-medium text-primary mb-2">Family Members</h3>
                    <div className="space-y-2">
                      {mockMembership.familyMembers.map((member, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-primary/5 rounded">
                          <span className="text-xs text-primary">{member.email}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            member.status === 'Active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {member.status}
                          </span>
                        </div>
                      ))}
                      
                      <button className="w-full mt-2 p-2 border-2 border-dashed border-primary/20 rounded text-xs text-primary/70 hover:border-primary/40 hover:text-primary transition-colors">
                        + Add Family Member
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Wallet Card */}
            <div className="bg-white border border-primary/20 rounded-lg p-4 sm:p-6">
              <div 
                className={`flex items-center justify-between cursor-pointer ${isWalletExpanded ? 'mb-4' : 'mb-0'}`}
                onClick={() => setIsWalletExpanded(!isWalletExpanded)}
              >
                <h2 className="text-sm font-medium text-primary">
                  Wallet & Payment
                </h2>
                <div className="text-primary/40">
                  {isWalletExpanded ? '▼' : '▶'}
                </div>
              </div>

              {isWalletExpanded && (
                <div className="space-y-4">
                  {/* Account Balance */}
                  <div className="bg-primary/5 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-primary/70">Account Balance</span>
                      <span className="text-lg font-bold text-primary">${mockWallet.balance.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <h3 className="text-sm font-medium text-primary mb-3">Payment Methods</h3>
                    {mockWallet.cards.map((card) => (
                      <div key={card.id} className="border border-primary/20 rounded-lg p-3 mb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-6 bg-primary/10 rounded flex items-center justify-center">
                              <span className="text-xs font-bold text-primary">
                                {card.type === 'Visa' ? 'V' : 'M'}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-primary">
                                •••• •••• •••• {card.last4}
                              </div>
                              <div className="text-xs text-primary/60">
                                Expires {card.expiry}
                              </div>
                            </div>
                          </div>
                          {card.isDefault && (
                            <span className="text-xs bg-accent2 text-white px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <button className="w-full mt-2 p-3 border-2 border-dashed border-primary/20 rounded-lg text-sm text-primary/70 hover:border-primary/40 hover:text-primary transition-colors">
                      + Add Payment Method
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notification Settings Card */}
            <div className="bg-white border border-primary/20 rounded-lg p-4 sm:p-6">
              <div 
                className={`flex items-center justify-between cursor-pointer ${isNotificationsExpanded ? 'mb-4' : 'mb-0'}`}
                onClick={() => setIsNotificationsExpanded(!isNotificationsExpanded)}
              >
                <h2 className="text-sm font-medium text-primary">
                  Notification Preferences
                </h2>
                <div className="text-primary/40">
                  {isNotificationsExpanded ? '▼' : '▶'}
                </div>
              </div>

              {isNotificationsExpanded && (
                <div className="space-y-4">
                {Object.entries(settings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-2">
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-primary">
                        {key === 'emailNotifications' && 'Email Notifications'}
                        {key === 'pushNotifications' && 'Push Notifications'}
                        {key === 'orderUpdates' && 'Order Updates'}
                        {key === 'promotionalEmails' && 'Promotional Emails'}
                      </Label>
                      <p className="text-xs text-primary/60 mt-1">
                        {key === 'emailNotifications' && 'Receive notifications via email'}
                        {key === 'pushNotifications' && 'Receive push notifications on your device'}
                        {key === 'orderUpdates' && 'Get updates about your orders'}
                        {key === 'promotionalEmails' && 'Receive promotional offers and deals'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSettingToggle(key as keyof typeof settings)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        value ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
                </div>
              )}
            </div>
        </div>
      </div>
    </Layout>
  );
}