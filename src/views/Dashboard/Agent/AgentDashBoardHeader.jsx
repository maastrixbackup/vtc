import React from "react";
import { APIPath } from "../../../CommonMethods/Fetch";
import { NavLink, NavNavLink, useLocation } from "react-router-dom";

function AgentDashBoardHeader({ ShowMenu, HideMenu, imagesetId }) {
  const { pathname } = useLocation();
  return (
    <div class="vtc_agent_menu_top">
      <ul>
        <li>
          <NavLink activeClassName="active" to={APIPath() + "agent-dashboard"}>
            My Cafe
          </NavLink>
        </li>
        <li>
          <NavLink
            isActive={() =>
              [
                `/agent-edit-tour/${imagesetId}`,
                "/agent-tour-list",
              ].includes(pathname)
            }
            activeClassName="active"
            to={APIPath() + "agent-tour-list"}
          >
            Tours
          </NavLink>
        </li>
        <li>
          <NavLink
            isActive={() =>
              [
                `/edit-flyer-theme/${imagesetId}`,
                `/agent-edit-flyer/${imagesetId}`,
                "/agent-flyer",
              ].includes(pathname)
            }
            activeClassName="active"
            to={APIPath() + "agent-flyer"}
          >
            Flyers
          </NavLink>
        </li>
        <li>
          <NavLink
            isActive={() =>
              [
                `/agent-edit-video/${imagesetId}`,
                "/agent-video-list",
              ].includes(pathname)
            }
            activeClassName="active"
            to={APIPath() + "agent-video-list"}
          >
            Videos
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to={APIPath() + "agent-setting"}>
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            to={APIPath() + "agent-preferred-vendor"}
          >
            Preferred Vendors
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            to={{
              pathname:
                "https://www.xpressdocs.com/next/index.php?uuid=458143677bda0010f37b603828f3b783",
            }}
            target="_blank"
          >
            Xpressdocs
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to={APIPath() + "agent-support"}>
            Support
          </NavLink>
        </li>
      </ul>
      <div class="gee_mobile">
        <button onClick={() => ShowMenu()} class="gee_hamburger">
          &#9776;
        </button>
        <button onClick={() => HideMenu()} class="gee_cross">
          &#735;
        </button>
      </div>
    </div>
  );
}

export default AgentDashBoardHeader;
