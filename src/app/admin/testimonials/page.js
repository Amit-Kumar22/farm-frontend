"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { testimonialsApi } from "@/lib/api/testimonials";
import { Star, Trash2, CheckCircle, Clock, Mail, Calendar, User, Check, AlertCircle } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  confirmed: "bg-green-100 text-green-800 border-green-300",
  deleted: "bg-red-100 text-red-800 border-red-300",
};

const statusIcons = {
  pending: Clock,
  confirmed: CheckCircle,
  deleted: Trash2,
};

export default function RatingsReviewPage() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [notification, setNotification] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: () => testimonialsApi.adminList(),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => testimonialsApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-testimonials"]);
      showNotification("success", "Rating status updated successfully");
    },
    onError: () => {
      showNotification("error", "Failed to update rating status");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => testimonialsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-testimonials"]);
      showNotification("success", "Rating deleted permanently");
      setDeleteConfirm(null);
    },
    onError: () => {
      showNotification("error", "Failed to delete rating");
    },
  });

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const testimonials = data?.data || [];
  
  const filteredTestimonials = testimonials.filter((t) => {
    if (statusFilter === "all") return true;
    return t.status === statusFilter;
  });

  const stats = {
    total: testimonials.length,
    pending: testimonials.filter((t) => t.status === "pending").length,
    confirmed: testimonials.filter((t) => t.status === "confirmed").length,
    deleted: testimonials.filter((t) => t.status === "deleted").length,
  };

  const handleStatusChange = (id, newStatus) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-forest border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed right-4 top-4 z-50 flex items-center gap-3 rounded-lg border px-6 py-4 shadow-lg transition-all ${
            notification.type === "success"
              ? "border-green-300 bg-green-50 text-green-800"
              : "border-red-300 bg-red-50 text-red-800"
          }`}
        >
          {notification.type === "success" ? (
            <Check className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Ratings Review</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage user-submitted ratings and reviews. Only confirmed ratings are displayed on the website.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="text-sm font-medium text-gray-600">Total Ratings</div>
          <div className="mt-1 text-2xl font-bold text-gray-900">{stats.total}</div>
        </div>
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <div className="text-sm font-medium text-yellow-800">Pending Review</div>
          <div className="mt-1 text-2xl font-bold text-yellow-900">{stats.pending}</div>
        </div>
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="text-sm font-medium text-green-800">Confirmed</div>
          <div className="mt-1 text-2xl font-bold text-green-900">{stats.confirmed}</div>
        </div>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="text-sm font-medium text-red-800">Deleted</div>
          <div className="mt-1 text-2xl font-bold text-red-900">{stats.deleted}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Filter by:</span>
        {["all", "pending", "confirmed", "deleted"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              statusFilter === status
                ? "bg-forest text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Ratings List */}
      <div className="space-y-4">
        {filteredTestimonials.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
            <p className="text-gray-500">No ratings found for this filter.</p>
          </div>
        ) : (
          filteredTestimonials.map((testimonial) => {
            const StatusIcon = statusIcons[testimonial.status];
            return (
              <div
                key={testimonial._id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  {/* Left Side - Rating Details */}
                  <div className="flex-1 space-y-4">
                    {/* User Info */}
                    <div className="flex items-start gap-4">
                      {testimonial.avatar ? (
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="h-12 w-12 rounded-full border-2 border-gray-200 object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                          <User size={20} className="text-gray-500" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${statusColors[testimonial.status]}`}>
                            <StatusIcon size={12} />
                            {testimonial.status}
                          </span>
                        </div>
                        {testimonial.designation && (
                          <p className="text-sm text-gray-600">{testimonial.designation}</p>
                        )}
                        {testimonial.email && (
                          <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                            <Mail size={14} />
                            {testimonial.email}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          fill={i < testimonial.rating ? "#D4AF37" : "none"}
                          className={i < testimonial.rating ? "text-[#D4AF37]" : "text-gray-300"}
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {testimonial.rating} / 5
                      </span>
                    </div>

                    {/* Review Message */}
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm leading-relaxed text-gray-700">"{testimonial.message}"</p>
                    </div>

                    {/* Submission Date */}
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar size={14} />
                      Submitted on {new Date(testimonial.createdAt).toLocaleString()}
                    </div>
                  </div>

                  {/* Right Side - Actions */}
                  <div className="flex flex-col gap-2 lg:w-48">
                    <label className="text-xs font-medium text-gray-700">Actions</label>
                    <select
                      value={testimonial.status}
                      onChange={(e) => handleStatusChange(testimonial._id, e.target.value)}
                      className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
                    >
                      <option value="pending">⏳ Pending</option>
                      <option value="confirmed">✓ Confirm</option>
                      <option value="deleted">🗑️ Mark as Deleted</option>
                    </select>
                    
                    <button
                      onClick={() => setDeleteConfirm(testimonial)}
                      className="flex items-center justify-center gap-2 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                      Delete Permanently
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <ConfirmDialog
          title="Delete Rating Permanently?"
          message={`Are you sure you want to permanently delete the rating from "${deleteConfirm.name}"? This action cannot be undone.`}
          confirmLabel="Delete Permanently"
          onConfirm={() => handleDelete(deleteConfirm._id)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
}
