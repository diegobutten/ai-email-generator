import { EmailGeneratorProvider } from "@/components/providers/email-generator-provider";
import { HeroSection } from "@/components/features/hero-section";
import { GeneratorSection } from "@/components/features/generator-section";
import { TemplatesSection } from "@/components/features/templates-section";
import { HistorySection } from "@/components/features/history-section";
import { FeaturesSection } from "@/components/features/features-section";

export default function HomePage() {
  return (
    <EmailGeneratorProvider>
      <HeroSection />
      <GeneratorSection />
      <TemplatesSection />
      <HistorySection />
      <FeaturesSection />
    </EmailGeneratorProvider>
  );
}
