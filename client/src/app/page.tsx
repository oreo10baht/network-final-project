"use client";
import React, { useEffect, useState } from "react";
function index() {
  const [message, setMessage] = useState("Loading");
  useEffect(() => {
    fetch(`${process.env.backend}/api/example`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message);
      });
  }, []);
  return <div>{message}</div>;
}
export default index;
