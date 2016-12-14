var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('./client/dist'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


function makeId()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 20; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var avatars = [];
var foods = [];

var d = new Date();
var n = d.getTime();

var newFood
var length = 0
var genfood = 0
var color = ''

io.on('connection', function(socket) {
  setInterval(function () {
    for (var i = 0; i < avatars.length; i++) {
      if (avatars[i].eat === true) {
        var index = 0
        var check = 0
        // *chekeat food
        var eatFood
        eatFood = foods.find(food => {
          index++
          check = ((food.x < avatars[i].x + 50) && (food.x > avatars[i].x - 50)) && ((food.y < avatars[i].y + 50) && (food.y > avatars[i].y - 50))
          return (check)
        })
        if (eatFood) {
          if (eatFood.color !== '' && avatars[i].score > 5) {
            var update = {
              id: avatars[i].id,
              color: avatars[i].color = eatFood.color,
              score: avatars[i].score = Math.ceil(avatars[i].score / 2)
            }
            io.emit("update",update)
            foods.splice(foods.findIndex(food => food.id === eatFood.id), 1)
            io.emit("removeFoods",eatFood.id)
          } else {
            avatars[i].score += 2
            var update = {
              id: avatars[i].id,
              color: avatars[i].color,
              score: avatars[i].score
            }
            io.emit("update",update)
            foods.splice(foods.findIndex(food => food.id === eatFood.id), 1)
            io.emit("removeFoods",eatFood.id)
          }
        }
      }
    }
  }, 10)

  var length = 0
  setInterval(function () {
    if (length < 40) {
      genfood = Math.floor(Math.random() * 30) + 1
      if (genfood > 4) {
        genfood = (genfood % 2) + 4
      }
      if (genfood === 1) {
        color = '#F5FF5D'
      } else if (genfood === 2) {
        color = '#AEFBE9'
      } else if (genfood === 3) {
        color = '#FC665A'
      } else {
        color = ''
      }
      newFood = {
        id: makeId(),
        pic: genfood,
        color,
        x: Math.floor(Math.random() * 2800) + 50,
        y: Math.floor(Math.random() * 2778) + 50
      }
      foods.push(newFood)
      io.emit("updateFoods",newFood)
    }
    length = foods.length
    for (var i = 0; i < avatars.length; i++) {
      if ((avatars[i].time + 120000) < n) {
        io.emit("remove",avatars[i].id)
        avatars.splice(i, 1)
      }
    }
    d = new Date();
    n = d.getTime();
  }, 1000)

    socket.on('getFoods', function(data) {
      socket.emit("getFoods",foods)
    });
    socket.on('get', function(data) {
      // console.log(avatars)
      socket.emit("get",avatars)
    });
    socket.on('new', function(data) {
      var newJson = {}
      var id = makeId()
      data.id = id
      newJson = data
      avatars.push(data)
      io.emit("new",newJson)
    });
    socket.on('remove', function(data) {
      if (data !== '') {
        avatars.splice(avatars.findIndex(avatar => avatar.id === data), 1)
        io.emit("remove",data)
      }
    });
    socket.on('update', function(data) {
      var index = avatars.findIndex(avatar => avatar.id === data.id)
      if (index !== -1) {
        for (var j in data) {
          if (j !== 'id') {
            if (avatars[index]) {
              avatars[index][j] = data[j]
            }
          }
        }
        if (avatars[index]) {
          avatars[index].time = n
        }
      }
      io.emit("update",data)
    });
});

server.listen(process.env.PORT || 8081, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
