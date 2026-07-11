# Demand-Adaptive Inventory Planning & Purchasing Decision Excel Toolkit

### Lightweight Inventory Planning & Purchasing Decision Support for DTC Brands — Available Free in Browser or Excel

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-success)
![Tool](https://img.shields.io/badge/Tool-Inventory%20Planning%20%26%20Decision%20Support-orange)

---

**Plan inventory with confidence by combining demand forecasting, lead-time risk, purchasing recommendations, and cash exposure in one lightweight decision-support tool—free to use in both Browser and Excel**

> ## **No signup. No installation. Free.**
>
> 🌐 **Open in Browser**  
> *(HTML Live Demo — Coming Soon)*
>
> 📥 **Download Excel Version**  
> *(GitHub Release / Gumroad — Coming Soon)*

---

# Screenshots

### Browser Version

<!-- screenshot: browser version -->

*A browser-based operational dashboard showing inventory health, purchasing priorities, cash exposure, and reorder alerts without requiring Excel.*

---

### Excel Version

<!-- screenshot: excel version -->

*The Excel workbook containing data import sheets, forecasting engine, purchasing planner, and executive dashboard for recurring inventory planning.*

---
# What It Helps You Track

Instead of manually comparing inventory reports, supplier lead times, and historical sales across multiple spreadsheets, the workbook keeps the operational picture together.

Unlike traditional inventory trackers that assume demand is relatively stable, this workbook is designed for modern Direct-to-Consumer (DTC) businesses where demand can change rapidly.

Paid advertising on platforms such as Meta and TikTok, successful product launches, seasonal campaigns, and viral products can all cause sales to accelerate within days rather than months. Under these conditions, static inventory planning often creates two costly outcomes:

- **Demand is underestimated**, resulting in stockouts that waste previously acquired customers and advertising investment because products are no longer available for purchase.
- **Demand is overestimated**, leading to excess inventory, slower inventory turnover, and unnecessary working capital tied up in stock.

The planning challenge becomes even more complex when different products operate under different replenishment models. Some products rely on **long lead-time supply chains**, where manufacturing and transportation require several months and purchasing decisions must be made far in advance. Others use **short lead-time supply chains**, allowing faster replenishment but requiring tighter inventory and cash-flow management.

Instead of applying one purchasing rule to every product, the workbook evaluates each SKU using its own demand pattern, lead time, inventory position, and replenishment constraints.

It helps reveal:

- Current inventory health alongside projected stock depletion.
- Which SKUs require purchasing now versus those that can safely wait.
- Expected inventory consumption during supplier lead times.
- Capital currently tied up in inventory together with future purchasing commitments.
- Demand changes caused by recent sales trends, paid advertising, or planned marketing campaigns.
- Purchasing priorities ranked by operational urgency instead of intuition.
- Inventory strategies tailored to both long lead-time and short lead-time supply chains within the same business.

The objective is not to replace ERP systems.

The objective is to provide a repeatable analytical framework that combines rolling demand forecasting, safety stock modelling, reorder point planning, and cash-aware purchasing recommendations using the operational data businesses already have.

---

# Quick Start Workflow

Getting from raw sales history to purchasing recommendations takes only a few operational steps.

### 1. Configure Planning Parameters

Open the **Setup_Config** worksheet and enter the information that changes infrequently, including:

- SKU master list
- Supplier
- Lead time
- Minimum Order Quantity (MOQ)
- Service level
- Unit cost
- Selling price

This configuration is typically completed once and updated only when products or suppliers change.

---

### 2. Import Existing Operational Data

Paste historical sales exported from Shopify, ERP, Amazon, or any spreadsheet directly into the import sheet.

Update current warehouse inventory and purchase orders already in transit.

No restructuring or manual calculation is required.

The workbook automatically references the imported data.

---

### 3. Review Purchasing Decisions

Navigate to the Dashboard.

All calculations refresh automatically.

Immediately see:

- Inventory at risk
- Recommended purchase orders
- Forecast demand
- Cash required
- Inventory value
- Inventory turnover indicators

No formulas need to be edited.

---

### 4. Refresh Weekly

Each planning cycle only requires:

- replacing the latest sales history,
- updating inventory,
- adjusting promotion multipliers when major campaigns are expected.

Everything else updates automatically.

**Set a few planning parameters once. Drop in existing operational data. Review the recommendations. Refresh whenever planning decisions are needed.**

---

# Why I Built This

Many inventory planning spreadsheets answer the wrong question.

They tell people **how much inventory exists today**, but purchasing decisions are made based on **how much inventory will remain when new stock finally arrives**.

That difference becomes expensive.

A fast-growing DTC brand might see 1,500 units available today and assume purchasing can wait.

However, if daily demand has increased because of Meta advertising or TikTok creators, and overseas production plus shipping requires seventy days, those 1,500 units may already be committed to future demand.

The spreadsheet still looks healthy.

The business is already heading toward stockout.

The opposite problem happens just as often.

Managers panic after seeing low warehouse inventory and place oversized purchase orders without considering inventory already in transit.

Weeks later, containers arrive together, warehouses become overloaded, and unnecessary cash remains trapped in inventory for months.

Neither problem comes from missing data.

They come from connecting the wrong numbers.

This workbook packages that reasoning into a reusable analytical framework instead of another reporting spreadsheet.

Rather than asking,

> "How much inventory do we have?"

it asks,

> "Given demand, lead time, inventory variability, supplier constraints, and available cash, what purchasing decision should be made today?"

That shift changes inventory planning from reactive reporting into structured operational decision-making.

---

# Common Inventory Planning Problems This Solves

| Problem | Without This Tool | With This Tool |
|------------|------------------|----------------|
| Purchasing based only on today's inventory | Inventory appears sufficient until stockouts suddenly occur | Purchasing decisions consider projected consumption during supplier lead time |
| Ignoring supplier lead-time differences | Domestic and overseas suppliers are planned identically | Every SKU uses its own replenishment lead time |
| Sales trends are overlooked | Forecasts rely entirely on historical averages | Recent demand acceleration automatically influences projected consumption |
| Inventory decisions ignore cash impact | Purchasing recommendations are disconnected from finance | Inventory commitments and purchasing cash exposure appear together |
| Marketing campaigns are excluded | Promotions unexpectedly create inventory shortages | Promotional multipliers adjust expected demand before purchasing decisions |
| Inventory reports require manual interpretation | Teams spend hours comparing spreadsheets | Operational recommendations appear automatically on the dashboard |

---

# Who This Is For

This workbook is designed for organizations that repeatedly make purchasing decisions using operational spreadsheets rather than enterprise planning software.

Typical users include:

- Direct-to-Consumer (DTC) ecommerce brands
- Shopify merchants
- Amazon sellers managing external warehouses
- Inventory planners
- Supply chain analysts
- Operations managers
- Small manufacturers
- Purchasing teams
- Finance teams responsible for inventory investment

It is especially valuable where supplier lead times, marketing activity, and cash constraints interact.

It is **not** intended to replace ERP, MRP, or enterprise inventory management platforms.

Instead, it provides a lightweight analytical layer that improves purchasing decisions using existing operational data.

**No spreadsheet expertise is required. Open the browser version or Excel workbook, import operational data, and begin planning immediately.**

---

# About

I build lightweight operational tools for situations where there are simply too many moving parts to keep in your head.

Rather than creating another dashboard full of metrics, I focus on one practical question:

> **What information needs to appear together so the next operational decision can be made confidently?**

Inventory Planning Control Tower is one example of that approach. It combines demand forecasting, supplier constraints, inventory risk, and cash exposure into a reusable decision-support framework that organizations can operate and maintain themselves.

---

# Technical Details

<details>
<summary><strong>For technical reviewers, Excel practitioners, and collaborators</strong></summary>

---

## Workbook Architecture

The workbook follows a deliberately separated three-layer architecture.

Instead of mixing inputs, formulas, and dashboards on one worksheet, every worksheet has a single operational responsibility.

```
                 MASTER DATA
                      │
                      ▼
             Setup_Config
                      │
      ┌───────────────┼────────────────┐
      ▼               ▼                ▼
 Sales Import   Inventory Status   Static Parameters
      │               │
      └───────────────┼────────────────┐
                      ▼
              Forecast Engine
                      │
                      ▼
            Inventory Planner
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
 Cash Flow Impact            Dashboard
```

### Workbook Layers

| Layer | Worksheet | Responsibility |
|--------|-----------|----------------|
| Configuration | Setup_Config | SKU master data, supplier information, lead time, MOQ, service level and cost parameters |
| Operational Data | Sales_Import | Historical sales imported directly from Shopify, ERP or spreadsheets |
| Operational Data | Inventory_Status | Current inventory and purchase orders already in transit |
| Calculation | Forecast_Engine | Demand forecasting using historical sales trends and manual campaign adjustments |
| Calculation | Inventory_Planner | Safety stock, reorder point, purchasing recommendations and suggested quantities |
| Financial Analysis | Cash_Flow_Impact | Inventory valuation, purchasing cash exposure and inventory turnover |
| Executive Output | Dashboard | Purchasing alerts, KPI summary and purchasing action list |

---

### Data Flow

```
Sales History
      │
      ▼
Daily Sales Average
      │
      ▼
Trend Adjustment
      │
      ▼
Demand Forecast
      │
      ▼
Lead Time Demand
      │
      ▼
Safety Stock
      │
      ▼
Reorder Point
      │
      ▼
Purchase Recommendation
      │
      ├────────► Cash Exposure
      │
      └────────► Executive Dashboard
```

Each calculation layer depends only on validated upstream data.

No worksheet writes values backward into another worksheet, reducing maintenance complexity and preventing circular references.

---

## Three Traps That Catch Even Experienced Inventory Managers

---

### Trap 1 — Planning Around Today's Inventory Instead of Future Inventory

#### The Decision

Inventory looks healthy today.

Purchasing is postponed.

---

#### The Hidden Faulty Assumption

Current warehouse inventory is assumed to represent future availability.

Lead-time demand is ignored.

---

#### Before

| Current Inventory | Daily Sales | Decision |
|-------------------|------------|----------|
| 1,800 units | 40/day | Delay purchasing |

The inventory appears sufficient.

---

#### Reality

Supplier Lead Time

```
70 Days
```

Expected Consumption

```
40 × 70

=

2,800 units
```

The business will consume far more inventory before replenishment arrives.

---

#### Why The Reasoning Fails

Inventory planning is forward-looking.

Warehouse inventory is only meaningful when viewed together with expected demand during supplier lead time.

Ignoring lead-time demand delays purchasing until stockouts become unavoidable.

---

#### Correct Approach

Calculate expected inventory consumption before replenishment arrives.

Then compare available inventory against that requirement.

---

#### Correct Decision

```
ORDER NOW
```

Purchasing begins while inventory still appears healthy.

This protects customer service levels instead of reacting after shortages occur.

---

<details>
<summary>Formula Reference</summary>

Lead Time Demand

```
Lead Time Demand

=

Forecast Daily Demand

×

Lead Time
```

Excel

```excel
=B2#*C2#
```

</details>

---

### Trap 2 — Using Historical Average Sales as the Forecast

#### The Decision

Future purchasing quantities are based entirely on the 90-day average.

---

#### Hidden Faulty Assumption

Sales demand is assumed to remain stable.

Marketing activity is ignored.

Recent acceleration is ignored.

---

#### Before

```
90-Day Average

30 Units / Day
```

Recommended Purchase

```
2,100 Units
```

---

#### Reality

Last 30 Days

```
45 Units / Day
```

Trend Factor

```
45 / 30

=

1.50
```

Advertising has already increased demand.

The historical average underestimates future inventory requirements.

---

#### Why The Reasoning Fails

Historical averages describe the past.

Purchasing decisions concern the future.

Ignoring demand acceleration causes repeated stockouts even when forecasts appear mathematically correct.

---

#### Correct Approach

Combine historical demand with observed sales momentum and planned promotional activity.

```
Forecast

=

Daily Base

×

Trend Factor

×

Promotion Multiplier
```

---

#### Correct Decision

Increase purchasing before inventory shortages occur.

Forecasts become responsive instead of static.

---

<details>
<summary>Formula Reference</summary>

Trend Factor

```excel
30 Day Average
/
90 Day Average
```

Forecast

```excel
Forecast Daily
=
Base Demand
*
Trend Factor
*
Promotion Multiplier
```

Excel

```excel
=B2#*C2#*D2:D100
```

</details>

---

### Trap 3 — Treating Inventory as an Operations Problem Instead of a Cash Problem

#### The Decision

A purchasing recommendation is approved because inventory appears low.

---

#### Hidden Faulty Assumption

Only physical inventory is evaluated.

Cash requirements receive little attention.

---

#### Before

Purchasing Recommendation

```
4,000 Units
```

Looks reasonable operationally.

---

#### Reality

Unit Cost

```
$18
```

Purchase Commitment

```
4,000

×

18

=

$72,000
```

Inventory planning immediately becomes a capital allocation decision.

---

#### Why The Reasoning Fails

Inventory does not merely occupy warehouse space.

It also occupies working capital.

Without visibility into purchasing commitments, businesses unintentionally create cash shortages while attempting to prevent stockouts.

---

#### Correct Approach

Every purchasing recommendation should automatically display the financial commitment required.

Operations and finance evaluate the same recommendation simultaneously.

---

#### Correct Decision

Approve only purchasing plans that satisfy both inventory protection and cash availability.

---

<details>
<summary>Formula Reference</summary>

Purchase Commitment

```excel
Suggested Quantity
*
Unit Cost
```

Excel

```excel
=XLOOKUP(...)
*
XLOOKUP(...)
```

</details>

---

## Example Scenario

A direct-to-consumer home products company imports ninety days of Shopify sales into the workbook.

Three SKUs are supplied from China.

Average production and shipping lead time is **70 days**.

Current warehouse inventory for one SKU is **2,350 units**, while another **600 units** are already in transit.

Historical analysis shows:

| Metric | Value |
|---------|------:|
| 30-Day Average Daily Sales | 52 units |
| 90-Day Average Daily Sales | 40 units |
| Trend Factor | 1.30 |
| Promotion Multiplier | 1.20 |

The forecasting engine estimates:

```
Forecast Daily Demand

52

×

1.30

×

1.20

=

81 units/day
```

Lead-time demand becomes:

```
81

×

70

=

5,670 units
```

Historical sales variability produces a calculated safety stock of approximately **620 units**.

The reorder point therefore becomes:

```
5,670

+

620

=

6,290 units
```

Available inventory equals:

```
2,350

+

600

=

2,950 units
```

Although warehouse inventory initially appeared acceptable, available inventory is already **3,340 units below** the calculated reorder point.

The planner immediately flags the SKU as **ORDER NOW**.

The purchasing engine then evaluates MOQ requirements and rounds the recommendation upward to an operational purchase quantity.

Cash Flow Impact simultaneously estimates the purchasing commitment, allowing finance to determine whether the recommendation fits current working-capital constraints.

Instead of relying on warehouse inventory alone, the business evaluates demand growth, supplier lead time, inventory variability, purchasing policy and cash exposure together before approving the purchase.

This produces a recommendation that is both operationally and financially defensible.

---

## Formula Reference

<details>
<summary><strong>Grouped by worksheet and analytical function</strong></summary>

The workbook is intentionally designed around dynamic array formulas available in modern Microsoft Excel. Every analytical worksheet references the SKU spill range from the master configuration sheet, enabling automatic expansion when new products are added.

---

### Setup_Config

<details>
<summary>Master Data & Dynamic SKU List</summary>

#### Purpose

Maintain one authoritative source for all static planning parameters.

Fields include:

- SKU
- Product Name
- Supplier
- Lead Time
- MOQ
- Service Level
- Unit Cost
- Selling Price

---

#### Dynamic SKU Spill

```excel
=FILTER(B2:B100,B2:B100<>"")
```

**Purpose**

Creates a dynamic SKU list.

Every downstream worksheet references this spill range instead of fixed row numbers.

Benefits

- No formula copying
- Automatic workbook expansion
- No maintenance when adding products

</details>

---

### Sales_Import

<details>
<summary>Historical Sales Aggregation</summary>

#### 30-Day Average Sales

```excel
=MAP(
E2#,
LAMBDA(sku,
IFERROR(
SUMIFS(C:C,B:B,sku,A:A,">="&TODAY()-30)/30,
0)))
```

Purpose

Calculates recent average daily sales.

---

#### 90-Day Average Sales

```excel
=MAP(
E2#,
LAMBDA(sku,
IFERROR(
SUMIFS(C:C,B:B,sku,A:A,">="&TODAY()-90)/90,
0)))
```

Purpose

Represents long-term demand baseline.

Why both are needed

| Metric | Operational Meaning |
|---------|--------------------|
| 30 Day | Current demand momentum |
| 90 Day | Stable historical demand |

Comparing them identifies acceleration or decline.

</details>

---

### Inventory_Status

<details>
<summary>Available Inventory</summary>

```excel
=B2#+C2#
```

Purpose

Combines:

- On-Hand Inventory
- Inventory In Transit

Operational Note

Ignoring inventory already in transit commonly causes duplicate purchasing.

</details>

---

### Forecast_Engine

<details>
<summary>Demand Forecasting</summary>

#### Trend Factor

```excel
=IFERROR(
XLOOKUP(...)
/
IF(
XLOOKUP(...)=0,
1,
XLOOKUP(...)
),
1)
```

Concept

```
30 Day Average
──────────────
90 Day Average
```

Interpretation

| Trend Factor | Meaning |
|--------------|---------|
| >1 | Growing demand |
| =1 | Stable demand |
| <1 | Declining demand |

---

#### Forecast Daily Demand

```excel
=B2#*C2#*D2:D100
```

Equivalent

```
Forecast

=

Base Daily Sales

×

Trend

×

Promotion Multiplier
```

Purpose

Transforms historical demand into operational purchasing demand.

</details>

---

### Inventory_Planner

<details>
<summary>Safety Stock & Purchasing Logic</summary>

---

#### Lead-Time Demand

```excel
=B2#*C2#
```

Formula

```
Lead-Time Demand

=

Forecast Daily Demand

×

Lead Time
```

---

#### Sales Standard Deviation

```excel
=MAP(
A2#,
LAMBDA(
sku,
IFERROR(
STDEV.S(
FILTER(
Sales_Import!C:C,
Sales_Import!B:B=sku)),
0)))
```

Purpose

Measures historical sales volatility.

---

#### Z Score

```excel
=MAP(
A2#,
LAMBDA(
sku,
NORM.S.INV(
XLOOKUP(
sku,
Setup_Config!A2#,
Setup_Config!G2#))))
```

Converts desired service level into statistical protection.

Example

| Service Level | Z Score |
|--------------|---------|
|90%|1.28|
|95%|1.65|
|97.5%|1.96|
|99%|2.33|

---

#### Safety Stock

```excel
=ROUND(
F2#*E2#*SQRT(B2#),
0)
```

Formula

```
Safety Stock

=

Z

×

σ

×

√Lead Time
```

Purpose

Protects against demand variability during replenishment.

---

#### Reorder Point

```excel
=ROUND(
D2#+G2#,
0)
```

Formula

```
ROP

=

Lead-Time Demand

+

Safety Stock
```

Purpose

Defines when purchasing should begin.

---

#### Purchase Recommendation

```excel
=MAP(
A2#,
LAMBDA(
sku,
IF(
Available<=ROP,
"ORDER NOW",
"OK")))
```

Purpose

Creates an operational purchasing signal.

---

#### Suggested Purchase Quantity

```excel
=MAP(
A2#,
LAMBDA(
sku,
LET(
avail,...,
rop,...,
moq,...,
daily,...,
ss,...,
target_need,
(daily*30)+ss-avail,
IF(
avail<=rop,
MAX(moq,
CEILING(target_need,10)),
0))))
```

Purpose

Produces a purchase quantity that:

- satisfies MOQ
- restores inventory
- rounds operationally
- prevents under-ordering

</details>

---

### Cash_Flow_Impact

<details>
<summary>Inventory Finance</summary>

---

#### Inventory Value

```excel
On Hand Quantity

×

Unit Cost
```

Excel

```excel
=XLOOKUP(...)
*
XLOOKUP(...)
```

---

#### Purchase Commitment

```excel
Suggested Qty

×

Unit Cost
```

Purpose

Shows required purchasing capital before placing orders.

---

#### Inventory Turns

```excel
Annual Sales
────────────
Current Inventory
```

Excel

```excel
=ROUND(
sales_annual/on_hand,
1)
```

Purpose

Measures inventory efficiency rather than inventory size.

</details>

---

### Dashboard

<details>
<summary>Executive KPIs</summary>

#### Red Alert Count

```excel
=COUNTIF(
Inventory_Planner!J2#,
"ORDER NOW")
```

---

#### Total Purchase Commitment

```excel
=SUM(
Cash_Flow_Impact!C2#)
```

---

#### Inventory Value

```excel
=SUM(
Cash_Flow_Impact!B2#)
```

---

#### Dynamic Purchase List

```excel
=FILTER(
HSTACK(...),
Inventory_Planner!J2#="ORDER NOW",
"All inventory healthy")
```

Purpose

Automatically produces a purchasing action list containing

- SKU
- Product Name
- Suggested Quantity
- Estimated Purchasing Cost

without manual filtering.

</details>

</details>

---

## Validation Rules

<details>
<summary><strong>Input validation and error handling</strong></summary>

| Field | Validation Rule | Error Behavior |
|------|-----------------|----------------|
| SKU | Cannot be blank and must be unique | Row excluded from calculations |
| Lead Time | Integer greater than zero | Forecast unavailable |
| MOQ | Positive integer | Purchase recommendation disabled |
| Service Level | Between 50% and 99.9% | Z Score cannot be calculated |
| Unit Cost | Greater than or equal to zero | Cash analysis returns zero |
| Selling Price | Greater than zero | Margin analysis unavailable |
| Sales Date | Valid calendar date | Record ignored |
| Sales Quantity | Cannot be negative | Record excluded |
| On-Hand Inventory | Greater than or equal to zero | Inventory warning generated |
| In-Transit Inventory | Greater than or equal to zero | Available inventory adjusted |
| Promotion Multiplier | Recommended range 0.5–3.0 | Outside range highlighted for review |
| Forecast Daily Demand | Must not be negative | Purchasing recommendation suppressed |
| Safety Stock | Automatically floored at zero | Negative values prevented |
| Reorder Point | Always recalculated | Manual editing discouraged |
| Suggested Purchase Quantity | Cannot be below MOQ when purchasing is required | Automatically rounded upward |

</details>

</details>

---

# Other Tools in This Series

This workbook is part of a growing collection of lightweight operational decision-support tools built for teams that need better decisions without implementing enterprise software.

Examples include:

- **Cash Flow Forecast Control Tower** — Monitor liquidity, operating cash flow, and funding requirements.
- **Marketing Budget Allocation Planner** — Allocate advertising spend across channels using measurable return thresholds.
- **Construction Cost Control Dashboard** — Compare project budgets, commitments, invoices, and remaining contingencies.
- **Procurement Spend Analysis Toolkit** — Track supplier performance, purchasing concentration, and contract utilization.
- **Sales Performance Intelligence Dashboard** — Monitor revenue trends, margin performance, and customer concentration.

All tools follow the same principles:

- No signup required
- No installation required
- Browser and Excel editions
- Lightweight decision-support instead of enterprise replacement
- Built around repeatable analytical workflows rather than static reporting


---

# License

Licensed under the **Apache License 2.0**.

You are free to:

- Use this project commercially.
- Modify and extend the workbook.
- Distribute original or modified versions.
- Incorporate the analytical framework into your own workflows.

Subject to the terms and conditions of the Apache License 2.0.

See the LICENSE file for the complete license text.

---

## Acknowledgements

This project was built from recurring inventory planning challenges observed across direct-to-consumer brands, ecommerce businesses, and supply chain teams that required better purchasing decisions without implementing enterprise resource planning systems.

The objective is not to replace ERP or MRP platforms.

The objective is to make better operational decisions using the data organizations already have.

If this project helps improve your planning process, contributions, suggestions, and feedback are always welcome.
