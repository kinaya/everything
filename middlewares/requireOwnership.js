module.exports = (req, res, next) => {

  //console.log(req.params.itemId);
  // Get the itemId from the URL
/*  const getItemId = () => {
    const p = new Path('/api/:itemId/:choice')
    const match = p.test(new URL(req.url).pathname)
    if(match) { return {itemId: match.itemId}}
  }
  console.log(getItemId())
  console.log(req.url)*/

  if(!req.user) {
    return res.status(401).send({error: 'You must log in!'})
  }
  next(); // COntinue
};
