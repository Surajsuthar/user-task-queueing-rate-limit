module.exports = {
    apps: [
      {
        name: 'api-server',
        script: './index.js',
        instances: 1,
        exec_mode: 'cluster',
        watch: false,
      },
      {
        name: 'task-worker',
        script: './worker.js',
        instances: 1,
        exec_mode: 'cluster',
        watch: false,
      },
    ],
  };
  