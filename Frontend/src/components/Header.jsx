import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="p-4 bg-black flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-[30px] uppercase font-bold text-yellow-400">Movie</h1>
        <nav className="flex items-center space-x-4">
          <Link to="/about" className="text-white">About</Link>  {/* Thêm link về About nếu cần */}
          <Link to="/contact" className="text-white">Contact</Link>  {/* Thêm link về Contact nếu cần */}
          <Link to="/upload" className="text-white"> Movie Upload</Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <input type="text" placeholder="Search" className="p-3 text-black" />
        <button className="p-2 text-white bg-yellow-500">Search</button>
      </div>
    </div>
  );
}

export default Header;
