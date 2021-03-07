export default [
  {
    key: "/user",
    value: {
      get: {
        tags: [
          "User"
        ],
        description: "Get users paginated",
        parameters: [
          {
            in: "query",
            name: "since",
            default: 0,
            type: "integer",
            required: false,
            description: "Minimal user id"
          },
          {
            in: "query",
            name: "per_page",
            default: 10,
            type: "integer",
            required: false,
            description: "Quantity per page"
          }
        ],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    "$ref": "#/definitions/User"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  {
    key: "/user/{username}",
    value: {
      get: {
        tags: [
          "User"
        ],
        description: "Get users paginated",
        parameters: [
          {
            in: "path",
            name: "username",
            type: "string",
            required: true,
            description: "The github user name"
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  "$ref": "#/definitions/User"
                }
              }
            }
          }
        }
      }
    }
  }
];