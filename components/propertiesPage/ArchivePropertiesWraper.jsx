"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ArchiveProperties from "./ArchiveProperties";
const queryClient = new QueryClient();
export default function ArchivePropertiesWraper() {
  return (
    <QueryClientProvider client={queryClient}>
      <ArchiveProperties />
    </QueryClientProvider>
  );
}
