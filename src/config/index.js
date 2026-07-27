const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5006";

const config = {
  siteName: "MainFarm",
  domain: "mainfarm.org",

  // Backend API URL
  apiBaseUrl: `${API_BASE_URL}/api`,

  // Base URL for uploaded images/files
  uploadsBaseUrl: API_BASE_URL,

  // Authentication
  cookieName: "mainfarm_token",

  // Pagination
  pageSize: 10,

  // Navigation
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Businesses", href: "/businesses" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
  ],
};

export default config;