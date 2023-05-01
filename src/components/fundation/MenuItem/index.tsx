import Link from "next/link";
import React, { AnchorHTMLAttributes } from "react";
import { usePathname } from "next/navigation"
import { IconType } from "react-icons";

interface IMenuItem extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: IconType
  children: string
  href: string
}

const MenuItem = ({icon: Icon, children, href, ...rest}: IMenuItem) => {
  const pathname = usePathname()
  let isActive = false
  if(pathname === href) isActive = true
  if(pathname.startsWith(href)) isActive = true
  //exact
  return (

    <Link
      href={href} {...rest}
      className={`opacity-80 hover:text-green-400
        ${isActive && "text-green-400"}
        transition
        px-2.5 py-1 flex rounded-md gap-5 items-center duration-300
      `}
    >
      {Icon && <Icon size={24} className="min-w-max"/>}
      <span>{children}</span>
    </Link>
  );
};

export default MenuItem;
