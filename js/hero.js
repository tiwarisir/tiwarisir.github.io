import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const canvas = document.querySelector("#hero-canvas");

if (!canvas) {
    throw new Error("Hero canvas not found.");
}

const scene = new THREE.Scene();

scene.fog = new THREE.FogExp2(
    0x050608,
    0.035
);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


/* =========================
   LIGHTING
========================= */

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        0.5
    );

scene.add(ambientLight);

const pointLight =
    new THREE.PointLight(
        0x7affc5,
        45,
        35
    );

pointLight.position.set(
    3,
    3,
    5
);

scene.add(pointLight);


/* =========================
   SERVER
========================= */

const serverGroup =
    new THREE.Group();

scene.add(serverGroup);

const serverGeometry =
    new THREE.BoxGeometry(
        2.8,
        4.5,
        1.4
    );

const serverMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x18242a,
        metalness: 0.85,
        roughness: 0.2,

        emissive: 0x071812,
        emissiveIntensity: 0.8
    });

const server =
    new THREE.Mesh(
        serverGeometry,
        serverMaterial
    );

serverGroup.add(server);
const glowGeometry =
    new THREE.BoxGeometry(
        3.1,
        4.8,
        1.7
    );

const glowMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x3dffbd,
        transparent: true,
        opacity: 0.035
    });

const serverGlow =
    new THREE.Mesh(
        glowGeometry,
        glowMaterial
    );

serverGroup.add(serverGlow);


/* =========================
   SERVER RACK LIGHTS
========================= */

for (let i = 0; i < 8; i++) {

    const geometry =
        new THREE.BoxGeometry(
            2.3,
            0.025,
            0.04
        );

    const material =
        new THREE.MeshBasicMaterial({
            color: 0x72ffd0
        });

    const line =
        new THREE.Mesh(
            geometry,
            material
        );

    line.position.y =
        -1.6 + i * 0.45;

    line.position.z =
        0.73;

    serverGroup.add(line);
}


/* =========================
   NETWORK NODES
========================= */

const nodes = [];

const nodePositions = [

    [-4, 1.5, 0],
    [4, 1.2, 0],
    [-3, -2, 0],
    [3, -2, 0],
    [0, 3, 0]

];

nodePositions.forEach(
    (position) => {

        const geometry =
            new THREE.SphereGeometry(
                0.12,
                24,
                24
            );

        const material =
            new THREE.MeshBasicMaterial({
                color: 0x8dffd8
            });

        const node =
            new THREE.Mesh(
                geometry,
                material
            );

        node.position.set(
            ...position
        );

        scene.add(node);

        nodes.push(node);
    }
);


/* =========================
   NETWORK CONNECTIONS
========================= */

function createLine(start, end) {

    const points = [
        new THREE.Vector3(...start),
        new THREE.Vector3(...end)
    ];

    const geometry =
        new THREE.BufferGeometry()
            .setFromPoints(points);

    const material =
        new THREE.LineBasicMaterial({
            color: 0x4effc2,
            transparent: true,
            opacity: 0.35
        });

    const line =
        new THREE.Line(
            geometry,
            material
        );

    scene.add(line);
}

createLine(
    [-4, 1.5, 0],
    [0, 0, 0]
);

createLine(
    [4, 1.2, 0],
    [0, 0, 0]
);

createLine(
    [-3, -2, 0],
    [0, 0, 0]
);

createLine(
    [3, -2, 0],
    [0, 0, 0]
);

createLine(
    [0, 3, 0],
    [0, 0, 0]
);
/* =====================================================
   INFRASTRUCTURE WORLD
===================================================== */

const infrastructure =
    new THREE.Group();

scene.add(infrastructure);


/* =========================
   AWS CLOUD
========================= */

const awsGroup =
    new THREE.Group();

awsGroup.position.set(
    4.2,
    2.8,
    0.5
);

infrastructure.add(awsGroup);


/* cloud main body */

const cloudBody =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            0.55,
            24,
            24
        ),
        new THREE.MeshStandardMaterial({
            color: 0x142b31,
            emissive: 0x063d35,
            emissiveIntensity: 1,
            metalness: 0.5,
            roughness: 0.2
        })
    );

awsGroup.add(cloudBody);


/* cloud side nodes */

const cloudLeft =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            0.38,
            20,
            20
        ),
        cloudBody.material
    );

cloudLeft.position.set(
    -0.45,
    -0.05,
    0
);

awsGroup.add(cloudLeft);


const cloudRight =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            0.38,
            20,
            20
        ),
        cloudBody.material
    );

cloudRight.position.set(
    0.45,
    -0.05,
    0
);

awsGroup.add(cloudRight);


/* =========================
   EC2 NODE
========================= */

const ec2 =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            0.8,
            0.8,
            0.8
        ),
        new THREE.MeshStandardMaterial({
            color: 0x17252b,
            emissive: 0x075344,
            emissiveIntensity: 1,
            metalness: 0.7,
            roughness: 0.25
        })
    );

ec2.position.set(
    4.5,
    0.8,
    0.4
);

infrastructure.add(ec2);


/* =========================
   IAM NODE
========================= */

const iam =
    new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.4,
            0.4,
            0.8,
            6
        ),
        new THREE.MeshStandardMaterial({
            color: 0x162329,
            emissive: 0x063e35,
            emissiveIntensity: 0.8,
            metalness: 0.7,
            roughness: 0.3
        })
    );

iam.rotation.z =
    Math.PI / 2;

iam.position.set(
    5.7,
    -0.4,
    0.2
);

infrastructure.add(iam);


/* =========================
   LINUX NODE
========================= */

const linux =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            1.1,
            0.65,
            0.65
        ),
        new THREE.MeshStandardMaterial({
            color: 0x111a1e,
            emissive: 0x064638,
            emissiveIntensity: 1,
            metalness: 0.7,
            roughness: 0.25
        })
    );

linux.position.set(
    3.8,
    -2.7,
    0.4
);

infrastructure.add(linux);


/* =====================================================
   INFRASTRUCTURE CONNECTIONS
===================================================== */

const infrastructureLines = [];

function createInfraLine(
    start,
    end
) {

    const points = [
        new THREE.Vector3(...start),
        new THREE.Vector3(...end)
    ];

    const geometry =
        new THREE.BufferGeometry()
            .setFromPoints(points);

    const material =
        new THREE.LineBasicMaterial({
            color: 0x5effc9,
            transparent: true,
            opacity: 0.5
        });

    const line =
        new THREE.Line(
            geometry,
            material
        );

    scene.add(line);

    infrastructureLines.push(line);
}


/* AWS → EC2 */

createInfraLine(
    [4.2, 2.8, 0.5],
    [4.5, 0.8, 0.4]
);


/* EC2 → SERVER */

createInfraLine(
    [4.5, 0.8, 0.4],
    [1.4, 0, 0.4]
);


/* EC2 → IAM */

createInfraLine(
    [4.5, 0.8, 0.4],
    [5.7, -0.4, 0.2]
);


/* SERVER → LINUX */

createInfraLine(
    [1.4, 0, 0.4],
    [3.8, -2.7, 0.4]
);


/* =====================================================
   MOVING DATA PACKETS
===================================================== */

const packets = [];

function createPacket(
    start,
    end,
    speed = 0.004
) {

    const packet =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.055,
                12,
                12
            ),
            new THREE.MeshBasicMaterial({
                color: 0x9affdf
            })
        );

    scene.add(packet);

    packets.push({
        mesh: packet,
        start: new THREE.Vector3(...start),
        end: new THREE.Vector3(...end),
        progress: Math.random(),
        speed: speed
    });
}


/* AWS → EC2 */

createPacket(
    [4.2, 2.8, 0.5],
    [4.5, 0.8, 0.4],
    0.003
);


/* EC2 → SERVER */

createPacket(
    [4.5, 0.8, 0.4],
    [1.4, 0, 0.4],
    0.0025
);


/* EC2 → IAM */

createPacket(
    [4.5, 0.8, 0.4],
    [5.7, -0.4, 0.2],
    0.004
);


/* SERVER → LINUX */

createPacket(
    [1.4, 0, 0.4],
    [3.8, -2.7, 0.4],
    0.003
);

/* =========================
   PARTICLES
========================= */

const particleCount = 300;

const particlePositions =
    new Float32Array(
        particleCount * 3
    );

for (
    let i = 0;
    i < particleCount * 3;
    i += 3
) {

    particlePositions[i] =
        (Math.random() - 0.5) * 20;

    particlePositions[i + 1] =
        (Math.random() - 0.5) * 12;

    particlePositions[i + 2] =
        (Math.random() - 0.5) * 10;
}

const particleGeometry =
    new THREE.BufferGeometry();

particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        particlePositions,
        3
    )
);

const particleMaterial =
    new THREE.PointsMaterial({
        color: 0x8affd5,
        size: 0.025,
        transparent: true,
        opacity: 0.6
    });

const particles =
    new THREE.Points(
        particleGeometry,
        particleMaterial
    );

scene.add(particles);


/* =========================
   MOUSE
========================= */

let mouseX = 0;
let mouseY = 0;

window.addEventListener(
    "pointermove",
    (event) => {

        mouseX =
            event.clientX /
            window.innerWidth -
            0.5;

        mouseY =
            event.clientY /
            window.innerHeight -
            0.5;
    }
);


/* =========================
   ANIMATION
========================= */

const clock =
    new THREE.Clock();

function animate() {

    const elapsed =
        clock.getElapsedTime();

    serverGroup.rotation.y += 0.002;

    serverGroup.rotation.x =
        mouseY * 0.08;

    serverGroup.rotation.y +=
        mouseX * 0.001;

    particles.rotation.y =
        elapsed * 0.015;

    particles.rotation.x =
        mouseY * 0.04;

    nodes.forEach(
        (node, index) => {

            const scale =
                1 +
                Math.sin(
                    elapsed * 2 + index
                ) * 0.25;

            node.scale.setScalar(
                scale
            );
        }
    );
/* =========================
   DATA PACKET ANIMATION
========================= */

packets.forEach((packet) => {

    packet.progress += packet.speed;

    if (packet.progress >= 1) {
        packet.progress = 0;
    }

    packet.mesh.position.lerpVectors(
        packet.start,
        packet.end,
        packet.progress
    );

});
awsGroup.rotation.y =
    Math.sin(elapsed * 0.8) * 0.08;

ec2.rotation.y += 0.004;

iam.rotation.y += 0.006;

linux.rotation.y =
    Math.sin(elapsed) * 0.08;
    renderer.render(
        scene,
        camera
    );
}

renderer.setAnimationLoop(
    animate
);


/* =========================
   RESPONSIVE
========================= */

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );
    }
);