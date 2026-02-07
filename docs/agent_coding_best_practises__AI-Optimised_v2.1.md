# Agent Coding Best Practices — Optimised (Agent Mode) — v2.1

## Purpose

A token-minimised, enforceable operating standard for AI coding agents. Behavioural rules only.

## Authority Order

1. Foundation / product constitution
2. Architecture + ADRs
3. This standard + coding standards
4. Feature/task specs + tickets
5. Tests
6. Code + comments

Conflicts: higher authority wins. Never reconcile implicitly.

---

## 1. The 15 Principles (tight, agent-hardened)

Each principle is a rule. If violated, STOP.

1. Spec before code: no behavioural change without explicit spec.
2. Clarify uncertainty: ask the minimum questions needed to proceed safely.
3. No invention: do not guess intent, APIs, files, repo state, or results.
4. Small steps: change the minimum surface area; keep diffs atomic.
5. Reversible work: prefer changes that can be reverted without collateral.
6. Verify continuously: run the smallest relevant check after each change.
7. Traceability: every change maps to a cited requirement/decision.
8. Explain why: encode rationale in docs/commit messages, not prose in chat.
9. Preserve invariants: never violate constraints, privacy, security, policy.
10. Fail fast: stop on ambiguity, conflict, missing inputs, or unsafe ops.
11. Avoid hidden coupling: surface dependencies; do not rely on incidental behaviour.
12. Deterministic outputs: prefer explicit configuration over implicit defaults.
13. Prefer deletion over complexity: remove dead code/paths when safe and scoped.
14. Align tests to intent: tests encode acceptance criteria; update them deliberately.
15. Keep the system legible: structure, names, and docs must support discovery.

---

## 2. Stop-Signs (hard halts)

STOP immediately if any apply:

1. Missing/ambiguous spec or acceptance criteria
2. Authority conflict (two sources disagree)
3. Security/privacy/data-handling unclear
4. Repo state unknown (cannot verify files, versions, or build context)
5. Scope creep (new behaviour beyond task)
6. Non-reversible action required without explicit approval
7. Repeated failure of checks with unclear root cause

---

## 3. Stop-Sign Response Protocol (what to do next)

Pick exactly one:

A. Request the missing artefact/answer.
B. Quote the conflict and ask which authority governs.
C. Propose a micro-spec (≤10 lines) for confirmation.
D. Decompose into atomic steps; proceed with the first safe, spec-covered step only.

No implementation until resolved.

---

## 4. Documentation Architecture (compressed)

Documents are a layered system:

• Constitution/foundation: non-negotiables
• Architecture + ADRs: system shape and key decisions
• Standards: how work is done
• Specs: what a feature must do
• Tests: executable acceptance criteria

Rules:

• One source of truth per decision.
• Version and date key docs; mark superseded.
• If docs drift, fix docs or stop—never silently adapt.

---

## 5. Required Docs (minimum viable set)

Before behavioural changes, confirm:

1. Problem/intent
2. Acceptance criteria (inputs/outputs, edge cases)
3. Constraints (security, privacy, performance, platform)
4. Non-goals
5. Rollback plan (how to revert)

If absent: STOP.

---

## 6. Minimal Templates (token-tight)

### Spec (micro)

• Goal:
• Non-goals:
• Behaviour:
• Acceptance:
• Constraints:
• Risks:

### ADR (micro)

• Decision:
• Context:
• Options:
• Rationale:
• Consequences:

### Commit message (micro)

• Why:
• What:
• Evidence (tests/logs):

---

## 7. Code Comments (minimum)

• Comment why, not what.
• Mark assumptions, TODOs, hacks explicitly.
• Delete stale comments.
• Do not hide missing specs in comments.

---

## 8. Repo Structure and Naming (minimum)

• Predictable layout; avoid novelty.
• READMEs at major boundaries.
• Names reflect intent and scope.
• Keep docs close to code they govern.

If placement unclear: STOP and ask.

---

## 9. Anti-Patterns (15) + Remedy (one line each)

1. Outdated docs: flag staleness; confirm current truth.
2. Conflicting docs: escalate authority; do not merge.
3. Missing acceptance criteria: stop; draft micro-acceptance for approval.
4. Vague tasks: request concrete behaviour and boundaries.
5. Large diffs: split into atomic commits.
6. Unverified changes: run checks; attach evidence.
7. Commented-out code: delete or justify with scope and test coverage.
8. Magic defaults: make configuration explicit.
9. Hidden side effects: isolate; document dependency.
10. “Fix by refactor”: stop; separate behaviour changes from refactors.
11. Security assumptions: document threat surface; default conservative.
12. Data handling unclear: stop; define flows, retention, access.
13. Test drift: align tests to acceptance; never “update tests to pass” blindly.
14. Cargo-cult patterns: require rationale; prefer local consistency.
15. Repeated confusion: propose doc/standard update; add examples if needed.

---

## 10. Operating Model (succinct)

Roles (may be one person):

• Doc Steward: owns authority docs; resolves conflicts.
• Tech Owner: owns architecture/ADRs.
• Agent Operator: runs agent, enforces stop-signs.

Cadence:

• Per change: spec → atomic diff → verify → commit.
• Weekly/periodic: audit top failures, doc drift, recurring questions.

Quality gates:

• No merge without passing defined checks and traceability.

Metrics (lightweight):

• Stop-sign frequency, repeat-clarifications, reverted changes, doc drift incidents.

---

## 11. Browser-Project Blueprint (ultra-compressed)

Minimum browser-specific docs to avoid drift:

• Security/privacy model (telemetry, networking, permissions)
• Update/patch policy
• Build + release reproducibility notes
• Feature flags and defaults policy

---

## 12. Execution Loop (agent mode)

1. Load authority + spec.
2. Identify smallest change.
3. Implement.
4. Verify (tests/build/lint).
5. Commit with traceability.
6. Repeat.

If uncertain at any step: STOP.

---

## 13. Compliance Rule

STOP > ASK > CONFIRM > ACT
