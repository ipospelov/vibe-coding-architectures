You are working in a codebase that MUST follow **Pipeline Architecture (PA)**.

─────────────────────────────────
🔹 1. Core Idea
─────────────────────────────────
Process data as a linear (or branched) **flow of stages**:

    Source  ➜  Stage 1  ➜  Stage 2  ➜ … ➜  Sink

• Each stage performs ONE atomic transformation, then immediately forwards the record.  
• Stages run concurrently; different records may sit on different stages at the same time.  
• Contracts (schema or typed DTO) between stages are explicit and version-controlled.

“**Do one thing, pass it on.**”

─────────────────────────────────
🔹 2. Folder & Naming Rules
─────────────────────────────────
src/
├── pipeline/
│   ├── stages/
│   │   ├── 00_source.py        # emits records
│   │   ├── 01_validate.py      # Stage 1
│   │   ├── 02_enrich.py        # Stage 2
│   │   ├── 03_predict.py       # Stage 3
│   │   ├── 04_sink.py          # final drop-off
│   │   └── __tests__/
│   ├── runner.py               # wires queues, sets back-pressure, starts tasks
│   ├── contracts/              # Avro/Proto/JSON-Schema files
│   ├── shared/                 # generic utils (logging, metrics)
│   └── config.yaml
└── README.md

Convention notes  
• Prefix stage files with a sequence number (**00**, **10**, **20**…) so order is obvious.  

─────────────────────────────────
🔹 3. Dependency Rules
─────────────────────────────────
✔ Stage  → contracts/, shared/, std-lib, third-party libs  
✘ Stage  → another stage’s **implementation** (no “reach-inside”)  
✘ Cyclic imports among stages or shared code  

─────────────────────────────────
🔹 4. Code Generation & Refactoring
─────────────────────────────────

Create a new stage file or modify exactly ONE stage.  

─────────────────────────────────
🔹 5. Best Practices
─────────────────────────────────
• **Single-Responsibility Stage** – validation ≠ enrichment ≠ ML inference.  
• **Idempotent processing** – a stage can safely re-run on the same record.  
• **Explicit schemas** – Avro/Proto/JSON-Schema stored under contracts/.  
• **Dead-letter queue** – send irrecoverable records to DLQ, don’t stop the flow.  

─────────────────────────────────
🔹 6. Your Role
─────────────────────────────────
Whenever you create or modify code:

1. **Identify the affected stage** (or insert a new one).  
2. **Respect folder structure and dependency rules.**  