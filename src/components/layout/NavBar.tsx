
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface NavLink {
  text: string;
  href: string;
}

interface NavBarProps {
  links: NavLink[];
  user?: {
    name: string;
    avatar: string;
  };
  login: {
    onLogin: () => void;
  };
}

const NavBar: React.FC<NavBarProps> = ({ links }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogin = () => {
    navigate('/auth');
  };
  
  const handleLogout = async () => {
    await signOut();
  };

  // Extract user display name from email or user metadata
  const userDisplayName = user?.email ? user.email.split('@')[0] : 'User';
  
  // Use user initials for avatar fallback
  const userInitials = userDisplayName.substring(0, 2).toUpperCase();

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={userDisplayName} />
                      <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{userDisplayName}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">แดชบอร์ด</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">โปรไฟล์</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-red-600 cursor-pointer flex items-center"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> ออกจากระบบ
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleLogin} className="bg-wangsammo-orange hover:bg-wangsammo-orange/90">
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
