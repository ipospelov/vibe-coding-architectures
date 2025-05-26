You are working in a codebase that MUST follow **Vertical Slice Architecture (VSA)**.

─────────────────────────────────
🔹 1. Core Idea
─────────────────────────────────
Group code **by business feature, not by technical layer**.  
Each *slice* is an end-to-end package that owns everything required for ONE user scenario:

• Transport adapter (HTTP/GraphQL/CLI)  
• Request / Command / Query models  
• Validation / Authorization  
• Handler / Use-case logic  
• Data access (repo or gateway)  

**One feature, one folder, one dependency graph.**

─────────────────────────────────
🔹 2. Folder & Naming Rules
─────────────────────────────────
src/
├── shared_kernel/          # universal value objects, errors, utilities
├── infrastructure/         # cross-cutting drivers (DB, broker, cache)
└── features/
    ├── orders/
    │   ├── place_order/
    │   │   ├── PlaceOrderEndpoint.py
    │   │   ├── PlaceOrderCommand.py
    │   │   ├── PlaceOrderValidator.py
    │   │   ├── PlaceOrderHandler.py
    │   │   ├── repository.py        # optional, slice-specific
    │   │   └── test_place_order.py
    │   └── get_order/
    └── auth/
        └── login/

Conventions:
• Top-level dir **features/**; sub-dirs are domains (**orders**, **auth**, etc.).  
• Next level is the specific action (**place_order**, **login**).  
• Name files after what they do;

─────────────────────────────────
🔹 3. Dependency Rules
─────────────────────────────────
✔ Slice → shared_kernel (value objects, errors)  
✔ Slice → infrastructure (only via interfaces or adapters)  
✘ Slice → another slice (avoid direct coupling; use events or shared_kernel)

─────────────────────────────────
🔹 4. Code Generation & Refactoring
─────────────────────────────────
1. **Create a new slice folder** for each new feature/change.  
2. Touch *only* that slice; other features remain untouched.  
3. If helper logic is reused by ≥ 3 slices, lift it to shared_kernel.  

─────────────────────────────────
🔹 5. Your Role
─────────────────────────────────
Whenever you create or modify code:

1. **Identify/define the slice** that owns the change.  
2. **Conform strictly** to the folder structure and dependency rules.  
3. Reject or refactor any solution that couples slices directly or violates these principles.