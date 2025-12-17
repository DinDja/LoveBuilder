export interface CardData {
    id: number;
    name: string;
    arcana: 'Major' | 'Minor';
    suit?: 'Wands' | 'Cups' | 'Swords' | 'Pentacles';
    number: number;
    image: string;
    keywords: string[];
    meanings: {
        upright: string;
        reversed: string;
    };
    description: string;
}

export const deck: CardData[] = [
    {
        id: 0,
        name: "O Louco",
        arcana: "Major",
        number: 0,
        image: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg",
        keywords: ["Início", "Liberdade", "Inocência", "Espontaneidade"],
        meanings: {
            upright: "O início de uma nova jornada. Confie no universo e dê o salto de fé.",
            reversed: "Imprudência, tomada de risco desnecessária ou medo de começar."
        },
        description: "Um jovem à beira de um precipício, com uma mochila nas costas e um cão aos seus pés, olhando para o céu sem medo, pronto para a aventura."
    },
    {
        id: 1,
        name: "O Mago",
        arcana: "Major",
        number: 1,
        image: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
        keywords: ["Vontade", "Manifestação", "Poder", "Habilidade"],
        meanings: {
            upright: "Você tem todas as ferramentas necessárias para manifestar seus desejos. Use seus talentos criativamente.",
            reversed: "Talento não utilizado, manipulação ou falta de direção."
        },
        description: "Uma figura em pé com uma mão apontando para o céu e outra para a terra, com os quatro elementos (cálice, espada, bastão e moeda) sobre uma mesa."
    },
    {
        id: 2,
        name: "A Sacerdotisa",
        arcana: "Major",
        number: 2,
        image: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg",
        keywords: ["Intuição", "Mistério", "Sabedoria Interior", "Subconsciente"],
        meanings: {
            upright: "Confie na sua intuição. Conhecimento secreto e sabedoria espiritual estão disponíveis.",
            reversed: "Intuição ignorada, segretos revelados ou desconexão espiritual."
        },
        description: "Uma mulher sentada entre duas colunas (preto e branco), com um véu decorado com romãs e uma lua crescente aos seus pés."
    },
    {
        id: 3,
        name: "A Imperatriz",
        arcana: "Major",
        number: 3,
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg",
        keywords: ["Fertilidade", "Abundância", "Maternidade", "Natureza"],
        meanings: {
            upright: "Criatividade, fertilidade e crescimento. Conecte-se com a natureza e seu lado maternal.",
            reversed: "Criatividade bloqueada, dependência ou negligência."
        },
        description: "Uma mulher grávida sentada em um trono cercado por um jardim fértil e um rio fluindo, segurando um cetro."
    },
    {
        id: 4,
        name: "O Imperador",
        arcana: "Major",
        number: 4,
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg",
        keywords: ["Autoridade", "Estrutura", "Poder", "Estabilidade"],
        meanings: {
            upright: "Estabeleça ordem e estrutura. Liderança e proteção são necessárias.",
            reversed: "Autoridade excessiva, rigidez ou falta de controle."
        },
        description: "Um homem maduro sentado em um trono de pedra com carnes de carneiro, segurando um cetro e um orbe, com montanhas áridas ao fundo."
    },
    {
        id: 5,
        name: "O Hierofante",
        arcana: "Major",
        number: 5,
        image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg",
        keywords: ["Tradição", "Conhecimento", "Espiritualidade", "Conformidade"],
        meanings: {
            upright: "Seguir tradições, ensino espiritual ou encontrar um mentor.",
            reversed: "Rebelião contra tradições, ortodoxia rígida ou novos sistemas de crença."
        },
        description: "Uma figura religiosa sentada entre duas colunas, abençoando dois monges ajoelhados, segurando um cetro triplo."
    },
    {
        id: 6,
        name: "Os Enamorados",
        arcana: "Major",
        number: 6,
        image: "https://upload.wikimedia.org/wikipedia/commons/3/33/RWS_Tarot_06_Lovers.jpg",
        keywords: ["Amor", "Escolhas", "União", "Harmonia"],
        meanings: {
            upright: "Escolhas importantes relacionadas ao coração. União e relacionamentos harmoniosos.",
            reversed: "Desequilíbrio, má escolha ou conflito nos relacionamentos."
        },
        description: "Um homem e uma mulher nus sob um anjo, com a Árvore do Conhecimento e da Vida ao fundo, representando a escolha entre o material e o espiritual."
    },
    {
        id: 7,
        name: "O Carro",
        arcana: "Major",
        number: 7,
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
        keywords: ["Controle", "Vitória", "Determinação", "Progresso"],
        meanings: {
            upright: "Controle sobre forças opostas. Vitória através da determinação e foco.",
            reversed: "Falta de direção, agressão ou controle perdido."
        },
        description: "Um guerreiro em uma carruagem puxada por duas esfinges (uma preta e uma branca), com estrelas no dossel e uma cidade ao fundo."
    },
    {
        id: 8,
        name: "A Força",
        arcana: "Major",
        number: 8,
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
        keywords: ["Força Interior", "Coragem", "Compaixão", "Autocontrole"],
        meanings: {
            upright: "Força interior, coragem gentil e controle sobre paixões animais.",
            reversed: "Dúvida, medo ou uso inadequado da força."
        },
        description: "Uma mulher vestida de branco abrindo gentilmente a boca de um leão, com um símbolo do infinito sobre sua cabeça."
    },
    {
        id: 9,
        name: "O Eremita",
        arcana: "Major",
        number: 9,
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg",
        keywords: ["Introspecção", "Sabedoria", "Solidão", "Busca Interior"],
        meanings: {
            upright: "Tempo para introspecção, buscar sabedoria interior ou orientação espiritual.",
            reversed: "Isolamento excessivo, evitar conselhos ou perda de direção."
        },
        description: "Um ancião com uma barba longa em uma montanha, segurando uma lanterna que ilumina seu caminho, vestido com um manto cinza."
    },
    {
        id: 10,
        name: "A Roda da Fortuna",
        arcana: "Major",
        number: 10,
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg",
        keywords: ["Destino", "Mudança", "Ciclos", "Oportunidade"],
        meanings: {
            upright: "Mudanças de destino, ciclos da vida e novas oportunidades.",
            reversed: "Má sorte, resistência à mudança ou reviravoltas negativas."
        },
        description: "Uma roda gigante com símbolos alquímicos e criaturas míticas, com um anjo, águia, leão e touro nos quatro cantos."
    },
    {
        id: 11,
        name: "A Justiça",
        arcana: "Major",
        number: 11,
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg",
        keywords: ["Justiça", "Verdade", "Karma", "Responsabilidade"],
        meanings: {
            upright: "Equilíbrio, verdade e consequências das ações. Decisões justas.",
            reversed: "Injustiça, falta de responsabilidade ou preconceito."
        },
        description: "Uma figura sentada com uma espada na mão direita e uma balança na esquerda, entre duas colunas, com um manto vermelho."
    },
    {
        id: 12,
        name: "O Pendurado",
        arcana: "Major",
        number: 12,
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg",
        keywords: ["Sacrifício", "Perspectiva", "Rendição", "Pausa"],
        meanings: {
            upright: "Mudança de perspectiva, sacrifício por maior bem ou período de espera.",
            reversed: "Estagnação, resistência ou sacrifício inútil."
        },
        description: "Um homem pendurado de cabeça para baixo em uma árvore por um pé, com uma auréola e expressão serena."
    },
    {
        id: 13,
        name: "A Morte",
        arcana: "Major",
        number: 13,
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg",
        keywords: ["Transformação", "Fim", "Renascimento", "Mudança"],
        meanings: {
            upright: "Fim de um ciclo e início de outro. Transformação profunda e renascimento.",
            reversed: "Resistência à mudança, medo de seguir em frente ou transformação estagnada."
        },
        description: "Um esqueleto cavaleiro com uma bandeira preta, diante de figuras em várias idades e condições, com um sol nascendo ao fundo."
    },
    {
        id: 14,
        name: "A Temperança",
        arcana: "Major",
        number: 14,
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg",
        keywords: ["Equilíbrio", "Moderação", "Paciência", "Cura"],
        meanings: {
            upright: "Equilíbrio, moderação e paciência. União de opostos e cura.",
            reversed: "Desequilíbrio, excesso ou falta de paciência."
        },
        description: "Um anjo misturando água entre dois copos, com um pé na água e outro na terra, e um caminho levando a montanhas ao fundo."
    },
    {
        id: 15,
        name: "O Diabo",
        arcana: "Major",
        number: 15,
        image: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg",
        keywords: ["Escravidão", "Materialismo", "Desejo", "Ilusão"],
        meanings: {
            upright: "Escravidão a desejos materiais, vícios ou crenças limitantes.",
            reversed: "Libertação de limitações, quebra de correntes ou reconhecimento de ilusões."
        },
        description: "Uma figura bafomética com asas de morcego, em um pedestal, com um homem e uma mulher acorrentados a seus pés."
    },
    {
        id: 16,
        name: "A Torre",
        arcana: "Major",
        number: 16,
        image: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg",
        keywords: ["Mudança Brusca", "Revelação", "Caos", "Libertação"],
        meanings: {
            upright: "Mudança repentina, destruição de estruturas falsas e revelação da verdade.",
            reversed: "Medo de mudança, evitar o inevitável ou colapso adiado."
        },
        description: "Uma torre sendo atingida por um raio, com duas figuras caindo, coroas voando e chamas saindo das janelas."
    },
    {
        id: 17,
        name: "A Estrela",
        arcana: "Major",
        number: 17,
        image: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg",
        keywords: ["Esperança", "Inspiração", "Cura", "Serenidade"],
        meanings: {
            upright: "Esperança renovada, inspiração espiritual e cura emocional.",
            reversed: "Desesperança, falta de fé ou desconexão da inspiração."
        },
        description: "Uma mulher nua derramando água de dois jarros em terra e água, com uma estrela grande e sete menores no céu."
    },
    {
        id: 18,
        name: "A Lua",
        arcana: "Major",
        number: 18,
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg",
        keywords: ["Ilusão", "Medo", "Subconsciente", "Intuição"],
        meanings: {
            upright: "Confusão, ilusão e mergulho no subconsciente. Medos ocultos.",
            reversed: "Clareza emergindo, superação de medos ou ilusões dissipadas."
        },
        description: "Uma lua cheia com rosto humano entre duas torres, com um cachorro e um lobo uivando, e um caranguejo saindo da água."
    },
    {
        id: 19,
        name: "O Sol",
        arcana: "Major",
        number: 19,
        image: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg",
        keywords: ["Alegria", "Sucesso", "Vitalidade", "Verdade"],
        meanings: {
            upright: "Alegria, sucesso, vitalidade e clareza. Verdade revelada.",
            reversed: "Temporariamente obscurecido, otimismo excessivo ou sucesso atrasado."
        },
        description: "Um grande sol com rosto humano brilhando sobre uma criança montando um cavalo branco, com girassóis ao fundo."
    },
    {
        id: 20,
        name: "O Julgamento",
        arcana: "Major",
        number: 20,
        image: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg",
        keywords: ["Renascimento", "Chamado", "Absolvição", "Despertar"],
        meanings: {
            upright: "Renascimento, chamado superior e absolvição do passado.",
            reversed: "Medo do julgamento, negação do chamado ou culpa não resolvida."
        },
        description: "Um anjo tocando uma trombeta em uma nuvem, com pessoas saindo de túmulos e braços estendidos em oração."
    },
    {
        id: 21,
        name: "O Mundo",
        arcana: "Major",
        number: 21,
        image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg",
        keywords: ["Completude", "Êxito", "Viagem", "Totalidade"],
        meanings: {
            upright: "Completude, sucesso, realização e jornada concluída.",
            reversed: "Conclusão atrasada, falta de realização ou necessidade de fechar ciclos."
        },
        description: "Uma figura dançante envolta em uma grinalda, segurando duas varinhas, com os quatro seres (anjo, águia, leão, touro) nos cantos."
    },
    {
        id: 22,
        name: "Ás de Paus",
        arcana: "Minor",
        suit: "Wands",
        number: 1,
        image: "https://upload.wikimedia.org/wikipedia/commons/1/11/Wands01.jpg",
        keywords: ["Inspiração", "Novo Início", "Criatividade", "Potencial"],
        meanings: {
            upright: "Novo empreendimento criativo, inspiração e potencial ilimitado.",
            reversed: "Atrasos, falta de direção ou inspiração bloqueada."
        },
        description: "Uma mão saindo de uma nuvem segurando um bastão florescente, com um castelo ao fundo."
    },
    {
        id: 23,
        name: "Dois de Paus",
        arcana: "Minor",
        suit: "Wands",
        number: 2,
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Wands02.jpg",
        keywords: ["Planejamento", "Decisão", "Progresso", "Expansão"],
        meanings: {
            upright: "Planejamento para o futuro, progresso e expansão dos horizontes.",
            reversed: "Medo do desconhecido, falta de planejamento ou oportunidade perdida."
        },
        description: "Um homem segurando um globo, olhando para o mar e montanhas, com dois bastões cruzados atrás dele."
    },
    {
        id: 24,
        name: "Três de Paus",
        arcana: "Minor",
        suit: "Wands",
        number: 3,
        image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Wands03.jpg",
        keywords: ["Exploração", "Colaboração", "Progresso", "Visão"],
        meanings: {
            upright: "Expansão, colaboração bem-sucedida e visão de longo prazo.",
            reversed: "Obstáculos, falta de progresso ou más notícias."
        },
        description: "Um homem nas falésias olhando para navios no mar, segurando um bastão, com dois outros atrás dele."
    },
    {
        id: 25,
        name: "Quatro de Paus",
        arcana: "Minor",
        suit: "Wands",
        number: 4,
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Wands04.jpg",
        keywords: ["Celebração", "Estabilidade", "Harmonia", "Reunião"],
        meanings: {
            upright: "Celebração, harmonia doméstica e estabilidade alcançada.",
            reversed: "Falta de apoio, instabilidade ou celebração atrasada."
        },
        description: "Duas pessoas sob uma grinalda de flores conectando quatro bastões, com um castelo ao fundo."
    },
    {
        id: 26,
        name: "Cinco de Paus",
        arcana: "Minor",
        suit: "Wands",
        number: 5,
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Wands05.jpg",
        keywords: ["Conflito", "Competição", "Desacordo", "Desafio"],
        meanings: {
            upright: "Conflito, competição saudável ou desacordos menores.",
            reversed: "Resolução de conflitos, evitar confronto ou acordo alcançado."
        },
        description: "Cinco homens lutando com bastões em um campo acidentado."
    },
    {
        id: 27,
        name: "Seis de Paus",
        arcana: "Minor",
        suit: "Wands",
        number: 6,
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Wands06.jpg",
        keywords: ["Vitória", "Reconhecimento", "Sucesso", "Progresso"],
        meanings: {
            upright: "Vitória pública, reconhecimento e sucesso alcançado.",
            reversed: "Falta de reconhecimento, atraso no sucesso ou orgulho excessivo."
        },
        description: "Um homem vitorioso montando um cavalo, segurando um bastão com uma coroa de louros, cercado por apoiadores."
    },
    {
        id: 28,
        name: "Sete de Paus",
        arcana: "Minor",
        suit: "Wands",
        number: 7,
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Wands07.jpg",
        keywords: ["Defesa", "Persistência", "Desafio", "Coragem"],
        meanings: {
            upright: "Defesa de posição, persistência contra adversidades e coragem.",
            reversed: "Sobrecarga, desistência ou falta de preparação."
        },
        description: "Um homem no topo de uma colina defendendo-se com um bastão contra seis outros abaixo dele."
    },
    {
        id: 29,
        name: "Oito de Paus",
        arcana: "Minor",
        suit: "Wands",
        number: 8,
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Wands08.jpg",
        keywords: ["Rapidez", "Ação", "Progresso", "Movimento"],
        meanings: {
            upright: "Movimento rápido, progresso acelerado e ações decisivas.",
            reversed: "Atrasos, falta de progresso ou ações precipitadas."
        },
        description: "Oito bastões voando pelo ar em direção a um vale verdejante."
    },
    {
        id: 30,
        name: "Nove de Paus",
        arcana: "Minor",
        suit: "Wands",
        number: 9,
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Wands09.jpg",
        keywords: ["Resiliência", "Persistência", "Defesa", "Cautela"],
        meanings: {
            upright: "Força final, resiliência e preparação para o último desafio.",
            reversed: "Exaustão, defensividade excessiva ou vulnerabilidade."
        },
        description: "Um homem ferido segurando um bastão, com outros oito atrás dele formando uma barreira."
    },
    {
        id: 31,
        name: "Dez de Paus",
        arcana: "Minor",
        suit: "Wands",
        number: 10,
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Wands10.jpg",
        keywords: ["Carga", "Responsabilidade", "Esforço", "Obrigação"],
        meanings: {
            upright: "Carga pesada, muitas responsabilidades e esforço excessivo.",
            reversed: "Alívio da carga, delegar responsabilidades ou libertação."
        },
        description: "Um homem carregando dez bastões pesados em direção a uma cidade distante."
    },
    {
        id: 32,
        name: "Valete de Paus",
        arcana: "Minor",
        suit: "Wands",
        number: 11,
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/WandsPage.jpg",
        keywords: ["Exploração", "Entusiasmo", "Mensagem", "Aprendizado"],
        meanings: {
            upright: "Notícias excitantes, entusiasmo juvenil e novas ideias.",
            reversed: "Notícias atrasadas, falta de direção ou imaturidade."
        },
        description: "Um jovem segurando um bastão, com camisas amarelas, diante de um deserto com pirâmides."
    },
    {
        id: 33,
        name: "Cavaleiro de Paus",
        arcana: "Minor",
        suit: "Wands",
        number: 12,
        image: "https://upload.wikimedia.org/wikipedia/commons/1/16/WandsKnight.jpg",
        keywords: ["Ação", "Aventura", "Impulsividade", "Energia"],
        meanings: {
            upright: "Ação rápida, aventura e movimento em direção a objetivos.",
            reversed: "Impulsividade, agitação ou ação precipitada."
        },
        description: "Um cavaleiro em um cavalo empinado, segurando um bastão, vestindo uma armadura com camisas de salamandras."
    },
    {
        id: 34,
        name: "Rainha de Paus",
        arcana: "Minor",
        suit: "Wands",
        number: 13,
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0d/WandsQueen.jpg",
        keywords: ["Confiança", "Atração", "Vitalidade", "Independência"],
        meanings: {
            upright: "Mulher confiante e cativante, vitalidade e independência.",
            reversed: "Insegurança, ciúmes ou dominância excessiva."
        },
        description: "Uma mulher sentada em um trono com bastões decorados com girassóis, segurando um girassol, com um gato preto aos seus pés."
    },
    {
        id: 35,
        name: "Rei de Paus",
        arcana: "Minor",
        suit: "Wands",
        number: 14,
        image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/WandsKing.jpg",
        keywords: ["Liderança", "Visão", "Inspiração", "Ambição"],
        meanings: {
            upright: "Líder natural, visão inspiradora e ação ambiciosa.",
            reversed: "Autoritário, impaciente ou manipulador."
        },
        description: "Um rei maduro sentado em um trono decorado com leões e salamandras, segurando um bastão florescente."
    },
    {
        id: 36,
        name: "Ás de Copas",
        arcana: "Minor",
        suit: "Cups",
        number: 1,
        image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Cups01.jpg",
        keywords: ["Amor", "Emoção", "Intuição", "Novos Sentimentos"],
        meanings: {
            upright: "Novo amor, alegria emocional e abertura do coração.",
            reversed: "Coração fechado, desequilíbrio emocional ou amor não correspondido."
        },
        description: "Uma mão saindo de uma nuvem segurando um cálice com água fluindo, com uma pomba trazendo uma hóstia."
    },
    {
        id: 37,
        name: "Dois de Copas",
        arcana: "Minor",
        suit: "Cups",
        number: 2,
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Cups02.jpg",
        keywords: ["União", "Atração", "Parceria", "Harmonia"],
        meanings: {
            upright: "União amorosa, parceria harmoniosa e atração mútua.",
            reversed: "Desunião, desequilíbrio ou quebra de confiança."
        },
        description: "Um homem e uma mulher trocando cálices, com o caduceu de Hermes acima deles."
    },
    {
        id: 38,
        name: "Três de Copas",
        arcana: "Minor",
        suit: "Cups",
        number: 3,
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Cups03.jpg",
        keywords: ["Celebração", "Amizade", "Comunidade", "Alegria"],
        meanings: {
            upright: "Celebração com amigos, alegria compartilhada e comunidade.",
            reversed: "Conflito social, excesso de festas ou solidão."
        },
        description: "Três mulheres dançando e erguendo cálices em celebração, com frutas e vegetais ao redor."
    },
    {
        id: 39,
        name: "Quatro de Copas",
        arcana: "Minor",
        suit: "Cups",
        number: 4,
        image: "https://upload.wikimedia.org/wikipedia/commons/3/35/Cups04.jpg",
        keywords: ["Apatia", "Contemplação", "Descontentamento", "Introspecção"],
        meanings: {
            upright: "Introspecção, descontentamento com ofertas atuais e apatia.",
            reversed: "Nova perspectiva, aceitação de ofertas ou saída da letargia."
        },
        description: "Um homem sentado sob uma árvore, contemplando três cálices no chão enquanto um quarto é oferecido por uma mão na nuvem."
    },
    {
        id: 40,
        name: "Cinco de Copas",
        arcana: "Minor",
        suit: "Cups",
        number: 5,
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Cups05.jpg",
        keywords: ["Perda", "Luto", "Desapontamento", "Foco no Negativo"],
        meanings: {
            upright: "Foco na perda, desapontamento e luto emocional.",
            reversed: "Aceitação, superação da perda ou nova perspectiva."
        },
        description: "Uma figura de capa negra olhando para três cálices derrubados, ignorando dois em pé atrás, com uma ponte e um castelo ao fundo."
    },
    {
        id: 41,
        name: "Seis de Copas",
        arcana: "Minor",
        suit: "Cups",
        number: 6,
        image: "https://upload.wikimedia.org/wikipedia/commons/1/17/Cups06.jpg",
        keywords: ["Nostalgia", "Inocência", "Memórias", "Generosidade"],
        meanings: {
            upright: "Memórias felizes, nostalgia e generosidade infantil.",
            reversed: "Viver no passado, dificuldade em deixar ir ou memórias dolorosas."
        },
        description: "Duas crianças em um jardim, uma oferecendo um copo com flor a outra, com cálices floridos ao fundo."
    },
    {
        id: 42,
        name: "Sete de Copas",
        arcana: "Minor",
        suit: "Cups",
        number: 7,
        image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Cups07.jpg",
        keywords: ["Ilusão", "Escolhas", "Fantasia", "Sonhos"],
        meanings: {
            upright: "Muitas opções, ilusões e escolhas baseadas em fantasias.",
            reversed: "Clareza, decisão realista ou foco no essencial."
        },
        description: "Uma figura olhando para sete cálices flutuando nas nuvens, cada um contendo símbolos diferentes (serpente, castelo, jóias, etc.)."
    },
    {
        id: 43,
        name: "Oito de Copas",
        arcana: "Minor",
        suit: "Cups",
        number: 8,
        image: "https://upload.wikimedia.org/wikipedia/commons/6/60/Cups08.jpg",
        keywords: ["Abandono", "Busca", "Desilusão", "Partida"],
        meanings: {
            upright: "Deixar para trás, buscar significado mais profundo e desilusão.",
            reversed: "Medo de deixar, estagnação ou retorno ao familiar."
        },
        description: "Uma figura caminhando para longe de oito cálices empilhados, em direção a montanhas sob a lua."
    },
    {
        id: 44,
        name: "Nove de Copas",
        arcana: "Minor",
        suit: "Cups",
        number: 9,
        image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Cups09.jpg",
        keywords: ["Satisfação", "Contentamento", "Desejos Realizados", "Abundância"],
        meanings: {
            upright: "Desejos realizados, satisfação emocional e contentamento.",
            reversed: "Insatisfação, excesso material ou desejo não realizado."
        },
        description: "Um homem satisfeito sentado com nove cálices atrás dele em uma prateleira, com os braços cruzados em sorriso contente."
    },
    {
        id: 45,
        name: "Dez de Copas",
        arcana: "Minor",
        suit: "Cups",
        number: 10,
        image: "https://upload.wikimedia.org/wikipedia/commons/8/84/Cups10.jpg",
        keywords: ["Felicidade", "Harmonia Familiar", "Alegria", "Cumprimento"],
        meanings: {
            upright: "Felicidade familiar, harmonia e alegria completa.",
            reversed: "Conflito familiar, falta de harmonia ou felicidade temporária."
        },
        description: "Uma família feliz abraçada sob um arco-íris com dez cálices, com uma casa e rio ao fundo."
    },
    {
        id: 46,
        name: "Valete de Copas",
        arcana: "Minor",
        suit: "Cups",
        number: 11,
        image: "https://upload.wikimedia.org/wikipedia/commons/a/ad/CupsPage.jpg",
        keywords: ["Mensagem Amorosa", "Criatividade", "Sensibilidade", "Sonhador"],
        meanings: {
            upright: "Mensagem emocional, criatividade e sensibilidade artística.",
            reversed: "Mensagem emocional atrasada, imaturidade emocional ou desilusão."
        },
        description: "Um jovem segurando um copo com um peixe saindo, vestindo roupas coloridas perto da água."
    },
    {
        id: 47,
        name: "Cavaleiro de Copas",
        arcana: "Minor",
        suit: "Cups",
        number: 12,
        image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/CupsKnight.jpg",
        keywords: ["Romance", "Cortesia", "Emoção", "Fantasia"],
        meanings: {
            upright: "Romance, proposta emocional e busca por ideais.",
            reversed: "Desilusão, evasão emocional ou proposta insincera."
        },
        description: "Um cavaleiro em um cavalo andando lentamente, segurando um copo, com asas no capacete e nas botas."
    },
    {
        id: 48,
        name: "Rainha de Copas",
        arcana: "Minor",
        suit: "Cups",
        number: 13,
        image: "https://upload.wikimedia.org/wikipedia/commons/6/61/CupsQueen.jpg",
        keywords: ["Compaixão", "Intuição", "Cuidado", "Estabilidade Emocional"],
        meanings: {
            upright: "Compaixão profunda, intuição forte e cuidado emocional.",
            reversed: "Dependência emocional, vitimização ou intuição bloqueada."
        },
        description: "Uma rainha sentada em um trono à beira-mar, segurando um copo elaborado com duas mãos, olhando intensamente para ele."
    },
    {
        id: 49,
        name: "Rei de Copas",
        arcana: "Minor",
        suit: "Cups",
        number: 14,
        image: "https://upload.wikimedia.org/wikipedia/commons/0/04/CupsKing.jpg",
        keywords: ["Equilíbrio Emocional", "Compaixão", "Diplomacia", "Controle"],
        meanings: {
            upright: "Controle emocional, compaixão equilibrada e diplomacia.",
            reversed: "Manipulação emocional, frieza ou desequilíbrio emocional."
        },
        description: "Um rei sentado em um trono em mar agitado, segurando um cetro e um copo, com um peixe pulando do mar."
    },
    {
        id: 50,
        name: "Ás de Espadas",
        arcana: "Minor",
        suit: "Swords",
        number: 1,
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Swords01.jpg",
        keywords: ["Clareza", "Verdade", "Descoberta", "Justiça"],
        meanings: {
            upright: "Clareza mental, verdade revelada e novos insights.",
            reversed: "Confusão, decisão prejudicada ou uso errado do poder."
        },
        description: "Uma mão saindo de uma nuvem segurando uma espada ereta com uma coroa no topo, sobre montanhas."
    },
    {
        id: 51,
        name: "Dois de Espadas",
        arcana: "Minor",
        suit: "Swords",
        number: 2,
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Swords02.jpg",
        keywords: ["Impasse", "Decisão", "Escolha", "Equilíbrio"],
        meanings: {
            upright: "Decisão difícil, equilíbrio entre opções e impasse.",
            reversed: "Indecisão, evitar escolhas ou revelação da verdade."
        },
        description: "Uma mulher vendada sentada à beira-mar, segurando duas espadas cruzadas sobre o peito."
    },
    {
        id: 52,
        name: "Três de Espadas",
        arcana: "Minor",
        suit: "Swords",
        number: 3,
        image: "https://upload.wikimedia.org/wikipedia/commons/0/02/Swords03.jpg",
        keywords: ["Coração Partido", "Tristeza", "Traição", "Dor"],
        meanings: {
            upright: "Coração partido, tristeza, traição e dor emocional.",
            reversed: "Cura emocional, perdão ou alívio da dor."
        },
        description: "Um coração perfurado por três espadas, com nuvens escuras e chuva caindo."
    },
    {
        id: 53,
        name: "Quatro de Espadas",
        arcana: "Minor",
        suit: "Swords",
        number: 4,
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Swords04.jpg",
        keywords: ["Descanso", "Recuperação", "Meditação", "Paz"],
        meanings: {
            upright: "Descanso necessário, recuperação e paz mental.",
            reversed: "Insônia, estresse contínuo ou evitar descanso."
        },
        description: "Uma figura reclinada em um túmulo, com três espadas na parede e uma abaixo, com uma janela mostrando vitral."
    },
    {
        id: 54,
        name: "Cinco de Espadas",
        arcana: "Minor",
        suit: "Swords",
        number: 5,
        image: "https://upload.wikimedia.org/wikipedia/commons/2/23/Swords05.jpg",
        keywords: ["Conflito", "Derrota", "Covardia", "Tensão"],
        meanings: {
            upright: "Conflito onde ninguém ganha, derrota e tensão.",
            reversed: "Reconciliação, evitar conflito ou lições aprendidas."
        },
        description: "Um homem sorridente segurando três espadas, com duas pessoas derrotadas caminhando para longe, e duas espadas no chão."
    },
    {
        id: 55,
        name: "Seis de Espadas",
        arcana: "Minor",
        suit: "Swords",
        number: 6,
        image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Swords06.jpg",
        keywords: ["Transição", "Mudança", "Cura", "Jornada"],
        meanings: {
            upright: "Transição para tempos melhores, cura e jornada emocional.",
            reversed: "Estagnação, resistência à mudança ou viagem difícil."
        },
        description: "Uma figura em um barco com seis espadas, sendo remado por um barqueiro para águas mais calmas."
    },
    {
        id: 56,
        name: "Sete de Espadas",
        arcana: "Minor",
        suit: "Swords",
        number: 7,
        image: "https://upload.wikimedia.org/wikipedia/commons/3/34/Swords07.jpg",
        keywords: ["Engano", "Estratégia", "Furtividade", "Segredos"],
        meanings: {
            upright: "Estratégia, furtividade ou possível engano.",
            reversed: "Revelação, estratégia falha ou honestidade recuperada."
        },
        description: "Um homem sorrateiro carregando cinco espadas, deixando duas para trás em um acampamento inimigo."
    },
    {
        id: 57,
        name: "Oito de Espadas",
        arcana: "Minor",
        suit: "Swords",
        number: 8,
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Swords08.jpg",
        keywords: ["Restrição", "Vitimização", "Isolamento", "Poder Pessoal"],
        meanings: {
            upright: "Sentir-se preso, vitimizado ou limitado por crenças.",
            reversed: "Libertação, recuperação de poder ou novas perspectivas."
        },
        description: "Uma mulher vendada e amarrada, cercada por oito espadas, com um castelo ao fundo em terreno pantanoso."
    },
    {
        id: 58,
        name: "Nove de Espadas",
        arcana: "Minor",
        suit: "Swords",
        number: 9,
        image: "https://upload.wikimedia.org/wikipedia/commons/2/27/Swords09.jpg",
        keywords: ["Ansiedade", "Medo", "Pesadelos", "Culpa"],
        meanings: {
            upright: "Ansiedade extrema, pesadelos e preocupações noturnas.",
            reversed: "Alívio da ansiedade, enfrentando medos ou recuperação."
        },
        description: "Uma pessoa sentada na cama com as mãos no rosto, nove espadas na parede e uma colcha decorada com signos do zodíaco."
    },
    {
        id: 59,
        name: "Dez de Espadas",
        arcana: "Minor",
        suit: "Swords",
        number: 10,
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Swords10.jpg",
        keywords: ["Fim", "Traição", "Vitimização", "Crise"],
        meanings: {
            upright: "Fim doloroso, traição ou sensação de ser vitimizado.",
            reversed: "Recuperação, fundo do poço ou novo início após crise."
        },
        description: "Uma figura deitada com dez espadas nas costas, em um pôr do sol sobre água calma."
    },
    {
        id: 60,
        name: "Valete de Espadas",
        arcana: "Minor",
        suit: "Swords",
        number: 11,
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/SwordsPage.jpg",
        keywords: ["Curiosidade", "Vigilância", "Mensagem", "Ideias"],
        meanings: {
            upright: "Mente curiosa, vigilância e novas ideias intelectuais.",
            reversed: "Espionagem, más notícias ou uso indevido da mente."
        },
        description: "Um jovem segurando uma espada em terreno ventoso, com pássaros voando e nuvens turbulentas."
    },
    {
        id: 61,
        name: "Cavaleiro de Espadas",
        arcana: "Minor",
        suit: "Swords",
        number: 12,
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b0/SwordsKnight.jpg",
        keywords: ["Ação Rápida", "Ambicioso", "Intelectual", "Direto"],
        meanings: {
            upright: "Ação rápida, ambição intelectual e abordagem direta.",
            reversed: "Impulsividade, agressão ou ações precipitadas."
        },
        description: "Um cavaleiro em um cavalo galopante, espada erguida, com borboletas em seu manto e nuvens tempestuosas."
    },
    {
        id: 62,
        name: "Rainha de Espadas",
        arcana: "Minor",
        suit: "Swords",
        number: 13,
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/SwordsQueen.jpg",
        keywords: ["Clareza", "Independência", "Inteligência", "Verdade"],
        meanings: {
            upright: "Clareza mental, independência e inteligência afiada.",
            reversed: "Frieza, amargura ou uso cruel da verdade."
        },
        description: "Uma rainha sentada em um trono de pedra, segurando uma espada para cima, com uma mão estendida, olhando diretamente para frente."
    },
    {
        id: 63,
        name: "Rei de Espadas",
        arcana: "Minor",
        suit: "Swords",
        number: 14,
        image: "https://upload.wikimedia.org/wikipedia/commons/3/33/SwordsKing.jpg",
        keywords: ["Autoridade", "Justiça", "Intelecto", "Verdade"],
        meanings: {
            upright: "Autoridade justa, mente analítica e verdade acima de tudo.",
            reversed: "Tirania, manipulação mental ou abuso de poder."
        },
        description: "Um rei sentado em um trono de pedra com espadas esculpidas, segurando uma espada para cima, com borboletas e árvores ao fundo."
    },
    {
        id: 64,
        name: "Ás de Ouros",
        arcana: "Minor",
        suit: "Pentacles",
        number: 1,
        image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Pents01.jpg",
        keywords: ["Oportunidade", "Prosperidade", "Novo Negócio", "Potencial"],
        meanings: {
            upright: "Nova oportunidade financeira, prosperidade e potencial material.",
            reversed: "Oportunidade perdida, ganho atrasado ou má gestão financeira."
        },
        description: "Uma mão saindo de uma nuvem segurando um grande pentagrama dourado, com um jardim florido abaixo."
    },
    {
        id: 65,
        name: "Dois de Ouros",
        arcana: "Minor",
        suit: "Pentacles",
        number: 2,
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Pents02.jpg",
        keywords: ["Equilíbrio", "Adaptabilidade", "Malabarismo", "Fluxo"],
        meanings: {
            upright: "Equilibrar recursos, adaptabilidade e gerenciar múltiplas responsabilidades.",
            reversed: "Desequilíbrio, sobrecarga ou falta de planejamento."
        },
        description: "Um jovem malabarizando dois pentagramas conectados em uma figura oito, com navios navegando em mar agitado."
    },
    {
        id: 66,
        name: "Três de Ouros",
        arcana: "Minor",
        suit: "Pentacles",
        number: 3,
        image: "https://upload.wikimedia.org/wikipedia/commons/4/42/Pents03.jpg",
        keywords: ["Colaboração", "Habilidade", "Trabalho em Equipe", "Artesanato"],
        meanings: {
            upright: "Colaboração bem-sucedida, reconhecimento de habilidades e trabalho de qualidade.",
            reversed: "Falta de cooperação, trabalho de má qualidade ou reconhecimento faltando."
        },
        description: "Um artesão esculpindo em uma catedral, discutindo planos com um monge e um nobre."
    },
    {
        id: 67,
        name: "Quatro de Ouros",
        arcana: "Minor",
        suit: "Pentacles",
        number: 4,
        image: "https://upload.wikimedia.org/wikipedia/commons/3/35/Pents04.jpg",
        keywords: ["Conservadorismo", "Controle", "Segurança", "Posse"],
        meanings: {
            upright: "Controle sobre recursos, segurança financeira e conservadorismo.",
            reversed: "Apego excessivo, generosidade ou instabilidade financeira."
        },
        description: "Um homem sentado segurando firmemente um pentagrama, com outros três sob seus pés e sobre sua cabeça, em uma cidade."
    },
    {
        id: 68,
        name: "Cinco de Ouros",
        arcana: "Minor",
        suit: "Pentacles",
        number: 5,
        image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Pents05.jpg",
        keywords: ["Dificuldade", "Pobreza", "Isolamento", "Preocupação"],
        meanings: {
            upright: "Dificuldade material, isolamento e preocupação financeira.",
            reversed: "Recuperação, ajuda disponível ou nova perspectiva sobre dificuldades."
        },
        description: "Duas figuras pobres e feridas passando por uma igreja com vitral iluminado em noite de neve."
    },
    {
        id: 69,
        name: "Seis de Ouros",
        arcana: "Minor",
        suit: "Pentacles",
        number: 6,
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Pents06.jpg",
        keywords: ["Generosidade", "Caridade", "Partilha", "Equilíbrio"],
        meanings: {
            upright: "Generosidade, caridade e equilíbrio entre dar e receber.",
            reversed: "Desequilíbrio de poder, dívidas ou caridade com segundas intenções."
        },
        description: "Um homem rico distribuindo moedas a dois mendigos, segurando uma balança."
    },
    {
        id: 70,
        name: "Sete de Ouros",
        arcana: "Minor",
        suit: "Pentacles",
        number: 7,
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Pents07.jpg",
        keywords: ["Paciência", "Reavaliação", "Investimento", "Crescimento"],
        meanings: {
            upright: "Reavaliar investimentos, paciência para resultados e trabalho a longo prazo.",
            reversed: "Falta de progresso, impaciência ou investimentos ruins."
        },
        description: "Um agricultor apoiado em sua enxada, contemplando sete pentagramas crescendo em um arbusto."
    },
    {
        id: 71,
        name: "Oito de Ouros",
        arcana: "Minor",
        suit: "Pentacles",
        number: 8,
        image: "https://upload.wikimedia.org/wikipedia/commons/4/49/Pents08.jpg",
        keywords: ["Artesanato", "Habilidade", "Dedicação", "Aprendizado"],
        meanings: {
            upright: "Dedicação ao ofício, desenvolvimento de habilidades e trabalho diligente.",
            reversed: "Trabalho sem inspiração, falta de crescimento ou trabalho de má qualidade."
        },
        description: "Um artesão martelando um pentagrama, com outros sete completos na parede, em uma oficina."
    },
    {
        id: 72,
        name: "Nove de Ouros",
        arcana: "Minor",
        suit: "Pentacles",
        number: 9,
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Pents09.jpg",
        keywords: ["Autossuficiência", "Luxo", "Recompensa", "Abundância"],
        meanings: {
            upright: "Autossuficiência, recompensas materiais e luxo merecido.",
            reversed: "Dependência material, valor superficial ou ganhos não merecidos."
        },
        description: "Uma mulher bem vestida em um jardim de videiras, com um falcão em sua luva e nove pentagramas atrás dela."
    },
    {
        id: 73,
        name: "Dez de Ouros",
        arcana: "Minor",
        suit: "Pentacles",
        number: 10,
        image: "https://upload.wikimedia.org/wikipedia/commons/4/42/Pents10.jpg",
        keywords: ["Riqueza", "Legado", "Família", "Estabilidade"],
        meanings: {
            upright: "Riqueza familiar, legado e estabilidade financeira completa.",
            reversed: "Conflito familiar, perda de herança ou instabilidade financeira."
        },
        description: "Uma família feliz sob um arco em uma cidade, com um ancião e um cachorro, e dez pentagramas dispostos em uma árvore da vida."
    },
    {
        id: 74,
        name: "Valete de Ouros",
        arcana: "Minor",
        suit: "Pentacles",
        number: 11,
        image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/PentsPage.jpg",
        keywords: ["Estudante", "Aprendizado", "Manifestação", "Praticidade"],
        meanings: {
            upright: "Estudante aplicado, manifestação prática e novas oportunidades de aprendizado.",
            reversed: "Falta de progresso, preguiça ou oportunidades desperdiçadas."
        },
        description: "Um jovem segurando um pentagrama cuidadosamente, olhando para ele em um campo fértil."
    },
    {
        id: 75,
        name: "Cavaleiro de Ouros",
        arcana: "Minor",
        suit: "Pentacles",
        number: 12,
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/PentsKnight.jpg",
        keywords: ["Responsabilidade", "Trabalho Duro", "Confiabilidade", "Progresso Lento"],
        meanings: {
            upright: "Trabalho duro, responsabilidade e progresso estável.",
            reversed: "Estagnação, preguiça ou irresponsabilidade."
        },
        description: "Um cavaleiro em um cavalo pesado, segurando um pentagrama, em um campo arado."
    },
    {
        id: 76,
        name: "Rainha de Ouros",
        arcana: "Minor",
        suit: "Pentacles",
        number: 13,
        image: "https://www.astrolink.com.br/data/tarot/rainha-de-ouros.jpg",
        keywords: ["Nutrição", "Abundância", "Praticidade", "Cuidado"],
        meanings: {
            upright: "Nutrição prática, abundância material e cuidado com recursos.",
            reversed: "Negligência material, dependência ou sufocamento."
        },
        description: "Uma rainha sentada em um trono decorado com símbolos da terra, segurando um pentagrama, em um jardim fértil."
    },
    {
        id: 77,
        name: "Rei de Ouros",
        arcana: "Minor",
        suit: "Pentacles",
        number: 14,
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1c/PentsKing.jpg",
        keywords: ["Prosperidade", "Negócios", "Estabilidade", "Abundância"],
        meanings: {
            upright: "Prosperidade material, estabilidade financeira e sucesso nos negócios.",
            reversed: "Ganância, materialismo excessivo ou instabilidade financeira."
        },
        description: "Um rei sentado em um trono decorado com touros, segurando um cetro e um pentagrama, em um jardim de castelo."
    }
];