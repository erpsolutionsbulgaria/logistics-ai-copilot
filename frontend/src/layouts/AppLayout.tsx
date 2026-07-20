import { Link, Outlet } from "react-router";

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            to="/shipments"
            className="text-lg font-semibold tracking-tight"
          >
            Logistics AI Copilot
          </Link>

          <nav>
            <Link
              to="/shipments"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Shipments
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;