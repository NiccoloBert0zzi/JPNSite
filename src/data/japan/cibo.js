export const cibo = [
    {
        id: 'osaka',
        name: 'Osaka',
        kanji: '大阪',
        tagline: 'Kuidaore — mangiare fino a rovinarsi',
        image: '/images/osaka-neon.png',
        accent: '#F97316',
        sections: [
            {
                id: 'iconici',
                title: 'Piatti Iconici',
                icon: '🦑',
                summary: 'Osaka è la capitale gastronomica del Giappone. Tre piatti la rappresentano nel mondo: Takoyaki, Okonomiyaki e Kushikatsu. Non sono semplice street food — sono arte popolare con regole non scritte, storie centenarie e rivalità tra cuochi.',
                facts: [
                    'Takoyaki (たこ焼き): polpette di polpo in pastella cotte in stampi semisferici, coperte di salsa, maionese e katsuobushi (fiocchi di tonno affumicato che "ballano" per il calore). Inventate nel 1935 da Tomekichi Endo a Osaka',
                    'Okonomiyaki (お好み焼き): la "frittata che puoi fare come vuoi" — cavolo, uova, pancetta, frutti di mare in pastella, cotti su piastra di ferro. Lo stile Osaka mescola tutto insieme; lo stile Hiroshima sovrappone a strati',
                    'Kushikatsu (串カツ): fritto su stecco — carne, verdure, formaggi impanati e fritti. La regola sacra è il "No double dipping": si intinge una volta sola nella salsa condivisa. Trasgredire è uno scandalo sociale',
                    'Negiyaki: variante dell\'Okonomiyaki con cipollotto al posto del cavolo — meno conosciuta dai turisti ma preferita dai locali',
                    'Fugu (河豚): il pesce palla velenoso che solo cuochi con licenza speciale possono preparare. Osaka è uno dei centri principali — il fegato è illegale ma il sashimi di fugu è delicatissimo',
                ]
            },
            {
                id: 'ramen',
                title: 'Ramen & Noodles',
                icon: '🍜',
                summary: 'Il ramen di Osaka non è il più famoso del Giappone (primato a Sapporo e Fukuoka) ma ha caratteristiche uniche: brodi più leggeri e delicati, shoyu chiaro, influenze cantonesi per via dei legami storici commerciali con la Cina.',
                facts: [
                    'Ramen Shoyu (醤油): brodo di pollo e salsa di soia — leggero, dorato, aromatico. Il topping classico è chashu (pancetta di maiale brasata), narutomaki (surimi a spirale) e nori',
                    'Udon (うどん): a Osaka gli udon sono in brodo dashi leggero (non shoyu scuro come altrove) — è il piatto del pranzo veloce per eccellenza, disponibile in ogni stazione della metro',
                    'Yakisoba (焼きそば): noodles saltati in padella con verdure e pancetta — presente in ogni festival di strada (matsuri). Tecnicamente non è "soba" (grano saraceno) ma noodles di frumento',
                    'Soba Fredda (Zaru Soba): servita su graticcio di bambù con dipping sauce — perfetta d\'estate. La si mangia aspirando rumorosamente: non è maleducazione, ossigena i noodles e ne esalta il sapore',
                ]
            },
            {
                id: 'street_food',
                title: 'Street Food & Mercati',
                icon: '🏮',
                summary: 'Dotonbori e Kuromon Ichiba sono i due epicentri del cibo di strada a Osaka. La cultura del mangiare camminando (arukui-gushi) è nata qui ed è accettata — a differenza di Kyoto dove è considerata irrispettosa.',
                facts: [
                    'Kuromon Ichiba (黒門市場): il "mercato di cucina di Osaka" — 170 bancarelle in 600 metri. Granchio, tonno fresco, wagyu su stecco, ostriche al momento. Aperto dalle 9:00 alle 18:00',
                    'Dotonbori Street Food: takoyaki appena sfornati (€2-3), crepes giapponesi, gyoza fritti, taiyaki (dolci a forma di pesce ripieni di pasta di fagioli o crema)',
                    'Shinsekai (新世界): il quartiere "vecchia Osaka" dove il Kushikatsu costa la metà rispetto a Dotonbori. Frequentato da locali, non da turisti — atmosfera anni \'50',
                    'Convini Food: i convenience store (7-Eleven, FamilyMart, Lawson) hanno onigiri freschi, nikuman (panini al vapore), oden (stufato di inverno), dessert di qualità superiore ai bar europei',
                    'Tamago Sando: sandwich all\'uovo dei convenience store — suona banale ma è uno dei cibi più amati del Giappone. La versione Lawson è considerata la migliore',
                ]
            },
            {
                id: 'consigli',
                title: 'Dove Mangiare',
                icon: '💡',
                facts: [
                    'Dotonbori è turistico e leggermente più caro — ottimo per l\'atmosfera, ma per i prezzi veri vai a Shinsekai o nei sotterranei di Namba (Namba City Food Court)',
                    'Il pranzo (11:30-14:00) in qualsiasi ristorante è sempre più economico della cena: lo stesso piatto può costare il 30-40% in meno con il "lunch set"',
                    'Cerca i ristoranti con code di soli giapponesi: se i locali fanno la fila, il cibo è buono. Se c\'è solo la foto del menu in inglese all\'ingresso, cambia posto',
                    'Gli izakaya (居酒屋) sotto le ferrerie di Namba sono i più economici: biru (birra grande) + 3-4 piatti da condividere = €15-20 a persona',
                    'Harukoma Sushi a Namba serve conveyor belt sushi da €1-2 a piattino — qualità sorprendente per il prezzo',
                ]
            }
        ]
    },
    {
        id: 'kyoto',
        name: 'Kyoto',
        kanji: '京都',
        tagline: 'Kaiseki — la cucina come atto poetico',
        image: '/images/kyoto-hero.png',
        accent: '#8B5CF6',
        sections: [
            {
                id: 'iconici',
                title: 'Cucina Kyo-ryori',
                icon: '🍵',
                summary: 'La cucina di Kyoto (Kyo-ryori, 京料理) è l\'opposto della cucina di Osaka: non abbondante ma miniaturizzata, non casereccia ma elevata, non saporita ma delicata. È una cucina che parla di stagioni, di estetica, di silenzio. Il Kaiseki è la sua forma più pura — un menu degustazione che cambia ogni mese per riflettere la natura fuori dalla finestra.',
                facts: [
                    'Kaiseki (懐石): il menu degustazione più importante della cultura gastronomica giapponese. 8-12 portate microscopiche, ognuna in ceramica artigianale, con abbinamenti stagionali precisi. Può costare €80-300 a persona',
                    'Yudofu (湯豆腐): il piatto più semplice di Kyoto — tofu di seta cotto in acqua di kelp (kombu), intinto in salsa ponzu. Servito al Nanzen-ji da 300 anni. Insegna cosa significa "umami"',
                    'Nishin Soba (にしんそば): soba (grano saraceno) con aringa dolce-salata — piatto tipicamente kyotese che non trovi altrove. Economico, sostanzioso, perfetto dopo una giornata di templi',
                    'Obanzai (おばんざい): la cucina casalinga di Kyoto. Piccoli piatti di verdure in salamoia (tsukemono), tofu, pesce essiccato. Si trovano nei bar con bancone (kappo) — prendine 5-6 diversi',
                    'Shojin Ryori (精進料理): la cucina vegetariana dei monaci Zen — nessun ingrediente animale, nessun aglio o cipolla. Servita nei templi di Daitoku-ji e Tenryu-ji. Un\'esperienza spirituale oltre che gastronomica',
                    'Kyo-zuke (京漬物): le verdure in salamoia di Kyoto sono famose in tutto il Giappone. Cavolfiore, melanzane, daikon, cetrioli — fermentati con sale, aceto di riso o crusca. In vendita al Nishiki Market',
                ]
            },
            {
                id: 'matcha',
                title: 'Il Mondo del Matcha',
                icon: '🍃',
                summary: 'Kyoto e la vicina Uji sono la capitale mondiale del Matcha. Il tè verde in polvere non è solo una bevanda: è una filosofia di preparazione (la cerimonia del tè), un ingrediente universale nella pasticceria locale, un\'esperienza sensoriale che cambia prospettiva.',
                facts: [
                    'Il Matcha di Uji (宇治抹茶) è il migliore al mondo: le piantagioni coprono i campi da tè con stuoie di bambù per 3-4 settimane prima della raccolta (kabuse), aumentando la clorofilla e la dolcezza',
                    'La cerimonia del tè (茶道, Chado) non è un semplice rituale: è una pratica meditativa con 400 anni di regole codificate. Ogni movimento — come si tiene la tazza, come la si ruota — ha un significato preciso',
                    'Il Matcha Parfait di Kyoto: gelato al matcha + anko (pasta di fagioli) + mochi + tè in granita in un bicchiere. La versione di Tsujiri a Gion è considerata la migliore della città',
                    'Warabi Mochi (わらびもち): dolce gelatinoso di amido di felce ricoperto di Kinako (farina di soia tostata) e sciroppo di matcha — completamente diverso dai mochi di riso. Fresco, delicato, estivo',
                    'Takashimaya B2 (il supermercato del grande magazzino): vende i migliori wagashi (dolci tradizionali) e matcha confezionato. Prezzo più alto ma qualità garantita e ottimo per souvenir',
                ]
            },
            {
                id: 'mercati',
                title: 'Mercati & Negozi',
                icon: '🏪',
                summary: 'Il Nishiki Market è il cuore gastronomico di Kyoto da 700 anni. Quattrocento metri di vicolo coperto con 130 negozi — tofu fresco, tsukemono in barile, dashi artigianale, wagashi, pesce preparato al momento.',
                facts: [
                    'Nishiki Market (錦市場): aperto dalle 9:00 alle 18:00, chiuso solitamente il mercoledì. Lunedì mattina è il momento migliore: meno turisti, prodotti più freschi',
                    'Tofu fresco al Nishiki: puoi comprare tofu appena fatto e mangiarlo tiepido sul posto con un po\' di salsa di soia e zenzero — costa €1-2 ed è il miglior tofu che mangerai in vita tua',
                    'Tsukemono in barile: i negozietti di verdure in salamoia ti fanno assaggiare prima di comprare. Il Shibazuke (melanzane viola con shiso rosso) è il colore simbolo di Kyoto',
                    'Aritsugu (有次): la coltelleria artigianale di Nishiki aperta dal 1560 — i cuochi giapponesi vengono qui da tutto il paese. Un coltello da cucina fatto a mano costa da €80 a €500+',
                ]
            },
            {
                id: 'consigli',
                title: 'Dove Mangiare',
                icon: '💡',
                facts: [
                    'Pontocho Alley (先斗町): vicolo stretto parallelo al Kamo-gawa — ristoranti con terrazza sul fiume (kawayuka). Romantico la sera, i prezzi sono medi. Evita i posti con menu plastificato illuminato',
                    'Falafel Gion (sic): il posto più improbabile di Kyoto è un falafel di qualità eccezionale gestito da un cuoco israeliano in una viuzza di Gion — coda di locali a pranzo',
                    'Per un Kaiseki accessibile: cerca "Kaiseki Lunch" (pranzo kaiseki) — le stesse tecniche e presentazione della cena ma a €25-40 invece di €100+',
                    'Depachika (デパ地下): i sotterranei alimentari dei grandi magazzini (Takashimaya, Isetan, Daimaru) sono i supermercati di lusso di Kyoto. Wagashi, bento, sushi — qualità altissima',
                    'Sakura-mochi al Shichijo: il dolce di stagione primaverile di Kyoto — riso mochi rosa avvolto in foglia di ciliegio salata. Disponibile solo marzo-aprile, ma il negozio Tsuruya Yoshinobu lo vende tutto l\'anno',
                ]
            }
        ]
    },
    {
        id: 'tokyo',
        name: 'Tokyo',
        kanji: '東京',
        tagline: '230 stelle Michelin — la capitale gastronomica del mondo',
        image: '/images/modern.png',
        accent: '#3B82F6',
        sections: [
            {
                id: 'iconici',
                title: 'Piatti Iconici',
                icon: '🍣',
                summary: 'Tokyo non ha un piatto simbolo come Osaka (takoyaki) o Kyoto (kaiseki): è tutto. È la città dove ogni stile gastronomico del Giappone coesiste al livello più alto possibile, affiancato dalla migliore cucina francese, italiana, cinese, indiana del mondo. Ha 230 ristoranti stellati Michelin — più di qualsiasi altra città.',
                facts: [
                    'Edomae Sushi (江戸前寿司): il sushi tradizionale di Tokyo nasce nell\'era Edo come street food veloce — nigiri con pesce del vicino oceano di Edo (Tokyo Bay). Il vero sushi tokyota ha riso a temperatura corporea, non freddo di frigo',
                    'Ramen Shoyu di Tokyo: brodo di pollo con salsa di soia chiara, noodles sottili e ricci, chashu di maiale, uovo marinato (ajitsuke tamago). Il Fuunji a Shinjuku fa la versione tsukemen (noodles e brodo separati) più famosa della città',
                    'Tonkatsu (とんカツ): costoletta di maiale impanata nello stile giapponese — panko croccante, carne succosissima, servita con cavolo crudo e salsa Worcester. Il Maisen di Aoyama è il tempio del tonkatsu dal 1965',
                    'Yakitori (焼き鳥): spiedini di pollo alla brace — cuore, fegato, coscia, ali, pelle. I migliori yakitori bar sono sotto i binari della ferrovia a Yurakucho e Shimbashi',
                    'Tempura di Tokyo: fritta in olio di sesamo, croccante e leggerissima — completamente diversa dalla tempura pesante che si trova altrove. La tempura bar di fascia media a Asakusa è la migliore esperienza costo-qualità',
                ]
            },
            {
                id: 'ramen',
                title: 'Ramen Culture',
                icon: '🍜',
                summary: 'Tokyo è la capitale mondiale del ramen — non per invenzione (ogni regione ha il suo) ma per concentrazione di stili, innovazione e competizione. Il "Ramen Museum" di Shin-Yokohama (a 30 min) raccoglie i migliori ramen di ogni regione sotto un unico tetto in un\'ambientazione anni \'50.',
                facts: [
                    'Il Ramen di Tokyo (Tokyo Ramen) usa brodo di pollo e dashi di mare con shoyu chiaro — più delicato del tonkotsu (maiale) di Fukuoka o del miso di Sapporo',
                    'Tsukemen (つけ麺): i noodles si intingono in un brodo concentratissimo servito a parte — inventato a Tokyo da Kazuo Yamagishi nel 1961. Oggi è uno stile diffuso in tutto il Giappone',
                    'Tantanmen (担々麺): la versione giapponese del Dan Dan Noodles cinese — brodo di sesamo e chili con carne macinata. Piccante, ricco, leggermente diverso dall\'originale sichuanese',
                    'La Ramen Hall di Shibuya e il piano B1 di Shinjuku Station hanno 8-10 ramen bar: la coda fuori indica la qualità. 15-20 minuti di attesa sono normali per i migliori',
                    'Il prezzo medio di un ramen a Tokyo: €8-12. Sotto €7 è sospetto; sopra €15 è marketing. La qualità non scala linearmente col prezzo',
                ]
            },
            {
                id: 'sushi_mercato',
                title: 'Sushi & Mercato di Toyosu',
                icon: '🐟',
                summary: 'Il mercato di Toyosu (ex Tsukiji) è il più grande mercato del pesce del mondo — 700+ rivenditori, 2.000 tonnellate di pesce al giorno. L\'asta del tonno alle 5:00 AM è uno spettacolo che si prenota mesi prima.',
                facts: [
                    'Il Mercato di Toyosu gestisce il 90% del tonno pregiato (bluefin tuna) venduto nei ristoranti di sushi di Tokyo — il prezzo all\'asta il 1° gennaio può superare €3.000 per kg',
                    'Il Sushi di Tsukiji (l\'area esterna rimasta a Tsukiji) apre alle 5:30 AM: fila per 30-60 minuti al Sushi Dai o Daiwa Sushi per il nigiri più fresco della vita',
                    'Kaiten-zushi (conveyor belt sushi): le catene come Sushiro, Kurasushi e Hamasushi hanno ordering digitale e qualità sorprendente a €1-2 a piattino. Ottima opzione economica senza rinunciare alla freschezza',
                    'Omakase (お任せ): "lascio fare a te" — il cuoco sceglie lui cosa servirti in base al pesce migliore del giorno. Esperienza autentica, prezzo da €50 (lunch) a €300+ (dinner stellato)',
                    'Il tonno da sushi ha tre gradi: Akami (rosso magro), Chutoro (semi-grasso, ventre), Otoro (grasso, ventre pieno) — Otoro si scioglie letteralmente in bocca e può costare €20 a singolo pezzo',
                ]
            },
            {
                id: 'consigli',
                title: 'Dove Mangiare',
                icon: '💡',
                facts: [
                    'Depachika (デパ地下): i sotterranei alimentari di Isetan Shinjuku, Mitsukoshi Ginza e Takashimaya Nihonbashi sono i migliori supermercati gourmet del mondo — bento, sushi, pasticceria, deli',
                    'Gyukatsu Motomura a Shibuya: la versione con manzo invece del maiale del katsu — si cuoce da soli sulla pietra ollare al tavolo. Coda lunga ma ne vale la pena',
                    'Ichiran Ramen: il ramen "in solitudine" — ogni posto è separato da paratie, ordini su modulo, nessun contatto umano. Esperienza sociale giapponese autentica, cibo ottimo',
                    'Yakiniku (焼き肉): il barbecue di manzo giapponese — si cuoce la carne sul braciere al centro del tavolo. Wagyu A5 a Tokyo può costare €50-80 per 100g, ma le versioni A3-A4 sono comunque straordinarie',
                    'Gli izakaya sotto i binari di Yurakucho (vicino Ginza) sono i più iconici di Tokyo: economici, fumosi, affollati di salaryman. Birra grande + yakitori + edamame = €12-15',
                ]
            }
        ]
    },
    {
        id: 'nara',
        name: 'Nara',
        kanji: '奈良',
        tagline: 'Sake, mochi e i sapori dell\'antica capitale',
        image: '/images/culture.png',
        accent: '#10B981',
        sections: [
            {
                id: 'iconici',
                title: 'Specialità Locali',
                icon: '🍡',
                summary: 'Nara è piccola e si visita in mezza giornata, ma ha specialità gastronomiche uniche che non trovi altrove: il Kakinoha-zushi (sushi conservato in foglie di cachi), il mochi battuto a mano a velocità insostenibile, il sake di montagna.',
                facts: [
                    'Kakinoha-zushi (柿の葉寿司): filetti di sgombro o salmone su riso da sushi, avvolti in foglie di cachi — la foglia ha proprietà antibatteriche naturali che conservano il pesce. Ricetta immutata da 400 anni, venduta nei negozi vicino al Kintetsu-Nara Station',
                    'Nakatanido Mochi: due uomini battono il mochi a velocità folle su un mortaio di legno mentre una terza persona gira e bagna l\'impasto a mani nude tra un colpo e l\'altro. Il video ha 50 milioni di views su YouTube — il negozio è vicino al Kofuku-ji',
                    'Miwa Somen (三輪そうめん): noodles di farina di frumento sottilissimi (capelli d\'angelo giapponesi) prodotti a Miwa, vicino Nara, dal VII secolo. Si mangiano freddi d\'estate o in brodo caldo d\'inverno',
                    'Kaki (柿): Nara produce i migliori cachi del Giappone — la varietà Gojo-Goshiki è dolcissima e si vende essiccata (hoshigaki) come dolce naturale. In stagione (ottobre-novembre) li trovi ovunque',
                ]
            },
            {
                id: 'sake',
                title: 'Il Sake di Nara',
                icon: '🍶',
                summary: 'La prefettura di Nara è la culla del sake giapponese: i monaci buddisti del tempio Shoryaku-ji svilupparono qui nel 1300 le tecniche di fermentazione con lieviti selezionati che sono ancora oggi la base di tutta la produzione nazionale. L\'acqua dei monti Yoshino è tra le più pure del Giappone.',
                facts: [
                    'Il sake Bodaimoto (菩提もと): la tecnica di fermentazione più antica del Giappone, sviluppata a Nara nel XIV secolo dai monaci di Shoryaku-ji. Pochi produttori la usano ancora — profilo acido e complesso, molto diverso dal sake moderno',
                    'Harushika (春鹿): la cantina più famosa di Nara — il nome significa "cervo di primavera". Offre degustazioni da €5 con 5 tipologie diverse, a 5 minuti a piedi dal Kofuku-ji',
                    'Il sake si divide in: Junmai (solo riso), Ginjo (riso levigato 40%), Daiginjo (riso levigato 50%) — più è levigato, più è delicato e fruttato. Il Junmai Daiginjo di Nara è tra i migliori del paese',
                    'La temperatura di servizio cambia il sake completamente: freddo (reishu, 5°C) esalta i profumi fruttati del Ginjo; caldo (atsukan, 50°C) ammorbidisce i sake più rustici e accentua l\'umami',
                ]
            },
            {
                id: 'consigli',
                title: 'Dove Mangiare',
                icon: '💡',
                facts: [
                    'Nakatanido Mochi è obbligatorio: acquista 2-3 pezzi al momento (€1-2 ciascuno) e mangiali caldi — il mochi si indurisce appena raffredda',
                    'I crackers per cervi (shika senbei, €2 un mazzo) vengono venduti solo da venditori autorizzati con ombrellone giallo — non comprare dai venditori non ufficiali',
                    'Il pranzo migliore a Nara: Kakinoha-zushi da asporto (€8-12 una scatola da 8 pezzi) + sake Harushika + posto su una panchina del parco con i cervi',
                    'Nara è perfetta per il pranzo: parti da Kyoto o Osaka la mattina, mangia qui, visita il Todai-ji nel pomeriggio e rientra per cena',
                    'Evita i ristoranti attorno al Todai-ji: prezzi turistici. Scendi verso la stazione Kintetsu dove mangiano i locali',
                ]
            }
        ]
    },
    {
        id: 'hiroshima',
        name: 'Hiroshima',
        kanji: '広島',
        tagline: 'Okonomiyaki, ostriche e i sapori della baia',
        image: '/images/hero.png',
        accent: '#EF4444',
        sections: [
            {
                id: 'iconici',
                title: 'Piatti Iconici',
                icon: '🥞',
                summary: 'Hiroshima ha due specialità che la distinguono da qualsiasi altra città giapponese: l\'Okonomiyaki stile Hiroshima (stratificato, con noodles soba) e le ostriche della baia (kaki) — il 70% della produzione nazionale. Due piatti apparentemente semplici che qui raggiungono una perfezione irripetibile.',
                facts: [
                    'Hiroshima Okonomiyaki (広島お好み焼き): la versione stratificata — il cuoco costruisce il piatto a strati su piastra: prima la pastella sottile, poi il cavolo, la pancetta, i noodles yakisoba, l\'uovo. Non si mescola mai. È tecnicamente più difficile della versione Osaka',
                    'Kaki (牡蠣): le ostriche della baia di Hiroshima sono le più grandi e carnose del Giappone. Le si mangiano crude con ponzu, grigliate su mezzo guscio, fritte in panko (kaki-furai) o in zuppa miso. La stagione va da ottobre ad aprile',
                    'Momiji Manju (もみじ饅頭): dolcetti a forma di foglia d\'acero ripieni di pasta di fagioli azuki (il classico dal 1906), crema pasticcera, matcha o cioccolato. Il souvenir gastronomico obbligatorio di Hiroshima — si comprano caldi alla Miyajima',
                    'Anago-meshi (穴子飯): anguilla di mare (non d\'acqua dolce come l\'unagi) grigliata su riso — specialità esclusiva di Miyajima. Il negozio Ueno vicino al pontile del traghetto fa la versione in scatola da asporto perfetta per il treno',
                    'Tsukemen di Hiroshima: la versione locale del ramen con noodles da intingere ha un brodo piccante con sesamo — diverso da quello di Tokyo, più denso e speziato',
                ]
            },
            {
                id: 'okonomimura',
                title: 'Okonomimura',
                icon: '🏢',
                summary: 'Okonomimura (お好み村) è un edificio di 3 piani nel centro di Hiroshima con 24 stand di Okonomiyaki — uno dei posti più particolari del Giappone gastronomico. Ogni stand è gestito da una famiglia o cuoco diverso, ognuno con la propria ricetta segreta. Si sceglie casualmente e non si sbaglia.',
                facts: [
                    'Okonomimura apre a pranzo e chiude tardi la sera — il momento migliore è la sera quando i cuochi sono in forma e il locale è pieno di locali post-lavoro',
                    'Il prezzo standard: Okonomiyaki base €7-9, versione con ostriche €12-14. Si mangia seduti al bancone davanti alla piastra — il cuoco te lo prepara davanti',
                    'La regola non scritta: non puoi alzarti e andare da un altro stand se il tuo cuoco ti sta preparando il piatto — è considerato scortese',
                    'La Salsa Otafuku (オタフクソース): la salsa dolce-acidula usata sull\'Okonomiyaki di Hiroshima viene prodotta qui in città dal 1922. La fabbrica è visitabile e vende tutti i prodotti a metà prezzo',
                ]
            },
            {
                id: 'consigli',
                title: 'Dove Mangiare',
                icon: '💡',
                facts: [
                    'Okonomimura (3F) la sera: siediti al bancone di qualsiasi stand, ordina Hiroshima-style con ostriche. €12-14 per il piatto più autentico che trovi',
                    'Ostriche al Mercato di Miyajima: ci sono bancarelle che le grigliano sul momento — 2-3 ostriche a €3-4, mangiate con vista sul torii. Non c\'è niente di meglio',
                    'Anago-meshi da Ueno vicino al pontile di Miyajima: la scatola da asporto €12 è perfetta sul traghetto di ritorno guardando l\'isola allontanarsi',
                    'Da Kyoto con lo Shinkansen: pianifica Hiroshima come gita di un giorno — parti la mattina, visit il Peace Park, pranza da Okonomimura, visita Miyajima nel pomeriggio, cena di ostriche, rientra la sera',
                    'I Momiji Manju caldi appena sfornati: comprali dai negozi sul vialetto principale di Miyajima (non quelli confezionati in sacchetto) — la differenza è abissale',
                ]
            }
        ]
    },
    {
        id: 'miyajima',
        name: 'Miyajima',
        kanji: '宮島',
        tagline: 'Momiji Manju e ostriche con vista sul Torii',
        image: '/images/hero.png',
        accent: '#F97316',
        sections: [
            {
                id: 'iconici',
                title: 'Specialità dell\'Isola',
                icon: '🍁',
                summary: 'Miyajima ha due specialità gastronomiche iconiche che si mangiano camminando lungo la via principale dell\'isola: i Momiji Manju (dolcetti a forma di foglia d\'acero) e le ostriche fresche grigliate al momento.',
                facts: [
                    'Momiji Manju (もみじ饅頭): dolcetti a forma di foglia d\'acero — il souvenir gastronomico simbolo di Miyajima dal 1906. Ripieni classici: pasta di fagioli azuki, crema, matcha. Comprarli caldi appena sfornati cambia tutto',
                    'Ostriche fresche (カキ): le migliori della baia di Hiroshima — grigliate su mezzo guscio, crude con ponzu o fritte in panko (kaki-furai). Le bancarelle lungo la via principale le preparano al momento per €3-4 a 2-3 ostriche',
                    'Anago-meshi (穴子飯): anguilla di mare grigliata su riso — specialità esclusiva di Miyajima. Il negozio Ueno vicino al pontile del traghetto fa la versione in scatola da asporto (€12) perfetta da mangiare sul traghetto di ritorno',
                    'Shirayu-ki: sake locale dell\'isola, leggero e delicato — venduto nei negozietti tradizionali tra un torii e l\'altro',
                ]
            },
            {
                id: 'consigli',
                title: 'Dove Mangiare',
                icon: '💡',
                facts: [
                    'Ostriche al volo: le bancarelle lungo la via principale le grigliano sul momento — mangiale con vista sul torii. È il pranzo perfetto dell\'isola',
                    'Momiji Manju caldi: distingui i negozi che cuociono sul posto (senti l\'odore e vedi la macchina) da quelli che vendono confezionati. I primi sono incomparabili',
                    'Anago-meshi da Ueno: la scatola da asporto si mangia sul traghetto di ritorno guardando l\'isola allontanarsi — uno dei momenti più belli del viaggio',
                    'Orario migliore: pranza sull\'isola intorno alle 13:00 — prima che la folla turistica di giornata arrivi a Hiroshima',
                ]
            }
        ]
    }
];
