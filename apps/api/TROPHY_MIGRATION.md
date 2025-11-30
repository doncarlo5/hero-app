# Trophy System Migration

This document explains the new persistent TrophyDefinition system that replaces the TrophiesConstant seeding approach.

## Overview

The trophy system has been refactored to use a persistent `TrophyDefinition` model that stores global trophy criteria, while individual user progress is tracked in `Trophy` documents that reference these definitions.

## Key Changes

### 1. TrophyDefinition Model

- **File**: `apps/api/models/trophy-definition.model.js`
- **Purpose**: Stores global trophy criteria (exercise type, multiplier, rep target, level, description)
- **Key Fields**: `exerciseType`, `weightMultiplier`, `repsGoal`, `level`, `description`, `rewardText`

### 2. Updated Trophy Model

- **File**: `apps/api/models/trophy.model.js`
- **Changes**: Now references `TrophyDefinition` instead of storing duplicate data
- **Key Fields**: `trophyDefinition`, `achieved`, `repsUser`, `weightUser`, `awardedAt`, `owner`

### 3. Migration Script

- **File**: `apps/api/seed/migrateTrophyDefinitions.js`
- **Purpose**: Migrates data from `TrophiesConstant` to `TrophyDefinition` collection
- **Usage**: Run `node apps/api/seed/migrateTrophyDefinitions.js`

### 4. Lazy Trophy Creation

- **Behavior**: Trophies are created when users first interact with exercises
- **Benefit**: No need to pre-seed trophies for every new user
- **Implementation**: Handled in `checkAndAwardTrophies` function

### 5. Backward Compatible API

- **File**: `apps/api/api/trophy.js`
- **Behavior**: API responses are transformed to maintain the same structure as before
- **Benefit**: Mobile/web apps continue to work without changes

## Migration Steps

1. **Run the migration script**:

   ```bash
   cd apps/api
   node seed/migrateTrophyDefinitions.js
   ```

2. **Deploy the updated code** - the new system will:
   - Use TrophyDefinition references for new trophy checks
   - Create trophies lazily when users interact with exercises
   - Maintain backward compatibility in API responses

## Benefits

- **Reduced Data Duplication**: Trophy criteria stored once in TrophyDefinition
- **Easier Maintenance**: Update trophy criteria in one place
- **Better Performance**: No need to seed trophies for every new user
- **Backward Compatibility**: Existing mobile/web apps continue to work
- **Cleaner Code**: Separation of concerns between definitions and user progress

## API Response Format

The API maintains the same response format for backward compatibility:

```json
{
  "_id": "...",
  "name": "Overhead Press - Barre",
  "exerciseType": { "_id": "...", "name": "Overhead Press - Barre" },
  "trophyType": "silver",
  "repsGoal": 10,
  "weightMultiplier": 0.5,
  "description": "50% du poids de corps",
  "level": 1,
  "rewardText": "Congrats!",
  "achieved": true,
  "repsUser": 12,
  "weightUser": 45,
  "awardedAt": "2024-01-01T00:00:00.000Z",
  "owner": "...",
  "trophyDefinition": "..."
}
```
