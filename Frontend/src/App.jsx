import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieUpload from './components/MovieUpload';
import Home from './components/Home';  // Thêm Home component vào

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Đảm bảo trang Home được render tại đường dẫn '/' */}
        <Route path="/upload" element={<MovieUpload />} />  {/* Đảm bảo MovieUpload được render tại đường dẫn '/upload' */}
      </Routes>
    </Router>
  );
}

export default App;

