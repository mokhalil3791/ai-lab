# RACI Matrix V2.3 — Activity Glossary

> **Companion document to:** RACI Matrix V2.3.1 (7 April 2026)
>
> **Purpose:** Explains every activity row in the RACI matrix in plain language. Use this document alongside the RACI matrix so that every participant — regardless of technical background — understands what each row is asking them to assign responsibility for.
>
> **How to read each entry:** The **activity name** (as it appears in the matrix) is shown in bold. Below it is a plain-language explanation of what the activity covers, why it matters, and where relevant, examples of the work involved.

---

## Quick Reference: Column Definitions

Before diving into the rows, here is what the four column headers mean:

| Column | Full Name | In Simple Terms |
|--------|-----------|-----------------|
| **EBT** | Enterprise Business Technology | The technology organisation that builds and runs platforms *for the business*. Includes the Data Platform team, the Databricks CoE, and Platform Administration functions that have business contact. |
| **EET** | Enterprise Enabling Technology | The technology organisation that provides *foundational infrastructure* — cloud, networking, identity, security baselines. No direct business contact. Includes the Unified Cloud Platform (UCP) team, Enterprise Access Management (EAM), and the Engineering Standards Board (ESB). |
| **DMO** | Data Management Office | The governance function under the CIO. Owns data policies, classification, access rules, retention, and the overall data governance framework. Independent from both EBT and EET. |
| **BU** | Business Units | The consumers and producers of data & AI products. They express functional needs, own domain data, run pipelines, and are accountable for their own domain costs and data stewardship. |

---

## §1 · Platform & Workspace Governance

This section covers the foundational setup and ongoing governance of the Databricks platform: how workspaces are created, who controls access, how costs are managed, and how the catalog is structured.

---

### Workspace provisioning (prod / non-prod) — technical deployment

The act of creating new Databricks workspaces in the cloud. A workspace is the primary environment where users run notebooks, jobs, and queries. Organisations typically have separate workspaces for production (live business workloads) and non-production (development, testing). This row is about **who deploys the workspace infrastructure** — spinning up the cloud resources, applying the Terraform/IaC templates, and registering the workspace with the Databricks account.

---

### Workspace configuration — tenant config, bindings, policies

Once a workspace exists, it needs to be *configured*: enabling or disabling features, binding it to the correct Unity Catalog metastore, setting default policies (e.g. which cluster types are allowed, whether serverless is enabled), and applying tenant-level configuration. This is the "inside the workspace" setup work — distinct from the infrastructure provisioning that creates the workspace itself.

---

### Catalog creation & maintenance — technical (IaC)

In Databricks Unity Catalog, a **catalog** is the top-level container for data (like a database schema namespace). This row is about the **technical act** of creating catalogs using Infrastructure-as-Code (IaC) — running the Terraform or Crossplane templates that provision the catalog objects, storage locations, and associated cloud resources. It is *not* about deciding what catalogs should exist; that is the next row.

---

### Catalog structure — functional design (data domains, zones)

This is the **design decision** about how catalogs are organised: how many top-level catalogs exist, what data domains they represent (e.g. Finance, Claims, HR), whether there are separate zones (e.g. raw, curated, consumption), and the naming conventions used. This is a governance and architecture question — the functional blueprint that the technical team then implements.

---

### IAM — Workspace access & group configuration

**IAM** = Identity and Access Management. This row is about configuring *who can access which workspace* and how groups are set up inside the workspace (e.g. "data-engineers-finance", "data-scientists-risk"). It includes creating and managing workspace-level groups, assigning users to those groups, and linking groups to the identity provider. This is often a manual and painful process today.

---

### IAM — Identity lifecycle (JML, IdP, SCIM)

The **identity lifecycle** covers what happens when someone joins, moves between teams, or leaves the organisation (**JML** = Joiner-Mover-Leaver). **IdP** = Identity Provider (e.g. Microsoft Entra / Azure AD). **SCIM** = System for Cross-domain Identity Management — a protocol that automatically synchronises users and groups from the IdP into Databricks. This row asks: who manages the end-to-end process of ensuring that when people change roles or leave, their Databricks access is updated or revoked accordingly?

---

### IAM — Unity Catalog permissions & data access

Unity Catalog has its own permission model that controls who can read, write, or manage specific catalogs, schemas, and tables. This row is about **who configures and maintains those data-access permissions** within Unity Catalog — granting SELECT on a schema, managing ownership of tables, and enforcing column-level or row-level security. This is distinct from workspace access (which controls who can log in); this controls what data they can see once they're in.

---

### IAM — Authorisation matrix & directory group management

An **authorisation matrix** is a documented mapping of "which role gets access to what." **Directory groups** are the groups in the central identity directory (e.g. Entra ID / Active Directory) that are used to grant permissions. This row covers the design, documentation, and ongoing maintenance of that matrix — ensuring it stays current as teams and data products evolve. It also covers managing the groups themselves (creating new ones, nesting, decommissioning old ones).

---

### IAM — Service principal provisioning & governance

A **service principal** (SP) is a non-human identity used by automated processes — CI/CD pipelines, scheduled jobs, API integrations. Service principals need to be created, assigned permissions, rotated (secrets/keys renewed), and eventually decommissioned. This row asks: who provisions new SPs, who governs what they're allowed to do, and who ensures they don't accumulate excessive privileges over time?

---

### RBAC — Initial catalog / schema role provisioning

**RBAC** = Role-Based Access Control. When a new catalog or schema is created, someone needs to set up the initial roles — e.g. "owner", "reader", "writer" — and assign them to the right groups. This is a one-time setup activity that happens at provisioning time. The row asks who performs this initial role wiring.

---

### RBAC — Ongoing role management (data stewards, owners)

After the initial setup, roles need to be maintained: new data stewards are appointed, ownership changes as teams reorganise, new schemas are added and need role assignments. This is the **day-2 operational** side of access management — keeping the permissions current and aligned with the actual organisational structure and data ownership.

---

### RBAC → ABAC / PBAC transition — governance & policy

Many organisations start with simple role-based access (RBAC) but aspire to move towards **attribute-based** (ABAC) or **policy-based** (PBAC) access control. ABAC/PBAC makes access decisions based on attributes of the user, the data, and the context (e.g. "any user in the risk department can access PII-tagged tables if they've completed privacy training") rather than static role assignments. This row is about **who governs the policy and roadmap** for that transition — not the technical implementation, but the governance framework and decision-making.

---

### Cluster policies — baseline definition

A **cluster policy** in Databricks defines constraints on what types of compute resources users can spin up — e.g. maximum number of nodes, allowed instance types, auto-termination rules, Spark configuration defaults. The **baseline** is the organisation-wide default set of policies that apply to all workspaces. This row asks: who defines those baseline guardrails?

---

### Cluster policies — BU customisation on top of baseline

Business units may need to customise cluster policies for their specific workloads — for example, a data science team might need GPU-enabled clusters, or a production ETL team might need larger instance types. This row is about **who is allowed to modify or extend** the baseline policies within their own domain, and on what terms.

---

### Network configuration (VPC, private endpoints, network connectivity)

This covers the networking layer that the Databricks platform runs on. **VPC** = Virtual Private Cloud (the isolated network boundary). **Private endpoints** allow Databricks to communicate with other Azure/AWS services without going over the public internet. **Network connectivity** includes cross-subscription links, firewall rules, and NCC (Network Connectivity Configuration) settings. This is foundational infrastructure work.

---

### Cost controls & FinOps — platform baseline

**FinOps** = Financial Operations — the practice of managing cloud costs. The "platform baseline" is the set of cost controls, budgets, alerts, and dashboards that apply across the entire Databricks estate. This includes things like: setting spending alerts, creating cost-allocation tags, building FinOps dashboards, and defining chargeback/showback models. This row asks who is responsible for the *platform-wide* cost governance.

---

### Cost optimisation — domain-level (FinOps)

While the platform baseline sets the overall cost framework, each business unit is expected to manage and optimise their own domain costs — right-sizing clusters, cleaning up unused resources, choosing efficient compute tiers. This row asks who is responsible for the FinOps discipline *within each business domain*. The expectation is that BUs are "self-controlling" on cost.

---

### Account-level administration (features, tokens)

Databricks has an **account-level** console (above individual workspaces) where features can be enabled or disabled, API tokens managed, account-wide settings configured, and new capabilities (like serverless, model serving) activated. This is a highly privileged function. This row asks: who performs account-level admin tasks?

---

## §2 · Platform Reliability & Operations

This section covers keeping the Databricks platform running reliably: monitoring, incident management, performance, and operational support.

---

### Platform monitoring & alerting — cross-BU / platform-wide

Monitoring the health and performance of the Databricks platform *as a whole* — across all workspaces and all business units. This includes dashboards for cluster utilisation, job success rates, API latency, storage growth, and system-level errors. Alerts fire when platform-level thresholds are breached (e.g. a workspace becomes unreachable, or DBU burn rate spikes). This is platform-team work, not domain-specific.

---

### Monitoring & alerting — domain-specific jobs

Each business unit runs its own jobs, pipelines, and notebooks. This row is about monitoring *those domain-specific workloads* — setting up alerts when a nightly ETL fails, tracking model training job durations, or watching for data-quality anomalies. The platform may provide the tooling, but the domain team is expected to configure and manage their own alerts.

---

### Incident management — platform-wide incidents

When the Databricks platform itself has a problem — an outage, a degraded service, a failed upgrade — someone needs to run the incident response: triage, communicate, escalate to Databricks support or cloud provider, coordinate recovery, and perform root-cause analysis. This row covers who manages those **platform-level** incidents.

---

### Incident management — domain-specific incidents

When a business unit's job fails, a model produces bad predictions, or a data pipeline delivers incorrect results, that is a **domain-level** incident. The business unit is expected to handle these, potentially with consulting support from the platform team. This row clarifies ownership of domain-specific operational issues.

---

### Performance optimisation guidelines

Creating and publishing guidelines that help users get the best performance from Databricks — advice on Spark configuration, partition strategies, caching, photon engine usage, cluster sizing, and query optimisation. This is the *standards and documentation* work, not the act of tuning a specific job (which would be domain-level).

---

### Capacity planning (cross-BU)

Looking ahead to ensure the platform can handle growing demand — forecasting DBU consumption, storage needs, workspace count, and user growth across all business units. This includes right-sizing reserved capacity, planning for peak periods, and budgeting for growth. A cross-cutting activity that sits above individual domains.

---

### Observability standards (logging, alerting patterns)

Defining the *standard way* that teams should instrument their workloads for observability — what to log, where to send logs, what alerting patterns to follow, what metrics to expose. This is about creating a consistent observability baseline so that all teams produce telemetry in a uniform way that the platform can aggregate.

---

### Enterprise observability pipeline — platform telemetry to SIEM

**SIEM** = Security Information and Event Management (e.g. Splunk, Sentinel). This row covers building and maintaining the pipeline that forwards Databricks platform telemetry (audit logs, access logs, job logs, inference logs) into the enterprise SIEM for security monitoring and compliance. It's the *plumbing* that connects the platform's logging to the security operations centre.

---

### Domain-level observability — alerting & dashboards (on platform-provided data)

The platform provides observability *data* (logs, metrics, audit events), but each domain needs to build their own alerting rules and dashboards on top of that data — tailored to their specific workloads and SLAs. This row asks who is responsible for creating and maintaining those domain-specific observability views.

---

### Platform-wide incident commander role

During a major platform incident, one person needs to take charge — coordinating communications, deciding on escalation paths, and ensuring the incident is managed to resolution. This row is about **who fills the incident commander role** for platform-wide outages or degradations.

---

### Production support routing (1st line for platform issues)

When a user encounters a platform problem (not a domain logic bug), where do they go first? This row covers the **first-line triage and routing** function — receiving tickets or alerts, determining whether it's a platform issue or a domain issue, and routing it to the right team. Think of it as the platform's service desk function.

---

### SLA management with business teams

Defining, agreeing, and tracking **Service Level Agreements** between the platform organisation and the business units — e.g. "workspace availability of 99.9%", "incident response within 30 minutes". This includes the ongoing review of whether SLAs are being met and renegotiating them as needs change.

---

### Supplier contract management (Databricks)

Managing the commercial relationship with Databricks — the license agreement, committed-use discounts, support tiers, feature access, renewal negotiations, and escalation contacts. This is a procurement/vendor-management activity.

---

## §3 · Data Governance & Catalog Management

This section covers how data is organised, classified, protected, and governed within the Databricks platform using Unity Catalog and the enterprise data governance framework.

---

### Unity Catalog design — functional (data domain structure, zones, naming)

The **functional design** of Unity Catalog: deciding how many top-level catalogs exist, what data domains they represent, what zones are used (e.g. bronze/silver/gold, or raw/curated/consumption), and what naming conventions apply. This is a governance/architecture decision — it defines the logical structure of the entire data estate on Databricks.

---

### Unity Catalog administration — technical implementation

The **technical execution** of the Unity Catalog design: creating catalogs, schemas, and storage credentials in the Unity Catalog system; running SQL GRANT statements; configuring external locations; and maintaining the metastore. This is the hands-on admin work that implements what the functional design specifies.

---

### Data classification (PII, confidential, public)

Tagging data with its sensitivity level — **PII** (Personally Identifiable Information), confidential, internal, or public. Data classification drives access controls, retention policies, masking rules, and compliance obligations. This row asks who defines the classification scheme and who is responsible for ensuring data is correctly classified.

---

### Catalog ownership models — functional

Defining the **ownership model** for catalogs: who is the designated owner of each catalog, what rights and obligations come with ownership, and how disputes are resolved. This is a governance policy question — e.g. "the Finance data domain catalog is owned by the Finance BU data steward, with DMO providing the framework."

---

### Schema & table ownership — domain stewardship

Below the catalog level, individual schemas and tables also need owners — **data stewards** who are accountable for the quality, documentation, and access rules of their data. This row asks who appoints and manages those stewards, and who is accountable for stewardship at the schema/table level. Typically this sits with the business units.

---

### Data access policies & entitlements

The policies that define **who is allowed to access what data, under what conditions**. This includes entitlement rules (e.g. "all risk analysts can access the risk catalog"), exception processes, and how policies are translated into technical controls (UC grants, dynamic views, row filters). This is distinct from IAM (which controls platform access); this controls *data* access.

---

### Data lineage & audit logging

**Data lineage** tracks where data comes from, how it is transformed, and where it flows to — allowing impact analysis and root-cause tracing. **Audit logging** records who accessed or changed data and when. This row covers the technical implementation of lineage tracking and audit log capture, as well as the governance accountability for ensuring they are complete and accurate.

---

### Retention & deletion policies

Policies that define **how long data is kept** and **when it must be deleted** — driven by regulatory requirements (GDPR, DORA), business needs, and storage cost management. This includes both the policy definition (governance) and the technical execution (automated deletion jobs, archival processes).

---

### Data Catalog ↔ Unity Catalog synchronisation

Many enterprises have a separate **data catalog tool** (e.g. Collibra, Alation) that serves as the enterprise-wide inventory of data assets. Unity Catalog is Databricks' built-in catalog. This row covers the synchronisation between the two — ensuring that metadata, ownership, classifications, and glossary terms are consistent across both systems. This often involves automated sync jobs and reconciliation processes.

---

### Metastore admin change requests (new catalogs, storage locations)

The **metastore** is the top-level Unity Catalog container that holds all catalogs. Making changes at the metastore level — creating new catalogs, registering new storage locations, modifying storage credentials — is a privileged operation. This row covers the process: who can request changes, who approves them, who executes them, and how the request flow works (e.g. via a ticketing system).

---

### Data governance framework (overall)

The overarching **framework** that ties all data governance activities together: the principles, policies, standards, roles, and processes that ensure data is managed as a strategic asset. This is the "constitution" of data governance — it sits above individual policies (classification, retention, access) and provides the structure within which they all operate.

---

## §4 · MLOps & Shared Engineering Standards

This section covers the standards, patterns, and tooling for machine learning operations (MLOps) and shared engineering practices on the Databricks platform.

---

### Standard MLOps patterns (CI/CD, model promotion, rollback)

The standardised way that ML models move from development to production. **CI/CD** = Continuous Integration / Continuous Deployment — automated pipelines that test and deploy code. **Model promotion** = moving a model from dev to staging to production with appropriate gates. **Rollback** = reverting to a previous model version if the new one causes problems. This row asks who defines and maintains these standard patterns.

---

### MLflow tracking & model registry governance

**MLflow** is an open-source platform (built into Databricks) for tracking experiments, packaging models, and managing model versions. The **model registry** is where production-ready models are registered, versioned, and transitioned through stages (Staging → Production → Archived). This row covers the governance of that registry — who sets the rules for model registration, versioning, and lifecycle management.

---

### Feature store standards (naming, reuse, ownership)

A **feature store** is a centralised repository of pre-computed features (input variables for ML models) that can be shared and reused across teams. This row covers the standards for naming features, encouraging reuse (instead of each team computing the same feature independently), and clarifying ownership — who maintains a feature, who is allowed to modify it, and who is responsible for its quality.

---

### Inference architecture patterns (batch, real-time)

**Inference** is the act of using a trained model to make predictions on new data. **Batch inference** processes large volumes of data on a schedule (e.g. nightly scoring). **Real-time inference** serves predictions on demand with low latency (e.g. API endpoint). This row covers who defines the standard architecture patterns for both modes — including model serving endpoints, scaling strategies, and integration patterns.

---

### Monitoring standards (drift, bias, performance)

Once models are in production, they need to be monitored. **Drift** = the model's input data or predictions change over time, degrading accuracy. **Bias** = the model produces unfair outcomes for certain groups. **Performance** = latency, throughput, and resource consumption. This row asks who defines the monitoring standards that all production models must follow.

---

### Approved libraries, runtimes, base images

Controlling what software can run on the platform: which Python/R/Scala libraries are approved, which Databricks Runtime versions are supported, and which container base images are allowed for custom environments. This is a security and stability concern — unapproved libraries could introduce vulnerabilities or break compatibility. This row asks who curates and maintains the approved list.

---

### Code promotion support & implementation quality review

The process of moving code from development through acceptance/staging to production (**Dev → Acc → Prod**). This row also covers **quality review** — who reviews the actual implementation for best practices, performance, security, and correctness before it reaches production? This is a critical quality gate.

---

### SDK development & maintenance (bolt-on tooling)

**SDK** = Software Development Kit. The platform team may build internal SDKs, CLI tools, cookiecutter templates, and CI/CD golden paths that make it easier for business units to build on the platform. This row covers who develops and maintains those bolt-on tools — the internal developer experience tooling.

---

## §5 · Enablement, Adoption & Guardrails

This section covers how users are onboarded, trained, and supported in adopting the Databricks platform effectively and within the right guardrails.

---

### Reference architectures & templates

Pre-built **reference architectures** (e.g. "how to build a batch scoring pipeline", "how to set up a medallion architecture") and **templates** (starter projects, Terraform modules, notebook templates) that teams can use as a starting point. This row asks who creates and maintains these reusable assets.

---

### Golden notebooks / pipelines

A "**golden notebook**" or "**golden pipeline**" is a curated, best-practice example of how to do something on the platform — e.g. a notebook that demonstrates proper DLT ingestion with quality checks, or a CI/CD pipeline that follows all standards. These serve as the "this is how we do it here" reference for new teams.

---

### Best-practice documentation

Written documentation that codifies the platform's recommended ways of working: coding standards, data modelling guidelines, security practices, Spark tuning tips, naming conventions, and operational runbooks. This row asks who writes and maintains this documentation.

---

### Training & onboarding paths

Structured learning paths for new users of the platform — from basic onboarding ("how to log in and run your first notebook") to advanced training ("building production MLOps pipelines"). This includes both self-paced content and instructor-led sessions.

---

### Community of practice (guilds, office hours)

Ongoing community structures that facilitate knowledge sharing: **guilds** (cross-team groups with shared interests, e.g. "ML Guild"), **office hours** (regular drop-in sessions where experts answer questions), Slack channels, and brown-bag sessions. This row asks who organises and sustains these communities.

---

### New feature assessment (Databricks releases)

Databricks regularly releases new features and capabilities. Someone needs to evaluate each release — assess whether a feature is relevant, test it in non-production, determine if it should be enabled, and decide if it changes any existing standards. This row covers that assessment and decision-making process.

---

### Champion network (per domain & persona)

A **champion** is a person within a business unit who acts as a local advocate and first point of contact for the platform. A champion network ensures there is at least one champion per domain and per persona type (data engineer, data scientist, analyst). This row asks who nominates, coordinates, and supports the champions.

---

### Use case acceleration / bootstrap engagements

When a business unit starts a new use case on the platform, the first few weeks can be slow and risky. **Bootstrap engagements** are time-boxed consulting engagements where platform experts embed with the BU team to de-risk the project — helping with architecture, code structure, CI/CD setup, and best practices. This row asks who runs those engagements.

---

### Education & certification tracking

Tracking which users have completed which training courses and certifications (e.g. Databricks Certified Data Engineer Associate). This is important for compliance, skills planning, and identifying gaps. This row asks who manages the tracking system and reports on certification status.

---

### Migration assistance (existing projects → platform)

Many organisations have existing data and AI workloads running on legacy platforms (on-prem Hadoop, standalone Spark clusters, Azure Data Factory, etc.). Migrating these to Databricks requires technical assistance — refactoring code, rewriting pipelines, validating outputs. This row asks who provides that migration support and who is accountable for a successful migration.

---

## §6 · Privileged Roles & Admin Functions

This section covers the most sensitive administrative roles on the platform — the "keys to the kingdom" functions that require careful governance.

---

### Databricks Account Admin (root privilege)

The **Account Admin** has the highest level of privilege in Databricks — they can create and delete workspaces, manage all users, enable or disable features, and access all data. This is the "root" of the Databricks account. This row asks who holds this privilege and who governs its use.

---

### Unity Catalog Metastore Admin

The **Metastore Admin** can manage the Unity Catalog metastore — creating catalogs, managing storage credentials, granting high-level permissions, and modifying the metastore configuration. This is a highly privileged role within the data governance layer. This row asks who holds it and who governs its use.

---

### Break-glass / emergency access process

A **break-glass** process is the procedure for granting emergency elevated access when normal channels are unavailable — e.g. during a critical production incident when the usual admin is unreachable. This row asks who designs, documents, and manages the break-glass procedure, and who is authorised to invoke it.

---

### Privileged access review & rotation

Regularly reviewing who has privileged access (Account Admin, Metastore Admin, service principals with broad permissions) and **rotating** credentials (changing secrets, revoking stale tokens). This is a security hygiene activity. This row asks who executes the reviews and who is accountable for ensuring they happen on schedule.

---

## §7 · Security, Compliance & IT Service Management

This section covers security operations, regulatory compliance, and integration with enterprise IT service management (ITSM) processes. It was added in V2.3.1 based on international TOM discussions, the conformance analysis, and stakeholder feedback.

---

### SIEM integration — platform & inference telemetry

**SIEM** = Security Information and Event Management. This row covers connecting Databricks platform logs and AI/ML inference telemetry (who called which model, with what input, producing what output) to the enterprise SIEM system for real-time security monitoring, threat detection, and forensic investigation.

---

### Vulnerability management & TSCM — platform baseline

**TSCM** = Technical Security Compliance Monitoring. This is the practice of scanning the platform infrastructure for known vulnerabilities, misconfigurations, and deviations from the security baseline — and remediating them. This row covers the *platform-level* baseline: the Databricks workspaces, storage accounts, networking, and supporting cloud resources.

---

### Vulnerability management — domain-specific workloads

The same vulnerability management practice, but applied to **domain-specific workloads** — the code, libraries, containers, and configurations deployed by business units on top of the platform. This row separates the responsibility: the platform team secures the platform; each domain secures their own workloads.

---

### AI Gateway — security policies (routing, content safety, PII redaction)

The **AI Gateway** is a control point through which all AI/ML inference traffic flows. Security policies on the gateway can enforce: routing rules (which models can be called by which users), **content safety** (blocking harmful inputs/outputs), and **PII redaction** (stripping personally identifiable information from model inputs before they reach an external LLM). This row asks who defines and maintains those security policies.

---

### AI model risk register & compliance evidence

A **model risk register** is a documented inventory of all AI/ML models in production, along with their risk classifications, known limitations, and mitigation measures. **Compliance evidence** is the documentation needed to demonstrate to auditors and regulators that AI models are governed appropriately (in line with EU AI Act, DORA, internal risk frameworks). This row asks who maintains the register and produces the evidence.

---

### Configuration drift reconciliation

Over time, the actual configuration of the platform can **drift** from its intended state — manual changes accumulate, IaC and reality diverge. **Drift reconciliation** is the process of detecting those differences and bringing the platform back into alignment with its defined configuration. This row asks who is responsible for detecting and remediating drift.

---

### Security incident response — platform vs. domain scope

When a security incident occurs (data breach, unauthorised access, malware), someone needs to lead the response. This row clarifies ownership: **platform-scope** incidents (e.g. a compromised service principal with platform-wide access) vs. **domain-scope** incidents (e.g. a BU user accidentally exposes sensitive data). Different teams may lead depending on the scope.

---

### SECA documentation — platform & domain workloads

**SECA** = Security Architecture documentation (or Security and Compliance Assessment, depending on the organisation). This is the formal documentation of the security architecture, threat model, and risk assessment for the Databricks platform and the workloads running on it. This row asks who writes and maintains this documentation for the platform and for domain workloads respectively.

---

### IT controls — definition, attestation & evidence (SOX, NIS2, DORA)

**IT controls** are the specific procedures and safeguards that ensure compliance with regulations. **SOX** = Sarbanes-Oxley (financial reporting controls). **NIS2** = EU Network and Information Security Directive (cybersecurity obligations). **DORA** = Digital Operational Resilience Act (ICT risk management for financial institutions). This row covers: defining which controls apply, performing periodic attestation (confirming controls are in place), and collecting evidence for auditors.

---

### ServiceNow — CI registration & change management

**ServiceNow** is the enterprise IT service management platform. **CI** = Configuration Item — a record in the CMDB representing a platform component. **Change management** = the process of requesting, approving, and tracking changes to production systems. This row asks who registers Databricks components as CIs in ServiceNow and who manages changes through the formal change process.

---

### CMDB management — platform & domain resources

**CMDB** = Configuration Management Database — the enterprise registry of all IT assets and their relationships. This row covers keeping the CMDB up to date with Databricks platform resources (workspaces, clusters, storage accounts) and domain resources (pipelines, models, endpoints). Accurate CMDB records are essential for incident management, impact analysis, and audit.

---

### Audit readiness & regulatory reporting

The ongoing effort to ensure the platform and its workloads are **audit-ready** at any time — that all required documentation, evidence, and controls are in place and can be produced on demand. This also covers **regulatory reporting** — producing the reports required by financial regulators, data protection authorities, or internal audit functions.

---

## §8 · Foundational Resources & Infrastructure

This section covers the cloud substrate that the Databricks platform runs on — subscriptions, networking, storage, and provisioning tooling. It focuses on the operating-model question of who does what, not the technical architecture detail (which lives in ADRs).

---

### Subscription provisioning & topology (platform and BU subscriptions)

Cloud subscriptions (Azure subscriptions or AWS accounts) are the billing and security boundary for cloud resources. This row covers **who provisions new subscriptions**, how the subscription topology is designed (e.g. hub-spoke model, separate subscriptions per BU vs. shared), and who manages the subscription lifecycle.

---

### Network connectivity — NCC, private endpoints, cross-subscription links

**NCC** = Network Connectivity Configuration (a Databricks-specific feature for managing outbound connectivity). **Private endpoints** allow secure communication between Databricks and other services without traversing the public internet. **Cross-subscription links** connect resources in different subscriptions. This row covers who provisions and maintains these network connections.

---

### AI Gateway provisioning & route configuration

The **AI Gateway** needs to be provisioned as infrastructure (deploying the gateway service, configuring DNS, setting up TLS) and configured with routes (which model endpoints are reachable, rate limits, authentication). This row is about the infrastructure and routing side — distinct from the security policy side (covered in §7).

---

### Storage & Key Vault provisioning (platform-managed)

**Storage accounts** (Azure Blob/ADLS, S3) hold the data that Databricks processes. **Key Vault** (Azure Key Vault, AWS Secrets Manager) stores secrets, keys, and certificates. This row covers provisioning these resources as part of the platform infrastructure — they are *platform-managed*, not BU-managed.

---

### Self-service resource provisioning (UCP / Crossplane claims)

**UCP** = Unified Cloud Platform. **Crossplane** is a tool for provisioning cloud resources via Kubernetes-style declarative claims. This row covers the self-service model where users (BU or platform teams) can request and receive cloud resources through an automated, governed provisioning pipeline — without filing a manual ticket.

---

### Infrastructure-as-Code — platform module library

The collection of reusable **IaC modules** (Terraform modules, Crossplane compositions, Bicep templates) that encode how platform resources should be provisioned. This row covers who develops, tests, versions, and maintains this module library — it is a core platform engineering deliverable.

---

## §9 · Resource Ownership & Graduation

This section clarifies the boundary between platform-managed and user-managed resources, and how resources move from one category to the other over time. The key concept is the **graduation lifecycle**:

> **User-managed (pioneer)** → **Documented pattern** → **Platform extension** → **Core (Day 0)**

---

### Resource classification — Core / Extension / User-managed

Every resource on the platform falls into one of three categories. **Core** = provided out of the box by the platform from day zero (e.g. workspaces, Unity Catalog, standard cluster policies). **Extension** = an officially supported addition to the platform, maintained by the platform team but not part of the original core (e.g. a custom monitoring SDK). **User-managed** = provisioned and operated by the BU themselves, outside the platform's SLA (e.g. a BU-specific Azure Function). This row asks who defines and maintains this classification.

---

### User-managed resources — BU provisioning & operation

When a resource is classified as **user-managed**, the business unit is responsible for provisioning it, operating it, securing it, and paying for it. The platform provides no SLA for user-managed resources. This row makes that responsibility explicit.

---

### Architecture review for reusable patterns (graduation trigger)

When multiple business units independently build similar things (e.g. three teams all build their own model-serving wrappers), that's a signal that the pattern should be **graduated** into a platform extension. This row covers who reviews user-managed resources, identifies reusable patterns, and triggers the graduation process.

---

### Graduation to platform-managed — ownership handover

The actual process of **graduating** a resource from BU-owned to platform-owned: refactoring the code to platform standards, integrating it into the platform's IaC and CI/CD, assigning an SLA, and formally handing over ownership. This is a significant event with contractual implications (the platform now owns the lifecycle).

---

### Platform-managed resources — SLA, lifecycle & cost attribution

Once a resource is platform-managed, the platform team is responsible for its **SLA** (uptime, performance), **lifecycle** (upgrades, deprecation, end-of-life), and **cost attribution** (charging the cost back to consuming BUs or absorbing it as a platform cost). This row asks who carries those responsibilities.

---

### Boundary disputes — escalation & resolution

When there's disagreement about whether a resource should be platform-managed or user-managed, or about who should pay for it, or about where the boundary of the platform ends — that's a **boundary dispute**. This row covers the escalation and resolution process: who arbitrates, what criteria are used, and how decisions are documented.

---

*This glossary is a living document. If an activity row is unclear during the workshop, update this glossary with the agreed definition.*
