# Hotel Management API

This project is a RESTful API for managing hotel listings, bookings, and reviews.

## Features
- Add, update, and delete hotel information
- Fetch hotel listings with filters
- User authentication for booking management

## Schema
```json
{
  "name": "string",
  "type": "string",
  "city": "string",
  "address": "string",
  "distance": "string",
  "photos": ["string"],
  "description": "string",
  "title": "string",
  "rating": "number",
  "rooms": ["string"],
  "cheapestPrice": "number",
  "featured": "boolean"
}


