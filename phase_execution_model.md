# Importal Phase Execution Model

This Phase Execution Model defines the permitted sequence of work for
Importal’s documentation and system development. Each phase below acts
as a hard boundary: it constrains what work may occur, enumerates
required inputs and outputs, lists verification artefacts, and specifies
a gating condition. Phases must be executed in order and may not be
skipped or merged. Any attempt to bypass a phase triggers the global
stop‑signs defined in Phase 2.

## Phase 0 – Authority & Operating Contract Setup

**Objective:** Establish the governing framework and confirm the
authority hierarchy that applies to all subsequent work.

**Allowed scope:** - Load and read the Phase 0 Authority & Operating
Contract and the external Agent Coding Best Practices document. -
Confirm the authority hierarchy and agent mandates. - Initialise the
change log file with appropriate phase headings.

**Explicit prohibitions:** - Do **not** modify or extend product scope,
features or constraints. - Do **not** invent new guardrails or override
higher‑tier documents. - Do **not** begin constraint extraction,
stop‑sign compilation or any implementation work.

**Required inputs:**  
- Phase 0 Authority & Operating Contract (complete and accessible).  
- External Agent Coding Best Practices – AI‑Optimised document.

**Required outputs:**  
- A record (e.g. in change log) confirming that the contract and best
practices have been loaded and understood.  
- Initial change log headings for each phase.

**Required verification artefacts:**  
- Evidence that the Authority & Operating Contract and best practices
were read (citations or file references).  
- Confirmation that the change log has been created.

**Advancement gate:**  
DO NOT PROCEED UNLESS the Authority & Operating Contract and
Best Practices are fully accessible and understood, all ambiguities are
resolved or escalated, and an initial change log structure exists.

## Phase 1 – Immutable Constraints Extraction

**Objective:** Identify and document non‑negotiable product and system
constraints.

**Allowed scope:** - Extract immutable constraints from the Phase 0
contract and any available guardrail lists or high‑tier
specifications. - Document each constraint in a dedicated constraints
file. - Update the change log to record the extraction work.

**Explicit prohibitions:** - Do **not** invent, speculate or infer new
constraints beyond the available sources. - Do **not** modify or
override existing constraints. - Do **not** design features,
architectures or user flows.

**Required inputs:**  
- Phase 0 Authority & Operating Contract.  
- Any guardrail lists or higher‑tier specifications available at this
time.

**Required outputs:**  
- An immutable constraints document containing each extracted constraint
(e.g. IC‑1–IC‑4).  
- A change log entry summarising the extraction.

**Required verification artefacts:**  
- Citations to authoritative sources for each constraint.  
- Verification (peer or human) that each constraint matches the source
text.  
- A completed change log entry.

**Advancement gate:**  
DO NOT PROCEED UNLESS all available immutable constraints have been
extracted and documented, required sources are accessible, verification
evidence exists, and no global stop sign has been triggered.

## Phase 2 – Global Stop‑Sign Index Compilation

**Objective:** Compile a consolidated list of all global stop signs that
mandate halting work.

**Allowed scope:** - Collect stop‑sign triggers from the Phase 0
contract, the immutable constraints document and any other authoritative
sources. - Record each stop sign, its trigger condition, affected actors
and required next action in a stop‑sign index. - Update the change log
accordingly.

**Explicit prohibitions:** - Do **not** redefine or weaken existing stop
signs.  
- Do **not** invent new stop signs beyond those present in higher‑tier
documents.  
- Do **not** alter guardrails or constraints.

**Required inputs:**  
- Phase 0 Authority & Operating Contract (particularly Section 2.3).  
- Phase 1 immutable constraints document.  
- Any additional guardrail or best‑practice documents.

**Required outputs:**  
- A global stop‑sign index enumerating each stop sign (e.g.
SS‑01–SS‑13).  
- A change log entry summarising the compilation.

**Required verification artefacts:**  
- Cross‑references mapping each stop sign to its source documents.  
- Verification that no stop sign is missing or misrepresented.  
- An updated change log entry.

**Advancement gate:**  
DO NOT PROCEED UNLESS the stop‑sign index accurately reflects all stop
conditions from authorised sources, each entry is cited, verification
evidence is recorded, and no stop sign is currently triggered.

## Phase 3 – Phase Execution Model Development

**Objective:** Define the ordered phases and gating conditions governing
all future Importal work.

**Allowed scope:** - Produce the Phase Execution Model document (this
file) that names each phase, delineates its scope, lists required
inputs/outputs, and specifies advancement gates. - Update the change log
to record creation of the execution model.

**Explicit prohibitions:** - Do **not** introduce new product
constraints or features.  
- Do **not** restate stop signs verbatim or alter their meaning.  
- Do **not** implement or design systems.  
- Do **not** guess at missing details; define gates instead.

**Required inputs:**  
- Phase 0 Authority & Operating Contract.  
- Phase 1 immutable constraints document.  
- Phase 2 global stop‑sign index.  
- Any partial foundation or specification documents that have been
released.

**Required outputs:**  
- This phase execution model file defining all phases.  
- A change log entry documenting the model’s creation.

**Required verification artefacts:**  
- Review by a human or higher‑authority agent confirming alignment with
the authority hierarchy, constraints and stop‑sign index.  
- Change log entry.

**Advancement gate:**  
DO NOT PROCEED UNLESS the phase execution model is complete and
validated, no conflicts exist with higher‑tier documents, and
verification evidence is recorded.

## Phase 4 – Foundation Document Assimilation (pending availability)

**Objective:** Load and summarise the Importal Foundation Document to
capture product vision, philosophy, scope and non‑goals.

**Allowed scope:** - Read the Foundation Document in its entirety.  
- Summarise its vision, philosophy, scope boundaries, non‑goals and
deferred features.  
- Update the immutable constraints and stop‑sign index if the foundation
introduces new guardrails or deferrals.  
- Record changes in the change log.

**Explicit prohibitions:** - Do **not** reinterpret or extend the
product vision beyond what is written.  
- Do **not** alter or delete content in the Foundation Document.  
- Do **not** design features, flows or implementation details.  
- Do **not** proceed without the document’s availability.

**Required inputs:**  
- Importal Foundation Document v4 (or latest complete version).  
- Outputs from Phases 0–3 (contract, constraints, stop‑sign index,
execution model).

**Required outputs:**  
- A summary document capturing the Foundation Document’s key elements.  
- Updates to the constraints and stop‑sign index if required.  
- A change log entry detailing the assimilation.

**Required verification artefacts:**  
- Citations to each section of the Foundation Document used in the
summary.  
- Cross‑check showing alignment between the summary and existing
constraints.  
- Human or peer review confirming accuracy.  
- Change log entry.

**Advancement gate:**  
DO NOT PROCEED UNLESS the Foundation Document is fully accessible and
summarised, all ambiguities or missing sections are resolved or
escalated, updates to constraints and stop signs are integrated, and
verification evidence is available.

## Phase 5 – Authority & Scope Specification Assimilation (pending availability)

**Objective:** Acquire and assimilate Authority & Scope specifications
(e.g. 00_authority_hierarchy.md, 01_scope_and_non_goals.md,
02_foundational_constraints.md, guardrails_and_stop_signs.md) and
integrate their directives.

**Allowed scope:** - Read each Authority & Scope specification
document.  
- Summarise the authority hierarchy, scope boundaries, non‑goals,
additional guardrails and deferrals they specify.  
- Update existing constraints and the stop‑sign index where these
documents introduce new items.  
- Record all changes in the change log.

**Explicit prohibitions:** - Do **not** alter or reinterpret the
authority hierarchy.  
- Do **not** expand the scope beyond what is expressly allowed.  
- Do **not** implement features or make design decisions.  
- Do **not** proceed if any specification is missing or inaccessible.

**Required inputs:**  
- The full set of Authority & Scope specification documents.  
- Outputs from Phases 0–4 (contract, constraints, stop‑sign index,
execution model, foundation assimilation).

**Required outputs:**  
- A summary document detailing the contents of each Authority & Scope
specification.  
- Updated constraints and stop‑sign index as needed.  
- A change log entry describing the assimilation.

**Required verification artefacts:**  
- Citations for each directive extracted.  
- Cross‑checks with the Foundation Document and existing constraints to
ensure consistency.  
- Human or peer review.  
- Change log entry.

**Advancement gate:**  
DO NOT PROCEED UNLESS all Authority & Scope specifications are
accessible and summarised, any new constraints or stop signs are
integrated and verified, and evidence of review is available.

## Phase 6 – Core Concept & Product Specification Assimilation (pending availability)

**Objective:** Load and assimilate sanctioned core concept and product
specifications (e.g. conceptual_data_model.md, taskspace_lifecycle.md)
to capture authorised features and behaviours.

**Allowed scope:** - Read each core concept and product specification
document.  
- Summarise authorised features, user flows, behaviours and
interactions.  
- Update documentation accordingly while respecting existing scope and
constraints.  
- Record changes in the change log.

**Explicit prohibitions:** - Do **not** invent new features, flows or
primitives.  
- Do **not** extend the scope beyond what is specified.  
- Do **not** alter the semantics of authorised concepts.  
- Do **not** implement or code features.

**Required inputs:**  
- Core concept and product specification documents.  
- Outputs from Phases 0–5 (contract, constraints, stop‑sign index,
execution model, foundation assimilation, authority & scope
assimilation).

**Required outputs:**  
- A summary document for each core concept and product specification.  
- Updated documentation reflecting the authorised features.  
- A change log entry capturing the assimilation.

**Required verification artefacts:**  
- Citations to each specification section summarised.  
- Cross‑checks with existing constraints and guardrails.  
- Human or peer review.  
- Change log entry.

**Advancement gate:**  
DO NOT PROCEED UNLESS all core concept and product specifications are
accessible and summarised, summaries are verified and integrated,
unresolved ambiguities are escalated, and verification evidence is
recorded.

## Phase 7 – Implementation‑Level Specification Assimilation (pending availability)

**Objective:** Acquire and assimilate implementation‑adjacent
specifications (API shapes, window type specs, dashboards, hooks) to
support consistent implementation of authorised concepts.

**Allowed scope:** - Read each implementation‑level specification
document.  
- Summarise API shapes, hook points, component behaviours and other
implementation guidance.  
- Ensure these details align with core concepts and higher‑tier
constraints.  
- Record assimilation in the documentation and change log.

**Explicit prohibitions:** - Do **not** design or implement code.  
- Do **not** introduce new primitives or alter API shapes.  
- Do **not** proceed if any document is missing or inaccessible.  
- Do **not** override higher‑tier directives.

**Required inputs:**  
- Implementation‑level specification documents.  
- Outputs from Phases 0–6.

**Required outputs:**  
- A summary of each implementation‑level specification.  
- Any necessary updates to existing documentation to reflect
implementation guidance.  
- A change log entry logging the assimilation.

**Required verification artefacts:**  
- Citations linking summary items to the source documents.  
- Cross‑checks ensuring consistency with core concepts and
constraints.  
- Human or peer review.  
- Change log entry.

**Advancement gate:**  
DO NOT PROCEED UNLESS all implementation‑level specifications are
accessible and summarised, integration into documentation is validated,
unresolved issues are escalated, and verification evidence exists.

## Phase 8 – Implementation and Development (future)

**Objective:** Begin actual system development and documentation updates
according to the assimilated specifications and immutable constraints.

**Allowed scope:** - Implement authorised features strictly in line with
assimilated specifications.  
- Enforce immutable constraints such as local‑first storage, truthful
history, privacy boundaries and single workspace usage.  
- Update documentation alongside code changes.  
- Run tests, linters and verification tools to ensure compliance with
acceptance criteria.  
- Record each change in the change log.

**Explicit prohibitions:** - Do **not** implement deferred features
(e.g. multi‑workspace support or provider integrations) without explicit
higher‑tier approval.  
- Do **not** violate immutable constraints or guardrails.  
- Do **not** operate outside the authorised scope or current development
phase.  
- Do **not** omit verification steps or change log entries.  
- Do **not** ignore stop signs.

**Required inputs:**  
- Fully assimilated Foundation Document, Authority & Scope specs, core
concept and product specs, and implementation‑level specs.  
- Complete immutable constraints document and stop‑sign index.  
- Detailed test plans and acceptance criteria for each feature.  
- Phase 0 contract and best practices.

**Required outputs:**  
- Working components or features that conform to authorised
specifications.  
- Updated documentation reflecting the implemented state.  
- Test results, linter outputs and other verification artefacts.  
- A change log entry for each change.

**Required verification artefacts:**  
- Passing test suites and linter checks.  
- Evidence that implementation complies with all constraints and stop
signs.  
- Human review for high‑impact changes.  
- Change log entries.

**Advancement gate:**  
DO NOT PROCEED UNLESS all preceding phases are complete and verified,
all necessary specifications and plans are available, acceptance
criteria and tests exist, high‑impact changes have human approval, and
no unresolved conflicts or stop signs remain.

## Ordering and Non‑Skippability

The phases defined above constitute the **only** valid sequence of work
for Importal. Work MUST proceed in the order Phase 0 → Phase 1 → Phase 2
→ Phase 3 → Phase 4 → Phase 5 → Phase 6 → Phase 7 → Phase 8. Phases may
not be skipped, merged or reordered. Attempting to bypass any phase
constitutes a violation of SS‑11 (“Outside the authorised development
phase”) and triggers the relevant stop‑signs. If any phase cannot be
completed due to missing documents, ambiguity or conflict, work MUST
halt immediately and the issue MUST be escalated for clarification or
additional documentation in accordance with the global stop‑sign index.

------------------------------------------------------------------------
