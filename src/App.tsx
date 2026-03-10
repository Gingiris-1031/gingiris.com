type LogoItem = {
  name: string;
  src: string;
};

const openSourceLaunch: LogoItem[] = [
  { name: "second me", src: "/figma-assets/tiles/card1-second-me.png" },
  { name: "memu", src: "/figma-assets/tiles/card1-memu.png" },
  { name: "third mark", src: "/figma-assets/tiles/card1-third-mark.png" },
  { name: "datastrato", src: "/figma-assets/tiles/card1-datastrato.png" },
  { name: "ten-frameworl", src: "/figma-assets/tiles/card1-ten-frameworl.png" },
  { name: "buddle/camel", src: "/figma-assets/tiles/card1-buddle-camel.png" },
  { name: "acemusic", src: "/figma-assets/tiles/card1-acemusic.png" },
  { name: "acontext", src: "/figma-assets/tiles/card1-acontext.png" },
];

const startupCoach: LogoItem[] = [
  { name: "bonjor", src: "/figma-assets/tiles/card2-bonjor.png" },
  { name: "sparklab", src: "/figma-assets/tiles/card2-sparklab.png" },
  { name: "wanwushi", src: "/figma-assets/tiles/card2-wanwushi.png" },
  { name: "datastrato", src: "/figma-assets/tiles/card2-datastrato-2.png" },
  { name: "kusa", src: "/figma-assets/tiles/card2-kusa.png" },
  { name: "eezycollb", src: "/figma-assets/tiles/card2-eezycollb.png" },
  { name: "nomofly", src: "/figma-assets/tiles/card2-nomofly.png" },
  { name: "papergen", src: "/figma-assets/tiles/card2-papergen.png" },
];

function LogoCard({ title, logos, nodeId }: { title: string; logos: LogoItem[]; nodeId: string }) {
  return (
    <article className="logo-card" data-node-id={nodeId}>
      <header className="card-header">
        <span className="trophy" aria-hidden>
          🏆
        </span>
        <h2>{title}</h2>
      </header>
      <div className="logo-grid">
        {logos.map((logo) => (
          <figure className="logo-cell" key={logo.name}>
            <img loading="lazy" src={logo.src} alt={logo.name} />
          </figure>
        ))}
      </div>
    </article>
  );
}

export default function App() {
  return (
    <main className="wall-root" data-node-id="209:75">
      <section className="wall-frame" data-node-id="271:815">
        <header className="wall-title" data-node-id="220:708">
          <span className="title-mark" data-node-id="220:710" />
          <h1 data-node-id="220:711">辅导过的项目</h1>
        </header>

        <div className="cards" data-node-id="220:595">
          <LogoCard title="OpenSource Launch" logos={openSourceLaunch} nodeId="220:624" />
          <LogoCard title="Startup Coach" logos={startupCoach} nodeId="222:82" />
        </div>
      </section>
    </main>
  );
}
