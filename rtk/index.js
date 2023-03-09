require("util").inspect.defaultOptions.depth = null;
const { fetchVideo, searchVideos } = require("./features/videos/videosSlice");
const store = require("./app/store");

store.subscribe(() => {});

store
  .dispatch(fetchVideo())
  .then((fulfilledAction) => {
    const { requestStatus } = fulfilledAction.meta;
    if (requestStatus === "fulfilled") {
      const { tags } = fulfilledAction.payload;
      store.dispatch(searchVideos(tags));
    }
  })
  .catch((err) => {
    console.log(err);
  });
