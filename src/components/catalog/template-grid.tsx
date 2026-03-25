import { TemplateCard } from "./template-card";
import type { MockTemplate } from "@/lib/mock-templates";

interface TemplateGridProps {
  templates: MockTemplate[];
}

export function TemplateGrid({ templates }: TemplateGridProps) {
  if (templates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-semibold text-navy/60">
          No templates found
        </p>
        <p className="mt-2 text-sm text-navy/40">
          Try selecting a different category
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          id={template.id}
          name={template.name}
          slug={template.slug}
          imageUrl={template.imageUrl}
          categoryName={template.categoryName}
          basePrice={template.basePrice}
          isFeatured={template.isFeatured}
          color={template.color}
        />
      ))}
    </div>
  );
}
