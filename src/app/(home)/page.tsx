import Link from "next/link";
import styles from "./homePage.module.css";

export default function Home() {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/main-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/80 z-10 pointer-events-none" />

      <div className="w-full h-full mx-auto max-w-3xl flex justify-center items-center">
        <div className="relative z-20 grid grid-cols-1 w-full md:grid-cols-2 h-full my-auto max-h-96">
          {PAGES.map((page, index) => (
            <HoverButton key={index} text={page.title} link={page.link} />
          ))}
        </div>
      </div>
    </div>
  );
}

function HoverButton({ text, link }: { text: string; link: string }) {
  return (
    <Link href={link}>
      <div className="group relative w-full h-16 md:h-48 cursor-pointer p-8">
        <div className={styles.cardWrapper}>
          <div className="relative z-10 flex items-center justify-center h-full px-4 text-lg font-bold text-center text-primary   bg-white/60 border border-white/20 backdrop-blur-md shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:bg-white/20 group-hover:text-white">
            {text}
          </div>
        </div>
      </div>
    </Link>
  );
}

const PAGES = [
  { title: "رزرو وقت", link: "app" },
  { title: "مشاهده خدمات", link: "reserve" },
  { title: "ورود کاربران", link: "reserve" },
  { title: "آرایشگران", link: "reserve" },
];
