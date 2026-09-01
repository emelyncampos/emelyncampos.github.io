# Childcare Signals Delivery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Founding Access delivery model operational and customer-facing: current issue after purchase + next three weekly issues, tracked manually during validation.

**Architecture:** Keep payment in Stripe, customer-facing information in the existing static site, and all fulfillment operations inside the existing `Childcare Signals — Phase 1 Execution` Google Sheet. Do not add accounts, webhooks, subscription logic, or a customer portal. One canonical paid Texas issue is produced per week and distributed to every active buyer who still has entitlement remaining.

**Tech Stack:** GitHub Pages static HTML/CSS, Stripe Payment Links, Google Sheets, manual email delivery.

**Spec:** `docs/superpowers/specs/2026-09-01-childcare-signals-delivery-design.md`

## Global Constraints

- Product: `Texas Childcare Signals — Founding Access`.
- Price: `US$49 one-time`.
- Entitlement: current published paid Texas issue + next 3 weekly issues.
- No auto-renewal.
- Publishing cadence: one canonical paid Texas issue each Tuesday.
- Delivery remains manual/semi-manual during validation.
- Do not claim verified week-over-week diff until raw snapshots are persisted consistently.
- Construction evidence must not be presented as proof of opening, licensure, procurement intent, vendor need, or guaranteed opportunity.
- Production Stripe Payment Link remains `https://buy.stripe.com/14A3cvdBH51xfy84Od6wE00`.
- Public Sample Issue #001 remains a sample and must not be treated as the paid current issue.

---

### Task 1: Align the offer and post-purchase copy

**Files:**
- Modify: `childcare-signals/index.html`
- Modify: `childcare-signals/welcome/index.html`
- Modify: `childcare-signals/support/index.html`
- Modify: `childcare-signals/terms/index.html`
- Modify: `childcare-signals/privacy/index.html`
- Verify unchanged where appropriate: `childcare-signals/refund-policy/index.html`

**Interfaces:**
- Consumes: approved entitlement rule from the spec.
- Produces: one consistent customer-facing promise across landing, welcome, support, terms, and privacy.

- [ ] **Step 1: Record the stale-copy assertions**

Before editing, verify these phrases are present in the relevant files and therefore need replacement:

```text
Your four-week Texas Childcare Signals founding pilot is confirmed.
You’ll receive four Texas briefs over approximately four weeks.
Founding Access includes four Texas briefs delivered over approximately four weeks.
one-time, four-week B2B information service
Four briefs are delivered over approximately four weeks
to deliver the four-week founding pilot
```

Expected: each stale phrase is found in the current source shown in the spec audit.

- [ ] **Step 2: Update landing offer bullet**

In `childcare-signals/index.html`, replace the price-card bullet:

```html
<li>4 weekly Texas briefs</li>
```

with:

```html
<li>Current Texas brief + next 3 weekly issues</li>
```

Do not change the price, CTA, checkout URL, no-auto-renewal statement, or signal-volume disclaimer.

- [ ] **Step 3: Update welcome copy**

Use this hero paragraph:

```html
<p>Your Texas Childcare Signals Founding Access is confirmed. We’ll use the email associated with your purchase for delivery and service messages.</p>
```

Use this `What happens next` paragraph:

```html
<p>Your Founding Access includes the current Texas brief, delivered promptly to the email used at checkout, plus the next three weekly issues on the normal Childcare Signals release schedule. Each brief contains selected public-source childcare market-entry signals that have been manually reviewed before delivery.</p>
```

Keep the limitation and support sections intact.

- [ ] **Step 4: Update support delivery language**

Replace the `Delivery questions` paragraph with:

```html
<p>Founding Access includes the current Texas brief plus the next three weekly issues, delivered to the email associated with the purchase. If you believe a brief was missed, contact support and we will review the delivery record.</p>
```

- [ ] **Step 5: Update Pilot Terms sections 1 and 2**

Section 1 first paragraph becomes:

```html
<p>Texas Childcare Signals — Founding Access is a one-time B2B information service. It includes the current published Texas brief plus the next three weekly issues, each containing selected childcare market-entry signals identified from public sources and manually reviewed before delivery.</p>
```

Section 2 first paragraph becomes:

```html
<p>Delivery begins after payment confirmation. The current published issue is delivered promptly to the email address associated with the purchase and counts as the first of four issues. The next three issues are delivered on the normal weekly Childcare Signals release schedule.</p>
```

Keep the existing signal-volume limitation and all sections 3–10 unchanged.

- [ ] **Step 6: Update privacy wording**

Replace:

```html
<li>To deliver the four-week founding pilot and related service messages.</li>
```

with:

```html
<li>To deliver the four-issue Founding Access and related service messages.</li>
```

- [ ] **Step 7: Verify customer-facing consistency**

Re-fetch all modified files and verify:

```text
Expected present:
current Texas brief
next three weekly issues
US$49
https://buy.stripe.com/14A3cvdBH51xfy84Od6wE00
No auto-renewal / no automatic renewal

Expected absent:
four briefs over approximately four weeks
four-week B2B information service
four-week founding pilot
```

- [ ] **Step 8: Commit**

Commit message:

```text
feat: align Childcare Signals delivery promise
```

---

### Task 2: Build the internal fulfillment tracker

**File:**
- Modify Google Sheet: `Childcare Signals — Phase 1 Execution` (`1GpvIHF6Fe14aB7YStGYE2eaR5YOYMHe77Jk0T2K0CWQ`)
- Create sheet tab: `Delivery Tracker`

**Interfaces:**
- Consumes: successful Stripe purchase details and the canonical paid issue number.
- Produces: authoritative record of buyer entitlement and delivery count.

- [ ] **Step 1: Create the tab and header row**

Create `Delivery Tracker` with these columns in row 1:

```text
Buyer Name | Email | Company | Stripe Reference | Purchase Date | Start Paid Issue | Issue 1 Status | Issue 1 Sent At | Issue 2 Status | Issue 2 Sent At | Issue 3 Status | Issue 3 Sent At | Issue 4 Status | Issue 4 Sent At | Entitlement Status | Refund Status | Notes
```

- [ ] **Step 2: Freeze and format the header**

Freeze row 1, enable wrapping, and make the header visually distinct using the spreadsheet’s existing professional formatting conventions.

- [ ] **Step 3: Define allowed operational values**

Use these exact status labels operationally:

```text
Issue status: pending | sent | skipped_refund
Entitlement status: paid_pending_first_delivery | active_1_of_4 | active_2_of_4 | active_3_of_4 | complete_4_of_4 | refunded
Refund status: none | requested | refunded
```

Add a short note above or beside the working table only if needed; do not add complex formulas or automation.

- [ ] **Step 4: Verify the tracker is usable**

Read back `Delivery Tracker!A1:Q5` and verify all 17 headers are present in the intended order and the tab is empty below the header except for any operational legend explicitly added.

---

### Task 3: Build weekly release QA and email templates

**File:**
- Modify Google Sheet: `Childcare Signals — Phase 1 Execution`
- Create sheet tab: `Weekly Release QA`
- Create sheet tab: `Delivery Emails`
- Modify existing tab: `Offer & Payment`

**Interfaces:**
- Consumes: one canonical paid Texas issue per week.
- Produces: repeatable pre-send QA and reusable delivery messages.

- [ ] **Step 1: Create `Weekly Release QA`**

Use these columns:

```text
Paid Issue | Issue Date | Release Status | Signal Count | Raw Snapshot Persisted? | Official Sources Working? | Stage Wording Verified? | Dates & Costs Checked? | Duplicates Removed? | Buyer Fit Framed Safely? | Disclaimer Included? | Structured File Ready? | Active Buyers Checked? | Delivery Sent? | Notes
```

Allowed `Release Status` values:

```text
drafting | qa | ready | sent
```

The release cannot be marked `ready` unless the substantive QA columns have been checked manually.

- [ ] **Step 2: Add the snapshot warning**

Add a prominent operational note in `Weekly Release QA`:

```text
Do not describe an issue as a verified “changes since last week” feed unless both relevant raw snapshots were persisted and the row-level diff was actually computed. Current manually reviewed market-entry signals are allowed without that claim.
```

- [ ] **Step 3: Create `Delivery Emails` with three reusable templates**

Create columns:

```text
Template | Subject | Body
```

Add template `FIRST DELIVERY`:

Subject:

```text
Your first Texas Childcare Signals brief
```

Body:

```text
Hi {{first_name}},

Thanks for joining Texas Childcare Signals — Founding Access.

Your current Texas brief is attached/linked here: {{issue_link_or_attachment}}

This is delivery 1 of 4. Your next three issues will arrive on the normal weekly Childcare Signals release schedule.

Each signal is based on public-source evidence and manually reviewed before delivery. Please re-verify the current source before outreach or any material business decision; a signal does not establish opening, procurement status, purchase intent, or guaranteed opportunity.

If anything looks wrong or you have a question, reply to this email.

See it earlier.
Childcare Signals
```

Add template `WEEKLY DELIVERY`:

Subject:

```text
Texas Childcare Signals — {{paid_issue}}
```

Body:

```text
Hi {{first_name}},

Your new Texas Childcare Signals brief is ready: {{issue_link_or_attachment}}

This is delivery {{delivery_number}} of 4 in your Founding Access.

The brief contains selected public-source market-entry signals that were manually reviewed before delivery. Please re-verify current source status before outreach or material business decisions.

Questions or corrections are welcome — just reply to this email.

Childcare Signals
See it earlier.
```

Add template `COMPLETION`:

Subject:

```text
Your Childcare Signals Founding Access is complete
```

Body:

```text
Hi {{first_name}},

You’ve now received all 4 Texas Childcare Signals issues included in your Founding Access.

There is no automatic renewal and nothing you need to cancel.

If the briefs were useful, I’d value a short reply with what helped most, what felt unnecessary, and whether you would want continued access if Childcare Signals becomes an ongoing service.

Thank you for being part of the founding pilot.

Childcare Signals
See it earlier.
```

- [ ] **Step 4: Update `Offer & Payment` delivery definition**

Update/add the delivery rule so the sheet explicitly says:

```text
Entitlement: Current published paid Texas issue + next 3 weekly issues.
First delivery: Promptly after payment confirmation.
Following deliveries: Normal Tuesday release cadence.
Public Sample Issue #001 is a sample only and does not count as the buyer’s paid issue.
```

Keep `US$49 one-time`, Stripe Payment Link, no auto-renewal, and manual delivery decision unchanged.

- [ ] **Step 5: Verify operational tabs**

Read back the header and template ranges for all three operational tabs and verify:

```text
Delivery Tracker exists
Weekly Release QA exists
Delivery Emails contains FIRST DELIVERY, WEEKLY DELIVERY, COMPLETION
Offer & Payment contains current + next 3 wording
```

---

### Task 4: Production go-live gate

**Files / systems:**
- Read: `childcare-signals/index.html`
- Read: `childcare-signals/sample/index.html`
- Read: `childcare-signals/welcome/index.html`
- Read: Stripe production Payment Link configuration
- Read: `Childcare Signals — Phase 1 Execution`

**Interfaces:**
- Consumes: Tasks 1–3.
- Produces: explicit go/no-go checklist for accepting the first real Founding Access buyer.

- [ ] **Step 1: Verify the production checkout URL**

Confirm every live `Get Founding Access` CTA still uses:

```text
https://buy.stripe.com/14A3cvdBH51xfy84Od6wE00
```

Verify no `/test_` Stripe URL exists in production site files.

- [ ] **Step 2: Verify the public sample is clearly a sample**

Confirm `childcare-signals/sample/index.html` remains labeled `Public sample · Texas` / `Sample Issue #001` and is not described as the current paid issue.

- [ ] **Step 3: Enforce first-paid-issue readiness**

Before outbound acquisition or deliberately sending traffic to the paid CTA, require one distinct canonical paid issue to exist and pass `Weekly Release QA`.

The first paid issue must not simply resend the public Sample Issue #001 as the paid deliverable.

- [ ] **Step 4: Verify the first-sale manual runbook**

A first sale is operationally ready only if the operator can execute this sequence without improvising:

```text
1. Confirm payment in Stripe.
2. Add buyer to Delivery Tracker as paid_pending_first_delivery.
3. Send current paid issue using FIRST DELIVERY template.
4. Mark Issue 1 sent and status active_1_of_4.
5. On each Tuesday, send new paid issue to active buyers with entitlement remaining.
6. Increment delivery status after each successful send.
7. After delivery 4, mark complete_4_of_4 and send COMPLETION template.
8. If refunded, mark refunded and stop future delivery.
```

- [ ] **Step 5: Final verification**

Go-live is `GO` only when all are true:

```text
[ ] Live checkout tested previously and still points to production URL
[ ] Welcome / support / terms / privacy match the 4-issue model
[ ] Delivery Tracker exists
[ ] Weekly Release QA exists
[ ] Email templates exist
[ ] A distinct current paid issue exists and passed QA
[ ] Public sample is not being sold as the paid issue
[ ] No verified weekly-diff claim is made without persisted snapshots
```

If the paid issue is not ready, status is `CONDITIONAL GO`: payment infrastructure is ready, but acquisition should wait until the first deliverable exists.
