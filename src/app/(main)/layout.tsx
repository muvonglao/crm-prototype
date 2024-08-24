import { Sidebar } from "../_components/dashboard/side-bar";
import { Header } from "../_components/dashboard/header";
import { ProgressCard } from "../_components/dashboard/progress-card";
import { CustomerTable } from "../_components/dashboard/customer-table";
import { DetailCard } from "../_components/dashboard/detail-card";
import { HydrateClient } from "~/trpc/server";
import { auth } from "~/server/auth";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  const user = session?.user;

  return (
    <HydrateClient>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
            <div className="grid h-full auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              {/* <ProgressCard /> */}
              {/* <CustomerTable user={user} /> */}
              {children}
            </div>
            {/* <DetailCard /> */}
          </main>
        </div>
      </div>
    </HydrateClient>
  );
}
