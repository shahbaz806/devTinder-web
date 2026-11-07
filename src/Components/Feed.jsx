import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { BASE_URL } from "../utils/constant";
import { addfeed } from "../utils/feedSlice";
import FeedContent from "./FeedContent";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getFeed = useCallback(
    async (force = false) => {
      if (feed != null && !force) return;

      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`${BASE_URL}/feed`, {
          withCredentials: true,
        });

        dispatch(addfeed(res.data));
      } catch (err) {
        console.error("Feed Error:", err);
        setError("Unable to load profiles. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [feed, dispatch]
  );

  useEffect(() => {
    getFeed();
  }, [getFeed]);

  return (
    <FeedContent
      feed={feed}
      loading={loading}
      error={error}
      onRefresh={() => getFeed(true)}
    />
  );
};

export default Feed;
