'use client';

import { useState, useEffect } from 'react';
import { CreditCardIcon, ShoppingCartIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

interface CreditPricing {
  small: { amount: number; price: number; savings: number };
  medium: { amount: number; price: number; savings: number };
  large: { amount: number; price: number; savings: number };
  enterprise: { amount: number; price: number; savings: number };
}

interface UserCredits {
  userId: string;
  credits: number;
  totalPurchased: number;
  totalUsed: number;
  lastPurchase: string | null;
  purchaseHistory: Array<{
    id: string;
    amount: number;
    paymentMethod: string;
    date: string;
    cost: number;
  }>;
  usageHistory: Array<{
    id: string;
    type: string;
    creditsUsed: number;
    date: string;
    description: string;
  }>;
}

interface CreditsManagerProps {
  userId?: string;
  onCreditsUpdate?: (credits: number) => void;
}

export default function CreditsManager({ userId = 'user-1', onCreditsUpdate }: CreditsManagerProps) {
  const [userCredits, setUserCredits] = useState<UserCredits | null>(null);
  const [pricing, setPricing] = useState<CreditPricing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'paypal' | 'stripe'>('credit_card');

  useEffect(() => {
    loadCredits();
  }, [userId]);

  const loadCredits = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/credits?userId=${userId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load credits');
      }

      setUserCredits(data.credits);
      setPricing(data.pricing);
      onCreditsUpdate?.(data.credits.credits);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load credits';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async (amount: number) => {
    try {
      setIsPurchasing(true);
      setError(null);

      const response = await fetch('/api/credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          paymentMethod,
          userId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Purchase failed');
      }

      // Update local state
      if (userCredits) {
        setUserCredits({
          ...userCredits,
          credits: data.updatedCredits,
          totalPurchased: userCredits.totalPurchased + amount,
          lastPurchase: new Date().toISOString(),
          purchaseHistory: [
            ...userCredits.purchaseHistory,
            {
              id: data.purchase.id,
              amount,
              paymentMethod,
              date: data.purchase.date,
              cost: data.purchase.cost,
            },
          ],
        });
      }

      onCreditsUpdate?.(data.updatedCredits);
      setSelectedPackage(null);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Purchase failed';
      setError(errorMessage);
    } finally {
      setIsPurchasing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!userCredits || !pricing) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Failed to load credits
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Please try refreshing the page or contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Credits Manager
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your credits and purchase more for AI-powered searches
        </p>
      </div>

      {/* Current Credits */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Available Credits</h3>
            <p className="text-blue-100">Use credits for face search and premium features</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{userCredits.credits}</div>
            <p className="text-blue-100 text-sm">credits remaining</p>
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <ShoppingCartIcon className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Purchased</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {userCredits.totalPurchased}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <CurrencyDollarIcon className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Used</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {userCredits.totalUsed}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <CreditCardIcon className="w-8 h-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Last Purchase</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {userCredits.lastPurchase
                  ? new Date(userCredits.lastPurchase).toLocaleDateString()
                  : 'Never'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Packages */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Purchase Credits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(pricing).map(([key, packageData]) => (
            <div
              key={key}
              className={`bg-white dark:bg-gray-800 rounded-lg border-2 p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedPackage === key
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setSelectedPackage(key)}
            >
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                  {key} Package
                </h4>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {packageData.amount}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400"> credits</span>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${packageData.price}
                  </span>
                  {packageData.savings > 0 && (
                    <div className="text-sm text-green-600 dark:text-green-400">
                      Save ${packageData.savings}
                    </div>
                  )}
                </div>
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  ${(packageData.price / packageData.amount).toFixed(2)} per credit
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      {selectedPackage && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Payment Method
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { value: 'credit_card', label: 'Credit Card', icon: '💳' },
              { value: 'paypal', label: 'PayPal', icon: '🔵' },
              { value: 'stripe', label: 'Stripe', icon: '💜' },
            ].map((method) => (
              <button
                key={method.value}
                onClick={() => setPaymentMethod(method.value as any)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  paymentMethod === method.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{method.icon}</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {method.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Purchase Button */}
      {selectedPackage && (
        <div className="flex justify-center">
          <button
            onClick={() => handlePurchase(pricing[selectedPackage as keyof CreditPricing].amount)}
            disabled={isPurchasing}
            className="btn-primary flex items-center text-lg px-8 py-3"
          >
            <ShoppingCartIcon className="w-6 h-6 mr-2" />
            {isPurchasing ? 'Processing...' : `Purchase ${pricing[selectedPackage as keyof CreditPricing].amount} Credits`}
          </button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700 dark:text-red-300">{error}</span>
          </div>
        </div>
      )}

      {/* Purchase History */}
      {userCredits.purchaseHistory.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Purchase History
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Cost
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Method
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {userCredits.purchaseHistory.map((purchase) => (
                    <tr key={purchase.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {new Date(purchase.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {purchase.amount} credits
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        ${purchase.cost.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white capitalize">
                        {purchase.paymentMethod.replace('_', ' ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 