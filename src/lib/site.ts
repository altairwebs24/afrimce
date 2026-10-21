import logo from "@/assets/IMG-20261021-WA0014.jpg.asset.json";
import video from "@/assets/VID-20261021-WA0019.mp4.asset.json";
import i1 from "@/assets/IMG-20261021-WA0001.jpg.asset.json";
import i3 from "@/assets/IMG-20261021-WA0003.jpg.asset.json";
import i4 from "@/assets/IMG-20261021-WA0004.jpg.asset.json";
import i5 from "@/assets/IMG-20261021-WA0005.jpg.asset.json";
import i6 from "@/assets/IMG-20261021-WA0006.jpg.asset.json";
import i7 from "@/assets/IMG-20261021-WA0007.jpg.asset.json";
import i8 from "@/assets/IMG-20261021-WA0008.jpg.asset.json";
import i9 from "@/assets/IMG-20261021-WA0009.jpg.asset.json";

export const logoUrl = logo.url;
export const heroVideo = video.url;

export const contact = {
  phone: "069 352 4476",
  phoneHref: "tel:+27693524476",
  whatsapp: "https://wa.me/27693524476",
  email: "aprilmcephe@gmail.com",
  location: "Mokopane, Limpopo",
};

export type Project = { img: string; category: string; title: string; description: string };

export const projects: Project[] = [
  { img: i6.url, category: "TV Stands", title: "The Marble Lounge", description: "A floating white TV unit framed by a book-matched marble wall, warm oak slats and backlit display shelving." },
  { img: i9.url, category: "Wardrobes", title: "Gilded Glass Wardrobe", description: "Floor-to-ceiling wardrobes with smoked-glass, black-framed doors and soft golden interior lighting." },
  { img: i8.url, category: "Kitchens", title: "The Island Kitchen", description: "A waterfall-edge island with walnut accents, pendant lighting and a sculpted bulkhead ceiling." },
  { img: i5.url, category: "Kitchens", title: "Ivory & Smoke", description: "Handleless gloss cabinetry, smoked-glass wall units and cove lighting over marble-look floors." },
  { img: i4.url, category: "TV Stands", title: "Noir Slat Media Wall", description: "Charcoal acoustic slats behind a crisp white panel and a long, floating gloss console." },
  { img: i3.url, category: "Interior Design", title: "Timber Pantry Wall", description: "Full-height oak cladding housing an integrated fridge and an illuminated glass display cabinet." },
  { img: i7.url, category: "Kitchens", title: "Rouge Kitchen", description: "A bold red gloss kitchen with a curved granite island, gas hob and a statement red ceiling." },
  { img: i1.url, category: "TV Stands", title: "Walnut Media Console", description: "A low walnut-and-white TV stand set against a dark textured feature wall." },
];

// Homepage selection: last two images, the second image, plus one more
export const featured = [projects[0], projects[1], projects[2], projects[3]];

export const services = [
  { title: "Interior Design", text: "Complete spaces conceived around how you live — layout, lighting, finishes and detail." },
  { title: "Kitchens", text: "Bespoke kitchens with islands, gloss or timber cabinetry and premium worktops." },
  { title: "Wardrobes", text: "Built-in and walk-in wardrobes with glass doors, lighting and tailored storage." },
  { title: "Vanities", text: "Elegant bathroom vanities in stone, timber and gloss — made to measure." },
  { title: "TV Stands", text: "Floating consoles and feature media walls in marble, slats and lacquer." },
];
