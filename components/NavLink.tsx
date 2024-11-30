"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps extends LinkProps {
  children: ReactNode;
  activeClassName: string; // Class to apply when the link is active
  className?: string; // Optional additional classes
}

const NavLink = ({ 
  children, 
  href, 
  activeClassName, 
  className = "", 
  ...rest 
}: NavLinkProps) => {
  const pathname = usePathname(); // Get the current path
  const isActive = pathname.endsWith(href.toString()) || (href.toString().includes(pathname) && pathname !== "/");
  
  const newClassName = `${isActive ? activeClassName : ""} ${className}`.trim();

  return (
    <Link href={href} className={newClassName} {...rest}>
      {children}
    </Link>
  );
};

export default NavLink;
