# Owner-Authenticated Vercel Deployment

## Context

Vercel blocked a production deployment because collaborator `willziheng` authored the GitHub commit but that GitHub identity is not linked to a Vercel account. The repository owner and Vercel project owner is `RuikangWNemo` / `ruikangwnemo`.

## Goals

- Restore production with an owner-authored commit.
- Preserve every collaborator's real Git authorship.
- Deploy every push to `main` using credentials owned by `ruikangwnemo`.
- Prevent duplicate blocked deployments from Vercel's native Git integration.
- Keep credentials out of the repository.

## Approved Design

1. Refresh local `main` from `origin/main` while preserving the unrelated `.DS_Store` modification.
2. Create and push an owner-authored recovery commit.
3. Create a scoped Vercel token for the `ruikangwnemo` account.
4. Store the token as the GitHub Actions secret `VERCEL_TOKEN`.
5. Store `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` as repository variables.
6. Add `.github/workflows/deploy-vercel.yml`, triggered by pushes to `main` and manual dispatch.
7. The workflow checks out the exact commit, installs dependencies, pulls production configuration, builds with Vercel, and deploys the prebuilt output to production.
8. Set `git.deploymentEnabled` to `false` in the root `vercel.json`, making GitHub Actions the only automatic deployment path.

## Deployment Data Flow

`push to main` → `GitHub Actions` → `Vercel CLI authenticated by RuikangWNemo token` → `site production project`

The source commit retains the collaborator's author. Deployment authorization is independent and belongs to the repository/Vercel owner.

## Failure Handling

- GitHub Actions stops on install, pull, build, or deploy errors.
- Secrets are referenced by name and never printed or committed.
- GitHub Actions concurrency cancels stale in-progress deploys when a newer `main` commit arrives.
- Native Vercel Git deployment is disabled only after the Actions credentials are configured.

## Verification

- Run the local site check and production build before pushing workflow changes.
- Confirm the recovery deployment reaches `READY`.
- Confirm the GitHub Actions workflow succeeds for the configuration commit.
- Confirm the production URL responds successfully and runtime error scan is clean.
