# Childcare Signals — Founding Access Delivery Design

Date: 2026-09-01
Status: Approved design

## Goal

Define a simple, reliable delivery model for Texas Childcare Signals — Founding Access that can be operated manually or semi-manually during validation without creating per-customer reporting schedules.

## Offer

- Product: Texas Childcare Signals — Founding Access
- Price: US$49 one-time
- Entitlement: 4 consecutive weekly issues
- No auto-renewal
- Delivery: email plus CSV/XLSX or equivalent structured file/link

## Core delivery rule

A buyer receives the **current published issue immediately after purchase**, and that issue counts as Issue 1 of 4.

The buyer then receives the next 3 weekly issues on the normal publishing schedule.

Example:

- Purchase Wednesday → current week's issue delivered immediately → next Tuesday Issue 2/4 → next Tuesday Issue 3/4 → next Tuesday Issue 4/4.
- Purchase Monday → current issue delivered immediately → next day's Tuesday release becomes Issue 2/4.

This avoids making a new buyer wait several days after payment and avoids maintaining a separate 28-day production calendar for every customer.

## Publishing cadence

- One canonical Texas issue is produced per week.
- Recommended release day: Tuesday.
- All active founding-access buyers receive the same weekly issue for that release.
- No buyer-specific issue production is required.

## Purchase-to-delivery flow

1. Buyer purchases through the production Stripe Payment Link.
2. Stripe confirms payment.
3. Buyer is redirected to `/childcare-signals/welcome`.
4. Buyer is added to the internal delivery tracker with:
   - purchase email;
   - company name when available;
   - purchase date;
   - current issue number assigned as 1/4;
   - entitlement status: active.
5. Current published issue is sent promptly by email.
6. Each Tuesday, the new canonical issue is produced, manually reviewed, and sent to all active buyers who still have remaining issues.
7. Delivery count is incremented after each successful send.
8. After Issue 4/4 is delivered, entitlement status changes to complete.
9. A short completion/follow-up email may invite feedback or a future paid plan, but no renewal occurs automatically.

## Customer-facing promise

Preferred wording:

> Founding Access includes the current Texas brief plus the next three weekly issues.

Avoid wording that implies the customer must wait four full weeks or that the service is a 28-day individualized engagement.

## Welcome-page adjustment

Replace language equivalent to:

> You'll receive four Texas briefs over approximately four weeks.

with language that explains:

- the current issue is included and delivered promptly after purchase;
- the next three issues arrive weekly;
- delivery is tied to the normal Childcare Signals publishing cadence.

## Issue structure

Each issue should preserve the stage actually established by the source and avoid overstating what a signal means.

Each signal should include, when available:

- project / center name;
- signal type;
- signal date;
- city / county;
- stage;
- relevant timing;
- project cost / size when public;
- public entity / contact details when appropriate;
- buyer-fit or relevance notes;
- confidence;
- why it matters;
- official source;
- secondary verification when available.

Construction evidence must not be presented as proof of opening, licensure, procurement intent, vendor need, or guaranteed opportunity.

## Snapshot and diff limitation

The current operational sheet notes that the initial source/schema baseline was verified but the historical raw snapshot was not persisted.

Therefore:

- do not market early issues as a verified "changes since last week" feed until persistent snapshots exist;
- issues may still contain current, manually reviewed market-entry signals;
- once raw snapshots are persisted consistently, true week-over-week diff classifications can be introduced.

## Manual / semi-manual operating model

Manual delivery is intentional during validation.

Do not build customer accounts, dashboards, subscription logic, or complex automation yet.

The minimum operating system is:

- Stripe for payment;
- internal buyer tracker;
- canonical weekly issue source;
- manual review checklist;
- email delivery;
- delivery-count tracking.

## Internal buyer states

Recommended states:

- `paid_pending_first_delivery`
- `active_1_of_4`
- `active_2_of_4`
- `active_3_of_4`
- `complete_4_of_4`
- `refunded`

The labels can be implemented in a spreadsheet or equivalent internal tracker.

## Delivery quality checks

Before sending any issue:

- every included signal has a working official source;
- stage wording matches the evidence;
- no opening/procurement claim is inferred without evidence;
- dates and dollar values are checked;
- obvious duplicates are removed;
- buyer-fit notes are framed as potential relevance, not purchase intent;
- issue date is explicit;
- the issue carries a re-verification disclaimer.

## Immediate scope

Next implementation work should focus only on:

1. updating `/welcome` copy to match the 4-issue model;
2. defining the internal buyer/delivery tracker;
3. defining the weekly issue production + review checklist;
4. defining the purchase confirmation and weekly delivery email templates;
5. validating the production Stripe link still points to the current offer.

Out of scope for the founding pilot:

- customer portal;
- automated subscription management;
- per-customer dashboards;
- real-time webhooks and delivery automation unless manual operations become a proven bottleneck;
- claims of verified weekly diff before snapshot persistence exists.
