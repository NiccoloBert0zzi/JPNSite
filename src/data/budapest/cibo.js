export const cibo = [
    {
        id: 'classici',
        name: 'Classici',
        kanji: 'Magyar Ételek',
        tagline: 'I piatti che hanno fatto la storia ungherese',
        image: '/images/budapest-food.png',
        accent: '#CE2939',
        sections: [
            {
                id: 'iconici',
                title: 'Piatti Iconici',
                icon: '🫕',
                summary: 'La cucina ungherese è una delle più originali d\'Europa: sapori forti, porzioni abbondanti, paprika ovunque. Non ha quasi niente a che fare con la cucina austriaca o slava dei paesi vicini. È una cucina di radici nomadi — i Magiari erano cavalieri delle steppe che cuocevano la carne lentamente sulla brace — trasformata dai secoli in una tradizione ricchissima.',
                facts: [
                    'Gulyás (goulash): il piatto nazionale ungherese è una ZUPPA, non uno spezzatino denso. Manzo, patate, cipolle, paprika dolce e cumino in brodo abbondante. La versione densa che conoscete in Italia è la variante austriaca (Gulasch)',
                    'Paprikash di Pollo (Csirkepaprikás): pollo brasato in sugo di cipolla, paprika dolce e panna acida (tejföl) — servito con gnocchi di semolino (nokedli/galuska). Il comfort food definitivo ungherese',
                    'Halászlé: la zuppa di pesce piccante del Danubio — carpa, luccio, pesce gatto in brodo di paprika piccante. La versione di Baja è la più famosa, quella di Szeged è più densa. Entrambe ustionano e sono magnifiche',
                    'Töltött Káposzta: foglie di cavolo cappuccio ripiene di carne macinata e riso, cotte nel sugo di crauti e panna acida — piatto invernale, il "brasato della nonna" ungherese',
                    'Lecsó: il ratatouille ungherese — peperoni, pomodori e cipolla saltati con salsiccia affumicata (kolbász). Si mangia a fine estate quando i peperoni sono al massimo del sapore',
                ]
            },
            {
                id: 'carni',
                title: 'Carni & Salumi',
                icon: '🥩',
                summary: 'L\'Ungheria ha una tradizione di salumeria di alta qualità spesso sconosciuta in Italia. Il Mangalica è il maiale più pregiato d\'Europa — lardo marmorizzato come il Wagyu giapponese. La salsiccia di Gyula e il Pick Téliszalámi di Szeged sono prodotti DOP esportati in tutto il mondo.',
                facts: [
                    'Mangalica (mangalitza): il maiale autoctono ungherese con il pelo riccio — quasi estinto negli anni \'90, oggi è il "Wagyu" dei maiali europei. Il suo lardo è marmorizzato e dolcissimo, il prosciutto costa €80/kg',
                    'Pick Téliszalámi: il salame invernale di Szeged DOP — stagionato almeno 100 giorni, ricoperto di muffa bianca nobile. Prodotto dal 1869, è il salame ungherese per eccellenza. Al Mercato Centrale lo vendono a fette',
                    'Kolbász (salsiccia affumicata): la versione ungherese della salsiccia — peperoni, paprika, aglio, affumicata a freddo. Si mangia cruda, alla griglia o nel lecsó. La versione di Gyula è la più rinomata',
                    'Libamáj (fegato d\'oca): l\'Ungheria è il secondo produttore mondiale di foie gras dopo la Francia — il fegato d\'oca ungherese è considerato superiore per il metodo di allevamento semi-libero. Si trova nei bistrot a prezzi accessibili rispetto alla Francia',
                ]
            },
            {
                id: 'consigli',
                title: 'Dove Mangiare',
                icon: '💡',
                facts: [
                    'Cerca i ristoranti con menù scritto solo in ungherese: i turisti non li trovano, i prezzi sono la metà. Usa Google Translate con la fotocamera per leggere il menù',
                    'Il "napi menü" (menù del giorno) a pranzo: zuppa + secondo + dessert per €6-10. È il modo più economico e autentico di mangiare bene a Budapest',
                    'Belvárosi Lugas Étterem vicino al Mercato Centrale: il "ristorante della pergola del centro" — décor anni \'80, gulyás eccellente, frequentato solo da ungheresi',
                    'Evita i ristoranti con "Hungarian Folk Show" o "Live Gypsy Music" nel menù — sono trappole turistiche a €30-40 per piatto mediocre',
                    'Kaleidoszkóp Ház (quartiere Józsefváros): mercato coperto alternativo frequentato da locali, con cucina ungherese casalinga servita dalla mattina — gulyás a €4',
                ]
            }
        ]
    },
    {
        id: 'dolci',
        name: 'Dolci & Caffè',
        kanji: 'Cukrászda',
        tagline: 'Il patrimonio della pasticceria asburgica',
        image: '/images/budapest-hero.png',
        accent: '#D97706',
        sections: [
            {
                id: 'pasticceria',
                title: 'Pasticceria Storica',
                icon: '🎂',
                summary: 'La Budapest dell\'Impero Austro-Ungarico era una delle capitali pasticcere d\'Europa, rivaleggiando con Vienna. La tradizione dei "cukrászda" (pasticcerie) è ancora vivissima: Gerbeaud, Ruszwurm, Auguszt sono istituzioni con 100-150 anni di storia. Le torte sono elaborate, burrosa, ricche di storia.',
                facts: [
                    'Dobos Torta (Dobos-torta): 6 strati di pan di Spagna con crema al burro al cioccolato, copertura di caramello. Inventata da József Dobos nel 1884 e servita all\'Imperatore Francesco Giuseppe — è ancora la torta simbolo dell\'Ungheria',
                    'Esterházy Torta: strati di meringa alle noci (dió) con crema al burro alla vaniglia, glassa bianca con motivo a ragnatela. Prende il nome dalla famiglia aristocratica ungherese più potente del Settecento',
                    'Somlói Galuska: cubetti di pan di spagna al rum con noci, uvetta, panna montata e salsa al cioccolato — il dessert al cucchiaio più famoso d\'Ungheria, inventato nel 1958 al ristorante Gundel',
                    'Rétes (strudel ungherese): la versione magiara dello strudel austriaco — pasta fillo tirata a mano (la tradizione vuole che la pasta sia così sottile da poter leggere un giornale attraverso di essa) ripiena di mele, ciliegie o ricotta. Al Rétes Ház del Mercato Centrale lo fanno davanti a te',
                    'Kürtőskalács (dolce "ciminiera"): pasta lievitata avvolta su cilindro di legno, cotta alla brace e ricoperta di zucchero + cannella (o Nutella, pistacchio, ecc.). Non è ungherese di origine (viene dalla Transilvania) ma è diventato il souvenir dolce di Budapest',
                ]
            },
            {
                id: 'caffe',
                title: 'La Cultura del Caffè',
                icon: '☕',
                summary: 'Budapest fu una delle grandi capitali del caffè europeo nell\'800: nel 1900 aveva 600 caffè. I "Kávéház" (case del caffè) erano i salotti intellettuali della città — scrittori, giornalisti, rivoluzionari si incontravano qui. Il Café New York è il caffè più ornato d\'Europa; il Gerbeaud è la pasticceria più antica.',
                facts: [
                    'Café New York (1894): soffitti affrescati, lampadari di cristallo, colonne dorate — "il caffè più bello del mondo" secondo molte guide. Un caffè e una fetta di Dobos Torta: €15-20. L\'esperienza vale il prezzo',
                    'Gerbeaud (1858): la pasticceria storica di Vörösmarty tér, in piazza centrale. Kávé + tortina = €12. La qualità è buona ma paghi anche la posizione e il marchio storico',
                    'New York-i Kávéház: a differenza del Gerbeaud è ancora frequentato da locali (non solo turisti) — la sala interna dal soffitto alto è l\'ambientazione di decine di romanzi ungheresi',
                    'Il caffè ungherese tradizionale è un espresso lungo (lungo come un americano, forte come un espresso) — non aspettarti un espresso italiano. Ordina "presszókávé" per avvicinarti di più',
                    'Brutál Bár (Distretto VII): caffè di specialità nei ruin bar — espresso di qualità in un palazzo in rovina anni \'30. Il contrasto tra decadenza e qualità del caffè è molto Budapest',
                ]
            },
            {
                id: 'consigli',
                title: 'Dove Trovare i Migliori Dolci',
                icon: '💡',
                facts: [
                    'Ruszwurm Cukrászda al Castello di Buda (1827): la pasticceria più antica d\'Ungheria — 6 posti a sedere, code continue, Dobos Torta autentica. Vicino al Bastione dei Pescatori',
                    'Auguszt Cukrászda a Fény utca: la pasticceria preferita dai locali — meno turistica del Gerbeaud, stessa qualità, prezzi migliori. Chiusa domenica',
                    'Rétes Ház al Mercato Centrale: strudel caldo preparato al momento — mele e cannella, ciliegie, o ricotta e uvetta. €3-4 a porzione, mangiato in piedi al banco',
                    'Kürtőskalács nei chioschi di Váci utca: compra solo quello cotto alla brace (vedi il fuoco) non quello in forno — la differenza di texture è enorme. €4-5 per uno grande',
                    'Daubner Cukrászda a Óbuda: fuori dai percorsi turistici ma considerata da molti la migliore pasticceria di Budapest. Vale il viaggio extra',
                ]
            }
        ]
    },
    {
        id: 'mercato',
        name: 'Mercato',
        kanji: 'Nagy Vásárcsarnok',
        tagline: 'Il mercato più grande d\'Ungheria dal 1897',
        image: '/images/budapest-food.png',
        accent: '#008751',
        sections: [
            {
                id: 'descrizione',
                title: 'Il Mercato Centrale',
                icon: '🏛️',
                summary: 'Il Mercato Centrale (Nagy Vásárcsarnok) è il mercato coperto più grande e importante d\'Ungheria: 10.000 m², aperto dal 1897, tre piani di prodotti locali, gastronomia e artigianato. Il piano terra ha frutta, verdura, carne, salumi, formaggi, paprika — frequentato da commercianti e famiglie. Il piano superiore ha stand di cibo cotto e souvenir.',
                facts: [
                    'Aperto dal 1897 su progetto dell\'architetto Samu Pecz — l\'edificio neogotico con il tetto di maioliche colorate è uno dei più belli di Budapest',
                    'Orari: Lunedì 6-17, Martedì-Venerdì 6-18, Sabato 6-15, Domenica chiuso. Arriva prima delle 10 per trovare i prodotti più freschi e meno folla',
                    'Al piano terra le bancarelle di paprika: compra la varietà "Édesnemes" (dolce nobile) in scatola metallica — quella in sacchetto di plastica è di qualità inferiore. Prezzo indicativo: €3-6 per 100g di qualità',
                    'Il banco del Pick Téliszalámi: compra la versione stagionata 100+ giorni (non quella "fresca") — si riconosce dalla muffa bianca sulla superficie. Chiedono di tagliare a fette davanti a te',
                    'La zona dei formaggi: Trappista (il formaggio giallo ungherese), Körözött (crema di ricotta con paprika e cipolla) e formaggi di capra locali — tutti sconosciuti fuori dall\'Ungheria',
                ]
            },
            {
                id: 'mangiare',
                title: 'Cosa Mangiare al Mercato',
                icon: '🥘',
                summary: 'Il piano superiore del Mercato Centrale è la mecca del cibo tipico economico: lángos, gulyás, kürtőskalács, kolbász alla griglia. I prezzi sono il doppio del "piano terra" ma restano economici rispetto ai ristoranti. È frequentato da turisti ma anche da hungheresi in pausa pranzo.',
                facts: [
                    'Lángos (€3-5): il pane fritto ungherese — servito caldo con panna acida e formaggio grattugiato. È il fast food nazionale. Quello al piano superiore del Mercato è considerato tra i migliori di Budapest',
                    'Gulyás in tazza (€4-6): zuppa di gulyás servita in una tazza di pane — caldo, abbondante, autentico. Ideale come pranzo veloce',
                    'Kolbász alla griglia con senape (€3-4): la salsiccia affumicata ungherese grigliata sul momento. Mustár (senape) ungherese è più dolce di quella tedesca',
                    'I souvenir gastronomici migliori: paprika in scatola metallica, Pick Téliszalámi sottovuoto, Pálinka artigianale in bottiglia piccola (100ml), Tokaji in formato mignon',
                ]
            },
            {
                id: 'consigli',
                title: 'Consigli Pratici',
                icon: '💡',
                facts: [
                    'Usa la bilancia alle bancarelle di frutta: il prezzo è a kg, quindi pesa prima di pagare. Accettano solo contanti (Forint) al piano terra',
                    'Il cambio Forint: 1€ ≈ 400 HUF. Porta contanti per il mercato — le bancarelle spesso non accettano carta. Gli ATM vicini al mercato hanno commissioni alte; usa quelli in banca',
                    'La qualità della paprika: annusala prima di comprare — deve profumare di peperone fresco e tostato, non di polvere vecchia. Se non profuma, non comprare',
                    'Il mercato chiude presto il sabato (15:00) e domenica è chiuso — pianifica di visitarlo venerdì o sabato mattina',
                    'Il piano superiore (souvenir e cibo cotto) è più caro e turistico: per i prezzi veri vai al piano terra dove comprano i locali',
                ]
            }
        ]
    },
    {
        id: 'bevande',
        name: 'Bevande',
        kanji: 'Italok',
        tagline: 'Pálinka, Tokaji e la birra ungherese',
        image: '/images/budapest-hero.png',
        accent: '#7C3AED',
        sections: [
            {
                id: 'palinka',
                title: 'Pálinka',
                icon: '🥃',
                summary: 'La Pálinka è il distillato nazionale ungherese — per legge può chiamarsi Pálinka solo se prodotta al 100% in Ungheria con frutta ungherese, senza aggiunta di zucchero o aromi. È un acquavite di frutta (40-70° di alcool) che esiste in centinaia di varietà regionali. È obbligatorio offrirla all\'ospite: rifiutarla è scortesia.',
                facts: [
                    'Le varietà principali: Szilvapálinka (prugna, la più tradizionale), Barackpálinka (albicocca, la più dolce e popolare), Körtepálinka (pera Williams, la più aromatica), Meggypálinka (amarena)',
                    'Si beve liscia a temperatura ambiente (non ghiacciata, non con ghiaccio) in un piccolo bicchiere a tulipano — ghiacciarla copre i profumi',
                    'La Pálinka artigianale (házi pálinka) è diversa da quella industriale: fatta in piccoli alambicchi da agricoltori, è più profumata e complessa. Cerca i negozi "Pálinka Ház" per l\'artigianale',
                    'Prezzo indicativo: Pálinka artigianale di qualità €15-25 per 50cl. La versione premium invecchiata in botte (ágyas pálinka) può costare €40-80',
                    'Il rituale: si alza il bicchiere dicendo "Egészségedre!" (salute!) e si beve in un sorso. Non si sorseggia — è considerato segnale di sfiducia nel distillato',
                ]
            },
            {
                id: 'vino',
                title: 'Tokaji & Vini Ungheresi',
                icon: '🍷',
                summary: 'L\'Ungheria ha una delle tradizioni vinicole più antiche d\'Europa — 22 regioni doc. Il Tokaji Aszú è considerato il vino da dessert più pregiato al mondo (Re Luigi XIV: "Vinum Regum, Rex Vinorum"). Ma anche i vini rossi dell\'Egri Bikavér (Sangue di Toro) e i bianchi del Balaton sono eccellenti.',
                facts: [
                    'Tokaji Aszú (Tokaji Aszu): prodotto con uve "nobilitato dalla muffa" (Botrytis cinerea) come il Sauternes. La gradazione in "Puttonyos" (da 3 a 6) misura la dolcezza — 6 Puttonyos è il più ricco. Un\'annata eccezionale invecchiata vale €200+',
                    'Furmint: il vitigno bianco autoctono dell\'Ungheria — produce sia il Tokaji dolce che versioni secche minerali e complesse simili al Chablis Premier Cru. Ottimo rapporto qualità-prezzo',
                    'Egri Bikavér (Sangue di Toro di Eger): blend di vitigni autoctoni ungheresi con Kékfrankos — corposo, tannico, speziato. Il nome "Sangue di Toro" viene dalla leggenda dei difensori di Eger che bevevano vino rosso per sembrare spaventosi ai Turchi',
                    'I wine bar di Budapest: DiVino a Basilica di Santo Stefano serve vini ungheresi di qualità al calice con tagliere di salumi locali — la migliore introduzione al vino ungherese per turisti',
                    'Compra vino al Bortársaság (Wine Society): enoteca con 500+ etichette ungheresi, prezzi onesti, personale che parla inglese e consiglia bene. Perfetto per portarsi una bottiglia a casa',
                ]
            },
            {
                id: 'consigli',
                title: 'Dove Bere',
                icon: '💡',
                facts: [
                    'Szimpla Kert (Ruin Bar): il più famoso ruin bar di Budapest — birra locale (Dreher, Soproni) a €2-3, atmosphere unica in un palazzo in rovina. La domenica mattina è mercato vintage',
                    'Unicum (Zwack): il bitter amaro ungherese dal 1790 — 40 erbe, ricetta segreta, si beve come digestivo. Più dolce dell\'Amaro Montenegro, meno amaricante del Fernet. Il museo Zwack nel distretto IX è visitabile',
                    'DiVino Bar vicino alla Basilica: vini al calice (€4-8) con tagliere di salumi ungheresi — il posto migliore per imparare il vino ungherese senza spendere molto',
                    'La Pálinka per souvenir: Pálinkás bolt (negozio di Pálinka) vicino al Mercato Centrale vende 200+ varianti. Chiedi di assaggiare prima — quasi tutti lo permettono',
                    'Birra: le birre locali (Dreher, Soproni, Borsodi) sono lager leggere da €1.50-2.50 al supermercato, €3-4 al bar. La craft beer ungherese è in forte crescita — cerca Monyo Brewing',
                ]
            }
        ]
    }
];
