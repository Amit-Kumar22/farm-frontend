"use client";

import Button from "@/components/ui/Button";

/**
 * Reusable form action buttons component
 * Provides consistent Cancel and Save/Update buttons for all forms
 */
export default function FormActions({
  onCancel,
  isSubmitting = false,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  showCancel = true,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {showCancel && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {cancelLabel}
        </Button>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="min-w-[120px]"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
    </div>
  );
}
