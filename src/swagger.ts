export default {
  "openapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title:": "Api Cache Github",
    "description": "A simple exemple of how to cache api requests",
    "license": {
      "name": "ISC",
      "url": "https://opensource.or/licenses/ISC"
    }
  },
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "definitions": {
    "User": {
      "type": "object",
      "properties": {
        "login": {
          "type": "string"
        },
        "id": {
          "type": "number"
        },
        "node_id": {
          "type": "string"
        },
        "avatar_url": {
          "type": "string"
        },
        "gravatar_id": {
          "type": "string"
        },
        "url": {
          "type": "string"
        },
        "html_url": {
          "type": "string"
        },
        "followers_url": {
          "type": "string"
        },
        "following_url": {
          "type": "string"
        },
        "gists_url": {
          "type": "string"
        },
        "starred_url": {
          "type": "string"
        },
        "subscriptions_url": {
          "type": "string"
        },
        "organizations_url": {
          "type": "string"
        },
        "repos_url": {
          "type": "string"
        },
        "events_url": {
          "type": "string"
        },
        "received_events_url": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "site_admin": {
          "type": "boolean"
        }
      }
    },
    "Users": {
      "type": "object",
      "properties": {
        "cats": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/User"
          }
        }
      }
    }
  }
}