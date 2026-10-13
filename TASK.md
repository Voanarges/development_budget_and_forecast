# Take-home task: Development Budget / Cost Forecast

## Context

You are working on a financial product for a real-estate development company.

The company has a construction project with an approved budget, broken down into cost lines.

For example:

- Land
- Construction
- Concrete
- Electrical
- Architecture
- Marketing

As the project progresses, the company enters into agreements with contractors, takes on financial obligations, and incurs actual costs.

The CFO wants to understand:

- the current state of the project budget;
- how much money has actually been spent so far;
- which costs and obligations already exist;
- what the final cost of the project is likely to be;
- which cost lines are expected to go over budget.

## Task

Within **3 hours**, build an MVP that solves this problem.

We intentionally do not prescribe the screens, the domain model, the API, or the application architecture.

Decide for yourself:

- which entities are needed;
- what data needs to be stored;
- which metrics are worth calculating;
- how the user will interact with the system;
- what functionality is the minimum required for the MVP;
- what should be left out of the current iteration.

The main goal is a small but complete, working product scenario that can be demonstrated to a user.

## Technology stack

The repository contains a minimal skeleton: Next.js (App Router, TypeScript) + Prisma + PostgreSQL. How to run it is described in `README.md`.

You may add libraries and change the project structure if you consider it justified.

## AI tools

Using AI tools is allowed and encouraged.

You may use Claude Code, Codex, Cursor, ChatGPT, or any other tools the way you use them in your normal work.

There are no restrictions on how you use AI.

## How to run the work

For the duration of the task, GitHub is your ticket system: branches, commits, pull requests, issues. Write in them whatever you consider necessary.

Commit everything you create for the work, including instructions for AI agents.

Do not rewrite history: no squash, no force-push.

## Time limit

You have **at most 3 hours** for the task.

When the three hours are up, stop working in whatever state the project is in, then commit and push the result.

Do not try to bring the project to a perfect state beyond the timebox.

If part of the functionality did not make it into the MVP, you can describe it in `SOLUTION.md`.

## Expected result

The repository should contain a project that can be run locally and demonstrated.

Ideally, the main user scenario can be completed without manually changing the source code or the data.

The key business logic should be covered by automated tests.

Pay particular attention to correct handling of money values and calculations.

## SOLUTION.md

Add a short `SOLUTION.md`.

Describe in it:

- what has been implemented;
- the main assumptions;
- the key technical or architectural decisions;
- what was deliberately left out of scope;
- known limitations;
- what you would do next if you had one more working day.

Keep the document short.

## Not required

You are not expected to build a full production system in three hours.

In particular, the following are not required:

- authentication and authorization;
- multiple currencies;
- a complex multi-tenant model;
- bank integrations;
- production deployment;
- an audit log;
- a full approval workflow;
- a complex design system;
- pixel-perfect UI;
- enterprise infrastructure.

If you consider any of these important for your solution, you may implement it, but it is not a requirement.

## After you finish

After submission there will be a separate call with the team.

During the call you will need to:

- run the application;
- show the resulting MVP;
- explain the main decisions;
- describe what you managed to do in three hours;
- describe what you left out of the current version and why.

Think of it as a short product demo followed by a technical review.
