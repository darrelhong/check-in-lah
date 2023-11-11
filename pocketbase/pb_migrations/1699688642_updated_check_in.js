/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wytpqxg5j3pojox")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aobqg2kn",
    "name": "latitude",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wytpqxg5j3pojox")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aobqg2kn",
    "name": "latittude",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
})
