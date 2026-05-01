import { Button, StatusBadge } from '@/components/ui';
import { ArrowLeft, Calendar, Table, Loader2 } from 'lucide-react';
import { useState } from 'react';
import type { ViewDataApiResponse } from '@/types';
import { downloadExcel } from '@/lib/utils';
import { toast } from 'sonner';

export default function ViewDataHeader({
  document,
  onBack,
  exportData,
}: {
  document: any;
  onBack: () => void;
  exportData: ViewDataApiResponse;
}) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportExcel = async () => {
    try {
      setIsExporting(true);

      const headers = ['Section Name', 'Field Name', 'Extracted Value', 'Source Reference'];
      const rows: (string | number | undefined | null)[][] = [];

      exportData.sections?.forEach((section) => {
        const sectionName = section.section_name || 'Extracted Section';
        section.fields?.forEach((field) => {
          const fieldName = field.field_name || (field as any).name || 'N/A';
          const fieldValue = field.field_value || (field as any).value || 'N/A';
          const fieldSource =
            field.citation_text ||
            (field as any).source ||
            (field.citation_pages?.length
              ? `Pages: ${field.citation_pages.join(', ')}`
              : 'No direct citation');

          rows.push([sectionName, fieldName, fieldValue, fieldSource]);
        });
      });

      downloadExcel(`${document.name || 'document'}_export`, headers, rows);
      toast.success('Data exported successfully.', { position: 'top-right' });
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export data. Please try again.', { position: 'top-right' });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-6 shrink-0">
      <div className="flex justify-between items-start mb-4">
        <Button
          variant="ghost"
          className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800 hover:bg-transparent transition-colors group"
          onClick={onBack}
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Document Listing
        </Button>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow-sm flex items-center gap-2"
          onClick={handleExportExcel}
          disabled={isExporting}
        >
          {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Table size={16} />}
          {isExporting ? 'Exporting...' : 'Export All to Excel'}
        </Button>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-1">{document.name}</h2>
        <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
          <span className="flex items-center">
            <Calendar size={14} className="mr-1 text-gray-400" /> {document.date}
          </span>
          <StatusBadge status={document.status} />
          <span className="text-gray-300">|</span>
          <span className="text-gray-600">PPM Structured Data Extraction</span>
        </div>
      </div>
    </div>
  );
}
