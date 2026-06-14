import * as THREE from "three";

const slides = Array.from(document.querySelectorAll(".slide"));
const counter = document.getElementById("counter");
let currentSlide = 0;
let buildingAutoplayToken = 0;
let coverAutoplayToken = 0;
let apiTimers = [];
let currentApiStep = 0;
let requestTimers = [];
let systemTimers = [];
let slideEntryTimer = null;
let practiceTimer = null;
let practiceRemaining = 30 * 60;

const buildingCopy = [
  {
    label: "IDEA",
    title: "생각은 있지만 아직 아무것도 없습니다",
    description: "버튼도, 파일도, 데이터도 없습니다. AI에게 바로 “앱을 만들어줘”라고 하면 빈 땅에 기준 없이 건물을 올리는 것과 같습니다.",
    real: "빈 땅",
    code: "아이디어",
    camera: "SITE CAMERA · LAND",
  },
  {
    label: "PLANNING",
    title: "AI와 함께 서비스의 설계도를 그립니다",
    description: "누가 쓰는지, 어떤 화면과 기능이 필요한지 정리합니다. 설계 AI에게 생각을 프롬프트와 작업 순서로 바꾸게 합니다.",
    real: "건축 설계도",
    code: "기획 · 프롬프트",
    camera: "SITE CAMERA · BLUEPRINT",
  },
  {
    label: "STRUCTURE",
    title: "파일과 폴더가 서비스의 뼈대를 만듭니다",
    description: "AI IDE가 프로젝트를 만들고 페이지, 컴포넌트, 스타일, 설정 파일을 세웁니다. 아직 사용자는 살 수 없는 골조 상태입니다.",
    real: "철골 구조",
    code: "프로젝트 · 파일 구조",
    camera: "SITE CAMERA · FRAME",
  },
  {
    label: "EXTERIOR",
    title: "가장 먼저 눈에 보이는 화면이 완성됩니다",
    description: "버튼, 카드, 메뉴, 색상, 애니메이션이 붙습니다. 바이브코딩 입문자가 가장 즐거워하는 구간이지만 아직 내부 기능은 확인하지 않았습니다.",
    real: "건물 외관",
    code: "UI · 프론트엔드",
    camera: "SITE CAMERA · FACADE",
  },
  {
    label: "INSPECTION",
    title: "카메라가 들어가 보니 내부가 비어 있습니다",
    description: "배선, 수도, 조명, 방 구조가 없습니다. 앱도 로그인, 저장, 데이터, 오류 처리가 없으면 겉은 예뻐도 실제로 사용할 수 없습니다.",
    real: "비어 있는 내부",
    code: "기능이 연결되지 않은 앱",
    camera: "INTERIOR CAMERA · EMPTY",
  },
  {
    label: "SYSTEMS",
    title: "조명과 수도, 방과 업무공간이 채워집니다",
    description: "건물에는 설비와 인테리어가 들어오고, 바이브코딩에서는 로그인, DB, API, 상태 같은 기능을 연결합니다. 개발 용어는 AI에게 필요한 내부 공사를 설명하는 말입니다.",
    real: "조명 · 배관 · 공간 · 인테리어",
    code: "로그인 · DB · API · 상태",
    camera: "INTERIOR CAMERA · FIT-OUT",
  },
  {
    label: "COMPLETION",
    title: "모든 공정을 마치고 정식으로 준공합니다",
    description: "외관과 내부가 모두 완성되고 사람이 실제로 사용할 수 있습니다. 서비스도 화면과 기능을 점검한 뒤 배포하면 비로소 운영 가능한 결과물이 됩니다.",
    real: "준공 · 입주 시작",
    code: "테스트 · 배포 · 운영",
    camera: "DRONE CAMERA · GRAND OPEN",
  },
];

const buildingSceneKinds = ["SITE", "PLAN", "FRAME", "FACADE", "INTERIOR", "FIT-OUT", "COMPLETE"];

const termCopy = {
  frontend: {
    en: "FRONTEND",
    title: "손님이 보고 주문하는 카운터",
    description: "버튼, 메뉴, 카드, 입력창, 애니메이션처럼 화면에 보이는 모든 영역입니다.",
    place: "주문 카운터",
    word: "프론트엔드",
  },
  backend: {
    en: "BACKEND",
    title: "주문을 규칙에 따라 처리하는 주방",
    description: "로그인 여부, 재고, 결제, 저장 규칙처럼 화면 뒤에서 판단하고 실행하는 영역입니다.",
    place: "주방",
    word: "백엔드",
  },
  database: {
    en: "DATABASE",
    title: "돈과 기록을 보관하는 금고",
    description: "회원, 게시글, 상품, 주문처럼 나중에 다시 불러올 정보를 보관하는 영역입니다.",
    place: "금고 · 기록실",
    word: "데이터베이스",
  },
  api: {
    en: "API",
    title: "외부 거래처와 이어지는 납품 통로",
    description: "내 화면과 서버, AI, 결제, 지도 같은 외부 서비스를 요청과 응답으로 이어줍니다.",
    place: "납품 통로",
    word: "API",
  },
};

class BuildingSimulation {
  constructor(canvas) {
    this.canvas = canvas;
    this.stage = 0;
    this.clock = new THREE.Clock();
    this.cameraTarget = new THREE.Vector3();
    this.cameraPositionTarget = new THREE.Vector3();
    this.lookTarget = new THREE.Vector3();
    this.resizeObserver = null;
    this.animatedObjects = [];
    this.blueprintLines = [];
    this.structureMembers = [];
    this.detailMembers = [];
    this.stageStartedAt = 0;
    this.cameraFovTarget = 42;
    this.worldRotationTarget = 0;
    this.disposed = false;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.28;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x080c14, 0.025);
    this.camera = new THREE.PerspectiveCamera(42, 1, 0.1, 120);
    this.camera.position.set(13, 9, 15);
    this.lookTarget.set(0, 2.6, 0);

    this.world = new THREE.Group();
    this.scene.add(this.world);

    this.addLights();
    this.createGround();
    this.createSiteContext();
    this.createBlueprint();
    this.createStructure();
    this.createExterior();
    this.createInterior();
    this.createDetails();
    this.createCompletionDetails();

    this.setStage(0, true);
    this.resize();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas.parentElement);
    this.animate();
  }

  material(color, options = {}) {
    const material = new THREE.MeshStandardMaterial({
      color,
      roughness: options.roughness ?? 0.55,
      metalness: options.metalness ?? 0.18,
      transparent: true,
      opacity: options.opacity ?? 1,
      emissive: options.emissive ?? 0x000000,
      emissiveIntensity: options.emissiveIntensity ?? 0,
      side: options.side ?? THREE.FrontSide,
    });
    material.userData.baseOpacity = options.opacity ?? 1;
    return material;
  }

  register(object, targetScale = 1) {
    object.userData.targetScale = targetScale;
    object.userData.targetOpacity = 1;
    object.userData.baseScale = object.scale.clone();
    this.animatedObjects.push(object);
    return object;
  }

  setObjectTarget(object, visible, scale = 1, opacity = 1) {
    object.visible = true;
    object.userData.targetScale = visible ? scale : 0.001;
    object.userData.targetOpacity = visible ? opacity : 0;
  }

  setMaterialOpacity(object, opacity) {
    object.traverse((child) => {
      if (!child.material) return;
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => {
        if (material.userData.baseOpacity == null) {
          material.userData.baseOpacity = material.opacity ?? 1;
        }
        material.transparent = true;
        material.opacity = material.userData.baseOpacity * opacity;
      });
    });
  }

  addLights() {
    this.scene.add(new THREE.HemisphereLight(0xb8ddff, 0x16202a, 2.2));
    const key = new THREE.DirectionalLight(0xffffff, 3.2);
    key.position.set(8, 14, 10);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 40;
    key.shadow.camera.left = -12;
    key.shadow.camera.right = 12;
    key.shadow.camera.top = 12;
    key.shadow.camera.bottom = -12;
    this.scene.add(key);

    const cyan = new THREE.PointLight(0x6ee7f2, 28, 28);
    cyan.position.set(-5, 5, 6);
    this.scene.add(cyan);

    const amber = new THREE.PointLight(0xffd166, 18, 20);
    amber.position.set(6, 3, -4);
    this.scene.add(amber);
  }

  createGround() {
    this.groundGroup = this.register(new THREE.Group());
    this.world.add(this.groundGroup);

    const base = new THREE.Mesh(
      new THREE.BoxGeometry(13, 0.45, 9.5),
      this.material(0x1b2d31, { roughness: 0.86, metalness: 0.05 })
    );
    base.position.y = -0.25;
    this.groundGroup.add(base);

    const grid = new THREE.GridHelper(12.5, 18, 0x6ee7f2, 0x284452);
    grid.position.y = 0.01;
    grid.material.transparent = true;
    grid.material.opacity = 0.34;
    this.groundGroup.add(grid);

    for (const [x, z] of [[-5, -3.4], [5, -3.4], [-5, 3.4], [5, 3.4]]) {
      const marker = new THREE.Mesh(
        new THREE.CylinderGeometry(0.11, 0.11, 0.08, 24),
        this.material(0xffd166, { emissive: 0xffd166, emissiveIntensity: 1.6 })
      );
      marker.position.set(x, 0.08, z);
      this.groundGroup.add(marker);
    }
  }

  createSiteContext() {
    this.siteContextGroup = this.register(new THREE.Group());
    this.world.add(this.siteContextGroup);

    const asphalt = new THREE.Mesh(
      new THREE.BoxGeometry(18, 0.1, 3.2),
      this.material(0x20262b, { roughness: 0.96, metalness: 0 })
    );
    asphalt.position.set(0, -0.08, 6.2);
    this.siteContextGroup.add(asphalt);

    const sidewalk = new THREE.Mesh(
      new THREE.BoxGeometry(18, 0.16, 1.25),
      this.material(0x626a6c, { roughness: 0.88, metalness: 0.02 })
    );
    sidewalk.position.set(0, 0, 4.15);
    this.siteContextGroup.add(sidewalk);

    for (let x = -7.4; x <= 7.4; x += 2.1) {
      const lane = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.015, 0.08),
        this.material(0xc5b879, { emissive: 0x5f5426, emissiveIntensity: 0.28, roughness: 0.72 })
      );
      lane.position.set(x, -0.015, 6.2);
      this.siteContextGroup.add(lane);
    }

    const crane = new THREE.Group();
    const craneMaterial = this.material(0xd3a849, {
      roughness: 0.42,
      metalness: 0.58,
      emissive: 0x5a4210,
      emissiveIntensity: 0.18,
    });
    const mast = new THREE.Mesh(new THREE.BoxGeometry(0.24, 7.5, 0.24), craneMaterial);
    mast.position.y = 3.75;
    crane.add(mast);
    for (let y = 0.5; y < 7.2; y += 0.72) {
      const brace = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.07, 0.07), craneMaterial);
      brace.position.y = y;
      brace.rotation.z = y % 1.44 < 0.7 ? 0.55 : -0.55;
      crane.add(brace);
    }
    const jib = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.18, 0.18), craneMaterial);
    jib.position.set(2.85, 7.25, 0);
    crane.add(jib);
    const counterJib = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.22, 0.22), craneMaterial);
    counterJib.position.set(-1.15, 7.25, 0);
    crane.add(counterJib);
    const cable = new THREE.Mesh(
      new THREE.CylinderGeometry(0.018, 0.018, 4.2, 8),
      this.material(0x77838b, { roughness: 0.28, metalness: 0.72 })
    );
    cable.position.set(4.8, 5.15, 0);
    crane.add(cable);
    const hook = new THREE.Mesh(
      new THREE.TorusGeometry(0.16, 0.035, 8, 20, Math.PI * 1.5),
      this.material(0x9ca6ab, { roughness: 0.3, metalness: 0.8 })
    );
    hook.position.set(4.8, 3.05, 0);
    crane.add(hook);
    crane.position.set(-7, 0, -2.8);
    this.siteContextGroup.add(crane);
    this.craneJib = crane;

    const materialColors = [0x8f5a4c, 0x596d76, 0x9a844f];
    for (let stack = 0; stack < 3; stack += 1) {
      for (let level = 0; level < 3; level += 1) {
        const bundle = new THREE.Mesh(
          new THREE.BoxGeometry(1.5, 0.16, 0.55),
          this.material(materialColors[stack], { roughness: 0.72, metalness: stack === 1 ? 0.5 : 0.08 })
        );
        bundle.position.set(5.4 + stack * 0.35, 0.13 + level * 0.18, -3 + stack * 1.05);
        bundle.rotation.y = stack * 0.18;
        this.siteContextGroup.add(bundle);
      }
    }
  }

  createBlueprint() {
    this.blueprintGroup = this.register(new THREE.Group());
    this.world.add(this.blueprintGroup);

    const points = [
      new THREE.Vector3(-3.2, 0.08, -2.3),
      new THREE.Vector3(3.2, 0.08, -2.3),
      new THREE.Vector3(3.2, 0.08, 2.3),
      new THREE.Vector3(-3.2, 0.08, 2.3),
    ];
    const loopGeometry = new THREE.BufferGeometry().setFromPoints([...points, points[0]]);
    const loop = new THREE.Line(
      loopGeometry,
      new THREE.LineBasicMaterial({ color: 0x6ee7f2, transparent: true, opacity: 1 })
    );
    this.blueprintGroup.add(loop);
    this.blueprintLines.push(loop);

    for (let x = -2.4; x <= 2.4; x += 1.2) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, 0.1, -2.25),
        new THREE.Vector3(x, 0.1, 2.25),
      ]);
      const guide = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ color: 0x62e99a, transparent: true, opacity: 0.72 })
      );
      this.blueprintGroup.add(guide);
      this.blueprintLines.push(guide);
    }

    for (let z = -1.5; z <= 1.5; z += 1) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-3.15, 0.11, z),
        new THREE.Vector3(3.15, 0.11, z),
      ]);
      const guide = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ color: 0x7ea6ff, transparent: true, opacity: 0.62 })
      );
      this.blueprintGroup.add(guide);
      this.blueprintLines.push(guide);
    }

    const towerWireframe = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(6.4, 6.6, 4.6)),
      new THREE.LineBasicMaterial({ color: 0x6ee7f2, transparent: true, opacity: 0.78 })
    );
    towerWireframe.position.y = 3.38;
    this.blueprintGroup.add(towerWireframe);
    this.blueprintLines.push(towerWireframe);

    for (let floor = 1; floor < 8; floor += 1) {
      const y = 0.45 + floor * 0.82;
      const floorGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-3.15, y, -2.25),
        new THREE.Vector3(3.15, y, -2.25),
        new THREE.Vector3(3.15, y, 2.25),
        new THREE.Vector3(-3.15, y, 2.25),
        new THREE.Vector3(-3.15, y, -2.25),
      ]);
      const floorLine = new THREE.Line(
        floorGeometry,
        new THREE.LineBasicMaterial({
          color: floor % 2 ? 0x62e99a : 0x7ea6ff,
          transparent: true,
          opacity: 0.48,
        })
      );
      this.blueprintGroup.add(floorLine);
      this.blueprintLines.push(floorLine);
    }

    const coreWireframe = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(1.45, 6.4, 1.55)),
      new THREE.LineBasicMaterial({ color: 0xffd166, transparent: true, opacity: 0.66 })
    );
    coreWireframe.position.set(0.85, 3.3, -0.25);
    this.blueprintGroup.add(coreWireframe);
    this.blueprintLines.push(coreWireframe);

    this.blueprintLines.forEach((line) => {
      const count = line.geometry.getAttribute("position")?.count || 0;
      line.userData.drawCount = count;
      line.geometry.setDrawRange(0, 0);
    });
  }

  createStructure() {
    this.structureGroup = this.register(new THREE.Group());
    this.world.add(this.structureGroup);
    const steel = this.material(0xff6f7d, {
      roughness: 0.35,
      metalness: 0.72,
      emissive: 0x5a1018,
      emissiveIntensity: 0.35,
    });
    const cyanSteel = this.material(0x6ee7f2, {
      roughness: 0.34,
      metalness: 0.68,
      emissive: 0x123c43,
      emissiveIntensity: 0.4,
    });
    const height = 6.6;

    for (const x of [-3, 0, 3]) {
      for (const z of [-2.1, 2.1]) {
        const column = new THREE.Mesh(new THREE.BoxGeometry(0.18, height, 0.18), steel);
        column.position.set(x, height / 2, z);
        column.userData.delay = (x + 3) * 0.05 + (z + 2.1) * 0.03;
        this.structureGroup.add(column);
        this.structureMembers.push(column);
      }
    }

    for (let floor = 0; floor <= 7; floor += 1) {
      const y = 0.45 + floor * 0.86;
      if (floor > 0) {
        const slab = new THREE.Mesh(
          new THREE.BoxGeometry(6.15, 0.08, 4.25),
          this.material(0x87939a, { roughness: 0.74, metalness: 0.12, opacity: 0.74 })
        );
        slab.position.set(0, y - 0.05, 0);
        this.structureGroup.add(slab);
        this.structureMembers.push(slab);
      }
      for (const z of [-2.1, 2.1]) {
        const beam = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.13, 0.13), cyanSteel);
        beam.position.set(0, y, z);
        this.structureGroup.add(beam);
        this.structureMembers.push(beam);
      }
      for (const x of [-3, 0, 3]) {
        const beam = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.13, 4.35), cyanSteel);
        beam.position.set(x, y, 0);
        this.structureGroup.add(beam);
        this.structureMembers.push(beam);
      }
    }
    this.structureMembers.forEach((member, index) => {
      member.userData.buildIndex = index;
      member.userData.originalScale = member.scale.clone();
    });
  }

  createExterior() {
    this.exteriorGroup = this.register(new THREE.Group());
    this.world.add(this.exteriorGroup);

    const glass = this.material(0xadc5da, {
      roughness: 0.2,
      metalness: 0.42,
      opacity: 0.86,
      side: THREE.DoubleSide,
    });
    const darkGlass = this.material(0x34465c, {
      roughness: 0.22,
      metalness: 0.48,
      opacity: 0.92,
      emissive: 0x10263a,
      emissiveIntensity: 0.28,
      side: THREE.DoubleSide,
    });

    const front = new THREE.Mesh(new THREE.BoxGeometry(6.2, 6.6, 0.16), glass);
    front.position.set(0, 3.35, 2.18);
    this.exteriorGroup.add(front);

    const back = new THREE.Mesh(new THREE.BoxGeometry(6.2, 6.6, 0.16), darkGlass);
    back.position.set(0, 3.35, -2.18);
    this.exteriorGroup.add(back);

    for (const x of [-3.08, 3.08]) {
      const side = new THREE.Mesh(new THREE.BoxGeometry(0.16, 6.6, 4.35), darkGlass);
      side.position.set(x, 3.35, 0);
      this.exteriorGroup.add(side);
    }

    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(6.35, 0.2, 4.5),
      this.material(0x22374a, { roughness: 0.44, metalness: 0.62 })
    );
    roof.position.y = 6.7;
    this.exteriorGroup.add(roof);

    this.windowMaterials = [];
    for (let floor = 0; floor < 7; floor += 1) {
      for (let col = 0; col < 7; col += 1) {
        const material = this.material(0x9bdcff, {
          roughness: 0.1,
          metalness: 0.25,
          emissive: 0x245a73,
          emissiveIntensity: 0.32,
        });
        this.windowMaterials.push(material);
        const windowMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.54, 0.48), material);
        windowMesh.position.set(-2.4 + col * 0.8, 0.75 + floor * 0.84, 2.275);
        this.exteriorGroup.add(windowMesh);
      }
    }

    const podium = new THREE.Mesh(
      new THREE.BoxGeometry(8.1, 1.25, 6),
      this.material(0x48566a, { roughness: 0.55, metalness: 0.35 })
    );
    podium.position.y = 0.58;
    podium.position.x = 0.45;
    this.exteriorGroup.add(podium);

    const mullionMaterial = this.material(0x27343d, { roughness: 0.3, metalness: 0.76 });
    for (let x = -2.8; x <= 2.8; x += 0.8) {
      const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.055, 5.95, 0.06), mullionMaterial);
      mullion.position.set(x, 3.65, 2.37);
      this.exteriorGroup.add(mullion);
    }
    for (let y = 1.25; y <= 6.3; y += 0.84) {
      const transom = new THREE.Mesh(new THREE.BoxGeometry(5.75, 0.055, 0.06), mullionMaterial);
      transom.position.set(0, y, 2.37);
      this.exteriorGroup.add(transom);
    }

    const entranceFrame = new THREE.Mesh(
      new THREE.BoxGeometry(2.05, 1.95, 0.18),
      this.material(0x1d2a31, { roughness: 0.3, metalness: 0.7 })
    );
    entranceFrame.position.set(0, 1.15, 3.08);
    this.exteriorGroup.add(entranceFrame);
    const entranceGlass = new THREE.Mesh(
      new THREE.BoxGeometry(1.7, 1.65, 0.08),
      this.material(0x8fb6c5, { roughness: 0.1, metalness: 0.32, opacity: 0.64 })
    );
    entranceGlass.position.set(0, 1.15, 3.2);
    this.exteriorGroup.add(entranceGlass);
  }

  createInterior() {
    this.interiorGroup = this.register(new THREE.Group());
    this.world.add(this.interiorGroup);
    this.interiorClutterGroup = this.register(new THREE.Group());
    this.world.add(this.interiorClutterGroup);

    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(7.5, 0.16, 7.5),
      this.material(0x222b36, { roughness: 0.82, metalness: 0.04 })
    );
    floor.position.set(0, 0, 0);
    floor.receiveShadow = true;
    this.interiorGroup.add(floor);

    const backWall = new THREE.Mesh(
      new THREE.BoxGeometry(7.5, 5.4, 0.16),
      this.material(0x4b5566, { roughness: 0.92 })
    );
    backWall.position.set(0, 2.7, -3.65);
    this.interiorGroup.add(backWall);

    for (const x of [-3.65, 3.65]) {
      const wall = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 5.4, 7.5),
        this.material(0x394352, { roughness: 0.92 })
      );
      wall.position.set(x, 2.7, 0);
      this.interiorGroup.add(wall);
    }

    for (let i = 0; i < 5; i += 1) {
      const loose = new THREE.Mesh(
        new THREE.TorusGeometry(0.28 + i * 0.04, 0.025, 8, 28),
        this.material(i % 2 ? 0xffd166 : 0xff6f7d, {
          emissive: i % 2 ? 0x5a4412 : 0x5a111a,
          emissiveIntensity: 0.5,
        })
      );
      loose.rotation.x = Math.PI / 2;
      loose.rotation.z = i * 0.62;
      loose.position.set(-2.2 + i * 1.1, 0.18, -0.8 + (i % 2) * 1.6);
      this.interiorClutterGroup.add(loose);
    }
  }

  createDetails() {
    this.detailsGroup = this.register(new THREE.Group());
    this.world.add(this.detailsGroup);

    const finishFloor = new THREE.Group();
    const plankMaterial = this.material(0x6f5945, { roughness: 0.72, metalness: 0.03 });
    for (let row = 0; row < 10; row += 1) {
      for (let col = 0; col < 8; col += 1) {
        const plank = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.045, 0.7), plankMaterial);
        plank.position.set(-3.05 + col * 0.88 + (row % 2 ? 0.22 : 0), 0.11, -3.05 + row * 0.7);
        finishFloor.add(plank);
      }
    }
    this.detailsGroup.add(finishFloor);

    const glassMaterial = this.material(0x8fb2bd, {
      roughness: 0.08,
      metalness: 0.2,
      opacity: 0.24,
      side: THREE.DoubleSide,
    });
    for (const [x, z, sx, sz] of [
      [0, -1.4, 0.13, 4.4],
      [-1.8, 1.25, 3.6, 0.13],
      [1.8, 1.25, 3.6, 0.13],
    ]) {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(sx, 2.9, sz), glassMaterial);
      wall.position.set(x, 1.62, z);
      this.detailsGroup.add(wall);
    }

    const frameMaterial = this.material(0x26333d, { roughness: 0.32, metalness: 0.72 });
    for (const [x, z, sx, sz] of [
      [0, -1.4, 0.09, 4.5],
      [-1.8, 1.25, 3.7, 0.09],
      [1.8, 1.25, 3.7, 0.09],
    ]) {
      for (const y of [0.2, 3.02]) {
        const frame = new THREE.Mesh(new THREE.BoxGeometry(sx || 0.09, 0.08, sz || 0.09), frameMaterial);
        frame.position.set(x, y, z);
        this.detailsGroup.add(frame);
      }
    }

    const accentWall = new THREE.Group();
    const woodSlat = this.material(0x7a6048, { roughness: 0.76, metalness: 0.02 });
    for (let index = 0; index < 22; index += 1) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(0.08, 3.4, 0.12), woodSlat);
      slat.position.set(-2.65 + index * 0.25, 1.8, -3.47);
      accentWall.add(slat);
    }
    this.detailsGroup.add(accentWall);

    const identityPanel = new THREE.Mesh(
      new THREE.BoxGeometry(2.55, 0.82, 0.1),
      this.material(0x172a32, {
        roughness: 0.28,
        metalness: 0.55,
        emissive: 0x123b45,
        emissiveIntensity: 0.9,
      })
    );
    identityPanel.position.set(0, 3.05, -3.38);
    this.detailsGroup.add(identityPanel);
    for (const [x, height] of [[-0.48, 0.28], [0, 0.48], [0.48, 0.36]]) {
      const mark = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, height, 0.06),
        this.material(0x89e5ec, {
          roughness: 0.15,
          emissive: 0x3ba8b1,
          emissiveIntensity: 1.8,
        })
      );
      mark.position.set(x, 3.05, -3.31);
      this.detailsGroup.add(mark);
    }

    const pipeMaterial = this.material(0x5d8791, {
      roughness: 0.3,
      metalness: 0.65,
      emissive: 0x15343a,
      emissiveIntensity: 0.35,
    });
    for (const x of [-2.5, 2.5]) {
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 6.3, 16), pipeMaterial);
      pipe.rotation.z = Math.PI / 2;
      pipe.position.set(0, 3.9 + x * 0.05, x > 0 ? 2.7 : -2.7);
      this.detailsGroup.add(pipe);
    }

    const cableMaterial = this.material(0xc8a55f, {
      roughness: 0.25,
      metalness: 0.38,
      emissive: 0x5b4210,
      emissiveIntensity: 0.75,
    });
    for (let z = -2.4; z <= 2.4; z += 1.2) {
      const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 6.2, 10), cableMaterial);
      cable.rotation.z = Math.PI / 2;
      cable.position.set(0, 4.5, z);
      this.detailsGroup.add(cable);
    }

    const furnitureMaterial = this.material(0x7b6958, { roughness: 0.68, metalness: 0.06 });
    const furnitureFrameMaterial = this.material(0x2b3540, { roughness: 0.36, metalness: 0.72 });
    for (const [x, z] of [[-2.2, -2], [1.8, -2], [-2.1, 2], [2.1, 2]]) {
      const deskGroup = new THREE.Group();
      const deskTop = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.12, 0.88), furnitureMaterial);
      deskTop.position.y = 0.78;
      deskTop.castShadow = true;
      deskGroup.add(deskTop);
      for (const legX of [-0.72, 0.72]) {
        for (const legZ of [-0.34, 0.34]) {
          const leg = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.72, 0.075), furnitureFrameMaterial);
          leg.position.set(legX, 0.38, legZ);
          leg.castShadow = true;
          deskGroup.add(leg);
        }
      }
      const screen = new THREE.Mesh(
        new THREE.BoxGeometry(0.82, 0.62, 0.08),
        this.material(0xa8d9e8, {
          emissive: 0x24586b,
          emissiveIntensity: 0.9,
          roughness: 0.18,
        })
      );
      screen.position.set(0, 1.25, -0.2);
      screen.castShadow = true;
      deskGroup.add(screen);
      const monitorStand = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.28, 0.08), furnitureFrameMaterial);
      monitorStand.position.set(0, 0.95, -0.2);
      deskGroup.add(monitorStand);
      const keyboard = new THREE.Mesh(
        new THREE.BoxGeometry(0.58, 0.035, 0.2),
        this.material(0x26313b, { roughness: 0.52, metalness: 0.45 })
      );
      keyboard.position.set(0, 0.86, 0.15);
      deskGroup.add(keyboard);
      deskGroup.position.set(x, 0, z);
      this.detailsGroup.add(deskGroup);
    }

    this.interiorLights = [];
    for (const [x, z] of [[-2.3, -2.3], [2.3, -2.3], [-2.3, 2.3], [2.3, 2.3]]) {
      const fixture = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.08, 0.42),
        this.material(0xfff2b0, {
          emissive: 0xffd166,
          emissiveIntensity: 2.2,
          roughness: 0.1,
        })
      );
      fixture.position.set(x, 4.7, z);
      this.detailsGroup.add(fixture);

      const light = new THREE.PointLight(0xffe4a4, 5.5, 8);
      light.position.set(x, 4.25, z);
      this.detailsGroup.add(light);
      this.interiorLights.push(light);
    }

    const meetingTable = new THREE.Mesh(
      new THREE.BoxGeometry(2.7, 0.16, 1.15),
      this.material(0x6c5947, { roughness: 0.72, metalness: 0.04 })
    );
    meetingTable.position.set(0, 0.82, -0.1);
    meetingTable.castShadow = true;
    this.detailsGroup.add(meetingTable);
    const tableLeg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.18, 0.78, 18),
      this.material(0x2e3947, { roughness: 0.42, metalness: 0.7 })
    );
    tableLeg.position.set(0, 0.4, -0.1);
    this.detailsGroup.add(tableLeg);

    for (const [x, z, rotation] of [
      [-1.75, -0.1, Math.PI / 2],
      [1.75, -0.1, -Math.PI / 2],
      [-0.8, -1, 0],
      [0.8, -1, 0],
      [-0.8, 0.8, Math.PI],
      [0.8, 0.8, Math.PI],
    ]) {
      const chair = new THREE.Group();
      const chairMaterial = this.material(0x32414d, { roughness: 0.82, metalness: 0.08 });
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.12, 0.5), chairMaterial);
      seat.position.y = 0.48;
      seat.castShadow = true;
      chair.add(seat);
      const back = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.62, 0.1), chairMaterial);
      back.position.set(0, 0.78, 0.22);
      back.castShadow = true;
      chair.add(back);
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 0.42, 12), furnitureFrameMaterial);
      stem.position.y = 0.23;
      chair.add(stem);
      chair.position.set(x, 0, z);
      chair.rotation.y = rotation;
      this.detailsGroup.add(chair);
    }

    for (const x of [-0.7, 0.7]) {
      const pendantCable = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.018, 1.05, 10),
        furnitureFrameMaterial
      );
      pendantCable.position.set(x, 3.85, -0.1);
      this.detailsGroup.add(pendantCable);
      const pendant = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.42, 0.26, 24),
        this.material(0x39434c, {
          roughness: 0.3,
          metalness: 0.68,
          emissive: 0x6b4d1b,
          emissiveIntensity: 0.55,
        })
      );
      pendant.position.set(x, 3.28, -0.1);
      pendant.castShadow = true;
      this.detailsGroup.add(pendant);
      const pendantLight = new THREE.PointLight(0xffd89a, 4.5, 5.5);
      pendantLight.position.set(x, 3.05, -0.1);
      this.detailsGroup.add(pendantLight);
    }

    const rug = new THREE.Mesh(
      new THREE.BoxGeometry(3.1, 0.035, 2.15),
      this.material(0x304c53, { roughness: 0.98, metalness: 0 })
    );
    rug.position.set(-1.8, 0.16, 1.9);
    this.detailsGroup.add(rug);

    const sofaMaterial = this.material(0x83969b, { roughness: 0.92, metalness: 0.02 });
    const sofaSeat = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.48, 0.82), sofaMaterial);
    sofaSeat.position.set(-1.8, 0.47, 2.15);
    sofaSeat.castShadow = true;
    this.detailsGroup.add(sofaSeat);
    const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.78, 0.24), sofaMaterial);
    sofaBack.position.set(-1.8, 0.82, 2.48);
    sofaBack.castShadow = true;
    this.detailsGroup.add(sofaBack);
    const coffeeTable = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.55, 0.08, 32),
      this.material(0x2f3940, { roughness: 0.32, metalness: 0.55 })
    );
    coffeeTable.position.set(-1.8, 0.38, 0.95);
    this.detailsGroup.add(coffeeTable);

    for (const [x, z] of [[-3.05, 2.85], [3.05, -2.7]]) {
      const planter = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.34, 0.52, 24),
        this.material(0x4d5657, { roughness: 0.85, metalness: 0.08 })
      );
      planter.position.set(x, 0.37, z);
      this.detailsGroup.add(planter);
      const plant = new THREE.Mesh(
        new THREE.SphereGeometry(0.52, 24, 18),
        this.material(0x365f4d, { roughness: 0.95, metalness: 0 })
      );
      plant.scale.set(0.72, 1.25, 0.72);
      plant.position.set(x, 1.03, z);
      this.detailsGroup.add(plant);
    }

    const sinkBase = new THREE.Mesh(
      new THREE.BoxGeometry(1.15, 0.82, 0.7),
      this.material(0xb9c4cd, { roughness: 0.5, metalness: 0.32 })
    );
    sinkBase.position.set(2.75, 0.42, 2.7);
    this.detailsGroup.add(sinkBase);
    const faucet = new THREE.Mesh(
      new THREE.TorusGeometry(0.2, 0.035, 10, 24, Math.PI),
      this.material(0x89a9b6, { roughness: 0.2, metalness: 0.82 })
    );
    faucet.position.set(2.75, 1.02, 2.7);
    faucet.rotation.z = Math.PI / 2;
    this.detailsGroup.add(faucet);

    const ceilingGrid = new THREE.Group();
    const ceilingMaterial = this.material(0x6e5b48, { roughness: 0.76, metalness: 0.03 });
    for (let x = -2.8; x <= 2.8; x += 0.38) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 6.3), ceilingMaterial);
      slat.position.set(x, 4.82, 0);
      ceilingGrid.add(slat);
    }
    this.detailsGroup.add(ceilingGrid);

    this.detailsGroup.traverse((object) => {
      if (!object.isMesh) return;
      object.userData.detailIndex = this.detailMembers.length;
      object.userData.originalScale = object.scale.clone();
      this.detailMembers.push(object);
    });
  }

  createCompletionDetails() {
    this.completionGroup = this.register(new THREE.Group());
    this.world.add(this.completionGroup);

    const plaza = new THREE.Mesh(
      new THREE.BoxGeometry(11.8, 0.12, 8.4),
      this.material(0x39434d, { roughness: 0.82, metalness: 0.08 })
    );
    plaza.position.y = 0.02;
    this.completionGroup.add(plaza);

    const canopy = new THREE.Mesh(
      new THREE.BoxGeometry(3.5, 0.18, 1.45),
      this.material(0x9bb5c5, { roughness: 0.25, metalness: 0.7 })
    );
    canopy.position.set(0, 1.85, 3.25);
    this.completionGroup.add(canopy);

    for (const x of [-1.45, 1.45]) {
      const support = new THREE.Mesh(
        new THREE.BoxGeometry(0.11, 1.85, 0.11),
        this.material(0x71818d, { roughness: 0.3, metalness: 0.76 })
      );
      support.position.set(x, 0.92, 3.25);
      this.completionGroup.add(support);
    }

    for (const [x, z, rotation] of [
      [-4.2, -2.9, 0],
      [4.2, -2.9, 0],
      [-4.2, 2.8, 0],
      [4.2, 2.8, 0],
    ]) {
      const planter = new THREE.Mesh(
        new THREE.BoxGeometry(1.55, 0.36, 0.68),
        this.material(0x5f6669, { roughness: 0.78, metalness: 0.12 })
      );
      planter.position.set(x, 0.2, z);
      planter.rotation.y = rotation;
      this.completionGroup.add(planter);
      const hedge = new THREE.Mesh(
        new THREE.BoxGeometry(1.3, 0.42, 0.48),
        this.material(0x315547, { roughness: 0.94, metalness: 0 })
      );
      hedge.position.set(x, 0.58, z);
      hedge.rotation.y = rotation;
      this.completionGroup.add(hedge);
    }

    this.rooftopBeacon = new THREE.PointLight(0xffd9a3, 18, 18);
    this.rooftopBeacon.position.set(0, 7.25, 0);
    this.completionGroup.add(this.rooftopBeacon);
    const beaconFixture = new THREE.Mesh(
      new THREE.CylinderGeometry(0.13, 0.2, 0.36, 18),
      this.material(0xffd9a3, {
        emissive: 0xffc56b,
        emissiveIntensity: 2.4,
        roughness: 0.18,
      })
    );
    beaconFixture.position.set(0, 7.02, 0);
    this.completionGroup.add(beaconFixture);

    for (const x of [-3.8, -2.2, 2.2, 3.8]) {
      const pathLight = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.5, 0.1),
        this.material(0xffe4aa, {
          emissive: 0xffcb71,
          emissiveIntensity: 2,
          roughness: 0.12,
        })
      );
      pathLight.position.set(x, 0.28, 3.65);
      this.completionGroup.add(pathLight);
    }
  }

  setStage(stage, immediate = false) {
    this.stage = Number(stage);
    this.stageStartedAt = this.clock.elapsedTime;
    const showBlueprint = stage >= 1 && stage <= 3;
    const showStructure = stage >= 2 && stage <= 3;
    const showExterior = stage === 3 || stage === 6;
    const showInterior = stage === 4 || stage === 5;
    const showInteriorClutter = stage === 4;
    const showDetails = stage === 5;
    const showCompletion = stage === 6;

    this.setObjectTarget(this.groundGroup, stage !== 4 && stage !== 5, 1, stage === 6 ? 0.9 : 1);
    this.setObjectTarget(this.siteContextGroup, stage <= 3 || stage === 6, 1, stage === 6 ? 0.82 : 1);
    this.setObjectTarget(this.blueprintGroup, showBlueprint, 1, stage === 3 ? 0.26 : 1);
    this.setObjectTarget(this.structureGroup, showStructure, 1, stage === 3 ? 0.25 : 1);
    this.setObjectTarget(this.exteriorGroup, showExterior, 1, 1);
    this.setObjectTarget(this.interiorGroup, showInterior, 1, 1);
    this.setObjectTarget(this.interiorClutterGroup, showInteriorClutter, 1, 1);
    this.setObjectTarget(this.detailsGroup, showDetails, 1, 1);
    this.setObjectTarget(this.completionGroup, showCompletion, 1, 1);

    const positions = [
      [11.5, 7.7, 12.5],
      [6.7, 5.6, 7.2],
      [7.1, 4.9, 7.6],
      [7.6, 5.1, 8.2],
      [0, 4.25, 8.7],
      [-0.45, 4.05, 8.15],
      [8.6, 5.7, 9.4],
    ];
    const looks = [
      [0, 0.4, 0],
      [0, 0.2, 0],
      [0, 3.1, 0],
      [0, 3.2, 0],
      [0, 1.65, -0.65],
      [0, 1.55, -0.75],
      [0, 3.1, 0],
    ];
    this.cameraPositionTarget.set(...positions[stage]);
    this.cameraTarget.set(...looks[stage]);
    this.cameraFovTarget = [44, 38, 40, 38, 46, 44, 40][stage];
    this.worldRotationTarget = [0.08, -0.12, 0.1, -0.08, 0, 0.02, -0.08][stage];

    this.windowMaterials.forEach((material, index) => {
      material.emissiveIntensity = stage === 6 ? 1.55 + (index % 4) * 0.18 : 0.32;
      material.color.set(stage === 6 && index % 3 ? 0xffd98a : 0x9bdcff);
    });

    if (immediate) {
      this.camera.position.copy(this.cameraPositionTarget);
      this.lookTarget.copy(this.cameraTarget);
      this.animatedObjects.forEach((object) => {
        const scale = object.userData.targetScale ?? 1;
        object.scale.setScalar(scale);
        this.setMaterialOpacity(object, object.userData.targetOpacity ?? 1);
      });
    }
  }

  resize() {
    const host = this.canvas.parentElement;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    this.renderer.setSize(rect.width, rect.height, false);
    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();
  }

  animate = () => {
    if (this.disposed) return;
    const delta = Math.min(this.clock.getDelta(), 0.05);
    const elapsed = this.clock.elapsedTime;
    const stageAge = Math.max(0, elapsed - this.stageStartedAt);

    this.camera.position.lerp(this.cameraPositionTarget, 1 - Math.pow(0.018, delta));
    this.lookTarget.lerp(this.cameraTarget, 1 - Math.pow(0.018, delta));
    this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, this.cameraFovTarget, 1 - Math.pow(0.025, delta));
    this.camera.updateProjectionMatrix();
    this.world.rotation.y = THREE.MathUtils.lerp(this.world.rotation.y, this.worldRotationTarget, 1 - Math.pow(0.02, delta));
    this.camera.lookAt(this.lookTarget);

    this.animatedObjects.forEach((object) => {
      const target = object.userData.targetScale ?? 1;
      const scale = THREE.MathUtils.lerp(object.scale.x, target, 1 - Math.pow(0.025, delta));
      object.scale.setScalar(Math.max(0.001, scale));
      let currentOpacity = 1;
      object.traverse((child) => {
        if (!child.material || currentOpacity !== 1) return;
        const material = Array.isArray(child.material) ? child.material[0] : child.material;
        currentOpacity = material.opacity ?? 1;
      });
      const nextOpacity = THREE.MathUtils.lerp(
        currentOpacity,
        object.userData.targetOpacity ?? 1,
        1 - Math.pow(0.02, delta)
      );
      this.setMaterialOpacity(object, nextOpacity);
      if (nextOpacity < 0.005 && target < 0.01) object.visible = false;
    });

    if (this.blueprintGroup.visible) {
      this.blueprintGroup.rotation.y = Math.sin(elapsed * 0.5) * 0.018;
      this.blueprintLines.forEach((line, index) => {
        const progress = THREE.MathUtils.clamp(stageAge * 0.85 - index * 0.055, 0, 1);
        line.geometry.setDrawRange(0, Math.ceil(line.userData.drawCount * progress));
      });
    }

    if (this.structureGroup.visible && this.stage === 2) {
      this.structureMembers.forEach((member, index) => {
        const progress = THREE.MathUtils.smootherstep(stageAge - index * 0.025, 0, 0.8);
        const base = member.userData.originalScale;
        member.scale.set(base.x, Math.max(0.01, base.y * progress), base.z);
      });
    } else if (this.structureGroup.visible) {
      this.structureMembers.forEach((member) => member.scale.copy(member.userData.originalScale));
    }

    if (this.detailsGroup.visible && this.stage === 5) {
      this.detailMembers.forEach((member, index) => {
        const progress = THREE.MathUtils.smootherstep(stageAge - index * 0.008, 0, 0.65);
        const base = member.userData.originalScale;
        member.scale.set(base.x * progress, base.y * progress, base.z * progress);
      });
    }

    if (this.completionGroup.visible && this.rooftopBeacon) {
      this.rooftopBeacon.intensity = 15 + Math.sin(elapsed * 2.2) * 3;
    }

    if (this.craneJib?.visible && this.stage <= 3) {
      this.craneJib.rotation.y = -0.08 + Math.sin(elapsed * 0.18) * 0.07;
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  };
}

let buildingSimulation = null;

function showSlide(index) {
  currentSlide = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slide, slideIndex) => slide.classList.toggle("active", slideIndex === currentSlide));
  counter.textContent = `${currentSlide + 1} / ${slides.length}`;
  clearTimeout(slideEntryTimer);
  if (currentSlide === 1 && buildingSimulation) {
    requestAnimationFrame(() => buildingSimulation.resize());
  }
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function setBuildingStage(stage) {
  const numericStage = Number(stage);
  const copy = buildingCopy[numericStage] || buildingCopy[0];
  const lab = document.getElementById("building-lab");
  lab.dataset.stage = String(numericStage);
  lab.querySelectorAll("[data-building-stage]").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.buildingStage) === numericStage);
  });
  document.getElementById("building-label").textContent = copy.label;
  document.getElementById("building-title").textContent = copy.title;
  document.getElementById("building-description").textContent = copy.description;
  document.getElementById("building-real").textContent = copy.real;
  document.getElementById("building-code").textContent = copy.code;
  document.getElementById("camera-status-text").textContent = copy.camera;
  document.getElementById("build-scene-number").textContent = String(numericStage + 1).padStart(2, "0");
  document.getElementById("build-scene-kind").textContent = buildingSceneKinds[numericStage];
  document.getElementById("building-meter").style.width = `${((numericStage + 1) / 7) * 100}%`;
  buildingSimulation?.setStage(numericStage);
}

async function playBuilding() {
  const token = ++buildingAutoplayToken;
  for (let stage = 0; stage < 7; stage += 1) {
    if (token !== buildingAutoplayToken) return;
    setBuildingStage(stage);
    await wait(stage === 4 ? 2400 : 1900);
  }
}

function selectTerm(term) {
  const copy = termCopy[term] || termCopy.frontend;
  const building = document.getElementById("term-building");
  if (building) building.dataset.term = term;
  document.querySelectorAll("[data-term]").forEach((button) => {
    button.classList.toggle("active", button.dataset.term === term);
  });
  document.getElementById("term-en").textContent = copy.en;
  document.getElementById("term-title").textContent = copy.title;
  document.getElementById("term-description").textContent = copy.description;
  document.getElementById("term-place").textContent = copy.place;
  document.getElementById("term-word").textContent = copy.word;
}

const frontendExampleCopy = {
  commerce: {
    label: "쇼핑몰",
    title: "비교하고 선택하고 구매하는 화면",
    components: "검색 · 상품 카드 · 장바구니 · 결제 상태",
    question: "사용자가 상품을 찾고 주문 완료까지 막히지 않는가?",
    markup: `
      <div class="example-commerce">
        <label><span>원하는 상품 검색</span><i>⌕</i></label>
        <div><article><i></i><b>조명</b><small>129,000원</small></article><article><i></i><b>스피커</b><small>89,000원</small></article></div>
        <button type="button">장바구니 2</button>
      </div>`,
  },
  community: {
    label: "커뮤니티",
    title: "글을 읽고 반응하고 대화하는 화면",
    components: "게시글 · 작성 버튼 · 댓글 · 좋아요 · 알림",
    question: "새 글과 새로운 반응을 쉽게 발견하고 참여할 수 있는가?",
    markup: `
      <div class="example-community">
        <nav><b>새 글</b><span>인기</span><span>팔로잉</span></nav>
        <article><i>김</i><div><b>오늘 만든 프로젝트를 공유합니다</b><span>댓글 12 · 좋아요 38</span></div></article>
        <article><i>박</i><div><b>배포 오류를 이렇게 해결했어요</b><span>댓글 7 · 저장 21</span></div></article>
        <button type="button">글 작성</button>
      </div>`,
  },
  booking: {
    label: "예약",
    title: "날짜와 조건을 고르고 확정하는 화면",
    components: "달력 · 시간 선택 · 인원 · 예약 확인",
    question: "이미 선택한 조건과 남은 단계를 계속 확인할 수 있는가?",
    markup: `
      <div class="example-booking">
        <div class="mini-calendar"><b>6월</b><span>9</span><span>10</span><span class="on">11</span><span>12</span><span>13</span></div>
        <div class="mini-time"><button>14:00</button><button class="on">15:30</button><button>17:00</button></div>
        <p><span>성인 2명</span><b>6월 11일 · 15:30</b></p>
        <button type="button">예약 확정</button>
      </div>`,
  },
  dashboard: {
    label: "관리자 화면",
    title: "많은 상태를 비교하고 처리하는 화면",
    components: "필터 · 표 · 상태 배지 · 통계 · 일괄 작업",
    question: "중요한 변화와 지금 처리할 항목이 먼저 보이는가?",
    markup: `
      <div class="example-dashboard">
        <div class="mini-metrics"><span><small>오늘 주문</small><b>128</b></span><span><small>처리 필요</small><b>7</b></span><span><small>매출</small><b>₩4.2M</b></span></div>
        <div class="mini-table"><b>주문 번호</b><b>상태</b><span>#240611-18</span><i>결제 완료</i><span>#240611-17</span><i class="warn">확인 필요</i></div>
        <button type="button">선택 항목 처리</button>
      </div>`,
  },
};

function selectFrontendExample(kind) {
  const panel = document.getElementById("frontend-reference");
  const shell = document.getElementById("site-shell");
  const copy = frontendExampleCopy[kind] || frontendExampleCopy.commerce;
  if (!panel) return;
  panel.dataset.example = kind;
  if (shell) shell.dataset.service = kind;
  document.getElementById("frontend-example-label").textContent = copy.label;
  document.getElementById("frontend-example-title").textContent = copy.title;
  document.getElementById("frontend-example-components").textContent = copy.components;
  document.getElementById("frontend-example-question").textContent = copy.question;
  document.getElementById("frontend-example-ui").innerHTML = copy.markup;
  document.querySelectorAll("[data-frontend-example]").forEach((button) => {
    button.classList.toggle("active", button.dataset.frontendExample === kind);
  });
}

const uxScenarioCopy = {
  checkout: {
    badKicker: "CHECKOUT A",
    badTitle: "방향을 잃는 결제",
    goodKicker: "CHECKOUT B",
    goodTitle: "한눈에 읽히는 결제",
    goal: "결제 완료",
    badRunning: "경로 탐색 중",
    goodRunning: "결제 진행 중",
    badDone: "4.8초 · 완료",
    goodDone: "1.4초 · 완료",
    badResultTitle: "탐색 4회",
    badResultCopy: "현재 단계와 최종 금액을 알기 어렵습니다",
    goodResultTitle: "선택 1회",
    goodResultCopy: "현재 위치, 금액, 다음 행동이 분명합니다",
    badMarkup: `<div class="ux-mock-head"><strong>주문서</strong><span>단계 표시 없음</span></div><div class="ux-chip-row"><button>쿠폰</button><button>주소</button><button>결제수단</button></div><div class="ux-field-stack"><i></i><i></i></div><div class="ux-action-row"><button>확인</button><button>다음</button></div><div class="ux-late-note"><span>배송비가 마지막에 추가됨</span><b>31,000원</b></div>`,
    goodMarkup: `<div class="ux-mock-head"><strong>결제</strong><span>3 / 3</span></div><div class="ux-stepper"><i></i><i></i><i></i><span>장바구니</span><span>배송</span><span>결제</span></div><div class="ux-summary-row"><span>워크북</span><b>28,000원</b><span>배송비</span><b>3,000원</b></div><div class="ux-total"><span>최종 결제금액</span><strong>31,000원</strong></div><button class="ux-primary">31,000원 결제하기</button><small class="ux-help">결제 후 주문 완료 화면으로 이동합니다</small>`,
  },
  signup: {
    badKicker: "SIGN UP A",
    badTitle: "한 화면에 쏟아지는 가입",
    goodKicker: "SIGN UP B",
    goodTitle: "필요한 것부터 묻는 가입",
    goal: "회원가입 완료",
    badRunning: "입력칸 확인 중",
    goodRunning: "1단계 입력 중",
    badDone: "5.2초 · 이탈",
    goodDone: "1.8초 · 다음",
    badResultTitle: "입력 8개",
    badResultCopy: "왜 필요한지 모르는 정보가 한꺼번에 보입니다",
    goodResultTitle: "입력 2개",
    goodResultCopy: "현재 단계와 필요한 이유를 확인할 수 있습니다",
    badMarkup: `<div class="ux-mock-head"><strong>회원가입</strong><span>필수 항목 *</span></div><div class="ux-form-grid"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><p class="ux-muted">약관 6개에 모두 동의해야 합니다</p><button class="ux-disabled">가입</button>`,
    goodMarkup: `<div class="ux-mock-head"><strong>계정 만들기</strong><span>1 / 3</span></div><div class="ux-step-line"><i></i></div><label class="ux-labelled-field"><span>이메일</span><b>수업 안내를 받을 주소</b></label><label class="ux-labelled-field"><span>비밀번호</span><b>8자 이상 입력</b></label><button class="ux-primary">다음 단계</button><small class="ux-help">다음에는 이름과 이용약관을 확인합니다</small>`,
  },
  search: {
    badKicker: "SEARCH A",
    badTitle: "막다른 검색 결과",
    goodKicker: "SEARCH B",
    goodTitle: "다음 선택을 주는 검색",
    goal: "원하는 정보 찾기",
    badRunning: "결과 확인 중",
    goodRunning: "대안 탐색 중",
    badDone: "4.2초 · 중단",
    goodDone: "1.6초 · 발견",
    badResultTitle: "결과 0개",
    badResultCopy: "빈 화면 외에는 다음 행동이 없습니다",
    goodResultTitle: "대안 3개",
    goodResultCopy: "오타 교정, 필터, 관련 항목으로 계속 탐색합니다",
    badMarkup: `<div class="ux-search-box"><span>워크스페이스 렘프</span><button>검색</button></div><div class="ux-empty-result"><b>검색 결과가 없습니다</b><span>다른 검색어를 입력하세요</span></div>`,
    goodMarkup: `<div class="ux-search-box"><span>워크스페이스 램프</span><button>검색</button></div><p class="ux-suggestion">‘렘프’ 대신 ‘램프’ 결과를 보여드립니다</p><div class="ux-filter-row"><button>조명</button><button>10만원대</button><button>재고 있음</button></div><div class="ux-result-item"><i></i><span><b>워크스페이스 램프</b><small>오늘 출고 · 129,000원</small></span></div>`,
  },
  recovery: {
    badKicker: "ERROR A",
    badTitle: "원인을 숨기는 오류",
    goodKicker: "ERROR B",
    goodTitle: "되돌아올 길을 주는 오류",
    goal: "작성 내용 복구",
    badRunning: "처음부터 재입력",
    goodRunning: "저장 내용 복원",
    badDone: "5.0초 · 포기",
    goodDone: "1.5초 · 복구",
    badResultTitle: "입력 초기화",
    badResultCopy: "무엇이 틀렸는지 모르고 작성 내용도 사라집니다",
    goodResultTitle: "내용 유지",
    goodResultCopy: "원인, 해결법, 재시도 버튼이 같은 자리에 있습니다",
    badMarkup: `<div class="ux-error-box"><b>오류가 발생했습니다</b><span>다시 시도해 주세요</span></div><div class="ux-field-stack"><i></i><i></i><i></i></div><button class="ux-disabled">확인</button>`,
    goodMarkup: `<div class="ux-mock-head"><strong>프로젝트 저장</strong><span>자동 저장됨</span></div><div class="ux-preserved-copy"><b>작성한 내용은 그대로 보관했습니다</b><span>이미지 용량이 10MB를 초과했습니다</span></div><div class="ux-recovery-actions"><button>이미지 바꾸기</button><button class="ux-primary">다시 저장</button></div><small class="ux-help">허용 용량: 이미지 한 장당 10MB 이하</small>`,
  },
};

const uxInsightCopy = {
  checkout: {
    bad: ["다음 행동이 여러 개입니다", "주소, 쿠폰, 결제수단과 두 개의 버튼 사이에서 사용자가 순서를 판단해야 합니다."],
    good: ["다음 행동이 하나로 보입니다", "현재 단계와 최종 금액을 확인한 뒤 한 개의 결제 버튼으로 완료합니다."],
  },
  signup: {
    bad: ["처음부터 너무 많이 묻습니다", "필요한 이유를 모르는 입력칸과 약관이 한 화면에 쌓여 시작하기 어렵습니다."],
    good: ["필요한 정보부터 나눠 묻습니다", "진행 단계를 보여주고 지금 필요한 이메일과 비밀번호에만 집중시킵니다."],
  },
  search: {
    bad: ["막힌 뒤의 선택지가 없습니다", "검색 결과가 없다는 말만 있어 오타를 고치거나 조건을 바꿀 방법을 찾기 어렵습니다."],
    good: ["실패 뒤의 다음 길을 보여줍니다", "오타 교정, 필터, 관련 상품을 제안해 탐색이 끊기지 않게 합니다."],
  },
  recovery: {
    bad: ["문제와 해결법이 보이지 않습니다", "오류 원인은 숨기고 작성한 내용까지 사라져 사용자가 처음부터 다시 해야 합니다."],
    good: ["내용을 지키고 복구 방법을 줍니다", "작성 내용을 보존한 채 원인, 제한 조건, 재시도 버튼을 같은 위치에 보여줍니다."],
  },
};

let currentUxScenario = "checkout";

function selectUxScenario(kind) {
  const copy = uxScenarioCopy[kind] || uxScenarioCopy.checkout;
  currentUxScenario = kind;
  const race = document.getElementById("ux-race");
  race.classList.remove("running");
  race.classList.remove("inspect-bad", "inspect-good");
  race.dataset.scenario = kind;
  document.getElementById("bad-kicker").textContent = copy.badKicker;
  document.getElementById("bad-title").textContent = copy.badTitle;
  document.getElementById("good-kicker").textContent = copy.goodKicker;
  document.getElementById("good-title").textContent = copy.goodTitle;
  document.getElementById("ux-goal").textContent = copy.goal;
  document.getElementById("bad-time").textContent = "대기 중";
  document.getElementById("good-time").textContent = "대기 중";
  document.getElementById("bad-result-title").textContent = copy.badResultTitle;
  document.getElementById("bad-result-copy").textContent = copy.badResultCopy;
  document.getElementById("good-result-title").textContent = copy.goodResultTitle;
  document.getElementById("good-result-copy").textContent = copy.goodResultCopy;
  document.getElementById("bad-scenario-content").innerHTML = copy.badMarkup;
  document.getElementById("good-scenario-content").innerHTML = copy.goodMarkup;
  const insight = uxInsightCopy[kind] || uxInsightCopy.checkout;
  document.getElementById("bad-insight-title").textContent = insight.bad[0];
  document.getElementById("bad-insight-copy").textContent = insight.bad[1];
  document.getElementById("good-insight-title").textContent = insight.good[0];
  document.getElementById("good-insight-copy").textContent = insight.good[1];
  document.querySelectorAll("[data-ux-scenario]").forEach((button) => {
    button.classList.toggle("active", button.dataset.uxScenario === kind);
  });
}

function inspectUx(side) {
  const race = document.getElementById("ux-race");
  const className = side === "good" ? "inspect-good" : "inspect-bad";
  const wasActive = race.classList.contains(className);
  race.classList.remove("inspect-bad", "inspect-good");
  if (!wasActive) race.classList.add(className);
}

function runUxRace() {
  const race = document.getElementById("ux-race");
  const copy = uxScenarioCopy[currentUxScenario];
  race.classList.remove("running");
  document.getElementById("bad-time").textContent = copy.badRunning;
  document.getElementById("good-time").textContent = copy.goodRunning;
  void race.offsetWidth;
  race.classList.add("running");
  setTimeout(() => { document.getElementById("good-time").textContent = copy.goodDone; }, 1450);
  setTimeout(() => { document.getElementById("bad-time").textContent = copy.badDone; }, 4850);
}

const animationCopy = {
  menu: {
    label: "메뉴 전환",
    title: "새 화면이 어디에서 나타났는지 보여줍니다",
    copy: "메뉴가 갑자기 생기는 대신 화면 가장자리에서 들어오면 구조를 이해하기 쉽습니다.",
  },
  loading: {
    label: "로딩 전환",
    title: "기다리는 동안 무엇이 준비되는지 알려줍니다",
    copy: "빈 화면 대신 콘텐츠의 자리를 먼저 보여주면 사용자는 멈춘 것이 아니라 처리 중임을 압니다.",
  },
  cart: {
    label: "장바구니 이동",
    title: "선택한 상품과 바뀐 숫자를 한 흐름으로 연결합니다",
    copy: "상품이 장바구니 방향으로 이동하고 숫자가 바뀌면 행동의 결과를 즉시 이해할 수 있습니다.",
  },
  success: {
    label: "완료 전환",
    title: "작업이 끝났고 다음 행동이 가능하다는 확신을 줍니다",
    copy: "완료 표시와 짧은 안내가 함께 나타나면 사용자는 같은 버튼을 다시 누르지 않습니다.",
  },
  tabs: {
    label: "탭 전환",
    title: "같은 화면 안에서 현재 보고 있는 위치를 알려줍니다",
    copy: "선택 표시가 이동하고 콘텐츠가 이어서 바뀌면 페이지를 떠나지 않고도 위치 변화를 이해할 수 있습니다.",
  },
  validation: {
    label: "입력 검증",
    title: "문제가 생긴 입력칸과 해결 방법을 바로 연결합니다",
    copy: "빨간 테두리만 깜빡이는 대신 오류가 난 자리와 고쳐야 할 형식을 함께 보여줘야 합니다.",
  },
  accordion: {
    label: "내용 펼치기",
    title: "필요한 순간에만 상세 내용을 열어 정보 밀도를 조절합니다",
    copy: "질문과 답변, 배송 안내처럼 긴 내용은 제목을 먼저 보여주고 선택했을 때 주변 화면과 함께 자연스럽게 펼칩니다.",
  },
  page: {
    label: "페이지 연결",
    title: "목록에서 선택한 대상이 상세 화면으로 이어졌음을 보여줍니다",
    copy: "화면이 완전히 끊기는 대신 선택한 카드의 방향과 다음 화면의 제목이 이어지면 이동 관계를 놓치지 않습니다.",
  },
  favorite: {
    label: "좋아요 반응",
    title: "작은 저장 행동에도 결과와 저장 위치를 함께 알려줍니다",
    copy: "아이콘의 상태, 짧은 움직임, 저장 안내가 함께 바뀌면 사용자는 같은 버튼을 반복해서 누르지 않습니다.",
  },
  scroll: {
    label: "스크롤 위치",
    title: "긴 페이지에서 지금 읽는 구간과 남은 길이를 보여줍니다",
    copy: "상단 진행선과 현재 구간 표시를 사용하면 사용자는 페이지 안에서 방향을 잃지 않습니다.",
  },
};

function playAnimationDemo(kind) {
  const preview = document.getElementById("animation-preview");
  if (!preview) return;
  const copy = animationCopy[kind] || animationCopy.menu;
  preview.classList.remove("playing");
  preview.dataset.demo = kind;
  void preview.offsetWidth;
  preview.classList.add("playing");
  document.getElementById("animation-caption-label").textContent = copy.label;
  document.getElementById("animation-caption-title").textContent = copy.title;
  document.getElementById("animation-caption-copy").textContent = copy.copy;
  document.querySelectorAll("[data-animation-demo]").forEach((button) => {
    button.classList.toggle("active", button.dataset.animationDemo === kind);
  });
}

function selectAnimationGroup(group) {
  const catalog = document.querySelector(".animation-catalog");
  if (!catalog) return;
  catalog.dataset.animationGroup = group;
  document.querySelectorAll("[data-animation-group-select]").forEach((button) => {
    button.classList.toggle("active", button.dataset.animationGroupSelect === group);
  });
  const firstVisible = catalog.querySelector(`[data-animation-group-item="${group}"]`);
  if (firstVisible) playAnimationDemo(firstVisible.dataset.animationDemo);
}

function clearTimerList(list) {
  list.forEach(clearTimeout);
  list.length = 0;
}

const orderJourneyCopy = [
  ["READY", "브라우저에서 주문을 기다리는 중"],
  ["REQUEST", "상품, 수량, 금액을 주문 요청으로 접수합니다"],
  ["AUTH", "로그인한 사용자인지 권한을 확인합니다"],
  ["INVENTORY", "상품 재고 12개 중 1개를 확보합니다"],
  ["PAYMENT", "39,000원 결제 승인을 요청합니다"],
  ["DATABASE", "주문 번호와 구매 내역을 저장합니다"],
  ["RESPONSE", "완료 응답이 브라우저로 돌아갑니다"],
  ["200 OK", "주문 완료 화면으로 갱신되었습니다"],
];

const orderJourneyIo = [
  ["상품 · 수량 · 금액", "주문 대기"],
  ["상품 1개 · 39,000원", "주문 요청 생성"],
  ["사용자 ID", "로그인 확인"],
  ["상품 ID · 수량 1개", "재고 1개 확보"],
  ["결제수단 · 39,000원", "결제 승인"],
  ["주문자 · 상품 · 결제", "주문 #2406 저장"],
  ["처리 결과", "200 OK 응답"],
  ["200 OK", "주문 완료 화면"],
];

function setOrderJourneyStep(step) {
  const journey = document.getElementById("order-journey");
  const numericStep = Math.max(0, Math.min(7, Number(step) || 0));
  journey.dataset.step = String(numericStep);
  journey.classList.remove("running");
  void journey.offsetWidth;
  if (numericStep > 0) journey.classList.add("running");
  const [label, message] = orderJourneyCopy[numericStep];
  const [input, output] = orderJourneyIo[numericStep];
  document.getElementById("journey-status-label").textContent = label;
  document.getElementById("journey-status").textContent = message;
  document.getElementById("journey-input").textContent = input;
  document.getElementById("journey-output").textContent = output;
  document.querySelectorAll("[data-order-step]").forEach((button) => {
    const buttonStep = Number(button.dataset.orderStep);
    button.classList.toggle("active", buttonStep === numericStep);
    button.classList.toggle("complete", buttonStep < numericStep);
  });
}

function runOrderJourney() {
  const journey = document.getElementById("order-journey");
  const current = Number(journey.dataset.step) || 0;
  setOrderJourneyStep(current >= 7 ? 1 : current + 1);
}

function resetOrderJourney() {
  setOrderJourneyStep(0);
}

const dbFlowCopy = {
  signup: {
    envelope: "회원 기록",
    envelopeCopy: "김바이브 · vibe@example.com",
    result: "회원정보 창고에 새 기록을 보관합니다",
    word: "저장",
    feedbackTitle: "회원가입 정보를 전송합니다",
    feedbackCopy: "회원정보 창고에 새 기록이 만들어집니다.",
    operationCode: "CREATE",
    operationCopy: "새 회원 기록 생성",
  },
  login: {
    envelope: "회원 찾기",
    envelopeCopy: "vibe@example.com 회원이 있나요?",
    result: "회원정보 창고에서 같은 기록을 찾아 비교합니다",
    word: "조회",
    feedbackTitle: "입력한 정보와 회원 기록을 비교합니다",
    feedbackCopy: "같은 이메일과 비밀번호 기록을 찾아 로그인합니다.",
    operationCode: "READ",
    operationCopy: "기존 회원 기록 조회",
  },
  post: {
    envelope: "게시글 기록",
    envelopeCopy: "첫 프로젝트 · 김바이브",
    result: "게시글 창고에 새 글을 보관합니다",
    word: "저장",
    feedbackTitle: "게시글 제목과 내용을 전송합니다",
    feedbackCopy: "게시글 창고에 작성자와 함께 새 기록을 남깁니다.",
    operationCode: "CREATE",
    operationCopy: "새 게시글 기록 생성",
  },
  order: {
    envelope: "주문 기록",
    envelopeCopy: "램프 1개 · 주문 #2406",
    result: "상품 재고를 11개로 바꾸고 주문내역을 보관합니다",
    word: "수정 + 저장",
    feedbackTitle: "결제된 주문 정보를 전송합니다",
    feedbackCopy: "상품 재고를 줄이고 주문내역 창고에 새 기록을 남깁니다.",
    operationCode: "UPDATE + CREATE",
    operationCopy: "재고 수정 후 주문 생성",
  },
};

function selectDbFlow(flow) {
  const scene = document.getElementById("warehouse-scene");
  const copy = dbFlowCopy[flow] || dbFlowCopy.signup;
  const preview = document.getElementById("db-browser-preview");
  scene.dataset.flow = "";
  preview.dataset.flow = "";
  void scene.offsetWidth;
  scene.dataset.flow = flow;
  preview.dataset.flow = flow;
  document.getElementById("record-envelope-title").textContent = copy.envelope;
  document.getElementById("record-envelope-copy").textContent = copy.envelopeCopy;
  document.getElementById("warehouse-task").textContent = copy.result;
  document.getElementById("record-result-word").textContent = copy.word;
  document.getElementById("db-feedback-title").textContent = copy.feedbackTitle;
  document.getElementById("db-feedback-copy").textContent = copy.feedbackCopy;
  document.getElementById("db-operation-code").textContent = copy.operationCode;
  document.getElementById("db-operation-copy").textContent = copy.operationCopy;
  document.getElementById("stock-record").textContent = flow === "order" ? "램프 재고 12개 → 11개" : "램프 재고 12개";
  document.querySelectorAll("[data-db-flow]").forEach((button) => {
    button.classList.toggle("active", button.dataset.dbFlow === flow);
  });
}

function toggleApiError() {
  const stage = document.getElementById("api-stage");
  stage.classList.toggle("error-mode");
  const button = document.querySelector('[data-action="toggle-api-error"]');
  button.textContent = stage.classList.contains("error-mode") ? "연결 복구" : "연결 끊기";
  resetApi();
}

const apiStepCopy = [
  ["연결 준비", "내 화면은 외부 서비스의 답을 기다리고 있습니다.", "--°", "날씨 정보를 기다리는 중", "외출 전에 현재 날씨를 확인합니다."],
  ["요청을 만들었습니다", "내 서비스가 “서울 날씨”라는 요청을 API 창구로 보냅니다.", "...", "요청을 보내는 중", "화면에서 필요한 정보를 부탁합니다."],
  ["API 약속을 확인합니다", "요청 주소와 필요한 값이 약속에 맞는지 확인합니다.", "...", "요청 형식을 확인하는 중", "API는 서로 이해할 수 있는 요청 형식을 사용합니다."],
  ["외부 서비스가 처리합니다", "기상 정보 제공처가 서울의 현재 데이터를 찾습니다.", "...", "외부 서비스 처리 중", "내 서비스 밖의 시스템이 요청을 처리합니다."],
  ["응답이 화면에 도착했습니다", "24도와 맑음이라는 답이 내 서비스 화면에 표시됩니다.", "24°", "맑음 · 산책하기 좋은 날", "API로 받은 답이 내 화면의 정보가 되었습니다."],
];

function setApiStep(step) {
  clearTimerList(apiTimers);
  const stage = document.getElementById("api-stage");
  const numericStep = Math.max(0, Math.min(4, Number(step) || 0));
  currentApiStep = numericStep;
  stage.classList.remove("running");
  stage.dataset.step = String(numericStep);
  const failed = stage.classList.contains("error-mode") && numericStep >= 3;
  stage.dataset.result = failed ? "error" : numericStep === 4 ? "success" : "ready";
  const copy = apiStepCopy[numericStep];
  document.getElementById("api-result-title").textContent = failed ? "외부 서비스에 연결하지 못했습니다" : copy[0];
  document.getElementById("api-result-copy").textContent = failed ? "연결을 복구한 뒤 같은 단계에서 다시 시도할 수 있습니다." : copy[1];
  document.getElementById("weather-temperature").textContent = failed ? "--°" : copy[2];
  document.getElementById("weather-condition").textContent = failed ? "정보를 가져오지 못했습니다" : copy[3];
  document.getElementById("weather-extra").textContent = failed ? "연결 상태를 확인한 뒤 다시 시도하세요." : copy[4];
  document.querySelectorAll("[data-api-step]").forEach((button) => {
    const buttonStep = Number(button.dataset.apiStep);
    button.classList.toggle("active", buttonStep === numericStep);
    button.classList.toggle("complete", buttonStep < numericStep);
  });
  void stage.offsetWidth;
  if (numericStep > 0) stage.classList.add("running");
}

function nextApiStep() {
  setApiStep(currentApiStep >= 4 ? 1 : currentApiStep + 1);
}

function resetApi() {
  setApiStep(0);
}

function runApi() {
  clearTimerList(apiTimers);
  const stage = document.getElementById("api-stage");
  stage.classList.remove("running");
  stage.dataset.result = "ready";
  document.getElementById("api-result-title").textContent = "날씨 정보를 부탁하는 중";
  document.getElementById("api-result-copy").textContent = "API 창구가 요청을 외부 날씨 서비스에 전달합니다.";
  document.getElementById("weather-temperature").textContent = "...";
  document.getElementById("weather-condition").textContent = "정보를 불러오는 중";
  void stage.offsetWidth;
  stage.classList.add("running");
  apiTimers.push(setTimeout(() => {
    const failed = stage.classList.contains("error-mode");
    stage.dataset.result = failed ? "error" : "success";
    document.getElementById("weather-temperature").textContent = failed ? "--°" : "24°";
    document.getElementById("weather-condition").textContent = failed ? "정보를 가져오지 못했습니다" : "맑음 · 산책하기 좋은 날";
    document.getElementById("weather-extra").textContent = failed ? "연결 상태를 확인한 뒤 다시 시도하세요." : "API로 받은 답이 내 화면의 정보가 되었습니다.";
    document.getElementById("api-result-title").textContent = failed ? "답을 받지 못했습니다" : "외부 서비스의 답이 도착했습니다";
    document.getElementById("api-result-copy").textContent = failed
      ? "API 연결이 끊겨 요청이 목적지까지 가지 못했습니다."
      : "서울의 현재 날씨가 내 서비스 화면에 표시됩니다.";
  }, 2600));
}

const screenPartCopy = {
  header: {
    number: "01 · 상단 메뉴",
    title: "어디에 있고 어디로 이동할지 알려주는 영역",
    copy: "브랜드, 주요 메뉴, 장바구니처럼 사이트 전체에서 자주 사용하는 이동 요소가 모여 있습니다.",
    prompt: "상단 메뉴에서 장바구니 숫자를 더 잘 보이게 하고, 모바일에서는 메뉴가 접히게 해 주세요.",
    file: "src/components/Header.tsx",
  },
  search: {
    number: "02 · 검색 영역",
    title: "사용자가 원하는 정보를 직접 입력하는 영역",
    copy: "검색어를 입력하고 실행하는 과정에는 입력창, 검색 버튼, 결과 없음 안내까지 함께 필요합니다.",
    prompt: "검색창을 더 크게 만들고, 입력 중인 검색어와 결과가 없을 때의 안내를 보여 주세요.",
    file: "src/components/SearchBar.tsx",
  },
  card: {
    number: "03 · 상품 카드",
    title: "같은 형식의 정보를 반복해서 보여주는 묶음",
    copy: "사진, 분류, 상품명, 가격, 행동 버튼을 일정한 순서로 반복하면 여러 상품을 빠르게 비교할 수 있습니다.",
    prompt: "상품 카드마다 사진, 상품명, 가격, 담기 버튼이 같은 위치에 오도록 정리해 주세요.",
    file: "src/components/ProductCard.tsx",
  },
  button: {
    number: "04 · 행동 버튼",
    title: "사용자의 선택을 실제 행동으로 시작하는 요소",
    copy: "버튼 문구는 누르면 어떤 결과가 생기는지 분명해야 하며, 처리 중에는 중복 클릭을 막아야 합니다.",
    prompt: "담기 버튼을 누르면 처리 중 표시를 보여주고 완료될 때까지 다시 누르지 못하게 해 주세요.",
    file: "src/components/AddToCartButton.tsx",
  },
  feedback: {
    number: "05 · 결과 알림",
    title: "방금 한 행동이 성공했는지 바로 알려주는 영역",
    copy: "사용자는 시스템 내부를 볼 수 없으므로 장바구니 숫자와 완료 알림처럼 눈에 보이는 피드백이 필요합니다.",
    prompt: "상품이 담기면 오른쪽 아래에 완료 알림을 띄우고 장바구니 숫자도 함께 바꿔 주세요.",
    file: "src/components/CartToast.tsx",
  },
};

function addComponent(component) {
  const factory = document.getElementById("component-factory");
  const copy = screenPartCopy[component];
  if (!copy) return;
  factory.dataset.part = component;
  factory.classList.remove("inspecting");
  void factory.offsetWidth;
  factory.classList.add("inspecting");
  document.querySelectorAll("[data-component]").forEach((button) => {
    button.classList.toggle("selected", button.dataset.component === component);
  });
  document.getElementById("part-number").textContent = copy.number;
  document.getElementById("part-title").textContent = copy.title;
  document.getElementById("part-copy").textContent = copy.copy;
  document.getElementById("part-prompt").textContent = copy.prompt;
  document.getElementById("part-file-path").textContent = copy.file;
  document.getElementById("anatomy-highlight-label").textContent = copy.number;
}

function resetComponents() {
  const factory = document.getElementById("component-factory");
  factory.dataset.part = "all";
  factory.classList.remove("inspecting");
  document.querySelectorAll("[data-component]").forEach((button) => button.classList.remove("selected"));
  document.getElementById("part-number").textContent = "전체 구조";
  document.getElementById("part-title").textContent = "화면을 역할별로 나누면 AI에게 정확히 말할 수 있습니다";
  document.getElementById("part-copy").textContent = "“사이트를 바꿔줘”보다 “상단 메뉴, 상품 카드, 담기 버튼, 완료 알림을 이렇게 바꿔줘”라고 요청하면 수정 범위가 분명해집니다.";
  document.getElementById("part-prompt").textContent = "신상품 화면의 상품 카드와 장바구니 피드백을 더 명확하게 개선해 주세요.";
  document.getElementById("part-file-path").textContent = "src/pages/ShopPage.tsx";
  document.getElementById("anatomy-highlight-label").textContent = "전체 화면";
}

let cartCount = 0;
let isLoggedIn = false;
let stateLastAction = "initial";

function updateStateLab() {
  document.getElementById("cart-count").textContent = String(cartCount);
  document.getElementById("memory-cart").textContent = String(cartCount);
  document.getElementById("memory-login").textContent = isLoggedIn ? "예" : "아니요";
  document.getElementById("memory-mode").textContent = isLoggedIn ? "계정에 연결" : "현재 화면만";
  document.getElementById("state-user-label").textContent = isLoggedIn ? "김바이브 님" : "방문자";
  document.getElementById("login-output").textContent = isLoggedIn ? "김바이브 · 계정 장바구니" : "방문자 · 임시 장바구니";
  document.getElementById("login-button-copy").textContent = isLoggedIn ? "로그아웃하기" : "로그인하기";
  document.getElementById("state-explanation-title").textContent = isLoggedIn ? "로그인 상태" : "로그아웃 상태";
  document.getElementById("state-explanation-copy").textContent = isLoggedIn
    ? "장바구니가 사용자 계정과 연결됩니다. 새로고침해도 담아 둔 수량을 다시 불러옵니다."
    : "장바구니 숫자는 지금 화면에서만 기억합니다. 새로고침하면 0으로 돌아갑니다.";
  const stateLab = document.getElementById("state-lab");
  stateLab.classList.toggle("logged-in", isLoggedIn);
  stateLab.classList.toggle("cart-changed", cartCount > 0);
  const diff = document.getElementById("state-diff-copy");
  if (stateLastAction === "refresh" && isLoggedIn) {
    diff.textContent = `새로고침 후 계정 장바구니 ${cartCount}개 복원`;
  } else if (stateLastAction === "refresh") {
    diff.textContent = "새로고침: 임시 장바구니 → 0";
  } else if (stateLastAction === "login") {
    diff.textContent = "로그인 여부: 아니요 → 예";
  } else if (stateLastAction === "logout") {
    diff.textContent = "로그인 여부: 예 → 아니요";
  } else if (cartCount > 0) {
    diff.textContent = `장바구니 수량: ${Math.max(0, cartCount - 1)} → ${cartCount}`;
  } else {
    diff.textContent = "아직 변경된 값이 없습니다";
  }
}

function refreshStateDemo() {
  stateLastAction = "refresh";
  if (!isLoggedIn) cartCount = 0;
  updateStateLab();
  const lab = document.getElementById("state-lab");
  lab.classList.remove("refreshing");
  void lab.offsetWidth;
  lab.classList.add("refreshing");
}

const memoryExampleCopy = {
  modal: {
    target: "screen",
    question: "팝업이 열렸는가?",
    copy: "지금 화면을 조작하는 동안만 알면 됩니다.",
    type: "잠깐 필요한 값",
    title: "팝업 열림",
    result: "화면의 잠깐 기억으로 이동합니다.",
  },
  tab: {
    target: "screen",
    question: "현재 선택한 탭",
    copy: "다른 화면으로 이동하면 다시 정해도 되는 값입니다.",
    type: "잠깐 필요한 값",
    title: "선택한 탭",
    result: "화면의 잠깐 기억으로 이동합니다.",
  },
  draft: {
    target: "screen",
    question: "입력 중인 검색어",
    copy: "검색하는 순간에는 필요하지만 영구 기록은 아닙니다.",
    type: "잠깐 필요한 값",
    title: "입력 중인 검색어",
    result: "화면의 잠깐 기억으로 이동합니다.",
  },
  profile: {
    target: "database",
    question: "회원 프로필",
    copy: "내일 다시 로그인해도 같은 정보를 불러와야 합니다.",
    type: "계속 필요한 기록",
    title: "회원 프로필",
    result: "데이터베이스에 저장합니다.",
  },
  post: {
    target: "database",
    question: "작성한 게시글",
    copy: "새로고침하거나 다른 사람이 접속해도 보여야 합니다.",
    type: "계속 필요한 기록",
    title: "작성한 게시글",
    result: "데이터베이스에 저장합니다.",
  },
  order: {
    target: "database",
    question: "결제한 주문 내역",
    copy: "배송과 환불, 구매 확인을 위해 반드시 남아야 합니다.",
    type: "반드시 남겨야 할 기록",
    title: "주문 내역",
    result: "데이터베이스에 안전하게 저장합니다.",
  },
};

function selectMemoryExample(example) {
  const lab = document.getElementById("memory-decision-lab");
  const copy = memoryExampleCopy[example];
  if (!lab || !copy) return;
  lab.dataset.target = "none";
  lab.classList.remove("sorting");
  void lab.offsetWidth;
  lab.dataset.target = copy.target;
  lab.classList.add("sorting");
  document.getElementById("memory-question").textContent = copy.question;
  document.getElementById("memory-question-copy").textContent = copy.copy;
  document.getElementById("sort-card-type").textContent = copy.type;
  document.getElementById("sort-card-title").textContent = copy.title;
  document.getElementById("sort-card-result").textContent = copy.result;
  document.querySelectorAll("[data-memory-example]").forEach((button) => {
    button.classList.toggle("active", button.dataset.memoryExample === example);
  });
}

function resetMemorySort() {
  const lab = document.getElementById("memory-decision-lab");
  if (!lab) return;
  lab.dataset.target = "none";
  lab.classList.remove("sorting");
  document.querySelectorAll("[data-memory-example]").forEach((button) => button.classList.remove("active"));
  document.getElementById("memory-question").textContent = "예시를 하나 선택해 주세요";
  document.getElementById("memory-question-copy").textContent = "값의 사용 기간을 생각하면 보관 장소를 고를 수 있습니다.";
  document.getElementById("sort-card-type").textContent = "선택 대기";
  document.getElementById("sort-card-title").textContent = "어떤 값을 분류할까요?";
  document.getElementById("sort-card-result").textContent = "왼쪽 예시를 누르면 알맞은 보관 장소로 이동합니다.";
}

const requestStepCopy = [
  "다음 단계 설명을 누르거나 오른쪽 항목을 하나씩 선택하세요.",
  "목표: 사용자가 상품을 주문하고 주문 번호를 확인할 수 있어야 합니다.",
  "화면: 주문 버튼, 처리 중 안내, 완료 화면이 필요합니다.",
  "처리: 로그인 여부, 재고, 결제 가능 여부를 순서대로 확인합니다.",
  "저장: 주문자, 상품, 금액, 주문 번호를 주문내역 창고에 남깁니다.",
  "완료 조건: 화면에 주문 번호가 보이고 다시 조회할 수 있으면 성공입니다.",
];

const requestVisualCopy = [
  ["요청 원문", "상품 주문 기능", "아직 설계 전"],
  ["01 · 목표", "사용자가 주문 완료", "성공 장면 정의"],
  ["02 · 화면", "주문 버튼과 안내", "브라우저 화면 설계"],
  ["03 · 처리", "권한 · 재고 · 결제", "서버 규칙 연결"],
  ["04 · 저장", "주문 #2406", "주문 기록 생성"],
  ["05 · 완료", "주문 완료 화면", "성공 조건 확인"],
];

function setRequestStep(step) {
  const compiler = document.getElementById("request-compiler");
  const numericStep = Math.max(0, Math.min(5, Number(step) || 0));
  compiler.dataset.step = String(numericStep);
  compiler.classList.remove("running");
  void compiler.offsetWidth;
  compiler.classList.add("running");
  document.getElementById("request-output-text").textContent = requestStepCopy[numericStep];
  document.getElementById("request-step-count").textContent = `${numericStep} / 5`;
  document.getElementById("planner-step-title").textContent = numericStep === 0 ? "문장 전체를 한 번에 만들지 않습니다" : requestStepCopy[numericStep].split(":")[0];
  const [draft, context, change] = requestVisualCopy[numericStep];
  document.getElementById("brief-draft-label").textContent = draft;
  document.getElementById("brief-context-value").textContent = context;
  document.getElementById("brief-change-value").textContent = change;
  document.querySelectorAll("[data-request-step]").forEach((button) => {
    const buttonStep = Number(button.dataset.requestStep);
    button.classList.toggle("active", buttonStep === numericStep);
    button.classList.toggle("complete", buttonStep < numericStep);
  });
}

function compileRequest() {
  const compiler = document.getElementById("request-compiler");
  const nextStep = (Number(compiler.dataset.step) || 0) >= 5 ? 1 : (Number(compiler.dataset.step) || 0) + 1;
  setRequestStep(nextStep);
}

function resetRequest() {
  setRequestStep(0);
}

const systemStepCopy = [
  ["시작 전", "대기 중", "다음 구간 보기를 누르거나 각 구간을 직접 선택하세요."],
  ["브라우저", "요청 시작", "사용자가 주문 버튼을 눌러 서비스의 흐름이 시작됩니다."],
  ["화면", "처리 중", "프론트엔드가 버튼을 잠그고 처리 중이라는 안내를 보여줍니다."],
  ["백엔드", "규칙 확인", "로그인한 사용자인지, 상품 재고가 남아 있는지 판단합니다."],
  ["API", "외부 연결", "결제 서비스에 승인을 부탁하고 결과를 기다립니다."],
  ["데이터베이스", "기록 저장", "결제가 끝난 주문을 나중에도 찾을 수 있도록 보관합니다."],
  ["브라우저", "주문 완료", "모든 처리가 끝났다는 응답이 돌아와 완료 화면을 보여줍니다."],
];

function setSystemStep(step) {
  const map = document.getElementById("system-map");
  const numericStep = Math.max(0, Math.min(6, Number(step) || 0));
  const [label, status, copy] = systemStepCopy[numericStep];
  map.classList.remove("running");
  map.dataset.step = String(numericStep);
  void map.offsetWidth;
  if (numericStep > 0) map.classList.add("running");
  document.getElementById("trace-step-label").textContent = label;
  document.querySelector(".trace-status").textContent = status;
  document.getElementById("trace-total").textContent = `${numericStep} / 6`;
  document.getElementById("trace-log-copy").textContent = copy;
  document.querySelectorAll("[data-system-step]").forEach((button) => {
    const buttonStep = Number(button.dataset.systemStep);
    button.classList.toggle("active", buttonStep === numericStep);
    button.classList.toggle("complete", buttonStep < numericStep);
  });
}

function runSystem() {
  const map = document.getElementById("system-map");
  const nextStep = (Number(map.dataset.step) || 0) >= 6 ? 1 : (Number(map.dataset.step) || 0) + 1;
  setSystemStep(nextStep);
}

function resetSystem() {
  setSystemStep(0);
}

function renderPracticeTimer() {
  const minutes = Math.floor(practiceRemaining / 60);
  const seconds = practiceRemaining % 60;
  document.getElementById("practice-time").textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const ratio = practiceRemaining / (30 * 60);
  document.getElementById("practice-progress").style.strokeDashoffset = String(1156 * (1 - ratio));
}

function togglePracticeTimer(button) {
  const clock = document.getElementById("practice-clock");
  if (practiceTimer) {
    clearInterval(practiceTimer);
    practiceTimer = null;
    clock.dataset.running = "false";
    button.textContent = "타이머 계속";
    return;
  }
  clock.dataset.running = "true";
  button.textContent = "일시정지";
  practiceTimer = setInterval(() => {
    practiceRemaining = Math.max(0, practiceRemaining - 1);
    renderPracticeTimer();
    if (practiceRemaining === 0) {
      clearInterval(practiceTimer);
      practiceTimer = null;
      clock.dataset.running = "false";
      button.textContent = "실습 종료";
    }
  }, 1000);
}

function resetPracticeTimer() {
  if (practiceTimer) clearInterval(practiceTimer);
  practiceTimer = null;
  practiceRemaining = 30 * 60;
  document.getElementById("practice-clock").dataset.running = "false";
  document.querySelector('[data-action="toggle-practice"]').textContent = "타이머 시작";
  renderPracticeTimer();
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let storeCartCount = 0;
let storeFavoriteCount = 0;
let storeToastTimer = null;
let storeInsightTimer = null;

function setCoverStep(step) {
  const city = document.getElementById("cover-city");
  const numericStep = Math.max(0, Math.min(4, Number(step) || 0));
  city.dataset.step = String(numericStep);
  document.querySelectorAll("[data-cover-step]").forEach((item) => {
    const itemStep = Number(item.dataset.coverStep);
    item.classList.toggle("active", itemStep === numericStep);
    item.classList.toggle("complete", itemStep < numericStep);
  });
}

async function toggleCoverFlow(button) {
  const token = ++coverAutoplayToken;
  button.textContent = "흐름 재생 중";
  for (let step = 1; step <= 4; step += 1) {
    if (token !== coverAutoplayToken) return;
    setCoverStep(step);
    await wait(1150);
  }
  if (token === coverAutoplayToken) button.textContent = "전체 흐름 다시 보기";
}

function showStoreToast(title, copy) {
  const toast = document.getElementById("store-toast");
  clearTimeout(storeToastTimer);
  toast.querySelector("b").textContent = title;
  toast.querySelector("span").textContent = copy;
  toast.classList.remove("visible");
  void toast.offsetWidth;
  toast.classList.add("visible");
  storeToastTimer = setTimeout(() => toast.classList.remove("visible"), 2400);
}

function showStoreInsight(label, title, copy) {
  const insight = document.getElementById("store-insight");
  if (!insight) return;
  clearTimeout(storeInsightTimer);
  document.getElementById("store-insight-label").textContent = label;
  document.getElementById("store-insight-title").textContent = title;
  document.getElementById("store-insight-copy").textContent = copy;
  insight.classList.remove("visible");
  void insight.offsetWidth;
  insight.classList.add("visible");
  storeInsightTimer = setTimeout(() => insight.classList.remove("visible"), 3600);
}

function addStoreCart() {
  storeCartCount += 1;
  document.getElementById("store-cart-count").textContent = String(storeCartCount);
  showStoreToast("장바구니에 담았습니다", `현재 ${storeCartCount}개의 상품이 담겨 있습니다.`);
  showStoreInsight("ACTION + FEEDBACK", "행동 버튼과 결과 안내", "장바구니 버튼은 행동을 시작하고, 숫자와 완료 알림은 결과를 즉시 확인시킵니다.");
}

function toggleStoreFavorite() {
  storeFavoriteCount = storeFavoriteCount > 0 ? 0 : 1;
  document.getElementById("favorite-count").textContent = String(storeFavoriteCount);
  document.getElementById("profile-favorite-copy").textContent = storeFavoriteCount ? "워크스페이스 램프" : "저장한 상품 없음";
  showStoreToast(storeFavoriteCount ? "찜 목록에 저장했습니다" : "찜 목록에서 삭제했습니다", "화면의 숫자와 나의 쇼핑 정보가 함께 바뀝니다.");
  showStoreInsight("SCREEN STATE", "현재 선택을 기억하는 화면", "찜 여부가 바뀌면 숫자와 나의 쇼핑 화면이 같은 값으로 함께 갱신됩니다.");
}

function focusStoreSearch() {
  const shell = document.getElementById("site-shell");
  shell.classList.remove("searching");
  void shell.offsetWidth;
  shell.classList.add("searching");
  const label = shell.querySelector(".store-search span");
  label.textContent = "워크스페이스 램프";
  showStoreToast("검색어를 입력했습니다", "사용자의 입력에 맞춰 검색 결과 화면으로 이동할 수 있습니다.");
  showStoreInsight("INPUT", "사용자의 의도를 받는 검색 영역", "검색창은 사용자가 찾고 싶은 대상을 입력하고 다음 화면의 내용을 결정하는 프론트엔드 요소입니다.");
}

function handleAction(action, element) {
  switch (action) {
    case "ignite-cover":
      toggleCoverFlow(element);
      break;
    case "play-building":
      playBuilding();
      break;
    case "toggle-menu":
      document.getElementById("site-shell").classList.toggle("menu-open");
      showStoreInsight("NAVIGATION", "메뉴가 나타나는 방향도 정보입니다", "왼쪽에서 이어져 들어오는 메뉴는 새로운 선택지가 어디에 연결되어 있는지 알려줍니다.");
      break;
    case "open-modal":
      document.getElementById("site-shell").classList.add("modal-open");
      showStoreInsight("OVERLAY", "현재 화면 위에 집중 작업을 띄웁니다", "로그인 모달은 페이지를 떠나지 않고 필요한 입력에만 집중하게 하는 프론트엔드 화면입니다.");
      break;
    case "close-modal":
      document.getElementById("site-shell").classList.remove("modal-open");
      break;
    case "run-ux":
      runUxRace();
      break;
    case "run-order-journey":
      runOrderJourney();
      break;
    case "reset-order-journey":
      resetOrderJourney();
      break;
    case "toggle-api-error":
      toggleApiError();
      break;
    case "run-api":
      runApi();
      break;
    case "next-api":
      nextApiStep();
      break;
    case "reset-api":
      resetApi();
      break;
    case "reset-components":
      resetComponents();
      break;
    case "add-store-cart":
      addStoreCart();
      break;
    case "toggle-favorite":
      toggleStoreFavorite();
      break;
    case "focus-search":
      focusStoreSearch();
      break;
    case "add-cart":
      cartCount += 1;
      stateLastAction = "cart";
      updateStateLab();
      break;
    case "toggle-login":
      isLoggedIn = !isLoggedIn;
      stateLastAction = isLoggedIn ? "login" : "logout";
      updateStateLab();
      break;
    case "refresh-state":
      refreshStateDemo();
      break;
    case "reset-memory-sort":
      resetMemorySort();
      break;
    case "compile-request":
      compileRequest();
      break;
    case "reset-request":
      resetRequest();
      break;
    case "run-system":
      runSystem();
      break;
    case "reset-system":
      resetSystem();
      break;
    case "toggle-practice":
      togglePracticeTimer(element);
      break;
    case "reset-practice":
      resetPracticeTimer();
      break;
    case "reveal-file-path":
      element.classList.toggle("revealed");
      element.closest(".next-session-slide")?.classList.toggle("route-revealed", element.classList.contains("revealed"));
      element.textContent = element.classList.contains("revealed") ? "연결 다시 보기" : "버튼의 파일 위치 보기";
      break;
    case "prev-slide":
      prevSlide();
      break;
    case "next-slide":
      nextSlide();
      break;
    default:
      break;
  }
}

document.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");
  if (actionButton) handleAction(actionButton.dataset.action, actionButton);

  const buildButton = event.target.closest("[data-building-stage]");
  if (buildButton) {
    buildingAutoplayToken += 1;
    setBuildingStage(buildButton.dataset.buildingStage);
  }

  const termButton = event.target.closest("[data-term]");
  if (termButton) selectTerm(termButton.dataset.term);

  const sitePageButton = event.target.closest("[data-site-page]");
  if (sitePageButton) {
    const shell = document.getElementById("site-shell");
    shell.dataset.page = sitePageButton.dataset.sitePage;
    shell.classList.remove("menu-open");
    document.querySelectorAll("[data-site-page]").forEach((button) => {
      button.classList.toggle("active", button.dataset.sitePage === sitePageButton.dataset.sitePage);
    });
    const pageCopy = {
      home: ["NAVIGATION", "메뉴가 다른 화면으로 이동시킵니다", "홈, 신상품, 나의 쇼핑은 사용자가 서비스 안에서 위치를 바꾸는 프론트엔드 내비게이션입니다."],
      products: ["CONTENT", "같은 규칙으로 반복되는 상품 카드", "사진, 분류, 상품명, 가격, 행동 버튼이 같은 구조로 반복되어 정보를 빠르게 비교하게 합니다."],
      profile: ["PERSONALIZED UI", "사용자에 따라 달라지는 나의 화면", "같은 사이트라도 주문과 찜 데이터에 따라 개인에게 보이는 내용이 달라집니다."],
    };
    showStoreInsight(...pageCopy[sitePageButton.dataset.sitePage]);
  }

  const coverStepButton = event.target.closest("[data-cover-step]");
  if (coverStepButton) {
    coverAutoplayToken += 1;
    setCoverStep(coverStepButton.dataset.coverStep);
    const replay = document.querySelector('[data-action="ignite-cover"]');
    if (replay) replay.textContent = "흐름 재생";
  }

  const orderStepButton = event.target.closest("[data-order-step]");
  if (orderStepButton) setOrderJourneyStep(orderStepButton.dataset.orderStep);

  const animationButton = event.target.closest("[data-animation-demo]");
  if (animationButton) playAnimationDemo(animationButton.dataset.animationDemo);

  const frontendExampleButton = event.target.closest("[data-frontend-example]");
  if (frontendExampleButton) selectFrontendExample(frontendExampleButton.dataset.frontendExample);

  const uxScenarioButton = event.target.closest("[data-ux-scenario]");
  if (uxScenarioButton) selectUxScenario(uxScenarioButton.dataset.uxScenario);

  const uxInspectButton = event.target.closest("[data-ux-inspect]");
  if (uxInspectButton) inspectUx(uxInspectButton.dataset.uxInspect);

  const animationGroupButton = event.target.closest("[data-animation-group-select]");
  if (animationGroupButton) selectAnimationGroup(animationGroupButton.dataset.animationGroupSelect);

  const dbButton = event.target.closest("[data-db-flow]");
  if (dbButton) selectDbFlow(dbButton.dataset.dbFlow);

  const apiStepButton = event.target.closest("[data-api-step]");
  if (apiStepButton) setApiStep(apiStepButton.dataset.apiStep);

  const componentButton = event.target.closest("[data-component]");
  if (componentButton) addComponent(componentButton.dataset.component);

  const memoryButton = event.target.closest("[data-memory-example]");
  if (memoryButton) selectMemoryExample(memoryButton.dataset.memoryExample);

  const requestButton = event.target.closest("[data-request-step]");
  if (requestButton) setRequestStep(requestButton.dataset.requestStep);

  const systemButton = event.target.closest("[data-system-step]");
  if (systemButton) setSystemStep(systemButton.dataset.systemStep);
});

document.addEventListener("keydown", (event) => {
  const interactive = event.target.closest("button, input, textarea, [contenteditable='true']");
  if (interactive) return;
  if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") nextSlide();
  if (event.key === "ArrowLeft" || event.key === "PageUp") prevSlide();
});

const buildingCanvas = document.getElementById("building-canvas");
if (buildingCanvas) {
  try {
    buildingSimulation = new BuildingSimulation(buildingCanvas);
  } catch (error) {
    console.error("3D 건축 시뮬레이션 초기화 실패:", error);
    document.querySelector(".building-viewport").classList.add("webgl-fallback");
  }
}

const params = new URLSearchParams(location.search);
const requestedSlide = Number(params.get("slide"));
const requestedBuild = Number(params.get("build"));
setBuildingStage(Number.isFinite(requestedBuild) && requestedBuild >= 0 && requestedBuild <= 6 ? requestedBuild : 0);
selectTerm("frontend");
selectFrontendExample("commerce");
selectUxScenario("checkout");
playAnimationDemo("menu");
selectDbFlow("signup");
resetApi();
setCoverStep(0);
resetOrderJourney();
renderPracticeTimer();
showSlide(Number.isFinite(requestedSlide) && requestedSlide > 0 ? requestedSlide - 1 : 0);
