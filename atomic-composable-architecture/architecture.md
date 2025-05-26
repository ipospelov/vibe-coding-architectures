You are working in a codebase that MUST follow **Atomic Composable Architecture (ACA)**.

─────────────────────────────────
🔹 1. Core Idea
─────────────────────────────────
Build complex features by composing tiny, self-contained units.  
The hierarchy is:

• **Atom** – a single pure function / small class / constant (≈ 5-50 Lines of code).  
  ▸ No runtime side-effects, no knowledge of the outside world, no imports from higher layers.

• **Molecule** – a folder grouping several atoms plus tests (≈ 50-300 Lines of code).  
  ▸ Exposes a minimal public interface; depends only on atoms or other molecules in the same folder.

• **Organism** – a complete subsystem or service (≈ 300-1500 Lines of code).  
  ▸ May hold state, start I/O, spin up workers, etc., but never leaks its internals upward.

Each layer can depend **only on its own layer or lower layers**—never upward.

─────────────────────────────────
🔹 2. Folder Naming Rules
─────────────────────────────────
src/
├── atoms/
│   └── {filename}*.{ext}
├── molecules/
│   └── {filename}*.{ext}
├── organisms/
│   └── {filename}*.{ext}
└── main.{ext} (if needed)

─────────────────────────────────
🔹 3. Allowed Imports
─────────────────────────────────
✔ Atom   → std-lib, third-party libs, *never* other atoms.  
✔ Molecule → atoms in same folder, std-lib, third-party.  
✔ Organism → atoms & molecules, infrastructure libs.  
✘ Cyclic or upward imports are forbidden and should fail lint/CI.

─────────────────────────────────
🔹 4. Code Generation Targets
─────────────────────────────────
When generating or refactoring code, ALWAYS start at the lowest layer that changes the behavior.  

─────────────────────────────────
🔹 5. Best Practices
─────────────────────────────────
• Pure functions first – push side-effects to the edges (organisms).  
• Prefer dependency injection over global state.  
• One public export per file unless strongly justified.  
• Document any place an atom’s change forces molecule/organism updates.
• Whenever you create or modify code **Decide the correct layer** (atom / molecule / organism).  
