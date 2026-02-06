artefact_type: feature_bundle
implementable: yes
status: draft
version: v0.1
path: docs/features/impl/FB-321_routing_table_schemas.md

parent_epic:
- docs/features/epics/EFB-003_navigation_routing_policy.md

depends_on_adrs:
- docs/adrs/ADR-0001_routing_defaults_and_constraints.md

authority_dependencies:
- Foundation v5:
  - 5. Network Posture and Telemetry Discipline (v0.1)
  - 6.2 Main Window Behaviour
  - 6.3 Taskspace Behaviour
  - 7. Omnibar Behaviour (Locked)
- Governing_Docs:
  - Governing_Docs/Phase_2_Global_Stop_Sign_Index.md
  - Governing_Docs/Phase_6_Governance_Stability_Policy.md
  - Governing_Docs/Phase_5_Spec_Classification_Mapping.md
- docs/spec_registry.md
- EFB-003 Appendix A (table names + required fields)
- EFB-003 Appendix F (strict vs lenient mode concept)

# FB-321 routing table schemas (v0.1)

## 1. authority_dependencies

This FB is implementable and is the schema source-of-truth for the routing policy tables referenced by EFB-003.

Binding sources:
- Foundation v5: windowType boundary constraints; Main/Taskspace surface contracts; network/telemetry constraints.
- ADR-0001: deterministic routing with explicit inputs; STOP on ambiguity rather than inference.
- EFB-003 Appendix A: authoritative table names and required fields for v0.1 (orientation); this FB formalises them into implementable schema and validation rules.
- EFB-003 Appendix F: strict vs lenient mode concept for configuration handling.

## 2. scope

This FB defines authoritative schemas and validation constraints for the following routing policy tables (logical datasets):
- toolbar_entry_table
- app_identity_table
- task_worthy_target_allowlist

This FB defines, for each table:
- field names and types
- required vs optional fields
- permitted values/enums
- uniqueness and key constraints
- validation rules, including “no wildcard origins”
- minimal schema versioning (v0.1) and forward-compatibility rules
- change-control requirements for schema evolution

## 3. non_goals

This FB does not define:
- seed data contents (belongs in FB-322_routing_table_seed_data_v0_1.md)
- routing precedence logic (belongs in FB-301 / other FB-3xx routing logic bundles)
- omnibar submit semantics (FB-341 etc)
- link-click routing semantics beyond what is needed to constrain schema validation

## 4. user_stories

1. As Importal, I can load routing policy tables from local structured data and validate them deterministically before any routing decision uses them.
2. As a developer, I can change routing datasets safely, with schema validation catching invalid origins and referential errors before runtime.
3. As a governance maintainer, I can evolve routing schemas with explicit versioning and recorded change control, avoiding silent drift.

## 5. definitions

- table: A logical routing policy dataset, persisted as structured data (YAML or JSON), loaded at runtime.
- record: A single entry in a table (for example, one toolbar pin, one app identity, or one allowlist rule).
- url: A string parseable as an absolute URL (must include a scheme).
- origin: A string in the exact form scheme://host[:port] with no path, query, or fragment.
- canonical origins: app_identity_table.canonical_origins (exact origins treated as core identity for an app).
- within-app origin allowlist: app_identity_table.within_app_origin_allowlist (exact origins treated as within-app navigation in Main for an app).
- wildcard/pattern origin: Any origin string containing disallowed pattern syntax (defined in 6.5.2).
- strict mode: configuration load fails closed; invalid or internally inconsistent routing policy tables trigger STOP.
- lenient mode: optional; only permitted if explicitly enabled; must be bounded by EFB-003 Appendix F and must not invent routing rules.

## 6. functional_requirements

### 6.1 persistence substrate and load contract (v0.1)

FR-321-01 (Local structured data only)
- Routing policy tables MUST be represented as versioned structured data loaded from local files (YAML or JSON).
- No network access is permitted for loading, fetching, or resolving routing policy data.

FR-321-02 (Validation at load-time)
- All routing policy tables MUST be validated against this FB’s schema rules at load-time before use.
- If validation fails, handling MUST follow the strict/lenient mode requirements in 6.1.4.

FR-321-03 (Physical file layout flexibility; logical schema invariance)
- Tables MAY be persisted as separate files or combined into a single file.
- Regardless of physical layout, the loaded in-memory representation MUST conform to the logical schemas in 6.2, 6.3, and 6.4.

FR-321-04 (Strict vs lenient configuration modes)
- Strict mode MUST be supported and SHOULD be the default once stable (per EFB-003 Appendix F).
- Lenient mode is optional and MUST be explicitly enabled to be used.
- In strict mode, any schema violation or referential integrity failure MUST trigger STOP at load-time.
- In lenient mode, only the bounded fallbacks explicitly listed in EFB-003 Appendix F are permitted; all other violations MUST still trigger STOP.

### 6.2 toolbar_entry_table schema (UI pins)

Table name: toolbar_entry_table

#### 6.2.1 record shape

Record type: ToolbarEntry

Required fields:
- entry_id: string (non-empty; stable identifier for the pin instance)
- label: string (non-empty; UI label)
- app_id: string (non-empty; references app_identity_table.app_id)

Optional fields:
- launch_url_override: url (absolute URL string)
- ui_pin_location: enum string, one of: left | right | top | bottom

Constraint:
- No routing semantics live in toolbar_entry_table (EFB-003 Appendix A1). This schema therefore does not permit routing-behaviour fields to be introduced here in v0.1.

#### 6.2.2 key and uniqueness constraints

FR-321-TE-01 (Primary key)
- entry_id MUST be unique across toolbar_entry_table.

FR-321-TE-02 (Referential integrity)
- In strict mode: every ToolbarEntry.app_id MUST reference an existing app_identity_table.app_id; otherwise STOP.
- In lenient mode: handling MUST follow EFB-003 Appendix F (bounded fallback only); otherwise STOP.

#### 6.2.3 launch_url_override constraints (when present)

FR-321-TE-03 (URL validity)
- launch_url_override, if present, MUST be an absolute URL (must include a scheme).

### 6.3 app_identity_table schema (identity + routing semantics)

Table name: app_identity_table

#### 6.3.1 record shape

Record type: AppIdentity

Required fields:
- app_id: string (non-empty; stable identifier slug)
- default_launch_url: url (absolute URL string)
- canonical_origins: list of origin (6.5)
- within_app_origin_allowlist: list of origin (6.5)
- default_destination_from_main: enum string, one of: main | new_taskspace
- default_destination_from_taskspace: string (fixed for v0.1), must equal: current_taskspace_new_tab

Optional fields:
- notes: string

#### 6.3.2 key and uniqueness constraints

FR-321-AI-01 (Primary key)
- app_id MUST be unique across app_identity_table.

#### 6.3.3 “no wildcard origins” constraint (v0.1)

FR-321-AI-02 (Exact origins only)
- canonical_origins entries MUST be exact origins (6.5.1) and MUST NOT be wildcard/pattern origins (6.5.2).
- within_app_origin_allowlist entries MUST be exact origins (6.5.1) and MUST NOT be wildcard/pattern origins (6.5.2).

FR-321-AI-03 (Origin-only strings)
- Origins in canonical_origins and within_app_origin_allowlist MUST NOT include any path, query, or fragment.

FR-321-AI-04 (Validation failure handling)
- If any wildcard/pattern origin is present in canonical_origins or within_app_origin_allowlist:
  - strict mode: STOP (configuration invalid)
  - lenient mode: STOP (not eligible for fallback)

### 6.4 task_worthy_target_allowlist schema

Table name: task_worthy_target_allowlist

#### 6.4.1 record shape

Record type: TaskWorthyRule

Required fields:
- rule_id: string (non-empty; stable identifier)
- rule_type: enum string, one of: origin_prefix | host_suffix | content_type | url_suffix
- match_value: string (non-empty)
- destination: enum string (v0.1 fixed), must equal: new_taskspace

Optional fields:
- notes: string

#### 6.4.2 key and uniqueness constraints

FR-321-TW-01 (Primary key)
- rule_id MUST be unique across task_worthy_target_allowlist.

#### 6.4.3 minimal validation constraints (non-inferential)

FR-321-TW-02 (Deterministic rule encoding)
- rule_type and match_value MUST be explicit strings. No rule may require semantic inference to interpret.
- This FB does not define matching algorithms; it constrains representation only.

FR-321-TW-03 (No behavioural overrides)
- destination MUST be new_taskspace for all rules in v0.1.

### 6.5 shared value types and validators

#### 6.5.1 origin validator

FR-321-TYPE-ORIGIN-01 (Origin format)
- An origin MUST match:
  - scheme://host
  - scheme://host:port
- scheme is a non-empty token matching: [A-Za-z][A-Za-z0-9+.-]*
- IPv6 literal hosts are not supported in v0.1.

Operational test (string-level, v0.1):
- The origin MUST contain "://".
- Let sep be the index of the first occurrence of "://".
- Let remainder be the substring after sep + 3 (i.e., after "://").
- remainder MUST be non-empty.
- remainder MUST NOT contain "/", "?", or "#".
- remainder MUST NOT start with ".".
- IPv6 literal hosts are not supported in v0.1 (remainder MUST NOT contain "[").
- If remainder contains ":", the last ":" splits host and port:
  - port MUST be digits only and in range 1..65535
  - host MUST be non-empty and MUST NOT contain whitespace
- If remainder contains no ":", host is remainder and MUST NOT contain whitespace.

#### 6.5.2 wildcard/pattern origin detector (v0.1)

FR-321-TYPE-ORIGIN-02 (Disallowed pattern syntax)
A wildcard/pattern origin is any origin string that contains any of the following:
- "*" or "?"
- Any of: "[", "]", "(", ")", "{", "}", "|", "^", "$", "+"
- A leading dot host form intended to match subdomains (host begins with ".")
- Missing scheme (does not contain "://")
- A scheme wildcard prefix ("*://")
- Any path/query/fragment component after the scheme separator (i.e., remainder contains "/", "?", or "#", where remainder is defined in 6.5.1)

Validation rule:
- If a value is intended to be an origin (canonical_origins or within_app_origin_allowlist), it MUST pass both:
  - origin validator (6.5.1)
  - wildcard/pattern detector exclusion (6.5.2)

### 6.6 schema versioning and minimal forward compatibility (v0.1)

FR-321-VERS-01 (Schema version field required)
- Each persisted routing policy dataset (whether a combined file or a per-table file) MUST declare:
  - schema_version: string
- v0.1 schema_version MUST be "0.1" or "0.1.<patch>" where <patch> is digits only.

FR-321-VERS-02 (Forward compatibility rule, minimal)
- A v0.1 loader/validator MUST accept "0.1" and MAY accept "0.1.<patch>".
- If schema_version is not compatible:
  - strict mode: STOP
  - lenient mode: STOP (schema mismatch is not eligible for fallback)

FR-321-VERS-03 (Unknown fields; drift visibility)
- In strict mode, unknown fields (per-record or top-level) MUST trigger STOP at load-time.
- In lenient mode (if explicitly enabled), unknown fields MAY be ignored provided required v0.1 fields are present and valid.

FR-321-VERS-04 (Unknown enum values)
- Unknown enum values in v0.1-required fields MUST trigger STOP in all modes.

### 6.7 change control for schema evolution

FR-321-CC-01 (Change proposal mechanics)
Any schema change MUST be proposed by editing this FB (FB-321) and MUST include:
- an explicit schema_version change (minor or patch)
- updated acceptance criteria if validation rules change
- verification impact notes

FR-321-CC-02 (Coupled artefacts)
If FB-321 changes in a way that affects seed datasets:
- FB-322 (seed data) MUST be updated in the same change set, or the change MUST STOP until FB-322 is updated.

FR-321-CC-03 (ADR boundary)
- Changes to routing precedence or allowed routing inputs are architectural and MUST be recorded via ADR updates (per ADR-0001), not embedded as behavioural changes inside FB-321.

FR-321-CC-04 (Recording)
- Any addition or material modification of this FB MUST be recorded per Phase 6 in Governing_Docs/change_log.md.

## 7. non_functional_requirements

NFR-321-01 (Determinism; no inference)
- Schema validation and table interpretation MUST be deterministic and must not infer meaning beyond explicit fields (ADR-0001).

NFR-321-02 (Privacy and data handling)
- Routing policy tables are local configuration. They MUST NOT be transmitted off-device.
- Loading/validation MUST not introduce any non-user-initiated network traffic (Foundation v5 section 5).

NFR-321-03 (Fail closed in strict mode)
- In strict mode, validation failures MUST fail closed via STOP before routing uses the data.

NFR-321-04 (Auditability)
- Validation errors MUST identify: table name, record identifier (entry_id / app_id / rule_id), field name, and rule violated.

## 8. state_model (persisted_state + lifecycle)

### 8.1 persisted_state

Persisted state consists of one or more local structured data files (YAML or JSON) representing:
- toolbar_entry_table
- app_identity_table
- task_worthy_target_allowlist
and declaring schema_version.

This FB defines logical schemas; physical file names and locations are implementation details, but must be stable and referenced by the implementing code and tests.

### 8.2 lifecycle

1. Load candidate dataset(s) from local files.
2. Parse into in-memory structures.
3. Validate:
   - schema_version compatibility
   - per-record required fields and types
   - uniqueness constraints
   - referential integrity (strict mode)
   - no wildcard origins constraints
   - unknown field handling per 6.6 (strict STOP; lenient optional ignore)
4. If validation passes, make tables available to routing code.
5. If validation fails:
   - strict mode: STOP
   - lenient mode (if explicitly enabled): apply only bounded fallbacks from EFB-003 Appendix F where permitted; otherwise STOP.

## 9. edge_cases_and_failures

1. Duplicate primary keys
- Two records share the same entry_id/app_id/rule_id.
- Expected: validation fail; strict STOP.

2. Broken references
- toolbar_entry_table entry references app_id not present in app_identity_table.
- Expected: strict STOP; lenient handling only if explicitly enabled and bounded by EFB-003 Appendix F.

3. Invalid origin strings
- Any origin fails 6.5.1 or trips 6.5.2.
- Expected: STOP in all modes (no fallback permitted).

4. Unknown enum values
- default_destination_from_main not in {main, new_taskspace}.
- Expected: STOP.

5. Missing required fields
- Any required field absent or empty string.
- Expected: STOP.

6. Schema version mismatch
- schema_version not compatible with v0.1.
- Expected: STOP.

7. Unknown fields present
- Any record or top-level key not in v0.1.
- Expected: strict STOP; lenient may ignore (if enabled).

## 10. acceptance_criteria (numbered, testable)

AC-321-01
- Given a dataset declaring schema_version "0.1" (or "0.1.<patch>") and containing valid records, load-time validation succeeds.

AC-321-02
- Given any toolbar_entry_table record missing entry_id, label, or app_id, validation fails and triggers STOP in strict mode.

AC-321-03
- Given any app_identity_table record where default_destination_from_taskspace is not exactly "current_taskspace_new_tab", validation fails and triggers STOP.

AC-321-04
- Given any within_app_origin_allowlist entry containing any wildcard/pattern syntax defined in 6.5.2, validation fails and triggers STOP (strict and lenient).

AC-321-05
- Given any canonical_origins entry violating 6.5.1 or 6.5.2, validation fails and triggers STOP (strict and lenient).

AC-321-06
- Given a toolbar_entry_table entry referencing a missing app_id:
  - strict mode: STOP occurs at load-time and identifies the offending entry_id and app_id.
  - lenient mode: behaviour is permitted only if explicitly enabled and bounded by EFB-003 Appendix F; otherwise STOP.

AC-321-07
- Given any task_worthy_target_allowlist record where destination is not exactly "new_taskspace", validation fails and triggers STOP.

AC-321-08
- Given any unknown field in the dataset:
  - strict mode: STOP occurs at load-time and identifies the unknown field path.
  - lenient mode: unknown field is ignored only if lenient mode is explicitly enabled and all required v0.1 fields are valid.

AC-321-09
- Validation error reporting includes table name, record id (entry_id/app_id/rule_id), field name (or unknown field path), and rule violated.

## 11. verification_steps (reproducible)

1. Create or select a candidate routing policy dataset (YAML or JSON) representing the three tables.
2. Set mode to strict.
3. Run schema validation:
   - Confirm that a fully valid dataset passes.
   - Introduce each single fault below and confirm STOP with precise error reporting:
     - remove a required field from a toolbar entry
     - change default_destination_from_taskspace to a different string
     - add within_app_origin_allowlist entry "https://*.example.com"
     - add canonical_origins entry "https://example.com/" (path present)
     - set a task_worthy_target_allowlist destination to "main"
     - reference a non-existent app_id from a toolbar entry
     - add an unknown field to any record
4. If lenient mode is implemented:
   - Explicitly enable lenient mode.
   - Confirm unknown-field behaviour matches 6.6.3.
   - Confirm that only the bounded fallbacks from EFB-003 Appendix F occur; all other violations still STOP.

## 12. invariants_touched (IC-x identifiers only; TBD if unverified)

TBD

## 13. stop_sign_triggers (SS-xx identifiers only; TBD if unverified)

TBD (populate only by referencing the canonical identifiers in Governing_Docs/Phase_2_Global_Stop_Sign_Index.md; do not invent IDs)

## 14. rollout_and_rollback

Rollout (v0.1):
- Implement schema validation and strict mode STOP behaviour first.
- Add seed data in FB-322 and validate it against this schema before enabling routing logic.

Rollback:
- If a schema change causes breakage, revert to the prior FB-321 version and the matching FB-322 dataset version.
- Do not hotfix datasets without updating versioning and change log entries.

## 15. change_log_entry_required

Required:
- Adding this FB (FB-321) or materially modifying it MUST include an entry in Governing_Docs/change_log.md consistent with Phase 6 (what changed, why, verification impact).
