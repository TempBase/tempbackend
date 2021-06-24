'use strict';

// THIS IS THE STRETCH GOAL ...
// It takes in a schema in the constructor and uses that instead of every collection
// being the same and requiring their own schema. That's not very DRY!

class Collection {
  constructor(name, model) {
    this.name = name;
    this.model = model;
  }

  get(id) {
    if (id) {
      return this.model.findOne({ where: { id: id } });
    }
    else {
      return this.model.findAll({});
    }
  }

  create(record) {
    return this.model.create(record);
  }

  update(id, data) {
    return this.model.findOne({ where: { id: id } })
      .then(record => record.update(data));
  }

  delete(id) {
    return this.model.destroy({ where: { id: id } });
  }

  createAssociation(type, model, options) {
    console.log(type, model, options);
    try {
      this.model[type](model, options);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Collection;
