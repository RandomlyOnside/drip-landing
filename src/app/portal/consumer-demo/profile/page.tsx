'use client';

import { useState } from 'react';
import { Layout } from '@/components/consumer/Layout';
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
            Profile Settings
          </h1>
          <p className="text-base sm:text-lg text-primary/80">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Card */}
            <div className="bg-white border border-primary/20 rounded-lg p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-primary">
                  Personal Information
                </h2>
                <Button onClick={handleSaveProfile} size="sm" className="min-h-[44px] min-w-[44px] px-4 py-2">
                  Save Changes
                </Button>
              </div>

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
            </div>

            {/* Notification Settings Card */}
            <div className="bg-white border border-primary/20 rounded-lg p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-primary">
                  Notification Preferences
                </h2>
                <Button onClick={handleSaveSettings} size="sm" variant="outline" className="min-h-[44px] min-w-[44px] px-4 py-2">
                  Save Settings
                </Button>
              </div>

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
            </div>
          </div>

          {/* Profile Avatar and Quick Info */}
          <div className="space-y-6">
            {/* Avatar Card */}
            <div className="bg-white border border-primary/20 rounded-lg p-4 sm:p-6 text-center">
              <div className="mb-4">
                <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-3xl">👤</span>
                </div>
                <h3 className="font-semibold text-primary">{mockUser.name}</h3>
                <p className="text-sm text-primary/60">{mockUser.email}</p>
              </div>
              <Button 
                onClick={handleChangeAvatar}
                variant="outline" 
                size="sm" 
                className="w-full min-h-[44px] min-w-[44px]"
              >
                Change Avatar
              </Button>
            </div>

            {/* Account Summary */}
            <div className="bg-white border border-primary/20 rounded-lg p-4 sm:p-6">
              <h3 className="font-semibold text-primary mb-4">Account Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary/70">Member Since</span>
                  <span className="text-sm font-medium text-primary">Jan 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary/70">Total Orders</span>
                  <span className="text-sm font-medium text-primary">15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary/70">Reward Points</span>
                  <span className="text-sm font-medium text-primary">125</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary/70">Account Status</span>
                  <span className="text-sm font-medium text-green-600">Active</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-primary/20 rounded-lg p-4 sm:p-6">
              <h3 className="font-semibold text-primary mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button 
                  onClick={handleChangePassword}
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start min-h-[44px] min-w-[44px]"
                >
                  🔒 Change Password
                </Button>
                <Button 
                  onClick={handleUpdateEmail}
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start min-h-[44px] min-w-[44px]"
                >
                  📧 Update Email
                </Button>
                <Button 
                  onClick={handleDeleteAccount}
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start min-h-[44px] min-w-[44px]"
                >
                  🗑️ Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}