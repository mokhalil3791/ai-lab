window.WORKSHOP_DATA = {
  "title": "Databricks RACI Workshop Assistant",
  "subtitle": "Interactive discussion tool for reviewing the pre-filled RACI against the glossary definitions.",
  "pillars": {
    "EBT": {
      "name": "Enterprise Business Technology",
      "summary": "Builds and runs business-facing data and AI platforms, standards, and enablement services."
    },
    "EET": {
      "name": "Enterprise Enabling Technology",
      "summary": "Owns foundational infrastructure, identity, networking, and enterprise engineering controls."
    },
    "DMO": {
      "name": "Data Management Office",
      "summary": "Owns data governance, policy, classification, entitlements, and control frameworks."
    },
    "BU": {
      "name": "Business Units",
      "summary": "Own the domain use cases, steward their data, run domain workloads, and carry business outcomes."
    }
  },
  "sections": [
    "§1 · Platform & Workspace Governance",
    "§2 · Platform Reliability & Operations",
    "§3 · Data Governance & Catalog Management",
    "§4 · MLOps & Shared Engineering Standards",
    "§5 · Enablement, Adoption & Guardrails",
    "§6 · Privileged Roles & Admin Functions",
    "§7 · Security, Compliance & IT Service Management",
    "§8 · Foundational Resources & Infrastructure",
    "§9 · Resource Ownership & Graduation"
  ],
  "activities": [
    {
      "id": "workspace-provisioning-prod-non-prod---technical-deployment",
      "section": "§1 · Platform & Workspace Governance",
      "title": "Workspace provisioning (prod / non-prod) — technical deployment",
      "definition": "The act of creating new Databricks workspaces in the cloud. A workspace is the primary environment where users run notebooks, jobs, and queries. Organisations typically have separate workspaces for production (live business workloads) and non-production (development, testing). This row is about who deploys the workspace infrastructure — spinning up the cloud resources, applying the Terraform/IaC templates, and registering the workspace with the Databricks account.",
      "summary": "The act of creating new Databricks workspaces in the cloud. A workspace is the primary environment where users run notebooks, jobs, and queries. Organisations typically have separate workspaces for production (live business workloads) and non-production (development, testing). This row is about who deploys the workspace infrastructure — spinning up the cloud resources, applying the Terraform/IaC templates, and registering the workspace with the Databricks account.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "C",
        "EET": "R/A",
        "DMO": "–",
        "BU": "I"
      }
    },
    {
      "id": "workspace-configuration---tenant-config-bindings-policies",
      "section": "§1 · Platform & Workspace Governance",
      "title": "Workspace configuration — tenant config, bindings, policies",
      "definition": "Once a workspace exists, it needs to be configured: enabling or disabling features, binding it to the correct Unity Catalog metastore, setting default policies (e.g. which cluster types are allowed, whether serverless is enabled), and applying tenant-level configuration. This is the \"inside the workspace\" setup work — distinct from the infrastructure provisioning that creates the workspace itself.",
      "summary": "Once a workspace exists, it needs to be configured: enabling or disabling features, binding it to the correct Unity Catalog metastore, setting default policies (e.g. which cluster types are allowed, whether serverless is enabled), and applying tenant-level configuration. This is the \"inside the workspace\" setup work — distinct from the infrastructure provisioning that creates the workspace itself.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "C",
        "DMO": "–",
        "BU": "I"
      }
    },
    {
      "id": "catalog-creation-and-maintenance---technical-iac",
      "section": "§1 · Platform & Workspace Governance",
      "title": "Catalog creation & maintenance — technical (IaC)",
      "definition": "In Databricks Unity Catalog, a catalog is the top-level container for data (like a database schema namespace). This row is about the technical act of creating catalogs using Infrastructure-as-Code (IaC) — running the Terraform or Crossplane templates that provision the catalog objects, storage locations, and associated cloud resources. It is not about deciding what catalogs should exist; that is the next row.",
      "summary": "In Databricks Unity Catalog, a catalog is the top-level container for data (like a database schema namespace). This row is about the technical act of creating catalogs using Infrastructure-as-Code (IaC) — running the Terraform or Crossplane templates that provision the catalog objects, storage locations, and associated cloud resources. It is not about deciding what catalogs should exist; that is the next row.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "C",
        "EET": "R",
        "DMO": "–",
        "BU": "I"
      }
    },
    {
      "id": "catalog-structure---functional-design-data-domains-zones",
      "section": "§1 · Platform & Workspace Governance",
      "title": "Catalog structure — functional design (data domains, zones)",
      "definition": "This is the design decision about how catalogs are organised: how many top-level catalogs exist, what data domains they represent (e.g. Finance, Claims, HR), whether there are separate zones (e.g. raw, curated, consumption), and the naming conventions used. This is a governance and architecture question — the functional blueprint that the technical team then implements.",
      "summary": "This is the design decision about how catalogs are organised: how many top-level catalogs exist, what data domains they represent (e.g. Finance, Claims, HR), whether there are separate zones (e.g. raw, curated, consumption), and the naming conventions used. This is a governance and architecture question — the functional blueprint that the technical team then implements.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "–",
        "EET": "–",
        "DMO": "R/A",
        "BU": "C"
      }
    },
    {
      "id": "iam---workspace-access-and-group-configuration",
      "section": "§1 · Platform & Workspace Governance",
      "title": "IAM — Workspace access & group configuration",
      "definition": "IAM = Identity and Access Management. This row is about configuring who can access which workspace and how groups are set up inside the workspace (e.g. \"data-engineers-finance\", \"data-scientists-risk\"). It includes creating and managing workspace-level groups, assigning users to those groups, and linking groups to the identity provider. This is often a manual and painful process today.",
      "summary": "IAM = Identity and Access Management. This row is about configuring who can access which workspace and how groups are set up inside the workspace (e.g. \"data-engineers-finance\", \"data-scientists-risk\"). It includes creating and managing workspace-level groups, assigning users to those groups, and linking groups to the identity provider. This is often a manual and painful process today.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "C",
        "EET": "R",
        "DMO": "–",
        "BU": "I"
      }
    },
    {
      "id": "iam---identity-lifecycle-jml-idp-scim",
      "section": "§1 · Platform & Workspace Governance",
      "title": "IAM — Identity lifecycle (JML, IdP, SCIM)",
      "definition": "The identity lifecycle covers what happens when someone joins, moves between teams, or leaves the organisation (JML = Joiner-Mover-Leaver). IdP = Identity Provider (e.g. Microsoft Entra / Azure AD). SCIM = System for Cross-domain Identity Management — a protocol that automatically synchronises users and groups from the IdP into Databricks. This row asks: who manages the end-to-end process of ensuring that when people change roles or leave, their Databricks access is updated or revoked accordingly?",
      "summary": "The identity lifecycle covers what happens when someone joins, moves between teams, or leaves the organisation (JML = Joiner-Mover-Leaver). IdP = Identity Provider (e.g. Microsoft Entra / Azure AD). SCIM = System for Cross-domain Identity Management — a protocol that automatically synchronises users and groups from the IdP into Databricks. This row asks: who manages the end-to-end process of ensuring that when people change roles or leave, their Databricks access is updated or revoked accordingly?",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "–",
        "EET": "R/A",
        "DMO": "–",
        "BU": "I"
      }
    },
    {
      "id": "iam---unity-catalog-permissions-and-data-access",
      "section": "§1 · Platform & Workspace Governance",
      "title": "IAM — Unity Catalog permissions & data access",
      "definition": "Unity Catalog has its own permission model that controls who can read, write, or manage specific catalogs, schemas, and tables. This row is about who configures and maintains those data-access permissions within Unity Catalog — granting SELECT on a schema, managing ownership of tables, and enforcing column-level or row-level security. This is distinct from workspace access (which controls who can log in); this controls what data they can see once they're in.",
      "summary": "Unity Catalog has its own permission model that controls who can read, write, or manage specific catalogs, schemas, and tables. This row is about who configures and maintains those data-access permissions within Unity Catalog — granting SELECT on a schema, managing ownership of tables, and enforcing column-level or row-level security. This is distinct from workspace access (which controls who can log in); this controls what data they can see once they're in.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "C",
        "DMO": "C",
        "BU": "I"
      }
    },
    {
      "id": "iam---authorisation-matrix-and-directory-group-management",
      "section": "§1 · Platform & Workspace Governance",
      "title": "IAM — Authorisation matrix & directory group management",
      "definition": "An authorisation matrix is a documented mapping of \"which role gets access to what.\" Directory groups are the groups in the central identity directory (e.g. Entra ID / Active Directory) that are used to grant permissions. This row covers the design, documentation, and ongoing maintenance of that matrix — ensuring it stays current as teams and data products evolve. It also covers managing the groups themselves (creating new ones, nesting, decommissioning old ones).",
      "summary": "An authorisation matrix is a documented mapping of \"which role gets access to what.\" Directory groups are the groups in the central identity directory (e.g. Entra ID / Active Directory) that are used to grant permissions. This row covers the design, documentation, and ongoing maintenance of that matrix — ensuring it stays current as teams and data products evolve. It also covers managing the groups themselves (creating new ones, nesting, decommissioning old ones).",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "–",
        "EET": "R/A",
        "DMO": "–",
        "BU": "I"
      }
    },
    {
      "id": "iam---service-principal-provisioning-and-governance",
      "section": "§1 · Platform & Workspace Governance",
      "title": "IAM — Service principal provisioning & governance",
      "definition": "A service principal (SP) is a non-human identity used by automated processes — CI/CD pipelines, scheduled jobs, API integrations. Service principals need to be created, assigned permissions, rotated (secrets/keys renewed), and eventually decommissioned. This row asks: who provisions new SPs, who governs what they're allowed to do, and who ensures they don't accumulate excessive privileges over time?",
      "summary": "A service principal (SP) is a non-human identity used by automated processes — CI/CD pipelines, scheduled jobs, API integrations. Service principals need to be created, assigned permissions, rotated (secrets/keys renewed), and eventually decommissioned. This row asks: who provisions new SPs, who governs what they're allowed to do, and who ensures they don't accumulate excessive privileges over time?",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "–",
        "EET": "R/A",
        "DMO": "–",
        "BU": "I"
      }
    },
    {
      "id": "rbac---initial-catalog-schema-role-provisioning",
      "section": "§1 · Platform & Workspace Governance",
      "title": "RBAC — Initial catalog / schema role provisioning",
      "definition": "RBAC = Role-Based Access Control. When a new catalog or schema is created, someone needs to set up the initial roles — e.g. \"owner\", \"reader\", \"writer\" — and assign them to the right groups. This is a one-time setup activity that happens at provisioning time. The row asks who performs this initial role wiring.",
      "summary": "RBAC = Role-Based Access Control. When a new catalog or schema is created, someone needs to set up the initial roles — e.g. \"owner\", \"reader\", \"writer\" — and assign them to the right groups. This is a one-time setup activity that happens at provisioning time. The row asks who performs this initial role wiring.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "C",
        "EET": "R",
        "DMO": "–",
        "BU": "–"
      }
    },
    {
      "id": "rbac---ongoing-role-management-data-stewards-owners",
      "section": "§1 · Platform & Workspace Governance",
      "title": "RBAC — Ongoing role management (data stewards, owners)",
      "definition": "After the initial setup, roles need to be maintained: new data stewards are appointed, ownership changes as teams reorganise, new schemas are added and need role assignments. This is the day-2 operational side of access management — keeping the permissions current and aligned with the actual organisational structure and data ownership.",
      "summary": "After the initial setup, roles need to be maintained: new data stewards are appointed, ownership changes as teams reorganise, new schemas are added and need role assignments. This is the day-2 operational side of access management — keeping the permissions current and aligned with the actual organisational structure and data ownership.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "–",
        "DMO": "C",
        "BU": "A"
      }
    },
    {
      "id": "rbac-to-abac-pbac-transition---governance-and-policy",
      "section": "§1 · Platform & Workspace Governance",
      "title": "RBAC → ABAC / PBAC transition — governance & policy",
      "definition": "Many organisations start with simple role-based access (RBAC) but aspire to move towards attribute-based (ABAC) or policy-based (PBAC) access control. ABAC/PBAC makes access decisions based on attributes of the user, the data, and the context (e.g. \"any user in the risk department can access PII-tagged tables if they've completed privacy training\") rather than static role assignments. This row is about who governs the policy and roadmap for that transition — not the technical implementation, but the governance framework and decision-making.",
      "summary": "Many organisations start with simple role-based access (RBAC) but aspire to move towards attribute-based (ABAC) or policy-based (PBAC) access control. ABAC/PBAC makes access decisions based on attributes of the user, the data, and the context (e.g. \"any user in the risk department can access PII-tagged tables if they've completed privacy training\") rather than static role assignments. This row is about who governs the policy and roadmap for that transition — not the technical implementation, but the governance framework and decision-making.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "–",
        "EET": "C",
        "DMO": "R/A",
        "BU": "–"
      }
    },
    {
      "id": "cluster-policies---baseline-definition",
      "section": "§1 · Platform & Workspace Governance",
      "title": "Cluster policies — baseline definition",
      "definition": "A cluster policy in Databricks defines constraints on what types of compute resources users can spin up — e.g. maximum number of nodes, allowed instance types, auto-termination rules, Spark configuration defaults. The baseline is the organisation-wide default set of policies that apply to all workspaces. This row asks: who defines those baseline guardrails?",
      "summary": "A cluster policy in Databricks defines constraints on what types of compute resources users can spin up — e.g. maximum number of nodes, allowed instance types, auto-termination rules, Spark configuration defaults. The baseline is the organisation-wide default set of policies that apply to all workspaces. This row asks: who defines those baseline guardrails?",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "C",
        "DMO": "–",
        "BU": "–"
      }
    },
    {
      "id": "cluster-policies---bu-customisation-on-top-of-baseline",
      "section": "§1 · Platform & Workspace Governance",
      "title": "Cluster policies — BU customisation on top of baseline",
      "definition": "Business units may need to customise cluster policies for their specific workloads — for example, a data science team might need GPU-enabled clusters, or a production ETL team might need larger instance types. This row is about who is allowed to modify or extend the baseline policies within their own domain, and on what terms.",
      "summary": "Business units may need to customise cluster policies for their specific workloads — for example, a data science team might need GPU-enabled clusters, or a production ETL team might need larger instance types. This row is about who is allowed to modify or extend the baseline policies within their own domain, and on what terms.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "C",
        "EET": "–",
        "DMO": "–",
        "BU": "R/A"
      }
    },
    {
      "id": "network-configuration-vpc-private-endpoints-network-connectivity",
      "section": "§1 · Platform & Workspace Governance",
      "title": "Network configuration (VPC, private endpoints, network connectivity)",
      "definition": "This covers the networking layer that the Databricks platform runs on. VPC = Virtual Private Cloud (the isolated network boundary). Private endpoints allow Databricks to communicate with other Azure/AWS services without going over the public internet. Network connectivity includes cross-subscription links, firewall rules, and NCC (Network Connectivity Configuration) settings. This is foundational infrastructure work.",
      "summary": "This covers the networking layer that the Databricks platform runs on. VPC = Virtual Private Cloud (the isolated network boundary). Private endpoints allow Databricks to communicate with other Azure/AWS services without going over the public internet. Network connectivity includes cross-subscription links, firewall rules, and NCC (Network Connectivity Configuration) settings. This is foundational infrastructure work.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "A",
        "DMO": "–",
        "BU": "–"
      }
    },
    {
      "id": "cost-controls-and-finops---platform-baseline",
      "section": "§1 · Platform & Workspace Governance",
      "title": "Cost controls & FinOps — platform baseline",
      "definition": "FinOps = Financial Operations — the practice of managing cloud costs. The \"platform baseline\" is the set of cost controls, budgets, alerts, and dashboards that apply across the entire Databricks estate. This includes things like: setting spending alerts, creating cost-allocation tags, building FinOps dashboards, and defining chargeback/showback models. This row asks who is responsible for the platform-wide cost governance.",
      "summary": "FinOps = Financial Operations — the practice of managing cloud costs. The \"platform baseline\" is the set of cost controls, budgets, alerts, and dashboards that apply across the entire Databricks estate. This includes things like: setting spending alerts, creating cost-allocation tags, building FinOps dashboards, and defining chargeback/showback models. This row asks who is responsible for the platform-wide cost governance.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "C",
        "DMO": "–",
        "BU": "–"
      }
    },
    {
      "id": "cost-optimisation---domain-level-finops",
      "section": "§1 · Platform & Workspace Governance",
      "title": "Cost optimisation — domain-level (FinOps)",
      "definition": "While the platform baseline sets the overall cost framework, each business unit is expected to manage and optimise their own domain costs — right-sizing clusters, cleaning up unused resources, choosing efficient compute tiers. This row asks who is responsible for the FinOps discipline within each business domain. The expectation is that BUs are \"self-controlling\" on cost.",
      "summary": "While the platform baseline sets the overall cost framework, each business unit is expected to manage and optimise their own domain costs — right-sizing clusters, cleaning up unused resources, choosing efficient compute tiers. This row asks who is responsible for the FinOps discipline within each business domain. The expectation is that BUs are \"self-controlling\" on cost.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "C",
        "EET": "–",
        "DMO": "–",
        "BU": "R/A"
      }
    },
    {
      "id": "account-level-administration-features-tokens",
      "section": "§1 · Platform & Workspace Governance",
      "title": "Account-level administration (features, tokens)",
      "definition": "Databricks has an account-level console (above individual workspaces) where features can be enabled or disabled, API tokens managed, account-wide settings configured, and new capabilities (like serverless, model serving) activated. This is a highly privileged function. This row asks: who performs account-level admin tasks?",
      "summary": "Databricks has an account-level console (above individual workspaces) where features can be enabled or disabled, API tokens managed, account-wide settings configured, and new capabilities (like serverless, model serving) activated. This is a highly privileged function. This row asks: who performs account-level admin tasks?",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "–",
        "DMO": "–",
        "BU": "I"
      }
    },
    {
      "id": "platform-monitoring-and-alerting---cross-bu-platform-wide",
      "section": "§2 · Platform Reliability & Operations",
      "title": "Platform monitoring & alerting — cross-BU / platform-wide",
      "definition": "Monitoring the health and performance of the Databricks platform as a whole — across all workspaces and all business units. This includes dashboards for cluster utilisation, job success rates, API latency, storage growth, and system-level errors. Alerts fire when platform-level thresholds are breached (e.g. a workspace becomes unreachable, or DBU burn rate spikes). This is platform-team work, not domain-specific.",
      "summary": "Monitoring the health and performance of the Databricks platform as a whole — across all workspaces and all business units. This includes dashboards for cluster utilisation, job success rates, API latency, storage growth, and system-level errors. Alerts fire when platform-level thresholds are breached (e.g. a workspace becomes unreachable, or DBU burn rate spikes). This is platform-team work, not domain-specific.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "C",
        "DMO": "–",
        "BU": "I"
      }
    },
    {
      "id": "monitoring-and-alerting---domain-specific-jobs",
      "section": "§2 · Platform Reliability & Operations",
      "title": "Monitoring & alerting — domain-specific jobs",
      "definition": "Each business unit runs its own jobs, pipelines, and notebooks. This row is about monitoring those domain-specific workloads — setting up alerts when a nightly ETL fails, tracking model training job durations, or watching for data-quality anomalies. The platform may provide the tooling, but the domain team is expected to configure and manage their own alerts.",
      "summary": "Each business unit runs its own jobs, pipelines, and notebooks. This row is about monitoring those domain-specific workloads — setting up alerts when a nightly ETL fails, tracking model training job durations, or watching for data-quality anomalies. The platform may provide the tooling, but the domain team is expected to configure and manage their own alerts.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "C",
        "EET": "–",
        "DMO": "–",
        "BU": "R/A"
      }
    },
    {
      "id": "incident-management---platform-wide-incidents",
      "section": "§2 · Platform Reliability & Operations",
      "title": "Incident management — platform-wide incidents",
      "definition": "When the Databricks platform itself has a problem — an outage, a degraded service, a failed upgrade — someone needs to run the incident response: triage, communicate, escalate to Databricks support or cloud provider, coordinate recovery, and perform root-cause analysis. This row covers who manages those platform-level incidents.",
      "summary": "When the Databricks platform itself has a problem — an outage, a degraded service, a failed upgrade — someone needs to run the incident response: triage, communicate, escalate to Databricks support or cloud provider, coordinate recovery, and perform root-cause analysis. This row covers who manages those platform-level incidents.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "C",
        "DMO": "–",
        "BU": "I"
      }
    },
    {
      "id": "incident-management---domain-specific-incidents",
      "section": "§2 · Platform Reliability & Operations",
      "title": "Incident management — domain-specific incidents",
      "definition": "When a business unit's job fails, a model produces bad predictions, or a data pipeline delivers incorrect results, that is a domain-level incident. The business unit is expected to handle these, potentially with consulting support from the platform team. This row clarifies ownership of domain-specific operational issues.",
      "summary": "When a business unit's job fails, a model produces bad predictions, or a data pipeline delivers incorrect results, that is a domain-level incident. The business unit is expected to handle these, potentially with consulting support from the platform team. This row clarifies ownership of domain-specific operational issues.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "C",
        "EET": "–",
        "DMO": "–",
        "BU": "R/A"
      }
    },
    {
      "id": "performance-optimisation-guidelines",
      "section": "§2 · Platform Reliability & Operations",
      "title": "Performance optimisation guidelines",
      "definition": "Creating and publishing guidelines that help users get the best performance from Databricks — advice on Spark configuration, partition strategies, caching, photon engine usage, cluster sizing, and query optimisation. This is the standards and documentation work, not the act of tuning a specific job (which would be domain-level).",
      "summary": "Creating and publishing guidelines that help users get the best performance from Databricks — advice on Spark configuration, partition strategies, caching, photon engine usage, cluster sizing, and query optimisation. This is the standards and documentation work, not the act of tuning a specific job (which would be domain-level).",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "C",
        "DMO": "–",
        "BU": "C"
      }
    },
    {
      "id": "capacity-planning-cross-bu",
      "section": "§2 · Platform Reliability & Operations",
      "title": "Capacity planning (cross-BU)",
      "definition": "Looking ahead to ensure the platform can handle growing demand — forecasting DBU consumption, storage needs, workspace count, and user growth across all business units. This includes right-sizing reserved capacity, planning for peak periods, and budgeting for growth. A cross-cutting activity that sits above individual domains.",
      "summary": "Looking ahead to ensure the platform can handle growing demand — forecasting DBU consumption, storage needs, workspace count, and user growth across all business units. This includes right-sizing reserved capacity, planning for peak periods, and budgeting for growth. A cross-cutting activity that sits above individual domains.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "C",
        "DMO": "–",
        "BU": "C"
      }
    },
    {
      "id": "observability-standards-logging-alerting-patterns",
      "section": "§2 · Platform Reliability & Operations",
      "title": "Observability standards (logging, alerting patterns)",
      "definition": "Defining the standard way that teams should instrument their workloads for observability — what to log, where to send logs, what alerting patterns to follow, what metrics to expose. This is about creating a consistent observability baseline so that all teams produce telemetry in a uniform way that the platform can aggregate.",
      "summary": "Defining the standard way that teams should instrument their workloads for observability — what to log, where to send logs, what alerting patterns to follow, what metrics to expose. This is about creating a consistent observability baseline so that all teams produce telemetry in a uniform way that the platform can aggregate.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "C",
        "DMO": "–",
        "BU": "C"
      }
    },
    {
      "id": "enterprise-observability-pipeline---platform-telemetry-to-siem",
      "section": "§2 · Platform Reliability & Operations",
      "title": "Enterprise observability pipeline — platform telemetry to SIEM",
      "definition": "SIEM = Security Information and Event Management (e.g. Splunk, Sentinel). This row covers building and maintaining the pipeline that forwards Databricks platform telemetry (audit logs, access logs, job logs, inference logs) into the enterprise SIEM for security monitoring and compliance. It's the plumbing that connects the platform's logging to the security operations centre.",
      "summary": "SIEM = Security Information and Event Management (e.g. Splunk, Sentinel). This row covers building and maintaining the pipeline that forwards Databricks platform telemetry (audit logs, access logs, job logs, inference logs) into the enterprise SIEM for security monitoring and compliance. It's the plumbing that connects the platform's logging to the security operations centre.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "A",
        "DMO": "–",
        "BU": "–"
      }
    },
    {
      "id": "domain-level-observability---alerting-and-dashboards-on-platform-provided-data",
      "section": "§2 · Platform Reliability & Operations",
      "title": "Domain-level observability — alerting & dashboards (on platform-provided data)",
      "definition": "The platform provides observability data (logs, metrics, audit events), but each domain needs to build their own alerting rules and dashboards on top of that data — tailored to their specific workloads and SLAs. This row asks who is responsible for creating and maintaining those domain-specific observability views.",
      "summary": "The platform provides observability data (logs, metrics, audit events), but each domain needs to build their own alerting rules and dashboards on top of that data — tailored to their specific workloads and SLAs. This row asks who is responsible for creating and maintaining those domain-specific observability views.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "–",
        "EET": "–",
        "DMO": "–",
        "BU": "–"
      }
    },
    {
      "id": "platform-wide-incident-commander-role",
      "section": "§2 · Platform Reliability & Operations",
      "title": "Platform-wide incident commander role",
      "definition": "During a major platform incident, one person needs to take charge — coordinating communications, deciding on escalation paths, and ensuring the incident is managed to resolution. This row is about who fills the incident commander role for platform-wide outages or degradations.",
      "summary": "During a major platform incident, one person needs to take charge — coordinating communications, deciding on escalation paths, and ensuring the incident is managed to resolution. This row is about who fills the incident commander role for platform-wide outages or degradations.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "–",
        "DMO": "–",
        "BU": "–"
      }
    },
    {
      "id": "production-support-routing-1st-line-for-platform-issues",
      "section": "§2 · Platform Reliability & Operations",
      "title": "Production support routing (1st line for platform issues)",
      "definition": "When a user encounters a platform problem (not a domain logic bug), where do they go first? This row covers the first-line triage and routing function — receiving tickets or alerts, determining whether it's a platform issue or a domain issue, and routing it to the right team. Think of it as the platform's service desk function.",
      "summary": "When a user encounters a platform problem (not a domain logic bug), where do they go first? This row covers the first-line triage and routing function — receiving tickets or alerts, determining whether it's a platform issue or a domain issue, and routing it to the right team. Think of it as the platform's service desk function.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "–",
        "DMO": "–",
        "BU": "A"
      }
    },
    {
      "id": "sla-management-with-business-teams",
      "section": "§2 · Platform Reliability & Operations",
      "title": "SLA management with business teams",
      "definition": "Defining, agreeing, and tracking Service Level Agreements between the platform organisation and the business units — e.g. \"workspace availability of 99.9%\", \"incident response within 30 minutes\". This includes the ongoing review of whether SLAs are being met and renegotiating them as needs change.",
      "summary": "Defining, agreeing, and tracking Service Level Agreements between the platform organisation and the business units — e.g. \"workspace availability of 99.9%\", \"incident response within 30 minutes\". This includes the ongoing review of whether SLAs are being met and renegotiating them as needs change.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "–",
        "DMO": "–",
        "BU": "C"
      }
    },
    {
      "id": "supplier-contract-management-databricks",
      "section": "§2 · Platform Reliability & Operations",
      "title": "Supplier contract management (Databricks)",
      "definition": "Managing the commercial relationship with Databricks — the license agreement, committed-use discounts, support tiers, feature access, renewal negotiations, and escalation contacts. This is a procurement/vendor-management activity.",
      "summary": "Managing the commercial relationship with Databricks — the license agreement, committed-use discounts, support tiers, feature access, renewal negotiations, and escalation contacts. This is a procurement/vendor-management activity.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "–",
        "DMO": "–",
        "BU": "–"
      }
    },
    {
      "id": "unity-catalog-design---functional-data-domain-structure-zones-naming",
      "section": "§3 · Data Governance & Catalog Management",
      "title": "Unity Catalog design — functional (data domain structure, zones, naming)",
      "definition": "The functional design of Unity Catalog: deciding how many top-level catalogs exist, what data domains they represent, what zones are used (e.g. bronze/silver/gold, or raw/curated/consumption), and what naming conventions apply. This is a governance/architecture decision — it defines the logical structure of the entire data estate on Databricks.",
      "summary": "The functional design of Unity Catalog: deciding how many top-level catalogs exist, what data domains they represent, what zones are used (e.g. bronze/silver/gold, or raw/curated/consumption), and what naming conventions apply. This is a governance/architecture decision — it defines the logical structure of the entire data estate on Databricks.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "–",
        "EET": "–",
        "DMO": "R/A",
        "BU": "C"
      }
    },
    {
      "id": "unity-catalog-administration---technical-implementation",
      "section": "§3 · Data Governance & Catalog Management",
      "title": "Unity Catalog administration — technical implementation",
      "definition": "The technical execution of the Unity Catalog design: creating catalogs, schemas, and storage credentials in the Unity Catalog system; running SQL GRANT statements; configuring external locations; and maintaining the metastore. This is the hands-on admin work that implements what the functional design specifies.",
      "summary": "The technical execution of the Unity Catalog design: creating catalogs, schemas, and storage credentials in the Unity Catalog system; running SQL GRANT statements; configuring external locations; and maintaining the metastore. This is the hands-on admin work that implements what the functional design specifies.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "C",
        "DMO": "–",
        "BU": "–"
      }
    },
    {
      "id": "data-classification-pii-confidential-public",
      "section": "§3 · Data Governance & Catalog Management",
      "title": "Data classification (PII, confidential, public)",
      "definition": "Tagging data with its sensitivity level — PII (Personally Identifiable Information), confidential, internal, or public. Data classification drives access controls, retention policies, masking rules, and compliance obligations. This row asks who defines the classification scheme and who is responsible for ensuring data is correctly classified.",
      "summary": "Tagging data with its sensitivity level — PII (Personally Identifiable Information), confidential, internal, or public. Data classification drives access controls, retention policies, masking rules, and compliance obligations. This row asks who defines the classification scheme and who is responsible for ensuring data is correctly classified.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "–",
        "EET": "–",
        "DMO": "R/A",
        "BU": "C"
      }
    },
    {
      "id": "catalog-ownership-models---functional",
      "section": "§3 · Data Governance & Catalog Management",
      "title": "Catalog ownership models — functional",
      "definition": "Defining the ownership model for catalogs: who is the designated owner of each catalog, what rights and obligations come with ownership, and how disputes are resolved. This is a governance policy question — e.g. \"the Finance data domain catalog is owned by the Finance BU data steward, with DMO providing the framework.\"",
      "summary": "Defining the ownership model for catalogs: who is the designated owner of each catalog, what rights and obligations come with ownership, and how disputes are resolved. This is a governance policy question — e.g. \"the Finance data domain catalog is owned by the Finance BU data steward, with DMO providing the framework.\"",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "–",
        "EET": "–",
        "DMO": "R/A",
        "BU": "C"
      }
    },
    {
      "id": "schema-and-table-ownership---domain-stewardship",
      "section": "§3 · Data Governance & Catalog Management",
      "title": "Schema & table ownership — domain stewardship",
      "definition": "Below the catalog level, individual schemas and tables also need owners — data stewards who are accountable for the quality, documentation, and access rules of their data. This row asks who appoints and manages those stewards, and who is accountable for stewardship at the schema/table level. Typically this sits with the business units.",
      "summary": "Below the catalog level, individual schemas and tables also need owners — data stewards who are accountable for the quality, documentation, and access rules of their data. This row asks who appoints and manages those stewards, and who is accountable for stewardship at the schema/table level. Typically this sits with the business units.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "–",
        "EET": "–",
        "DMO": "C",
        "BU": "R/A"
      }
    },
    {
      "id": "data-access-policies-and-entitlements",
      "section": "§3 · Data Governance & Catalog Management",
      "title": "Data access policies & entitlements",
      "definition": "The policies that define who is allowed to access what data, under what conditions. This includes entitlement rules (e.g. \"all risk analysts can access the risk catalog\"), exception processes, and how policies are translated into technical controls (UC grants, dynamic views, row filters). This is distinct from IAM (which controls platform access); this controls data access.",
      "summary": "The policies that define who is allowed to access what data, under what conditions. This includes entitlement rules (e.g. \"all risk analysts can access the risk catalog\"), exception processes, and how policies are translated into technical controls (UC grants, dynamic views, row filters). This is distinct from IAM (which controls platform access); this controls data access.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "C",
        "EET": "C",
        "DMO": "R/A",
        "BU": "C"
      }
    },
    {
      "id": "data-lineage-and-audit-logging",
      "section": "§3 · Data Governance & Catalog Management",
      "title": "Data lineage & audit logging",
      "definition": "Data lineage tracks where data comes from, how it is transformed, and where it flows to — allowing impact analysis and root-cause tracing. Audit logging records who accessed or changed data and when. This row covers the technical implementation of lineage tracking and audit log capture, as well as the governance accountability for ensuring they are complete and accurate.",
      "summary": "Data lineage tracks where data comes from, how it is transformed, and where it flows to — allowing impact analysis and root-cause tracing. Audit logging records who accessed or changed data and when. This row covers the technical implementation of lineage tracking and audit log capture, as well as the governance accountability for ensuring they are complete and accurate.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "–",
        "DMO": "A",
        "BU": "I"
      }
    },
    {
      "id": "retention-and-deletion-policies",
      "section": "§3 · Data Governance & Catalog Management",
      "title": "Retention & deletion policies",
      "definition": "Policies that define how long data is kept and when it must be deleted — driven by regulatory requirements (GDPR, DORA), business needs, and storage cost management. This includes both the policy definition (governance) and the technical execution (automated deletion jobs, archival processes).",
      "summary": "Policies that define how long data is kept and when it must be deleted — driven by regulatory requirements (GDPR, DORA), business needs, and storage cost management. This includes both the policy definition (governance) and the technical execution (automated deletion jobs, archival processes).",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "C",
        "EET": "–",
        "DMO": "R/A",
        "BU": "C"
      }
    },
    {
      "id": "data-catalog-↔-unity-catalog-synchronisation",
      "section": "§3 · Data Governance & Catalog Management",
      "title": "Data Catalog ↔ Unity Catalog synchronisation",
      "definition": "Many enterprises have a separate data catalog tool (e.g. Collibra, Alation) that serves as the enterprise-wide inventory of data assets. Unity Catalog is Databricks' built-in catalog. This row covers the synchronisation between the two — ensuring that metadata, ownership, classifications, and glossary terms are consistent across both systems. This often involves automated sync jobs and reconciliation processes.",
      "summary": "Many enterprises have a separate data catalog tool (e.g. Collibra, Alation) that serves as the enterprise-wide inventory of data assets. Unity Catalog is Databricks' built-in catalog. This row covers the synchronisation between the two — ensuring that metadata, ownership, classifications, and glossary terms are consistent across both systems. This often involves automated sync jobs and reconciliation processes.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "–",
        "DMO": "A",
        "BU": "–"
      }
    },
    {
      "id": "metastore-admin-change-requests-new-catalogs-storage-locations",
      "section": "§3 · Data Governance & Catalog Management",
      "title": "Metastore admin change requests (new catalogs, storage locations)",
      "definition": "The metastore is the top-level Unity Catalog container that holds all catalogs. Making changes at the metastore level — creating new catalogs, registering new storage locations, modifying storage credentials — is a privileged operation. This row covers the process: who can request changes, who approves them, who executes them, and how the request flow works (e.g. via a ticketing system).",
      "summary": "The metastore is the top-level Unity Catalog container that holds all catalogs. Making changes at the metastore level — creating new catalogs, registering new storage locations, modifying storage credentials — is a privileged operation. This row covers the process: who can request changes, who approves them, who executes them, and how the request flow works (e.g. via a ticketing system).",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "C",
        "EET": "R",
        "DMO": "A",
        "BU": "C"
      }
    },
    {
      "id": "data-governance-framework-overall",
      "section": "§3 · Data Governance & Catalog Management",
      "title": "Data governance framework (overall)",
      "definition": "The overarching framework that ties all data governance activities together: the principles, policies, standards, roles, and processes that ensure data is managed as a strategic asset. This is the \"constitution\" of data governance — it sits above individual policies (classification, retention, access) and provides the structure within which they all operate.",
      "summary": "The overarching framework that ties all data governance activities together: the principles, policies, standards, roles, and processes that ensure data is managed as a strategic asset. This is the \"constitution\" of data governance — it sits above individual policies (classification, retention, access) and provides the structure within which they all operate.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "–",
        "EET": "–",
        "DMO": "R/A",
        "BU": "C"
      }
    },
    {
      "id": "standard-mlops-patterns-ci-cd-model-promotion-rollback",
      "section": "§4 · MLOps & Shared Engineering Standards",
      "title": "Standard MLOps patterns (CI/CD, model promotion, rollback)",
      "definition": "The standardised way that ML models move from development to production. CI/CD = Continuous Integration / Continuous Deployment — automated pipelines that test and deploy code. Model promotion = moving a model from dev to staging to production with appropriate gates. Rollback = reverting to a previous model version if the new one causes problems. This row asks who defines and maintains these standard patterns.",
      "summary": "The standardised way that ML models move from development to production. CI/CD = Continuous Integration / Continuous Deployment — automated pipelines that test and deploy code. Model promotion = moving a model from dev to staging to production with appropriate gates. Rollback = reverting to a previous model version if the new one causes problems. This row asks who defines and maintains these standard patterns.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "C",
        "DMO": "–",
        "BU": "C"
      }
    },
    {
      "id": "mlflow-tracking-and-model-registry-governance",
      "section": "§4 · MLOps & Shared Engineering Standards",
      "title": "MLflow tracking & model registry governance",
      "definition": "MLflow is an open-source platform (built into Databricks) for tracking experiments, packaging models, and managing model versions. The model registry is where production-ready models are registered, versioned, and transitioned through stages (Staging → Production → Archived). This row covers the governance of that registry — who sets the rules for model registration, versioning, and lifecycle management.",
      "summary": "MLflow is an open-source platform (built into Databricks) for tracking experiments, packaging models, and managing model versions. The model registry is where production-ready models are registered, versioned, and transitioned through stages (Staging → Production → Archived). This row covers the governance of that registry — who sets the rules for model registration, versioning, and lifecycle management.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "–",
        "DMO": "–",
        "BU": "C"
      }
    },
    {
      "id": "feature-store-standards-naming-reuse-ownership",
      "section": "§4 · MLOps & Shared Engineering Standards",
      "title": "Feature store standards (naming, reuse, ownership)",
      "definition": "A feature store is a centralised repository of pre-computed features (input variables for ML models) that can be shared and reused across teams. This row covers the standards for naming features, encouraging reuse (instead of each team computing the same feature independently), and clarifying ownership — who maintains a feature, who is allowed to modify it, and who is responsible for its quality.",
      "summary": "A feature store is a centralised repository of pre-computed features (input variables for ML models) that can be shared and reused across teams. This row covers the standards for naming features, encouraging reuse (instead of each team computing the same feature independently), and clarifying ownership — who maintains a feature, who is allowed to modify it, and who is responsible for its quality.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "C",
        "DMO": "–",
        "BU": "C"
      }
    },
    {
      "id": "inference-architecture-patterns-batch-real-time",
      "section": "§4 · MLOps & Shared Engineering Standards",
      "title": "Inference architecture patterns (batch, real-time)",
      "definition": "Inference is the act of using a trained model to make predictions on new data. Batch inference processes large volumes of data on a schedule (e.g. nightly scoring). Real-time inference serves predictions on demand with low latency (e.g. API endpoint). This row covers who defines the standard architecture patterns for both modes — including model serving endpoints, scaling strategies, and integration patterns.",
      "summary": "Inference is the act of using a trained model to make predictions on new data. Batch inference processes large volumes of data on a schedule (e.g. nightly scoring). Real-time inference serves predictions on demand with low latency (e.g. API endpoint). This row covers who defines the standard architecture patterns for both modes — including model serving endpoints, scaling strategies, and integration patterns.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "–",
        "DMO": "–",
        "BU": "C"
      }
    },
    {
      "id": "monitoring-standards-drift-bias-performance",
      "section": "§4 · MLOps & Shared Engineering Standards",
      "title": "Monitoring standards (drift, bias, performance)",
      "definition": "Once models are in production, they need to be monitored. Drift = the model's input data or predictions change over time, degrading accuracy. Bias = the model produces unfair outcomes for certain groups. Performance = latency, throughput, and resource consumption. This row asks who defines the monitoring standards that all production models must follow.",
      "summary": "Once models are in production, they need to be monitored. Drift = the model's input data or predictions change over time, degrading accuracy. Bias = the model produces unfair outcomes for certain groups. Performance = latency, throughput, and resource consumption. This row asks who defines the monitoring standards that all production models must follow.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "C",
        "DMO": "C",
        "BU": "C"
      }
    },
    {
      "id": "approved-libraries-runtimes-base-images",
      "section": "§4 · MLOps & Shared Engineering Standards",
      "title": "Approved libraries, runtimes, base images",
      "definition": "Controlling what software can run on the platform: which Python/R/Scala libraries are approved, which Databricks Runtime versions are supported, and which container base images are allowed for custom environments. This is a security and stability concern — unapproved libraries could introduce vulnerabilities or break compatibility. This row asks who curates and maintains the approved list.",
      "summary": "Controlling what software can run on the platform: which Python/R/Scala libraries are approved, which Databricks Runtime versions are supported, and which container base images are allowed for custom environments. This is a security and stability concern — unapproved libraries could introduce vulnerabilities or break compatibility. This row asks who curates and maintains the approved list.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "C",
        "DMO": "–",
        "BU": "C"
      }
    },
    {
      "id": "code-promotion-support-and-implementation-quality-review",
      "section": "§4 · MLOps & Shared Engineering Standards",
      "title": "Code promotion support & implementation quality review",
      "definition": "The process of moving code from development through acceptance/staging to production (Dev → Acc → Prod). This row also covers quality review — who reviews the actual implementation for best practices, performance, security, and correctness before it reaches production? This is a critical quality gate.",
      "summary": "The process of moving code from development through acceptance/staging to production (Dev → Acc → Prod). This row also covers quality review — who reviews the actual implementation for best practices, performance, security, and correctness before it reaches production? This is a critical quality gate.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "–",
        "DMO": "–",
        "BU": "A"
      }
    },
    {
      "id": "sdk-development-and-maintenance-bolt-on-tooling",
      "section": "§4 · MLOps & Shared Engineering Standards",
      "title": "SDK development & maintenance (bolt-on tooling)",
      "definition": "SDK = Software Development Kit. The platform team may build internal SDKs, CLI tools, cookiecutter templates, and CI/CD golden paths that make it easier for business units to build on the platform. This row covers who develops and maintains those bolt-on tools — the internal developer experience tooling.",
      "summary": "SDK = Software Development Kit. The platform team may build internal SDKs, CLI tools, cookiecutter templates, and CI/CD golden paths that make it easier for business units to build on the platform. This row covers who develops and maintains those bolt-on tools — the internal developer experience tooling.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "–",
        "DMO": "–",
        "BU": "C"
      }
    },
    {
      "id": "reference-architectures-and-templates",
      "section": "§5 · Enablement, Adoption & Guardrails",
      "title": "Reference architectures & templates",
      "definition": "Pre-built reference architectures (e.g. \"how to build a batch scoring pipeline\", \"how to set up a medallion architecture\") and templates (starter projects, Terraform modules, notebook templates) that teams can use as a starting point. This row asks who creates and maintains these reusable assets.",
      "summary": "Pre-built reference architectures (e.g. \"how to build a batch scoring pipeline\", \"how to set up a medallion architecture\") and templates (starter projects, Terraform modules, notebook templates) that teams can use as a starting point. This row asks who creates and maintains these reusable assets.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "C",
        "DMO": "–",
        "BU": "C"
      }
    },
    {
      "id": "golden-notebooks-pipelines",
      "section": "§5 · Enablement, Adoption & Guardrails",
      "title": "Golden notebooks / pipelines",
      "definition": "A \"golden notebook\" or \"golden pipeline\" is a curated, best-practice example of how to do something on the platform — e.g. a notebook that demonstrates proper DLT ingestion with quality checks, or a CI/CD pipeline that follows all standards. These serve as the \"this is how we do it here\" reference for new teams.",
      "summary": "A \"golden notebook\" or \"golden pipeline\" is a curated, best-practice example of how to do something on the platform — e.g. a notebook that demonstrates proper DLT ingestion with quality checks, or a CI/CD pipeline that follows all standards. These serve as the \"this is how we do it here\" reference for new teams.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "–",
        "DMO": "–",
        "BU": "C"
      }
    },
    {
      "id": "best-practice-documentation",
      "section": "§5 · Enablement, Adoption & Guardrails",
      "title": "Best-practice documentation",
      "definition": "Written documentation that codifies the platform's recommended ways of working: coding standards, data modelling guidelines, security practices, Spark tuning tips, naming conventions, and operational runbooks. This row asks who writes and maintains this documentation.",
      "summary": "Written documentation that codifies the platform's recommended ways of working: coding standards, data modelling guidelines, security practices, Spark tuning tips, naming conventions, and operational runbooks. This row asks who writes and maintains this documentation.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "–",
        "DMO": "C",
        "BU": "C"
      }
    },
    {
      "id": "training-and-onboarding-paths",
      "section": "§5 · Enablement, Adoption & Guardrails",
      "title": "Training & onboarding paths",
      "definition": "Structured learning paths for new users of the platform — from basic onboarding (\"how to log in and run your first notebook\") to advanced training (\"building production MLOps pipelines\"). This includes both self-paced content and instructor-led sessions.",
      "summary": "Structured learning paths for new users of the platform — from basic onboarding (\"how to log in and run your first notebook\") to advanced training (\"building production MLOps pipelines\"). This includes both self-paced content and instructor-led sessions.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "–",
        "DMO": "–",
        "BU": "I"
      }
    },
    {
      "id": "community-of-practice-guilds-office-hours",
      "section": "§5 · Enablement, Adoption & Guardrails",
      "title": "Community of practice (guilds, office hours)",
      "definition": "Ongoing community structures that facilitate knowledge sharing: guilds (cross-team groups with shared interests, e.g. \"ML Guild\"), office hours (regular drop-in sessions where experts answer questions), Slack channels, and brown-bag sessions. This row asks who organises and sustains these communities.",
      "summary": "Ongoing community structures that facilitate knowledge sharing: guilds (cross-team groups with shared interests, e.g. \"ML Guild\"), office hours (regular drop-in sessions where experts answer questions), Slack channels, and brown-bag sessions. This row asks who organises and sustains these communities.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "–",
        "DMO": "–",
        "BU": "C"
      }
    },
    {
      "id": "new-feature-assessment-databricks-releases",
      "section": "§5 · Enablement, Adoption & Guardrails",
      "title": "New feature assessment (Databricks releases)",
      "definition": "Databricks regularly releases new features and capabilities. Someone needs to evaluate each release — assess whether a feature is relevant, test it in non-production, determine if it should be enabled, and decide if it changes any existing standards. This row covers that assessment and decision-making process.",
      "summary": "Databricks regularly releases new features and capabilities. Someone needs to evaluate each release — assess whether a feature is relevant, test it in non-production, determine if it should be enabled, and decide if it changes any existing standards. This row covers that assessment and decision-making process.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "A",
        "DMO": "–",
        "BU": "C"
      }
    },
    {
      "id": "champion-network-per-domain-and-persona",
      "section": "§5 · Enablement, Adoption & Guardrails",
      "title": "Champion network (per domain & persona)",
      "definition": "A champion is a person within a business unit who acts as a local advocate and first point of contact for the platform. A champion network ensures there is at least one champion per domain and per persona type (data engineer, data scientist, analyst). This row asks who nominates, coordinates, and supports the champions.",
      "summary": "A champion is a person within a business unit who acts as a local advocate and first point of contact for the platform. A champion network ensures there is at least one champion per domain and per persona type (data engineer, data scientist, analyst). This row asks who nominates, coordinates, and supports the champions.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "–",
        "DMO": "–",
        "BU": "A"
      }
    },
    {
      "id": "use-case-acceleration-bootstrap-engagements",
      "section": "§5 · Enablement, Adoption & Guardrails",
      "title": "Use case acceleration / bootstrap engagements",
      "definition": "When a business unit starts a new use case on the platform, the first few weeks can be slow and risky. Bootstrap engagements are time-boxed consulting engagements where platform experts embed with the BU team to de-risk the project — helping with architecture, code structure, CI/CD setup, and best practices. This row asks who runs those engagements.",
      "summary": "When a business unit starts a new use case on the platform, the first few weeks can be slow and risky. Bootstrap engagements are time-boxed consulting engagements where platform experts embed with the BU team to de-risk the project — helping with architecture, code structure, CI/CD setup, and best practices. This row asks who runs those engagements.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "–",
        "DMO": "–",
        "BU": "C"
      }
    },
    {
      "id": "education-and-certification-tracking",
      "section": "§5 · Enablement, Adoption & Guardrails",
      "title": "Education & certification tracking",
      "definition": "Tracking which users have completed which training courses and certifications (e.g. Databricks Certified Data Engineer Associate). This is important for compliance, skills planning, and identifying gaps. This row asks who manages the tracking system and reports on certification status.",
      "summary": "Tracking which users have completed which training courses and certifications (e.g. Databricks Certified Data Engineer Associate). This is important for compliance, skills planning, and identifying gaps. This row asks who manages the tracking system and reports on certification status.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "–",
        "DMO": "–",
        "BU": "I"
      }
    },
    {
      "id": "migration-assistance-existing-projects-to-platform",
      "section": "§5 · Enablement, Adoption & Guardrails",
      "title": "Migration assistance (existing projects → platform)",
      "definition": "Many organisations have existing data and AI workloads running on legacy platforms (on-prem Hadoop, standalone Spark clusters, Azure Data Factory, etc.). Migrating these to Databricks requires technical assistance — refactoring code, rewriting pipelines, validating outputs. This row asks who provides that migration support and who is accountable for a successful migration.",
      "summary": "Many organisations have existing data and AI workloads running on legacy platforms (on-prem Hadoop, standalone Spark clusters, Azure Data Factory, etc.). Migrating these to Databricks requires technical assistance — refactoring code, rewriting pipelines, validating outputs. This row asks who provides that migration support and who is accountable for a successful migration.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "C",
        "DMO": "–",
        "BU": "A"
      }
    },
    {
      "id": "databricks-account-admin-root-privilege",
      "section": "§6 · Privileged Roles & Admin Functions",
      "title": "Databricks Account Admin (root privilege)",
      "definition": "The Account Admin has the highest level of privilege in Databricks — they can create and delete workspaces, manage all users, enable or disable features, and access all data. This is the \"root\" of the Databricks account. This row asks who holds this privilege and who governs its use.",
      "summary": "The Account Admin has the highest level of privilege in Databricks — they can create and delete workspaces, manage all users, enable or disable features, and access all data. This is the \"root\" of the Databricks account. This row asks who holds this privilege and who governs its use.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "C",
        "DMO": "–",
        "BU": "–"
      }
    },
    {
      "id": "unity-catalog-metastore-admin",
      "section": "§6 · Privileged Roles & Admin Functions",
      "title": "Unity Catalog Metastore Admin",
      "definition": "The Metastore Admin can manage the Unity Catalog metastore — creating catalogs, managing storage credentials, granting high-level permissions, and modifying the metastore configuration. This is a highly privileged role within the data governance layer. This row asks who holds it and who governs its use.",
      "summary": "The Metastore Admin can manage the Unity Catalog metastore — creating catalogs, managing storage credentials, granting high-level permissions, and modifying the metastore configuration. This is a highly privileged role within the data governance layer. This row asks who holds it and who governs its use.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "A",
        "DMO": "C",
        "BU": "–"
      }
    },
    {
      "id": "break-glass-emergency-access-process",
      "section": "§6 · Privileged Roles & Admin Functions",
      "title": "Break-glass / emergency access process",
      "definition": "A break-glass process is the procedure for granting emergency elevated access when normal channels are unavailable — e.g. during a critical production incident when the usual admin is unreachable. This row asks who designs, documents, and manages the break-glass procedure, and who is authorised to invoke it.",
      "summary": "A break-glass process is the procedure for granting emergency elevated access when normal channels are unavailable — e.g. during a critical production incident when the usual admin is unreachable. This row asks who designs, documents, and manages the break-glass procedure, and who is authorised to invoke it.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "C",
        "DMO": "–",
        "BU": "–"
      }
    },
    {
      "id": "privileged-access-review-and-rotation",
      "section": "§6 · Privileged Roles & Admin Functions",
      "title": "Privileged access review & rotation",
      "definition": "Regularly reviewing who has privileged access (Account Admin, Metastore Admin, service principals with broad permissions) and rotating credentials (changing secrets, revoking stale tokens). This is a security hygiene activity. This row asks who executes the reviews and who is accountable for ensuring they happen on schedule.",
      "summary": "Regularly reviewing who has privileged access (Account Admin, Metastore Admin, service principals with broad permissions) and rotating credentials (changing secrets, revoking stale tokens). This is a security hygiene activity. This row asks who executes the reviews and who is accountable for ensuring they happen on schedule.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "A",
        "DMO": "–",
        "BU": "–"
      }
    },
    {
      "id": "siem-integration---platform-and-inference-telemetry",
      "section": "§7 · Security, Compliance & IT Service Management",
      "title": "SIEM integration — platform & inference telemetry",
      "definition": "SIEM = Security Information and Event Management. This row covers connecting Databricks platform logs and AI/ML inference telemetry (who called which model, with what input, producing what output) to the enterprise SIEM system for real-time security monitoring, threat detection, and forensic investigation.",
      "summary": "SIEM = Security Information and Event Management. This row covers connecting Databricks platform logs and AI/ML inference telemetry (who called which model, with what input, producing what output) to the enterprise SIEM system for real-time security monitoring, threat detection, and forensic investigation.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "A",
        "DMO": "–",
        "BU": "–"
      }
    },
    {
      "id": "vulnerability-management-and-tscm---platform-baseline",
      "section": "§7 · Security, Compliance & IT Service Management",
      "title": "Vulnerability management & TSCM — platform baseline",
      "definition": "TSCM = Technical Security Compliance Monitoring. This is the practice of scanning the platform infrastructure for known vulnerabilities, misconfigurations, and deviations from the security baseline — and remediating them. This row covers the platform-level baseline: the Databricks workspaces, storage accounts, networking, and supporting cloud resources.",
      "summary": "TSCM = Technical Security Compliance Monitoring. This is the practice of scanning the platform infrastructure for known vulnerabilities, misconfigurations, and deviations from the security baseline — and remediating them. This row covers the platform-level baseline: the Databricks workspaces, storage accounts, networking, and supporting cloud resources.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "C",
        "EET": "R/A",
        "DMO": "–",
        "BU": "–"
      }
    },
    {
      "id": "vulnerability-management---domain-specific-workloads",
      "section": "§7 · Security, Compliance & IT Service Management",
      "title": "Vulnerability management — domain-specific workloads",
      "definition": "The same vulnerability management practice, but applied to domain-specific workloads — the code, libraries, containers, and configurations deployed by business units on top of the platform. This row separates the responsibility: the platform team secures the platform; each domain secures their own workloads.",
      "summary": "The same vulnerability management practice, but applied to domain-specific workloads — the code, libraries, containers, and configurations deployed by business units on top of the platform. This row separates the responsibility: the platform team secures the platform; each domain secures their own workloads.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "C",
        "EET": "C",
        "DMO": "–",
        "BU": "R/A"
      }
    },
    {
      "id": "ai-gateway---security-policies-routing-content-safety-pii-redaction",
      "section": "§7 · Security, Compliance & IT Service Management",
      "title": "AI Gateway — security policies (routing, content safety, PII redaction)",
      "definition": "The AI Gateway is a control point through which all AI/ML inference traffic flows. Security policies on the gateway can enforce: routing rules (which models can be called by which users), content safety (blocking harmful inputs/outputs), and PII redaction (stripping personally identifiable information from model inputs before they reach an external LLM). This row asks who defines and maintains those security policies.",
      "summary": "The AI Gateway is a control point through which all AI/ML inference traffic flows. Security policies on the gateway can enforce: routing rules (which models can be called by which users), content safety (blocking harmful inputs/outputs), and PII redaction (stripping personally identifiable information from model inputs before they reach an external LLM). This row asks who defines and maintains those security policies.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "C",
        "DMO": "C",
        "BU": "I"
      }
    },
    {
      "id": "ai-model-risk-register-and-compliance-evidence",
      "section": "§7 · Security, Compliance & IT Service Management",
      "title": "AI model risk register & compliance evidence",
      "definition": "A model risk register is a documented inventory of all AI/ML models in production, along with their risk classifications, known limitations, and mitigation measures. Compliance evidence is the documentation needed to demonstrate to auditors and regulators that AI models are governed appropriately (in line with EU AI Act, DORA, internal risk frameworks). This row asks who maintains the register and produces the evidence.",
      "summary": "A model risk register is a documented inventory of all AI/ML models in production, along with their risk classifications, known limitations, and mitigation measures. Compliance evidence is the documentation needed to demonstrate to auditors and regulators that AI models are governed appropriately (in line with EU AI Act, DORA, internal risk frameworks). This row asks who maintains the register and produces the evidence.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "C",
        "EET": "–",
        "DMO": "R/A",
        "BU": "C"
      }
    },
    {
      "id": "configuration-drift-reconciliation",
      "section": "§7 · Security, Compliance & IT Service Management",
      "title": "Configuration drift reconciliation",
      "definition": "Over time, the actual configuration of the platform can drift from its intended state — manual changes accumulate, IaC and reality diverge. Drift reconciliation is the process of detecting those differences and bringing the platform back into alignment with its defined configuration. This row asks who is responsible for detecting and remediating drift.",
      "summary": "Over time, the actual configuration of the platform can drift from its intended state — manual changes accumulate, IaC and reality diverge. Drift reconciliation is the process of detecting those differences and bringing the platform back into alignment with its defined configuration. This row asks who is responsible for detecting and remediating drift.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "A",
        "DMO": "–",
        "BU": "–"
      }
    },
    {
      "id": "security-incident-response---platform-vs-domain-scope",
      "section": "§7 · Security, Compliance & IT Service Management",
      "title": "Security incident response — platform vs. domain scope",
      "definition": "When a security incident occurs (data breach, unauthorised access, malware), someone needs to lead the response. This row clarifies ownership: platform-scope incidents (e.g. a compromised service principal with platform-wide access) vs. domain-scope incidents (e.g. a BU user accidentally exposes sensitive data). Different teams may lead depending on the scope.",
      "summary": "When a security incident occurs (data breach, unauthorised access, malware), someone needs to lead the response. This row clarifies ownership: platform-scope incidents (e.g. a compromised service principal with platform-wide access) vs. domain-scope incidents (e.g. a BU user accidentally exposes sensitive data). Different teams may lead depending on the scope.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "A",
        "DMO": "–",
        "BU": "C"
      }
    },
    {
      "id": "seca-documentation---platform-and-domain-workloads",
      "section": "§7 · Security, Compliance & IT Service Management",
      "title": "SECA documentation — platform & domain workloads",
      "definition": "SECA = Security Architecture documentation (or Security and Compliance Assessment, depending on the organisation). This is the formal documentation of the security architecture, threat model, and risk assessment for the Databricks platform and the workloads running on it. This row asks who writes and maintains this documentation for the platform and for domain workloads respectively.",
      "summary": "SECA = Security Architecture documentation (or Security and Compliance Assessment, depending on the organisation). This is the formal documentation of the security architecture, threat model, and risk assessment for the Databricks platform and the workloads running on it. This row asks who writes and maintains this documentation for the platform and for domain workloads respectively.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "A",
        "DMO": "C",
        "BU": "C"
      }
    },
    {
      "id": "it-controls---definition-attestation-and-evidence-sox-nis2-dora",
      "section": "§7 · Security, Compliance & IT Service Management",
      "title": "IT controls — definition, attestation & evidence (SOX, NIS2, DORA)",
      "definition": "IT controls are the specific procedures and safeguards that ensure compliance with regulations. SOX = Sarbanes-Oxley (financial reporting controls). NIS2 = EU Network and Information Security Directive (cybersecurity obligations). DORA = Digital Operational Resilience Act (ICT risk management for financial institutions). This row covers: defining which controls apply, performing periodic attestation (confirming controls are in place), and collecting evidence for auditors.",
      "summary": "IT controls are the specific procedures and safeguards that ensure compliance with regulations. SOX = Sarbanes-Oxley (financial reporting controls). NIS2 = EU Network and Information Security Directive (cybersecurity obligations). DORA = Digital Operational Resilience Act (ICT risk management for financial institutions). This row covers: defining which controls apply, performing periodic attestation (confirming controls are in place), and collecting evidence for auditors.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "C",
        "EET": "R",
        "DMO": "A",
        "BU": "C"
      }
    },
    {
      "id": "servicenow---ci-registration-and-change-management",
      "section": "§7 · Security, Compliance & IT Service Management",
      "title": "ServiceNow — CI registration & change management",
      "definition": "ServiceNow is the enterprise IT service management platform. CI = Configuration Item — a record in the CMDB representing a platform component. Change management = the process of requesting, approving, and tracking changes to production systems. This row asks who registers Databricks components as CIs in ServiceNow and who manages changes through the formal change process.",
      "summary": "ServiceNow is the enterprise IT service management platform. CI = Configuration Item — a record in the CMDB representing a platform component. Change management = the process of requesting, approving, and tracking changes to production systems. This row asks who registers Databricks components as CIs in ServiceNow and who manages changes through the formal change process.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "A",
        "DMO": "–",
        "BU": "I"
      }
    },
    {
      "id": "cmdb-management---platform-and-domain-resources",
      "section": "§7 · Security, Compliance & IT Service Management",
      "title": "CMDB management — platform & domain resources",
      "definition": "CMDB = Configuration Management Database — the enterprise registry of all IT assets and their relationships. This row covers keeping the CMDB up to date with Databricks platform resources (workspaces, clusters, storage accounts) and domain resources (pipelines, models, endpoints). Accurate CMDB records are essential for incident management, impact analysis, and audit.",
      "summary": "CMDB = Configuration Management Database — the enterprise registry of all IT assets and their relationships. This row covers keeping the CMDB up to date with Databricks platform resources (workspaces, clusters, storage accounts) and domain resources (pipelines, models, endpoints). Accurate CMDB records are essential for incident management, impact analysis, and audit.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "A",
        "DMO": "–",
        "BU": "C"
      }
    },
    {
      "id": "audit-readiness-and-regulatory-reporting",
      "section": "§7 · Security, Compliance & IT Service Management",
      "title": "Audit readiness & regulatory reporting",
      "definition": "The ongoing effort to ensure the platform and its workloads are audit-ready at any time — that all required documentation, evidence, and controls are in place and can be produced on demand. This also covers regulatory reporting — producing the reports required by financial regulators, data protection authorities, or internal audit functions.",
      "summary": "The ongoing effort to ensure the platform and its workloads are audit-ready at any time — that all required documentation, evidence, and controls are in place and can be produced on demand. This also covers regulatory reporting — producing the reports required by financial regulators, data protection authorities, or internal audit functions.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "C",
        "EET": "C",
        "DMO": "R/A",
        "BU": "C"
      }
    },
    {
      "id": "subscription-provisioning-and-topology-platform-and-bu-subscriptions",
      "section": "§8 · Foundational Resources & Infrastructure",
      "title": "Subscription provisioning & topology (platform and BU subscriptions)",
      "definition": "Cloud subscriptions (Azure subscriptions or AWS accounts) are the billing and security boundary for cloud resources. This row covers who provisions new subscriptions, how the subscription topology is designed (e.g. hub-spoke model, separate subscriptions per BU vs. shared), and who manages the subscription lifecycle.",
      "summary": "Cloud subscriptions (Azure subscriptions or AWS accounts) are the billing and security boundary for cloud resources. This row covers who provisions new subscriptions, how the subscription topology is designed (e.g. hub-spoke model, separate subscriptions per BU vs. shared), and who manages the subscription lifecycle.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "C",
        "EET": "R/A",
        "DMO": "–",
        "BU": "I"
      }
    },
    {
      "id": "network-connectivity---ncc-private-endpoints-cross-subscription-links",
      "section": "§8 · Foundational Resources & Infrastructure",
      "title": "Network connectivity — NCC, private endpoints, cross-subscription links",
      "definition": "NCC = Network Connectivity Configuration (a Databricks-specific feature for managing outbound connectivity). Private endpoints allow secure communication between Databricks and other services without traversing the public internet. Cross-subscription links connect resources in different subscriptions. This row covers who provisions and maintains these network connections.",
      "summary": "NCC = Network Connectivity Configuration (a Databricks-specific feature for managing outbound connectivity). Private endpoints allow secure communication between Databricks and other services without traversing the public internet. Cross-subscription links connect resources in different subscriptions. This row covers who provisions and maintains these network connections.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "A",
        "DMO": "–",
        "BU": "–"
      }
    },
    {
      "id": "ai-gateway-provisioning-and-route-configuration",
      "section": "§8 · Foundational Resources & Infrastructure",
      "title": "AI Gateway provisioning & route configuration",
      "definition": "The AI Gateway needs to be provisioned as infrastructure (deploying the gateway service, configuring DNS, setting up TLS) and configured with routes (which model endpoints are reachable, rate limits, authentication). This row is about the infrastructure and routing side — distinct from the security policy side (covered in §7).",
      "summary": "The AI Gateway needs to be provisioned as infrastructure (deploying the gateway service, configuring DNS, setting up TLS) and configured with routes (which model endpoints are reachable, rate limits, authentication). This row is about the infrastructure and routing side — distinct from the security policy side (covered in §7).",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R",
        "EET": "A",
        "DMO": "–",
        "BU": "I"
      }
    },
    {
      "id": "storage-and-key-vault-provisioning-platform-managed",
      "section": "§8 · Foundational Resources & Infrastructure",
      "title": "Storage & Key Vault provisioning (platform-managed)",
      "definition": "Storage accounts (Azure Blob/ADLS, S3) hold the data that Databricks processes. Key Vault (Azure Key Vault, AWS Secrets Manager) stores secrets, keys, and certificates. This row covers provisioning these resources as part of the platform infrastructure — they are platform-managed, not BU-managed.",
      "summary": "Storage accounts (Azure Blob/ADLS, S3) hold the data that Databricks processes. Key Vault (Azure Key Vault, AWS Secrets Manager) stores secrets, keys, and certificates. This row covers provisioning these resources as part of the platform infrastructure — they are platform-managed, not BU-managed.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "C",
        "EET": "R/A",
        "DMO": "–",
        "BU": "–"
      }
    },
    {
      "id": "self-service-resource-provisioning-ucp-crossplane-claims",
      "section": "§8 · Foundational Resources & Infrastructure",
      "title": "Self-service resource provisioning (UCP / Crossplane claims)",
      "definition": "UCP = Unified Cloud Platform. Crossplane is a tool for provisioning cloud resources via Kubernetes-style declarative claims. This row covers the self-service model where users (BU or platform teams) can request and receive cloud resources through an automated, governed provisioning pipeline — without filing a manual ticket.",
      "summary": "UCP = Unified Cloud Platform. Crossplane is a tool for provisioning cloud resources via Kubernetes-style declarative claims. This row covers the self-service model where users (BU or platform teams) can request and receive cloud resources through an automated, governed provisioning pipeline — without filing a manual ticket.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "C",
        "EET": "R/A",
        "DMO": "–",
        "BU": "C"
      }
    },
    {
      "id": "infrastructure-as-code---platform-module-library",
      "section": "§8 · Foundational Resources & Infrastructure",
      "title": "Infrastructure-as-Code — platform module library",
      "definition": "The collection of reusable IaC modules (Terraform modules, Crossplane compositions, Bicep templates) that encode how platform resources should be provisioned. This row covers who develops, tests, versions, and maintains this module library — it is a core platform engineering deliverable.",
      "summary": "The collection of reusable IaC modules (Terraform modules, Crossplane compositions, Bicep templates) that encode how platform resources should be provisioned. This row covers who develops, tests, versions, and maintains this module library — it is a core platform engineering deliverable.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "C",
        "EET": "R/A",
        "DMO": "–",
        "BU": "–"
      }
    },
    {
      "id": "resource-classification---core-extension-user-managed",
      "section": "§9 · Resource Ownership & Graduation",
      "title": "Resource classification — Core / Extension / User-managed",
      "definition": "Every resource on the platform falls into one of three categories. Core = provided out of the box by the platform from day zero (e.g. workspaces, Unity Catalog, standard cluster policies). Extension = an officially supported addition to the platform, maintained by the platform team but not part of the original core (e.g. a custom monitoring SDK). User-managed = provisioned and operated by the BU themselves, outside the platform's SLA (e.g. a BU-specific Azure Function). This row asks who defines and maintains this classification.",
      "summary": "Every resource on the platform falls into one of three categories. Core = provided out of the box by the platform from day zero (e.g. workspaces, Unity Catalog, standard cluster policies). Extension = an officially supported addition to the platform, maintained by the platform team but not part of the original core (e.g. a custom monitoring SDK). User-managed = provisioned and operated by the BU themselves, outside the platform's SLA (e.g. a BU-specific Azure Function). This row asks who defines and maintains this classification.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "C",
        "DMO": "–",
        "BU": "C"
      }
    },
    {
      "id": "user-managed-resources---bu-provisioning-and-operation",
      "section": "§9 · Resource Ownership & Graduation",
      "title": "User-managed resources — BU provisioning & operation",
      "definition": "When a resource is classified as user-managed, the business unit is responsible for provisioning it, operating it, securing it, and paying for it. The platform provides no SLA for user-managed resources. This row makes that responsibility explicit.",
      "summary": "When a resource is classified as user-managed, the business unit is responsible for provisioning it, operating it, securing it, and paying for it. The platform provides no SLA for user-managed resources. This row makes that responsibility explicit.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "I",
        "EET": "C",
        "DMO": "–",
        "BU": "R/A"
      }
    },
    {
      "id": "architecture-review-for-reusable-patterns-graduation-trigger",
      "section": "§9 · Resource Ownership & Graduation",
      "title": "Architecture review for reusable patterns (graduation trigger)",
      "definition": "When multiple business units independently build similar things (e.g. three teams all build their own model-serving wrappers), that's a signal that the pattern should be graduated into a platform extension. This row covers who reviews user-managed resources, identifies reusable patterns, and triggers the graduation process.",
      "summary": "When multiple business units independently build similar things (e.g. three teams all build their own model-serving wrappers), that's a signal that the pattern should be graduated into a platform extension. This row covers who reviews user-managed resources, identifies reusable patterns, and triggers the graduation process.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "C",
        "DMO": "–",
        "BU": "C"
      }
    },
    {
      "id": "graduation-to-platform-managed---ownership-handover",
      "section": "§9 · Resource Ownership & Graduation",
      "title": "Graduation to platform-managed — ownership handover",
      "definition": "The actual process of graduating a resource from BU-owned to platform-owned: refactoring the code to platform standards, integrating it into the platform's IaC and CI/CD, assigning an SLA, and formally handing over ownership. This is a significant event with contractual implications (the platform now owns the lifecycle).",
      "summary": "The actual process of graduating a resource from BU-owned to platform-owned: refactoring the code to platform standards, integrating it into the platform's IaC and CI/CD, assigning an SLA, and formally handing over ownership. This is a significant event with contractual implications (the platform now owns the lifecycle).",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "C",
        "DMO": "–",
        "BU": "R"
      }
    },
    {
      "id": "platform-managed-resources---sla-lifecycle-and-cost-attribution",
      "section": "§9 · Resource Ownership & Graduation",
      "title": "Platform-managed resources — SLA, lifecycle & cost attribution",
      "definition": "Once a resource is platform-managed, the platform team is responsible for its SLA (uptime, performance), lifecycle (upgrades, deprecation, end-of-life), and cost attribution (charging the cost back to consuming BUs or absorbing it as a platform cost). This row asks who carries those responsibilities.",
      "summary": "Once a resource is platform-managed, the platform team is responsible for its SLA (uptime, performance), lifecycle (upgrades, deprecation, end-of-life), and cost attribution (charging the cost back to consuming BUs or absorbing it as a platform cost). This row asks who carries those responsibilities.",
      "keyPoints": [],
      "defaultRaci": {
        "EBT": "R/A",
        "EET": "C",
        "DMO": "–",
        "BU": "I"
      }
    },
    {
      "id": "boundary-disputes---escalation-and-resolution",
      "section": "§9 · Resource Ownership & Graduation",
      "title": "Boundary disputes — escalation & resolution",
      "definition": "When there's disagreement about whether a resource should be platform-managed or user-managed, or about who should pay for it, or about where the boundary of the platform ends — that's a boundary dispute. This row covers the escalation and resolution process: who arbitrates, what criteria are used, and how decisions are documented.\n\nThis glossary is a living document. If an activity row is unclear during the workshop, update this glossary with the agreed definition.",
      "summary": "When there's disagreement about whether a resource should be platform-managed or user-managed, or about who should pay for it, or about where the boundary of the platform ends — that's a boundary dispute. This row covers the escalation and resolution process: who arbitrates, what criteria are used, and how decisions are documented.",
      "keyPoints": [
        "This glossary is a living document. If an activity row is unclear during the workshop, update this glossary with the agreed definition."
      ],
      "defaultRaci": {
        "EBT": "R",
        "EET": "C",
        "DMO": "C",
        "BU": "A"
      }
    }
  ],
  "generatedFrom": {
    "glossary": "RACI_V2.3_Glossary.md",
    "presentation": "RACI_Matrix_V2.3.1_Filled_In.pptx"
  }
};
