import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import RideQrDetails from "@/components/qrResolver/RideQrDetails";
import BookingQrDetails from "@/components/qrResolver/BookingQrDetails";

function QrResolver() {
  const { token } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["qr", token],
    queryFn: async () => {
      const res = await api.get(`/qr/${token}`);
      return res.data;
    },
  });

  if (isLoading) return <div>Loading QR...</div>;

  if (error) {
    return (
      <div className="text-center text-red-600">QR expired or invalid</div>
    );
  }

  if (data.type === "RIDE") {
    return <RideQrDetails ride={data.ride} />;
  }

  if (data.type === "BOOKING") {
    return <BookingQrDetails booking={data.booking} seats={data.seats} />;
  }
}

export default QrResolver;
