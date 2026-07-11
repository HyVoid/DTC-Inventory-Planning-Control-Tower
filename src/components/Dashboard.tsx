/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SKU, InventoryMetrics } from '../types';
import { AlertTriangle, TrendingUp, CheckCircle, Package, Layers, Calendar } from 'lucide-react';

interface DashboardProps {
  skus: SKU[];
  metrics: InventoryMetrics[];
  setActiveTab: (tab: string) => void;
}

export default function Dashboard({ skus, metrics, setActiveTab }: DashboardProps) {
  // Aggregate Metrics
  const totalOnHandValue = metrics.reduce((sum, m) => sum + m.onHandValue, 0);
  const totalInboundValue = metrics.reduce((sum, m) => sum + m.inboundValue, 0);
  const totalSuggestedPOValue = metrics.reduce((sum, m) => sum + m.suggestedPOValue, 0);
  
  const greenSKUsCount = metrics.filter(m => m.healthStatus === 'Green').length;
  const stockHealthRatio = metrics.length > 0 ? (greenSKUsCount / metrics.length) * 100 : 0;

  const avgTurns = metrics.length > 0 
    ? metrics.reduce((sum, m) => sum + m.projectedTurns, 0) / metrics.length 
    : 0;

  // Alerts
  const orderNowSKUs = metrics.filter(m => m.reorderAlert === 'Order Now');
  const orderSoonSKUs = metrics.filter(m => m.reorderAlert === 'Order Soon');
  const stockoutRiskSKUs = metrics.filter(m => m.coverageDays < 15);

  // Categories allocation for visualizer
  const categoryValues: Record<string, number> = {};
  metrics.forEach(m => {
    const skuObj = skus.find(s => s.id === m.skuId);
    if (skuObj) {
      categoryValues[skuObj.category] = (categoryValues[skuObj.category] || 0) + m.onHandValue;
    }
  });

  const totalVal = Object.values(categoryValues).reduce((sum, v) => sum + v, 0) || 1;

  // 1. Calculate OUI (Operational Urgency Index) and order SKUs by OUI (ascending order)
  const sortedByOUI = [...metrics].map(m => {
    const skuObj = skus.find(s => s.id === m.skuId);
    const totalAvailable = skuObj ? (skuObj.onHand + skuObj.inboundQty) : 0;
    const oui = m.reorderPoint > 0 ? (totalAvailable / m.reorderPoint) : 2.0;
    
    const depletionDays = m.coverageDays;
    const estDepletionDate = new Date();
    estDepletionDate.setDate(estDepletionDate.getDate() + Math.ceil(depletionDays));
    const estDepletionDateStr = depletionDays < 999 
      ? estDepletionDate.toISOString().split('T')[0] 
      : 'Infinite';

    return {
      ...m,
      oui,
      totalAvailable,
      estDepletionDateStr
    };
  }).sort((a, b) => a.oui - b.oui);

  return (
    <div className="space-y-8 animate-[fadeUp_300ms_var(--ease-decel)_both]">
      
      {/* Page Header */}
      <div className="flex flex-col space-y-1.5">
        <h2 className="font-serif text-[var(--text-page-title)] font-bold tracking-[var(--tracking-display)] text-[color:var(--color-primary)]">
          Inventory Planning Control Tower
        </h2>
        <p className="text-gray-500 text-sm max-w-2xl font-light">
          Real-time dynamic analysis of DTC supply chain safety stocks, reorder points, and capital exposure. All calculations are reactively updated below.
        </p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* On Hand Capital */}
        <div className="card p-5">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono font-bold tracking-wider text-gray-400 uppercase">On-Hand Capital</span>
            <Package className="w-4 h-4 text-[color:var(--color-accent)]" />
          </div>
          <div className="mt-2 text-[var(--text-kpi-value)] serif-heading font-extrabold text-[color:var(--color-primary)]">
            ${totalOnHandValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="mt-1 text-xs text-gray-500 flex items-center space-x-1 font-light">
            <span>Currently stored in Swedish 3PL</span>
          </div>
        </div>

        {/* In-Transit Capital */}
        <div className="card p-5">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono font-bold tracking-wider text-gray-400 uppercase">In-Transit Capital</span>
            <Calendar className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 text-[var(--text-kpi-value)] serif-heading font-extrabold text-[color:var(--color-primary)]">
            ${totalInboundValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="mt-1 text-xs text-gray-500 flex items-center space-x-1 font-light">
            <span>Open PO commitments on water/air</span>
          </div>
        </div>

        {/* Recommended PO Capital */}
        <div className="card p-5">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono font-bold tracking-wider text-gray-400 uppercase">Recommended POs</span>
            <Layers className="w-4 h-4 text-[color:var(--color-accent)]" />
          </div>
          <div className="mt-2 text-[var(--text-kpi-value)] serif-heading font-extrabold text-[color:var(--color-accent)]">
            ${totalSuggestedPOValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="mt-1 text-xs text-gray-500 flex items-center space-x-1 font-light">
            <span>Required capital to balance safety levels</span>
          </div>
        </div>

        {/* Stock Health Ratio */}
        <div className="card p-5">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono font-bold tracking-wider text-gray-400 uppercase">Stock Health</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-[var(--text-kpi-value)] serif-heading font-extrabold text-[color:var(--color-primary)]">
            {stockHealthRatio.toFixed(1)}%
          </div>
          <div className="mt-1 text-xs text-gray-500 flex items-center space-x-1 font-light">
            <span>{greenSKUsCount} of {metrics.length} SKUs in optimal range</span>
          </div>
        </div>

        {/* Inventory Turns */}
        <div className="card p-5">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono font-bold tracking-wider text-gray-400 uppercase">Avg Turnover</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-[var(--text-kpi-value)] serif-heading font-extrabold text-[color:var(--color-primary)]">
            {avgTurns.toFixed(2)}x
          </div>
          <div className="mt-1 text-xs text-gray-500 flex items-center space-x-1 font-light">
            <span>Annualized inventory turns ratio</span>
          </div>
        </div>
      </div>

      {/* Strategic Insight and Recommendation Block */}
      <div className="bg-[color:var(--insight-bg)] border-l-3 border-[color:var(--color-accent)] p-5 rounded-r-[var(--radius-md)] flex items-start space-x-4">
        <div className="bg-[color:var(--color-accent)]/10 text-[color:var(--color-accent)] p-2.5 rounded-lg">
          <Layers className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-serif text-[15px] font-bold text-[color:var(--color-primary)]">
            Executive Supply Chain Diagnosis
          </h4>
          <p className="text-[13px] text-gray-600 leading-relaxed max-w-5xl">
            Currently, <strong className="text-[color:var(--color-primary)]">{orderNowSKUs.length} items</strong> have breached their critical Reorder Points (ROP) and require immediate placement of new purchase orders to avoid DTC stockouts. Additionally, the China supply chain (70-day lead time) pillows represent <strong className="text-[color:var(--color-primary)]">{(totalOnHandValue > 0 ? ((metrics.find(m => m.skuId === 'SKU-001')?.onHandValue || 0) + (metrics.find(m => m.skuId === 'SKU-002')?.onHandValue || 0)) / totalOnHandValue * 100 : 0).toFixed(0)}%</strong> of total capital allocation. It is highly recommended to prioritize placement of suggested POs to minimize long-lead-time risk.
          </p>
        </div>
      </div>

      {/* ── NEW: Control Tower Operational Traceability Center ── */}
      <div className="space-y-4 border border-gray-200 bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-md)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-gray-100 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="badge bg-[color:var(--color-primary)] text-white">Diagnostics Mode</span>
              <h3 className="serif-heading text-[18px] font-bold text-[color:var(--color-primary)]">
                Operational Traceability &amp; Decision Desk
              </h3>
            </div>
            <p className="text-xs text-gray-500 font-light">
              Multi-dimensional trace metrics tracking stock depletions, procurement ranking, lead time consumption, and future cash flow commitments.
            </p>
          </div>
          <div className="text-right text-[11px] text-gray-400 font-mono">
            UPDATED: <span className="font-semibold text-gray-600">REAL-TIME FORMULA SYNC</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1: Urgency-Ranked Procurement & Depletion Queue */}
          <div className="space-y-4">
            <div className="flex items-center space-x-1.5 pb-1 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-[color:var(--color-primary)] font-mono">
                1. Urgency &amp; Depletion Tracker
              </span>
            </div>
            <p className="text-[11px] text-gray-500 leading-normal">
              SKUs ranked dynamically by <strong className="text-gray-700">Operational Urgency Index (OUI)</strong>. Ratio &le; 1.0 has breached ROP and requires order. &gt; 1.0 can safely wait.
            </p>

            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
              {sortedByOUI.map(m => {
                const isBreach = m.oui <= 1.0;
                const isSoon = m.oui > 1.0 && m.oui <= 1.25;

                return (
                  <div key={m.skuId} className={`p-2.5 rounded-lg border text-xs transition-colors ${
                    isBreach 
                      ? 'bg-[color:var(--anomaly-bg)] border-red-200' 
                      : isSoon 
                      ? 'bg-amber-50/50 border-amber-200' 
                      : 'bg-emerald-50/20 border-emerald-100'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div className="font-semibold text-[color:var(--color-primary)] truncate max-w-[160px]">
                        {m.skuName}
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider ${
                        isBreach 
                          ? 'bg-red-100 text-[color:var(--color-negative)]' 
                          : isSoon 
                          ? 'bg-amber-100 text-amber-700' 
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {isBreach ? 'ORDER NOW' : isSoon ? 'ORDER SOON' : 'SAFELY WAIT'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-gray-100/50 text-[10px] font-mono text-gray-500">
                      <div>
                        OUI Index: <span className={`font-bold ${isBreach ? 'text-[color:var(--color-negative)]' : 'text-gray-700'}`}>{m.oui.toFixed(2)}x</span>
                      </div>
                      <div className="text-right">
                        Depletion: <span className={`font-semibold ${isBreach ? 'text-red-700' : 'text-emerald-700'}`}>{m.coverageDays.toFixed(0)} days</span>
                      </div>
                    </div>
                    <div className="mt-1 text-[10px] text-gray-400 font-mono flex justify-between items-center">
                      <span>Est. Depletion:</span>
                      <span className="font-medium text-gray-600">{m.estDepletionDateStr}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Lead Time Consumption & Demand Drivers */}
          <div className="space-y-4">
            <div className="flex items-center space-x-1.5 pb-1 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-[color:var(--color-primary)] font-mono">
                2. Lead Time Consumption (LTD)
              </span>
            </div>
            <p className="text-[11px] text-gray-500 leading-normal">
              Expected consumption during delivery lead days (<strong className="text-gray-700">LTD</strong>). Factored from historical trend and ad campaign multipliers.
            </p>

            <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
              {metrics.map(m => {
                const skuObj = skus.find(s => s.id === m.skuId);
                const hasActiveCampaign = skuObj && skuObj.campaigns && skuObj.campaigns.length > 0;
                
                return (
                  <div key={m.skuId} className="p-2.5 rounded-lg border border-gray-100 bg-gray-50/50 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-[color:var(--color-primary)] truncate max-w-[170px]">
                        {m.skuName}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">{m.leadTime}d LT</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2 text-[10px] font-mono">
                      <div className="space-y-0.5">
                        <div className="text-gray-400 uppercase">LTD Consumption</div>
                        <div className="font-bold text-[color:var(--color-primary)]">
                          {m.leadTimeDemand.toLocaleString('en-US', { maximumFractionDigits: 0 })} <span className="font-normal text-gray-400">units</span>
                        </div>
                      </div>
                      <div className="space-y-0.5 text-right">
                        <div className="text-gray-400 uppercase">Safety Buffer</div>
                        <div className="font-semibold text-emerald-700">
                          +{m.safetyStock.toLocaleString('en-US', { maximumFractionDigits: 0 })} <span className="font-normal text-gray-400">units</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-1.5 pt-1 border-t border-gray-100 flex justify-between items-center text-[9px] font-mono">
                      <div className="text-gray-400">
                        Trend: <span className="font-bold text-indigo-700">{m.trendFactor.toFixed(2)}x</span>
                      </div>
                      {hasActiveCampaign ? (
                        <span className="text-red-600 font-bold bg-red-50 px-1.5 py-0.2 rounded">
                          Ad Campaigns Active
                        </span>
                      ) : (
                        <span className="text-gray-400">Stable Organic</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 3: Capital Ledger & Future Commitments Balance */}
          <div className="space-y-4">
            <div className="flex items-center space-x-1.5 pb-1 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-[color:var(--color-primary)] font-mono">
                3. Capital Balance &amp; Commitments
              </span>
            </div>
            <p className="text-[11px] text-gray-500 leading-normal">
              Compare capital currently locked in warehouse (<strong className="text-gray-700">Tied-Up</strong>) against upcoming procurement liability and suggested commitments.
            </p>

            <div className="space-y-5 bg-gray-50/30 p-4 rounded-xl border border-gray-100">
              {/* Capital Balance Visual Bar */}
              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-wider font-mono font-bold text-gray-400">
                  Dynamic Capital Balance Allocation
                </div>
                {(() => {
                  const totalExposure = totalOnHandValue + totalInboundValue + totalSuggestedPOValue;
                  const handPct = totalExposure > 0 ? (totalOnHandValue / totalExposure) * 100 : 0;
                  const inboundPct = totalExposure > 0 ? (totalInboundValue / totalExposure) * 100 : 0;
                  const suggestedPct = totalExposure > 0 ? (totalSuggestedPOValue / totalExposure) * 100 : 0;

                  return (
                    <div className="space-y-3">
                      {/* Multi-segmented balance bar */}
                      <div className="w-full h-4 bg-gray-100 rounded-full flex overflow-hidden shadow-inner">
                        <div 
                          className="h-full bg-[color:var(--color-primary)] transition-all duration-500"
                          style={{ width: `${handPct}%` }}
                          title={`Tied-Up: ${handPct.toFixed(1)}%`}
                        />
                        <div 
                          className="h-full bg-blue-400 transition-all duration-500"
                          style={{ width: `${inboundPct}%` }}
                          title={`In-Transit: ${inboundPct.toFixed(1)}%`}
                        />
                        <div 
                          className="h-full bg-[color:var(--color-accent)] transition-all duration-500"
                          style={{ width: `${suggestedPct}%` }}
                          title={`Proposed: ${suggestedPct.toFixed(1)}%`}
                        />
                      </div>

                      {/* Legend with exact metrics */}
                      <div className="space-y-2 text-[11px] font-mono">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-1.5">
                            <span className="w-2.5 h-2.5 rounded-sm bg-[color:var(--color-primary)]" />
                            <span className="text-gray-500">Tied-Up (OnHand):</span>
                          </div>
                          <span className="font-bold text-gray-700">
                            ${totalOnHandValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-1.5">
                            <span className="w-2.5 h-2.5 rounded-sm bg-blue-400" />
                            <span className="text-gray-500">In-Transit Commit:</span>
                          </div>
                          <span className="font-semibold text-blue-600">
                            ${totalInboundValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-1.5">
                            <span className="w-2.5 h-2.5 rounded-sm bg-[color:var(--color-accent)]" />
                            <span className="text-gray-500">Proposed PO Commitment:</span>
                          </div>
                          <span className="font-bold text-[color:var(--color-accent)]">
                            ${totalSuggestedPOValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                          </span>
                        </div>

                        <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-xs font-serif font-bold text-[color:var(--color-primary)]">
                          <span>Total Capital Exposure:</span>
                          <span>
                            ${totalExposure.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Methodology Explanation */}
              <div className="p-3 bg-white rounded-lg border border-gray-100 text-[10px] text-gray-400 leading-normal font-mono">
                <strong className="text-gray-600">Decision Tip:</strong> Committing capital to proposed POs now maintains healthy service levels, mitigating stockout threats representing substantial retail sales potential.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Alerts and Visualizers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Critical Reorder Warnings */}
        <div className="card p-6 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <h3 className="serif-heading text-[16px] font-bold text-[color:var(--color-primary)] flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-[color:var(--color-negative)]" />
              <span>Critical Action Required</span>
            </h3>
            <span className="text-[10px] font-mono bg-red-50 text-[color:var(--color-negative)] font-semibold px-2 py-0.5 rounded-full">
              {orderNowSKUs.length} BREACHES
            </span>
          </div>

          <div className="space-y-3 min-h-[220px]">
            {orderNowSKUs.length === 0 ? (
              <div className="h-[220px] flex flex-col items-center justify-center text-gray-400 text-xs">
                <CheckCircle className="w-8 h-8 text-emerald-400 mb-2" />
                <span>All SKUs have healthy available stock.</span>
              </div>
            ) : (
              <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                {orderNowSKUs.map(m => {
                  const skuObj = skus.find(s => s.id === m.skuId);
                  return (
                    <div 
                      key={m.skuId}
                      onClick={() => setActiveTab('planner')}
                      className="group flex justify-between items-center p-3 rounded-lg bg-[color:var(--anomaly-bg)] border-l-2 border-[color:var(--color-negative)] cursor-pointer hover:translate-x-1 transition-all duration-200"
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-semibold text-[color:var(--color-primary)] group-hover:text-[color:var(--color-accent)] transition-colors">
                          {m.skuName}
                        </div>
                        <div className="text-[11px] text-gray-500 font-mono">
                          ROP: {m.reorderPoint.toFixed(0)} units | Avail: {(skuObj ? skuObj.onHand + skuObj.inboundQty : 0)} units
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-[color:var(--color-negative)] font-mono uppercase">
                          Order Now
                        </div>
                        <div className="text-[10px] text-gray-400 font-mono">
                          {m.coverageDays.toFixed(0)}d coverage
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <button 
            onClick={() => setActiveTab('planner')}
            className="w-full py-2 bg-[color:var(--color-primary)] text-white font-mono text-[11px] font-semibold tracking-wider rounded-md hover:bg-[color:var(--color-accent)] transition-colors cursor-pointer text-center"
          >
            OPEN REORDER PLANNER &rarr;
          </button>
        </div>

        {/* Order Soon Alerts */}
        <div className="card p-6 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <h3 className="serif-heading text-[16px] font-bold text-[color:var(--color-primary)] flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>Approaching Reorder Limits</span>
            </h3>
            <span className="text-[10px] font-mono bg-amber-50 text-amber-600 font-semibold px-2 py-0.5 rounded-full">
              {orderSoonSKUs.length} ITEMS
            </span>
          </div>

          <div className="space-y-3 min-h-[220px]">
            {orderSoonSKUs.length === 0 ? (
              <div className="h-[220px] flex flex-col items-center justify-center text-gray-400 text-xs">
                <CheckCircle className="w-8 h-8 text-emerald-400 mb-2" />
                <span>No SKU approaching reorder limits.</span>
              </div>
            ) : (
              <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                {orderSoonSKUs.map(m => {
                  const skuObj = skus.find(s => s.id === m.skuId);
                  const surplus = skuObj ? (skuObj.onHand + skuObj.inboundQty) - m.reorderPoint : 0;
                  const daysToROP = m.dailyForecast > 0 ? surplus / m.dailyForecast : 0;
                  return (
                    <div 
                      key={m.skuId}
                      onClick={() => setActiveTab('planner')}
                      className="group flex justify-between items-center p-3 rounded-lg bg-amber-50/50 border-l-2 border-amber-400 cursor-pointer hover:translate-x-1 transition-all duration-200"
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-semibold text-[color:var(--color-primary)] group-hover:text-[color:var(--color-accent)] transition-colors">
                          {m.skuName}
                        </div>
                        <div className="text-[11px] text-gray-500 font-mono">
                          Avail surplus: {surplus.toFixed(0)} units to ROP
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-amber-600 font-mono">
                          ROP -{daysToROP.toFixed(0)}d
                        </div>
                        <div className="text-[10px] text-gray-400 font-mono">
                          Est. {m.suggestedPurchaseDate}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <button 
            onClick={() => setActiveTab('planner')}
            className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-mono text-[11px] font-semibold tracking-wider rounded-md transition-colors cursor-pointer text-center"
          >
            VIEW PURCHASE CALENDAR
          </button>
        </div>

        {/* Capital Allocation Visualizer */}
        <div className="card p-6 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <h3 className="serif-heading text-[16px] font-bold text-[color:var(--color-primary)] flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[color:var(--color-accent)]" />
              <span>Capital Balance allocation</span>
            </h3>
            <span className="text-[10px] font-mono text-gray-400 font-semibold uppercase">
              By Category
            </span>
          </div>

          <div className="space-y-5 min-h-[220px] flex flex-col justify-center">
            {Object.keys(categoryValues).map((cat) => {
              const val = categoryValues[cat];
              const pct = (val / totalVal) * 100;
              return (
                <div key={cat} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[color:var(--color-primary)]">{cat}</span>
                    <span className="font-mono text-gray-600">
                      ${val.toLocaleString('en-US', { maximumFractionDigits: 0 })} ({pct.toFixed(1)}%)
                    </span>
                  </div>
                  {/* Custom animated progress bar */}
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[color:var(--color-accent)] rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <button 
            onClick={() => setActiveTab('cashflow')}
            className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 font-mono text-[11px] font-semibold tracking-wider rounded-md transition-colors cursor-pointer text-center"
          >
            DETAILED CASH FLOW ANALYSIS
          </button>
        </div>

      </div>

      {/* Complete SKUs Summary Table */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="serif-heading text-[16px] font-bold text-[color:var(--color-primary)]">
            Active Control Panel Overview
          </h3>
          <span className="text-[10px] font-mono text-gray-400">
            {skus.length} PRODUCTS SEEDED
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 h-[44px]">
                <th className="px-6 text-[11px] font-semibold text-[color:var(--color-primary)] font-mono uppercase tracking-[var(--tracking-label)]">SKU / Product</th>
                <th className="px-4 text-[11px] font-semibold text-[color:var(--color-primary)] font-mono uppercase tracking-[var(--tracking-label)]">Category</th>
                <th className="px-4 text-[11px] font-semibold text-[color:var(--color-primary)] font-mono uppercase tracking-[var(--tracking-label)] text-right">Lead Time</th>
                <th className="px-4 text-[11px] font-semibold text-[color:var(--color-primary)] font-mono uppercase tracking-[var(--tracking-label)] text-right">On Hand</th>
                <th className="px-4 text-[11px] font-semibold text-[color:var(--color-primary)] font-mono uppercase tracking-[var(--tracking-label)] text-right">In-Transit</th>
                <th className="px-4 text-[11px] font-semibold text-[color:var(--color-primary)] font-mono uppercase tracking-[var(--tracking-label)] text-right">Daily Forecast</th>
                <th className="px-4 text-[11px] font-semibold text-[color:var(--color-primary)] font-mono uppercase tracking-[var(--tracking-label)] text-right">Stock Coverage</th>
                <th className="px-6 text-[11px] font-semibold text-[color:var(--color-primary)] font-mono uppercase tracking-[var(--tracking-label)] text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[13px]">
              {metrics.map(m => {
                const skuObj = skus.find(s => s.id === m.skuId);
                const isRed = m.healthStatus === 'Red';
                const isYellow = m.healthStatus === 'Yellow';
                
                return (
                  <tr 
                    key={m.skuId}
                    className={`h-[40px] hover:bg-gray-50 transition-colors ${
                      isRed ? 'bg-[color:var(--anomaly-bg)]' : ''
                    }`}
                  >
                    <td className="px-6 font-medium text-[color:var(--color-primary)]">
                      <div className="flex flex-col">
                        <span>{m.skuName}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{m.skuId}</span>
                      </div>
                    </td>
                    <td className="px-4 text-gray-500">{skuObj?.category}</td>
                    <td className="px-4 text-right font-mono text-gray-600">{m.leadTime} days</td>
                    <td className="px-4 text-right font-mono font-medium">{skuObj?.onHand}</td>
                    <td className="px-4 text-right font-mono text-gray-500">
                      {skuObj?.inboundQty && skuObj.inboundQty > 0 ? (
                        <span className="text-blue-600 font-medium">+{skuObj.inboundQty}</span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-4 text-right font-mono text-gray-600">
                      {m.dailyForecast.toFixed(1)}/day
                    </td>
                    <td className="px-4 text-right font-mono font-medium">
                      <div className="flex flex-col items-end">
                        <span className={isRed ? 'text-[color:var(--color-negative)] font-bold' : ''}>
                          {m.coverageDays.toFixed(0)} days
                        </span>
                        {/* Tiny coverage bar */}
                        <div className="w-16 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                          <div 
                            className={`h-full ${
                              isRed ? 'bg-[color:var(--color-negative)]' : 'bg-[color:var(--color-accent)]'
                            }`}
                            style={{ width: `${Math.min(100, (m.coverageDays / m.leadTime) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider ${
                        isRed 
                          ? 'bg-red-100 text-[color:var(--color-negative)]' 
                          : isYellow 
                          ? 'bg-amber-100 text-amber-700' 
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {m.healthStatus === 'Red' ? 'CRITICAL OUTAGE RISK' : m.healthStatus === 'Yellow' ? 'REORDER WARNING' : 'HEALTHY'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
