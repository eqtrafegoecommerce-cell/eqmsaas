// src/utils/slugify.ts

/**
 * Transforma uma string comum em um slug amigável para URLs.
 * Exemplo: "Doces da Ana" -> "doces-da-ana"
 */
export function slugify(texto: string): string {
  return texto
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD") // Decompõe os caracteres com acento em caracteres base + acento
    .replace(/[\u0300-\u036f]/g, "") // Remove os acentos combinados vazios
    .replace(/[^a-z0-9 -]/g, "") // Remove qualquer caractere que não seja letra, número ou espaço
    .replace(/\s+/g, "-") // Substitui um ou mais espaços por um único hífen
    .replace(/-+/g, "-"); // Remove hifens múltiplos seguidos
}