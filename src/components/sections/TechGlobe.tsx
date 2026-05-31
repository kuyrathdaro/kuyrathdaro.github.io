import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Major global cities to act as glowing data nodes
const CITIES = [
  { name: 'New York', lat: 40.7128, lon: -74.0060 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
  { name: 'Paris', lat: 48.8566, lon: 2.3522 },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
  { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
  { name: 'Sao Paulo', lat: -23.5505, lon: -46.6333 },
  { name: 'Cape Town', lat: -33.9249, lon: 18.4241 },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
  { name: 'Shanghai', lat: 31.2304, lon: 121.4737 },
  { name: 'Moscow', lat: 55.7558, lon: 37.6173 },
  { name: 'Toronto', lat: 43.6510, lon: -79.3470 },
  { name: 'Seoul', lat: 37.5665, lon: 126.9780 },
];

const CONNECTIONS = [
  [0, 1], [1, 5], [5, 6], [6, 2], [2, 7], [7, 0], // Main global loop
  [1, 4], [4, 12], [0, 8], [8, 9], [5, 10], [10, 11], // Offshoots
  [11, 2], [2, 3], [6, 3], [13, 0], [14, 2]
];

// Helper to convert lat/lon to a 3D position on a sphere
function getPointOnSphere(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 90) * (Math.PI / 180); // +90 offset to align with earth texture map
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  
  return new THREE.Vector3(x, y, z);
}

function Arc({ start, end, height }: { start: THREE.Vector3, end: THREE.Vector3, height: number }) {
  const curve = useMemo(() => {
    // Elevate the midpoint to create an arc
    const mid = start.clone().lerp(end, 0.5).normalize().multiplyScalar(start.length() + height);
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end, height]);

  return (
    <mesh>
      <tubeGeometry args={[curve, 44, 0.015, 8, false]} />
      <meshBasicMaterial 
        color="#00ffff" 
        transparent 
        opacity={0.6} 
        blending={THREE.AdditiveBlending} 
        toneMapped={false} 
      />
    </mesh>
  );
}

function DataNodes({ radius }: { radius: number }) {
  return (
    <group>
      {/* Glowing City Nodes */}
      {CITIES.map((city, i) => {
        const pos = getPointOnSphere(city.lat, city.lon, radius);
        return (
          <group key={`node-${i}`} position={pos}>
            <mesh>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshBasicMaterial color="#ffffff" toneMapped={false} />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshBasicMaterial color="#00ffff" transparent opacity={0.6} blending={THREE.AdditiveBlending} toneMapped={false} />
            </mesh>
          </group>
        );
      })}
      
      {/* Network Connections */}
      {CONNECTIONS.map(([startIdx, endIdx], i) => {
        const start = getPointOnSphere(CITIES[startIdx].lat, CITIES[startIdx].lon, radius);
        const end = getPointOnSphere(CITIES[endIdx].lat, CITIES[endIdx].lon, radius);
        const dist = start.distanceTo(end);
        return <Arc key={`arc-${i}`} start={start} end={end} height={dist * 0.25} />;
      })}
    </group>
  );
}

function NeonGlobe({ radius }: { radius: number }) {
  const colorMap = useTexture('https://unpkg.com/three-globe/example/img/earth-night.jpg');
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Neon Wireframe core (fully transparent) */}
      <Sphere args={[radius, 32, 32]}>
        <meshBasicMaterial 
          color="#3b82f6" 
          wireframe 
          transparent 
          opacity={0.15} 
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Earth city lights layered with additive blending */}
      <Sphere args={[radius, 64, 64]}>
        <meshStandardMaterial 
          map={colorMap}
          emissiveMap={colorMap}
          emissive="#e879f9"
          emissiveIntensity={2}
          color="#e879f9" 
          blending={THREE.AdditiveBlending}
          transparent={true}
          opacity={1}
          toneMapped={false}
        />
      </Sphere>

      {/* Cyan Atmosphere Glow */}
      <Sphere args={[radius + 0.3, 32, 32]}>
        <meshBasicMaterial 
          color="#06b6d4" 
          transparent 
          opacity={0.2} 
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </Sphere>

      {/* Futuristic FUI orbital paths */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[radius + 0.8, 0.01, 16, 128]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.4} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[radius + 1.2, 0.008, 16, 128]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>
      
      {/* Data Nodes and Connections */}
      <DataNodes radius={radius + 0.02} />
    </group>
  );
}

export default function TechGlobe() {
  return (
    <div className="w-full h-full min-h-[680px] flex items-center justify-center relative">
      <Canvas gl={{ alpha: true, antialias: true }} dpr={[1, 2]} camera={{ position: [0, 0, 18], fov: 60 }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        
        {/* Background stars */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        {/* Glowing floating tech dust */}
        <Sparkles count={150} scale={20} size={2} speed={0.2} opacity={0.6} color="#e879f9" />
        <Sparkles count={150} scale={20} size={1} speed={0.4} opacity={0.5} color="#06b6d4" />

        <Suspense fallback={null}>
          <NeonGlobe radius={6.5} />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
        />
      </Canvas>
    </div>
  );
}
