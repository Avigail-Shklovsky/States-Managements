import { List, ListItemButton, ListItemText } from "@mui/material";
import React from "react";

interface PageConfig {
  label: string;
  component: React.ComponentType;
}

interface SidebarProps {
  currentPage: string;
  onMenuClick: (page: string) => void;
  pages: { [key: string]: PageConfig };
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onMenuClick, pages }) => {
  return (
    <List>
      {Object.entries(pages).map(([key, { label }]) => (
        <ListItemButton
          key={key}
          selected={currentPage === key}
          onClick={() => onMenuClick(key)}
          sx={{ backgroundColor: "white", border: "none" }}
        >
          <ListItemText primary={label} />
        </ListItemButton>
      ))}
      <ListItemButton
        key="exit"
        onClick={() => onMenuClick("exit")}
        sx={{ backgroundColor: "white", border: "none" }}
      >
        <ListItemText primary="Exit Dashboard" />
      </ListItemButton>
    </List>
  );
};

export default Sidebar;
