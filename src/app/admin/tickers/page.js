"use client";

import ResourceListPage from "@/components/admin/ResourceListPage";
import { newsTickerApi } from "@/lib/api/newsTicker";
import { Eye, EyeOff } from "lucide-react";

export default function NewsTickerListPage() {
  return (
    <ResourceListPage
      title="News Ticker"
      queryKey="admin-news-ticker"
      fetchList={() => newsTickerApi.listAll()}
      deleteItem={(id) => newsTickerApi.delete(id)}
      createHref="/admin/tickers/new"
      editHref={(id) => `/admin/tickers/${id}`}
      columns={[
        { 
          key: "text", 
          label: "Text",
          render: (item) => (
            <div className="max-w-md">
              <span className="font-medium">{item.text}</span>
            </div>
          )
        },
        { 
          key: "order", 
          label: "Order",
          render: (item) => (
            <span className="text-muted">{item.order}</span>
          )
        },
        { 
          key: "isActive", 
          label: "Status",
          render: (item) => (
            <div className="flex items-center gap-2">
              {item.isActive ? (
                <>
                  <Eye size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-green-600">Active</span>
                </>
              ) : (
                <>
                  <EyeOff size={16} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-400">Inactive</span>
                </>
              )}
            </div>
          )
        },
      ]}
    />
  );
}
