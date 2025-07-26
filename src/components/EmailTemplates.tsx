import React from 'react';
import { EmailTemplate, CustomizedTemplate } from '../types';

/**
 * Email template components and configurations
 * These would typically be imported from react.email templates
 */

interface TemplateProps {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  customContent?: {
    subject: string;
    heading: string;
    mainText: string;
    callToActionText?: string;
    callToActionUrl?: string;
    additionalText?: string;
  };
}

// Professional Welcome Template
const WelcomeTemplate: React.FC<TemplateProps> = ({ firstName, fullName, customContent }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ backgroundColor: '#3B82F6', color: 'white', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ margin: '0', fontSize: '24px' }}>
        {customContent?.heading || 'Welcome to Our Community!'}
      </h1>
    </div>
    <div style={{ padding: '30px', backgroundColor: '#f9fafb' }}>
      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
        Hello {firstName || fullName || 'there'},
      </p>
      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
        {customContent?.mainText || 'Thank you for joining our community! We\'re excited to have you on board and look forward to sharing valuable insights and updates with you.'}
      </p>
      {customContent?.additionalText && (
        <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
          {customContent.additionalText}
        </p>
      )}
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <a href="#" style={{ 
          backgroundColor: '#3B82F6', 
          color: 'white', 
          padding: '12px 24px', 
          textDecoration: 'none', 
          borderRadius: '6px',
          display: 'inline-block'
        }}>
          {customContent?.callToActionText || 'Get Started'}
        </a>
      </div>
    </div>
  </div>
);

// Newsletter Template
const NewsletterTemplate: React.FC<TemplateProps> = ({ firstName, fullName, customContent }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ backgroundColor: '#6366F1', color: 'white', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ margin: '0', fontSize: '24px' }}>
        {customContent?.heading || 'Monthly Newsletter'}
      </h1>
    </div>
    <div style={{ padding: '30px', backgroundColor: '#ffffff' }}>
      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
        Hi {firstName || fullName || 'there'},
      </p>
      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
        {customContent?.mainText || 'Here\'s what\'s been happening this month and what\'s coming up next.'}
      </p>
      {customContent?.additionalText && (
        <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
          {customContent.additionalText}
        </p>
      )}
      <div style={{ borderLeft: '4px solid #6366F1', paddingLeft: '20px', margin: '20px 0' }}>
        <h3 style={{ color: '#1f2937', margin: '0 0 10px 0' }}>Latest Updates</h3>
        <p style={{ margin: '0', color: '#6b7280' }}>Stay informed about our latest features and improvements.</p>
      </div>
    </div>
  </div>
);

// Promotional Template
const PromotionalTemplate: React.FC<TemplateProps> = ({ firstName, fullName, customContent }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ backgroundColor: '#F59E0B', color: 'white', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ margin: '0', fontSize: '24px' }}>
        {customContent?.heading || 'Special Offer Just for You!'}
      </h1>
    </div>
    <div style={{ padding: '30px', backgroundColor: '#fffbeb' }}>
      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
        Dear {firstName || fullName || 'Valued Customer'},
      </p>
      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
        {customContent?.mainText || 'We have an exclusive offer that we think you\'ll love. Don\'t miss out on this limited-time opportunity!'}
      </p>
      {customContent?.additionalText && (
        <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
          {customContent.additionalText}
        </p>
      )}
      <div style={{ 
        backgroundColor: '#FEF3C7', 
        border: '2px dashed #F59E0B', 
        padding: '20px', 
        textAlign: 'center',
        margin: '20px 0'
      }}>
        <h3 style={{ color: '#92400E', margin: '0 0 10px 0' }}>20% OFF</h3>
        <p style={{ margin: '0', color: '#92400E' }}>
          {customContent?.callToActionText || 'Use code: SAVE20'}
        </p>
      </div>
    </div>
  </div>
);

// Product Launch Template
const ProductLaunchTemplate: React.FC<TemplateProps> = ({ firstName, fullName }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ backgroundColor: '#8B5CF6', color: 'white', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ margin: '0', fontSize: '28px' }}>🚀 New Product Launch!</h1>
    </div>
    <div style={{ padding: '30px', backgroundColor: '#ffffff' }}>
      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
        Hi {firstName || fullName || 'there'},
      </p>
      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
        We're thrilled to announce the launch of our latest innovation! This is something we've been working on for months, and we can't wait for you to experience it.
      </p>
      <div style={{ 
        backgroundColor: '#F3F4F6', 
        padding: '20px', 
        borderRadius: '8px',
        margin: '20px 0',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#8B5CF6', margin: '0 0 10px 0' }}>✨ Key Features</h3>
        <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
          <li style={{ margin: '8px 0' }}>🎯 Enhanced Performance</li>
          <li style={{ margin: '8px 0' }}>🔒 Advanced Security</li>
          <li style={{ margin: '8px 0' }}>📱 Mobile Optimized</li>
        </ul>
      </div>
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <a href="#" style={{ 
          backgroundColor: '#8B5CF6', 
          color: 'white', 
          padding: '14px 28px', 
          textDecoration: 'none', 
          borderRadius: '8px',
          display: 'inline-block',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          Explore Now
        </a>
      </div>
    </div>
  </div>
);

// Event Invitation Template
const EventInvitationTemplate: React.FC<TemplateProps> = ({ firstName, fullName }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ backgroundColor: '#EC4899', color: 'white', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ margin: '0', fontSize: '24px' }}>🎉 You're Invited!</h1>
    </div>
    <div style={{ padding: '30px', backgroundColor: '#ffffff' }}>
      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
        Dear {firstName || fullName || 'Valued Guest'},
      </p>
      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
        We're excited to invite you to our exclusive event! Join us for an evening of networking, insights, and celebration.
      </p>
      <div style={{ 
        border: '2px solid #EC4899', 
        borderRadius: '8px', 
        padding: '20px', 
        margin: '20px 0',
        backgroundColor: '#FDF2F8'
      }}>
        <h3 style={{ color: '#BE185D', margin: '0 0 15px 0' }}>📅 Event Details</h3>
        <p style={{ margin: '5px 0', color: '#BE185D' }}><strong>Date:</strong> March 15, 2024</p>
        <p style={{ margin: '5px 0', color: '#BE185D' }}><strong>Time:</strong> 6:00 PM - 9:00 PM</p>
        <p style={{ margin: '5px 0', color: '#BE185D' }}><strong>Location:</strong> Downtown Conference Center</p>
      </div>
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <a href="#" style={{ 
          backgroundColor: '#EC4899', 
          color: 'white', 
          padding: '12px 24px', 
          textDecoration: 'none', 
          borderRadius: '6px',
          display: 'inline-block',
          marginRight: '10px'
        }}>
          RSVP Yes
        </a>
        <a href="#" style={{ 
          backgroundColor: 'transparent', 
          color: '#EC4899', 
          padding: '12px 24px', 
          textDecoration: 'none', 
          borderRadius: '6px',
          border: '2px solid #EC4899',
          display: 'inline-block'
        }}>
          Can't Attend
        </a>
      </div>
    </div>
  </div>
);

// Follow-up Template
const FollowUpTemplate: React.FC<TemplateProps> = ({ firstName, fullName }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ backgroundColor: '#059669', color: 'white', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ margin: '0', fontSize: '24px' }}>Following Up</h1>
    </div>
    <div style={{ padding: '30px', backgroundColor: '#ffffff' }}>
      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
        Hello {firstName || fullName || 'there'},
      </p>
      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
        I wanted to follow up on our previous conversation and see if you had any questions or needed additional information.
      </p>
      <div style={{ 
        borderLeft: '4px solid #059669', 
        paddingLeft: '20px', 
        margin: '20px 0',
        backgroundColor: '#F0FDF4',
        padding: '15px 20px'
      }}>
        <p style={{ margin: '0', color: '#065F46', fontStyle: 'italic' }}>
          "We're here to help you succeed and want to ensure you have everything you need."
        </p>
      </div>
      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
        Please don't hesitate to reach out if you have any questions or would like to schedule a call to discuss further.
      </p>
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <a href="#" style={{ 
          backgroundColor: '#059669', 
          color: 'white', 
          padding: '12px 24px', 
          textDecoration: 'none', 
          borderRadius: '6px',
          display: 'inline-block'
        }}>
          Schedule a Call
        </a>
      </div>
    </div>
  </div>
);

// Thank You Template
const ThankYouTemplate: React.FC<TemplateProps> = ({ firstName, fullName }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ backgroundColor: '#DC2626', color: 'white', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ margin: '0', fontSize: '24px' }}>❤️ Thank You!</h1>
    </div>
    <div style={{ padding: '30px', backgroundColor: '#ffffff' }}>
      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
        Dear {firstName || fullName || 'Valued Customer'},
      </p>
      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
        We wanted to take a moment to express our heartfelt gratitude for your business and continued trust in our services.
      </p>
      <div style={{ 
        backgroundColor: '#FEF2F2', 
        border: '1px solid #FECACA',
        borderRadius: '8px',
        padding: '20px', 
        margin: '20px 0',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#DC2626', margin: '0 0 10px 0' }}>🌟 You're Amazing!</h3>
        <p style={{ margin: '0', color: '#991B1B' }}>
          Your support means the world to us and helps us continue to improve and grow.
        </p>
      </div>
      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
        As a token of our appreciation, we'd love to offer you exclusive access to our upcoming features and special promotions.
      </p>
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <a href="#" style={{ 
          backgroundColor: '#DC2626', 
          color: 'white', 
          padding: '12px 24px', 
          textDecoration: 'none', 
          borderRadius: '6px',
          display: 'inline-block'
        }}>
          Claim Your Reward
        </a>
      </div>
    </div>
  </div>
);

// Survey Template
const SurveyTemplate: React.FC<TemplateProps> = ({ firstName, fullName }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ backgroundColor: '#7C3AED', color: 'white', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ margin: '0', fontSize: '24px' }}>📊 Your Opinion Matters</h1>
    </div>
    <div style={{ padding: '30px', backgroundColor: '#ffffff' }}>
      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
        Hi {firstName || fullName || 'there'},
      </p>
      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
        We're always looking to improve our services, and your feedback is invaluable to us. Would you mind taking 2 minutes to share your thoughts?
      </p>
      <div style={{ 
        backgroundColor: '#F5F3FF', 
        border: '2px dashed #7C3AED',
        borderRadius: '8px',
        padding: '20px', 
        margin: '20px 0',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#5B21B6', margin: '0 0 10px 0' }}>⏱️ Quick Survey</h3>
        <p style={{ margin: '0 0 15px 0', color: '#5B21B6' }}>Just 3 questions • Takes 2 minutes</p>
        <div style={{ fontSize: '24px', margin: '10px 0' }}>⭐⭐⭐⭐⭐</div>
      </div>
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <a href="#" style={{ 
          backgroundColor: '#7C3AED', 
          color: 'white', 
          padding: '12px 24px', 
          textDecoration: 'none', 
          borderRadius: '6px',
          display: 'inline-block'
        }}>
          Take Survey
        </a>
      </div>
      <p style={{ fontSize: '14px', color: '#6B7280', textAlign: 'center', margin: '20px 0 0 0' }}>
        As a thank you, you'll be entered to win a $100 gift card!
      </p>
    </div>
  </div>
);

// Abandoned Cart Template
const AbandonedCartTemplate: React.FC<TemplateProps> = ({ firstName, fullName }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ backgroundColor: '#F59E0B', color: 'white', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ margin: '0', fontSize: '24px' }}>🛒 Don't Forget Your Items!</h1>
    </div>
    <div style={{ padding: '30px', backgroundColor: '#ffffff' }}>
      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
        Hi {firstName || fullName || 'there'},
      </p>
      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
        We noticed you left some great items in your cart. Don't worry, we've saved them for you!
      </p>
      <div style={{ 
        backgroundColor: '#FFFBEB', 
        border: '1px solid #FDE68A',
        borderRadius: '8px',
        padding: '20px', 
        margin: '20px 0'
      }}>
        <h3 style={{ color: '#92400E', margin: '0 0 15px 0' }}>🎁 Your Saved Items</h3>
        <div style={{ borderBottom: '1px solid #FDE68A', paddingBottom: '10px', marginBottom: '10px' }}>
          <p style={{ margin: '5px 0', color: '#92400E' }}>• Premium Product A - $49.99</p>
          <p style={{ margin: '5px 0', color: '#92400E' }}>• Essential Service B - $29.99</p>
        </div>
        <p style={{ margin: '10px 0 0 0', fontWeight: 'bold', color: '#92400E' }}>Total: $79.98</p>
      </div>
      <div style={{ 
        backgroundColor: '#FEF3C7', 
        border: '2px dashed #F59E0B', 
        padding: '15px', 
        textAlign: 'center',
        margin: '20px 0',
        borderRadius: '8px'
      }}>
        <p style={{ margin: '0', color: '#92400E', fontWeight: 'bold' }}>
          🏃‍♂️ Complete your purchase in the next 24 hours and get 10% OFF!
        </p>
      </div>
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <a href="#" style={{ 
          backgroundColor: '#F59E0B', 
          color: 'white', 
          padding: '12px 24px', 
          textDecoration: 'none', 
          borderRadius: '6px',
          display: 'inline-block'
        }}>
          Complete Purchase
        </a>
      </div>
    </div>
  </div>
);

/**
 * Available email templates configuration
 */
export const emailTemplates: EmailTemplate[] = [
  {
    id: 'welcome',
    name: 'Welcome Email',
    subject: 'Welcome to Our Community!',
    component: WelcomeTemplate,
    preview: 'A warm welcome message for new subscribers with a call-to-action button.',
    defaultContent: {
      subject: 'Welcome to Our Community!',
      heading: 'Welcome to Our Community!',
      mainText: 'Thank you for joining our community! We\'re excited to have you on board and look forward to sharing valuable insights and updates with you.',
      callToActionText: 'Get Started',
      callToActionUrl: '#'
    }
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    subject: 'Monthly Newsletter - Latest Updates',
    component: NewsletterTemplate,
    preview: 'A professional newsletter template for regular updates and announcements.',
    defaultContent: {
      subject: 'Monthly Newsletter - Latest Updates',
      heading: 'Monthly Newsletter',
      mainText: 'Here\'s what\'s been happening this month and what\'s coming up next.'
    }
  },
  {
    id: 'promotional',
    name: 'Promotional Offer',
    subject: 'Special Offer Just for You!',
    component: PromotionalTemplate,
    preview: 'An eye-catching promotional template with discount codes and special offers.',
    defaultContent: {
      subject: 'Special Offer Just for You!',
      heading: 'Special Offer Just for You!',
      mainText: 'We have an exclusive offer that we think you\'ll love. Don\'t miss out on this limited-time opportunity!',
      callToActionText: 'Use code: SAVE20',
      callToActionUrl: '#'
    }
  },
  {
    id: 'product-launch',
    name: 'Product Launch',
    subject: 'Introducing Our Latest Innovation!',
    component: ProductLaunchTemplate,
    preview: 'Announce new products or features with an engaging launch template.'
  },
  {
    id: 'event-invitation',
    name: 'Event Invitation',
    subject: 'You\'re Invited to Our Exclusive Event',
    component: EventInvitationTemplate,
    preview: 'Professional event invitation with RSVP functionality and event details.'
  },
  {
    id: 'follow-up',
    name: 'Follow-up Email',
    subject: 'Following Up on Our Previous Conversation',
    component: FollowUpTemplate,
    preview: 'A gentle follow-up template for maintaining customer relationships.'
  },
  {
    id: 'thank-you',
    name: 'Thank You',
    subject: 'Thank You for Your Business!',
    component: ThankYouTemplate,
    preview: 'Express gratitude to customers with a heartfelt thank you message.'
  },
  {
    id: 'survey-feedback',
    name: 'Survey & Feedback',
    subject: 'We Value Your Opinion - Quick Survey',
    component: SurveyTemplate,
    preview: 'Collect customer feedback with an engaging survey invitation template.'
  },
  {
    id: 'abandoned-cart',
    name: 'Abandoned Cart',
    subject: 'Don\'t Forget Your Items!',
    component: AbandonedCartTemplate,
    preview: 'Recover lost sales with a friendly cart abandonment reminder.'
  }
];