import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function ReservationList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/reservations").then((res) => setData(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reservations</h1>

      <div className="space-y-3">
        {data.map((r) => (
          <div key={r.id} className="bg-white p-4 shadow rounded">
            <p><b>Name:</b> {r.name}</p>
            <p><b>Room:</b> {r.room}</p>
            <p><b>Date:</b> {r.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}