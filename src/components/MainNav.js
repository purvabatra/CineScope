import React, { useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import TvIcon from "@mui/icons-material/Tv";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { useNavigate } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) navigate("/");
    else if (value === 1) navigate("/movies");
    else if (value === 2) navigate("/series");
    else if (value === 3) navigate("/search");
  }, [value, navigate]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        backgroundColor: "#2d313a",
        zIndex: 99999,
        boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{
          backgroundColor: "#2d313a",
          height: "70px", // Matches your CSS padding-bottom
          "& .MuiBottomNavigationAction-root": {
            color: "white",
            "&.Mui-selected": {
              color: "#ff6b35", // Orange color for selected state
            },
            "&:hover": {
              color: "#ff8c69", // Lighter orange on hover
            },
          },
        }}
      >
        <BottomNavigationAction
          label="Trending"
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          label="Movies"
          icon={<MovieIcon />}
        />
        <BottomNavigationAction
          label="TV Series"
          icon={<TvIcon />}
        />
        <BottomNavigationAction
          label="Search"
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </div>
  );
}