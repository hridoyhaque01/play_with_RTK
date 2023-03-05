const { configureStore } = require("@reduxjs/toolkit");
const postReducer = require("../features/videos/videosSlice");

const { createLogger } = require("redux-logger");

const logger = createLogger();

const store = configureStore({
  reducer: {
    post: postReducer,
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(logger),
});

module.exports = store;
