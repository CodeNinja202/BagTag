import React, { useState, formRef } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

const RankingTable = ({
  players,
  onRoundSubmit,
  onDeletePlayer,
  onAddPlayer,
  token,
  users,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPlayer, setEditingPlayer] = useState(null);
  const { isAdmin, id } = users;
  const [display, setDisplay] = useState("none");

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
      {token ? (
        <Button
          style={{
            marginBottom: "10%",
            color: "white",
            background: "black",
            width: "100%",
          }}
          onClick={(event) => {
            event.preventDefault();
            if (display === "none") {
              setDisplay("block");
            } else {
              setDisplay("none");
            }
          }}
        >
          Add New Player
        </Button>
      ) : null}
      {/*Map through all tagged players in rankings table  */}
      <div className="activity-box" style={{ display: display }}>
        {token ? (
          <div>
            <form
              ref={formRef}
              onSubmit={(event) => onAddPlayer(event, formRef)}
            >
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" />
              <label htmlFor="bagTag">Bag Tag:</label>
              <input type="number" id="bagTag" name="bagTag" />
              <Button type="submit">Add Player</Button>
            </form>
          </div>
        ) : null}
      </div>

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
      {sortedTagsToDisplay.map((player) => (
        <div className="submitTag-main-div" key={player.bagTag}>
          {token ? (
            <div style={{ margin: "20px" }}>
              <Paper>
                <form onSubmit={(event) => onRoundSubmit(event, player)}>
                  <div style={{ margin: "5px" }}>
                    
                      Name: {player.name}
                      <br></br>
                      Tag: {player.bagTag}
                    
                  </div>
                  {editingPlayer === player.name ? (
                    <div>
                      <input type="number" id="bagTag" name="bagTag" />
                      <input type="hidden" name="name" value={player.name} />
                      <button type="submit">Submit Round</button>

                      <button onClick={() => onDeletePlayer(player)}>
                        Delete
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingPlayer(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : null}
                </form>
                <button onClick={(event) => setEditingPlayer(player.name)}>
                  Edit
                </button>
              </Paper>
            </div>
          ) : (
            <div style={{ margin: "5px" }}>
              <Paper style={{ height: "55px" }}>
                Name: {player.name}
                <br></br>
                Tag: {player.bagTag}
              </Paper>
            </div>
          )}
        </div>
      ))}
      {/*//////////////////////////////////////////////////  */}
    </div>
  );
};

export default RankingTable;
