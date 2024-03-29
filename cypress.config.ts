import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'kouj5r',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here s
    },
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
