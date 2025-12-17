// src/utils/tarotLogic.ts

import { CardData } from './tarotData'; // Ajuste o import conforme sua estrutura

interface ReadingCard extends CardData {
  isReversed: boolean;
}

// Adicione isso ao arquivo src/utils/tarotLogic.ts

/**
 * Saca 'count' cartas aleatórias do deck e decide se estão invertidas.
 * @param {Array} deck - O array completo de cartas (CardData)
 * @param {number} count - Quantas cartas sacar (ex: 3)
 * @returns {Array} - Array de cartas com a propriedade 'isReversed' adicionada
 */

export const drawCards = (deck: any[], count: number) => {
  // 1. Cria uma cópia do deck para não mutar o original
  const shuffled = [...deck];

  // 2. Algoritmo de embaralhamento (Fisher-Yates simplificado para performance)
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // 3. Seleciona as primeiras 'count' cartas e aplica reversão aleatória (50% chance)
  return shuffled.slice(0, count).map(card => ({
    ...card,
    isReversed: Math.random() < 0.5
  }));
};
// Adicione ao src/utils/tarotLogic.ts

export const shuffleDeck = (deck: any[]) => {
  // 1. Cria cópia para segurança
  const shuffled = [...deck];

  // 2. Embaralhamento Fisher-Yates (Padrão Ouro)
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // 3. Retorna o deck todo com a orientação definida (Invertida ou não)
  return shuffled.map(card => ({
    ...card,
    isReversed: Math.random() < 0.5
  }));
};
export const generateReadingSummary = (cards: ReadingCard[]): string => {
  if (!cards || cards.length < 3) return "A leitura requer no mínimo 3 cartas para uma análise completa.";

  // --- 1. ANÁLISE QUANTITATIVA ---
  const reversedCount = cards.filter(c => c.isReversed).length;
  const majorCount = cards.filter(c => c.arcana === 'Major').length;
  const courtCardsCount = cards.filter(c => c.number >= 11 && c.number <= 14 && c.arcana === 'Minor').length;

  // Elementos (Apenas Arcanos Menores possuem naipe nesta estrutura)
  const elementCounts: Record<string, number> = { Wands: 0, Cups: 0, Swords: 0, Pentacles: 0 };
  let minorCount = 0;

  cards.forEach(card => {
    if (card.suit) {
      elementCounts[card.suit]++;
      minorCount++;
    }
  });

  // Determinar Elemento Dominante (se houver mais de 50% dos arcanos menores)
  let dominantElement = '';
  Object.entries(elementCounts).forEach(([suit, count]) => {
    if (count > minorCount / 2 && minorCount > 0) dominantElement = suit;
  });

  // --- 2. MAPEAMENTO DE SIGNIFICADOS ---
  const elementMap: Record<string, string> = {
    Wands: "Fogo (ação, criatividade e vontade)",
    Cups: "Água (emoções, relacionamentos e intuição)",
    Swords: "Ar (intelecto, decisões e desafios mentais)",
    Pentacles: "Terra (recursos, trabalho e mundo material)"
  };

  const elementAdvice: Record<string, string> = {
    Wands: "é o momento de agir com paixão e não hesitar diante das oportunidades.",
    Cups: "sua intuição e seus sentimentos devem ser o seu guia principal agora.",
    Swords: "a clareza mental e a verdade devem prevalecer sobre a confusão.",
    Pentacles: "focar em resultados práticos e na estabilidade trará os melhores frutos."
  };

  // --- 3. PONTUAÇÃO DE "CLIMA" (Sentiment Analysis) ---
  // Keywords de peso positivo e negativo para refinar o tom
  const positiveWeights = ["Amor", "Sucesso", "Vitória", "Alegria", "Abundância", "União", "Esperança", "Estabilidade", "Cura"];
  const negativeWeights = ["Traição", "Dor", "Conflito", "Perda", "Medo", "Ansiedade", "Ilusão", "Ruína"];

  let moodScore = 0;
  cards.forEach(card => {
    const factor = card.isReversed ? -0.5 : 1; // Reversão atenua o positivo ou agrava o negativo dependendo da interpretação, aqui simplificamos como 'atrito'
    card.keywords.forEach(kw => {
      if (positiveWeights.some(w => kw.includes(w))) moodScore += 2 * factor;
      if (negativeWeights.some(w => kw.includes(w))) moodScore -= 2 * Math.abs(factor); // Negativo reverso muitas vezes ainda é desafio
    });
  });

  // --- 4. CONSTRUÇÃO DA NARRATIVA ---
  let narrativeParts: string[] = [];

  // PARTE A: Abertura e Energia Principal
  if (majorCount >= 2) {
    narrativeParts.push("Esta leitura aponta para um momento decisivo de Grande Transformação. A forte presença dos Arcanos Maiores sugere que forças do destino e lições de vida profundas estão em movimento, transcendendo as questões cotidianas.");
  } else if (courtCardsCount >= 2) {
    narrativeParts.push("A leitura indica uma forte influência de Pessoas e Personalidades. O cenário atual depende muito de como você interage com os outros ou de como integra diferentes facetas da sua própria personalidade para resolver a questão.");
  } else if (dominantElement) {
    narrativeParts.push(`A energia predominante nesta tirada é regida pelo elemento ${elementMap[dominantElement]}. Isso sugere que ${elementAdvice[dominantElement]}`);
  } else {
    narrativeParts.push("As energias se apresentam de forma equilibrada e diversificada, indicando que a situação exige uma abordagem holística, integrando razão, emoção e ação prática.");
  }

  // PARTE B: O Fluxo (Desafio vs Fluxo)
  if (reversedCount > cards.length / 2) {
    narrativeParts.push("Nota-se uma resistência significativa no fluxo das energias. As cartas invertidas sinalizam bloqueios internos, indecisões ou a necessidade de rever planos antes de avançar. O universo pede introspecção antes da ação externa.");
  } else if (moodScore > 3) {
    narrativeParts.push("O caminho à frente se mostra promissor e aberto. Há uma sinergia positiva entre suas intenções e as possibilidades apresentadas, favorecendo o crescimento e a realização dos seus desejos.");
  } else if (moodScore < -3) {
    narrativeParts.push("O cenário apresenta desafios que exigem resiliência. É um período de teste e amadurecimento, onde encarar as dificuldades de frente trará lições valiosas e fortalecimento pessoal.");
  }

  // PARTE C: Síntese da Jornada (Conectando Início e Fim)
  // Assume-se que cards[0] é o foco/presente e a última carta é o resultado/conselho
  const firstCard = cards[0];
  const lastCard = cards[cards.length - 1];

  narrativeParts.push(`A jornada começa com a energia d'<strong>${firstCard.name}<strong>, focada em ${firstCard.keywords[0].toLowerCase()}, e caminha em direção a uma resolução influenciada pel'<strong>${lastCard.name}<strong>.`);

  if (lastCard.arcana === 'Major' && !lastCard.isReversed) {
    narrativeParts.push("O desfecho tende a ser definitivo e marcante, trazendo um novo nível de consciência.");
  } else if (lastCard.suit === 'Pentacles' || lastCard.suit === 'Wands') {
    narrativeParts.push("A conclusão sugere resultados tangíveis e visíveis no mundo real.");
  } else {
    narrativeParts.push("O resultado aponta mais para uma mudança de estado mental ou emocional do que para um evento externo imediato.");
  }

  return narrativeParts.join(" ");
};