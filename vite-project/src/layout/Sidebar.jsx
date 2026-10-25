import { NavLink } from "react-router";
import {
  LayoutDashboard,
  FileText,
  Building2,
  ChartNoAxesCombined,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Organizations",
    path: "/purchaseOrder/PurchaseRequestForm",
    icon: FileText,
  },
  {
    label: "Membership",
    path: "/purchaseOrder/PurchaseOrders",
    icon: FileText,
  },
  {
    label: "Budget Management",
    path: "/purchaseOrder/DeliveryRequest",
    icon: FileText,
  },
  {
    label: "Income & Expenses",
    path: "/SupplierPage",
    icon: Building2,
  },
  {
    label: "Reports",
    path: "/ReportPage",
    icon: ChartNoAxesCombined,
  },
];

export default function Sidebar() {
  return (
    <aside
      className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-gray-200 bg-white sm:flex"
      aria-label="Sidebar"
    >
      {/* Matches the navbar height */}
      <div className="flex h-20 shrink-0 items-center border-b border-gray-200 px-6">
        <div>
          <h1 className="text-lg font-bold tracking-wide text-blue-800">
            QSI WORKSPACE
          </h1>

          <p className="text-xs text-gray-500">
            Procurement Management
          </p>
        </div>
      </div>

      {/* Scrolls independently when needed */}
      <nav
        className="min-h-0 flex-1 overflow-y-auto px-3 py-6"
        aria-label="Main navigation"
      >
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Workspace
        </p>

        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.end ?? false}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-800"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                    }`
                  }
                >
                  <Icon
                    className="h-5 w-5 shrink-0"
                    aria-hidden="true"
                  />

                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Stays at the bottom without fixed positioning */}
      <div className="shrink-0 border-t border-gray-200 bg-gray-50 px-6 py-4">
        <p className="text-sm font-semibold text-gray-800">
          Quantity Solution INC
        </p>

        <p className="mt-1 text-xs text-gray-500">
          Procurement Workspace
        </p>
      </div>
    </aside>
  );
}