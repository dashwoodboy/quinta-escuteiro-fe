import {getCdnImage, getCdnImagePerson} from "../Services/ImagesService";
import {EventTypes} from "../Models/EventTypes";

const pioneirosActivities  = [
    {
        id: "1",
        name: "Acareg",
        description: "Este vai ser o ano do XXII ACAREG, aquele que dará início às celebrações dos 100 anos da Região de Leiria-Fátima. A atividade realiza-se na Quinta do Escuteiro - Centro Escutista da Batalha, de 5 a 11 de agosto de 2024 e será com o tema “Tu és o Futuro desta História“. Vem conhecer Leiria há 100 anos, através das histórias da Cem Topeia, uma anciã que “vivia nos bosques que rodeavam o Pinhal de Leiria, uma floresta de pinheiros que parecia estender-se até ao mar. Foi nesse lugar encantador que vi pela primeira vez Escuteiros, há mais ou menos cem anos. As aldeias circundantes eram pequenas, mas cheias de vida. Os pastores cuidavam das ovelhas que pastavam nas colinas verdejantes, enquanto os padeiros acendiam os fornos de lenha para assar o pão fresco todas as manhãs. Os lavradores trabalhavam arduamente nos campos, cultivando cereais e vegetais para sustentar as famílias da região. A cada estação, as tradições ganhavam vida. Foi numa tarde tranquila que me esgueirei entre as folhas e vi pela primeira vez um grupo de jovens reunidos à volta de uma fogueira. Eles cantavam e os seus olhos brilhavam com entusiasmo. Fiquei fascinada e escondi-me entre as árvores, observando com curiosidade. Era ali, naquele cenário encantado, que os primeiros Escuteiros de Leiria se encontravam…”",
        image: getCdnImage("x00leshvwguckpwqyrcy"),
        type: EventTypes.REGIONAL,
        year: 2024,
        month: 7,
        startDay: 5,
        duration: 7,
    },
    {
        id: "2",
        name: "Tecoree",
        description: "O Tecoree é um torneio nacional de técnica escutista, desenvolvido para Pioneiros, Marinheiros e Tripulantes. Nesta fase realiza-se a prova regional.",
        image: getCdnImage("clofltlulzcmmpqefbub"),
        type: EventTypes.REGIONAL,
        year: 2024,
        month: 3,
        startDay: 13,
        duration: 2
    },
    {
        id: "3",
        name: "Dia de S.Pedro",
        description: "Dia do patrono dos Pioneiros, Marinheiros e Tripulantes.",
        image: getCdnImage("d0vhvfpjjbtufibn4sfz"),
        type: EventTypes.REGIONAL,
        year: 2024,
        month: 5,
        startDay: 29,
        duration: 1
    },
    {
        id: "4",
        name: "Tecoree",
        description: "O Tecoree é um torneio nacional de técnica escutista, desenvolvido para Pioneiros, Marinheiros e Tripulantes.",
        image: getCdnImage("clofltlulzcmmpqefbub"),
        type: EventTypes.NATIONAL,
        year: 2024,
        month: 8,
        startDay: 5,
        duration: 4
    }
];

const pioneirosTeam =[
    {
        id: "1",
        name: "Pe Francisco Pereira",
        image: getCdnImagePerson("missing"),
    },
    {
        id: "2",
        name: "Cristiana Ferreira",
        image: getCdnImagePerson("missing"),
    },
    {
        id: "3",
        name: "Patrícia Pedrosa",
        image: getCdnImagePerson("missing"),
    },
    {
        id: "4",
        name: "Sandra Antunes",
        image: getCdnImagePerson("i8sumzkpxfkkxrxuo6bf"),
    },
    {
        id: "5",
        name: "Vânia Tomás",
        image: getCdnImagePerson("missing"),
    }
];

const pioneirosWelcomeText = "Ter uma parte do céu no azul de cada um dos nossos lenços e um \"pedacinho\" de Deus na alma. Contribuir para que cada pedacinho se vá juntando a outro pedacinho, construindo assim um céu imenso, fruto do conjunto de muitos pedacinhos. Viver numa busca incessante de algo que por vezes nem identificamos claramente. Ser gota de água que fervilha com vida no seu interior, que descobre coisas novas em cada momento, que necessita de modelos e de algo com que se identifique, que procura mais, que quer descobrir mais, aprender mais, saber mais. Procurar, como os antigos Navegadores, pioneiros na descoberta de novos mundos, o verdadeiro caminho, o rumo certo, seguindo, pela Rosa dos Ventos, os azimutes corretos em direção ao Pai. Viver em Equipa, percorrendo juntos o caminho traçado, onde cada um tem o seu papel, indispensável e insubstituível. É estar em comunhão ao serviço do próximo e de cada um, ao serviço de Deus e da comunidade, fiéis ao princípio de boa ação e da ajuda aos mais necessitados, cumprindo a missão de enviados que Cristo confiou a cada Homem.";

const nationalRedirectLink = "https://escutismo.pt/seccaoiii";

const title = "Pioneiros";

const PioneirosData = {
    pioneirosActivities,
    pioneirosTeam,
    pioneirosWelcomeText,
    nationalRedirectLink,
    title
};

export {PioneirosData};
