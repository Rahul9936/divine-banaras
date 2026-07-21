import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page flex min-h-[50vh] flex-col items-center justify-center text-center">
        <p className="font-display text-7xl font-700 text-sand">404</p>
        <h1 className="mt-2 font-display text-3xl font-700 text-maroon">
          This path leads nowhere
        </h1>
        <p className="mt-3 max-w-md text-ink/70">
          The page you&rsquo;re looking for may have moved. Let&rsquo;s guide you
          back to the yatra.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/" className="btn-primary">
            Back home
          </Link>
          <Link href="/tours" className="btn-outline">
            Browse tours
          </Link>
        </div>
      </div>
    </section>
  );
}
