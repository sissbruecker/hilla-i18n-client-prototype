import { AppLayout } from "@hilla/react-components/AppLayout.js";
import { DrawerToggle } from "@hilla/react-components/DrawerToggle.js";
import Placeholder from "Frontend/components/Placeholder.js";
import { useRouteMetadata } from "Frontend/util/routing.js";
import { Suspense, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LanguageSelect } from "Frontend/components/LanguageSelect";
import { translate } from "Frontend/i18n";

const navLinkClasses = ({ isActive }: any) => {
  return `block rounded-m p-s ${isActive ? "bg-primary-10 text-primary" : "text-body"}`;
};

export default function MainLayout() {
  const routeName = useRouteMetadata()?.name ?? "home";
  const currentTitle = translate(`routes.${routeName}`);

  useEffect(() => {
    document.title = currentTitle;
  }, [currentTitle]);

  return (
    <AppLayout primarySection="drawer">
      <div slot="drawer" className="flex flex-col justify-between h-full p-m">
        <header className="flex flex-col gap-m">
          <h1 className="text-l m-0">{translate("app.name")}</h1>
          <nav>
            <NavLink className={navLinkClasses} to="/">
              {translate("routes.home")}
            </NavLink>
            <NavLink className={navLinkClasses} to="/about">
              {translate("routes.about")}
            </NavLink>
            <NavLink className={navLinkClasses} to="/form">
              {translate("routes.form")}
            </NavLink>
          </nav>
        </header>
      </div>

      <div slot="navbar" className="flex items-center w-full mr-l">
        <DrawerToggle aria-label="Menu toggle"></DrawerToggle>
        <h2 slot="navbar" className="text-l m-0 flex-grow">
          {currentTitle}
        </h2>
        <LanguageSelect />
      </div>

      <Suspense fallback={<Placeholder />}>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
