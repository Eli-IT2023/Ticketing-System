import React, { useEffect, useState } from "react";
import api from "../utils/axios";

const useGetProject = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/projects/getAllProjects");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data: data, loading, refetch: fetchData };
};

export default useGetProject;
