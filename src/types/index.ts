/**
 * Type definitions for the email marketing application
 */

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  fullName?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  component: React.ComponentType<{ firstName?: string; lastName?: string; fullName?: string }>;
  preview: string;
  defaultContent: {
    subject: string;
    heading: string;
    mainText: string;
    callToActionText?: string;
    callToActionUrl?: string;
    additionalText?: string;
  };
}

export interface CustomizedTemplate extends EmailTemplate {
  customContent: {
    subject: string;
    heading: string;
    mainText: string;
    callToActionText?: string;
    callToActionUrl?: string;
    additionalText?: string;
  };
}

export interface AppState {
  businessEmail: string;
  contacts: Contact[];
  selectedTemplate: CustomizedTemplate | null;
  emailsSent: number;
  isProcessing: boolean;
  currentStep: 'setup' | 'upload' | 'template' | 'send' | 'complete';
  isCaptchaVerified: boolean;
}

export interface ValidationErrors {
  businessEmail?: string;
  contacts?: string;
  template?: string;
}