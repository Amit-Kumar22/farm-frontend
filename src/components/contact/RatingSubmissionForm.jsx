"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, Send } from "lucide-react";
import FormField from "../admin/fields/FormField";
import { Input, Textarea } from "@/components/ui/Input";
import { apiFetch } from "@/lib/apiClient";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required").optional().or(z.literal("")),
  designation: z.string().optional(),
  rating: z.number().min(1, "Please select a rating").max(5),
  message: z.string().min(10, "Review message must be at least 10 characters"),
});

export default function RatingSubmissionForm() {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      rating: 0,
    },
  });

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    setValue("rating", rating, { shouldValidate: true });
  };

  async function onSubmit(values) {
    setSubmitStatus(null);
    try {
      await apiFetch("/testimonials/submit", {
        method: "POST",
        body: values,
      });

      setSubmitStatus({
        type: "success",
        message: "Thank you for your feedback! Your rating will be reviewed shortly.",
      });
      reset();
      setSelectedRating(0);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error.message || "Failed to submit rating. Please try again.",
      });
    }
  }

  return (
    <div className="rounded-2xl border border-forest/10 bg-white p-8 shadow-lg">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-forest-deep">Share Your Experience</h2>
        <p className="text-sm leading-relaxed text-muted">
          We'd love to hear your feedback! Your review helps us improve our services.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {submitStatus && (
          <div
            className={`rounded-xl border px-5 py-4 text-sm font-medium ${
              submitStatus.type === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            <div className="flex items-center gap-2">
              {submitStatus.type === "success" ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              <span>{submitStatus.message}</span>
            </div>
          </div>
        )}

        <FormField label="Your Name" error={errors.name?.message} required>
          <Input {...register("name")} placeholder="Enter your name" />
        </FormField>

        <FormField label="Email Address" error={errors.email?.message}>
          <Input {...register("email")} type="email" placeholder="your@email.com (optional)" />
        </FormField>

        <FormField label="Your Role/Position" error={errors.designation?.message}>
          <Input {...register("designation")} placeholder="e.g., Customer, Partner (optional)" />
        </FormField>

        {/* Star Rating */}
        <div>
          <FormField label="Your Rating" error={errors.rating?.message} required>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => {
                const starValue = i + 1;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleRatingClick(starValue)}
                    onMouseEnter={() => setHoverRating(starValue)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      size={32}
                      fill={
                        starValue <= (hoverRating || selectedRating)
                          ? "#D4AF37"
                          : "none"
                      }
                      className={
                        starValue <= (hoverRating || selectedRating)
                          ? "text-[#D4AF37]"
                          : "text-gray-300"
                      }
                      strokeWidth={1.5}
                    />
                  </button>
                );
              })}
              {selectedRating > 0 && (
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {selectedRating} / 5
                </span>
              )}
            </div>
          </FormField>
        </div>

        <FormField label="Your Review" error={errors.message?.message} required>
          <Textarea
            {...register("message")}
            rows={5}
            placeholder="Tell us about your experience..."
          />
        </FormField>

        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted">
            <span className="text-forest">*</span> Required fields
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-forest to-forest-deep px-8 py-3.5 font-semibold text-cream shadow-lg shadow-forest/20 transition-all hover:shadow-xl hover:shadow-forest/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream border-t-transparent" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Submit Review</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
