import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Board from '../models/Board';
import Sky from '../models/Sky';
import Turtle from '../models/Turtle';
import HomeInfo from '../components/HomeInfo';
import Brazilian from '../assets/brazilian-bossa-nova-jazz-acoustic-guitar-podcast-music-201763.mp3';
import { soundoff, soundon } from "../assets/icons";


const Home = () => {
  const audioRef = useRef(new Audio(Brazilian));
  audioRef.current.volume = 0.5;
  audioRef.current.loop = true;
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if(isPlayingMusic); {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    }
  }, [isPlayingMusic])
  
  const adjustedBoardForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0,  -3.5, -45];
    let rotation = [0.2, 4.7, 0];

    if(window.innerWidth < 768) {
      screenScale = [1.0, 1.0, 1.0];
      screenPosition = [0, -6.5, -43];

    } else {
      screenScale = [2, 2, 2];
    }
    return [screenScale, screenPosition, rotation];
  }

  const adjustedTurtleForScreenSize = () => {
    let screenScale, screenPosition;
    

    if(window.innerWidth < 768) {
      screenScale = [0.01, 0.01, 0.01];
      screenPosition = [0, -5.0, 5];

    } else {
      screenScale = [0.005, 0.005, 0.005];
      screenPosition = [0, -5.0, -4];
    }
    return [screenScale, screenPosition];
  }

  const [boardScale, boardPosition, boardRotation] = adjustedBoardForScreenSize();
  const [turtleScale, turtlePosition] = adjustedTurtleForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-40 left-0 right-0 z-10 flex items-center justify-center" >
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
        <Canvas 
          className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
          camera={{near: 0.1, far:1000}}
          >
            <Suspense fallback={<Loader />}>
              <directionalLight position={[5, 1, 1]} intensity={1.2} />
              <ambientLight intensity={1.5} />
              <pointLight />
              <spotLight />
              <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

              <Sky isRotating={isRotating}/>
              <Board 
                position={boardPosition}
                scale={boardScale}
                rotation={boardRotation}
                isRotating={isRotating}
                setIsRotating={setIsRotating}
                setCurrentStage={setCurrentStage}
              />
              <Turtle />
              scale={turtleScale}
              position={turtlePosition}
              isRotating={isRotating}
              rotation={[0, 20, 0]}
            </Suspense>
        </Canvas>

        <div className='absolute bottom-2 left-2'>
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt='jukebox'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className='w-10 h-10 cursor-pointer object-contain'
        />
      </div>
      </section>
  )
}

export default Home