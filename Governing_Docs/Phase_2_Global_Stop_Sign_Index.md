# Phase 2: Global Stop-Sign Index (Updated for Feature-First Specs)

Status: Binding
Last updated: 2026-01-28

## 0. Purpose

Stop-signs define conditions under which work must halt.

Update intent: incorporate feature-first execution, and prevent agents from compensating for missing feature specs by inference.

## 1. Stop-sign format (normative)

Each stop-sign must include:

- identifier (SS-nn)
- trigger condition
- required agent behaviour (halt + escalation)
- permitted next steps (if any)

## 2. Canonical stop-signs (normative)

SS-01 Semantic ambiguity
Trigger: A term, requirement, or acceptance criterion is undefined or ambiguous in the feature bundle and cannot be resolved by the glossary/naming artefact.
Action: Halt. Ask the minimum clarifying questions.

SS-02 Authority conflict
Trigger: Two authoritative artefacts conflict.
Action: Halt. Identify the conflicting passages and authority tiers. Escalate.

SS-03 Missing immutable constraint mapping
Trigger: A feature bundle impacts behaviour likely governed by immutable constraints, but the bundle cites none and the mapping is unclear.
Action: Halt. Request explicit constraint mapping.

SS-04 Missing or inaccessible canonical artefact
Trigger: The agent cannot locate or access an artefact required by the authority hierarchy or the feature bundle.
Action: Halt. Do not guess filenames, paths, or substitutes.

SS-05 Inference-required implementation
Trigger: Completing the task requires inventing behaviour, requirements, UX, or policy not explicitly specified in the feature bundle or higher-tier documents.
Action: Halt. Request specification.

SS-06 Unbounded scope expansion
Trigger: Task requires touching areas outside declared scope, or introduces new requirements.
Action: Halt. Propose a reduced scope.

SS-07 Verification ambiguity
Trigger: Verification steps are missing, non-executable, or cannot be performed as specified.
Action: Halt. Request verification criteria or permitted substitutes.

SS-08 Unsafe change-control
Trigger: A change would alter immutable constraints, authority hierarchy, or governance controls without explicit authorised instruction.
Action: Halt. Escalate.

SS-09 Drift signal detected
Trigger: Document or repo reality differs from what the current canonical mapping asserts (filenames, locations, versions).
Action: Halt. Record drift per Phase 6 and request correction.

## 3. Feature-first additional stop-signs (normative)

SS-10 Feature bundle absent
Trigger: The task is feature-level work but no feature bundle exists.
Action: Halt. Create no code. Propose creation of a feature bundle first.

SS-11 Acceptance criteria absent or non-binary
Trigger: Feature bundle lacks acceptance criteria or criteria are not verifiable.
Action: Halt. Request correction before coding.

SS-12 Conflicting acceptance criteria
Trigger: Acceptance criteria conflict within a feature bundle or against global constraints.
Action: Halt. Escalate with the conflict list.

## 4. Non-proliferation rule (normative)

Do not add stop-signs for convenience. Add only when a recurrent failure mode exists and cannot be prevented by better specification.
