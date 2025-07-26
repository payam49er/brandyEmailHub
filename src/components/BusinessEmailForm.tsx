import React, { useState } from 'react';
import { Mail, AlertCircle } from 'lucide-react';
import { isValidBusinessEmail } from '../utils/csvParser';

interface BusinessEmailFormProps {
  onSubmit: (email: string) => void;
  initialEmail?: string;
}

/**
 * Form component for collecting and validating business email address
 */
export const BusinessEmailForm: React.FC<BusinessEmailFormProps> = ({ onSubmit, initialEmail = '' }) => {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validate email
    if (!email.trim()) {
      setError('Business email is required');
      setIsSubmitting(false);
      return;
    }

    if (!isValidBusinessEmail(email)) {
      setError('Please enter a valid business email address (personal email domains like Gmail are not allowed)');
      setIsSubmitting(false);
      return;
    }

    // Simulate API validation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSubmit(email);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Mail className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Setup Your Campaign</h2>
        <p className="text-gray-600">
          Enter your business email address to get started with sending emails to your contacts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="businessEmail" className="block text-sm font-medium text-gray-700 mb-2">
            Business Email Address
          </label>
          <input
            type="email"
            id="businessEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`
              w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
              ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'}
            `}
            placeholder="your.name@company.com"
            disabled={isSubmitting}
          />
          {error && (
            <div className="mt-2 flex items-center text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {error}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Validating...' : 'Continue'}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Why do we need your business email?</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Used as the sender address for your email campaigns</li>
          <li>• Ensures better deliverability to your contacts</li>
          <li>• Required for compliance with email marketing regulations</li>
        </ul>
      </div>
    </div>
  );
};