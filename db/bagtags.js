// const { client } = require('./client');



// async function getAllBagTag() {
//   try {
//     console.log('DB Bag ADAPTER')
//     const { rows } = await client.query(`
//     SELECT * FROM products;
    
//     `);
// // ORDER BY id ASC;
//     return rows;

//   } catch (error) {
//     throw error;
//   }
// }

// async function getProductById(id) {
//   try {
//     const { rows: [product] } = await client.query(`
//       SELECT * FROM products
//       WHERE id = ${id}
//     `);

//     return product;

//   } catch (error) {
//     throw error;
//   }
// }


// async function createProduct({title, description}) {
//   try {
//     const { rows: [product]} = await client.query(`
//       INSERT INTO products (title, description)
//       VALUES ($1, $2)
//       RETURNING *;
//     `, [title, description])
    
//     return product;
//   }
//   catch(ex) {
//     console.log('error in creatProduct adapter function',ex)
//   }
// }

// async function updateProduct( id, fields = {}) {

//   try {
//     const setString = Object.keys(fields)
//       .map((key, index) => `"${key}"=$${index + 1}`)
//       .join(", ");

//     console.log("setstring: ", setString)

//     if (setString.length > 0) {
//       await client.query(
//         `
//          UPDATE products
//          SET ${setString}
//          WHERE id=${id}
//          RETURNING *;
//        `,
//         Object.values(fields)
//       );
      
//       return await getProductById(id);

//     }
//   } catch (error) {
//     throw error;
//   }
// }

// async function deleteProduct(id) {

//   try {
//     const { 
//       rows: [product] 
//     } = await client.query(`
//       DELETE FROM products 
//       WHERE id = ${id}
//       RETURNING *;
//     `);

//     return product;

//   } catch (error) {
//     throw error;
//   }
// }

// module.exports = {
//   deleteProduct,
//   updateProduct,
//   getProductById,
//   createProduct,
//   getAllProducts
// }