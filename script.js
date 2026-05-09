const infoPanel = document.getElementById("info");
const toggleInfo = document.getElementById("toggleInfo");

toggleInfo.addEventListener("click", () => {
  infoPanel.classList.toggle("fechado");
});

console.log("GLTFLoader:", THREE.GLTFLoader);

const planets = document.querySelectorAll(".planet");
const overlay = document.getElementById("overlay");
const viewer = document.getElementById("viewer3d");

const btnVoltar = document.getElementById("BotaoVoltar");
btnVoltar.addEventListener("click", () => {
// esconde viewer
viewer.classList.remove("ativo");
// limpa overlay
overlay.style.opacity = "0";
// remove canvas
const canvas = viewer.querySelector("canvas");
if (canvas) canvas.remove();

});

// DADOS DOS PLANETAS
const planetData = {
  mercurio: {
    modelo: "modelos/mercury.glb",
    titulo: "Mercúrio",
    descricao: "Mercúrio é o menor e mais interno planeta do Sistema Solar, orbitando o Sol a cada 87,969 dias terrestres. A sua órbita tem a maior excentricidade e o seu eixo apresenta a menor inclinação em relação ao plano da órbita dentre todos os planetas do Sistema Solar. Mercúrio completa três rotações em torno de seu eixo a cada duas órbitas. O periélio da órbita de Mercúrio apresenta uma precessão de 5 600 segundos de arco por século, um fenômeno completamente explicado apenas a partir do século XX pela Teoria da Relatividade Geral formulada por Albert Einstein. A sua aparência é brilhante quando observado da Terra, tendo uma magnitude aparente que varia de −2,6 a 5,7, embora não seja facilmente observado pois sua separação angular do Sol é de apenas 28,3.º. Uma vez que Mercúrio normalmente se perde no intenso brilho solar, exceto em eclipses solares, só pode ser observado a olho nu durante o crepúsculo matutino ou vespertino."
  },
  venus: {
    modelo: "modelos/venus.glb",
    titulo: "Vênus",
    descricao: "Vénus é o segundo planeta do Sistema Solar em ordem de distância a partir do Sol, orbitando-o a cada 224,7 dias. Recebeu seu nome em homenagem à deusa romana do amor e da beleza Vénus, equivalente a Afrodite. Depois da Lua, é o objeto mais brilhante do céu noturno, atingindo uma magnitude aparente de -4,6, o suficiente para produzir sombras. A distância média da Terra a Vênus é de 0,28 AU, sendo esta a menor distância entre qualquer par de planetas. Como Vénus se encontra mais próximo do Sol do que a Terra, ele pode ser visto aproximadamente na mesma direção do Sol (sua maior elongação é de 47,8°). Vénus atinge seu brilho máximo algumas horas antes da alvorada ou depois do ocaso, sendo por isso conhecido como a estrela da manhã (estrela-d′alva) ou estrela da tarde (Vésper); também é chamado estrela do pastor."
  },
  terra: {
    modelo: "modelos/earth.glb",
    titulo: "Terra",
    descricao: "Terra é o terceiro planeta mais próximo do Sol, o mais denso e o quinto maior dos oito planetas do Sistema Solar. É também o maior dos quatro planetas telúricos. É por vezes designada como Mundo ou Planeta Azul. Lar de milhões de espécies de seres vivos, incluindo os humanos, a Terra é o único corpo celeste onde é conhecida a existência de vida. O planeta formou-se há 4,56 bilhões de anos, e a vida surgiu na sua superfície um bilhão de anos depois. Desde então, a biosfera terrestre alterou significativamente a atmosfera e outros fatores abióticos do planeta, permitindo a proliferação de organismos aeróbicos, bem como a formação de uma camada de ozônio, a qual, em conjunto com o campo magnético terrestre, bloqueia radiação solar prejudicial, permitindo a vida no planeta. As propriedades físicas do planeta, bem como sua história geológica e órbita, permitiram que a vida persistisse durante este período. Acredita-se que a Terra poderá suportar vida durante pelo menos outros 500 milhões de anos."
  },
  marte: {
    modelo: "modelos/mars.glb",
    titulo: "Marte",
    descricao: "Marte é o quarto planeta a partir do Sol, o segundo menor do Sistema Solar, atrás apenas de Mercúrio. Batizado em homenagem a divindade romana da guerra, muitas vezes é descrito como o 'Planeta Vermelho', porque o óxido de ferro predominante em sua superfície lhe dá uma aparência avermelhada. \n\n Marte é um planeta rochoso com uma atmosfera fina e características de superfície que lembram tanto as crateras de impacto da Lua quanto vulcões, vales, desertos e calotas polares da Terra. O período de rotação e os ciclos sazonais de Marte são também semelhantes aos da Terra, assim como é a inclinação que produz as suas estações do ano. Marte é o lar do Monte Olimpo, a segunda montanha mais alta conhecida no Sistema Solar (a mais alta em um planeta), e do Valles Marineris, um desfiladeiro gigantesco. A suave Bacia Polar Norte, no hemisfério norte marciano, cobre cerca de 40% do planeta e pode ser uma enorme marca de impacto. Marte tem duas luas conhecidas, Fobos e Deimos, que são pequenas e de forma irregular. Estas luas podem ser asteroides capturados, semelhante ao 5261 Eureka, um asteroide troiano marciano."
  },
  jupiter: {
    modelo: "modelos/jupiter.glb",
    titulo: "Júpiter",
    descricao: "Júpiter é o maior planeta do Sistema Solar, tanto em diâmetro quanto em massa, e é o quinto mais próximo do Sol. Possui menos de um milésimo da massa solar, contudo tem 2,5 vezes a massa de todos os outros planetas em conjunto. É um planeta gasoso, junto com Saturno, Urano e Netuno. Estes quatro planetas são por vezes chamados planetas jupiterianos ou planetas jovianos, e são os quatro gigantes gasosos, isto é, que não são compostos primariamente de matéria sólida. \n\n Júpiter é composto principalmente de hidrogênio, sendo um quarto de sua massa composta de hélio, embora o hélio corresponda a apenas um décimo do número total de moléculas. O planeta também pode possuir um núcleo rochoso composto por elementos mais pesados, embora, como os outros planetas gigantes, não possua uma superfície sólida bem definida. Por causa de sua rotação rápida, de cerca de dez horas, ele possui o formato de uma esfera oblata (ele possui uma suave, mas perceptível, saliência em torno do equador)."
  },
  saturno: {
    modelo: "modelos/saturn.glb",
    titulo: "Saturno",
    descricao: "Saturno é o sexto planeta a partir do Sol e o segundo maior do Sistema Solar atrás de Júpiter. Pertencente ao grupo dos gigantes gasosos, possui cerca de 95 massas terrestres e orbita a uma distância média de 9,5 unidades astronômicas.\n\n Possui um pequeno núcleo rochoso, circundado por uma espessa camada de hidrogênio metálico e hélio. A sua atmosfera, também composta principalmente de hidrogênio, apresenta faixas com fortes ventos, cuja energia provém tanto do calor recebido do Sol quanto da energia irradiada de seu centro. Entretanto, estas bandas possuem aspecto pouco proeminente, com coloração que varia do marrom ao amarelado, devido à espessa névoa que envolve o planeta, além das camadas de nuvens. Sazonalmente surgem grandes sistemas de tempestades, além de vórtices permanentes existentes nos polos."
  },
  urano: {
    modelo: "modelos/uranus.glb",
    titulo: "Urano",
    descricao: "Urano é o sétimo planeta a partir do Sol, o terceiro maior e o quarto mais massivo dos oito planetas do Sistema Solar. Foi nomeado em homenagem ao deus grego do céu, Urano. Embora seja visível a olho nu em boas condições de visualização, não foi reconhecido pelos astrônomos antigos como um planeta devido a seu pequeno brilho e lenta órbita. William Herschel anunciou sua descoberta em 13 de março de 1781, expandindo as fronteiras do Sistema Solar pela primeira vez na história moderna. Urano foi também o primeiro planeta a ser descoberto por meio de um telescópio. \n\n Urano tem uma composição similar à de Netuno, e ambos possuem uma composição química diferente da dos maiores gigantes gasosos, Júpiter e Saturno. Como tal, os astrônomos algumas vezes os colocam em uma categoria separada, os 'gigantes gelados'. A atmosfera de Urano, embora similar às de Júpiter e Saturno em sua composição primária de hidrogênio e hélio, contém mais 'gelos' tais como água, amônia e metano, assim como traços de hidrocarbonetos. É a mais fria atmosfera planetária no Sistema Solar, com uma temperatura mínima de 49 K (–224 °C)."
  },
  netuno: {
    modelo: "modelos/neptune.glb",
    titulo: "Netuno",
    descricao: "Netuno é o oitavo planeta do Sistema Solar, o último a partir do Sol desde a reclassificação de Plutão para a categoria de planeta anão em 2006. Pertencente ao grupo dos gigantes gasosos, possui um tamanho ligeiramente menor que o de Urano, mas maior massa, equivalente a 17 massas terrestres. Netuno orbita o Sol a uma distância média de 30,1 unidades astronômicas. \n\n O planeta é formado por um pequeno núcleo rochoso ao redor do qual encontra-se uma camada formada possivelmente por água, amônia e metano sobre a qual situa-se sua turbulenta atmosfera, constituída predominantemente de hidrogênio e hélio. De fato, notáveis eventos climáticos ocorrem em Netuno, inclusive a formação de diversas camadas de nuvens, tempestades ciclônicas visíveis, como a já extinta Grande Mancha Escura, além dos ventos mais rápidos do Sistema Solar, que atingem mais de 2 000 km/h. A radiação solar recebida por Netuno não seria suficiente para fornecer tamanha energia à turbulenta atmosfera, pelo que descobriu-se que o calor irradiado do centro do planeta possui um papel importante na manutenção destes eventos meteorológicos extremos. A pequena quantidade de metano nas camadas altas da atmosfera é, em parte, responsável pela coloração azul do planeta."
  }
};

// CLIQUE
planets.forEach(planet => {
  planet.addEventListener("click", () => {

    const planetName = planet.dataset.planet;

    const rect = planet.getBoundingClientRect();

    const clone = planet.cloneNode();
    document.body.appendChild(clone);

    clone.style.position = "fixed";
    clone.style.left = rect.left + "px";
    clone.style.top = rect.top + "px";
    clone.style.width = rect.width + "px";
    clone.style.height = rect.height + "px";
    clone.style.zIndex = "20";

    overlay.style.opacity = "0.8";

    clone.getBoundingClientRect();

    clone.style.transition = "all 0.6s ease";
    clone.style.left = "50%";
    clone.style.top = "50%";
    const isMobile = window.innerWidth <= 768;

    clone.style.transform = isMobile
    ? "translate(-50%, -50%) scale(2.2)"
    : "translate(-50%, -50%) scale(4)";

    setTimeout(() => {
      clone.style.opacity = "0";
      clone.style.pointerEvents = "none";

      viewer.classList.add("ativo");

      iniciar3D(planetName);
    }, 600);
  });
});

// FUNÇÃO 3D
function iniciar3D(planetName) {

  const data = planetData[planetName];
  if (!data) return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(0, 0, 6);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const oldCanvas = viewer.querySelector("canvas");
  if (oldCanvas) oldCanvas.remove();

  viewer.appendChild(renderer.domElement);

let zoomTarget = camera.position.z;

const minZoom = 2;  // mais perto
const maxZoom = 12; // mais longe

window.addEventListener("wheel", (e) => {
  zoomTarget += e.deltaY * 0.01;

  // limita o zoom
  zoomTarget = Math.max(minZoom, Math.min(maxZoom, zoomTarget));
});

  // LUZ
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 0.6);
  light.position.set(5, 5, 5);
  scene.add(light);

  let objeto3D;
  let pivot;

  const loader = new THREE.GLTFLoader();

  loader.load(
    data.modelo,

    function (gltf) {

    objeto3D = gltf.scene;

    // NORMALIZAÇÃO
    const box = new THREE.Box3().setFromObject(objeto3D);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // centraliza modelo
    objeto3D.position.sub(center);

    // escala automática
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 3 / maxDim;
    objeto3D.scale.setScalar(scale);

    // ajuste especial Saturno
    if (planetName === "saturno") {
      objeto3D.scale.multiplyScalar(2.5);
    }

    // PIVOT CORRIGIDO
    pivot = new THREE.Group();
    pivot.add(objeto3D);
    scene.add(pivot);
  },

    undefined,

    function (error) {
      console.error("Erro ao carregar modelo:", error);
    }
  );

  // CONTROLE
  let isDragging = false;

let previousX = 0;
let previousY = 0;

// MOUSE

renderer.domElement.addEventListener("mousedown", (e) => {
  isDragging = true;

  previousX = e.clientX;
  previousY = e.clientY;
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging || !pivot) return;

  const deltaX = e.clientX - previousX;
  const deltaY = e.clientY - previousY;

  pivot.rotation.y += deltaX * 0.005;
  pivot.rotation.x += deltaY * 0.005;

  previousX = e.clientX;
  previousY = e.clientY;
});

// TOUCH

renderer.domElement.addEventListener("touchstart", (e) => {
  isDragging = true;

  previousX = e.touches[0].clientX;
  previousY = e.touches[0].clientY;
});

window.addEventListener("touchend", () => {
  isDragging = false;
});

window.addEventListener("touchmove", (e) => {
  if (!isDragging || !pivot) return;

  const touch = e.touches[0];

  const deltaX = touch.clientX - previousX;
  const deltaY = touch.clientY - previousY;

  pivot.rotation.y += deltaX * 0.005;
  pivot.rotation.x += deltaY * 0.005;

  previousX = touch.clientX;
  previousY = touch.clientY;
});

  // TEXTO
  const titulo = document.getElementById("titulo");
  const desc = document.getElementById("descricao");

  if (titulo && desc) {
    titulo.textContent = data.titulo;
    digitarTexto(desc, data.descricao);
  }

  // LOOP
  function animate() {
    requestAnimationFrame(animate);

    if (pivot) {
      pivot.rotation.y += 0.002; // rotação automática leve
    }

camera.position.z += (zoomTarget - camera.position.z) * 0.1;

    renderer.render(scene, camera);
  }

  animate();
}

// DIGITAÇÃO
let typingTimeout;

function digitarTexto(el, texto, vel = 25) {
  clearTimeout(typingTimeout);
  
  el.textContent = "";
  let i = 0;

  function escrever() {
    if (i < texto.length) {
      el.textContent += texto[i];
      i++;

      typingTimeout = setTimeout(escrever, vel);
    }
  }

  escrever();
}