<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as THREE from 'three'

// 占位数字人：用基础几何体拼出一个简易人形，后续替换为真实数字人模型/骨骼动画。
const props = defineProps({
  speaking: { type: Boolean, default: false },
})

const canvasHost = ref(null)
let renderer, scene, camera, animationId, head, mouth, body
const clock = new THREE.Clock()

function buildScene() {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0e0f16)

  camera = new THREE.PerspectiveCamera(
    45,
    canvasHost.value.clientWidth / canvasHost.value.clientHeight,
    0.1,
    50,
  )
  camera.position.set(0, 1.6, 4)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(canvasHost.value.clientWidth, canvasHost.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  canvasHost.value.appendChild(renderer.domElement)

  scene.add(new THREE.AmbientLight(0xffffff, 0.7))
  const key = new THREE.DirectionalLight(0xffffff, 0.9)
  key.position.set(2, 4, 3)
  scene.add(key)

  const group = new THREE.Group()

  body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.5, 1.1, 4, 16),
    new THREE.MeshStandardMaterial({ color: 0x3b6ea5 }),
  )
  body.position.y = 1
  group.add(body)

  head = new THREE.Mesh(
    new THREE.SphereGeometry(0.35, 24, 24),
    new THREE.MeshStandardMaterial({ color: 0xe8b98a }),
  )
  head.position.y = 1.95
  group.add(head)

  mouth = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.05, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x7a3b3b }),
  )
  mouth.position.set(0, 1.85, 0.32)
  group.add(mouth)

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(2, 32),
    new THREE.MeshStandardMaterial({ color: 0x1b1c26 }),
  )
  floor.rotation.x = -Math.PI / 2
  group.add(floor)

  scene.add(group)
}

function animate() {
  animationId = requestAnimationFrame(animate)
  const t = clock.getElapsedTime()

  // 待机呼吸动画
  if (body) body.scale.y = 1 + Math.sin(t * 1.5) * 0.01
  if (head) head.position.y = 1.95 + Math.sin(t * 1.5) * 0.01

  // 讲话时嘴部做简单开合动画，模拟数字人说话
  if (mouth) {
    if (props.speaking) {
      mouth.scale.y = 1 + Math.abs(Math.sin(t * 12)) * 3
    } else {
      mouth.scale.y = 1
    }
  }

  renderer.render(scene, camera)
}

function handleResize() {
  if (!canvasHost.value || !renderer) return
  const { clientWidth, clientHeight } = canvasHost.value
  camera.aspect = clientWidth / clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(clientWidth, clientHeight)
}

onMounted(() => {
  buildScene()
  animate()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
  renderer?.dispose()
})
</script>

<template>
  <div ref="canvasHost" class="avatar-host"></div>
</template>

<style scoped>
.avatar-host {
  width: 100%;
  height: 100%;
}

.avatar-host :deep(canvas) {
  display: block;
}
</style>
