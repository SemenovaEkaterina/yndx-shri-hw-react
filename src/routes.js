export default {
  ROOT: '/:repoId',

  TREE: {
    mask: `/:repoId/tree/:path*/`,
    create: (repoId, path) => `/${repoId}/tree/${path}`,
  },
  BLOB: {
    mask: `/:repoId/blob/:path*/`,
    create: (repoId, path) => `/${repoId}/blob/${path}`,
  },

  NOT_FOUND: '',
};