import React from "react";

interface PageHeadProps {
  headTitle?: string;
  description?: string;
  keywords?: string;
}

// This component is now deprecated for App Router (Next.js 13+)
// Use metadata export in page.tsx instead
// Keeping for backwards compatibility but it does nothing
const PageHead: React.FC<PageHeadProps> = ({ 
  headTitle,
  description,
  keywords 
}) => {
  // In App Router, use metadata export instead of this component
  // This component is a no-op now to avoid performance issues
  return null;
};

export default PageHead;
