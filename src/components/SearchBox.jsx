import React, { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export default function SearchBox(props) {
  const { selectPosition, setSelectPosition, defaultValue } = props;
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setSearchText(defaultValue);
    }
  }, [defaultValue]);

  const [listPlace, setListPlace] = useState([]);

  const handleSearch = () => {
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result));
        setListPlace(JSON.parse(result));
      })
      .catch((err) => console.log("err: ", err));
  };

  const handleItemClick = (item) => {
    setSelectPosition(item);
    setSearchText(item.display_name);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <OutlinedInput
            style={{ width: "100%" }}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>
      <div>
        <List component="nav" aria-label="main mailbox folders">
          {listPlace.map((item) => (
            <div key={item?.place_id}>
              <ListItem button onClick={() => handleItemClick(item)}>
                <ListItemIcon>
                  <img src="./placeholder.png" alt="Placeholder" style={{ width: 38, height: 38 }} />
                </ListItemIcon>
                <ListItemText primary={item?.display_name} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    </div>
  );
}
