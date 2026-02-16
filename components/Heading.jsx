function Heading({ title }) {
  return (
    <section className="mb-5 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-4 shadow">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
        {title}
      </h1>
    </section>
  );
}

export default Heading;
