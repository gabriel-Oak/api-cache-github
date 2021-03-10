export default [
  {
    key: "/auth",
    value: {
      get: {
        tags: [
          "Auth"
        ],
        description: "Open auth page",
        responses: {
          200: {
            description: "OK",
            content: {
              "html": {
              }
            }
          }
        }
      }
    }
  },
];