import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-50 border-t py-16 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <h5 className="font-bold uppercase text-xs tracking-widest text-gray-400">
            Go anywhere with go2gather
          </h5>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-[#00AFF5] cursor-pointer">
              Popular rides
            </li>
            <li className="hover:text-[#00AFF5] cursor-pointer">
              Popular carpool destinations
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h5 className="font-bold uppercase text-xs tracking-widest text-gray-400">
            Travel with carpool
          </h5>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Nashik → Pune</li>
            <li>Mumbai → Pune</li>
            <li>Pune → Aurangabad</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h5 className="font-bold uppercase text-xs tracking-widest text-gray-400">
            Find out more
          </h5>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-[#00AFF5] cursor-pointer">Who we are</li>
            <li className="hover:text-[#00AFF5] cursor-pointer">
              How does it work?
            </li>
            <li className="hover:text-[#00AFF5] cursor-pointer">Help Centre</li>
          </ul>
        </div>
        <div className="space-y-6">
          <div className="flex gap-4">
            <Facebook
              className="text-gray-400 hover:text-blue-600 cursor-pointer"
              size={20}
            />
            <Twitter
              className="text-gray-400 hover:text-black cursor-pointer"
              size={20}
            />
            <Youtube
              className="text-gray-400 hover:text-red-600 cursor-pointer"
              size={20}
            />
            <Instagram
              className="text-gray-400 hover:text-pink-600 cursor-pointer"
              size={20}
            />
          </div>
          <button className="text-sm font-bold border rounded-full px-4 py-2 hover:bg-gray-100">
            Language - English (India)
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex justify-between text-[10px] text-gray-400 border-t pt-8">
        <p>Terms and Conditions</p>
        <p>go2gather, 2026 ©</p>
      </div>
    </footer>
  );
}

export default Footer;
