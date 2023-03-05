const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

//initial state
const initialState = {
  loading: true,
  posts: [],
  error: "",
};

const fetchVideo = createAsyncThunk("video/fetchVideo", async () => {
  const response = await fetch("http://localhost:9000/videos");
  const result = await response.json();
  return result;
});

const searchVideos = createAsyncThunk("video/searchVideos", async (tags) => {
  const queryString = tags?.map((tag) => `tags_like=${tag}`).join("&");
  const response = await fetch(`http://localhost:9000/videos?${queryString}`);
  const result = await response.json();
  const sortVideos = result.sort((firstObj, secObj) => {
    return parseFloat(secObj.views) - parseFloat(firstObj.views);
  });
  return sortVideos;
});

const videosSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideo.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.posts = action.payload;
      })
      .addCase(fetchVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.posts = [];
      })
      .addCase(searchVideos.pending, (state, action) => {
        state.loading = true;
        state.error = "";
        state.posts = [];
      })
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.posts = action.payload;
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.posts = [];
      });
  },
});

module.exports = videosSlice.reducer;
module.exports.fetchVideo = fetchVideo;
module.exports.searchVideos = searchVideos;
