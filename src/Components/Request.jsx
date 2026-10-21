import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { addRequest } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Request = () => {
  const request = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/recieved", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addRequest(res?.data?.data));
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchRequest();
  }, []);

  if (!request) return;
  if (request.length === 0)
    return (
      <h1 className="text-center text-white text-2xl my-10">
        No Requests Found
      </h1>
    );

  return (
    <div className=" text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections Requests</h1>

      {request.map((req, indx) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          req.fromUserId;
        return (
          <div
            key={indx}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/4 mx-auto"
          >
            <div>
              <img
                className="w-20 h-20 rounded-full"
                src={photoUrl}
                alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtCAXOYueXDQfxhs7vsSfUQGkPNM1XENi9Bxg7IMPY3A&s=10"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-primary mx-2">Reject</button>
              <button className="btn btn-secondary mx-2">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
