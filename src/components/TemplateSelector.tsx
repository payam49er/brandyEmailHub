import React, { useState } from 'react';
import { Mail, Eye, Edit3 } from 'lucide-react';
import { EmailTemplate, CustomizedTemplate } from '../types';
import { emailTemplates } from './EmailTemplates';
import { TemplateEditor } from './TemplateEditor';

interface TemplateSelectorProps {
  onTemplateSelected: (template: CustomizedTemplate) => void;
  selectedTemplate?: CustomizedTemplate | null;
}

/**
 * Component for selecting and previewing email templates
 */
export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  onTemplateSelected, 
  selectedTemplate 
}) => {
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);

  const handleTemplateSelect = (template: EmailTemplate) => {
    // Create a customized template with default content
    const customizedTemplate: CustomizedTemplate = {
      ...template,
      customContent: template.defaultContent
    };
    onTemplateSelected(customizedTemplate);
  };

  const openPreview = (template: EmailTemplate) => {
    setPreviewTemplate(template);
  };

  const closePreview = () => {
    setPreviewTemplate(null);
  };

  const openEditor = (template: EmailTemplate) => {
    setEditingTemplate(template);
  };

  const closeEditor = () => {
    setEditingTemplate(null);
  };

  const handleEditorSave = (customizedTemplate: CustomizedTemplate) => {
    onTemplateSelected(customizedTemplate);
    closeEditor();
  };

  // Show editor if editing
  if (editingTemplate) {
    return (
      <TemplateEditor
        template={editingTemplate}
        onSave={handleEditorSave}
        onCancel={closeEditor}
        initialCustomContent={
          selectedTemplate?.id === editingTemplate.id 
            ? selectedTemplate.customContent 
            : undefined
        }
      />
    );
  }
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <Mail className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Email Template</h2>
        <p className="text-gray-600">
          Select a professional template for your email campaign. You can preview and customize each template.
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {emailTemplates.map((template) => (
          <div
            key={template.id}
            className={`
              border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-lg
              ${selectedTemplate?.id === template.id 
                ? 'border-purple-500 bg-purple-50 shadow-md' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
            onClick={() => handleTemplateSelect(template)}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
              <div className="flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openPreview(template);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Preview template"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditor(template);
                  }}
                  className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                  title="Customize template"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{template.preview}</p>
            
            <div className="bg-gray-100 rounded p-3 mb-4">
              <p className="text-xs text-gray-500 mb-1">Subject Line:</p>
              <p className="text-sm font-medium text-gray-800">
                {selectedTemplate?.id === template.id && selectedTemplate.customContent.subject !== template.subject
                  ? selectedTemplate.customContent.subject
                  : template.subject
                }
              </p>
            </div>

            {selectedTemplate?.id === template.id && (
              <div className="flex items-center justify-between">
                <div className="flex items-center text-purple-600 text-sm font-medium">
                <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                Selected
                </div>
                {selectedTemplate.customContent.subject !== template.defaultContent.subject && (
                  <div className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                    Customized
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Selected Template Summary */}
      {selectedTemplate && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">Selected Template</h3>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-purple-800 font-medium">{selectedTemplate.name}</p>
              <p className="text-purple-600 text-sm">{selectedTemplate.preview}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => openPreview(selectedTemplate)}
                className="flex items-center px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </button>
              <button
                onClick={() => openEditor(selectedTemplate)}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Customize
              </button>
            </div>
          </div>
          
          {/* Show customization status */}
          <div className="text-sm text-purple-700">
            <p><strong>Subject:</strong> {selectedTemplate.customContent.subject}</p>
            {selectedTemplate.customContent.subject !== selectedTemplate.defaultContent.subject && (
              <p className="text-purple-600 mt-1">✨ This template has been customized</p>
            )}
          </div>
        </div>
      )}

      {/* Template Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Preview: {previewTemplate.name}
              </h3>
              <button
                onClick={closePreview}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
              <div className="bg-gray-100 p-6 rounded-lg">
                <previewTemplate.component 
                  firstName="John"
                  lastName="Doe"
                  fullName="John Doe"
                  customContent={
                    selectedTemplate?.id === previewTemplate.id 
                      ? selectedTemplate.customContent 
                      : previewTemplate.defaultContent
                  }
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-6 border-t bg-gray-50">
              <div className="text-sm text-gray-600">
                <p><strong>Subject:</strong> {
                  selectedTemplate?.id === previewTemplate.id 
                    ? selectedTemplate.customContent.subject 
                    : previewTemplate.subject
                }</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    closePreview();
                    openEditor(previewTemplate);
                  }}
                  className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  Customize
                </button>
                <button
                  onClick={closePreview}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleTemplateSelect(previewTemplate);
                    closePreview();
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Select This Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};