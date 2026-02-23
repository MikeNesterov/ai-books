const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Polish texts for chapters 3 and 4 (generated inline)
const polishTexts = {
  'Глава 03': {
    'Страница 01': `Następnego ranka Joana siedziała przy oknie i myślała.

Kim jest Tobiasz? Skąd pochodzi jej moc? Dlaczego Łuk pojawia się sam?

Przypomniała sobie starą bibliotekę niedaleko domu. Może tam znajdzie odpowiedzi?

Narzuciła kurtkę i wyszła.`,

    'Страница 02': `Biblioteka była mała i stara. Pachniała papierem i starymi książkami.

Joana wzięła wszystko, co mogło pomóc — księgi mitologii, encyklopedie, legendy różnych ludów. Stosy ksiąg piętrzyły się na stole.

— Projekt badawczy? — uśmiechnęła się stara bibliotekarka.

— Można tak powiedzieć — odpowiedziała Joana.`,

    'Страница 03': `W domu Joana rozłożyła książki na stole.

I wtedy zatrzymała się.

Wśród ksiąg leżała jedna, której nie brała. Stara, w wytartej skórzanej okładce, ze złotymi literami: „Starożytna Księga Legend".

Skąd się wzięła?

Palce same wyciągnęły się ku okładce.`,

    'Страница 04': `Joana otworzyła księgę — i świat zamarł.

Nad pożółkłymi stronami pojawił się blask. Najpierw mały. Potem większy. I nagle Joana odskoczyła.

Tobiasz.

Jego postać unosiła się nad książką — przezroczysta, zbudowana z niebieskiego światła. Powoli się obracał.

To nie była iluzja. Księga pokazywała prawdę.`,

    'Страница 05': `Joana drżącą ręką przewróciła stronę.

Tobiasz zniknął. Na jego miejscu pojawiły się złote promienie — dziesiątki świetlnych nici, splątanych jak żywe.

Joana rozpoznała je natychmiast.

To była jej moc. Ta sama energia, która płynęła przez jej Łuk. Mogła poruszać przedmiotami siłą myśli.

Księga o niej wiedziała. Księga wiedziała wszystko.`,

    'Страница 06': `Joana czytała dalej — chciwie, strona po stronie.

I wtedy znalazła to.

Strona o Tobiaszu. Słowa pojawiały się w jej głowie jak tłumaczenie.

„...jedyne słabe miejsce ducha leśnego to centrum jego piersi, gdzie bije jego ciemne serce..."

Nad księgą pojawił się hologram Tobiasza. Tym razem w centrum jego ciała pulsował czerwony punkt.

Joana patrzyła na niego z determinacją.`,

    'Страница 07': `Ostatnie strony były najbardziej tajemnicze.

Na pergaminie narysowany był starożytny symbol: trzy kryształy ułożone w trójkąt. Złoty, niebieski i zielony.

Nad księgą pojawiła się ostatnia wizja — trzy wirujące kryształy.

„...kto zbierze wszystkie trzy..."

Tekst się urywał.

Joana spojrzała na swoje ręce. Złoty kryształ — w jej Łuku. Ale są jeszcze dwa...

Zamknęła księgę. Czas działać.`
  },
  'Глава 04': {
    'Страница 01': `Joana zamknęła Starożytną Księgę i podeszła do okna.

Miasto żyło swoim zwykłym życiem. Nikt nie wiedział, że kilka dni temu w parku starożytny duch lasu próbował wszystko zniszczyć.

„Wiedza to jedno — pomyślała. — Ale co z tego, jeśli nie kontroluję swojej mocy?"

Zacisnęła pięść.

Dość czytania. Czas działać.`,

    'Страница 02': `Park przywitał ją ciszą. Dziwną, nienaturalną ciszą.

Joana szła główną aleją i patrzyła na ślady zniszczeń. Wywrócone ławki. Popękany asfalt. Z głębokich szczelin wystawały grube, suche pnącza.

Przykucnęła i ostrożnie dotknęła jednego z nich.

Pnącze zadrżało. Słabo, ledwo zauważalnie.

Moc Tobiasza była tu. Osłabiona — ale żywa.

„Idealne do ćwiczeń" — pomyślała Joana.`,

    'Страница 03': `Joana wyciągnęła rękę. Zamknęła oczy. Skupiła się.

Na początku — nic. Potem — znajome ciepło w dłoni. Złote iskry zakręciły się wokół palców i Łuk pojawił się w jej ręce.

„No to próbujemy."

Naciągnęła cięciwę. Złota strzała zmaterializowała się w powietrzu.

Strzał!

Strzała przeleciała przez pnącze — jakby go tam nie było. Pnącze drgnęło, ale nie zostało trafione.

Joana opuściła Łuk. To było trudniejsze niż myślała.`,

    'Страница 04': `Po trzeciej nieudanej próbie Joana usiadła na ławce.

Co robi nie tak? Strzały lecą celnie. Moc jest. Ale pnącza jakby jej nie zauważają.

I wtedy sobie przypomniała. Słowa z Księgi: „Moc ciemności jest jak drzewo. Gałęzie można ciąć w nieskończoność, ale drzewo będzie stało. Szukaj korzenia."

Joana rozejrzała się. Wszystkie pnącza rosły z jednego miejsca!

— Nie w gałęzie. W korzeń — szepnęła.`,

    'Страница 05': `Joana go znalazła. Centrum.

Miejsce, gdzie wszystkie pnącza zbiegały się w jeden punkt. Głęboka szczelina w ziemi, z której wystawał węzeł splecionych korzeni — gruby, pulsujący słabym ciemnym blaskiem.

Serce całej ciemnej sieci.

Joana cofnęła się o dziesięć kroków. Łuk pojawił się natychmiast.

Naciągnęła cięciwę. Złota strzała zaświeciła mocniej niż zwykle.

Wydech. Strzał.

Strzała wbiła się dokładnie w środek węzła. Złoty blask popłynął po pnączach.

Udało się!`,

    'Страница 06': `Coś się zmieniło.

Joana poczuła to zanim zobaczyła. Ciepła fala przeszła od czubków palców w górę ręki. Jakby niewidzialna nić połączyła ją z pnączami.

Powoli uniosła wolną rękę.

Pnącza na ziemi poruszyły się.

Joana wstrzymała oddech. Podniosła rękę wyżej. Pnącza ciągnęły się za nią jak posłuszne.

— Działa! — szepnęła. — Działa!

Zrobiła powolny krąg dłonią. Pnącza zakręciły się razem z nią. Opuściła rękę — opadły na ziemię.

Joana się roześmiała. Nareszcie wiedziała, jak działa ta moc.`,

    'Страница 07': `Joana wciąż się uśmiechała.

Ale wtedy nadszedł wiatr.

Nie ciepły miejski wiatr. Zimny. Ostry. Pachnący czymś ciemnym i starym. Pnącza na ziemi zamarły i skuliły się.

Joana uniosła głowę.

Niebo się zmieniło. Ciemne chmury zbierały się na horyzoncie — tam, za miastem, gdzie zaczynał się las. I tam, nad wierzchołkami drzew, w gęstniejącym mroku wznosiła się postać.

Wysoka. Ciemna. Nieruchoma.

Tobiasz.

Łuk pojawił się w ręce sam.

On poczuł. On idzie.`
  }
};

// Save Polish text files
Object.entries(polishTexts).forEach(([chapter, pages]) => {
  Object.entries(pages).forEach(([page, text]) => {
    const filePath = path.join(__dirname, 'Главы', chapter, page, 'сценарий_pl.md');
    const content = `# ${page.replace('Страница', 'Strona')} — tekst po polsku\n\n${text}\n`;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Saved: ' + chapter + '/' + page);
  });
});

console.log('\nAll Polish texts saved. Generating PDF...\n');

// PDF Generation
const doc = new PDFDocument({
  layout: 'landscape',
  size: 'A4',
  margins: { top: 0, bottom: 0, left: 0, right: 0 },
  autoFirstPage: false
});

const outputPath = path.join(__dirname, 'Joana_Ksiazka_PL.pdf');
const output = fs.createWriteStream(outputPath);
doc.pipe(output);

const pageW = 841.89;
const pageH = 595.28;
const halfW = pageW / 2;
const textPad = 40;

const fontPath = 'C:\\Windows\\Fonts\\arial.ttf';
const fontBoldPath = 'C:\\Windows\\Fonts\\arialbd.ttf';

const chapterInfo = [
  { dir: 'Глава 01', title: 'Rozdział 1: Przebudzenie Mocy', color: '#2D5A27' },
  { dir: 'Глава 02', title: 'Rozdział 2: Pierwsza Walka', color: '#5A2D2D' },
  { dir: 'Глава 03', title: 'Rozdział 3: Tajemnicza Księga', color: '#2D3A5A' },
  { dir: 'Глава 04', title: 'Rozdział 4: Trening', color: '#5A4A2D' },
];

chapterInfo.forEach(ch => {
  const chDir = path.join(__dirname, 'Главы', ch.dir);
  if (!fs.existsSync(chDir)) return;

  const pages = fs.readdirSync(chDir)
    .filter(p => p.startsWith('Страница'))
    .sort();

  // Chapter title page
  doc.addPage({ layout: 'landscape', size: 'A4' });

  doc.rect(0, 0, pageW, pageH).fill(ch.color);
  doc.font(fontBoldPath)
     .fontSize(42)
     .fillColor('#FFFFFF')
     .text(ch.title, 0, pageH / 2 - 40, { width: pageW, align: 'center' });
  doc.font(fontPath)
     .fontSize(18)
     .fillColor('rgba(255,255,255,0.7)')
     .text('Joana i Duch Lasu', 0, pageH / 2 + 20, { width: pageW, align: 'center' });

  pages.forEach((pg, pgIdx) => {
    const plFile = path.join(chDir, pg, 'сценарий_pl.md');
    const imgFile = path.join(chDir, pg, 'render.png');

    if (!fs.existsSync(plFile) || !fs.existsSync(imgFile)) {
      console.log('Skipping (missing files): ' + ch.dir + '/' + pg);
      return;
    }

    const rawText = fs.readFileSync(plFile, 'utf8');
    const cleanText = rawText
      .split('\n')
      .filter(l => !l.startsWith('#'))
      .join('\n')
      .trim();

    const pageNum = pgIdx + 1;

    doc.addPage({ layout: 'landscape', size: 'A4' });

    // Left half - white background
    doc.rect(0, 0, halfW, pageH).fill('#FAFAF7');

    // Chapter label top
    doc.font(fontPath)
       .fontSize(9)
       .fillColor(ch.color)
       .text(ch.title.toUpperCase() + '  •  STRONA ' + pageNum,
             textPad, 18, { width: halfW - textPad * 2 });

    // Decorative line
    doc.save()
       .moveTo(textPad, 32)
       .lineTo(halfW - textPad, 32)
       .lineWidth(1.5)
       .strokeColor(ch.color)
       .stroke()
       .restore();

    // Main text
    doc.font(fontPath)
       .fontSize(19)
       .fillColor('#1A1A1A')
       .text(cleanText, textPad, 50, {
         width: halfW - textPad * 2,
         lineGap: 7,
         align: 'left'
       });

    // Page number bottom
    doc.font(fontPath)
       .fontSize(10)
       .fillColor('#AAAAAA')
       .text(String(pageNum), textPad, pageH - 25, { width: halfW - textPad * 2, align: 'center' });

    // Right half - image full bleed
    try {
      doc.image(imgFile, halfW, 0, {
        width: halfW,
        height: pageH,
        cover: [halfW, pageH],
        align: 'center',
        valign: 'center'
      });
    } catch (e) {
      console.log('Image error: ' + imgFile + ' — ' + e.message);
      doc.rect(halfW, 0, halfW, pageH).fill('#CCCCCC');
    }

    // Subtle vertical divider
    doc.save()
       .moveTo(halfW, 0)
       .lineTo(halfW, pageH)
       .lineWidth(2)
       .strokeColor('#FFFFFF')
       .stroke()
       .restore();

    console.log('Page done: ' + ch.dir + '/' + pg);
  });
});

doc.end();

output.on('finish', () => {
  console.log('\n✅ PDF saved to: ' + outputPath);
});

output.on('error', (err) => {
  console.error('Error writing PDF:', err);
});
