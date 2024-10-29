import {getCdnImage, getCdnImagePerson} from "../Services/ImagesService";
import {EventTypes} from "../Models/EventTypes";

const exploradoresActivities  = [
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
        name: "Dia de S.Tiago",
        description: "Dia do patrono dos Exploradores e Moços.",
        image: getCdnImage("kilvcxg81slczwv6fcn4"),
        type: EventTypes.NATIONAL,
        year: 2024,
        month: 6,
        startDay: 25,
        duration: 1
    }
];

const exploradoresTeam = [
    {
        id: "1",
        name: "Filipe Darci",
        image: getCdnImagePerson("tlbfybdx4ejtgwd584b6"),
    },
    {
        id: "2",
        name: "Pe Francisco Pereira",
        image: getCdnImagePerson("missing"),
    },
    {
        id: "3",
        name: "Elsa Nogueira",
        image: getCdnImagePerson("mkbe8vyezvduipg185oc"),
    },
    {
        id: "4",
        name: "Gonçalo Romeiro",
        image: getCdnImagePerson("missing"),
    },
    {
        id: "5",
        name: "Isaura Pedrosa",
        image: getCdnImagePerson("crgvw3q85ulu0yigrjrv"),
    },
    {
        id: "6",
        name: "Luis Bernardes",
        image: getCdnImagePerson("missing"),
    },
    {
        id: "7",
        name: "Maria Oliveira",
        image: getCdnImagePerson("vsuddc244y2pfbgiqxq3"),
    }
];

const exploradoresWelcomeText = "A descoberta da Terra Prometida: o Ex­plorador/Moço reconhece Deus na sua vida e aceita a Aliança que este lhe pro­põe, pondo-se a caminho tal como o Povo do Antigo Testamento. Depois da descoberta do Criador atra­vés da obra criada – muito em especial da Humanidade, criada à imagem e se­melhança de Deus –, segue-se o acolhi­mento da relação de Deus com os Ho­mens. Esta relação tem em Deus a sua origem, e materializa-se no firmamento de uma aliança. A Aliança que Deus pro­põe aos homens é, num certo sentido, desigual, na medida em que, não obs­tante a eventual infidelidade do Homem, Deus não deixa de ser fiel à sua Aliança. Deus oferece à Humanidade a possibi­lidade de viver em paz e felicidade, com uma descendência incontável, na Terra Prometida. Essa é a grande promessa do Antigo Testamento.";

const nationalRedirectLink = "https://escutismo.pt/seccaoii";

const title = "Exploradores";

const ExploradoresData = {
    exploradoresActivities,
    exploradoresTeam,
    exploradoresWelcomeText,
    nationalRedirectLink,
    title
};

export {ExploradoresData};
