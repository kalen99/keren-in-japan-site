/**
 * CELEBRITY_DECK - Add celebrity images to public/celebrities/
 * Structure: public/celebrities/male/1.jpg, public/celebrities/female/1.jpg, etc.
 */

export type CelebrityGender = "male" | "female";

export interface CelebrityEntry {
  id: string;
  name: string;
  /** Path from public folder, e.g. /celebrities/male/1.jpg */
  image: string;
}

/**
 * Add celebrity images to public/celebrities/male/ and public/celebrities/female/
 * Example: public/celebrities/male/1.jpg, public/celebrities/female/1.jpg
 */
export const CELEBRITY_DECK: Record<CelebrityGender, CelebrityEntry[]> = {
  male: [
    { id: "m1", name: "Yokohama Ryusei", image: "/celebrities/male/1.jpg" },
    { id: "m2", name: "Yoshizawa Ryo", image: "/celebrities/male/2.jpg" },
    { id: "m3", name: "Meguro Ren", image: "/celebrities/male/3.jpg" },
    { id: "m4", name: "Okada Masaki", image: "/celebrities/male/4.jpg" },
    { id: "m5", name: "Suda Masaki", image: "/celebrities/male/5.jpg" },
    { id: "m6", name: "Matsumura Hokuto", image: "/celebrities/male/6.jpg" },
    { id: "m7", name: "Sakaguchi Kentaro", image: "/celebrities/male/7.jpg" },
    { id: "m8", name: "Kitamura Takumi", image: "/celebrities/male/8.jpg" },
    { id: "m9", name: "Yamazaki Kento", image: "/celebrities/male/9.jpg" },
    { id: "m10", name: "Takahashi Fumiya", image: "/celebrities/male/10.jpg" },
  ],
  female: [
    { id: "f1", name: "Aragaki Yui", image: "/celebrities/female/1.jpg" },
    { id: "f2", name: "Ayase Haruka", image: "/celebrities/female/2.jpg" },
    { id: "f3", name: "Nagasawa Masami", image: "/celebrities/female/3.jpg" },
    { id: "f4", name: "Kitagawa Keiko", image: "/celebrities/female/4.jpg" },
    { id: "f5", name: "Ishihara Satomi", image: "/celebrities/female/5.jpg" },
    { id: "f6", name: "Hamabe Minami", image: "/celebrities/female/6.jpg" },
    { id: "f7", name: "Hirose Suzu", image: "/celebrities/female/7.jpg" },
    { id: "f8", name: "Hashimoto Kanna", image: "/celebrities/female/8.jpg" },
    { id: "f9", name: "Fukada Kyoko", image: "/celebrities/female/9.jpg" },
    { id: "f10", name: "Imada Mio", image: "/celebrities/female/10.jpg" },
  ],
};

/** Fisher-Yates shuffle */
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getRandomCelebrity(gender: CelebrityGender): CelebrityEntry | null {
  const deck = CELEBRITY_DECK[gender];
  if (!deck || deck.length === 0) return null;
  const shuffled = shuffle(deck);
  return shuffled[0];
}

/** For "rather not answer" - pick from either deck randomly */
export function getRandomCelebrityFromEitherDeck(): CelebrityEntry | null {
  const maleDeck = CELEBRITY_DECK.male;
  const femaleDeck = CELEBRITY_DECK.female;
  const maleCount = maleDeck?.length ?? 0;
  const femaleCount = femaleDeck?.length ?? 0;
  const total = maleCount + femaleCount;
  if (total === 0) return null;
  const pickMale = Math.random() < maleCount / total;
  return pickMale ? getRandomCelebrity("male") : getRandomCelebrity("female");
}
