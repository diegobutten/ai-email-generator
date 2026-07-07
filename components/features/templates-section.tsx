import { templates } from "@/lib/mock-data";
import { TemplateCard } from "@/components/features/template-card";

export function TemplatesSection() {
  return (
    <section id="templates" className="scroll-mt-20 border-t border-border py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Start from a template
          </h2>
          <p className="mt-3 text-muted-foreground">
            Each one pre-fills the email type — just add your details and generate.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template, index) => (
            <TemplateCard key={template.id} template={template} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
