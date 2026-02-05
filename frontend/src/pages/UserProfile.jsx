import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Ban,
  CircleUserRound,
  MessageCircle,
  PawPrint,
  Star,
} from "lucide-react";
import { getOrCreateConversation } from "@/features/chat/services/chatApi";
import { getUserProfile } from "@/services/user/userApi";

function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => getUserProfile(userId),
  });

  if (isLoading) return <div>Loading profile...</div>;

  const { user, preferences, stats } = data;

  const startChat = async () => {
    const conversation = await getOrCreateConversation({ userId: user.id });
    navigate(`/chats/${conversation._id}/${user.name}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <CircleUserRound size={100} />
        <div>
          <h1 className="text-2xl font-semibold">{user.name}</h1>
          {/* <p className="text-gray-500">{user.age} y/o</p> */}
          <p className="text-sm text-gray-600">
            Experience level: {user.experienceLevel}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Star /> {user.ratingAvg} / 5 — {user.ratingCount || 0} ratings
      </div>

      {user.phoneVerified && (
        <div className="text-green-600 text-sm">✔ Confirmed phone number</div>
      )}

      <div className="border-t pt-4 space-y-2">
        <h3 className="font-semibold">About {user.name}</h3>

        {preferences.chatty && (
          <p>
            <MessageCircle /> I’m chatty when I feel comfortable
          </p>
        )}
        {!preferences.smoking && (
          <p className="flex items-center gap-2">
            {" "}
            <Ban /> No smoking, please
          </p>
        )}
        {!preferences.pets && (
          <p className="flex items-center gap-2">
            <PawPrint /> I’d prefer not to travel with pets
          </p>
        )}
      </div>

      <div className="border-t pt-4 text-sm text-gray-600">
        <p>{stats.publishedRides} rides published</p>
        <p>Member since {new Date(user.memberSince).toLocaleDateString()}</p>
      </div>

      <Button onClick={startChat} className="w-full gap-2">
        <MessageCircle size={18} />
        Chat with {user.name}
      </Button>
    </div>
  );
}

export default UserProfile;
