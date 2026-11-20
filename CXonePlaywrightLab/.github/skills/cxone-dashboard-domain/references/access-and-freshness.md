# Dashboard Access and Freshness

**Source checked:** 2026-11-20. Revisit the official pages before using these notes as current product truth.

## Global View and Shared Dashboards

The [NiCE CXone Dashboard documentation](https://help.nicecxone.com/content/dashboardwem/cxonedashboard.htm) states that Global Views limit data to assigned teams and/or skills. Dashboard widgets respect those restrictions. A widget configured for data the user cannot access may display no data. If a user has skill restrictions, the Campaign dropdown is unavailable in widgets that support it. Shared-dashboard layout can be the same for users while displayed data differs according to each user's permissions. Dashboard sharing is also limited by the user's team scope.

Test implications:

- Use separate authorized test roles and known test data to verify permitted and restricted views.
- Check that restricted data is absent, not merely hidden by a UI filter.
- Do not infer a user's access from dashboard ownership or shared layout alone.
- Confirm Global View setup and test-data mappings with the tenant administrator.

## Dashboard-Wide Refresh and Sleep

The general dashboard page says Near Real-Time widgets refresh as quickly as every 7 seconds, while historical widgets refresh between every 15-30 minutes. The ACD widget page provides more specific, per-widget refresh and data-update details; prefer those when testing an ACD widget. Dashboards enter sleep mode after 20 minutes of inactivity, except wall board projections.

Do not treat the dashboard-wide statement as a promise that every widget uses that interval. Distinguish:

- **Data refresh:** how soon source data is updated/available according to widget documentation.
- **Widget refresh:** how often the widget refreshes its displayed data.
- **Historical duration:** how far back the widget supports analysis.

## Source Pages

- [NiCE CXone Dashboard](https://help.nicecxone.com/content/dashboardwem/cxonedashboard.htm)
- [NiCE CXone ACD Widgets](https://help.nicecxone.com/content/dashboardwem/acdreportingwidgets.htm)
