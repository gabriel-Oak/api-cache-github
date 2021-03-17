export default {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Api Cache Github',
    description: 'A simple exemple of how to cache api requests',
    license: {
      name: 'ISC',
      url: 'https://opensource.or/licenses/ISC'
    }
  },
  consumes: [
    'application/json'
  ],
  produces: [
    'application/json'
  ],
  definitions: {
    UserCover: {
      type: 'object',
      properties: {
        externalId: {
          type: 'string'
        },
        url: {
          type: 'string'
        },
        thumbUrl: {
          type: 'string'
        },
      }
    },
    User: {
      type: 'object',
      properties: {
        login: {
          type: 'string'
        },
        id: {
          type: 'number'
        },
        node_id: {
          type: 'string'
        },
        avatar_url: {
          type: 'string'
        },
        gravatar_id: {
          type: 'string'
        },
        url: {
          type: 'string'
        },
        html_url: {
          type: 'string'
        },
        followers_url: {
          type: 'string'
        },
        following_url: {
          type: 'string'
        },
        gists_url: {
          type: 'string'
        },
        starred_url: {
          type: 'string'
        },
        subscriptions_url: {
          type: 'string'
        },
        organizations_url: {
          type: 'string'
        },
        repos_url: {
          type: 'string'
        },
        events_url: {
          type: 'string'
        },
        received_events_url: {
          type: 'string'
        },
        type: {
          type: 'string'
        },
        site_admin: {
          type: 'boolean'
        },
        cover: {
          type: 'object',
          '$ref': '#/definitions/UserCover'
        }
      }
    },
    Users: {
      type: 'object',
      properties: {
        cats: {
          type: 'array',
          items: {
            '$ref': '#/definitions/User'
          }
        }
      }
    },
    Repo: {
      type: 'object',
      properties: {
        id: {
          type: 'number'
        },
        node_id: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        full_name: {
          type: 'string'
        },
        private: {
          type: 'string'
        },
        owner: {
          type: 'object',
          '$ref': '#/definitions/User'
        },
        html_url: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        fork: {
          type: 'boolean'
        },
        url: {
          type: 'string'
        },
        forks_url: {
          type: 'string'
        },
        keys_url: {
          type: 'string'
        },
        collaborators_url: {
          type: 'string'
        },
        teams_url: {
          type: 'string'
        },
        hooks_url: {
          type: 'string'
        },
        issue_events_url: {
          type: 'string'
        },
        events_url: {
          type: 'string'
        },
        assignees_url: {
          type: 'string'
        },
        branches_url: {
          type: 'string'
        },
        tags_url: {
          type: 'string'
        },
        blobs_url: {
          type: 'string'
        },
        git_tags_url: {
          type: 'string'
        },
        git_refs_url: {
          type: 'string'
        },
        trees_url: {
          type: 'string'
        },
        statuses_url: {
          type: 'string'
        },
        languages_url: {
          type: 'string'
        },
        stargazers_url: {
          type: 'string'
        },
        contributors_url: {
          type: 'string'
        },
        subscribers_url: {
          type: 'string'
        },
        subscription_url: {
          type: 'string'
        },
        commits_url: {
          type: 'string'
        },
        git_commits_url: {
          type: 'string'
        },
        comments_url: {
          type: 'string'
        },
        issue_comment_url: {
          type: 'string'
        },
        contents_url: {
          type: 'string'
        },
        compare_url: {
          type: 'string'
        },
        merges_url: {
          type: 'string'
        },
        archive_url: {
          type: 'string'
        },
        downloads_url: {
          type: 'string'
        },
        issues_url: {
          type: 'string'
        },
        pulls_url: {
          type: 'string'
        },
        milestones_url: {
          type: 'string'
        },
        notifications_url: {
          type: 'string'
        },
        labels_url: {
          type: 'string'
        },
        releases_url: {
          type: 'string'
        },
        deployments_url: {
          type: 'string'
        },
        created_at: {
          type: 'string'
        },
        updated_at: {
          type: 'string'
        },
        pushed_at: {
          type: 'string'
        },
        git_url: {
          type: 'string'
        },
        ssh_url: {
          type: 'string'
        },
        clone_url: {
          type: 'string'
        },
        svn_url: {
          type: 'string'
        },
        homepage: {
          type: 'string'
        },
        size: {
          type: 'number'
        },
        stargazers_count: {
          type: 'number'
        },
        watchers_count: {
          type: 'number'
        },
        language: {
          type: 'string'
        },
        has_issues: {
          type: 'string'
        },
        has_projects: {
          type: 'boolean'
        },
        has_downloads: {
          type: 'boolean'
        },
        has_wiki: {
          type: 'boolean'
        },
        has_pages: {
          type: 'boolean'
        },
        forks_count: {
          type: 'number'
        },
        mirror_url: {
          type: 'string'
        },
        archived: {
          type: 'boolean'
        },
        disabled: {
          type: 'boolean'
        },
        open_issues_count: {
          type: 'number'
        },
        license: {
          type: 'string'
        },
        forks: {
          type: 'number'
        },
        open_issues: {
          type: 'number'
        },
        watchers: {
          type: 'number'
        },
        default_branch: {
          type: 'string'
        }
      }
    }
  }
}