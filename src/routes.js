export default {
  INDEX: '/',
  ROOT: '/:repoId',

  TREE: {
    mask: `/:repoId/tree/:path*/`,
    create: (repoId, path = '') => `/${repoId}` + (path ? `/tree/${path}` : ''),
  },
  BLOB: {
    mask: `/:repoId/blob/:path*/`,
    create: (repoId, path) => `/${repoId}/blob/${path}`,
  },

  NOT_FOUND: '/404',
};