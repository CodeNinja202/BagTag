const express = require('express');//Requires express
const tagsRouter = express.Router();//Router

//requires all fucntions from Database functions
const {
    createNewStandings,
    getBagTagPlayerById,
    updateBagRanking,
    getAllBagTagRankings,
    deleteTag
} = require('../db/bagtags');
///////////////////////////////////////////////////


//GET ALL tags/////////////////////////////
tagsRouter.get("/", async (req, res, next) => {
  
  try {
    const alltags = await  getAllBagTagRankings();

    res.send(alltags);
  }catch(error) {
    console.log(error);
      next(error);
  }
});
///////////////////////////////////////////////////

//GET gets a player BY ID
tagsRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const tag = await getBagTagPlayerById(id);
    res.send(tag);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
///////////////////////////////////////////////////


//CREATE creates a new bag tag player
tagsRouter.post('/',  async (req, res, next) => {
  const { name, bagTag } = req.body

  try {
    const product = await createNewStandings({
      name,
      bagTag,
     
    });
    res.send(product)
  } catch (error) {
    console.log(error);
    next(error);
  }
});
///////////////////////////////////////////////////

//UDPATE Bag tag number
tagsRouter.patch('/:tagID',  async (req, res, next) => {
  const { tagID } = req.params 
  const {  bagTag } = req.body

  try {
    const tag = await getBagTagPlayerById(tagID);

    if (tag) {
      const updatedTagRanking = await updateBagRanking(tagID, {
        id: tagID,
        bagTag: bagTag
      });

      res.send(updatedTagRanking)
    } else {
      res.send({
        error: 'RankingUpdateError',
        name: 'Error updating tag ranking ',
        message: `This tag was unable to be udpated`,
      })
    }
  } catch (error) {
    console.log('api error---', error);
    next(error);
  }
});
////////////////////////////////////////////////////////////////

//DELETE playerfrom the database
tagsRouter.delete('/:tagID', async (req, res, next) => {
  const { tagID } = req.params;

  try {
    const tag = await getBagTagPlayerById(tagID);

    if (tag) {
      const deleteTags = await deleteTag(tagID)
      res.send(deleteTags)
    } else {
      res.status(403);
      next({
        name: "UnauthorizedUserError",
        message: `Cannot delete tag`,
        error: " Error can't edit ",
      });
    }
  }
  catch (error) {
    console.log(error);
    next(error);
  }

})
///////////////////////////////////////////////

module.exports = tagsRouter;