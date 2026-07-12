/** Closing quote of the landing page. */
export default function QuoteSection() {
    return (
        <section className="px-6 pt-12 pb-24 text-center">
            <blockquote className="max-w-3xl mx-auto font-display italic text-xl md:text-2xl text-white/85 leading-relaxed">
                <span className="text-accent not-italic">&ldquo;</span>
                Il mondo è un libro e chi non viaggia ne legge solo una pagina.
                <span className="text-accent not-italic">&rdquo;</span>
                <cite className="block not-italic font-sans text-sm text-white/40 mt-4">
                    — Sant&apos;Agostino
                </cite>
            </blockquote>
        </section>
    );
}
