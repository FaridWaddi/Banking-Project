# Banking-Project
Banking Project – Manual Test Plan covering Login, Customer/Account Management, Transactions &amp; Statements. Includes test strategy, scope, schedule, risks, and a sample test case for a web-based banking app.

# Banking Web App — QA Test Suite

A QA project covering a banking web application across 13 functional areas. Manual test cases are written in Google Sheets and executed as sprints through Jira + Zephyr Scale. Cypress automation is in progress — Login is fully automated, with the remaining modules being added incrementally.

> 🚧 **Status:** Active development — automation coverage expanding sprint by sprint.

---

## What It Does

This project covers the full manual testing lifecycle for a banking application: writing test cases, organizing them into Jira sprints via Zephyr Scale, executing them, and logging defects. On the automation side, Cypress is being used to convert manual cases into E2E scripts, starting with the Login flow.

---

## Functional Coverage

All 13 features have manual test cases written and executed. Automation status is noted per module.

| **Module**              | **Manual Testing**                | **Cypress Automation** | **Status**  |
| ----------------------  | -------------------------------   | ---------------------- | ----------  |
| 🔐 Login / Logout       | ✅ Test Cases Written & Executed | ✅ Completed           | ✔️ Done    |
| 👤 New Customer         | ✅ Test Cases Written & Executed | 🔄 In Progress         | 🚧 Ongoing |
| ✏️ Edit Customer        | ✅ Test Cases Written & Executed | 🔄 In Progress         | 🚧 Ongoing |
| 🗑️ Delete Customer      | ✅ Test Cases Written & Executed | 🔄 In Progress         | 🚧 Ongoing |
| 🏦 New Account          | ✅ Test Cases Written & Executed | 🔄 In Progress         | 🚧 Ongoing |
| ✏️ Edit Account         | ✅ Test Cases Written & Executed | 🔄 In Progress         | 🚧 Ongoing |
| 🗑️ Delete Account       | ✅ Test Cases Written &Executed  | 🔄 In Progress         | 🚧 Ongoing |
| 💰 Deposit              | ✅ Test Cases Written & Executed | 🔄 In Progress         | 🚧 Ongoing |
| 💸 Withdrawal           | ✅ Test Cases Written & Executed | 🔄 In Progress         | 🚧 Ongoing |
| 🔄 Fund Transfer        | ✅ Test Cases Written & Executed | 🔄 In Progress         | 🚧 Ongoing |
| 📊 Balance Enquiry      | ✅ Test Cases Written & Executed | 🔄 In Progress         | 🚧 Ongoing |
| 📄 Mini Statement       | ✅ Test Cases Written & Executed | 🔄 In Progress         | 🚧 Ongoing |
| 📑 Customized Statement | ✅ Test Cases Written & Executed | 🔄 In Progress         | 🚧 Ongoing |
| 🔑 Change Password      | ✅ Test Cases Written & Executed | 🔄 In Progress         | 🚧 Ongoing |


---

## Tech Stack

| Layer | Tool |
|---|---|
| Automation framework | [Cypress](https://www.cypress.io/) 13 |
| Language | JavaScript |
| Test case management | Google Sheets |
| Test tracking & execution | Jira + Zephyr Scale |
| Reporting | Mochawesome |
| Version control | GitHub |

---

## Project Structure

```
banking-qa/
├── cypress.config.js                  # Base URL, timeouts, retries, reporter config
├── cypress.env.json                   # Local credentials — not committed to git
├── package.json
│
└── cypress/
    ├── fixtures/
    │   └── testData.json              # All test inputs: credentials, form data, amounts
    ├── support/
    │   ├── e2e.js                     # Runs before every spec: imports & global hooks
    │   └── commands.js                # Custom commands: cy.login(), cy.navigateTo(), etc.
    └── e2e/
        ├── auth/
        │   └── login-logout.cy.js    # ✅ DONE — Login & Logout automation
        ├── customer/
        │   └── customer.cy.js        # 🔄 Planned — New / Edit / Delete Customer
        ├── account/
        │   └── account.cy.js         # 🔄 Planned — New / Edit / Delete Account
        ├── transactions/
        │   └── transactions.cy.js    # 🔄 Planned — Deposit, Withdrawal, Transfer, Balance
        └── reports/
            └── reports.cy.js         # 🔄 Planned — Statements, Change Password
```

---

## Installation

**Prerequisites:** Node.js 18+ installed.

```bash
# 1. Clone the repo
git clone https://github.com/your-username/banking-qa-cypress.git
cd banking-qa-cypress

# 2. Install dependencies
npm install

# 3. Set up local credentials (already in .gitignore — never commit this)
cp cypress.env.example.json cypress.env.json
# Open cypress.env.json and fill in your username and password

# 4. Set your app's URL
# Open cypress.config.js and update the baseUrl field
```

**`cypress.env.json` format:**
```json
{
  "ADMIN_USERNAME": "your-username",
  "ADMIN_PASSWORD": "your-password"
}
```

---

## Running Tests

```bash
# Open the interactive Cypress runner (best for writing and debugging)
npm run cy:open

# Run all automated specs headlessly
npm run cy:run

# Run only Login automation (the one that's complete)
npm run cy:run:auth

# Run by tag
npm run cy:run:smoke        # critical path only
npm run cy:run:regression   # full regression suite

# Generate HTML report
npm run cy:report
```

---

## Jira / Zephyr Sprint Mapping

| Module | Sprint | Zephyr Test Cycle |
|---|---|---|
| Login / Logout | Sprint 1 | TC-AUTH |
| Customer Management | Sprint 2 | TC-CUST |
| Account Management | Sprint 3 | TC-ACC |
| Transactions | Sprint 4 | TC-TXN |
| Reports & Settings | Sprint 5 | TC-RPT |

Test names include the TC-ID and tag so Zephyr status stays in sync with automation results.

Example: `it('@smoke TC-AUTH-001 — Valid credentials redirect to manager home')`

---

## Challenges & Learnings

### Challenges

**Writing test cases before automating them**
Starting with Google Sheets forced me to think through each scenario — inputs, expected results, edge cases — before writing a single line of Cypress code. The upfront effort made the automation phase faster because the logic was already worked out.

**Learning how Cypress handles browser dialogs**
Several banking actions (Delete Customer, Delete Account) trigger native `window.confirm` dialogs. The `cy.on('window:confirm')` listener has to be registered *before* the action that triggers it — not after. Getting that order wrong caused silent test failures that took time to trace.

**Keeping test data out of spec files**
Early on I was putting account numbers and amounts directly in test files. Moving everything to `testData.json` made tests easier to read and update — especially when the app's test data was reset and all the values changed at once.

### Learnings

**Manual testing and automation complement each other**
Writing manual test cases first gave me a clear checklist. Running them manually revealed edge cases I would have missed jumping straight to automation. The Google Sheets → Jira/Zephyr workflow kept everything traceable.

**Custom Cypress commands save a lot of repetition**
`cy.login()`, `cy.navigateTo()`, and `cy.assertSuccess()` are used in almost every spec. Writing them once in `commands.js` meant that when selectors changed, there was one place to fix — not fifteen.

**Sprint structure keeps scope honest**
Organizing test cycles by sprint in Zephyr made it clear which areas were fully tested vs. still in progress. It's easy to overestimate coverage without a structured view like that.

---

## Roadmap

- [x] Manual test cases — all 13 modules
- [x] Jira sprint setup with Zephyr Scale execution
- [x] Cypress automation — Login / Logout
- [ ] Cypress automation — Customer management
- [ ] Cypress automation — Account management
- [ ] Cypress automation — Transactions
- [ ] Cypress automation — Reports & statements
- [ ] CI/CD integration (GitHub Actions)

---

## License

MIT
