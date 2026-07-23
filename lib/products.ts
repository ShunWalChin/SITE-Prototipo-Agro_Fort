type ProductKind = "cheese" | "floral" | "bread" | "crumb" | "biscuit";

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  detail: string;
  kind: ProductKind;
  color: string;
  accent: string;
  profile: {
    aroma: number;
    intensidade: number;
    textura: number;
    maturacao: number;
  };
};

export const products: Product[] = [
  {
    slug: "queijo-meia-cura",
    name: "Queijo Minas Meia Cura",
    shortName: "Meia Cura",
    category: "Queijo artesanal",
    description: "Macio por dentro, dourado por fora e com o equilíbrio que faz a mesa pedir mais um pedaço.",
    detail: "Produção familiar • Leite de vaca • Sabor equilibrado",
    kind: "cheese",
    color: "#d6a348",
    accent: "#f6d789",
    profile: { aroma: 72, intensidade: 64, textura: 88, maturacao: 58 },
  },
  {
    slug: "queijo-maturado",
    name: "Queijo Maturado",
    shortName: "Maturado",
    category: "Queijo artesanal",
    description: "Tempo, cuidado e um sabor mais profundo. Uma peça de presença para comer sem pressa.",
    detail: "Casca marcada • Sabor persistente • Cura prolongada",
    kind: "cheese",
    color: "#9e6028",
    accent: "#dbad60",
    profile: { aroma: 91, intensidade: 94, textura: 74, maturacao: 96 },
  },
  {
    slug: "queijo-florido",
    name: "Queijo Florido",
    shortName: "Florido",
    category: "Queijo artesanal",
    description: "Delicado, cremoso e envolvente, com uma casca viva que conta a história da maturação.",
    detail: "Casca florida • Interior cremoso • Lote artesanal",
    kind: "floral",
    color: "#e9ddbb",
    accent: "#fff7d8",
    profile: { aroma: 86, intensidade: 71, textura: 93, maturacao: 78 },
  },
  {
    slug: "pao-de-queijo",
    name: "Pão de Queijo Tradicional",
    shortName: "Pão de queijo",
    category: "Receita da fazenda",
    description: "Casquinha dourada, miolo macio e o sabor de queijo que acompanha a prosa e o café.",
    detail: "Congelado • Pronto para assar • Receita de família",
    kind: "bread",
    color: "#c77a28",
    accent: "#f1b74e",
    profile: { aroma: 82, intensidade: 76, textura: 96, maturacao: 42 },
  },
  {
    slug: "pao-de-queijo-ralado",
    name: "Pão de Queijo Ralado",
    shortName: "Queijo ralado",
    category: "Praticidade artesanal",
    description: "A base Agrofort para preparar em casa com praticidade, sem abrir mão da receita mineira.",
    detail: "Mistura artesanal • Preparo fácil • Sabor raiz",
    kind: "crumb",
    color: "#dd9f3a",
    accent: "#ffe1a0",
    profile: { aroma: 74, intensidade: 70, textura: 78, maturacao: 36 },
  },
  {
    slug: "biscoitos-artesanais",
    name: "Biscoitos Artesanais",
    shortName: "Biscoitos",
    category: "Forno da fazenda",
    description: "Leves, sequinhos e honestos. O tipo de biscoito que transforma uma pausa em lembrança.",
    detail: "Produção local • Pequenos lotes • Feito à mão",
    kind: "biscuit",
    color: "#b9692c",
    accent: "#efba70",
    profile: { aroma: 68, intensidade: 57, textura: 91, maturacao: 30 },
  },
];
