# Clash Archive — Data Ingestion & Content Pipeline Guide

## 1. Overview & Pipeline Architecture

Clash Archive features a multi-stage, deterministic data ingestion engine designed to import, validate, normalize, preview, and ingest large structured Clash of Clans datasets safely into PostgreSQL / Supabase.

```text
Structured JSON Dataset
        ↓
Import Request (File Upload or Raw JSON)
        ↓
Stage 1: Multi-Stage Schema Validation
        ↓
Stage 2: Data Normalization Layer
        ↓
Stage 3: Change Detection & Dry-Run Preview (Diffing)
        ↓
Stage 4: Admin Confirmation & Review
        ↓
Stage 5: Transaction-Safe Deterministic Database Upsert
        ↓
Stage 6: Automatic Frontend Reflection & Audit History Logging
```

---

## 2. Standard Versioned Import Format (v1.0)

Every dataset must follow the **v1.0** format. Both `camelCase` and `snake_case` field keys are supported.

```json
{
  "version": "1.0",
  "source": {
    "name": "Supercell Official Clash of Clans Verified Dataset",
    "url": "https://supercell.com/en/games/clashofclans/",
    "license": "Fair Use / Supercell Fan Content Policy",
    "attribution": "Supercell Oy & Clash Archive Content Engine"
  },
  "exportedAt": "2026-08-27T00:00:00Z",
  "entities": [
    {
      "name": "Barbarian",
      "slug": "barbarian",
      "entityType": "troop",
      "category": "troops",
      "subcategory": "elixir_troop",
      "summary": "Fearless melee warrior with glorious yellow mustache.",
      "description": "This fearless warrior relies on his bulging muscles...",
      "unlockTownHall": 1,
      "maxLevel": 12,
      "isFeatured": true,
      "isActive": true,
      "stats": {
        "housingSpace": 1,
        "movementSpeed": 16,
        "attackSpeed": 1.0,
        "range": 0.4,
        "targetType": "Ground",
        "damageType": "Single Target"
      },
      "levels": [
        {
          "level": 1,
          "requiredTownHall": 1,
          "upgradeCost": 0,
          "upgradeCurrency": "free",
          "upgradeTime": "None",
          "upgradeTimeSeconds": 0,
          "hitpoints": 45,
          "damagePerSecond": 9,
          "damagePerAttack": 9
        },
        {
          "level": 2,
          "requiredTownHall": 2,
          "upgradeCost": 2000,
          "upgradeCurrency": "elixir",
          "upgradeTime": "2h",
          "upgradeTimeSeconds": 7200,
          "hitpoints": 54,
          "damagePerSecond": 12,
          "damagePerAttack": 12
        }
      ],
      "requirements": [],
      "relationships": []
    }
  ]
}
```

---

## 3. Validation Stages & Rules

Validation is executed strictly before any database writes:

| Stage | What is Validated | Error Handling |
|---|---|---|
| **Document Level** | `version` must exist (`"1.0"`), `source` name must exist, `entities` must be an array. | Rejects document if invalid. |
| **Entity Level** | `name` is required, `slug` must be URL-safe kebab-case, `entityType` must be one of `VALID_ENTITY_TYPES`, `unlockTownHall` must be 1–17. | Flags entity as `invalid` with suggested fix. |
| **Duplicate Slugs** | Checks for duplicate slugs within the same import batch. | Rejects duplicate record. |
| **Upgrade Levels** | `level` must be integer &ge; 1, duplicate levels per entity are rejected, `upgradeCost` &ge; 0, `upgradeTimeSeconds` &ge; 0. | Flags level validation error. |
| **Relationships** | Target slug must be non-empty and cannot reference the entity itself. | Prevents self-referencing links. |

---

## 4. Normalization Transformations

The Normalizer runs on raw input to ensure data consistency:

* **Slugs**: Converts `"Barbarian King "` &rarr; `"barbarian-king"`.
* **Resources**: Converts `"Dark Elixir"` &rarr; `"dark_elixir"`, `"Gold"` &rarr; `"gold"`, `"Free"` &rarr; `"free"`.
* **Numbers**: Converts strings like `"45"` to number `45`.
* **Durations**: Parses `"1d 12h"` into `129600` seconds and vice versa.
* **Arrays**: Deduplicates string arrays (`trivia`, `tips`, `strengths`, `weaknesses`, `synergies`).
* **Nulls**: Converts empty strings or invalid values to `null`.

---

## 5. Change Detection & Preview Mode

Before database execution, the **Preview Engine** executes a dry-run against stored database entities:
* **`New`**: Entity does not exist in the database (will be inserted).
* **`Updated`**: Entity exists but has modified stats, descriptions, or new levels. Generates field-by-field before/after diffs.
* **`Unchanged`**: Entity and its upgrade levels match the database 100%.
* **`Invalid`**: Entity failed validation and will be skipped.

---

## 6. Idempotency & Upsert Strategy

* Primary entity matching is strictly deterministic based on `id = "${entity_type}-${slug}"`.
* Running the import multiple times is **idempotent**:
  * First run: `Created: N, Updated: 0`
  * Second run: `Created: 0, Updated: 0, Unchanged: N`
* Every execution logs an audit record to the `import_history` table with timestamps, status, duration, entity counts, errors, and warnings.

---

## 7. How to Add New Entity Types

To support a new entity type (e.g. `clan_capital_district` or `super_charge`):
1. Add the type name to `VALID_ENTITY_TYPES` in `src/imports/types/schema.ts` and `src/types/entity.ts`.
2. Add category metadata in `src/data/categories.ts`.
3. The normalizer and database adapter will automatically handle ingestion and stats storage without schema alterations.
