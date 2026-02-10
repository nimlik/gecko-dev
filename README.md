Importal — a privacy-focused taskspace-first browser experiment built on Gecko

This repository is a working fork of Mozilla’s Gecko/Firefox codebase used to explore Importal, a taskspace-first browser concept focused on safe task closure, predictable navigation, and history as a reliable recovery surface.

This is not a consumer-ready browser and should not be interpreted as an alternative Firefox distribution. Large parts of the repository remain upstream Firefox code.

Purpose of this fork
- Explore a taskspace-oriented browsing model
- Define strict routing, history, and navigation invariants
- Develop feature-first specifications before large-scale implementation
- Maintain strong governance to prevent product drift as complexity grows

YC note (important)
The `yc` branch is maintained as the reviewer-facing snapshot.
Active development occurs on feature branches, with coherent progress merged into `yc` regularly.

Start here (documentation)
These documents reflect the current Importal design and governance work:

- Authority and decision model  
  Governing_Docs/Phase_0_Authority_Contract_Setup.md

- Immutable product constraints  
  Governing_Docs/Phase_1_Immutable_Constraints_Extraction.md

- Stop-sign system (when work must halt instead of guessing)  
  Governing_Docs/Phase_2_Global_Stop_Sign_Index.md

- Representative feature specification (omnibar intent and routing)  
  docs/features/impl/FB-341_omnibar_submit_routing.md

Repository structure (high level)
- Governing_Docs/        Governance, authority, constraints
- docs/features/impl/   Feature bundles (specs + acceptance criteria)
- docs/adrs/            Architectural decisions
- browser/, toolkit/, etc. — upstream Firefox/Gecko code

Status
- Stage: early development / design-led build
- Current focus: taskspaces, safe closure, omnibar intent, history truthfulness

Contact
Dave Chetcuti
