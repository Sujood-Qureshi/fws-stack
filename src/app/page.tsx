import Image from "next/image";

export default function Home() {
  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-stone-950 text-white tracking-wide"
    >
      <main className="flex flex-col gap-8 row-start-2 items-center text-sm sm:text-base text-center">
        <Image
          src="/logo-face.svg"
          alt="Flashy Web Solutions logo"
          width={120}
          height={40}
          priority
        />

        <h1 className="text-[2rem] leading-snug sm:text-5xl font-bold text-white font-[family-name:var(--font-geist-mono)] uppercase">
          Create FWS Stack
        </h1>
        <ol className="text-center max-w-2xl mx-auto leading-normal">
          <li className="mb-2">
            The FWS Stack is a modern full-stack web development stack designed with type safety, security, and the adoption of modern technologies in mind.
          </li>
          <li>
            The FWS Stack is a full-stack boilerplate made by{" "}
            <a
              className="underline"
              href="https://github.com/Sujood-Qureshi"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sujood Qureshi.
            </a>
          </li>
        </ol>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.flashywebsolutions.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered By Flashy Web Solutions
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
        </a>
      </footer>
    </div>
  );
}
