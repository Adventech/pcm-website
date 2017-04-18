/**
 * Scraper of data from eAdventist.org
 */

var osmosis = require("osmosis"),
  async = require("async"),
  redis = require("redis"),
  redis_client = redis.createClient(),
  fs = require("fs"),
  process = require("process");

var all_links = [],
    all_info = [];

// http://eadventist.net/en/search.html?page=743&type=a

var scrape_func = function (url, callback) {
  console.log("starting parsing: " + url);

  redis_client.get(url, function (err, reply) {
    if (!reply) {
      osmosis
        .get(url)
        .find(".org-links > a:last-child")
        .set({"url": "@href"})
        .data(function (links) {
          all_links.push(links);
          redis_client.set(url, JSON.stringify(links));
        })
        .done(function () {
          callback(null, url);
        });
    } else {
      all_links.push(JSON.parse(reply));
      callback(null, url);
    }
  });
};

var scrape_individual_func = function(url, callback){
  console.log("starting parsing: " + url);
  all_info[url] = [];

  redis_client.get(url, function(err, reply){
    if (!reply){
      osmosis
        .get(url)

        .find("table.l-column tr")
        .set({
          "label": "td.label > label",
          "value": "td.field:last-child"
        })
        .if("a[contains(@href,'maps.google.com')]")
        .set({
          "value": "@href",
          "label": "../../../td.label > label"
        })
        .data(function (data) {
          all_info[url].push(data);
        })
        .done(function (d) {
          redis_client.set(url, JSON.stringify(all_info[url]));
          callback(null, url);

        });

    } else {
      all_info[url] = JSON.parse(reply);
      fs.appendFileSync("all_info.json", reply +",\n");
      callback(null, url);
    }
  });
};

//var scrape_tasks = [];
//
//links_data = JSON.parse(new Buffer(fs.readFileSync("links.json")).toString());
//
//for(var i = 0; i < links_data.length; i++){
//  (function (url) {
//    scrape_tasks.push(
//      function (callback) {
//        scrape_individual_func(url, callback);
//      }
//    );
//  })("http://eadventist.net" + links_data[i]["url"]);
//}
//
//fs.writeFileSync("all_info.json", "[");
//
//async.series(scrape_tasks, function (err, results) {
//  fs.appendFileSync("all_info.json", "[");
//});



var StreamArray = require("stream-json/utils/StreamArray");
var stream = StreamArray.make();

// Example of use:

stream.output.on("data", function(object){
  var item = object.value;

  for (var i = 0; i < item.length; i++) {
    for (var k in item[i]) {
      console.log(k);
    }
  }
});
stream.output.on("end", function(){
  console.log("done");
});

fs.createReadStream("all_info.json").pipe(stream.input);

