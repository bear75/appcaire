# Stripe Removal Plan

## Current Issues
- Build failing due to required Stripe environment variables
- Package manager mismatch (npm vs pnpm)
- Several deprecated package warnings

## Action Items

### 1. Remove Stripe Environment Variables
- Remove from `src/libs/Env.ts`:
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### 2. Remove Stripe Dependencies
- Update `package.json` to remove:
  - Stripe-related packages
  - Update to use pnpm consistently

### 3. Remove Stripe Components/Features
- Identify and remove Stripe-related components
- Remove billing/payment features using Stripe
- Clean up any related imports

### 4. Update Configuration
- Modify `next.config.mjs` to remove Stripe validation
- Update build configuration
- Remove any Stripe-related environment checks

### 5. Testing
- Run local build to verify changes
- Test deployment to Vercel development environment
- Verify no remaining Stripe references

### Expected Outcome
- Clean build without Stripe-related errors
- Successful deployment to Vercel
- Simplified codebase without unused Stripe functionality
