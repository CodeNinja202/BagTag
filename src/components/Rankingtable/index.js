import React, { useState } from 'react';

const RankingTable = ({players, onRoundSubmit, onDeletePlayer, onEditPlayer}) => {
  // State to keep track of which player's name is being edited
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');


  const playerTagMatches = (tag, searchTerm) => {
    if (!tag || !tag.name || !tag.bagTag) return; // add this line to handle undefined tag
  
    const { name, bagTag } = tag;  
    const searchTerms = searchTerm.toLowerCase().split(" ");
  
    if (
      searchTerms.every((term) => name.toLowerCase().includes(term)) ||
      searchTerms.every((term) => bagTag.toLowerCase().includes(term))
    ) {
      return tag;
    }
  };
  
const filteredTag = players.filter(tag => playerTagMatches(tag, searchTerm));
const tagsToDisplay = searchTerm.length ? filteredTag : players;

  return (
<div className='main-rankings-div'>

<>
                    <div className='containerSearchProducts'>
                        <form
                            className='searchForm'
                            onSubmit={(event) => {
                                event.preventDefault();
                            }}>
                            <div className='returnedFormContent'>
                                <h3 className='searchHeader'>Search For Player Here</h3>
                                <input
                                    id="outlined-basic"
                                    placeholder="(i.e. title,  description)"
                                    className='userSearchInput'
                                    type='text'
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                </>

    <table>
      <thead>
        <tr>
          <th>Player</th>
          <th>Bag Tag</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
  {tagsToDisplay.map(player => (
    <tr key={player.name}>
      {/* If a player's name is being edited, render the dropdown menu */}
      {editingPlayer === player.bagTag ? (
      <td colSpan={2}>
      <form onSubmit={event => onEditPlayer(event, player)}>
        <label htmlFor="bagTag">Bag Tag:</label>
        <input type="number" id="bagTag" name="bagTag" defaultValue={player.bagTag}  />
        <button type="submit">Save</button>
        <button type="button" onClick={() => setEditingPlayer(null)}>Cancel</button>
      </form>
    </td>
      ) : (
        <>
         
          <td>{player.name}</td>
          <td>{player.bagTag}</td>
        </>
      )}
      <td>
      
        <button onClick={() => onDeletePlayer(player)}>Delete</button>
        {/* Toggle the editing player state when the edit button is clicked */}
        <button onClick={() => setEditingPlayer(player.bagTag)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default RankingTable;




