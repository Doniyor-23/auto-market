import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-3">AUTO MARKET</h3>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              O'zbekistondagi ishonchli mashina bozori. Minglab tekshirilgan
              e'lonlar orasidan o'zingizga mos mashinani toping yoki o'zingiznikini soting.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Havolalar</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/cars" className="hover:text-white transition">Cars</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
              <li><Link to="/register" className="hover:text-white transition">Register</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Aloqa</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Toshkent, O'zbekiston</li>
              <li>
                <a href="tel:+998901234567" className="hover:text-white transition">
                  +998 99 999 99 99
                </a>
              </li>
              <li>
                <a href="mailto:info@automarket.uz" className="hover:text-white transition">
                  info@automarket.uz
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-sm">
            © {year} AUTO MARKET. Barcha huquqlar himoyalangan.
          </p>
          <p className="text-gray-500 text-sm">
            O'quv loyihasi sifatida yaratilgan
          </p>
        </div>
      </div>
    </footer>
  );
}