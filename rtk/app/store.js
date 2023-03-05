const { configureStore } = require("@reduxjs/toolkit");
const videosReducer = require("../features/videos/videosSlice");

const { createLogger } = require("redux-logger");

const logger = createLogger();

const store = configureStore({
  reducer: {
    post: videosReducer,
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(logger),
});

module.exports = store;
