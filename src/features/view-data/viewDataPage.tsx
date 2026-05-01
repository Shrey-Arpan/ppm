import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../nav/navbar';
import ViewDataHeader from './view-data-children/viewDataHeader';
import ViewDataSideBar from './view-data-children/viewDataSideBar';
import ViewDataMain from './view-data-children/viewDataMain';
import { useFetch } from '@/hooks';
import type { ViewDataApiResponse } from '@/types';
import { useState } from 'react';

export default function ViewDataPage() {
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();
  const document = location.state;
  const AZURE_CODE = import.meta.env.VITE_AZURE_CODE;
  const url: string = `/azure-api/extracted-fields?code=${AZURE_CODE}==&document_name=PPM%20-%20ERP%201031%20Industrial%20Portfolio%20DST%20%2810.18.23%29%20%281%29.pdf`;
  const { data, isLoading, error } = useFetch<ViewDataApiResponse>(url);
  const onBack = () => {
    navigate(-1);
  };

  const toggleSectionExpansion = (index: number) => {
    setActiveSectionIndex(index);
  };

  const activeSection = data?.sections?.[activeSectionIndex] || null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans h-screen overflow-hidden">
      <Navbar />
      <ViewDataHeader document={document} onBack={onBack} exportData={data} />
      <div className="flex flex-1 overflow-hidden">
        {error ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="text-red-500 bg-red-50/50 p-6 rounded-2xl border border-red-100 max-w-lg mx-auto flex-1">
              <p className="font-bold text-lg mb-1">Error loading data</p>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        ) : (
          <>
            <ViewDataSideBar
              document={data}
              activeSectionIndex={activeSectionIndex}
              onSectionClick={toggleSectionExpansion}
              isLoading={isLoading}
            />
            <ViewDataMain
              data={data}
              activeSectionIndex={activeSectionIndex}
              activeSection={activeSection}
              isLoading={isLoading}
            />
          </>
        )}
      </div>
    </div>
  );
}
