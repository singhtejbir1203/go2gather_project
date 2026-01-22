import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Car,
  Users,
  ShieldCheck,
  Clock,
  MessageCircle,
  CheckCircle2,
  ChevronRight,
  PlayCircle,
} from "lucide-react";
import LocationInput from "@/features/search/components/LocationInput";
import PassengerSelect from "@/features/search/components/PassengerSelect";

function PublishRideInfo() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleStartPublishing = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/publish");
    }
  };

  return (
    <div className="font-sans text-[#054752]">
      <section className="bg-[#E5F4FF] pt-12 pb-20 px-4">
        <h1 className="text-2xl md:text-4xl text-center font-bold leading-tight mb-8">
          Become a go2gather driver and save on travel costs by sharing your
          ride with passengers.
        </h1>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm border border-gray-100">
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-3 border-b border-gray-200">
                  <div className="w-3 h-3 rounded-full border-2 border-[#00AFF5]" />
                  <LocationInput placeholder="From where?" />
                </div>
                <div className="flex items-center gap-3 p-3 border-b border-gray-200">
                  <div className="w-3 h-3 rounded-full border-2 border-[#00AFF5]" />
                  <LocationInput placeholder="To where?" />
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <Users size={18} className="text-gray-500" />
                  <PassengerSelect value="2" onChange={""} />
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500">Save up to</p>
                <p className="text-3xl font-bold text-[#00AFF5]">₹1,xxx</p>
                <p className="text-xs text-gray-400">on your first ride.</p>
              </div>

              <Button
                onClick={handleStartPublishing}
                className="w-full bg-[#00AFF5] hover:bg-[#008ec7] h-12 text-lg rounded-xl transition-all"
              >
                Publish a ride
              </Button>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="absolute bottom-14 flex justify-center opacity-30 pointer-events-none">
              <img
                src="https://plus.unsplash.com/premium_vector-1682269851373-65c8474a4f55?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmlkZSUyMHNoYXJpbmd8ZW58MHx8MHx8fDA%3D"
                alt="Hero Background"
                className="w-full max-w-6xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- VALUE PROPS --- */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 uppercase tracking-wide">
          Drive. Share. Save.
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <h3 className="font-bold text-lg">Drive.</h3>
            <p className="text-gray-600 leading-relaxed">
              Keep your plans! Hit the road just as you anticipated and make the
              most of your vehicle's empty seats.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-lg">Share.</h3>
            <p className="text-gray-600 leading-relaxed">
              Travel with good company. Share a memorable ride with travellers
              from all walks of life.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-lg">Save.</h3>
            <p className="text-gray-600 leading-relaxed">
              Tolls, petrol, electricity... Easily cover all the costs with
              other passengers.
            </p>
          </div>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="bg-[#054752] text-white py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold">Join 21 million</p>
            <p className="text-blue-200">drivers already using BlaBlaCar</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">More than 100 million</p>
            <p className="text-blue-200">BlaBlaCar members worldwide</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">Over 40 million</p>
            <p className="text-blue-200">rides shared per year</p>
          </div>
        </div>
      </section>

      {/* --- HOW TO PUBLISH SECTION --- */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">
            Publish your ride in just minutes
          </h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group cursor-pointer">
              <div className="aspect-video bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000"
                  className="w-full h-full object-cover opacity-80"
                  alt="tutorial preview"
                />
                <PlayCircle className="absolute text-white w-16 h-16 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="mt-1">
                  <Users className="text-[#00AFF5]" size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Create a BlaBlaCar account</h4>
                  <p className="text-gray-500 text-sm">
                    Add your profile picture, a few words about you and your
                    phone number to increase trust between members.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1">
                  <Car className="text-[#00AFF5]" size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Publish your ride</h4>
                  <p className="text-gray-500 text-sm">
                    Indicate departure and arrival points, the date of the ride
                    and check our recommended price to increase your chances.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1">
                  <CheckCircle2 className="text-[#00AFF5]" size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Accept booking requests</h4>
                  <p className="text-gray-500 text-sm">
                    Review passenger profiles and accept their requests to ride
                    with you. That's how easy it is to start saving!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRUST & SAFETY --- */}
      <section className="py-16 px-4 border-y border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-10">
            We're here every step of the way
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <MessageCircle className="text-[#00AFF5] mb-4" />
              <h4 className="font-bold mb-2">At your service 24/7</h4>
              <p className="text-sm text-gray-500">
                Our team is at your disposal to answer any questions by email or
                social media.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <ShieldCheck className="text-[#00AFF5] mb-4" />
              <h4 className="font-bold mb-2">BlaBlaCar at your side</h4>
              <p className="text-sm text-gray-500">
                For just ₹4. benefit from the reimbursement of up to ₹50,000 of
                your excess when you publish a ride.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Clock className="text-[#00AFF5] mb-4" />
              <h4 className="font-bold mb-2">100% secure information</h4>
              <p className="text-sm text-gray-500">
                Our team is dedicated to the protection of your data, which is
                always 100% confidential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- HELP CENTER --- */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">
          Everything you need as a driver, in our Help Centre
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            "How do I set the passenger contribution for my ride?",
            "When do I get my money?",
            "What should I do if there's an error with my ride?",
            "How do I cancel a carpool ride as a driver of a ride?",
          ].map((q, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer group transition-colors"
            >
              <span className="font-medium text-gray-700">{q}</span>
              <ChevronRight
                className="text-gray-400 group-hover:text-[#00AFF5]"
                size={20}
              />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="rounded-full border-[#00AFF5] text-[#00AFF5] px-8 hover:bg-blue-50"
          >
            See more answers
          </Button>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="bg-[#00AFF5] py-12 text-center text-white">
        <h2 className="text-2xl font-bold mb-6">
          Ready to share your next journey?
        </h2>
        <Button
          onClick={handleStartPublishing}
          className="bg-white text-[#00AFF5] hover:bg-gray-100 rounded-full px-12 h-14 text-lg font-bold shadow-lg"
        >
          Publish a ride
        </Button>
      </section>
    </div>
  );
}

export default PublishRideInfo;
