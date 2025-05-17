import { useState } from "react";
import {
  IconBellRinging,
  IconReceipt2,
  IconFingerprint,
  IconKey,
  IconDatabaseImport,
  Icon2fa,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";

interface NavItem {
  label: string;
  link: string;
  icon: Icon;
}

const mainNavItems: NavItem[] = [
  { label: "Notifications", link: "#", icon: IconBellRinging },
  { label: "Billing", link: "#", icon: IconReceipt2 },
  { label: "Security", link: "#", icon: IconFingerprint },
  { label: "SSH Keys", link: "#", icon: IconKey },
  { label: "Databases", link: "#", icon: IconDatabaseImport },
  { label: "Authentication", link: "#", icon: Icon2fa },
  { label: "Other Settings", link: "#", icon: IconSettings },
];

const accountNavItems: NavItem[] = [
  { label: "Logout", link: "#", icon: IconLogout },
];

export const Sidebar = () => {
  const [active, setActive] = useState("Billing");

  const renderLink = ({ icon: Icon, label, link }: NavItem) => {
    const isActive = active === label;

    return (
      <a
        key={label}
        href={link}
        onClick={(e) => {
          e.preventDefault();
          setActive(label);
        }}
        className={`flex items-center px-3 py-2 rounded text-sm font-medium transition-colors ${
          isActive
            ? "bg-blue-100 text-blue-600"
            : "text-gray-700 hover:bg-gray-100 hover:text-black"
        }`}
      >
        <Icon
          className={`w-5 h-5 mr-3 ${isActive ? "text-blue-600" : "text-gray-500"}`}
          stroke={1.5}
        />
        <span>{label}</span>
      </a>
    );
  };

  return (
    <nav className="h-[700px] flex flex-col border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-700">
      <div className="flex-1">
        {/* Main Links */}
        <div className="flex flex-col gap-1">
          {mainNavItems.map(renderLink)}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 mt-4 border-t border-gray-200 dark:border-dark-400">
        <div className="flex flex-col gap-1">
          {accountNavItems.map(renderLink)}
        </div>
      </div>
    </nav>
  );
};
