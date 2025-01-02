"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ArchivePage from "@/components/ArchivePage";
import { FilterProvider } from "../../context/FilterContext";

const queryClient = new QueryClient();

export default function Properties() {
  return (
    <FilterProvider>
      <QueryClientProvider client={queryClient}>
        <ArchivePage />
      </QueryClientProvider>
    </FilterProvider>
  );
}
