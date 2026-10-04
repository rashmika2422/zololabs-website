import "@/components/Home/home.css";
import Hero from "@/components/Home/Hero";
import Intro from "@/components/Home/Intro";
import Services from "@/components/Home/Services";
import WhyZoloLabs from "@/components/Home/WhyZoloLabs";
import SelectedWork from "@/components/Home/SelectedWork";
import Process from "@/components/Home/Process";
import { ContactCTA } from "@/components/ui/ContactCTA";

export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return <><Hero /><Intro /><Services /><SelectedWork /><WhyZoloLabs /><Process /><ContactCTA /></>;
}
