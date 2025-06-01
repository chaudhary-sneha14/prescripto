import { assets } from "../../assets/assets_frontend/assets"

export const About = () => {
  return (
    <div className="px-4 md:px-16">
      {/* Title */}
      <div className="text-center text-3xl pt-10 text-gray-500 font-light">
        <p>
          About <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      {/* Main Section */}
      <div className="my-12 flex flex-col md:flex-row items-center gap-12">
        <img
          className="w-full md:max-w-[360px] rounded-xl shadow-md"
          src={assets.about_image}
          alt="About Prescripto"
        />
        <div className="flex flex-col justify-center gap-6 w-full md:w-2/3 text-sm text-gray-700">
          <p>
            Welcome to <span className="font-medium text-primary">Prescripto</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <b className="text-lg text-gray-800">Our Vision</b>
          <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>

      {/* Why Choose Us Title */}
      <div className="text-xl font-medium my-8 text-center text-gray-800">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      {/* Feature Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="border rounded-xl px-8 py-10 flex flex-col gap-4 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer shadow-sm">
          <b className="text-lg">Efficiency:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className="border rounded-xl px-8 py-10 flex flex-col gap-4 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer shadow-sm">
          <b className="text-lg">Convenience:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className="border rounded-xl px-8 py-10 flex flex-col gap-4 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer shadow-sm">
          <b className="text-lg">Personalization:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  );
};
