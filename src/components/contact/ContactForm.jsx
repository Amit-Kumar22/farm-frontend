"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";
import FormField from "../admin/fields/FormField";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import config from "@/config";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values) {
    setSubmitStatus(null);
    try {
      const response = await fetch(`${config.apiBaseUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setSubmitStatus({
        type: "success",
        message: data.message || "Thank you for contacting us! We'll get back to you shortly.",
        details: data.data?.confirmationSent 
          ? "A confirmation email has been sent to your email address." 
          : null,
      });
      reset();
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus({
        type: "error",
        message: error.message || "Failed to send message. Please try again or contact us directly.",
      });
    }
  }

  return (
    <div className="rounded-2xl border border-forest/10 bg-white p-8 shadow-lg">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-forest-deep">Send us a Message</h2>
        <p className="text-sm leading-relaxed text-muted">
          Fill out the form below and we'll get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {submitStatus && (
          <div
            className={`rounded-xl border px-5 py-4 text-sm ${
              submitStatus.type === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            <div className="flex items-start gap-3">
              {submitStatus.type === "success" ? (
                <svg className="h-5 w-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              <div>
                <p className="font-medium">{submitStatus.message}</p>
                {submitStatus.details && (
                  <p className="mt-1 text-xs opacity-90">{submitStatus.details}</p>
                )}
              </div>
            </div>
          </div>
        )}

        <FormField label="Your Name" error={errors.name?.message} required>
          <Input {...register("name")} placeholder="Name" />
        </FormField>

        <FormField label="Email Address" error={errors.email?.message} required>
          <Input {...register("email")} type="email" placeholder="Email Address" />
        </FormField>

        <FormField label="Phone Number" error={errors.phone?.message} required>
          <Input {...register("phone")} type="tel" placeholder="Phone Number" />
        </FormField>

        <FormField label="Subject" error={errors.subject?.message} required>
          <Input {...register("subject")} placeholder="e.g., Farm Tour Inquiry, Product Question" />
        </FormField>

        <FormField label="Message" error={errors.message?.message} required>
          <Textarea
            {...register("message")}
            rows={5}
            placeholder="Tell us how we can help you..."
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
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Send Message</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
