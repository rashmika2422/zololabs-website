import "@/components/home/home.css";
import Technology from "@/components/home/Technology";
import Hero from "@/components/home/Hero";
import Industries from "@/components/home/Industries";
import Process from "@/components/home/Process";
import Services from "@/components/home/Services";
import { ContactCTA } from "@/components/ui/ContactCTA";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Technology />
      <Industries />
      <Process />
      <div className="mx-auto w-full max-w-6xl px-6 pb-20">
        <ContactCTA />
      </div>
    </>
  );
}
