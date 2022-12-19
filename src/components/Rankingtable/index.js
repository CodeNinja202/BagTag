import React from 'react';

const RankingTable = ({players, onRoundSubmit, onDeletePlayer, onEditPlayer}) => {
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
            <td>{player.name}</td>
            <td>{player.bagTag}</td>
            <td>
              <form onSubmit={event => onRoundSubmit(event, player)}>
                <label htmlFor="bagTag">Bag Tag:</label>
                <input type="number" id="bagTag" name="bagTag" />
                <button type="submit">Submit Round</button>
              </form>
              {/* Add delete and edit buttons */}
              <button onClick={() => onDeletePlayer(player)}>Delete</button>
              <button onClick={() => onEditPlayer(player)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RankingTable;





