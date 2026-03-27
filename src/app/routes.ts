import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { TrekListing } from "./components/TrekListing";
import { TrekDetail } from "./components/TrekDetail";
import { GuideListingDynamic } from "./components/GuideListingDynamic";
import { GuideProfileDynamic } from "./components/GuideProfileDynamic";
import { GuideRegistration } from "./components/GuideRegistration";
import { GuideDashboardDynamic } from "./components/GuideDashboardDynamic";
import { Auth } from "./components/Auth";
import { Help } from "./components/Help";
import { ActivitiesListing } from "./components/ActivitiesListing";
import { GuideListing } from "./components/GuideListing";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "treks", Component: TrekListing },
      { path: "treks/:trekId", Component: TrekDetail },
      { path: "treks/:trekId/guides", Component: GuideListingDynamic },
      { path: "guides/:guideId", Component: GuideProfileDynamic },
      { path: "guide/register", Component: GuideRegistration },
      { path: "guide/dashboard", Component: GuideDashboardDynamic },
      { path: "guide/list", Component: GuideListing },
      { path: "activities", Component: ActivitiesListing },
      { path: "auth", Component: Auth },
      { path: "help", Component: Help },
      { path: "*", Component: NotFound },
    ],
  },
]);
