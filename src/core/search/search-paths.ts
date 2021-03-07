export default [
  {
    "key": "/search/user",
    "value": {
      "get": {
        "tags": ["Search", "User"],
        "sumary": "Search for users paginated",
        "parameters": [
          {
            "in": "query",
            "name": "q",
            "type": "string",
            "required": true,
            "description": "Query arguments"
          },
          {
            "in": "query",
            "name": "page",
            "default": 1,
            "type": "integer",
            "required": false,
            "description": "Current page"
          },
          {
            "in": "query",
            "name": "order",
            "default": "desc",
            "type": "string",
            "required": false,
            "description": "Ordenation"
          },
          {
            "in": "query",
            "name": "per_page",
            "default": 10,
            "type": "integer",
            "required": false,
            "description": "Quantity per page"
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/User"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
]