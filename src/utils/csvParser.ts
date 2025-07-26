import Papa from 'papaparse';
import { Contact } from '../types';

/**
 * Utility functions for parsing CSV files and extracting contact information
 */

export interface CSVParseResult {
  contacts: Contact[];
  errors: string[];
}

/**
 * Parses a CSV file and extracts contact information
 * Supports various column formats for names and emails
 */
export const parseCSVFile = (file: File): Promise<CSVParseResult> => {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const contacts: Contact[] = [];
        const errors: string[] = [];

        results.data.forEach((row: any, index: number) => {
          try {
            const contact = extractContactFromRow(row, index + 1);
            if (contact) {
              contacts.push(contact);
            }
          } catch (error) {
            errors.push(`Row ${index + 1}: ${error instanceof Error ? error.message : 'Invalid data'}`);
          }
        });

        resolve({ contacts, errors });
      },
      error: (error) => {
        resolve({ contacts: [], errors: [error.message] });
      }
    });
  });
};

/**
 * Extracts contact information from a CSV row
 * Handles various column naming conventions
 */
const extractContactFromRow = (row: any, rowNumber: number): Contact | null => {
  const email = findEmailInRow(row);
  if (!email || !isValidEmail(email)) {
    throw new Error('Invalid or missing email address');
  }

  const { firstName, lastName, fullName } = extractNamesFromRow(row);
  
  if (!firstName && !lastName && !fullName) {
    throw new Error('No name information found');
  }

  return {
    id: `contact-${rowNumber}-${Date.now()}`,
    firstName: firstName || '',
    lastName: lastName || '',
    fullName: fullName || `${firstName} ${lastName}`.trim(),
    email
  };
};

/**
 * Finds email address in various possible column names
 */
const findEmailInRow = (row: any): string => {
  const emailFields = ['email', 'Email', 'EMAIL', 'email_address', 'Email Address', 'e-mail', 'E-mail'];
  
  for (const field of emailFields) {
    if (row[field] && typeof row[field] === 'string') {
      return row[field].trim();
    }
  }
  
  return '';
};

/**
 * Extracts name information from various possible column formats
 */
const extractNamesFromRow = (row: any) => {
  // Try to find first name
  const firstNameFields = ['firstName', 'first_name', 'First Name', 'fname', 'given_name'];
  let firstName = '';
  for (const field of firstNameFields) {
    if (row[field] && typeof row[field] === 'string') {
      firstName = row[field].trim();
      break;
    }
  }

  // Try to find last name
  const lastNameFields = ['lastName', 'last_name', 'Last Name', 'lname', 'surname', 'family_name'];
  let lastName = '';
  for (const field of lastNameFields) {
    if (row[field] && typeof row[field] === 'string') {
      lastName = row[field].trim();
      break;
    }
  }

  // Try to find full name
  const fullNameFields = ['fullName', 'full_name', 'Full Name', 'name', 'Name', 'contact_name'];
  let fullName = '';
  for (const field of fullNameFields) {
    if (row[field] && typeof row[field] === 'string') {
      fullName = row[field].trim();
      break;
    }
  }

  // If we have full name but not first/last, try to split
  if (fullName && !firstName && !lastName) {
    const nameParts = fullName.split(' ');
    if (nameParts.length >= 2) {
      firstName = nameParts[0];
      lastName = nameParts.slice(1).join(' ');
    }
  }

  return { firstName, lastName, fullName };
};

/**
 * Validates email address format
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates business email format and common business domains
 */
export const isValidBusinessEmail = (email: string): boolean => {
  if (!isValidEmail(email)) return false;
  
  // Exclude common personal email domains
  const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
  const domain = email.split('@')[1]?.toLowerCase();
  
  return !personalDomains.includes(domain);
};