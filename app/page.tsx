import { AppShell } from "@/components/layout/AppShell";
import { Navbar } from "@/components/layout/Navbar";
import { Tabs } from "@/components/layout/Tabs";

export default function Home() {
  return (
    <AppShell>
      <Navbar />
      <Tabs />
    </AppShell>
  );
}
