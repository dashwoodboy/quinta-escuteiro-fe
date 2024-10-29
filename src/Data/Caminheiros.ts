import {getCdnImage, getCdnImagePerson} from "../Services/ImagesService";
import {EventTypes} from "../Models/EventTypes";

const caminheirosActivities  = [
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
        name: "Cenáculo",
        description: "O set está pronto, as luzes ligadas e as câmaras a postos, só falta mesmo entrar em ação! As gravações serão realizadas entre os dias 5, 6 e 7 de abril, mas para que isso aconteça na perfeição e sem percalços precisamos da tua ajuda!",
        image: getCdnImage("wkfk9mhjphudigmrdjmb"),
        type: EventTypes.REGIONAL,
        year: 2024,
        month: 3,
        startDay: 5,
        duration: 3
    },
    {
        id: "3",
        name: "Empreitada IV",
        description: "A Empreitada à IV é uma atividade organizada pela Quinta do Escuteiro com o objetivo de contribuir para o crescimento e desenvolvimento da mesma. É uma atividade de serviço aberta a todos os 𝘾𝙖𝙢𝙞𝙣𝙝𝙚𝙞𝙧𝙤𝙨, 𝘾𝙖𝙣𝙙𝙞𝙙𝙖𝙩𝙤𝙨 𝙖 𝘿𝙞𝙧𝙞𝙜𝙚𝙣𝙩𝙚 𝙚 𝘿𝙞𝙧𝙞𝙜𝙚𝙣𝙩𝙚𝙨 a nível 𝙉𝙖𝙘𝙞𝙤𝙣𝙖𝙡!",
        image: getCdnImage("qq1wwzgde9vldkb8urhg"),
        type: EventTypes.REGIONAL,
        year: 2024,
        month: 3,
        startDay: 27,
        duration: 2
    },
    {
        id: "4",
        name: "Roverway Noruega",
        description: "Após a passagem por Portugal (2003), Itália (2006), Islândia (2009), Finlândia (2012), França (2016) e Países Baixos (2018), é agora a Noruega o palco de mais um encontro de rovers unidos pela visão de B-P. À semelhança das edições anteriores, esta sétima edição pretende ser uma semana de desenvolvimento pessoal, num ambiente de intercâmbio cultural, troca de ideias e partilha de experiências entre jovens de toda a Europa. “A Norte do Comum” (North of the Ordinary), é o lema escolhido para o Roverway 2024, que que se irá realizar de 22 de julho a 1 de agosto de 2024, em Stavanger, na Noruega. O Roverway pretende criar os líderes do amanhã, capacitá-los física e mentalmente e ensiná-los a serem mais inclusivos.",
        image: getCdnImage("rsdl04og011eukrfxcnv"),
        type: EventTypes.INTERNATIONAL,
        year: 2024,
        month: 6,
        startDay: 22,
        duration: 11
    },
    {
        id: "5",
        name: "RAFIKI",
        description: "O Projeto Rafiki nasceu no âmbito da iniciativa “Mensageiros da Paz”, da Organização Mundial do Movimento Escutista, iniciativa que pretende a promoção da paz na dimensão pessoal, comunitária e na relação entre a humanidade e o meio envolvente. Esta atividade tem como objetivo combater o isolamento social através de múltiplas ações de serviço em comunidades particularmente envelhecidas do nosso país.",
        image: getCdnImage("yr50na5yfknnhhu0ky1q"),
        type: EventTypes.REGIONAL,
        year: 2024,
        month: 7,
        startDay: 26,
        duration: 7
    },
    {
        id: "6",
        name: "Férias de Campo",
        description: "Férias de Campo é uma atividade organizada por Caminheiros, para crianças e jovens entre os 06 e os 17 anos, institucionalizados em Centros de Acolhimento Temporário ou Lares de Infância e Juventude.",
        image: getCdnImage("lio3ck8lz8r3sjailkjy"),
        type: EventTypes.REGIONAL,
        year: 2024,
        month: 8,
        startDay: 4,
        duration: 5
    }
];

const caminheirosTeam =[
    {
        id: "1",
        name: "André Estrada",
        image: getCdnImagePerson("u4v84cslfczkd12c9nba")
    },
    {
        id: "2",
        name: "Cristina Simões",
        image: getCdnImagePerson("swt6gaydh6wrtr7q3pif")
    },
    {
        id: "3",
        name: "Ivo Viegas",
        image: getCdnImagePerson("missing")
    },
    {
        id: "4",
        name: "Pe José Henrique",
        image: getCdnImagePerson("missing")
    },
    {
        id: "5",
        name: "Raquel Roda",
        image: getCdnImagePerson("missing")
    }
];

const caminheirosSupportTeam =[
    {
        id: "1",
        name: "David Lourenço",
        image: getCdnImagePerson("oetnh7cqdgqfkdferodp")
    },
    {
        id: "2",
        name: "Inês Silva",
        image: getCdnImagePerson("kuwdyizfuybfgadymwli")
    },
    {
        id: "3",
        name: "Lara Ascenso",
        image: getCdnImagePerson("fixtaca4jkkg1usgqyk1")
    },
    {
        id: "4",
        name: "Marta Neves",
        image: getCdnImagePerson("w18ipwzckchsnvjni9gv")
    },
    {
        id: "5",
        name: "Manuel Pereira",
        image: getCdnImagePerson("dfqtxdjdblb8nel104mb")
    }
];

const caminheirosWelcomeText = "\n" +
  "A vida no Homem Novo: o Caminheiro vive cristãmente em todas as dimensões do seu ser. O Caminheiro/Companheiro é chamado a viver integralmente em Cristo, o “Homem Novo”, assumindo um lugar ativo na cons­trução dos “novos céus e da nova terra”. Com a ênfase colocada na vida cristã, nas diversas dimensões que compõem o ser humano, pretende-se estimular para a incarnação plena do Evangelho de Je­sus Cristo, sem hiatos ou áreas excluí­das. Tudo o que é próprio do ser humano tem também a ver com o Evangelho e, por isso, toda a vida há-de ser moldada pela Palavra que dá vida e sacia para a eternidade. É fundamental que a pedagogia da quarta Secção não deixe de dar um con­tributo novo para a formação dos jovens Caminheiros e Companheiros, pois es­tes estão ainda num processo educativo, apesar de possuírem já autonomia em di­ferentes áreas. Da qualidade da pedago­gia proposta nesta etapa, depende o bom sucesso de todo o itinerário escutista. No final deste percurso é que pode­remos perceber qual a mais valia que o escutismo oferece à sociedade e à Igreja.";

const nationalRedirectLink = "https://escutismo.pt/seccaoiv";

const title = "Caminheiros";

const CaminheirosData = {
    caminheirosActivities,
    caminheirosTeam,
    caminheirosSupportTeam,
    caminheirosWelcomeText,
    nationalRedirectLink,
    title
};

export {CaminheirosData};
