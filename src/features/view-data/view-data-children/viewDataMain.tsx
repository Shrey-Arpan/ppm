import type { ViewDataApiResponse, Section, Field } from '@/types';
import { ExternalLink } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export default function ViewDataMain({
  data,
  activeSectionIndex,
  activeSection,
  isLoading,
}: {
  data?: ViewDataApiResponse | null;
  activeSectionIndex: number;
  activeSection?: Section | null;
  isLoading?: boolean;
}) {
  if (!isLoading && !activeSection) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center min-h-[400px] gap-2 flex-1">
        <p className="text-sm font-medium text-gray-500">No active section selected</p>
      </div>
    );
  }

  const sectionName = isLoading
    ? ''
    : activeSection?.section_name || (activeSection as any)?.title || 'Extracted Section';
  const fields = isLoading ? [] : activeSection?.fields || [];

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30">
      <div className="max-w-[98%] mx-auto animate-in slide-in-from-right-4 duration-300">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
            {isLoading ? (
              <>
                <Skeleton className="h-7 w-64 bg-gray-200" />
                <Skeleton className="h-4 w-32 bg-gray-200" />
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-900">{sectionName}</h3>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-tight">
                  {fields.length} Points Extracted
                </span>
              </>
            )}
          </div>

          <div className="overflow-x-auto">
            <Table className="w-full text-sm text-left">
              <TableHeader className="bg-gray-50/80 text-gray-500 uppercase text-[11px] font-bold tracking-wider">
                <TableRow>
                  {isLoading ? (
                    <>
                      <Skeleton className="h-4 w-32 bg-gray-200" />
                      <Skeleton className="h-4 w-32 bg-gray-200" />
                      <Skeleton className="h-4 w-32 bg-gray-200" />
                    </>
                  ) : (
                    <>
                      <TableHead className="px-8 py-4 w-1/4 h-auto font-bold text-gray-500">
                        Field Name
                      </TableHead>
                      <TableHead className="px-8 py-4 w-1/2 h-auto font-bold text-gray-500">
                        Extracted Value
                      </TableHead>
                      <TableHead className="px-8 py-4 h-auto font-bold text-gray-500">
                        Source Reference
                      </TableHead>
                    </>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, idx) => (
                      <TableRow key={idx} className="border-b border-gray-100">
                        <TableCell className="px-8 py-5">
                          <Skeleton className="h-5 w-3/4 bg-gray-200/60" />
                        </TableCell>
                        <TableCell className="px-8 py-5">
                          <Skeleton className="h-5 w-full bg-gray-200/60 mb-2" />
                          <Skeleton className="h-5 w-2/3 bg-gray-200/60" />
                        </TableCell>
                        <TableCell className="px-8 py-5">
                          <Skeleton className="h-4 w-1/2 bg-gray-200/60 mb-1.5" />
                          <Skeleton className="h-3 w-4/5 bg-gray-200/40" />
                        </TableCell>
                      </TableRow>
                    ))
                  : fields.map((field: Field, idx: number) => {
                      const fieldName = field.field_name || (field as any).name || 'N/A';
                      const fieldValue = field.field_value || (field as any).value;
                      const fieldSource =
                        field.citation_text ||
                        (field as any).source ||
                        (field.citation_pages?.length
                          ? `Pages: ${field.citation_pages.join(', ')}`
                          : 'No direct citation');

                      return (
                        <TableRow
                          key={idx}
                          className="hover:bg-blue-50/30 transition-colors group border-b border-gray-100"
                        >
                          <TableCell className="px-8 py-5 font-bold text-gray-700 whitespace-nowrap">
                            {fieldName}
                          </TableCell>
                          <TableCell className="px-8 py-5 text-gray-900 font-medium leading-relaxed">
                            {fieldValue || (
                              <span className="text-gray-300 italic font-normal">N/A</span>
                            )}
                          </TableCell>
                          <TableCell className="px-8 py-5 text-gray-500 italic whitespace-nowrap text-xs">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1.5 font-semibold text-gray-600">
                                <ExternalLink
                                  size={12}
                                  className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                                {fieldSource}
                              </div>
                              {/* Short Description Added Below Page/Section */}
                              <p className="text-[10px] text-gray-400 font-medium leading-tight ">
                                Extracted from primary disclosure text in the identified document
                                segment.
                              </p>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </div>
        </div>

        {!isLoading && data?.sections && (
          <div className="mt-8 flex items-center justify-center gap-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest py-4 border-t border-gray-200 border-dashed">
            <p>
              Section {activeSectionIndex + 1} of {data.sections.length}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
