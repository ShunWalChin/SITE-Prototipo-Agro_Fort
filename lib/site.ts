export const site = {
  name: "Agrofort",
  fullName: "Fazenda Agrofort",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://agrofort.64.181.178.125.nip.io",
  phoneDisplay: "(38) 9 9940-2015",
  phoneE164: "5538999402015",
  email: "contato@fazendaagrofort.com.br",
  instagram: "https://www.instagram.com/fazendagrofort/",
  maps: "https://www.google.com/maps/search/?api=1&query=Fazenda+Barra+Funda+Janu%C3%A1ria+MG",
  address: "Fazenda Barra Funda, Januária — Minas Gerais",
};

export function whatsappUrl(message = "Olá, Agrofort! Vim pelo catálogo e gostaria de conhecer os produtos disponíveis.") {
  return `https://wa.me/${site.phoneE164}?text=${encodeURIComponent(message)}`;
}
