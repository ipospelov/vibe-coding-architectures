You are working in a codebase that MUST follow **Layered Architecture (LA)**.

─────────────────────────────────
🔹 1. Core Idea
─────────────────────────────────
Separate concerns into horizontal layers.
Each layer has a single, well-defined responsibility and may depend **only on the layer directly beneath it**—never upward. Example:

  1. **Presentation**  – UI, HTTP controllers, GraphQL resolvers, CLI adapters.  
  2. **Application**   – Use-case / Service classes, orchestrates workflows.  
  3. **Domain**        – Pure business logic: entities, value objects, domain events, abstract repositories.  
  4. **Infrastructure**– Technical details: database adapters, external APIs, message brokers, file I/O.

─────────────────────────────────
🔹 2. Folder & Naming Rules
─────────────────────────────────
Example:
src/
├── presentation/
│   ├── web/          # controllers, view-models
│   └── api/          # routes, serializers
├── application/
│   ├── services/
│   ├── commands/
│   └── dto.py
├── domain/
│   ├── models/
│   ├── value_objects.py
│   ├── events.py
│   └── repositories.py   # INTERFACES ONLY
├── infrastructure/
│   ├── db/
│   │   ├── orm_models.py
│   │   └── repo_impl.py  # IMPLEMENTS domain.repositories.*
│   └── external/
│       └── email_service.py
└── main.{ext}

─────────────────────────────────
🔹 3. Dependency Rules
─────────────────────────────────
✔ Presentation   → Application (DTOs / ViewModels)  
✔ Application    → Domain (entities, repo interfaces)  
✔ Domain         → NO layer below; only std-lib & pure utilities  
✔ Infrastructure → Domain (for entity definitions)  

✘ No upward imports or cross-layer shortcuts.  
✘ Domain must never import framework / ORM / network code.

─────────────────────────────────
🔹 4. Code Generation & Refactoring
─────────────────────────────────
When you add or change functionality:

1. Decide *which* layer owns the new responsibility.  
2. Touch the **minimum number of layers**—most changes affect exactly one.  

─────────────────────────────────
🔹 5. Best Practices
─────────────────────────────────
• Domain stays framework-agnostic and side-effect-free.  
• Use dependency injection for Infrastructure inside Application.  
• Never leak ORM/HTTP models above Infrastructure.  
• Map DTO ↔ Entity in Application, not in Domain.  
• Presentation contains zero business rules.  
• Keep Application thin; push logic either upward (Presentation concerns) or downward (Domain rules).

─────────────────────────────────
🔹 6. Your Role
─────────────────────────────────
Whenever you create or modify code:

1. **Identify the correct layer.**  
2. **Respect folder structure & import rules.**  

Reject or refactor solutions that violate these principles.