
 import React, { useState } from 'react';
const EditPlayerForm = ({ player, onEditPlayer }) => {
    const [bagTag, setBagTag] = useState(player.bagTag);
  
    const handleSubmit = event => {
      onEditPlayer(event, player);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" name="bagTag" value={bagTag} onChange={e => setBagTag(e.target.value)} />
        <button type="submit">Save</button>
      </form>
    );
  };
  

 export default EditPlayerForm;