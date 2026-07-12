/** Closing quote of the landing page. */
export default function QuoteSection() {
    return (
        <section className="px-6 pt-12 pb-24 lg:pt-2 lg:pb-4 text-center">
            <blockquote className="max-w-3xl mx-auto font-display italic text-xl md:text-2xl lg:text-base leading-relaxed lg:leading-snug text-white/85">
                <span className="text-accent not-italic">&ldquo;</span>
                Il mondo è un libro e chi non viaggia ne legge solo una pagina.
                <span className="text-accent not-italic">&rdquo;</span>
                <cite className="block not-italic font-sans text-sm lg:text-xs text-white/40 mt-4 lg:mt-1">
                    — Sant&apos;Agostino
                </cite>
            </blockquote>
        </section>
    );
}
