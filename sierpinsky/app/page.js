'use client'
import React from 'react'
import {useRef} from 'react'
import {Canvas,useFrame} from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export default function Home() {
  return (
   <Scene/>
  )
}
function Scene(){
  return(
    <div className='w-screen h-screen bg-black'>

      <Canvas>
        <OrbitControls/>
        <ambientLight intensity={2}/>
        <directionalLight position={[2,1,1]}/>
        <Sierpinsky/>
      </Canvas>
    </div>
  )
}
function Sierpinsky(props){
  let iterations=prompt("Sierpinsky Tetraeder 3D\n\nHow many iterations?\n1000 Potato quality\n10 000 ok quality\n100 000 good quality\n1 000 000 extreme quality\nmore -> crash\n")
  const corners=[
    [0,0,-1.3],
    [1.5,0,1.3],
    [-1.5,0,1.3],
    [0,2.449,0]
  ]
  const points=[[0,0,1]]
  let randomNumber=0
  for (let i=0;i<iterations;i++){
    let new_point=[0,0,0]
    randomNumber = Math.floor(Math.random() * 4);
    new_point[0]=(corners[randomNumber][0]+points[points.length-1][0])/2
    new_point[1]=(corners[randomNumber][1]+points[points.length-1][1])/2
    new_point[2]=(corners[randomNumber][2]+points[points.length-1][2])/2
    points.push(new_point)
  }
  console.log(points)
  return(
    <>
      {corners.map((c,i)=>{
        return(<Cube x={c[0]}y={c[1]}z={c[2]} a={0.02} color={"white"} key={i-100}/>)
      })}
      {points.map((c,i)=>{
        return(<Cube x={c[0]}y={c[1]}z={c[2]} a={0.005} color={"white"} key={i}/>)
      })}
      
    </>
  )
}
function Cube(props){
  const mesh= useRef(null)
  
  useFrame((state,delta)=>{
    mesh.current.position.set(props.x,props.y,props.z)
    /*
    mesh.current.rotation.x += delta*0.1
    mesh.current.rotation.y += delta*0.15
    mesh.current.rotation.z += delta*0.2
    */
  })
  return(
    <mesh ref={mesh}>
      <boxGeometry args={[props.a,props.a,props.a]}/>
      <meshStandardMaterial color={props.color}/>
    </mesh>
  )
}