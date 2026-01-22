import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SearchBar from "@/features/search/components/SearchBar";
import {
  ShieldCheck,
  MapPin,
  CircleDollarSign,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

function Home() {
  const navigate = useNavigate();

  // Data for popular routes
  const popularRoutes = [
    { from: "New Delhi", to: "Chandigarh" },
    { from: "New Delhi", to: "Jaipur" },
    { from: "New Delhi", to: "Agra" },
  ];

  return (
    <div className="font-sans text-[#054752]">
      <section className="relative bg-[#E5F4FF] pt-16 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#054752] mb-4">
              Your pick of rides at low prices
            </h1>
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <SearchBar />
          </div>
        </div>

        <div className="absolute bottom-0 w-full flex justify-center opacity-30 pointer-events-none">
          <img
            src="https://plus.unsplash.com/premium_vector-1682269846147-df2f2b460299?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FycG9vbGluZ3xlbnwwfHwwfHx8MA%3D%3D"
            alt="Hero Background"
            className="w-full max-w-6xl"
          />
        </div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-3">
            <MapPin className="text-[#054752]" size={32} />
            <h3 className="text-xl font-bold">Travel everywhere</h3>
            <p className="text-gray-600 leading-relaxed">
              Explore all over India with countless carpool rides.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <CircleDollarSign className="text-[#054752]" size={32} />
            <h3 className="text-xl font-bold">Prices like nowhere</h3>
            <p className="text-gray-600 leading-relaxed">
              Benefit from great-value shared costs on your carpool rides.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <ShieldCheck className="text-[#054752]" size={32} />
            <h3 className="text-xl font-bold">Ride with confidence</h3>
            <p className="text-gray-600 leading-relaxed">
              Feel secure, knowing you're riding with carpool members with
              Verified Profiles.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="max-w-7xl mx-auto bg-[#054752] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden">
          <div className="max-w-lg z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Share your ride. Cut your costs.
            </h2>
            <p className="text-blue-100 mb-8 opacity-90">
              Carpool as a driver to turn your empty seats into lower travel
              costs. It’s simple: publish your ride and start saving on petrol
              and toll expenses.
            </p>
            <Button
              onClick={() => navigate("/publish")}
              className="bg-white text-[#054752] hover:bg-gray-100 rounded-full px-8 py-6 font-bold text-lg"
            >
              Publish a ride
            </Button>
          </div>

          <div className="mt-10 md:mt-0 z-10">
            {/* Promo Card Mockup */}
            <div className="bg-white p-4 rounded-xl text-[#054752] shadow-2xl max-w-xs rotate-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <MapPin size={16} />
                </div>
                <span className="font-bold text-xs uppercase tracking-wider">
                  Mohali Gurudwara
                </span>
              </div>
              <p className="text-[10px] text-gray-500 mb-4">
                Sector 70, Sahibzada Ajit Singh Nagar, Punjab
              </p>
              <div className="border-t pt-2 flex justify-between items-center">
                <span className="font-bold text-sm">₹450</span>
                <ArrowRight size={14} className="text-[#00AFF5]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SAFETY SECTION --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/vector-1761234227697-bcb9ce4075fd?q=80&w=3182&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Safety Illustration"
            className="w-full max-w-md"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6">
            Help us keep you safe from scams
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            At go2gather, we're working hard to make our platform as secure as
            it can be. But when scams do happen, we want you to know exactly how
            to avoid and report them. Follow our tips to help us keep you safe.
          </p>
          <Button
            variant="outline"
            className="rounded-full border-[#00AFF5] text-[#00AFF5] px-8 h-12 hover:bg-blue-50"
          >
            Learn more
          </Button>
        </div>
      </section>

      {/* --- POPULAR ROUTES --- */}
      <section className="bg-[#054752] py-16 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">Where do you want to go?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {popularRoutes.map((route, i) => (
              <div
                key={i}
                className="bg-white text-[#054752] p-5 rounded-xl flex justify-between items-center cursor-pointer hover:shadow-lg transition-all group"
              >
                <span className="font-bold">
                  {route.from} → {route.to}
                </span>
                <ChevronRight className="text-gray-300 group-hover:text-[#00AFF5]" />
              </div>
            ))}
          </div>
          <div className="mt-8">
            <button className="text-[#00AFF5] font-bold underline underline-offset-4 hover:text-blue-300">
              See our most popular rides
            </button>
          </div>
        </div>
      </section>

      {/* --- HELP CENTER (FAQ) --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          Carpool Help Centre
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {[
            {
              q: "How do I book a carpool ride?",
              a: "You can book a carpool ride on our mobile app, or on go2gather.in. Simply search for your destination, choose the date you want to travel and pick the carpool that suits you best!",
            },
            {
              q: "How do I publish a carpool ride?",
              a: "Offering a carpool ride on go2gather is easy. To publish your ride, use our mobile app or go2gather.in. Indicate your departure and arrival points, the date and time of your departure...",
            },
            {
              q: "How do I cancel my carpool ride?",
              a: "If you have a change of plans, you can always cancel your carpool ride from the 'Your rides' section of our app. The sooner you cancel, the better.",
            },
            {
              q: "What are the benefits of travelling by carpool?",
              a: "There are multiple advantages to carpooling over other means of transport. Travelling by carpool is usually more affordable, especially for longer distances.",
            },
          ].map((item, i) => (
            <div key={i} className="space-y-3">
              <h4 className="font-bold text-lg">{item.q}</h4>
              <p className="text-gray-500 text-sm line-clamp-3">{item.a}</p>
              <button className="text-[#00AFF5] font-bold text-sm">
                Read more
              </button>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button className="bg-[#00AFF5] hover:bg-[#008ec7] rounded-full px-10 h-12">
            Read our Help Centre
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Home;
