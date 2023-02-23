import React, { useState, formRef } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Paper } from "@mui/material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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

      {/*  */}
      {/*Map through all tagged players in rankings table/ add player button */}
      <div className="activity-box" style={{ display: display }}>
        {token ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <form
              ref={formRef}
              onSubmit={(event) => onAddPlayer(event, formRef)}
            >
              <label htmlFor="name">Name:</label>
             
              <input type="text" id="name" name="name" required  />
              <label htmlFor="bagTag">Bag Tag:</label>
              <input type="number" id="bagTag" name="bagTag" min="1" required  />
              <Button style={{color:"black"}} type="submit">< LibraryAddIcon/></Button>
            </form>
          </div>
        ) : null}
      </div>
      {/* Search fucntion, search all players on the ranking table */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="containerSearchProducts">
          <form
            className="searchForm"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="returnedFormContent">
              <h3 className="searchHeader">Search For Player</h3>
              <input
                id="outlined-basic"
                placeholder="(i.e. name,  tag number)"
                className="userSearchInput"
                type="text"
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </form>
        </div>
      </div>

      {/*//////////////////////////////////////////////////////////////// */}
      {sortedTagsToDisplay.map((player) => (
        <div className="submitTag-main-div" key={player.bagTag}>
          {token ? (
            <div style={{ margin: "20px" }}>
              <Paper>
                <form onSubmit={(event) =>  onRoundSubmit(event, player)}>
                  <div style={{ margin: "5px" }}>
                    Name: {player.name}
                    <br></br>
                    Tag: {player.bagTag}
                  </div>
                  {editingPlayer === player.name ? (
                    <div>
                       Tag#:
                      <input type="number" id="bagTag" name="bagTag"  min="1" required />
                      <input type="hidden" name="name" value={player.name} required />
                      <Button style={{color:"black"}} type="submit"><AddCircleIcon/></Button>

                      <Button style={{color:"black"}} onClick={() => onDeletePlayer(player)}>
                        <DeleteForeverIcon/>
                      </Button>
                    </div>
                  ) : null}
                </form>
                <Button
       style={{
       
        color: "black",
       
        
      }}
                  onClick={(event) =>
                    setEditingPlayer(
                      editingPlayer === player.name ? null : player.name
                    )
                  }
                >
                <EditIcon/>
                </Button>
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
