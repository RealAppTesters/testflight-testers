import { PortalPage } from "@/components/PortalPage";
export default async function Page(props: {
  params: Promise<{ section?: string[] }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  return <PortalPage {...props} admin />;
}
