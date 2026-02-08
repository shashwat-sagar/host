import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Button, Drawer } from "antd";
import {
  FiHome,
  FiUser,

  FiMenu,
  FiX,

} from "react-icons/fi";
import { useThemeStore } from "../store/useThemeStore";
import { themeAccentGradients } from "../theme/themeConfig";
import {
  FaUserInjured,
  FaUserPlus,
  FaHospital,
  FaBed,
  FaBuilding,
  FaStethoscope,
  FaMoneyCheckAlt,
  FaCreditCard,
  FaShieldAlt,
  FaHandshake,
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu";
import { FiBriefcase } from "react-icons/fi";

const { Sider } = Layout;

interface MainSidebarProps {
  mobile?: boolean;
  open?: boolean;
  onClose?: () => void;
}

const MainSidebar = ({ mobile, open, onClose }: MainSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { colorPreset } = useThemeStore();
  const accentGradient = themeAccentGradients[colorPreset];

  const handleMenuClick = ({ key }: { key: string }) => {
    const item =
      items.find((item) => item.key === key) ||
      items.flatMap((i) => i.children || []).find((child) => child.key === key);
    const path = item?.path;
    if (path) {
      navigate(path);
      if (mobile && onClose) {
        onClose();
      }
    }
  };

  const items = [
    { key: "1", icon: <FiHome />, label: "Dashboard", path: "/auth/dashboard" },
    { key: "12", icon: <FaUserDoctor />, label: "Doctor Dashboard", path: "/auth/doctor-dashboard" },

    {
      key: "4",
      icon: <FaUserInjured />,
      label: "OPD",
      children: [
        {
          key: "41",
          label: "Patient Registration",
          path: "/auth/patientregister",
          icon: <FaUserPlus />,
        },
        {
          key: "42",
          label: "Basic Patient Registration",
          path: "/auth/patientregister-basic",
          icon: <FaUserPlus />,
        },
        {
          key: "43",
          label: "Patient List",
          path: "/auth/patientlist",
          icon: <LuClipboardList />,
        },
      ],
    },
    {
      key: "3",
      icon: <FaUserDoctor />,
      label: "Doctor Master",
      children: [
        {
          key: "31",
          label: "Doctor Registration",
          path: "/auth/doctorregister",
          icon: <FaUserPlus />,
        },
        {
          key: "32",
          label: "Doctor List",
          path: "/auth/doctorlist",
          icon: <LuClipboardList />,
        },

      ],
    },
    {
      key: "5",
      icon: <FaHospital />,
      label: "Hospital Master",
      children: [
        {
          key: "51",
          label: "Hospital Profile",
          path: "/auth/hospital-profile",
          icon: <FiUser />,
        },
        {
          key: "52",
          label: "Bed Composition",
          path: "/auth/bed-composition",
          icon: <FaBed />,
        },
        {
          key: "53",
          label: "Infrastructure",
          path: "/auth/hospital-infrastructure",
          icon: <FaBuilding />,
        },
        {
          key: "54",
          label: "Specializations",
          path: "/auth/hospital-specialization",
          icon: <FaStethoscope />,
        },
        {
          key: "55",
          label: "Financial Info",
          path: "/auth/financial-information",
          icon: <FaMoneyCheckAlt />,
        },
        {
          key: "56",
          label: "Cashless Services",
          path: "/auth/cashless-service",
          icon: <FaCreditCard />,
        },

      ],
    },
    {
      key: "57",
      label: "Empanelment",
      icon: <FiBriefcase />,
      children: [
        {
          key: "571",
          label: "Corporate",
          path: "/auth/empanelled-corporate",
          icon: <FaHandshake />,
        },
        {
          key: "572",
          label: "Insurance",
          path: "/auth/empanelled-insurance",
          icon: <FaShieldAlt />,
        },
        {
          key: "573",
          label: "TPA",
          path: "/auth/empanelled-tpa",
          icon: <FiBriefcase />,
        },
      ],
    },
  ];

  const SidebarContent = (
    <>
      {/* Logo / Brand Area */}
      <div
        className={`h-24 flex items-center ${collapsed && !mobile ? "justify-center" : "px-8"} transition-all duration-300`}
      >
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${accentGradient.from} ${accentGradient.to} flex items-center justify-center text-white shadow-md shadow-${colorPreset}-200 shrink-0`}
        >
          <span className="font-bold text-lg">P</span>
        </div>
        {(!collapsed || mobile) && (
          <div className="ml-3 flex flex-col">
            <span className="text-slate-800 font-bold text-xl tracking-tight">
              HealthCare Portal
            </span>
            <span className="text-slate-400 text-xs font-medium">Subtitle</span>
          </div>
        )}
      </div>

      {/* Toggle Button (Desktop Only) */}
      {!mobile && (
        <div className="absolute -right-3 top-24 z-50">
          <Button
            type="text"
            shape="circle"
            icon={collapsed ? <FiMenu /> : <FiX />}
            onClick={() => setCollapsed(!collapsed)}
            className={`!bg-white !text-slate-600 !border !border-slate-100 !shadow-md hover:!text-${colorPreset}-600 !w-8 !h-8 !flex !items-center !justify-center transition-all`}
          />
        </div>
      )}

      {/* Menu */}
      <Menu
        mode="inline"
        selectedKeys={
          location.pathname
            ? [
              items.find((item) => item.path === location.pathname)?.key ||
              items
                .flatMap((i) => i.children || [])
                .find((c) => c.path === location.pathname)?.key ||
              "",
            ]
            : []
        }
        className="!bg-transparent !border-none px-3 mt-2"
        items={items.map((item) => ({
          ...item,
          className: `!my-1 tracking-wide !rounded-xl text-slate-500 !font-medium hover:!text-${colorPreset}-600 hover:!bg-${colorPreset}-50 !transition-all !duration-200`,
        }))}
        onClick={handleMenuClick}
      />

      {/* User Profile Summary at bottom */}
      <div
        className={`absolute bottom-8 left-0 w-full px-4 ${collapsed && !mobile ? "flex justify-center" : ""}`}
      >
        <div
          className={`flex items-center p-3 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-100 ${collapsed && !mobile ? "justify-center w-12 h-12 p-0" : "gap-3"}`}
        >
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${accentGradient.from} ${accentGradient.to} flex items-center justify-center text-white shrink-0 shadow-sm`}
          >
            <FiUser />
          </div>
          {(!collapsed || mobile) && (
            <div className="overflow-hidden">
              <p className="text-slate-800 text-sm font-semibold truncate">
                Test User
              </p>
              <p className="text-slate-400 text-xs truncate">Administrator</p>
            </div>
          )}
        </div>
      </div>

      {/* CSS Override for selected menu item to use gradient */}
      <style>{`
            .ant-menu-item{
                color: #656565ff !important;
            }
                .ant-menu-item-selected {
                    background: linear-gradient(135deg, ${accentGradient.fromColor} 0%, ${accentGradient.toColor} 100%) !important;
                    color: white !important;
                    box-shadow: 0 4px 12px ${accentGradient.fromColor}50;
                }
                .ant-menu-item-selected:hover {
                    color: white !important;
                    background: linear-gradient(135deg, ${accentGradient.fromColor} 0%, ${accentGradient.toColor} 100%) !important;
                }
            `}</style>
    </>
  );

  if (mobile) {
    return (
      <Drawer
        placement="left"
        onClose={onClose}
        open={open}
        width={280}
        styles={{ body: { padding: 0 } }}
        className="!bg-white"
        closeIcon={null}
      >
        <div className="h-full relative bg-white">
          {/* Close button for mobile drawer */}
          <div className="absolute top-4 right-4 z-50">
            <Button
              type="text"
              icon={<FiX className="text-lg" />}
              onClick={onClose}
              className="!text-slate-500"
            />
          </div>
          {SidebarContent}
        </div>
      </Drawer>
    );
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={260}
      className=" !bg-white !m-4 !rounded-3xl !shadow-lg !border-none hidden md:block"
      style={{
        height: "calc(100vh - 32px)",
        position: "relative",
      }}
    >
      {SidebarContent}
    </Sider>
  );
};

export default MainSidebar;
