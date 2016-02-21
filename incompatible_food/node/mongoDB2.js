
//insert
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

var food_name_jobj = {};
var food_name_jarray = [];

var food_incomp_jarray = [];
var food_incomp__id_jarray = [];

var insertJson = function(db, col, json, callback) {
	db.collection(col).insertOne(JSON.parse(json), function(err, result) {
		assert.equal(err, null);
		console.log("Inserted a document into the restaurants collection.");
		callback(result);
	});
};

var findRestaurants = function(db, col, callback) {
	var cursor =db.collection(col).find( );
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			if (col == "food_name") {
				var json = JSON.parse(JSON.stringify(doc));
				//console.log("aaa:" + "," + json["id"]);
				//food_name_jobj.put
				food_name_jarray.push(json);
				//printJarray(food_name_jarray);
			} else {
				console.dir(doc);
			}
		} else {
			callback();
		}
	});

	//printJarray(food_name_jarray);
};

function queryDB(col, callback) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		findRestaurants(db, col, function() {
			//printJarray(food_name_jarray);
            callback();
	 		db.close();
		});
	});
}

function insertDB(col, json){
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);

	insertJson(db, col, json, function() {
		db.close();
	});

});
}

function DB_Operation() {
	    queryDB('col');
    // queryDB('restaurants');

    var json = {
    	"id" : "3",
    	"name" : ["红薯", "山芋"]
    };
    console.log("json:" + json);

    var json_str = JSON.stringify(json);
    console.log("json_str:" + json_str);
    insertDB('col', json_str);
    queryDB('col');
}

function parse_file(fileName) {
	var lineReader = require('line-reader');
	var id = 0;
	lineReader.eachLine(fileName, function(line, last) {
	  	console.log(line);

	  	var names = line.split("#");
	  	console.log("id:" + id + ", line.len:" + names.length + ", name:" + names);
	  	names.splice(names.length -1 , 1);
		console.log("id:" + id + ", line.len:" + names.length + ", after name:" + names);
		id = id + 1;

		var json = {"id": id,
					"names": names
		};

		var json_str = JSON.stringify(json);
		console.log("id:" + id + ", json_str:" + json_str);
		insertDB('food_name', json_str);
		queryDB('food_name');

	});
}



var commonCB = function() {
    console.log("Common CB");
}

function queryDBDone() {
    console.log("queryDBDone");
    //food_incomp_jarray = parse_incomp_file("res_uniq_2.txt", parseFileDone);
}

function parse_incomp_file(fileName, callback) {
    var retJarray = [];
    var lineReader = require('line-reader');
    var id = 0;
    lineReader.eachLine(fileName, function(line, last) {
        console.log(line);

        var names = line.split("%");
        //console.log("id:" + id + ", line.len:" + names.length + ", name:" + names);
        names.splice(names.length -1 , 1);
        //console.log("id:" + id + ", line.len:" + names.length + ", after name:" + names);

        var json = {
            "names": names
        };
        retJarray.push(json);
        var json_str = JSON.stringify(json);

        console.log("json_str:" + json_str + ", isLast:" + last);
        //callback(false);
        //if (last == true) {
        //    console.log("last == true");
        //} else {
        //    console.log("last == false");
        //}

    }, callback);
    return retJarray;
}

function parseFileDone() {
    console.log("parseFileDone---------");
    var foodName1;
	var foodName2;
	var foodName1ID;
	var foodName2ID;
	var reason;

    for (var i=0; i<food_incomp_jarray.length; i++) {
		if (food_incomp_jarray[i].names.length == 3) {
			foodName1 = JSON.stringify(food_incomp_jarray[i].names[0]);
			foodName2 = JSON.stringify(food_incomp_jarray[i].names[1]);
			reason = JSON.stringify(food_incomp_jarray[i].names[2]);
			//console.log("food_incomp_jarray[" + i + "]:" + foodName1);
			//console.log("food_incomp_jarray[" + i + "]:" + food_incomp_jarray[i][0]
			//    + " vs " + food_incomp_jarray[i][1] + ":" + food_incomp_jarray[i][2]);

			foodName1ID = findFoodNameID(foodName1, food_name_jarray);
			foodName2ID = findFoodNameID(foodName2, food_name_jarray);
			console.log("FoodName1:" + foodName1 + ",id:" + foodName1ID + " vs FoodName2:" + foodName2 + ",id:" + foodName2ID + ",reason:" + reason);

			/**
			 *  Make the food A's id always less than food B's id.
			 * */
			var json;
			if (foodName1ID < foodName2ID) {
				json = {
					"foodA": JSON.parse(foodName1),
					"idA": foodName1ID,
					"foodB": JSON.parse(foodName2),
					"idB": foodName2ID,
					"reason": JSON.parse(reason)
				};
			} else {
				json = {
					"foodA": JSON.parse(foodName2),
					"idA": foodName2ID,
					"foodB": JSON.parse(foodName1),
					"idB": foodName1ID,
					"reason": JSON.parse(reason)
				};
			}
			//insertDB("food_icomp", JSON.stringify(json));
			food_incomp__id_jarray.push(json);
		} else {
			console.log("food_incomp_jarray[i].names.length != 3");
			console.log("food_incomp_jarray[" + i + "]:" + JSON.stringify(food_incomp_jarray[i]));
		}
    }

	printJarray(food_incomp__id_jarray);

}



function printJarray(jArray) {
	console.log("jArray.length:" + jArray.length);
	for (var i = 0; i < jArray.length; i++) {
		console.log("jArray[ " + i + "]:" + JSON.stringify(jArray[i]));
	}
}

function findFoodNameID(foodName, local_food_name_jarray) {
    //console.log("findFoodName:" + foodName);
    var id = -1;
    var foodNameArray;
    for (var i = 0; i < local_food_name_jarray.length; i++) {
        foodNameArray = local_food_name_jarray[i].names;

        for (var j=0; j< foodNameArray.length; j++) {
            if (foodName == JSON.stringify(foodNameArray[j])) {
                id = local_food_name_jarray[i].id;
                //console.log("foodNameArray[ " + j + "]:" + JSON.stringify(foodNameArray[j]) + ",id:" + id);
                break;
            }
        }
    }
    return id;
}

var findIncompResult = function(idA, idB, db, col, callback) {
    var ret = false;
    var cursor =db.collection(col).find( );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            if (col == "food_incomp") {
                var json = JSON.parse(JSON.stringify(doc));
                //console.log("---json:" +JSON.stringify(json) + ", json[\"idA\"]:" + json["idA"]);
                if (json["idA"] == idA && json["idB"] == idB) {
                    console.log("---json:" +JSON.stringify(json));
                    ret = true;
                    return ret;
                }
            } else {
                console.dir(doc);
            }
        } else {
            callback();
        }
    });

    return ret;
};


function queryDBisIncomp(idA, idB, callback) {
    var ret = false;
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        ret = findIncompResult(idA, idB, db, "food_incomp", function() {
            callback();
            db.close();
        });
    });

    return ret;
}

var main = function(){
    console.log("main");
    // parse_file("food_name.txt");
    // queryDB('food_name');
    //queryDB('food_name', queryDBDone);

    //var json1 = {"id": "111"};
    //var json2 = {"id": "222"};
    //console.log("json1:" + JSON.stringify(json1.id));
    //var json = {};
    //json.array = [];
    //json.array.push(json1);
    //json.array.push(json2);
    //console.log("json:" + JSON.stringify(json.array[1]));

    var isIncomp = queryDBisIncomp(1, 2, queryDBDone);
    console.log("------------- isIncomp:" + isIncomp);
    //console.log("food_icomp_jarray:" + JSON.stringify(food_icomp_jarray));
    //console.log("-------------1 food_name_jarray");
    //printJarray(food_name_jarray);
    //console.log("-------------2 food_icomp_jarray");
    //printJarray(food_icomp_jarray);
    //console.log("-------------3");
    //findFoodNameID("2222", food_name_jarray);
}


if (require.main === module) {
    main();
}

