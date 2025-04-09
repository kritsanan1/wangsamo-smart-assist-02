
import React from 'react';
import NavBar from './NavBar';

// Sample navigation links - these should match the structure in Dashboard.tsx
const navLinks = [
  { text: "หน้าหลัก", href: "/" },
  { text: "แจ้งเรื่อง", href: "/report" },
  { text: "ติดตามเรื่อง", href: "/track" },
  { text: "แผนที่", href: "/map" },
  { text: "ติดต่อหน่วยงาน", href: "/contact" },
  { text: "แดชบอร์ด", href: "/dashboard" },
  { text: "เกี่ยวกับเรา", href: "/about" },
  { text: "ปรับแต่ง", href: "/customize" },
];

const Header = () => {
  const handleLogin = () => {
    // We'll forward to the dashboard page as an example
    window.location.href = '/dashboard';
  };

  return (
    <NavBar 
      links={navLinks}
      login={{ onLogin: handleLogin }}
    />
  );
};

export default Header;
