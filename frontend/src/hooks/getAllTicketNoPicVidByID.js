import { useEffect, useState } from "react";
import api from "../utils/axios";

const useGetAllTicketNoPicVidByID = (selectedProjectId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!selectedProjectId) return;

    setLoading(true);
    try {
      const response = await api.get("/tickets/getAllTicketNoPicVidByID", {
        params: {
          selectedProjectId, // ✅ NOW SENT PROPERLY
        },
      });

      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedProjectId]);

  return { data, loading, refetch: fetchData };
};

export default useGetAllTicketNoPicVidByID;
