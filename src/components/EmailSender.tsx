import React, { useState } from 'react';
import { Send, Clock, CheckCircle, AlertCircle, Users } from 'lucide-react';
import { Contact, CustomizedTemplate } from '../types';
import { CaptchaPuzzle } from './CaptchaPuzzle';

interface EmailSenderProps {
  businessEmail: string;
  contacts: Contact[];
  template: CustomizedTemplate;
  onSendComplete: (sentCount: number) => void;
}

/**
 * Component for sending bulk emails with progress tracking
 */
export const EmailSender: React.FC<EmailSenderProps> = ({
  businessEmail,
  contacts,
  template,
  onSendComplete
}) => {
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [currentContact, setCurrentContact] = useState<string>('');
  const [sendErrors, setSendErrors] = useState<string[]>([]);

  /**
   * Handles CAPTCHA verification completion
   */
  const handleCaptchaVerified = () => {
    setIsCaptchaVerified(true);
    setShowCaptcha(false);
    // Start sending emails after verification
    startSendingEmails();
  };

  /**
   * Shows CAPTCHA before starting email send process
   */
  const initiateSending = () => {
    setShowCaptcha(true);
  };

  // Simulate email sending process
  const simulateEmailSending = async (contact: Contact): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
    
    // Simulate 95% success rate
    return Math.random() > 0.05;
  };

  /**
   * Actual email sending process (called after CAPTCHA verification)
   */
  const startSendingEmails = async () => {
    setIsSending(true);
    setSentCount(0);
    setFailedCount(0);
    setSendErrors([]);

    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      setCurrentContact(contact.fullName || `${contact.firstName} ${contact.lastName}`.trim());

      try {
        const success = await simulateEmailSending(contact);
        
        if (success) {
          setSentCount(prev => prev + 1);
        } else {
          setFailedCount(prev => prev + 1);
          setSendErrors(prev => [...prev, `Failed to send to ${contact.email}`]);
        }
      } catch (error) {
        setFailedCount(prev => prev + 1);
        setSendErrors(prev => [...prev, `Error sending to ${contact.email}: ${error}`]);
      }
    }

    setIsSending(false);
    setCurrentContact('');
    onSendComplete(sentCount + contacts.length - failedCount);
  };

  const progress = contacts.length > 0 ? ((sentCount + failedCount) / contacts.length) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Send className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Your Campaign</h2>
        <p className="text-gray-600">
          Review your campaign details and send emails to your contacts.
        </p>
      </div>

      {/* Campaign Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Summary</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Recipients</p>
              <p className="text-xl font-semibold text-gray-900">{contacts.length.toLocaleString()}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Template</p>
            <p className="font-medium text-gray-900">{template.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">From</p>
            <p className="font-medium text-gray-900">{businessEmail}</p>
          </div>
        </div>
      </div>

      {/* Template Preview */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <h4 className="text-md font-semibold text-gray-900 mb-3">Email Preview</h4>
        <div className="bg-white border rounded p-4">
          <div className="text-sm text-gray-600 mb-3">
            <p><strong>Subject:</strong> {template.customContent.subject}</p>
            <p><strong>From:</strong> {businessEmail}</p>
          </div>
          <div className="border-t pt-3">
            <template.component 
              firstName="[First Name]"
              lastName="[Last Name]"
              fullName="[Full Name]"
              customContent={template.customContent}
            />
          </div>
        </div>
      </div>

      {/* Send Controls */}
      {!isSending && sentCount === 0 && (
        <div className="text-center">
          <button
            onClick={initiateSending}
            className="inline-flex items-center px-8 py-3 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            <Send className="w-5 h-5 mr-2" />
            Send {contacts.length} Email{contacts.length !== 1 ? 's' : ''}
          </button>
          <p className="text-gray-500 text-sm mt-2">
            You'll need to complete a security verification before sending
          </p>
        </div>
      )}

      {/* Sending Progress */}
      {isSending && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 text-blue-600 mr-2 animate-spin" />
            <h4 className="text-lg font-semibold text-blue-900">Sending Emails...</h4>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-blue-700 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <p className="text-green-600 font-semibold">{sentCount}</p>
              <p className="text-gray-600">Sent</p>
            </div>
            <div>
              <p className="text-red-600 font-semibold">{failedCount}</p>
              <p className="text-gray-600">Failed</p>
            </div>
            <div>
              <p className="text-blue-600 font-semibold">{contacts.length - sentCount - failedCount}</p>
              <p className="text-gray-600">Remaining</p>
            </div>
          </div>

          {currentContact && (
            <p className="text-blue-700 text-sm mt-4 text-center">
              Currently sending to: {currentContact}
            </p>
          )}
        </div>
      )}

      {/* Send Complete */}
      {!isSending && sentCount > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
            <h4 className="text-lg font-semibold text-green-900">Campaign Complete!</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{sentCount}</p>
              <p className="text-green-700">Successfully Sent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{failedCount}</p>
              <p className="text-red-700">Failed</p>
            </div>
          </div>

          {sendErrors.length > 0 && (
            <div className="mt-4">
              <details className="cursor-pointer">
                <summary className="text-red-700 font-medium">View Failed Emails ({sendErrors.length})</summary>
                <div className="mt-2 p-3 bg-red-50 rounded text-sm">
                  {sendErrors.slice(0, 10).map((error, index) => (
                    <p key={index} className="text-red-600 mb-1">• {error}</p>
                  ))}
                  {sendErrors.length > 10 && (
                    <p className="text-red-600 font-medium">...and {sendErrors.length - 10} more errors</p>
                  )}
                </div>
              </details>
            </div>
          )}
        </div>
      )}

      {/* Important Notice */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" />
          <div className="text-sm text-yellow-700">
            <p className="font-medium mb-1">Important Notice</p>
            <p>
              This is a demo application. In a production environment, emails would be sent through a proper email service provider like SendGrid, Mailgun, or AWS SES with proper authentication and delivery tracking.
            </p>
          </div>
        </div>
      </div>

      {/* CAPTCHA Puzzle */}
      <CaptchaPuzzle 
        isVisible={showCaptcha}
        onVerified={handleCaptchaVerified}
      />
    </div>
  );
};