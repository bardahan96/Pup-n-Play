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

  const value = useMemo(
    () => ({
      errorsByForm,
      setFieldError,
      clearFieldError,
      clearFormErrors,
      getFieldError,
    }),
    [errorsByForm],
  );

  return <ErrorHandlingContext.Provider value={value}>{children}</ErrorHandlingContext.Provider>;
}