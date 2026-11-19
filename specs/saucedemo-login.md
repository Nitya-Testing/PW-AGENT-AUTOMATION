# Test Plan: SauceDemo Login

**Target:** https://www.saucedemo.com/
**Seed:** tests/seed.spec.ts
**Date:** 2026-11-19

## Overview

This plan covers the SauceDemo login page for successful authentication and the main validation and error states. All scenarios start from a fresh login page and use the same password where a password is required.

## Preconditions

- The application is reachable at https://www.saucedemo.com/.
- Each scenario starts at `/` and is independent of the other scenarios.
- The password for submitted credentials is `secret_sauce`.

## Scenarios

### Scenario 1.1 - Successful login with standard_user
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Browser is on the SauceDemo login page with empty Username and Password fields.
- **Steps:**
  1. Enter `standard_user` in the Username field - expected: the value is displayed in the Username textbox.
  2. Enter `secret_sauce` in the Password field - expected: the password value is accepted in the Password textbox.
  3. Click the Login button - expected: the browser navigates to `/inventory.html`.
- **Assertions:**
  - The inventory page heading `Products` is visible.
  - The product inventory is visible, and the URL ends in `/inventory.html`.
- **Edge cases considered:** Empty fields and other credential combinations are covered separately.

### Scenario 1.2 - Locked-out user shows locked error
- **Priority:** P0
- **Tags:** @regression @critical
- **Preconditions:** Browser is on the SauceDemo login page with empty Username and Password fields.
- **Steps:**
  1. Enter `locked_out_user` in the Username field - expected: the value is displayed in the Username textbox.
  2. Enter `secret_sauce` in the Password field - expected: the password value is accepted in the Password textbox.
  3. Click the Login button - expected: the login page remains active and an error alert appears.
- **Assertions:**
  - The alert text is `Epic sadface: Sorry, this user has been locked out.`
  - The URL remains `https://www.saucedemo.com/`.
- **Edge cases considered:** The Dismiss error control may be available and can clear the alert.

### Scenario 1.3 - Empty username submission
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Browser is on the SauceDemo login page with empty Username and Password fields.
- **Steps:**
  1. Leave the Username field empty.
  2. Enter `secret_sauce` in the Password field - expected: the password value is accepted in the Password textbox.
  3. Click the Login button - expected: the login page remains active and an error alert appears.
- **Assertions:**
  - The alert text is `Epic sadface: Username is required`.
  - The login form remains visible.
- **Edge cases considered:** Password is populated to isolate the missing-username validation.

### Scenario 1.4 - Empty password submission
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Browser is on the SauceDemo login page with empty Username and Password fields.
- **Steps:**
  1. Enter `standard_user` in the Username field - expected: the value is displayed in the Username textbox.
  2. Leave the Password field empty.
  3. Click the Login button - expected: the login page remains active and an error alert appears.
- **Assertions:**
  - The alert text is `Epic sadface: Password is required`.
  - The login form remains visible.
- **Edge cases considered:** Username is populated to isolate the missing-password validation.

### Scenario 1.5 - Invalid credentials
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Browser is on the SauceDemo login page with empty Username and Password fields.
- **Steps:**
  1. Enter `invalid_user` in the Username field - expected: the value is displayed in the Username textbox.
  2. Enter `secret_sauce` in the Password field - expected: the password value is accepted in the Password textbox.
  3. Click the Login button - expected: the login page remains active and an error alert appears.
- **Assertions:**
  - The alert text is `Epic sadface: Username and password do not match any user in this service`.
  - The inventory page is not displayed and the URL remains at the login page.
- **Edge cases considered:** An unknown username is paired with the shared valid password to verify credential mismatch handling.

## Not covered (and why)

- Other accepted users, such as `problem_user`, `performance_glitch_user`, `error_user`, and `visual_user`, are omitted because this plan is limited to the requested login scenarios.
- Dismissing the error alert is not a separate scenario because it is a UI action that does not change authentication behavior.
