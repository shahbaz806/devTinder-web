import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import RequestContent from "./RequestContent";

const Request = () => {
  const request = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [processingStatus, setProcessingStatus] = useState("");
  const [error, setError] = useState("");

  // Fetch Requests
  const fetchRequest = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(BASE_URL + "/user/request/recieved", {
        withCredentials: true,
      });

      dispatch(addRequest(res?.data?.data || []));
    } catch (err) {
      console.error(err);
      setError("Unable to load requests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Accept / Reject Request
  const reviewRequest = async (status, id) => {
    try {
      setProcessingId(id);
      setProcessingStatus(status);

      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(id));
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setProcessingId(null);
      setProcessingStatus("");
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <RequestContent
      request={request || []}
      loading={loading}
      error={error}
      onRetry={fetchRequest}
      onReview={reviewRequest}
      processingId={processingId}
      processingStatus={processingStatus}
    />
  );
};

export default Request;
