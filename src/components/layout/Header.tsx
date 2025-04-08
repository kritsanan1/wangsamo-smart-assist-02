
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/a6f236b1-baea-4e08-9184-b2b786ccdb0a.png" 
                alt="Smart Wangsammo Logo" 
                className="h-8 w-auto" 
              />
              <span className="ml-2 text-xl font-bold text-wangsammo-dark">Smart Wangsammo</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="px-3 py-2 text-wangsammo-dark hover:text-wangsammo-orange">หน้าหลัก</Link>
            <Link to="/report" className="px-3 py-2 text-wangsammo-dark hover:text-wangsammo-orange">แจ้งเหตุ</Link>
            <Link to="/track" className="px-3 py-2 text-wangsammo-dark hover:text-wangsammo-orange">ติดตามเรื่อง</Link>
            <Link to="/dashboard" className="px-3 py-2 text-wangsammo-dark hover:text-wangsammo-orange">แดชบอร์ด</Link>
            <Link to="/about" className="px-3 py-2 text-wangsammo-dark hover:text-wangsammo-orange">เกี่ยวกับเรา</Link>
          </nav>
          
          <div className="hidden md:flex">
            <Button className="bg-wangsammo-orange hover:bg-wangsammo-orange/90 text-white">เข้าสู่ระบบ</Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-wangsammo-dark">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-2 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="px-3 py-2 text-wangsammo-dark hover:text-wangsammo-orange" onClick={() => setIsMenuOpen(false)}>หน้าหลัก</Link>
              <Link to="/report" className="px-3 py-2 text-wangsammo-dark hover:text-wangsammo-orange" onClick={() => setIsMenuOpen(false)}>แจ้งเหตุ</Link>
              <Link to="/track" className="px-3 py-2 text-wangsammo-dark hover:text-wangsammo-orange" onClick={() => setIsMenuOpen(false)}>ติดตามเรื่อง</Link>
              <Link to="/dashboard" className="px-3 py-2 text-wangsammo-dark hover:text-wangsammo-orange" onClick={() => setIsMenuOpen(false)}>แดชบอร์ด</Link>
              <Link to="/about" className="px-3 py-2 text-wangsammo-dark hover:text-wangsammo-orange" onClick={() => setIsMenuOpen(false)}>เกี่ยวกับเรา</Link>
              <Button className="bg-wangsammo-orange hover:bg-wangsammo-orange/90 text-white w-full mt-2">เข้าสู่ระบบ</Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
