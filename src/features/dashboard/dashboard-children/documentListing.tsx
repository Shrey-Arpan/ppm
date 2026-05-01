import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Modal,
  StatusBadge,
} from '@/components/ui';
import { MOCK_DOCUMENTS } from '@/hooks/test';
import {
  Calendar,
  ChevronRight,
  FileDown,
  FileText,
  RefreshCw,
  RotateCw,
  Search,
  Zap,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/AppRoutes';

let cachedState = {
  search: '',
  statusFilter: 'All',
  dateFilter: '',
  currentPage: 1,
};

export default function DocumentListing() {
  const [search, setSearch] = useState(cachedState.search);
  const [statusFilter, setStatusFilter] = useState(cachedState.statusFilter);
  const [dateFilter, setDateFilter] = useState(cachedState.dateFilter);
  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);
  const [summaryDoc, setSummaryDoc] = useState(null);
  const navigate = useNavigate();

  // Pagination & Filtering Logic
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || doc.status === statusFilter;
    const matchesDate = !dateFilter || doc.date === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(cachedState.currentPage);

  useEffect(() => {
    cachedState = {
      search,
      statusFilter,
      dateFilter,
      currentPage,
    };
  }, [search, statusFilter, dateFilter, currentPage]);

  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage);
  const paginatedDocs = filteredDocs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewData = (doc) => {
    navigate(ROUTES.VIEW_DATA, {
      state: doc,
    });
  };

  return (
    <>
      <main className="flex-1 p-4 md:p-8 max-w-[98%] mx-auto w-full">
        {/* Search and filter */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search Document Name"
                className="w-full h-10 pl-10 pr-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm font-medium text-xs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="relative">
              <Calendar
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="date"
                className="h-10 pl-10 pr-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none shadow-sm font-bold text-xs text-gray-700"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>

            <select
              className="h-10 px-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer shadow-sm text-xs font-bold text-gray-700"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="In Process">In Process</option>
              <option value="Queued">Queued</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          <Button
            onClick={() => {
              setSearch('');
              setStatusFilter('All');
              setDateFilter('');
              setCurrentPage(1);
              cachedState = { search: '', statusFilter: 'All', dateFilter: '', currentPage: 1 };
            }}
            className="h-10 flex items-center gap-2 px-5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm font-bold text-gray-700 active:scale-95 text-xs"
          >
            <RefreshCw size={18} />
            Refresh
          </Button>
        </div>

        {/* table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="w-full text-left">
              <TableHeader className="bg-gray-50/50 border-b border-gray-100">
                <TableRow>
                  <TableHead className="px-6 py-4 font-black text-gray-900 text-[10px] uppercase tracking-widest">
                    Document Name
                  </TableHead>
                  <TableHead className="px-6 py-4 font-black text-gray-900 text-[10px] uppercase tracking-widest">
                    Ingested Date
                  </TableHead>
                  <TableHead className="px-6 py-4 font-black text-gray-900 text-[10px] uppercase tracking-widest">
                    Extraction Status
                  </TableHead>
                  <TableHead className="px-6 py-4 font-black text-gray-900 text-[10px] uppercase tracking-widest text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100">
                {paginatedDocs && paginatedDocs.length > 0 ? (
                  paginatedDocs.map((doc) => (
                    <TableRow key={doc.id} className="hover:bg-blue-50/20 transition-colors group">
                      <TableCell className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                            <FileText
                              className="text-gray-400 group-hover:text-blue-500 transition-colors"
                              size={20}
                            />
                          </div>
                          <span className="font-bold text-slate-800">{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-5 text-sm text-gray-500 font-medium">
                        {doc.date}
                      </TableCell>
                      <TableCell className="px-6 py-5">
                        <StatusBadge status={doc.status} />
                      </TableCell>
                      <TableCell className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-3">
                          {doc.status === 'Completed' ? (
                            <>
                              <Button
                                onClick={() => setSummaryDoc(doc)}
                                className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-xl text-[10px] font-black transition-all flex items-center gap-1.5 border border-blue-100 uppercase"
                              >
                                <Zap size={14} fill="currentColor" /> Generate Deal Summary
                              </Button>
                              <Button
                                onClick={() => handleViewData(doc)}
                                className="text-slate-400 hover:text-blue-600 px-3 py-2 rounded-xl text-[10px] font-black transition-all flex items-center gap-1 uppercase"
                              >
                                View Data
                                <ChevronRight size={14} />
                              </Button>
                            </>
                          ) : doc.status === 'Failed' ? (
                            <Button className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-xl text-[10px] font-black transition-all flex items-center gap-1.5 border border-red-100 uppercase">
                              <RotateCw size={14} /> Retry
                            </Button>
                          ) : (
                            <Button
                              disabled
                              className="text-slate-300 px-3 py-2 rounded-xl text-[10px] font-black flex items-center gap-1 cursor-not-allowed uppercase"
                            >
                              View Data
                              <ChevronRight size={14} />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="px-6 py-20 text-center text-gray-400">
                      <FileText size={48} className="mx-auto mb-4 opacity-10" />
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        No matching dossiers found
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination UI */}
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-tight">
              Showing{' '}
              <span className="text-slate-800">
                {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, filteredDocs.length)}
              </span>{' '}
              of <span className="text-slate-800">{filteredDocs.length}</span> results
            </div>
            <Pagination className="w-auto mx-0">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    className={
                      currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                    }
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    className={
                      currentPage === totalPages
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>

      {/* Summary Modal */}
      <Modal
        isOpen={!!summaryDoc}
        onClose={() => setSummaryDoc(null)}
        title={
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg shrink-0">
              <Zap className="text-white" size={18} fill="currentColor" />
            </div>
            <div className="text-left">
              <h3 className="text-base font-bold text-slate-900 leading-tight">AI Deal Summary</h3>
              <p className="text-[10px] text-slate-500 font-medium">{summaryDoc?.name}</p>
            </div>
          </div>
        }
        footer={
          <Button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50">
            <FileDown size={18} /> Export PDF
          </Button>
        }
      >
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">Test data</div>
      </Modal>
    </>
  );
}
