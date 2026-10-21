export default function App() {
  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">DWFE G2 TP2</p>
        <h1>Welcome to your React website</h1>
        <p className="subtitle">
          This is a simple starter structure built with JavaScript, CSS, and React.
        </p>

        <div className="cta-row">
          <button type="button">Get Started</button>
          <button type="button" className="secondary">
            Learn More
          </button>
        </div>
      </section>

      <section className="features">
        <article>
          <h2>Simple</h2>
          <p>Easy to understand structure for a first project.</p>
        </article>
        <article>
          <h2>Modern</h2>
          <p>Built with React and a clean component-based layout.</p>
        </article>
        <article>
          <h2>Ready</h2>
          <p>Prepared for you to expand with more pages and features.</p>
        </article>
      </section>
    </main>
  );
}
