import JsonLd from "./JsonLd";
import { site } from "@/lib/site";

export default function Crumbs({ name, path }: { name: string; path: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name, item: `${site.url}${path}` },
        ],
      }}
    />
  );
}
