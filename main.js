"use strict";

//DICTIONARY
function Dict(){
    this.keys = []
    this.values = []
}
Dict.prototype.set = function(key, value){
    this.keys.push(key)
    this.values.push(value)
}
Dict.prototype.get = function(lookupKey){
    for (var i=0;i<this.keys.length;i++){
        var key = this.keys[i];
        if (key === lookupKey) {
            return this.values[i]
        }
    }
}
//HASHTABLE
function HashTable(){
    this.bucketCount = 100000;
    this.buckets = [];
    for (var i=0; i< this.bucketCount;i++){
        this.buckets.push(new Dict())
    }
}
HashTable.prototype.hashFunction = function(key){
    var hash = 0;
    for (var i=0;i< key.length;i++){
        hash += key.charCodeAt(i)
    }
    return hash;
}

HashTable.prototype.getBucketIndex = function(key){
    return this.hashFunction(key) % this.bucketCount
}
HashTable.prototype.getBucket = function(key){
    return this.buckets[this.getBucketIndex(key)]
}

HashTable.prototype.set = function(key, value){
   this.getBucket(key).set(key, value)
}
HashTable.prototype.get = function(lookupKey){
    return this.getBucket(lookupKey).get(lookupKey)
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


// DO
var dict = new HashTable();

var keys = []
var values = []
for (var i = 0;i< 100;i++){
    keys.push(makeid())
    values.push(Math.round())
}

console.time("SET")
for (var i = 0;i < keys.length;i++){
    dict.set(keys[i], values[i])
}
console.timeEnd("SET")

console.time("GET")
for (var i = 0;i < keys.length;i++){
    var val = dict.get(keys[i])
}
console.timeEnd("GET")