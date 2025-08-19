const express = require('express');
const cors = require('cors');
const app = express();
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()})
require('dotenv').config()

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.urlencoded({ extended: true }));
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;
  res.json({name: file.originalname, type: file.mimetype, size: file.size});
})

