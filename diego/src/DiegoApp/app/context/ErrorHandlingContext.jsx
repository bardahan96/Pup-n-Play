import { createContext, useMemo, useState } from 'react';

export const ErrorHandlingContext = createContext(null);

export function ErrorHandlingProvider({ children }) {
  const [errorsByForm, setErrorsByForm] = useState({});

  function setFieldError(formName, fieldName, message) {
    setErrorsByForm((prev) => ({
      ...prev,
      [formName]: {
        ...(prev[formName] || {}),
        [fieldName]: message,
      },
    }));
  }

  function clearFieldError(formName, fieldName) {
    setErrorsByForm((prev) => {
      const form = { ...(prev[formName] || {}) };
      delete form[fieldName];
      return { ...prev, [formName]: form };
    });
  }

  function clearFormErrors(formName) {
    setErrorsByForm((prev) => ({ ...prev, [formName]: {} }));
  }

  function getFieldError(formName, fieldName) {
    return errorsByForm?.[formName]?.[fieldName] || '';
  }

  // Base validator used by both login and signup
  function runValidation(formName, values, rules) {
    clearFormErrors(formName);
    let valid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    Object.keys(rules).forEach((field) => {
      const { required, minLength, pattern, messages = {} } = rules[field];
      const value = (values[field] ?? '').toString();
      if (required && !value.trim()) {
        setFieldError(formName, field, messages.required || 'This field is required');
        valid = false;
        return;
      }
      if (typeof minLength === 'number' && value.length < minLength) {
        setFieldError(
          formName,
          field,
          messages.minLength || `Must be at least ${minLength} characters`,
        );
        valid = false;
      }
      const regex = pattern === 'email' ? emailPattern : pattern;
      if (regex && value && !(regex instanceof RegExp ? regex.test(value) : true)) {
        setFieldError(formName, field, messages.pattern || 'Invalid value');
        valid = false;
      }
    });
    return valid;
  }

  function validateLogin({ email = '', password = '' }) {
    return runValidation(
      'login',
      { email, password },
      {
        email: {
          required: true,
          pattern: 'email',
          messages: { required: 'Email is required', pattern: 'Please enter a valid email address' },
        },
        password: {
          required: true,
          minLength: 6,
          messages: { required: 'Password is required', minLength: 'Password must be at least 6 characters' },
        },
      },
    );
  }

  function validateSignup({ username = '', email = '', password = '' }) {
    return runValidation(
      'signup',
      { username, email, password },
      {
        username: {
          required: true,
          minLength: 7,
          messages: { required: 'Username is required', minLength: 'Username must be at least 7 characters' },
        },
        email: {
          required: true,
          pattern: 'email',
          messages: { required: 'Email is required', pattern: 'Please enter a valid email address' },
        },
        password: {
          required: true,
          minLength: 7,
          messages: { required: 'Password is required', minLength: 'Password must be at least 7 characters' },
        },
      },
    );
  }

  const value = useMemo(() => ({
    errorsByForm,
    setFieldError,
    clearFieldError,
    clearFormErrors,
    getFieldError,
    validateLogin,
    validateSignup,
  }), [errorsByForm]);

  return <ErrorHandlingContext.Provider value={value}>{children}</ErrorHandlingContext.Provider>;
}