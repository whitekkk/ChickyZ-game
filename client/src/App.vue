<template>
  <div>
    <!-- <iframe src="https://chichkyz.herokuapp.com/" width="0" height="0" style="position:absolute; width:-1; height:-1;"></iframe> -->
    <pop-up :wait="wait" :checkFull="checkFull" :checkName="checkName" :letPlay="letPlay" :color="color" :myAvatar="myAvatar" :f="f" :c="c" :selectFace="selectFace" :selectColor="selectColor" :waitingTime="waitingTime"></pop-up>
    <game :wait="wait" :mousePosition="mousePosition" :avatars="avatars" :myAvatar="myAvatar" :halfHeight="halfHeight" :halfWidth="halfWidth" :target="target" :foods="foods" :hOFs="hOFs" :ranking="ranking" :mapSize="mapSize" :mapResize="mapResize"
    :countStep="countStep" :maxStep="maxStep" :scoreColor="scoreColor"></game>
    <div id="fb-root"></div>
  </div>
</template>

<script>
(function (d, s, id) {
  var js = d.getElementsByTagName(s)[0]
  var fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) return
  js = d.createElement(s); js.id = id
  js.src = '//connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v2.8'
  fjs.parentNode.insertBefore(js, fjs)
}(document, 'script', 'facebook-jssdk'))
import Game from './components/Game'
import PopUp from './components/PopUp'
import firebase from 'firebase'
import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, 'http://192.168.0.133:3000/') // Automaticly socket connect from url string
// Vue.use(VueSocketio, 'https://chichkyz.herokuapp.com/')

var config = {
  apiKey: 'AIzaSyCPjSZnxBY9KLykYc18iW4yNVTbQyaBPsU',
  authDomain: 'chickyz-afcfe.firebaseapp.com',
  databaseURL: 'https://chickyz-afcfe.firebaseio.com',
  storageBucket: 'chickyz-afcfe.appspot.com',
  messagingSenderId: '763551736427'
}
firebase.initializeApp(config)

var myId = ''
window.onbeforeunload = function () {
  Vue.$socket.emit('remove', myId)
}

var HOFs = firebase.database().ref('hofs')

export default {
  created () {
    window.addEventListener('keyup', this.upKey)
    window.addEventListener('keydown', this.downKey)
  },
  mounted () {
    let vm = this
    this.$socket.emit('get', '')
    this.$socket.emit('getFoods', '')

    HOFs.on('child_added', function (snapshot) {
      var item = snapshot.val()
      item.id = snapshot.key
      vm.hOFs.push(item)
      vm.hOFs.sort((parameterOne, parameterTwo) => parameterTwo.score - parameterOne.score)
    })
    HOFs.on('child_changed', function (snapshot) {
      var id = snapshot.key
      var hof = vm.hOFs.find(hof => hof.id === id)
      hof.name = snapshot.val().name
      hof.score = snapshot.val().score
    })
    HOFs.on('child_removed', function (snapshot) {
      var id = snapshot.key
      vm.hOFs.splice(vm.hOFs.findIndex(hof => hof.id === id), 1)
    })
  },
  sockets: {
    connect () {
      console.log('socket connected')
    },
    get (val) {
      this.avatars = val
      var roomCheck = val.length
      if (roomCheck >= 98) {
        this.checkFull = true
      }
    },
    new (val) {
      if (myId === '' && this.wait !== true) {
        myId = val.id
        this.myAvatar.id = val.id
      }
      this.avatars.push(val)
    },
    remove (val) {
      var vm = this
      if (val !== '') {
        vm.avatars.splice(vm.avatars.findIndex(avatar => avatar.id === val), 1)
        if (val === myId) {
          vm.wait = true
          vm.waitingTime = 3
          vm.checkName = true
          myId = ''
        }
      }
    },
    update (val) {
      var vm = this
      var index = vm.avatars.findIndex(avatar => avatar.id === val.id)
      if (index !== -1) {
        if (vm.avatars[index].id === myId) {
          if (val.score) {
            if (val.score < vm.myAvatar.score) {
              vm.scoreColor = '#D49999'
            } else {
              vm.scoreColor = '#FFFFFF'
            }
          }
        }
        for (var j in val) {
          if (j !== 'id') {
            vm.avatars[index][j] = val[j]
            if (myId === val.id) {
              vm.myAvatar[j] = val[j]
            }
          }
        }
        if (val.score) {
          vm.ranking = vm.avatars
          vm.ranking.sort((parameterOne, parameterTwo) => parameterTwo.score - parameterOne.score)
          vm.ranking = vm.ranking.slice(0, 5)
          vm.checkHOF()
        }
      }
    },
    getFoods (val) {
      this.foods = val
    },
    updateFoods (val) {
      this.foods.push(val)
    },
    removeFoods (val) {
      var vm = this
      vm.foods.splice(vm.foods.findIndex(food => food.id === val), 1)
    }
  },
  data () {
    let winHeight = window.innerHeight
    let winWidth = window.innerWidth
    let c = Math.floor(Math.random() * 3) + 1
    let f = Math.floor(Math.random() * 3) + 1
    let color = ''
    if (c === 1) {
      color = '#F5FF5D'
    } else if (c === 2) {
      color = '#AEFBE9'
    } else {
      color = '#FC665A'
    }
    let x = Math.floor(Math.random() * 1050) + 50
    let y = Math.floor(Math.random() * 1088) + 50

    return {
      buttonZ: false,
      countStep: 100,
      maxStep: 100,
      mapSize: 0.03,
      ranking: [],
      target: '',
      checkFull: false,
      halfHeight: winHeight / 2,
      halfWidth: winWidth / 2,
      mouseX: 0,
      mouseY: 0,
      avatars: [],
      foods: [],
      hOFs: [],
      checkName: true,
      active: false,
      waitingTime: 3,
      wait: true,
      color,
      face: '',
      f,
      c,
      scoreColor: '#FFFFFF',
      myAvatar: {
        name: '',
        x,
        y,
        face: '',
        color,
        speed: false,
        eat: false,
        score: 0
      }
    }
  },

  components: {
    Game,
    PopUp
  },

  // methods
  methods: {
    selectFace (num) {
      this.f = this.f + num
      if (this.f > 3) {
        this.f = 1
      } else if (this.f <= 0) {
        this.f = 3
      }
    },
    selectColor (num) {
      this.c = this.c + num
      if (this.c > 3) {
        this.c = 1
      } else if (this.c <= 0) {
        this.c = 3
      }
      if (this.c === 1) {
        this.color = '#F5FF5D'
      } else if (this.c === 2) {
        this.color = '#AEFBE9'
      } else {
        this.color = '#FC665A'
      }
    },
    gameStart () {
      let vm = this
      setInterval(function () {
        vm.halfHeight = window.innerHeight / 2
        vm.halfWidth = window.innerWidth / 2
      }, 300)
      vm.addAvatar(vm.myAvatar)
      vm.move(false)
    },
    letPlay () {
      let vm = this
      if (typeof window.orientation === 'undefined') {
        vm.checkName = false
        let i = 0
        let waiting = setInterval(function () {
          vm.waitingTime--
          if (i === 2) {
            vm.gameStart()
            vm.wait = false
            clearInterval(waiting)
          }
          i++
        }, 1000)
      } else {
        vm.wait = true
        vm.waitingTime = 3
        vm.checkName = true
        window.alert('Sorry, this game not support in mobile device.')
      }
    },
    upKey (e) {
      if (this.waitingTime === 0) {
        if (e.keyCode === 77) {
          this.mapResize()
        }
        if (e.keyCode === 88) {
          this.shutup()
        }
        if (e.keyCode === 90) {
          this.speed()
        }
      }
      if (e.keyCode === 13) {
        if (this.checkName !== false) {
          this.letPlay()
        }
      }
    },
    downKey (e) {
      if (this.waitingTime === 0) {
        if (e.keyCode === 88) {
          this.eat()
        }
        if (e.keyCode === 90) {
          if (!this.myAvatar.speed) {
            this.speed()
          }
        }
      }
    },
    addAvatar (newAvatar) {
      let vm = this
      let color = vm.color
      let face = vm.f
      vm.myAvatar.x = Math.floor(Math.random() * 2750) + 50
      vm.myAvatar.y = Math.floor(Math.random() * 2788) + 50
      vm.myAvatar.face = face
      vm.myAvatar.color = color
      vm.myAvatar.speed = false
      vm.myAvatar.eat = false
      vm.myAvatar.score = 0
      vm.myAvatar.name = vm.myAvatar.name.substring(0, 7)
      this.$socket.emit('new', newAvatar)
      if (vm.myAvatar.color === '#F5FF5D') {
        vm.target = '#AEFBE9'
      } else if (vm.myAvatar.color === '#AEFBE9') {
        vm.target = '#FC665A'
      } else {
        vm.target = '#F5FF5D'
      }
    },
    move () {
      let vm = this
      var update = {}
      let xCenter = vm.halfWidth
      let yCenter = vm.halfHeight
      var xOrigin = vm.myAvatar.x
      var yOrigin = vm.myAvatar.y
      var x1 = vm.mouseX
      var y1 = vm.mouseY
      var step = 1
      if (vm.myAvatar.speed === true) {
        step = 4
      }
      var dx = Math.abs(x1 - xCenter)
      var dy = Math.abs(y1 - yCenter)
      var checkX = (xCenter < x1) ? step : -step
      var checkY = (yCenter < y1) ? step : -step
      var err = dx - dy
      let i = 1
      var e2 = 0
      clearInterval(vm.active)
      vm.active = setInterval(function () {
        if (!vm.myAvatar.speed && vm.countStep < 100 + vm.myAvatar.score) {
          step = 1
          vm.countStep++
        }
        if (vm.myAvatar.speed && vm.countStep > 0) {
          step = 4
          vm.countStep--
        } else {
          step = 1
        }
        if (i > 10 || (x1 !== vm.mouseX || y1 !== vm.mouseY) || vm.countStep === 0 || vm.buttonZ) {
          vm.buttonZ = false
          xCenter = vm.halfWidth
          yCenter = vm.halfHeight
          x1 = vm.mouseX
          y1 = vm.mouseY
          dx = Math.abs(x1 - xCenter)
          dy = Math.abs(y1 - yCenter)
          checkX = (xCenter < x1) ? step : -step
          checkY = (yCenter < y1) ? step : -step
          err = dx - dy
          i = 0
        }
        i++
        if (!(((xCenter + 25 > x1) && (xCenter - 25 < x1)) && ((yCenter - 25 < y1) && (yCenter + 25 > y1)))) {
          xOrigin = vm.myAvatar.x
          yOrigin = vm.myAvatar.y
          e2 = 2 * err
          if (e2 > -dy) {
            err -= dy
            xOrigin += checkX
          }
          if (e2 < dx) {
            err += dx
            yOrigin += checkY
          }
          // check out of area
          if (xOrigin < 0 && x1 < xCenter) {
            xOrigin = 0
          } else if (xOrigin > 2898 && x1 > xCenter) {
            xOrigin = 2898
          }

          if (yOrigin < -20 && y1 < yCenter) {
            yOrigin = -20
          } else if (yOrigin > 2860 && y1 > yCenter) {
            yOrigin = 2860
          }

          if (vm.myAvatar.color === undefined) {
            yOrigin = -500
          }

          if (vm.active && vm.myAvatar.id !== '') {
            update = {
              id: myId,
              y: yOrigin,
              x: xOrigin
            }
            vm.$socket.emit('update', update)
            // console.log(update)
          }
          if (vm.myAvatar.score === undefined) {
            clearInterval(vm.active)
          }
        }
      }, 10)
    },
    checkEat () {
      var vm = this
      var check = 0
      if (vm.myAvatar.color === '#F5FF5D') {
        vm.target = '#AEFBE9'
      } else if (vm.myAvatar.color === '#AEFBE9') {
        vm.target = '#FC665A'
      } else {
        vm.target = '#F5FF5D'
      }
      // *chekeat chick
      var eatChick = 0
      check = 0
      eatChick = vm.avatars.find(avatar => {
        check = ((((avatar.x < vm.myAvatar.x + 50) &&
        (avatar.x > vm.myAvatar.x - 50)) &&
        ((avatar.y < vm.myAvatar.y + 50) &&
        (avatar.y > vm.myAvatar.y - 50))) &&
        avatar.id !== myId)
        return (check)
      })
      if (eatChick) {
        if (vm.myAvatar.color === '#F5FF5D') {
          if (eatChick.color === '#AEFBE9') {
            vm.changeScore(eatChick)
          }
        } else if (vm.myAvatar.color === '#AEFBE9') {
          if (eatChick.color === '#FC665A') {
            vm.changeScore(eatChick)
          }
        } else if (vm.myAvatar.color === '#FC665A') {
          if (eatChick.color === '#F5FF5D') {
            vm.changeScore(eatChick)
          }
        }
        if (Object.keys(eatChick).length === 3 || eatChick.score === undefined) {
          vm.$socket.emit('remove', eatChick.id)
          vm.myAvatar.score += 5
          vm.updateScore()
        }
      }
      if (vm.myAvatar.score < 0) {
        clearInterval(vm.active)
        vm.$socket.emit('remove', myId)
        // firebase.database().ref('avatars/' + myId).remove()
      }
      vm.maxStep = vm.myAvatar.score + 100
    },
    mousePosition () {
      let vm = this
      if (this.waitingTime === 0) {
        let position = window.event
        vm.mouseX = position.clientX
        vm.mouseY = position.clientY
      }
    },
    speed () {
      this.buttonZ = true
      this.move()
      var update = {}
      if (!this.myAvatar.speed) {
        // clearInterval(this.active)
        update = {
          id: myId,
          speed: true
        }
        this.$socket.emit('update', update)
      } else {
        update = {
          id: myId,
          speed: false
        }
        this.$socket.emit('update', update)
      }
    },
    eat () {
      this.myAvatar.face = this.myAvatar.face.toString()
      if (this.myAvatar.face.search('-0') === -1 && !this.myAvatar.eat) {
        var update = {
          id: myId,
          eat: true,
          face: this.myAvatar.face + '-0'
        }
        this.$socket.emit('update', update)
      }
      this.checkEat()
    },
    shutup () {
      if (this.waitingTime === 0) {
        var update = {
          id: myId,
          eat: false,
          face: this.myAvatar.face.replace('-0', '')
        }
        this.$socket.emit('update', update)
      }
    },
    mapResize () {
      let vm = this
      if (vm.mapSize === 0.03) {
        vm.mapSize = 0.08
      } else {
        vm.mapSize = 0.03
      }
    },
    checkHOF () {
      var vm = this
      if (vm.hOFs.length < 3) {
        firebase.database().ref('hofs/' + this.myAvatar.id).update({
          name: vm.myAvatar.name,
          score: vm.myAvatar.score
        })
      } else if (vm.myAvatar.score > vm.hOFs[2].score) {
        if (this.myAvatar.id !== vm.hOFs[2].id && this.myAvatar.id !== vm.hOFs[1].id && this.myAvatar.id !== vm.hOFs[0].id) {
          firebase.database().ref('hofs/' + vm.hOFs[2].id).remove()
        }
        firebase.database().ref('hofs/' + this.myAvatar.id).update({
          name: vm.myAvatar.name,
          score: vm.myAvatar.score
        })
      }
      vm.hOFs.sort((parameterOne, parameterTwo) => parameterTwo.score - parameterOne.score)
      vm.hOFs = vm.hOFs.slice(0, 3)
      // vm.hOFs.sort((parameterOne, parameterTwo) => parameterTwo.score - parameterOne.score)
    },
    updateScore () {
      if (myId !== '') {
        var update = {
          id: myId,
          score: this.myAvatar.score
        }
        this.$socket.emit('update', update)
      }
    },
    changeScore (eatChick) {
      var vm = this
      if (eatChick.score !== 0) {
        var data = {
          id: eatChick.id,
          score: eatChick.score - 1
        }
        this.$socket.emit('update', data)
        vm.myAvatar.score++
        vm.updateScore()
      } else {
        vm.$socket.emit('remove', eatChick.id)
      }
    }
  }
}
</script>
<style src="../static/css/game.css"> </style>
