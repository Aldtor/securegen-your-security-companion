import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Security Blog | SecureGen" },
      { name: "description", content: "Articles on password security, cybersecurity, privacy, authentication and online safety." },
      { property: "og:title", content: "Security Blog | SecureGen" },
      { property: "og:description", content: "Practical guides on password and account security." },
      { property: "og:url", content: "/blog" },
    ],
  }),
  component: () => <Outlet />,
});