import {
  FiGrid,
  FiUsers,
  FiUser,
  FiCompass,
  FiSettings,
  FiSlack,
  FiGlobe,
  FiTarget,
} from "react-icons/fi";

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: "/dashboard", // the url
    icon: FiGrid, // icon
    name: "Dashboard", // name that appear in Sidebar
  },

  // {
  //   icon: FiSlack,
  //   name: "Catalog",
  //   routes: [
  //     {
  //       path: "/products",
  //       name: "Games",
  //     },
  //     {
  //       path: "/categories",
  //       name: "Categories",
  //     },
  //     {
  //       path: "/attributes",
  //       name: "Attributes",
  //     },
  //     {
  //       path: "/coupons",
  //       name: "Coupons",
  //     },
  //   ],
  // },

  {
    path: "/users",
    icon: FiUsers,
    name: "Users",
  },
  {
    icon: FiUser,
    name: "Game",
    routes: [
      {
        path: "/addgames",
        name: "Add Games",
      },
      {
        path: "/gameslist",
        name: "Game List",
      },
    ],
  },
  {
    path: "/orders",
    icon: FiCompass,
    name: "Report",
  },

  // {
  //   path: "/users",
  //   icon: FiUser,
  //   name: "Users",
  // },

  {
    path: "/settings?settingTab=common-settings",
    icon: FiSettings,
    name: "Settings",
  },
  {
    icon: FiGlobe,
    name: "International",
    routes: [
      {
        path: "/languages",
        name: "Languages",
      },
      {
        path: "/currencies",
        name: "Currencies",
      },
    ],
  },
  // {
  //   icon: FiTarget,
  //   name: "OnlineStore",
  //   routes: [
  //     {
  //       name: "ViewStore",
  //       path: "http://localhost:3000",
  //       outside: "store",
  //     },

  //     {
  //       path: "/store/customization",
  //       name: "StoreCustomization",
  //     },
  //     {
  //       path: "/store/store-settings",
  //       name: "StoreSettings",
  //     },
  //   ],
  // },

  // {
  //   icon: FiSlack,
  //   name: "Pages",
  //   routes: [
  //     // submenu

  //     {
  //       path: "/404",
  //       name: "404",
  //     },
  //     {
  //       path: "/coming-soon",
  //       name: "Coming Soon",
  //     },
  //   ],
  // },
];

export default sidebar;
