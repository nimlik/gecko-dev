decision:
Adopt deterministic routing with explicit routing inputs and precedence, with no inference: default to staying within the current windowType and current taskspace unless an explicit rule requires escalation (e.g., main non-matching content opens in a new taskspace).

context:
Importal v0.1 treats windowType as a first-class behavioural boundary. Routing must be deterministic, testable, and must not infer user intent. Ambiguity must trigger STOP rather than heuristic behaviour. Routing also must honour locked Foundation rules for main/taskspace/aux behaviour, including main-to-taskspace escalation for non-matching content and restricted aux usage.

options:
 - Heuristic routing (infer intent from URL/domain/history and choose destination automatically).
 - Deterministic routing with explicit inputs and precedence, and explicit escalation rules.
 - Minimal routing: always open everything in taskspace, treat main as a static UI shell.

rationale:
Option 2 is the only option that satisfies: (a) “no inference” constraints, (b) windowType boundary enforcement, and (c) a mechanically testable routing test matrix. Heuristic routing increases ambiguity and drift risk, and “always taskspace” undermines the main surface contract and toolbar gating.

consequences:
 - Routing decisions may consider only explicit inputs (user gesture/disposition, current windowType, current taskspace, target URL, explicit policy rules); they must not use history-derived inference unless explicitly authorised by an implementable FB.
 - When destination is ambiguous, routing must either follow the defined default precedence or STOP (per the stop-sign model), rather than guess.
 - Verification artefacts must include a routing test matrix that enumerates each routing rule and expected outcomes.
 - Changes to routing precedence are architectural decisions and must be recorded via ADR updates, not silently modified inside implementable FBs.