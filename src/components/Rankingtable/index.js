import React, { useState,formRef} from 'react';


const RankingTable = ({players, onRoundSubmit, onDeletePlayer, onAddPlayer}) => {

  
  // State to keep track of which player's name is being edited
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');


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
  const filteredTag = players.filter(tag => playerTagMatches(tag, searchTerm));
  const sortedTags = filteredTag.sort((a, b) => a.bagTag - b.bagTag);
  const tagsToDisplay = searchTerm.length ? sortedTags : players;
  const sortedTagsToDisplay = tagsToDisplay.sort((a, b) => a.bagTag - b.bagTag);
 ////////////////////////////////////////////////////////////////////////////////

  
  
  return (
<div className='main-rankings-div'>
 

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
               

   
    
        
        {sortedTagsToDisplay.map(player => (
          
          <div className='submitTag-main-div' key={player.bagTag}>
            {/* If a player's name is being edited, render the dropdown menu */}
            {editingPlayer === player.bagTag ? (
              <div colSpan={5}>
                <form onSubmit={event => onRoundSubmit(event, player)}>
                <label htmlFor="bagTag">Bag Tag:</label>
                <input type="number" id="bagTag" name="bagTag" />
                <input type="hidden" name="name" value={player.name} />
                <button type="submit">Submit Round</button>
                <button type="button" onClick={() => setEditingPlayer(null)}>Cancel</button>
                <button onClick={() => onDeletePlayer(player)}>Delete</button>
              </form>
              </div>
            ) : (
              <div>
                {player.name}
                {player.bagTag}
              </div>
            )}
            
             
             
              {/* Toggle the editing player state when the edit button is clicked */}
              <button onClick={() => setEditingPlayer(player.bagTag)}>Edit</button>
            
          </div>
        ))}
    


    <form ref={formRef} onSubmit={(event) => onAddPlayer(event, formRef)}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="bagTag">Bag Tag:</label>
        <input type="number" id="bagTag" name="bagTag" />
        <button type="submit">Add Player</button>
      </form>
    </div>
  );
};

export default RankingTable;







