
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, User } from 'lucide-react';

interface NavLink {
  text: string;
  href: string;
}

interface UserData {
  name: string;
  avatar: string;
}

interface NavBarProps {
  links: NavLink[];
  user?: UserData;
  login: {
    onLogin: () => void;
  };
}

const NavBar: React.FC<NavBarProps> = ({ links, user, login }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 z-10">
            <span className="font-bold text-xl text-wangsammo-orange">Smart Wangsammo</span>
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center justify-center space-x-6">
              {links.map((link, index) => (
                <Link 
                  key={index} 
                  to={link.href} 
                  className="text-gray-700 hover:text-wangsammo-orange"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          )}
          
          {/* Mobile Navigation - Dropdown for tablets */}
          {isMobile && window.innerWidth >= 480 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="md:hidden">
                  <Menu size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] bg-white">
                {links.map((link, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link to={link.href} className="w-full">
                      {link.text}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {/* Mobile Navigation - Full menu for phones */}
          {isMobile && window.innerWidth < 480 && (
            <>
              <Button variant="ghost" onClick={toggleMobileMenu} className="md:hidden z-20">
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
              
              {mobileMenuOpen && (
                <div className="fixed inset-0 bg-white z-10 flex flex-col">
                  <div className="flex justify-between items-center p-4 border-b">
                    <Link to="/" className="font-bold text-xl text-wangsammo-orange">
                      Smart Wangsammo
                    </Link>
                    <Button variant="ghost" onClick={toggleMobileMenu}>
                      <X size={20} />
                    </Button>
                  </div>
                  <nav className="flex flex-col p-4">
                    {links.map((link, index) => (
                      <Link
                        key={index}
                        to={link.href}
                        className="py-3 text-gray-700 hover:text-wangsammo-orange border-b border-gray-100"
                        onClick={toggleMobileMenu}
                      >
                        {link.text}
                      </Link>
                    ))}
                  </nav>
                </div>
              )}
            </>
          )}
          
          {/* User section / Login button */}
          <div className="flex items-center space-x-3 z-10">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="hidden sm:inline">{user.name}</span>
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <Button onClick={login.onLogin} className="bg-wangsammo-orange hover:bg-wangsammo-orange/90">
                เข้าสู่ระบบ
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
