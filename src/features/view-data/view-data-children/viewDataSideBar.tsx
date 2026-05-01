import { ChevronRight, Layers } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import type { Section, ViewDataApiResponse } from "@/types";

export default function ViewDataSideBar({ document, activeSectionIndex, onSectionClick, isLoading }: { document?: ViewDataApiResponse | null, activeSectionIndex: number, onSectionClick: (index: number) => void, isLoading?: boolean }) {
    const sections = document?.sections || [];

    return (
        <SidebarProvider className="w-auto h-full min-h-0 flex-none">
            <Sidebar className="w-80 border-r border-gray-200" collapsible="none">
                <SidebarHeader className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Layers size={14} /> Extracted Sections
                    </h3>
                </SidebarHeader>
                <SidebarContent className="p-4 custom-scrollbar">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu className="space-y-1">
                                {isLoading ? (
                                    Array.from({ length: 6 }).map((_, idx) => (
                                        <SidebarMenuItem key={idx}>
                                            <Skeleton className="w-full h-[48px] rounded-xl bg-gray-200/60" />
                                        </SidebarMenuItem>
                                    ))
                                ) : sections.map((section: Section, idx: number) => (
                                    <SidebarMenuItem key={section.section_name || idx}>
                                        <SidebarMenuButton
                                            onClick={() => onSectionClick(idx)}
                                            isActive={activeSectionIndex === idx}
                                            className={`w-full flex items-center justify-between p-3.5 rounded-xl text-sm font-bold transition-all text-left h-auto ${
                                                activeSectionIndex === idx
                                                    ? 'bg-blue-600 text-white shadow-md translate-x-1 hover:bg-blue-600 hover:text-white'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            <span>{section.section_name}</span>
                                            {activeSectionIndex === idx && <ChevronRight size={16} />}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    );
}