import { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import turtleScene from "../assets/3d/patsy_the_turtle.glb";

const Turtle = ({ isRotating, ...props }) => {
  const ref = useRef();
  const [scale, setScale] = useState([0.3, 0.3, 0.3]);

  // Load the 3D model and its animations
  const { scene, animations } = useGLTF(turtleScene);
  // Get animation actions associated with the plane
  const { actions } = useAnimations(animations, ref);

  // Debug: Log the loaded animations and actions
  useEffect(() => {
    console.log("Loaded animations:", animations);
    console.log("Loaded actions:", actions);
  }, [animations, actions]);

  // Use an effect to control the plane's animation based on 'isRotating'
  useEffect(() => {
    if (actions && actions["Scene"]) {
      if (isRotating) {
        actions["Scene"].play();
      } else {
        actions["Scene"].stop();
      }
    } else {
      console.warn("Animation action 'Scene' not found.");
    }
  }, [actions, isRotating]);

  // Function to calculate scale based on window dimensions
  const calculateScale = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scaleFactor = Math.min(width / 1000, height / 1000); // Adjust the divisor to fit your needs
    return [scaleFactor * 0.3, scaleFactor * 0.3, scaleFactor * 0.3];
  };

  // Effect to update the scale on window resize
  useEffect(() => {
    const handleResize = () => {
      setScale(calculateScale());
    };

    window.addEventListener("resize", handleResize);

    // Set initial scale
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <mesh scale={scale} {...props} ref={ref}>
      {/* Rotate the primitive element to make the turtle face sideways */}
      <primitive object={scene} rotation={[1, Math.PI / 2, 0.092]} />
    </mesh>
  );
};

export default Turtle;