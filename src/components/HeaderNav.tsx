/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Database, FileUp, FileDown, RotateCcw } from 'lucide-react';

interface HeaderNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lastSaved: string;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export default function HeaderNav({
  activeTab,
  setActiveTab,
  lastSaved,
  onExport,
  onImport,
  onReset,
}: HeaderNavProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'setup', label: '1. Setup & Config' },
    { id: 'sales', label: '2. Sales History' },
    { id: 'inventory', label: '3. Inventory Status' },
    { id: 'forecast', label: '4. Forecast Engine' },
    { id: 'planner', label: '5. Inventory Planner' },
    { id: 'cashflow', label: '6. Cash Flow Impact' },
  ];

  return (
    <header 
      id="header-nav"
      className="sticky top-0 z-50 h-[56px] w-full bg-white border-b border-[color:var(--nav-border)] shadow-[color:var(--shadow-nav)] flex items-center justify-between px-10"
    >
      {/* Brand Identity */}
      <div className="flex items-center space-x-2 select-none shrink-0">
        <div className="w-8 h-8 rounded-lg bg-[color:var(--color-primary)] flex items-center justify-center text-white font-sans font-bold text-xs shrink-0 shadow-sm">
          DA
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight text-[color:var(--color-primary)] serif-heading leading-tight" style={{ letterSpacing: '-0.01em' }}>
            Demand-Adaptive Inventory Planning &amp; Purchasing Decision
          </span>
          <span className="text-[9px] font-mono font-bold text-[color:var(--color-accent)] uppercase tracking-wider leading-none">
            Excel Toolkit Console
          </span>
        </div>
      </div>

      {/* Sheet Sheet Tab Selector */}
      <nav className="flex h-full items-center space-x-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-btn-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-link text-xs uppercase tracking-wider ${isActive ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Utilities Column */}
      <div className="flex items-center space-x-4">
        {/* Autosave Status */}
        <div className="flex items-center space-x-1.5 text-[11px] font-mono text-gray-500 select-none bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-gray-400">LAST SAVED:</span>
          <span id="last-saved-time" className="text-gray-600 font-medium">{lastSaved || 'N/A'}</span>
        </div>

        {/* Administration Actions */}
        <div className="flex items-center space-x-2 border-l border-gray-200 pl-3">
          {/* Export Backup */}
          <button
            id="btn-export-backup"
            onClick={onExport}
            title="Export Backup File (JSON)"
            className="p-1.5 hover:bg-gray-100 text-gray-600 hover:text-[color:var(--color-primary)] rounded-md transition-colors cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
          </button>

          {/* Import Backup */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={onImport}
            accept=".json"
            className="hidden"
            id="import-file-input"
          />
          <button
            id="btn-import-backup"
            onClick={() => fileInputRef.current?.click()}
            title="Import Backup File (JSON)"
            className="p-1.5 hover:bg-gray-100 text-gray-600 hover:text-[color:var(--color-primary)] rounded-md transition-colors cursor-pointer"
          >
            <FileUp className="w-4 h-4" />
          </button>

          {/* Reset System */}
          <button
            id="btn-reset-system"
            onClick={() => {
              if (window.confirm('Are you absolutely sure you want to reset all inventory records and configuration to default? All local changes will be lost.')) {
                onReset();
              }
            }}
            title="Reset to Factory Seeds"
            className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-md transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
