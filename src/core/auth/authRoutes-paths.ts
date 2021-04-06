export default [
  {
    key: '/auth',
    value: {
      get: {
        tags: [
          'Auth'
        ],
        description: 'Open auth page',
        responses: {
          200: {
            description: 'OK',
            content: {
              'html': {
              }
            }
          }
        }
      }
    }
  },
  {
    key: 'auth/authorize',
    value: {
      get: {
        tags: [
          'Auth'
        ],
        parameters: [
          {
            in: 'query',
            name: 'code',
            type: 'string',
            required: true,
            description: 'Oauth code'
          },
          {
            in: 'query',
            name: 'returnToken',
            default: false,
            type: 'boolean',
            required: false,
            description: 'If true, returns the token'
          }
        ],
        description: 'Get acess token',
        responses: {
          200: {
            description: 'OK',
            content: {
              'html': {
              },
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: {
                      type: 'string'
                    },
                  }
                }
              }
            }
          }
        }
      }
    }
  },
];