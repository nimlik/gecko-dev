**Importal Foundation Document v4**

Engine decision, privacy posture, governance, and agent-executable constraints for Importal v0.1

Status: \*\*Authoritative for Importal v0.1\*\*

Supersedes: Foundation Document v3 (entirely)

Audience: Human architects and autonomous coding agents operating on the Importal codebase

\---

**\#\# 0\. Purpose and Operating Model**

This document is the \*\*supreme authority\*\* governing Importal v0.1.

It is written to be \*\*executable by autonomous agents\*\*, not merely descriptive.

Primary objectives:

\* Prevent silent scope creep

\* Enforce strict phase discipline

\* Protect privacy through architectural constraints, not promises

\* Ensure agents halt safely on ambiguity, conflict, or unknown risk

Any contradiction between this document and lower-order artefacts is a \*\*defect\*\*, unless explicitly accepted in writing.

\---

**\#\# 1\. Authority Hierarchy (Locked)**

Order of authority, highest to lowest:

1\. \*\*This Foundation Document v4\*\*

2\. Frozen Importal v0.1 spec corpus (Markdown specs)

3\. Implementation notes, build notes, comments

4\. Code reality

Rules:

\* Agents MUST NOT infer behaviour from lower authority when higher authority is silent.

\* Code that contradicts higher authority MUST be treated as a defect, not “ground truth”.

\* Agents MUST NOT introduce new guarantees, features, or subsystems without an explicit update to this document or the spec corpus.

\---

**\#\# 2\. AI Agent Operating Rules (Hard Constraints)**

These rules are mandatory and override all generic agent behaviour.

Agents MUST:

\* Not assume missing context

\* Not fabricate repo state, files, flags, or behaviour

\* Use \*\*minimum diagnostics only\*\*

\* Stop immediately on ambiguity or conflict

\* Request human input rather than “fill gaps”

Agents MUST NOT:

\* Continue work across phase boundaries without artefact proof

\* Investigate unknown network traffic autonomously

\* Expand accepted exception lists

\* Reinterpret “intent” where text is explicit

\---
 
**\#\# 3\. Conflict Resolution Protocol (Mandatory)**

On detecting conflict or ambiguity between authorities, agents MUST halt and produce a \*\*Conflict Report\*\* containing:

1\. Cited clauses (exact references)

2\. Description of the conflict or ambiguity

3\. Impacted scope and risk

4\. At least two resolution options

5\. Explicit refusal to proceed until resolved

No work may continue until a human resolves the conflict.

\---

**\#\# 4\. Phase Gating Protocol (Locked)**

Phase progression is \*\*artefact-gated\*\*, not assertion-based.

Rules:

\* Each phase has explicit allowed scope and prohibitions

\* Verification artefacts MUST exist in-repo under \`/verification/phase-X/\`

\* If required artefacts are missing, the phase is \*\*not complete\*\*

\* Agents MUST refuse to proceed unless explicitly told so 

Rollback expectation:

\* Every change must be reversible

\* Rollback instructions are part of verification, not optional

\---

**\#\# 5\. Network Posture and Telemetry Discipline (v0.1)**

\#\#\# 5.1 Zero Outbound Traffic Rule

By default, Importal v0.1 MUST exhibit:

\* \*\*Zero non-user-initiated outbound network traffic\*\*

Definition (added for agent executability):

\* \*User-initiated\* means a direct, intentional user action whose primary purpose is network access (e.g. navigating to a URL, clicking a link).

\#\#\# 5.2 Unknown Traffic Handling (Locked)

If any non-user-initiated outbound traffic is observed and not explicitly whitelisted:

\* All work MUST halt immediately

\* Agents MUST request human input

\* Agents MUST NOT attempt investigation, mitigation, or suppression

\---

**\#\# 6\. Core Behavioural Contracts (Locked)**

\#\#\# 6.1 windowType Semantics

Canonical values (case-sensitive):

\* \`main\`

\* \`taskspace\`

\* \`aux\`

windowType is a \*\*first-class behavioural boundary\*\*.

\---

\#\#\# 6.2 Main Window Behaviour

Main is a constrained browsing surface.

Rules:

\* Main may only render content matching Application Toolbar entries

\* If a URL/domain does not match, it MUST open in a new Taskspace

\* External links from Main MUST open in a new Taskspace

\* Non-admin popups or \`window.open\` calls from Main MUST open in a new Taskspace

\* Admin/system prompts MAY open in \`aux\`

\---

\#\#\# 6.3 Taskspace Behaviour

Rules:

\* Taskspaces are created \*\*only by explicit user action\*\*

\* No automatic inference or creation

\* Vertical tabs exist \*\*only\*\* in Taskspaces

\* Routing within a Taskspace MUST remain scoped to that Taskspace

\---

\#\#\# 6.4 Aux Window Behaviour

Aux is strictly limited.

Rules:

\* Used only for system/admin prompts or supporting windows

\* Aux MUST NOT silently inherit Taskspace context

\* Aux is excluded from history retention guarantees

\---

**\#\# 7\. Omnibar Behaviour (Locked)**

Rules:

\* Omnibar dropdown is \*\*history-blind by default\*\*

\* Before explicit selection, it MUST show only:

\* “Search Google”

\* “Search Importal”

Behaviour:

\* Selecting “Search Google” opens results in a new Taskspace

\* Selecting “Search Importal” loads history results in Main

\* History suggestions MUST NOT appear prior to explicit “Search Importal” selection

\* History results are organised by recency and Taskspace

\* A one-click “Open Taskspace” action MUST be present

\---

**\#\# 8\. History Truthfulness and Retention (Locked)**

Rules:

\* History is exhaustive, append-only, and lossless

\* No pruning, compression, rewriting, or summarisation at the data layer

\* Pages visited in \`main\` and \`taskspace\` are retained indefinitely

\* \`aux\` is excluded from the indefinite retention guarantee

\* \*\*Retention policy is removed entirely\*\* from v0.1 schema and specs

UI views may filter or sort, but MUST NOT alter underlying records.

\---

**\#\# 9\. Downloads Attribution (Locked)**

Rules:

\* Downloads are attributed to the initiating window (main/taskspace)

\* Downloads without explicit user gesture MUST be blocked

\* “Save As” attribution follows initiating window

\* Opening (not downloading) a file in Main opens it in a Taskspace

\* File opening is attributed to the Taskspace

\---

**10\. Execution Phases and Stop Signs (Locked, Enumerated, Agent-Executable)**

Global rules applicable to every phase

1\. Phase progression is artefact-gated. If required verification artefacts for the current phase are missing, incomplete, or not in the required location, the phase is not complete.

2\. Verification artefacts MUST be stored in-repo under:

/verification/phase-X/

3\. Agents MUST refuse to proceed to any later phase until the current phase stop sign is satisfied and artefacts exist.

4\. Every phase’s work must be minimal, reversible, and auditable.

**Phase 0 — Archive and Preserve**

Objective

Preserve any pre-v0.1 or non-compliant history (including Zen-derived work) as read-only reference. Establish a clean governance boundary.

Allowed scope

1\. Create archive tags/branches.

2\. Create repository labels/folders that clearly indicate archived, read-only status.

3\. Produce an inventory of what is archived, with pointers, not migrations.

Explicit prohibitions

1\. MUST NOT attempt incremental “Zen removal” or archaeology refactors.

2\. MUST NOT copy code from archived material into active v0.1 work unless explicitly authorised and documented as a new proposal.

3\. MUST NOT rebase v0.1 work atop archived branches.

Required verification artefacts

/verification/phase-0/ must contain:

1\. archive\_inventory.md (what was archived, where, and why)

2\. archive\_policy.md (read-only policy, usage rules, and explicit prohibitions)

Stop sign (agent refusal conditions)

Agents MUST refuse to proceed if:

1\. Archive inventory and archive policy are missing.

2\. Any non-Gecko base is being used or referenced as an implementation base.

**Phase 1 — Clean Gecko Baseline**

Objective

Establish a clean, buildable, runnable gecko-dev fork as the sole v0.1 engine base.

Allowed scope

1\. Clone/fork setup, remotes, and branch hygiene.

2\. Build enablement necessary to produce a runnable binary.

3\. Documentation of build steps and environment prerequisites.

Explicit prohibitions

1\. MUST NOT introduce Importal behaviour or UX changes.

2\. MUST NOT add telemetry hardening changes (that is Phase 2).

3\. MUST NOT introduce new subsystems, routing rules, taskspaces, omnibar changes, history changes, or UI changes beyond minimal branding required to confirm the build is runnable (branding itself is Phase 3; avoid it here).

Required verification artefacts

/verification/phase-1/ must contain:

1\. build\_repro\_steps.md (exact commands to bootstrap and build)

2\. run\_proof.md (how to launch and confirm a runnable binary)

3\. env\_fingerprint.md (OS version, toolchain versions, relevant build variables)

4\. upstream\_alignment.md (origin/upstream remotes, base commit, and divergence statement)

Stop sign (agent refusal conditions)

Agents MUST refuse to proceed if:

1\. Build is not repeatable using the documented steps.

2\. The engine base is not a clean Gecko (gecko-dev) fork.

3\. Phase 1 artefacts are missing.

**Phase 2 — Telemetry Hardening (Mandatory)**

Objective

Achieve behavioural silence: zero non-user-initiated outbound network traffic by default, with explicitly accepted residuals only.

Allowed scope

1\. Disable telemetry, reporting, experiments, and background network features via build flags, prefs defaults, and init-time guards, consistent with upstream-aligned minimal changes.

2\. Verification work to observe first-run and idle network behaviour.

3\. Documentation of what was disabled and how.

Explicit prohibitions

1\. MUST NOT remove binaries to “prove” disablement.

2\. MUST NOT do broad refactors to “prove impossibility”.

3\. MUST NOT implement kernel/network enforcement mechanisms.

4\. MUST NOT expand accepted residual list without explicit human authorisation.

5\. MUST NOT begin Importal UX or behavioural work (routing, taskspaces, sidebar, omnibar, history attribution changes).

Required verification artefacts

/verification/phase-2/ must contain:

1\. disablement\_matrix.md

\* subsystem name

\* disable mechanism (build flag / pref default / init guard)

\* file(s) and line-level pointers

\* rationale

2\. first\_run\_network\_log.md

\* tool used

\* timestamps

\* observed outbound endpoints (if any)

\* classification: user-initiated vs non-user-initiated

\* explicit statement of defects vs accepted residuals

3\. accepted\_residuals.md

\* list of explicitly accepted residual behaviours (if any)

\* authorising human statement reference

4\. patch\_or\_diff\_reference.md

\* how to reproduce the diff for telemetry hardening changes

Stop sign (agent refusal conditions)

Agents MUST refuse to proceed if:

1\. Any non-user-initiated outbound traffic is observed and not explicitly whitelisted as an accepted residual by a human.

2\. Required artefacts are missing or incomplete.

3\. The Phase 2 closure policy (behavioural silence, no binary removal) is violated.

**Phase 3 — Importal Skeleton (No Behaviour Change)**

Objective

Introduce Importal branding and scaffolding without changing user-visible browsing behaviour.

Allowed scope

1\. Branding: name, icons, bundle identifiers, basic product strings.

2\. Create empty or stub modules/folders for later phases, without functional behaviour.

3\. Add governance scaffolding: verification directories, templates, guardrails.

Explicit prohibitions

1\. MUST NOT implement routing changes or windowType behaviour.

2\. MUST NOT implement taskspaces as functional objects.

3\. MUST NOT implement sidebar/vertical tabs behaviour.

4\. MUST NOT alter omnibar behaviour.

5\. MUST NOT change history semantics.

Required verification artefacts

/verification/phase-3/ must contain:

1\. branding\_change\_log.md (what changed, where, and why)

2\. behaviour\_non\_regression.md (how you confirmed behaviour matches upstream baseline for core browsing actions)

3\. rollback\_steps.md (how to revert branding/scaffolding changes cleanly)

Stop sign (agent refusal conditions)

Agents MUST refuse to proceed if:

1\. Any behaviour change is detected (routing, tabs, windows, omnibar, history).

2\. Non-regression evidence is missing.

**Phase 4 — Window Types and Routing (Core Behaviour)**

Objective

Implement windowType as behaviourally meaningful and enforce routing rules between main, taskspace, and aux.

Allowed scope

1\. Implement windowType gating mechanisms.

2\. Implement routing rules mandated by Foundation v4:

\* Main allowed content via Application Toolbar match only

\* Non-matching URLs open in new Taskspace

\* External links from Main open in new Taskspace

\* Non-admin popups from Main open in new Taskspace

\* Admin/system prompts may open in aux

3\. Add minimal UI affordances strictly necessary to make routing observable and testable.

Explicit prohibitions

1\. MUST NOT implement sidebar/vertical tabs beyond placeholders (Phase 5).

2\. MUST NOT implement history attribution schema changes (Phase 6).

3\. MUST NOT implement omnibar modes (Phase 8).

4\. MUST NOT introduce cross-context aggregation.

Required verification artefacts

/verification/phase-4/ must contain:

1\. routing\_test\_matrix.md (cases and expected outcomes for each routing rule)

2\. manual\_test\_evidence.md (what was tested, with outcomes and notes)

3\. windowType\_invariants.md (explicit invariants and how they are enforced)

4\. rollback\_steps.md

Stop sign (agent refusal conditions)

Agents MUST refuse to proceed if:

1\. Any routing rule contradicts Foundation v4 Section 6\.

2\. Test matrix or evidence is missing.

3\. windowType values deviate from canonical (main, taskspace, aux).

**Phase 5 — Sidebar and Vertical Tabs (Structural UI)**

Objective

Establish the left-rail and vertical tabs strictly within taskspace windows only, with strict scoping and no cross-context leakage.

Allowed scope

1\. Implement sidebar UI shell gated by windowType.

2\. Implement vertical tabs representation within taskspace only.

3\. Implement minimal state plumbing necessary to display tabs in taskspace and none in main.

Explicit prohibitions

1\. MUST NOT show vertical tabs in main.

2\. MUST NOT aggregate information across taskspaces.

3\. MUST NOT surface history suggestions or history-derived content in the sidebar (unless explicitly authorised in specs; default is no).

4\. MUST NOT implement history attribution changes (Phase 6).

Required verification artefacts

/verification/phase-5/ must contain:

1\. ui\_scoping\_rules.md (what renders in which windowType)

2\. leakage\_checklist.md (explicit checks for cross-taskspace leakage)

3\. manual\_test\_evidence.md

4\. rollback\_steps.md

Stop sign (agent refusal conditions)

Agents MUST refuse to proceed if:

1\. Sidebar or vertical tabs appear in main.

2\. Any cross-taskspace information is displayed without explicit user action and explicit spec authorisation.

3\. Leakage checklist and evidence are missing.

**Phase 6 — History Attribution (Augment Places)**

Objective

Augment Places history with windowType and taskspace attribution, preserving append-only, lossless truthfulness.

Allowed scope

1\. Define and implement attribution fields and join keys.

2\. Ensure writes are additive and interpretable over time.

3\. Ensure aux is excluded from indefinite retention guarantee (but may still be recorded per spec, as long as retention guarantees do not apply).

Explicit prohibitions

1\. MUST NOT prune, rewrite, compress, or summarise at the data layer.

2\. MUST NOT introduce a parallel history store.

3\. MUST NOT introduce retention policy settings or placeholders.

Required verification artefacts

/verification/phase-6/ must contain:

1\. schema\_and\_keys.md

\* attribution fields

\* join keys

\* invariants

\* negative constraints

2\. places\_binding\_notes.md (how augmentation binds to Places without replacement)

3\. data\_invariants\_tests.md (how invariants were validated)

4\. rollback\_steps.md

Stop sign (agent refusal conditions)

Agents MUST refuse to proceed if:

1\. Any retention policy concept exists in schema/specs/code.

2\. History is not append-only and lossless at the data layer.

3\. Places is replaced or bypassed.

**Phase 7 — History UI Implementation**

Objective

Provide a history UI consistent with truthfulness constraints, enabling Taskspace relaunch without rewriting history.

Allowed scope

1\. Implement a UI to view/search history results.

2\. Organise results by recency and Taskspace for Importal history search mode.

3\. Provide one-click “Open Taskspace” actions.

Explicit prohibitions

1\. MUST NOT alter underlying history records.

2\. MUST NOT leak cross-context information without explicit user action.

3\. MUST NOT introduce omnibar changes (Phase 8 covers omnibar).

Required verification artefacts

/verification/phase-7/ must contain:

1\. ui\_behaviour\_spec\_trace.md (mapping from UI behaviour to specs)

2\. leakage\_checklist.md (history UI specific)

3\. manual\_test\_evidence.md

4\. rollback\_steps.md

Stop sign (agent refusal conditions)

Agents MUST refuse to proceed if:

1\. UI modifies history records or attribution.

2\. Leakage checklist fails or is missing.

**Phase 8 — Omnibar (Locked Behaviour)**

Objective

Implement omnibar behaviour exactly as specified:

\* history-blind dropdown before explicit selection

\* explicit mode selection

\* Google results open in Taskspace

\* Importal history results load in Main immediately after selection

Allowed scope

1\. Implement omnibar dropdown with only two modes shown before selection.

2\. Implement mode-specific behaviours and result routing.

3\. Implement Importal results view in Main organised by recency and Taskspace, with one-click “Open Taskspace”.

Explicit prohibitions

1\. MUST NOT show history suggestions prior to explicit “Search Importal” selection.

2\. MUST NOT route Google results into Main.

3\. MUST NOT infer mode from user intent without explicit selection.

4\. MUST NOT change history retention semantics.

Required verification artefacts

/verification/phase-8/ must contain:

1\. omnibar\_mode\_test\_matrix.md

2\. manual\_test\_evidence.md

3\. non\_leakage\_proof.md (how history-blindness prior to selection was validated)

4\. rollback\_steps.md

Stop sign (agent refusal conditions)

Agents MUST refuse to proceed if:

1\. Any history suggestions appear prior to explicit selection.

2\. Routing violates Foundation v4 Section 7\.

3\. Evidence of history-blindness validation is missing.

**Phase 9 — Stabilisation and Known Limitations**

Objective

Ship a defensible v0.1 prototype with explicit known limitations and complete verification artefacts.

Allowed scope

1\. Bug fixing and stabilisation within defined behaviours.

2\. Documentation of limitations and residual exceptions explicitly accepted.

3\. Test hardening (manual test plans, repeatable checks).

Explicit prohibitions

1\. MUST NOT add new product features.

2\. MUST NOT relax privacy/network constraints.

3\. MUST NOT introduce new telemetry or background network activity.

Required verification artefacts

/verification/phase-9/ must contain:

1\. known\_limitations.md

2\. regression\_test\_matrix.md

3\. final\_network\_posture\_report.md (confirming zero non-user-initiated outbound by default, or listing explicitly accepted residuals with authorisation references)

4\. rollback\_strategy.md (how to back out v0.1-specific changes cleanly, at least at the phase boundary level)

Stop sign (agent refusal conditions)

Agents MUST refuse to declare v0.1 complete if:

1\. final\_network\_posture\_report is missing or indicates unknown outbound traffic.

2\. known\_limitations.md is missing.

3\. Any phase artefacts are missing.

\---

**\#\# 11\. Phase 2 Closure: Known Exceptions and Rationale (Locked)**

Rules:

\* Success criterion is \*\*behavioural silence\*\*

\* Residual binaries MAY remain present

\* Prohibited actions:

\* Binary removal

\* “Proving impossibility” refactors

\* Kernel or network enforcement

\* Agents MUST NOT expand accepted residuals without authorisation

\---

**\#\# 12\. Agent Halt and Refusal Conditions (Consolidated)**

Agents MUST refuse to proceed if:

\* Authority documents are missing

\* Required phase artefacts are missing

\* An authority conflict exists

\* Phase boundaries are violated

\* Unknown outbound network traffic is observed

\---

**\#\# 13\. Deferred and Out-of-Scope Areas (Explicit)**

Out of scope for v0.1:

\* Updates

\* DRM

\* AI features

\* Accounts and sync

\* Extensions as privacy posture

Agents MUST NOT implement speculative placeholders.

\---

**\#\# 14\. Amendments and Change Control**

Changes require:

\* Explicit documentation

\* Rationale

\* Scope impact

\* Human approval

Silent evolution is forbidden.

\---

End of Foundation Document v4

