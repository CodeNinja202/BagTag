import React, { useState, formRef } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

const RankingTable = ({
  players,
  onRoundSubmit,
  onDeletePlayer,
  onAddPlayer,
  user,
  token,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  //Search term function, searchs all players on the leaderboard
  const playerTagMatches = (tag, searchTerm) => {
    const { name, bagTag } = tag;
    const searchTerms = searchTerm.toLowerCase().split(" ");

    if (
      searchTerms.every((term) => name.toLowerCase().includes(term)) ||
      searchTerms.every((term) => bagTag.toLowerCase().includes(term))
    ) {
      return tag;
    }
  };

  //Filters all players and bag tags, returning all tags in accending order
  const filteredTag = players.filter((tag) =>
    playerTagMatches(tag, searchTerm)
  );
  const sortedTags = filteredTag.sort((a, b) => a.bagTag - b.bagTag);
  const tagsToDisplay = searchTerm.length ? sortedTags : players;
  const sortedTagsToDisplay = tagsToDisplay.sort((a, b) => a.bagTag - b.bagTag);
  ////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="main-rankings-div">
      <div className="containerSearchProducts">
        <form
          className="searchForm"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className="returnedFormContent">
            <h3 className="searchHeader">Search For Player Here</h3>
            <input
              id="outlined-basic"
              placeholder="(i.e. title,  description)"
              className="userSearchInput"
              type="text"
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </form>
      </div>
      {/*//////////////////////////////////////////////////////////////// */}

      {/*Map through all tagged players in rankings table  */}
      {sortedTagsToDisplay.map((player) => (
        <div className="submitTag-main-div" key={player.bagTag}>
          {token ? (
            <div style={{margin:"20px"}}>
              <form onSubmit={(event) => onRoundSubmit(event, player)}>
                <Paper>
                {player.name}
                {player.bagTag}

                <input type="number" id="bagTag" name="bagTag" />
                <input type="hidden" name="name" value={player.name} />
                <button type="submit">Submit Round</button>
                <button onClick={() => onDeletePlayer(player)}>Delete</button>
                </Paper>
              </form>
            </div>
          ) : (
             <div style={{margin:"20px"}}>
              <Paper>
              {player.name}
              {player.bagTag}
              </Paper>
            </div>
          )}
        </div>
      ))}
      {/*//////////////////////////////////////////////////  */}

      {!token ? (
        <div>
          <Link to="/login" className="navbarLink">
            Login
          </Link>
        </div>
      ) : (
        <div>
          <h1>Token</h1>
        </div>
      )}

      {token ? (
        <div>
          <form ref={formRef} onSubmit={(event) => onAddPlayer(event, formRef)}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
            <label htmlFor="bagTag">Bag Tag:</label>
            <input type="number" id="bagTag" name="bagTag" />
            <Button type="submit">Add Player</Button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default RankingTable;
