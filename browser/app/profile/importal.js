#define IMPORTAL_PREFS 1
// Importal Phase 2 — Privacy Hardening Defaults
// Build-time shipped defaults (not user prefs)

// ===============================
// Telemetry (hard off)
// ===============================
pref("toolkit.telemetry.enabled", false);
pref("toolkit.telemetry.unified", false);
pref("toolkit.telemetry.server", "");
pref("toolkit.telemetry.archive.enabled", false);
pref("toolkit.telemetry.shutdownPingSender.enabled", false);
pref("toolkit.telemetry.newProfilePing.enabled", false);
pref("toolkit.telemetry.updatePing.enabled", false);
pref("toolkit.telemetry.bhrPing.enabled", false);
pref("toolkit.telemetry.firstShutdownPing.enabled", false);
pref("toolkit.telemetry.coverage.opt-out", true);

// ===============================
// Glean
// ===============================
pref("telemetry.fog.test.localhost_port", -1);

// ===============================
// Experiments / Messaging
// ===============================
pref("app.normandy.enabled", false);
pref("app.shield.optoutstudies.enabled", false);
pref("messaging-system.rsexperimentloader.enabled", false);
pref("nimbus.enabled", false);

// ===============================
// Remote Settings
// ===============================
// pref("services.settings.server", "");
// pref("services.settings.poll_interval", 0);

// ===============================
// Updates (hard off)
// ===============================
// pref("app.update.enabled", false);
// pref("app.update.auto", false);
// pref("app.update.background.enabled", false);
// pref("app.update.staging.enabled", false);
// pref("app.update.service.enabled", false);

// ===============================
// Crash Reporting (hard off)
// ===============================
pref("toolkit.crashreporter.enabled", false);
pref("browser.crashReports.unsubmittedCheck.enabled", false);
pref("browser.crashReports.unsubmittedCheck.autoSubmit2", false);

