import React, { useState, useCallback } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Contact } from '../types';
import { parseCSVFile } from '../utils/csvParser';

interface CSVUploadProps {
  onContactsUploaded: (contacts: Contact[]) => void;
  maxContacts?: number;
}

/**
 * CSV file upload component with drag-and-drop functionality and contact parsing
 */
export const CSVUpload: React.FC<CSVUploadProps> = ({ onContactsUploaded, maxContacts = 1000 }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [parseErrors, setParseErrors] = useState<string[]>([]);

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setUploadError('Please upload a CSV file');
      return;
    }

    setIsProcessing(true);
    setUploadError(null);
    setUploadSuccess(null);
    setParseErrors([]);

    try {
      const result = await parseCSVFile(file);
      
      if (result.contacts.length === 0) {
        setUploadError('No valid contacts found in the CSV file');
        setIsProcessing(false);
        return;
      }

      if (result.contacts.length > maxContacts) {
        setUploadError(`Too many contacts. Maximum allowed is ${maxContacts}, but found ${result.contacts.length}`);
        setIsProcessing(false);
        return;
      }

      setContacts(result.contacts);
      setParseErrors(result.errors);
      setUploadSuccess(`Successfully parsed ${result.contacts.length} contacts from the CSV file`);
      
      // Notify parent component
      onContactsUploaded(result.contacts);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Failed to parse CSV file');
    } finally {
      setIsProcessing(false);
    }
  }, [onContactsUploaded, maxContacts]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const clearContacts = () => {
    setContacts([]);
    setUploadSuccess(null);
    setParseErrors([]);
    onContactsUploaded([]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
          <Upload className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Contacts</h2>
        <p className="text-gray-600">
          Upload a CSV file containing your contacts. We'll automatically detect names and email addresses.
        </p>
      </div>

      {/* File Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${isDragOver ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onClick={() => !isProcessing && document.getElementById('csvFileInput')?.click()}
      >
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          {isProcessing ? 'Processing...' : 'Drop your CSV file here or click to browse'}
        </p>
        <p className="text-gray-500 mb-4">
          Maximum {maxContacts.toLocaleString()} contacts per upload
        </p>
        
        <input
          id="csvFileInput"
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isProcessing}
        />
      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-700">{uploadError}</p>
          </div>
        </div>
      )}

      {/* Success Message */}
      {uploadSuccess && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <p className="text-green-700">{uploadSuccess}</p>
            </div>
            <button
              onClick={clearContacts}
              className="text-green-600 hover:text-green-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Parse Errors */}
      {parseErrors.length > 0 && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" />
            <div>
              <p className="text-yellow-700 font-medium mb-2">
                Some rows had issues ({parseErrors.length} errors):
              </p>
              <ul className="text-sm text-yellow-600 space-y-1 max-h-32 overflow-y-auto">
                {parseErrors.slice(0, 10).map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
                {parseErrors.length > 10 && (
                  <li className="font-medium">...and {parseErrors.length - 10} more</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Contact Preview */}
      {contacts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Contacts Preview ({contacts.length} total)
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contacts.slice(0, 5).map((contact) => (
                    <tr key={contact.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {contact.fullName || `${contact.firstName} ${contact.lastName}`.trim()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {contact.email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {contacts.length > 5 && (
              <div className="px-6 py-3 bg-gray-50 text-center text-sm text-gray-500">
                And {contacts.length - 5} more contacts...
              </div>
            )}
          </div>
        </div>
      )}

      {/* CSV Format Help */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-3">CSV Format Requirements</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-medium mb-2">Supported Column Names:</p>
            <ul className="space-y-1">
              <li>• <code className="bg-gray-200 px-1 rounded">email</code>, <code className="bg-gray-200 px-1 rounded">Email</code>, <code className="bg-gray-200 px-1 rounded">email_address</code></li>
              <li>• <code className="bg-gray-200 px-1 rounded">firstName</code>, <code className="bg-gray-200 px-1 rounded">first_name</code>, <code className="bg-gray-200 px-1 rounded">First Name</code></li>
              <li>• <code className="bg-gray-200 px-1 rounded">lastName</code>, <code className="bg-gray-200 px-1 rounded">last_name</code>, <code className="bg-gray-200 px-1 rounded">Last Name</code></li>
              <li>• <code className="bg-gray-200 px-1 rounded">fullName</code>, <code className="bg-gray-200 px-1 rounded">full_name</code>, <code className="bg-gray-200 px-1 rounded">name</code></li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-2">Example CSV Structure:</p>
            <pre className="bg-white p-2 rounded text-xs border">
{`firstName,lastName,email
John,Doe,john@company.com
Jane,Smith,jane@business.co`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};