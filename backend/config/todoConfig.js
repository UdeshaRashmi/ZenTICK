// Configuration/settings for Todo features
module.exports = {
  defaultPageSize: 20,
  maxTitleLength: 200,
  allowedSortFields: ['createdAt', 'title', 'completed'],
  defaultSort: { createdAt: -1 },
};
