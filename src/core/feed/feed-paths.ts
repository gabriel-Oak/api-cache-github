export default [
  {
    key: '/feed/private',
    value: {
      get: {
        tags: [
          'Feed'
        ],
        description: 'Get user\'s feed',
        parameters: [
          {
            in: 'headers',
            name: 'Authorization',
            type: 'string',
            required: true,
            description: 'The github user token'
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    '$ref': '#/definitions/User'
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