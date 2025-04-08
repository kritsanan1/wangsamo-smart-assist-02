
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Phone } from 'lucide-react';

const Header = () => {
  const { toast } = useToast();

  const handleHelpClick = () => {
    toast({
      title: "ศูนย์ช่วยเหลือ",
      description: "ติดต่อเจ้าหน้าที่ได้ที่เบอร์ 042-387105",
    });
  };

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-wangsammo-orange">Smart Wangsammo</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-wangsammo-orange">หน้าหลัก</Link>
            <Link to="/report" className="text-gray-700 hover:text-wangsammo-orange">แจ้งเหตุ</Link>
            <Link to="/track" className="text-gray-700 hover:text-wangsammo-orange">ติดตามเรื่อง</Link>
            <Link to="/map" className="text-gray-700 hover:text-wangsammo-orange flex items-center gap-1">
              <MapPin size={16} />
              แผนที่
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-wangsammo-orange flex items-center gap-1">
              <Phone size={16} />
              ติดต่อหน่วยงาน
            </Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-wangsammo-orange">แดชบอร์ด</Link>
            <Link to="/about" className="text-gray-700 hover:text-wangsammo-orange">เกี่ยวกับเรา</Link>
          </nav>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" onClick={handleHelpClick}>ช่วยเหลือ</Button>
            <Button className="bg-wangsammo-orange hover:bg-wangsammo-orange/90">เข้าสู่ระบบ</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
