const express = require('express');
const path = require('path');

const app = express();
const data = require('./data.json');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => console.log('Listening on port 3000'));

app.get('/', (req, res) => {
  res.send(data);
});

app.get('/:specie', (req, res) => {
  const {speciesname} = req.params;

  res.send(data.get(speciesname));
});

app.get('/:intakereason', (req, res) => {
    const {intakereason} = req.params;
  
    res.send(get(intakereason));
  });

app.get('/:specie', (req, res) => {
    const {speciesname} = req.params;
  
    res.send(get(speciesname));
  });

app.post('/', (req, res) => {
  const {id, animalname, animalage, sexname, location, breedname, intakereason} = req.body;

  const result = schema.validate({id, animalname, animalage, sexname, location, breedname, intakereason});
  if (result.error) return res.status(400).send(result.error.details[0].message);

  const dataB = create(id, animalname, animalage, sexname, location, breedname);

  res.send(dataB);
});

app.put('/:id', (req, res, next) => {
  const {id} = req.params;
  const {animalname = '', animalage = '', sexname = '', location = '', breedname = '', intakereason = ''} = req.body;

  const {dataB, err} = update(id, animalname, animalage, sexname, location, breedname, intakereason);
  if (err) return next();

  res.send(dataB);
});

app.delete('/:id', (req, res) => {
  const {id} = req.params;

  const dataB = deleteData(id);

  res.send(dataB);
});

function create(id, animalname, animalage, sexname, location, breedname) {
    data.push(id, animalname, animalage, sexname, location, breedname);
  
    return data[data.length-1];
}
  
function deleteData(id) {
    const index = data.findIndex(data => data.id == id);
    const dataB = data.splice(index, index);
    return dataB;
}
  
function update(id, animalname, animalage, sexname, location, breedname, intakereason) {
    try {
      const dataB = data.find(data => data.id == id);
      data.animalname = animalname.length === 0 ? data.animalname: animalname;
      data.animalage = animalage.length === 0 ? data.animalage: animalage;
      data.sexname = sexname.length === 0 ? data.sexname: sexname;
      data.location = location.length === 0 ? data.location: location;
      data.breedname = breedname.length === 0 ? data.breedname: breedname;
      data.intakereason = intakereason.length === 0 ? data.intakereason: intakereason;
      return {user, err: null};
    } catch (err) {
      return {err, user: null}
    }
}
  
function get(speciesname) {
    return data.find(data => data.speciesname == speciesname);
}

function get(intakereason) {
    return data.find(data => data.intakereason == intakereason);
}
