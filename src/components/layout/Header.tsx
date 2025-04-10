
import React from 'react';
import NavBar from './NavBar';

// Sample navigation links
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
  return <NavBar links={navLinks} />;
};

export default Header;
