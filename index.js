const { query } = require('express');
const express = require('express');
const res = require('express/lib/response');
const path = require('path');
const { Pool } = require('pg/lib');
const PORT = process.env.PORT || 5000
const { Client } = require('pg');

var client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect(async function(err){
  if(err) {
    res.send("Error "+err);
  }
  var query = await client.query("create table if not exists rectangles(name VARCHAR(50),width VARCHAR(50),height VARCHAR(50),color VARCHAR(50));");
});
/*For local
const { query, Router } = require('express');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const pg = require('pg')
var conString = "postgres://postgres:123@localhost:5432/postgres";
var client = new pg.Client(conString);
client.connect(function (err) {
  if (err) {
    return console.error('could not connect to postgres', err);
  }
  var query = client.query("create table if not exists rectangles(name VARCHAR(50),width VARCHAR(50),height VARCHAR(50),color VARCHAR(50));");
});
*/
var url = require('url');
var app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
//access database
var info=null;
app.get('/rectangles',async function(req,res){
  if(info==null){
  }
  else{
    var query = await client.query("DELETE FROM rectangles WHERE name='"+info.name+"' and width='"+info.width+"' and height='"+info.height+"'and color='"+info.color+"' ;");
    info=null;
  }
  var query = await client.query("select * from rectangles;");
  var array={results:query};
  res.render('pages/rectangles',array);
})
//add new element
app.post('/rectangles',async function(req,res){
  console.log( req.body);
  var query = await client.query("INSERT INTO rectangles(name , width , height ,color ) VALUES($1,$2,$3,$4)",[req.body.getname,req.body.getwidth,req.body.getheight,req.body.getcolor]);
  var query = await client.query("select * from rectangles;");
  var array={results:query};
  res.render('pages/rectangles',array);
})
 //edit elements 
app.post('/subpage',async function(req,res){
  var temp="UPDATE rectangles SET name='"+req.body.getname+"', width='"+req.body.getwidth+"', height='"+req.body.getheight+"', color='"+req.body.getcolor+"' WHERE name='"+info.name+"' and width='"+info.width+"' and height='"+info.height+"' and color='"+info.color+"';"
  var query = await client.query(temp);
  info={name:req.body.getname,width:req.body.getwidth,height:req.body.getheight,color:req.body.getcolor}
  res.render('pages/subpage',info);
})
//access subpage
app.get('/subpage',(req,res)=>{
  var params = url.parse(req.url, true).query;
  info={name:params.name,width:params.width,height:params.height,color:params.color}
  res.render('pages/subpage',info);
})
 //go back to main page 
app.get('/return', async function (req, res) {
  info = null;
  var query = await client.query("select * from rectangles;");
  var array = { results: query };
  res.render('pages/rectangles', array)
})
app.listen(PORT, () => console.log(`Listening on ${PORT}`))