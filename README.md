# 🌍 DTC Inventory Planning Control Tower

### Dynamic Inventory Planning, Replenishment Decision Support, and Working Capital Optimization for Direct-to-Consumer Brands

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Inventory%20Decision%20Support-orange.svg)

**A lightweight inventory planning and purchasing decision framework that helps DTC brands balance stockout risk, working capital efficiency, and supply chain uncertainty — available free in browser and Excel formats with no installation required.**

> ## **No signup. No installation. Free.**
>
> 🌐 **Open in Browser** → [*HTML Interactive Version*](https://hyvoid.github.io/DTC-Inventory-Planning-Control-Tower/)
>
> 📥 **Download Excel** → *Excel Workbook Version*

---

# ## Screenshots

### Browser Version

<!-- screenshot: browser version -->

*Interactive inventory planning dashboard showing stock coverage, reorder alerts, forecast demand, and cash exposure across multiple supply chains.*

### Excel Version

<!-- screenshot: excel version -->

*Operational inventory control workbook showing forecasting, replenishment calculations, safety stock analysis, and purchasing recommendations.*

---

# ## What It Helps You Track

* Days of inventory coverage remaining before stockout risk emerges.
* The exact purchase date required to avoid supply interruption.
* Recommended purchase quantities based on demand forecasts and lead times.
* Inventory capital exposure versus available working capital.
* Supply chain risk differences between long-lead and short-lead suppliers.
* How changes in sales velocity affect future purchasing decisions.

---

# ## Why I Built This

Many growing DTC brands don't actually have an inventory management problem.

They have a decision-making problem.

Inventory decisions are often made using a combination of intuition, recent sales observations, and supplier experience:

```
Sales increased recently.
Inventory looks low.
Let's place a larger purchase order.
```

The problem is that DTC businesses operate under asymmetric risk.

For brands heavily dependent on paid acquisition:

* Stockouts destroy previously invested CAC.
* Excess inventory destroys working capital.
* Long lead times amplify forecasting mistakes.
* Fast growth makes historical purchasing behavior unreliable.

I repeatedly observed the same analytical failure:

> Businesses were optimizing inventory quantities without first quantifying inventory risk.

For example:

### Before

A memory foam pillow SKU sells approximately:

```
20 units/day
```

Current inventory:

```
1,500 units
```

Management concludes:

> "We have enough inventory for 75 days."

However, the actual supply chain lead time is:

```
Production:     30 days
International:  40 days
-----------------------
Total:          70 days
```

After accounting for:

* demand volatility,
* service level targets,
* safety stock,
* accelerating sales trends,

the true reorder point becomes:

```
1,850 units
```

Meaning:

> The business is already late placing its next purchase order.

This workbook productizes a practical DTC inventory planning methodology:

* Forecasting
* Safety stock management
* Reorder point planning
* Working capital optimization
* Dynamic replenishment decisions

It is not a one-off spreadsheet.

It is a reusable inventory reasoning framework that small and medium DTC brands can operate themselves.

---

# ## Common DTC Inventory Problems This Solves

| Problem                       | Without This Tool                                | With This Tool                                                   |
| ----------------------------- | ------------------------------------------------ | ---------------------------------------------------------------- |
| Long international lead times | Purchase orders placed after risk already exists | Lead-time demand and reorder timing calculated automatically     |
| Fast-changing sales velocity  | Inventory plans become obsolete within weeks     | Rolling forecasts continuously adjust purchasing recommendations |
| Safety stock decisions        | Arbitrary buffer quantities                      | Service-level-based safety stock calculations                    |
| Working capital allocation    | Inventory investment decisions made blindly      | Inventory value and cash exposure quantified                     |
| Multiple supply chains        | Same replenishment logic applied everywhere      | Separate inventory policies by supplier type                     |
| Paid acquisition dependency   | Stockouts destroy marketing ROI                  | Stockout risk identified before inventory depletion              |

---

# ## Who This Is For

This tool is designed for:

* DTC ecommerce brands with fewer than 100 SKUs.
* Founder-led ecommerce businesses.
* Inventory planners managing high-CAC products.
* Brands operating with both domestic and international suppliers.
* Businesses needing professional inventory planning without implementing ERP systems.

This tool is not designed for:

* Enterprise ERP replacement projects.
* Warehouse execution management.
* Multi-location real-time inventory synchronization.
* Manufacturing resource planning systems.

No spreadsheet expertise is required.

Open the browser version and begin planning inventory decisions immediately.

---

# ## About

I build lightweight operational decision-support systems for situations where there are too many moving parts to hold reliably in someone's head.

The question I usually start with is:

> **What information needs to exist in one place for the next business decision to be made confidently?**

The DTC Inventory Planning Control Tower is one example of that approach: taking a proven inventory management framework and packaging it into a practical tool that non-technical operators can maintain themselves.

---

# ## Technical Details

<details>
<summary>For technical reviewers, Excel practitioners, and collaborators</summary>

---

### Workbook Architecture

| Layer         | Sheet             | Purpose                                     |
| ------------- | ----------------- | ------------------------------------------- |
| Configuration | Setup_Config      | SKU master data and planning parameters     |
| Input         | Sales_Import      | Historical sales and campaign imports       |
| Input         | Inventory_Status  | Current stock, inbound inventory, PO status |
| Calculation   | Forecast_Engine   | Demand forecasting and trend adjustments    |
| Calculation   | Inventory_Planner | Safety stock and replenishment calculations |
| Calculation   | Cash_Flow_Impact  | Inventory capital analysis                  |
| Output        | Dashboard         | Decision support and risk visualization     |

Data flow:

```text
Sales History
        ↓
Demand Forecast
        ↓
Lead Time Demand
        ↓
Safety Stock
        ↓
Reorder Point
        ↓
Purchase Recommendation
        ↓
Cash Flow Analysis
        ↓
Dashboard
```

---

### Three Traps That Catch Even Experienced Inventory Managers

---

#### Trap 1 — Assuming Current Inventory Equals Inventory Coverage

A decision was made:

> "We have 75 days of inventory."

The decision relied on:

```
Coverage Days
=
Inventory / Current Sales
```

Example:

| Variable    | Value   |
| ----------- | ------- |
| Inventory   | 1500    |
| Daily Sales | 20      |
| Coverage    | 75 days |

However:

| Variable           | Value   |
| ------------------ | ------- |
| Lead Time          | 70 days |
| Safety Stock       | 450     |
| Required Inventory | 1850    |

Result:

```text
Perceived Position:
Safe

Actual Position:
Already below reorder point
```

The reasoning fails because it ignores uncertainty.

Correct approach:

```
Reorder Point
=
Lead Time Demand
+
Safety Stock
```

Decision outcome:

```
Order immediately.
```

<details>
<summary>Formula Details</summary>

```excel
Lead_Time_Demand
=
Forecast_Daily_Sales * Lead_Time

ROP
=
Lead_Time_Demand + Safety_Stock
```

</details>

---

#### Trap 2 — Applying Identical Rules to Different Supply Chains

A decision was made:

> "Maintain 60 days inventory on all products."

The unnoticed assumption:

```
Equal inventory risk.
```

Example:

| Product            | Lead Time |
| ------------------ | --------- |
| China Pillow       | 70 days   |
| Swedish Supplement | 30 days   |

Result:

```text
China inventory:
Underprotected

Swedish inventory:
Overcapitalized
```

The reasoning fails because lead-time risk differs significantly.

Correct approach:

| Supply Chain | Strategy           |
| ------------ | ------------------ |
| China        | High safety stock  |
| Sweden       | Lean replenishment |

Decision outcome:

```
Capital released while maintaining service levels.
```

<details>
<summary>Formula Details</summary>

```excel
Safety_Stock
=
Z * σ * SQRT(Lead_Time)
```

</details>

---

#### Trap 3 — Assuming Historical Sales Predict Future Demand

A decision was made:

> "Order based on last month's sales."

The unnoticed assumption:

```
Demand remains stable.
```

Example:

| Month | Sales |
| ----- | ----- |
| April | 500   |
| May   | 700   |
| June  | 1100  |

Historical average:

```
767
```

Trend-adjusted forecast:

```
1120
```

The reasoning fails because growth trends are ignored.

Correct approach:

```
Forecast
=
Historical Average
× Trend Factor
× Seasonality Factor
```

Decision outcome:

```
Earlier purchase order and larger replenishment quantity.
```

<details>
<summary>Formula Details</summary>

```excel
Forecast_Demand
=
Moving_Average
*
Trend_Adjustment
*
Seasonality_Adjustment
```

</details>

---

### Example Scenario

A DTC pillow brand operates:

| SKU               | Memory Foam Pillow |
| ----------------- | ------------------ |
| Supplier          | China              |
| Lead Time         | 70 days            |
| MOQ               | 2000 units         |
| Current Inventory | 3200 units         |
| Inbound Inventory | 1000 units         |

Historical sales:

| Period       | Daily Sales |
| ------------ | ----------- |
| Last 30 days | 34          |
| Last 60 days | 28          |

Trend growth:

```
+18%
```

Forecast calculation:

```text
Base Forecast:
34/day

Trend Adjustment:
34 × 1.18

=
40/day
```

Lead time demand:

```text
40 × 70
=
2800 units
```

Safety stock:

```text
600 units
```

Reorder point:

```text
2800 + 600
=
3400 units
```

Available inventory:

```text
3200 + 1000
=
4200 units
```

Coverage:

```text
4200 / 40
=
105 days
```

Interpretation:

* Immediate stockout risk is low.
* Reorder trigger will occur within approximately 20 days.
* Purchase planning should begin now because supplier lead time dominates risk exposure.

Recommended action:

```text
Status:
ORDER SOON

Suggested PO:
2,400 units
```

---

### Formula Reference

<details>
<summary>Forecast Engine</summary>

```excel
30-Day Moving Average
=AVERAGE()

60-Day Moving Average
=AVERAGE()

Trend Factor
=Current/Previous

Forecast
=
Historical Average
*
Trend
*
Seasonality
```

</details>

<details>
<summary>Inventory Planning</summary>

```excel
Lead Time Demand
=
Forecast × Lead Time

Safety Stock
=
Z × σ × SQRT(Lead Time)

ROP
=
Lead Time Demand + Safety Stock

Suggested PO
=
Forecast Demand
+
Safety Stock
− Inventory
− Inbound
```

</details>

<details>
<summary>Cash Flow</summary>

```excel
Inventory Value
=
Quantity × Unit Cost

Inventory Turns
=
COGS / Average Inventory

Working Capital
=
Inventory + Open PO
```

</details>

---

### Validation Rules

| Field              | Rule       | Error Behavior            |
| ------------------ | ---------- | ------------------------- |
| Lead Time          | >0         | Reject calculation        |
| MOQ                | ≥0         | Warning                   |
| Daily Sales        | ≥0         | Reject forecast           |
| Service Level      | 80%–99.9%  | Validation error          |
| Safety Factor      | >0         | Warning                   |
| Unit Cost          | >0         | Reject financial analysis |
| Inventory Quantity | ≥0         | Reject replenishment      |
| Inbound Inventory  | ≥0         | Warning                   |
| Forecast Horizon   | 7–365 days | Validation error          |

</details>

---

# ## Other Tools in This Series

* **DTC Inventory Optimization Console** — Inventory allocation and replenishment planning.
* **Shopify Marketing Attribution Dashboard** — CAC and campaign profitability analysis.
* **VAT Compliance Control Center** — Cross-border ecommerce tax calculations.
* **Procurement Cash Flow Planner** — Purchase timing and liquidity management.
* **Operational KPI Control Tower** — Executive operational monitoring framework.

More tools available via GitHub profile and project releases.

---

# ## License

This project is licensed under the **Apache License 2.0**.

You are free to use, modify, distribute, and adapt this work under the terms of the Apache License 2.0.
