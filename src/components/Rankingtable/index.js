import React, { useState } from 'react';

const RankingTable = ({players, onRoundSubmit, onDeletePlayer, onEditPlayer}) => {
  // State to keep track of which player's name is being edited
  const [editingPlayer, setEditingPlayer] = useState(null);

  return (
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
          <tr key={player.name}>
            {/* If a player's name is being edited, render the dropdown menu */}
            {editingPlayer === player.name ? (
              <td colSpan={2}>
                <form onSubmit={event => onEditPlayer(event, player)}>
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" name="name" defaultValue={player.name} />
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
              <form onSubmit={event => onRoundSubmit(event, player)}>
                <label htmlFor="bagTag">Bag Tag:</label>
                <input type="number" id="bagTag" name="bagTag" />
                <button type="submit">Submit Round</button>
              </form>
              <button onClick={() => onDeletePlayer(player)}>Delete</button>
              {/* Toggle the editing player state when the edit button is clicked */}
              <button onClick={() => setEditingPlayer(player.name)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RankingTable;




