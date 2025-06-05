import express from 'express';
import cors from 'cors';
import databaseCheck from './db.js';
import 'dotenv/config';

const app = express();
const port =  5003;

app.use(express.json());
app.use(cors());


app.get('/', (req,res)=>{
  res.send("hello world")
})
app.get('/products', async (req, res) => {
  try {
    const result = await databaseCheck.query(`SELECT * FROM products`);
    res.status(200).send({message: "Product Found" , product_list: result.rows})
    console.log("result", result.rows)
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});
app.post('/product', async(req , res)=>{
  let reqBody = req.body
  if(!reqBody.name || !reqBody.price || !reqBody.description){
    res.status(400).send({message: "REquired Perameter is Missing"})
    return
  }
  try {
    let postQuery =`INSERT INTO products(name , price ,description) VALUES ($1, $2 , $3 )`;
    let postValues = [reqBody.name , reqBody.price, reqBody.description]
     await databaseCheck.query(postQuery, postValues)
      res.status(201).send({message : "Product is Added"})
  } catch (error) {
    res.status(500).send({message: "Internal server Error"})
  }
})
app.put('/product/:id', async(req, res)=>{
  let reqId = req.params.id;
  let {name , price , description} = req.body
  if(!name || !price || !description || !reqId){
    res.status(400).send({message : "Required Perameter is Missing"});
    return;
  }
  try {
    const putQuery = `UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4`;
    const putValue = [name, price, description, reqId];

     await databaseCheck.query(putQuery, putValue);

    res.status(204).send({ message: "Product updated successfully" });
  }  catch (error) {
    
  }
})
app.delete('/product/:id', async(req, res)=>{
  let reqId  = req.params.id;
  try {
    let deleteQuery = `DELETE FROM products WHERE id = $1`;
    let deleteId = [reqId]
    await databaseCheck.query(deleteQuery,deleteId)
    res.status(202).send({message: "Deleted Successfully"})
    
  } catch (error) {
    res.status(404).send({message: "Internal server Error"})
  }

})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
