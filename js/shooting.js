AFRAME.registerComponent('ball', {
    init: function(){
        this.shootBall()
    },
    shootBall: function(){
        window.addEventListener('keydown', (e)=>{
            if(e.key === 'b'){
                var ball = document.createElement('a-entity')
                ball.setAttribute('geometry', {primitive:'sphere', radius: 1})
                ball.setAttribute('material', {color: 'black'})
                var cam = document.querySelector("#camera")
                pos = cam.getAttribute('position')
                ball.setAttribute('position', {x: pos.x, y: pos.y, z: pos.z})
                var camera = document.querySelector('#camera').object3D
                var direction = new THREE.Vector3()
                camera.getWorldDirection(direction)
                ball.setAttribute('velocity', direction.multiplyScalar(-10))
                var scene = document.querySelector('#scene')
                ball.setAttribute('dynamic-body', {shape: 'sphere', mass: '0'})
                ball.addEventListener('collide', this.removeBall)
                scene.appendChild(ball)
            }     
        })
    },
    removeBall: function(e){
        element = e.detail.target.el
        elementHit = e.detail.body.el
        if(elementHit.id.includes('pin')){
            elementHit.setAttribute('material', {
                opacity: 0.5,
                transparent: true,
            })
            var impulse = new CANNON.Vec3(5,5,5)
            var point = new CANNON.Vec3().copy(elementHit.getAttribute('position'))
            elementHit.body.applyImpulse(impulse, point)
            element.removeEventListener('collide', this.shootBall)
            var scene = document.querySelector('#scene')
            scene.removeChild(element)
        } 
    },
  })