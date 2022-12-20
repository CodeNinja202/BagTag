// import React from "react";

// const EditPlayerForm = ({ player, onEditPlayer, setEditingPlayer }) => {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onEditPlayer(event, player);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="name">Name:</label>
//       <input
//         type="text"
//         id="name"
//         name="name"
//         defaultValue={player.name}
//       />
//       <button type="submit">Save</button>
//       <button type="button" onClick={() => setEditingPlayer(null)}>
//         Cancel
//       </button>
//     </form>
//   );
// };

// export default EditPlayerForm;