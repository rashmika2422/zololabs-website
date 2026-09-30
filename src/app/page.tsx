import Hero from "@/components/Home/Hero";
import Industries from "@/components/Home/Industries";
import Process from "@/components/Home/Process";
import Services from "@/components/Home/Services";
import { ContactCTA } from "@/components/ui/ContactCTA";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Industries />
      <Process />
      <div className="mx-auto w-full max-w-6xl px-6 pb-20">
        <ContactCTA />
      </div>
    </>
  );
}
