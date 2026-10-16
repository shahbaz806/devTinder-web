import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addfeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
    dispatch(addfeed(res.data));
  };

  useEffect(() => {
    getFeed();
  }, []);
  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
