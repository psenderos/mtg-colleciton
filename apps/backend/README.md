# MTG Collection Backend API

This is the Go backend for the MTG Collection Manager application.

## Features

- HTTP REST API built with Gin
- PostgreSQL database with GORM ORM
- Version management with unique active constraint
- CORS enabled for frontend integration

## API Endpoints

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

### GET /api/lastVersion
Get the currently active version.

**Response:**
```json
{
  "version": "1.0.0"
}
```

**Error Responses:**
- `404`: No active version found
- `500`: Database error

## Database Schema

### versions table

| Column | Type | Description |
|--------|------|-------------|
| id | uint | Primary key |
| version_number | string | Version string (e.g., "1.0.0") |
| active | boolean | Whether this version is active |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

**Constraints:**
- Only one row can have `active = true` (enforced by unique index)

## Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
# Database configuration
DATABASE_URL=host=localhost user=postgres password=postgres dbname=mtg_collection port=5432 sslmode=disable TimeZone=UTC

# Server configuration
PORT=8080

# Environment
GIN_MODE=debug
```

## Running the Backend

```bash
# Install dependencies
go mod tidy

# Run in development mode
go run main.go

# Build for production
go build -o backend main.go
```

## Database Setup

Make sure PostgreSQL is running and create the database:

```sql
CREATE DATABASE mtg_collection;
```

The application will automatically:
1. Create the `versions` table
2. Add unique constraint for active versions
3. Insert initial version "1.0.0" if no active version exists