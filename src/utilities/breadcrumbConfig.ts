import React from "react";
import { HomeOutlined } from "@ant-design/icons";

export interface BreadcrumbRoute {
  path: string;
  breadcrumbName: string;
  icon?: React.ReactNode;
}

/**
 * Route configuration for breadcrumb generation
 * Maps route segments to human-readable names
 */
export const routeNameMap: Record<string, string> = {
  // Base routes
  dashboard: "Dashboard",
  registration: "Registration",
  members: "Members",
  "letter-entry": "Letter Entry",
  scrutiny: "Scrutiny",
  senctionOrder: "Sanction Order",
  "work-proposal": "Work Proposal",

  // Auth routes
  auth: "Auth",
  deo: "DEO",

  // CMO routes
  cmo: "CMO",
  reports: "Reports",

  // Work Management
  "work-management": "Work Management",
  "new-work-proposal": "New Work Proposal",

  // Add more route mappings as needed
};

/**
 * Generate breadcrumb items from pathname
 * @param pathname - Current location pathname
 * @returns Array of breadcrumb routes
 */

/**
 * Generate breadcrumb items from pathname
 * @param pathname - Current location pathname
 * @returns Array of breadcrumb routes
 */
export const generateBreadcrumbs = (pathname: string): BreadcrumbRoute[] => {
  const pathSegments = pathname?.split("/")?.filter(Boolean) || [];

  // Expected structure: /auth/<role>/dashboard/...
  // So:
  // pathSegments[0] = 'auth'
  // pathSegments[1] = role (e.g. 'deo', 'admin')
  // pathSegments[2] = 'dashboard'
  //@ts-ignore
  const [authSegment, roleSegment] = pathSegments;

  const basePath = `/auth/${roleSegment}`;
  const homePath = `${basePath}/dashboard`;
  const mainRoutes = ["dashboard", "registration", "members"];
  const currentMainRoute = pathSegments[2]; // The third segment is the main route

  const breadcrumbs: BreadcrumbRoute[] = [
    {
      path: homePath,
      breadcrumbName: "Home",
      icon: React.createElement(HomeOutlined),
    },
  ];

  if (
    currentMainRoute &&
    currentMainRoute !== "dashboard" &&
    mainRoutes.includes(currentMainRoute)
  ) {
    const breadcrumbName =
      routeNameMap[currentMainRoute] || formatSegmentName(currentMainRoute);

    breadcrumbs.push({
      path: `${basePath}/${currentMainRoute}`,
      breadcrumbName,
    });
  }

  const breadcrumbSegments = pathSegments.slice(3);

  let currentPath =
    currentMainRoute && currentMainRoute !== "dashboard"
      ? `${basePath}/${currentMainRoute}`
      : homePath;

  breadcrumbSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    const breadcrumbName = routeNameMap[segment] || formatSegmentName(segment);

    breadcrumbs.push({
      path: currentPath,
      breadcrumbName,
    });
  });

  return breadcrumbs;
};

/**
 * Format a route segment into a readable name
 * Converts kebab-case or snake_case to Title Case
 */
const formatSegmentName = (segment: string): string => {
  return segment
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
export const isBreadcrumbClickable = (
  index: number,
  total: number
): boolean => {
  return index < total - 1;
};
