<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { exhibits } from '../data/venueData.js'

const emit = defineEmits(['select'])
const canvasHost = ref(null)

let renderer, scene, camera, controls, raycaster, animationId
const exhibitMeshes = []

function buildScene() {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x11121a)
  scene.fog = new THREE.Fog(0x11121a, 15, 40)

  camera = new THREE.PerspectiveCamera(
    60,
    canvasHost.value.clientWidth / canvasHost.value.clientHeight,
    0.1,
    100,
  )
  camera.position.set(0, 6, 12)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(canvasHost.value.clientWidth, canvasHost.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  canvasHost.value.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 1, 0)
  controls.enableDamping = true
  controls.maxPolarAngle = Math.PI / 2.05
  controls.minDistance = 4
  controls.maxDistance = 25

  // 地面（占位场馆地板）
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshStandardMaterial({ color: 0x22232d }),
  )
  floor.rotation.x = -Math.PI / 2
  scene.add(floor)

  const grid = new THREE.GridHelper(40, 40, 0x33344a, 0x22232d)
  scene.add(grid)

  // 灯光
  scene.add(new THREE.AmbientLight(0xffffff, 0.6))
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8)
  dirLight.position.set(5, 10, 5)
  scene.add(dirLight)

  // 展区占位模型：用彩色几何体代表展柜/展台，后续替换为真实模型
  exhibits.forEach((exhibit) => {
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshStandardMaterial({
      color: exhibit.color,
      emissive: new THREE.Color(exhibit.color),
      emissiveIntensity: 0.15,
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(...exhibit.position)
    mesh.userData.exhibitId = exhibit.id
    scene.add(mesh)
    exhibitMeshes.push(mesh)

    const label = makeLabelSprite(exhibit.name)
    label.position.set(exhibit.position[0], exhibit.position[1] + 1.8, exhibit.position[2])
    scene.add(label)
  })

  raycaster = new THREE.Raycaster()
}

function makeLabelSprite(text) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 256
  canvas.height = 64
  ctx.fillStyle = 'rgba(0,0,0,0.55)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#ffffff'
  ctx.font = '28px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)

  const texture = new THREE.CanvasTexture(canvas)
  const material = new THREE.SpriteMaterial({ map: texture, depthTest: false })
  const sprite = new THREE.Sprite(material)
  sprite.scale.set(3, 0.75, 1)
  return sprite
}

function handleClick(event) {
  const rect = renderer.domElement.getBoundingClientRect()
  const pointer = new THREE.Vector2(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1,
  )
  raycaster.setFromCamera(pointer, camera)
  const intersects = raycaster.intersectObjects(exhibitMeshes)
  if (intersects.length > 0) {
    const id = intersects[0].object.userData.exhibitId
    emit('select', id)
  }
}

function handleResize() {
  if (!canvasHost.value || !renderer) return
  const { clientWidth, clientHeight } = canvasHost.value
  camera.aspect = clientWidth / clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(clientWidth, clientHeight)
}

function animate() {
  animationId = requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

onMounted(() => {
  buildScene()
  animate()
  renderer.domElement.addEventListener('click', handleClick)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
  renderer?.domElement.removeEventListener('click', handleClick)
  controls?.dispose()
  renderer?.dispose()
})
</script>

<template>
  <div ref="canvasHost" class="scene-host"></div>
</template>

<style scoped>
.scene-host {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.scene-host :deep(canvas) {
  display: block;
}
</style>
