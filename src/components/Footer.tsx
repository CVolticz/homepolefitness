/**
 * Footer component for Home Pole & Fitness
 */

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        <div>
          <h3 className="font-bold text-lg mb-2">Home Poledance & Fitness</h3>
          <p className="text-sm">
            Find your balance and inner peace through mindful practice and expert guidance.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>About</li>
            <li>Pole essentials</li>
            <li>Schedule</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Classes</h4>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>Intermediate Pole</li>
            <li>Beginner Pole</li>
            <li>Fitness</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Connect</h4>
          <div className="flex space-x-3">
            <a href="#"><span className="sr-only">Instagram</span>📷</a>
            <a href="#"><span className="sr-only">Email</span>✉️</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;