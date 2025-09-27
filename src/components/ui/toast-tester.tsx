'use client';

import { useToast } from '@/lib/toast';

export const ToastTester: React.FC = () => {
  const { showSuccess, showError, showInfo } = useToast();

  const testMessages = {
    success: "Account created successfully!",
    error: "Invalid email or password. Please try again.",
    info: "Your session will expire in 5 minutes."
  };

  const handleSuccessTest = () => {
    showSuccess(testMessages.success);
  };

  const handleErrorTest = () => {
    showError(testMessages.error);
  };

  const handleInfoTest = () => {
    showInfo(testMessages.info);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h3 className="text-lg font-medium text-primary mb-4 text-center">
        Toast Testing
      </h3>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleSuccessTest}
          className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors duration-200"
        >
          Test Success
        </button>
        <button
          onClick={handleErrorTest}
          className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors duration-200"
        >
          Test Error
        </button>
        <button
          onClick={handleInfoTest}
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors duration-200"
        >
          Test Info
        </button>
      </div>
    </div>
  );
};