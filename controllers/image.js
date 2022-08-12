const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '64ee7ba6cbf34a5ca0b85ae1e9dfe80c' 
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json(' API not working'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('something went wrong entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}