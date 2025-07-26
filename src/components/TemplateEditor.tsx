import React, { useState, useEffect } from 'react';
import { Edit3, Eye, Save, X, RotateCcw } from 'lucide-react';
import { EmailTemplate, CustomizedTemplate } from '../types';

interface TemplateEditorProps {
  template: EmailTemplate;
  onSave: (customizedTemplate: CustomizedTemplate) => void;
  onCancel: () => void;
  initialCustomContent?: CustomizedTemplate['customContent'];
}

/**
 * Template editor component for customizing email content
 */
export const TemplateEditor: React.FC<TemplateEditorProps> = ({
  template,
  onSave,
  onCancel,
  initialCustomContent
}) => {
  const [customContent, setCustomContent] = useState(
    initialCustomContent || template.defaultContent
  );
  const [showPreview, setShowPreview] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Track changes
  useEffect(() => {
    const hasChanged = JSON.stringify(customContent) !== JSON.stringify(template.defaultContent);
    setHasChanges(hasChanged);
  }, [customContent, template.defaultContent]);

  /**
   * Updates a specific field in the custom content
   */
  const updateField = (field: keyof typeof customContent, value: string) => {
    setCustomContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Resets content to default template values
   */
  const resetToDefault = () => {
    setCustomContent(template.defaultContent);
  };

  /**
   * Saves the customized template
   */
  const handleSave = () => {
    const customizedTemplate: CustomizedTemplate = {
      ...template,
      customContent,
      subject: customContent.subject
    };
    onSave(customizedTemplate);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
          <Edit3 className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Customize Your Template</h2>
        <p className="text-gray-600">
          Edit the content of "{template.name}" to match your brand and message.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Editor Panel */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Edit Content</h3>
            <div className="flex space-x-2">
              <button
                onClick={resetToDefault}
                className="flex items-center px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                title="Reset to default"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </button>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                  showPreview 
                    ? 'bg-indigo-600 text-white' 
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Eye className="w-4 h-4 mr-1" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Subject Line */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject Line
              </label>
              <input
                type="text"
                value={customContent.subject}
                onChange={(e) => updateField('subject', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter email subject..."
              />
            </div>

            {/* Heading */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Heading
              </label>
              <input
                type="text"
                value={customContent.heading}
                onChange={(e) => updateField('heading', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter main heading..."
              />
            </div>

            {/* Main Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Message
              </label>
              <textarea
                value={customContent.mainText}
                onChange={(e) => updateField('mainText', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-vertical"
                placeholder="Enter your main message..."
              />
            </div>

            {/* Additional Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Text (Optional)
              </label>
              <textarea
                value={customContent.additionalText || ''}
                onChange={(e) => updateField('additionalText', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-vertical"
                placeholder="Add any additional information..."
              />
            </div>

            {/* Call to Action */}
            {template.defaultContent.callToActionText && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={customContent.callToActionText || ''}
                    onChange={(e) => updateField('callToActionText', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Button text..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button URL
                  </label>
                  <input
                    type="url"
                    value={customContent.callToActionUrl || ''}
                    onChange={(e) => updateField('callToActionUrl', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="https://..."
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
            <div className="text-sm text-gray-500">
              {hasChanges ? 'Modified' : 'Default'}
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-3 p-2 bg-white rounded border">
              <strong>Subject:</strong> {customContent.subject}
            </div>
            <div className="bg-white rounded border overflow-hidden">
              <template.component
                firstName="John"
                lastName="Doe"
                fullName="John Doe"
                customContent={customContent}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={onCancel}
          className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <X className="w-5 h-5 mr-2" />
          Cancel
        </button>

        <div className="flex space-x-3">
          {hasChanges && (
            <div className="flex items-center text-sm text-amber-600 mr-4">
              <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
              Unsaved changes
            </div>
          )}
          <button
            onClick={handleSave}
            className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Template
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Customization Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use personalization variables like {'{firstName}'} and {'{fullName}'} in your content</li>
          <li>• Keep subject lines under 50 characters for better mobile display</li>
          <li>• Make your call-to-action clear and compelling</li>
          <li>• Preview your changes before saving to see how they'll look</li>
        </ul>
      </div>
    </div>
  );
};