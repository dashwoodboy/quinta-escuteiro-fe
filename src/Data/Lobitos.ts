import {getCdnImage, getCdnImagePerson} from "../Services/ImagesService";
import {EventTypes} from "../Models/EventTypes";

const lobitosActivities  = [
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
];

const lobitosTeam =[
    {
        id: "1",
        name: "Ana Silva",
        image: getCdnImagePerson("qwnmosfmbb5n8mk98gvz"),
    },
    {
        id: "2",
        name: "Pe André Baptista",
        image: getCdnImagePerson("missing"),
    },
    {
        id: "3",
        name: "Ângela Simões",
        image: getCdnImagePerson("missing"),
    },
    {
        id: "4",
        name: "Diogo Ferreira",
        image: getCdnImagePerson("missing"),
    },
    {
        id: "5",
        name: "Marta Alves",
        image: getCdnImagePerson("missing"),
    },
    {
        id: "6",
        name: "Nuno Santos",
        image: getCdnImagePerson("xxagqnbjz3vtskxbtcgj"),
    },

];

const lobitosWelcomeText = "Ser Lobito é cumprir – da melhor vontade – aquilo que prometeu, procurando sempre imitar o exemplo do Menino Jesus. Para isso, o Lobito deve ser asseado, alegre, verdadeiro e digno de confiança, estando sempre atento e pronto para ajudar quem precisa. O Lobito é desafiado a ser bom e amigo de todos praticando diariamente uma boa-ação. Ser Lobito é fazer parte, com os Escuteiros mais velhos, de um grande grupo espalhado pelo mundo. É fazer parte de um movimento por onde já passaram muitas pessoas de todo o mundo, de muitas culturas e religiões. Na Região Leiria-Fátima os Lobitos praticam diariamente boas ações.";

const nationalRedirectLink = "https://escutismo.pt/seccaoi";

const title = "Lobitos";

const LobitosData = {
    lobitosActivities,
    lobitosTeam,
    lobitosWelcomeText,
    nationalRedirectLink,
    title
};

export {LobitosData};
