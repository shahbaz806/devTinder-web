import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { BASE_URL } from "../utils/constant";
import { addConnection } from "../utils/connectionSlice";
import ConnectionList from "./ConnectionList";

const Connection = () => {
  const connection = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(BASE_URL + "/user/connection", {
          withCredentials: true,
        });

        dispatch(addConnection(res?.data?.data || []));
      } catch (err) {
        console.error("Connection Error:", err);
        setError("Unable to load connections. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, [dispatch]);

  return (
    <ConnectionList
      connection={connection || []}
      loading={loading}
      error={error}
    />
  );
};

export default Connection;
