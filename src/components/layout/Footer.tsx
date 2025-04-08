
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-wangsammo-dark text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Smart Wangsammo</h3>
            <p className="text-gray-300">
              แพลตฟอร์มแจ้งเหตุอัจฉริยะ ผสาน AI เพื่อชุมชนที่น่าอยู่
            </p>
            <div className="mt-4 flex items-center">
              <img 
                src="/lovable-uploads/a6f236b1-baea-4e08-9184-b2b786ccdb0a.png" 
                alt="Smart Wangsammo Logo" 
                className="h-10 w-auto" 
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">ลิงค์</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-wangsammo-orange">หน้าหลัก</Link>
              </li>
              <li>
                <Link to="/report" className="text-gray-300 hover:text-wangsammo-orange">แจ้งเหตุ</Link>
              </li>
              <li>
                <Link to="/track" className="text-gray-300 hover:text-wangsammo-orange">ติดตามเรื่อง</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-wangsammo-orange">แดชบอร์ด</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-wangsammo-orange">เกี่ยวกับเรา</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">ติดต่อเรา</h3>
            <address className="not-italic text-gray-300">
              <p>สำนักงานอำเภอวังสามหมอ</p>
              <p>จังหวัดอุดรธานี</p>
              <p className="mt-2">โทร: 042-387105</p>
              <p>อีเมล: wangsammo@email.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Smart Wangsammo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
