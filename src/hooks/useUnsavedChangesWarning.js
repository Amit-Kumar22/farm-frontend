"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/**
 * Hook to warn users about unsaved changes when navigating away
 * @param {boolean} isDirty - Whether the form has unsaved changes
 * @param {string} message - Warning message to display
 */
export function useUnsavedChangesWarning(isDirty, message = "You have unsaved changes. Are you sure you want to leave?") {
  const router = useRouter();
  
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty, message]);

  return isDirty;
}

/**
 * Show confirmation dialog before navigation if form is dirty
 * @param {boolean} isDirty - Whether the form has unsaved changes
 * @param {Function} onConfirm - Callback to execute after confirmation
 */
export function confirmNavigation(isDirty, onConfirm) {
  if (isDirty) {
    const confirmed = window.confirm(
      "You have unsaved changes. Are you sure you want to leave? All unsaved changes will be lost."
    );
    if (confirmed) {
      onConfirm();
    }
  } else {
    onConfirm();
  }
}
