import React, { useState } from 'react';

const RankingTable = ({players, onRoundSubmit, onDeletePlayer,}) => {
  // State to keep track of which player's name is being edited
  const [editingPlayer, setEditingPlayer] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
console.log(players)

//   const playerTagMatches = (tag, searchTerm) => {
//     const { name, bagTag } = tag;  
//     const searchTerms = searchTerm.toLowerCase().split(" ");
  
//     if (
//       searchTerms.every((term) => name.toLowerCase().includes(term)) ||
//       searchTerms.every((term) => bagTag.toLowerCase().includes(term))
//     ) {
//       return tag;
//     }
//   };
// const filteredTag = players.filter(tag => playerTagMatches(tag, searchTerm));
// const tagsToDisplay = searchTerm.length ? filteredTag : players;

  return (
<div className='main-rankings-div'>

{/* <>
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
                </> */}

    <table>
      <thead>
        <tr>
          <th>Player</th>
          <th>Bag Tag</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        
        {players.map(player => (
          
          <tr key={player.bagTag}>
            {/* If a player's name is being edited, render the dropdown menu */}
            {editingPlayer === player.bagTag ? (
              <td colSpan={2}>
                {/* <form onSubmit={event => onEditPlayer(event, player)}>
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" name="name" defaultValue={player.name} />
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingPlayer(null)}>Cancel</button>
                </form> */}
              </td>
            ) : (
              <>
                <td>{player.name}</td>
                <td>{player.bagTag}</td>
              </>
            )}
            <td>
              <form onSubmit={event => onRoundSubmit(event, player)}>
                <label htmlFor="bagTag">Bag Tag:</label>
                <input type="number" id="bagTag" name="bagTag" />
                <input type="hidden" name="name" value={player.name} />
                <button type="submit">Submit Round</button>
              </form>
              <button onClick={() => onDeletePlayer(player)}>Delete</button>
              {/* Toggle the editing player state when the edit button is clicked */}
              {/* <button onClick={() => setEditingPlayer(player.name)}>Edit</button> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default RankingTable;







