import { TopbarMenu } from "@/components/ui/topbar-menu";

export default function PublicLayout({ children }) {
  return (
    <>
      <TopbarMenu />
      {children}
    </>
  );
}