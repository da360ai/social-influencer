import { createFileRoute } from "@tanstack/react-router";
import { WorkshopPage } from "@/components/workshop-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Earn From Your Influence | Bangalore Workshop" },
      {
        name: "description",
        content:
          "Join Digital Academy 360's 3-hour offline influencer income workshop in Bangalore for ₹79.",
      },
      { property: "og:title", content: "Earn From Your Influence — ₹79 Workshop" },
      {
        property: "og:description",
        content: "Build your first creator monetisation roadmap in this live Bangalore workshop.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkshopPage,
});
