import React, { useState } from 'react';
import { StepIndicator } from './components/StepIndicator';
import { BusinessEmailForm } from './components/BusinessEmailForm';
import { CSVUpload } from './components/CSVUpload';
import { TemplateSelector } from './components/TemplateSelector';
import { EmailSender } from './components/EmailSender';
import { AppState, Contact, CustomizedTemplate } from './types';
import { Mail, CheckCircle, RotateCcw } from 'lucide-react';

/**
 * Main application component for the email marketing platform
 * Manages the multi-step workflow for creating and sending email campaigns
 */
function App() {
  const [appState, setAppState] = useState<AppState>({
    businessEmail: '',
    contacts: [],
    selectedTemplate: null,
    emailsSent: 0,
    isProcessing: false,
    currentStep: 'setup',
    isCaptchaVerified: false
  });

  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  /**
   * Handles business email submission and moves to contact upload step
   */
  const handleBusinessEmailSubmit = (email: string) => {
    setAppState(prev => ({
      ...prev,
      businessEmail: email,
      currentStep: 'upload'
    }));
    setCompletedSteps(prev => [...prev, 'setup']);
  };

  /**
   * Handles contact upload and moves to template selection step
   */
  const handleContactsUploaded = (contacts: Contact[]) => {
    setAppState(prev => ({
      ...prev,
      contacts,
      currentStep: contacts.length > 0 ? 'template' : 'upload'
    }));
    if (contacts.length > 0) {
      setCompletedSteps(prev => [...prev, 'upload'].filter((step, index, arr) => arr.indexOf(step) === index));
    }
  };

  /**
   * Handles template selection and moves to send step
   */
  const handleTemplateSelected = (template: CustomizedTemplate) => {
    setAppState(prev => ({
      ...prev,
      selectedTemplate: template,
      currentStep: 'send'
    }));
    setCompletedSteps(prev => [...prev, 'template'].filter((step, index, arr) => arr.indexOf(step) === index));
  };

  /**
   * Handles send completion and moves to complete step
   */
  const handleSendComplete = (sentCount: number) => {
    setAppState(prev => ({
      ...prev,
      emailsSent: sentCount,
      currentStep: 'complete'
    }));
    setCompletedSteps(prev => [...prev, 'send', 'complete'].filter((step, index, arr) => arr.indexOf(step) === index));
  };

  /**
   * Resets the application to start a new campaign
   */
  const startNewCampaign = () => {
    setAppState({
      businessEmail: '',
      contacts: [],
      selectedTemplate: null,
      emailsSent: 0,
      isProcessing: false,
      currentStep: 'setup',
      isCaptchaVerified: false
    });
    setCompletedSteps([]);
  };

  /**
   * Renders the appropriate component based on current step
   */
  const renderCurrentStep = () => {
    switch (appState.currentStep) {
      case 'setup':
        return (
          <BusinessEmailForm 
            onSubmit={handleBusinessEmailSubmit}
            initialEmail={appState.businessEmail}
          />
        );
      
      case 'upload':
        return (
          <CSVUpload 
            onContactsUploaded={handleContactsUploaded}
            maxContacts={1000}
          />
        );
      
      case 'template':
        return (
          <TemplateSelector 
            onTemplateSelected={handleTemplateSelected}
            selectedTemplate={appState.selectedTemplate}
          />
        );
      
      case 'send':
        if (!appState.selectedTemplate) return null;
        return (
          <EmailSender 
            businessEmail={appState.businessEmail}
            contacts={appState.contacts}
            template={appState.selectedTemplate}
            onSendComplete={handleSendComplete}
          />
        );
      
      case 'complete':
        return (
          <div className="max-w-md mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Campaign Complete!</h2>
            <p className="text-gray-600 mb-6">
              Successfully sent {appState.emailsSent.toLocaleString()} emails to your contacts using the "{appState.selectedTemplate?.name}" template.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Campaign Summary</h3>
              <div className="space-y-2 text-sm text-green-800">
                <p><strong>From:</strong> {appState.businessEmail}</p>
                <p><strong>Template:</strong> {appState.selectedTemplate?.name}</p>
                <p><strong>Subject:</strong> {appState.selectedTemplate?.customContent.subject}</p>
                <p><strong>Recipients:</strong> {appState.contacts.length.toLocaleString()}</p>
                <p><strong>Successfully Sent:</strong> {appState.emailsSent.toLocaleString()}</p>
              </div>
            </div>

            <button
              onClick={startNewCampaign}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Start New Campaign
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Mail className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Email Marketing Platform</h1>
            </div>
            <div className="text-sm text-gray-500">
              Professional Email Campaigns Made Simple
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        {appState.currentStep !== 'complete' && (
          <StepIndicator 
            currentStep={appState.currentStep}
            completedSteps={completedSteps}
          />
        )}

        {/* Current Step Content */}
        <div className="mt-8">
          {renderCurrentStep()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>Built with React, TypeScript, and Tailwind CSS</p>
            <p className="mt-2">
              Demo application - Email sending is simulated for demonstration purposes
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;