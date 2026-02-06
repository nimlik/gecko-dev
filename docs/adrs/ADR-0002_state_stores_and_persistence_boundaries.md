decision: Separate session restore state from history records using distinct stores, with explicit persistence boundaries and crash-consistency rules.

context: Importal requires application state to persist across restarts (windows, taskspaces, open tabs) while History has different privacy and retention semantics. Conflating session restore state with history risks privacy drift, unclear retention, and ambiguous recovery after crashes.

options:
 - Single unified store for both session restore and history.
 - Separate stores: session restore store for “open state”; history store for “browsing record”.
 - No persistent session restore; reconstruct from history.

rationale: Option 2 minimises privacy drift, makes retention enforceable, and allows session restore to be implemented without implicitly expanding History scope. It also supports deterministic crash recovery rules and clearer testing boundaries.

consequences:
 - Implementations must write session restore state and history records independently.
 - Session restore can operate even if history is disabled/restricted (subject to higher-tier policy).
 - Tests must validate crash recovery and corruption handling separately for each store.
 - Any coupling between stores must be explicitly specified in an implementable FB (not assumed).