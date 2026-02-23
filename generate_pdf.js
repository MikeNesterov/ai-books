const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// ── Polish texts (slightly simplified from originals) ──────────────────────
const polishTexts = {
  'Глава 01': {
    'Страница 01': `Dżungla Amazonii żyła własnym życiem. Wilgotne powietrze, zapach ziemi, głosy ptaków, których Joana nigdy wcześniej nie słyszała. Nie mogła sobie wymarzyć lepszego miejsca.

Aparat był zawsze gotowy. Joana robiła zdjęcie za zdjęciem — korony drzew, gdzie zachód zamieniał się w złoto, mech pokrywający każdy kamień.

To była jej wymarzona wyprawa. Rok przygotowań, trzy loty, tydzień łodzią w górę rzeki — i wreszcie tutaj.

Jeszcze nie wiedziała, że las już ją zauważył.`,

    'Страница 02': `Zespół rozbił obóz na małej polanie. Gdzieś w pobliżu żyło plemię — czuć to było po złamanych gałęziach i śladach na ziemi. Zadanie było proste: obserwować i fotografować. Nie wtrącać się.

Ale las nagle umilkł.

Najpierw znikły papugi. Potem ucichły cykady. Wiatr, który jeszcze przed chwilą szumiał w koronach, nagle stanął. Powietrze stało się ciężkie i nieruchome.

Dżungla się nie uciszyła. Dżungla czekała.

Joana opuściła aparat i spojrzała w głąb lasu. Coś się zmieniło. Coś czekało.`,

    'Страница 03': `Głęboko w puszczy płonął ogień. Ale nie grzał.

Płomień tańczył nienaturalnie wysoko, zmieniając barwę z pomarańczowej na trupią zieleń. Dym nie unosił się w górę — kłębił się wokół szamana, przybierając gęste, żywe kształty.

Szaman wiedział, co robi. Stare legendy ostrzegały: Tobiasz nie jest duchem-opiekunem, lecz siłą chaosu. Nie można go ujarzmić. Ale szaman nie chciał słuchać.

Rytm bębnów narastał. Słowa rytuału ginęły w huku, zapach ozonu mieszał się z wonią zgniłych liści. Granica między światem żywych a tym, co spało od wieków, zaczęła się ścierać.

Rytuał się rozpoczął.`,

    'Страница 04': `Świat rozpadł się w jednej chwili.

Najpierw przyszedł wiatr — nie podmuch, lecz fizyczny cios. Drzewa zaczęły łkać, ich korony uginały się pod niewidocznym ciężarem. Niebo zaciągały czarne, wrzące chmury rozrywane błyskawicami.

A potem ziemia zadrżała.

Z puszczy, łamiąc wiekowe pnie jak suche patyczki, wyłonił się Tobiasz. Nie duch — sama furia lasu, która przybrała ciało z korzeni, mchu i pradawnej kory. Ogromny, wyższy od najwyższych drzew. Jego białe oczy jarzyły się zimnym, martwym blaskiem.

Chaos przestał być przeczuciem. Stał się rzeczywistością.`,

    'Страница 05': `Krzyk uwięził się w gardle.

Olbrzymi cień przykrył polanę — i Joana go zobaczyła. Pradawny pień, gruby jak dom, walił się prosto na nią. Padał powoli, jak w koszmarze, a jednocześnie zbyt szybko — zbyt szybko, żeby uciec.

Nogi odmówiły posłuszeństwa. Joana stała.

Pień leciał. Ziemia drżała. Joana zacisnęła powieki i zakryła głowę rękami — jakby dwie ręce mogły zatrzymać coś, co ważyło kilka ton.

Ciemność. Cios powinien był nadejść. Ale go nie było.`,

    'Страница 06': `Zamiast ciemności rozbłysło światło.

To zdarzyło się naprawdę. W ułamku sekundy powietrze wokół jej dłoni zagęściło się, rozświetliło i stało się ciepłe. Palące, swojskie ciepło przeszyło dłonie.

W jej rękach był Łuk.

Smukły, utkany ze złotej energii i pociemniałego metalu. Joana nie myślała — palce same znalazły cięciwę. To był ruch nie przestraszonej dziewczyny, lecz kogoś innego. Kogoś, kto robił to tysiące razy.

Naciągnęła cięciwę. Na niej pojawiła się strzała — ze czystego złotego światła.

Wydech. Cel. Chwila przed strzałem.`,

    'Страница 07': `Strzała zerwała się z cięciwy — nie z świstem, lecz z niskim pomrukiem, od którego zadrżały kości.

Nie przebiła pnia. Uderzyła w niego — i rozsypała się siecią złotych błyskawic, które oplótły drzewo jak żywe pnącza. Grawitacja jakby znikła. Wielotonny kolos, lecący w dół, zawisł metr nad ziemią.

Joana czuła jego ciężar. Nie rękami — całym ciałem. Wiedziała: wystarczy zapragnąć.

Z wysiłkiem pchnęła pień w bok. Drzewo runęło z hukiem kilka kroków dalej. Ale cały zespół był cały.

Cisza. Deszcz. Oddech ocalałych.`,

    'Страница 08': `Łuk zgasł.

Tak samo nagle, jak się pojawił — rozpłynął się w złotych iskrach, zostawiając jedynie lekkie mrowienie w palcach. Joana opuściła ręce.

Deszcz słabł. Wiatr opadał. Gdzieś w oddali jeszcze grzmot — odchodzący, jakby sama burza wycofała się w zamęcie.

Zespół patrzył na nią. Nie tak jak godzinę temu. W ich oczach był strach. Była nadzieja. Było coś, na co Joana nie miała słów.

Spojrzała na swoje dłonie. Zwykłe dłonie. Fotografki, nie wojowniczki.

Dżungla wokół była taka sama. Niebo — takie samo. Ale wiedziała na pewno:

Wszystko się zmieniło.`
  },
  'Глава 02': {
    'Страница 01': `W chwili gdy Joana opuściła Łuk, myślała, że to już koniec.

Tobiasz nie zniknął. Jego furia, zderzywszy się ze złotym światłem, nie zgasła — rozsypała się na tysiące niewidocznych odłamków. Ciemna energia szukała nowego schronienia. Szukała naczynia.

I znalazła je.

Nie skałę ani drzewo. Ten sam przedmiot, przez który Joana patrzyła na świat. Jej aparat.

Obiektyw mignął zielenią. Raz. Ledwo zauważalnie. Joana nie widziała.`,

    'Страница 02': `Minął jeden dzień. Miasto żyło swoim zwykłym życiem, jakby nic się nie stało. Ale dla Joany świat stał się inny.

Przyszła do miejskiego parku szukając ciszy. Znajome alejki, zapach trawy, ławki — wszystko, co kiedyś uspokajało. Byle nie myśleć. Byle nie pamiętać dżungli.

Wtedy wiatr się zmienił.

Nie miejska bryza — coś innego. Zimne, przeszywające, pachnące mokrą ziemią i zgniłymi liśćmi. Drzewa wokół zaszumiały zbyt ostro. Korony wygięły się nienaturalnie. Przechodnie nagle stanęli — i pobiegli. Bez słowa, bez wyjaśnień.

Park opustoszał w kilka sekund. Została tylko Joana.`,

    'Страница 03': `Park był pusty. Była tylko ona.

Joana nie uciekła. Od powrotu z Amazonii coś w niej się zmieniło. Strach nie zniknął — ale teraz nią nie rządził.

Aparat na szyi nagle stał się ciężki. Zaczął wibrować — lekko, jak telefon przed połączeniem. Po skórze Joany przebiegł delikatny dreszcz.

— Wiem, że tu jesteś — szepnęła.

Z obiektywu wytrysnął strumień widmowego zielonego światła. Nie rozproszył się — zaczął gęstnieć, przybierać kształt. Gałęzie drzew pochyliły się. Trawa przywarła do ziemi.

Z mgły i cienia przed Joaną wyłoniła się postać Tobiasza.`,

    'Страница 04': `Czas się zatrzymał.

Stał przed nią On. Tobiasz. Ten sam, od którego furii trzęsły się dżungle, łamały wiekowe drzewa. Teraz — w miejskim parku. Dwa kroki dalej.

W głowie Joany przemknęły obrazy: padający pień, błysk złotego światła, ciepło w dłoniach. Zamknęła oczy. Wdech. Wydech.

Kiedy je otworzyła — w rękach był Łuk.

Tobiasz patrzył na nią. W jego pradawnych oczach nie było ani zdziwienia, ani strachu — tylko zimna, pierwotna nienawiść. Znał tę siłę. Znał ją zbyt dobrze.

Dwoje wrogów. Dwa światy. Jeden park między nimi.`,

    'Страница 05': `Tobiasz uderzył pierwszy.

Jego ogromna noga runęła na ziemię z siłą trzęsienia ziemi. Asfalt pękł, rozchodząc się pajęczyną spękań. Ławki podskoczyły. Latarnie się zakołysały. Sama ziemia wydała z siebie jękliwy dźwięk.

Z pęknięć, jak węże z nor, wypełzły pnącza. Żywe, giętkie, zielone — sięgały ku Joanie z przerażającą szybkością, wijąc się i splatając.

Tobiasz nie zamierzał walczyć uczciwie. Chciał złapać. Unieruchomić. I Joana zrozumiała to w ułamku sekundy.

Uniosła Łuk.`,

    'Страница 06': `Pnącza napierały ze wszystkich stron. Ale Joana nie panikuje — obserwuje.

Wszystkie pnącza ciągnęły się do jednego punktu. Nie osobne stworzenia — jedna sieć. Jedno źródło. Jedna słabość.

Joana naciągnęła cięciwę. Wystrzeliła nie w Tobiasza — w najbliższe pnącze.

Strzała wbiła się w zielony łodyżek — i Joana to poczuła. Połączenie. Kontrolę. Władzę nad cudzą siłą. Jednym ruchem woli rzuciła pnącze na ziemię.

Dalej — jak domino. Jedno za drugim, pnącza opadały po całym parku.

Po chwili wszystko było skończone.`,

    'Страница 07': `Cisza.

Tobiasz stał pośród pokonanych pnączy. Jego świecące oczy przebiegały od jednej opadłej łodygi do drugiej. To, co budował przez wieki — ta dziewczyna zniszczyła w sekundy.

Ryk, który wyrwał się z jego piersi, sprawił, że drzewa zadrżały. Nie krzyk bólu — furia. Czysta, pierwotna, pradawna.

Ale potem coś się zmieniło. Tobiasz zamarł, patrząc na Joanę. Na jej Łuk. Na złoty blask otaczający jej sylwetkę.

Znał tę siłę. Pamiętał ją.

Szepnął coś w języku niesłyszanym od tysięcy lat — i zaczął się rozpadać. Korzenie, kora, mech — wszystko zamieniło się w rój zielonych, świecących cząstek. Obłok wzniósł się w powietrze i zniknął w głębi parku.

Joana opuściła Łuk. Wygrała. Ale wiedziała: to dopiero początek.`
  },
  'Глава 03': {
    'Страница 01': `Następnego ranka po walce w parku Joana siedziała na parapecie, patrząc na budzące się miasto. Łuk zniknął tak nagle, jak się pojawił — rozpłynął się w złotych iskrach, gdy niebezpieczeństwo minęło.

„Kim jest Tobiasz? Skąd pochodzi moja moc? Dlaczego Łuk pojawia się wtedy, kiedy trzeba?"

Pytania nie dawały spokoju. Joana przypomniała sobie starą bibliotekę niedaleko domu — małą, zakurzoną, ale z niezwykłą kolekcją dawnych ksiąg. Może tam znajdzie odpowiedzi?

Narzuciła kurtkę i wyszła w chłodny poranek.`,

    'Страница 02': `Biblioteka kryła się w starym ceglanym budynku między kawiarnią a kwiaciarnią. Joana pamiętała ją z dzieciństwa — mama czasem tu przychodziła.

W środku pachniało papierem i czasem. Wysokie drewniane regały sięgały pod sam sufit, wypełnione księgami wszelkich rozmiarów i epok.

Joana wzięła wszystko, co mogło pomóc: encyklopedie mitologii, zbiory legend różnych ludów. Stos okazał się pokaźny.

— Projekt badawczy? — uśmiechnęła się starsza bibliotekarka.

— Można tak powiedzieć — odpowiedziała Joana.`,

    'Страница 03': `W domu Joana rozłożyła książki na stole i zabrała się do pracy. Mity Amazonii, duchy lasu, dawne wierzenia...

I wtedy zamarła.

Pośród ksiąg leżała jedna, której na pewno nie brała. Stara, w wytartej skórzanej oprawie, ze złotymi literami na okładce: „Starożytna Księga Legend".

Skąd się wzięła? Joana nie pamiętała, żeby ją brała z półki. Ale księga była tutaj — ciężka, prawdziwa, pachnąca wiekami.

Palce same wyciągnęły się ku okładce.`,

    'Страница 04': `Joana otworzyła księgę — i świat stanął w miejscu.

Nad pożółkłymi stronami pojawił się blask. Najpierw — ledwie zauważalne migotanie. Potem zgęstniało, przybrało kształt i Joana cofnęła się.

Tobiasz.

Jego sylwetka unosiła się nad księgą — widmowa, półprzezroczysta, utkana z niebieskawe go światła. Pradawny duch lasu powoli się obracał, pozwalając się przyglądać każdemu szczegółowi: splecionym korzeniom, mchowi na korze, rogom z gałęzi, zimnym świecącym oczom.

To nie była iluzja. Księga pokazywała prawdę.`,

    'Страница 05': `Drżącą ręką Joana przewróciła stronę.

Hologram Tobiasza rozpłynął się i w jego miejscu pojawiła się nowa wizja. Złote promienie — dziesiątki świetlistych nici — miotały się nad księgą, splatając i rozchodząc jak żywe.

Joana rozpoznała je w jednej chwili.

To była jej moc. Ta sama energia, która płynęła przez Łuk i strzały. Jasna magia telekinetyczna — zdolność do poruszania przedmiotami siłą myśli.

Księga o niej wiedziała. Księga wiedziała wszystko.`,

    'Страница 06': `Joana przewracała strony, chłonąc każde słowo i każdy obraz.

I oto — strona o Tobiaszu. Tekst był w dawnym języku, ale księga jakby tłumaczyła go wprost do umysłu.

„...ciało leśnego ducha nie jest jednością, lecz sojuszem tysiąca korzeni i pnączy. Wszystkie zbiegają się w jednym miejscu — w centrum piersi, gdzie bije jego mroczne serce..."

Nad księgą znów pojawił się hologram Tobiasza. Ale tym razem w centrum jego ciała pulsował czerwony punkt.

Joana patrzyła na niego z determinacją.`,

    'Страница 07': `Ostatnie strony okazały się najbardziej tajemnicze.

Na pożółkłym pergaminie narysowany był pradawny symbol: trzy kryształy ułożone w trójkąt. Złoty, niebieski i zielony. Świeciły nawet na rysunku.

Nad księgą pojawiła się ostatnia wizja — trzy unoszące się kryształy, powoli krążące wokół wspólnego środka.

„...trzy źródła pradawnej siły... rozrzucone po świecie... ten, kto zbierze wszystkie trzy..."

Tekst się urywał.

Joana spojrzała na swoje dłonie. Złoty kryształ — w jej Łuku. Ale są jeszcze dwa...

Zamknęła księgę. Przed nią czekała walka z Tobiaszem. A potem... potem będzie nowa przygoda.`
  },
  'Глава 04': {
    'Страница 01': `Joana zamknęła Starożytną Księgę Legend i podeszła do okna. Miasto żyło zwykłym wieczornym życiem — zapalały się latarnie, ludzie śpieszyli do domu. Nikt z nich nie wiedział, że kilka dni temu w miejskim parku pradawny bóg lasu próbował zniszczyć wszystko wokół.

Park był stąd widoczny. Nawet z tej odległości Joana dostrzegała powykręcane drzewa i ciemne łyse plamy, gdzie trawa nie chciała rosnąć. Ślady Tobiasza.

„Książki to dobrze — pomyślała. — Ale co z tego, jeśli nie potrafię kontrolować swojej mocy?"

Zacisnęła pięść. Dość czytania. Czas działać.`,

    'Страница 02': `Park powitał ją ciszą. Dziwną, nienaturalną ciszą — ani ptaków, ani szelestów. Nawet wiatr omijał to miejsce z daleka.

Joana szła główną alejką, przyglądając się śladom zniszczeń. Ławki wywrócone. Latarnie powygięte jak plastelina. Asfalt zdębiały od spękań, z których sterczały grube, sękowate korzenie.

Przykucnęła i ostrożnie dotknęła jednego z pnączy.

Pnącze drgnęło. Słabo, ledwo zauważalnie — ale drgnęło.

Moc Tobiasza była tu. Osłabiona, prawie wygasła — ale żywa. Idealna do ćwiczeń.`,

    'Страница 03': `Joana wstała, cofnęła się kilka kroków i wyciągnęła rękę. Zamknęła oczy. Skupiła się.

Najpierw — nic. Potem — znajome ciepło w dłoni. Złote iskry zawirowały wokół palców i Łuk zmaterializował się w jej ręce. Ciepły, pulsujący, żywy.

— No to spróbujemy.

Naciągnęła świecącą cięciwę. Złota strzała utkała się z powietrza. Joana wymierzyła w najgrubsze pnącze.

Strzał!

Strzała przeliciała przez pnącze jak przez dym. Błysnęła i znikła, nie zostawiając śladu. Pnącze szarpnęło — ale ze strachu, nie z trafienia.

Joana opuściła Łuk. Nie chybiła w przestrzeni — strzała poszła celnie. Ale energia nie chwyciła.`,

    'Страница 04': `Po trzeciej nieudanej próbie Joana usiadła na ocalałej ławce i wpatrzyła się w swoje ręce. Łuk rozpłynął się — zawsze znikał, gdy przestawała się skupiać.

Co robi nie tak? Strzały lecą celnie. Moc jest. Ale pnącza Tobiasza jakby jej ataków nie zauważają.

I wtedy sobie przypomniała. Słowa z Księgi, napisane drobnym pismem na marginesie: „Siła ciemności jest jak drzewo. Gałęzie można ciąć w nieskończoność, ale drzewo będzie stało. Szukaj korzenia. Szukaj centrum, gdzie wszystko się łączy."

Joana rozejrzała się. Pnącza rozchodziły się we wszystkie strony — ale wszystkie skądś wyrastały. Gdzieś tu musi być punkt, z którego wychodzą. Jeden wspólny korzeń.

— Nie w gałęzie. W korzeń — szepnęła Joana.`,

    'Страница 05': `Joana go znalazła. Centrum.

Miejsce, gdzie wszystkie pnącza zbiegały się w jednym punkcie. Głęboka, prawie idealnie okrągła szczelina w ziemi, z której sterczał węzeł splecionych korzeni — gruby, pulsujący słabą ciemną poświatą.

Serce. Korzeń całej tej mrocznej sieci.

Joana cofnęła się dziesięć kroków. Wyciągnęła rękę. Łuk pojawił się natychmiast — jakby poczuł, że tym razem wszystko będzie inaczej.

Naciągnęła cięciwę. Złota strzała zaświeciła jaśniej niż zwykle.

Wydech. Strzał.

Strzała wbiła się dokładnie w środek węzła. Złota poświata spłynęła po pnączach, rozlewając się od centrum ku krawędziom jak światło po żyłach.

Udało się!`,

    'Страница 06': `Coś się zmieniło.

Joana poczuła to wcześniej, niż zobaczyła. Ciepła fala przeszła od czubków palców w górę ramienia — tam, gdzie ściskała Łuk. Jakby niewidzialna nić rozciągnęła się między nią a pnączami przenikniętymi złotym światłem.

Powoli uniosła wolną rękę. Pnącza na ziemi poruszyły się.

Joana wstrzymała oddech. Znów uniosła rękę — wyżej. Pnącza ciągnęły się ku górze, podążając za jej ruchem.

— Działa — szepnęła. — Działa!

Zrobiła powolny krąg dłonią. Pnącza zakręciły się za nią. Opuściła rękę — i opadły z powrotem na ziemię. Posłusznie. Bez oporu.

Joana roześmiała się — cicho, niemal niedowierzająco. Tobiasz myślał, że jego pnącza to jego broń. Teraz Joana wiedziała: może zamienić jego broń w swoją.`,

    'Страница 07': `Joana wciąż się uśmiechała, patrząc na pnącza powoli opadające na ziemię.

Ale wtedy nadszedł wiatr.

Nie ten ciepły miejski wiatr. Zimny. Ostry. Pachnący czymś mrocznym i dawnym. Pnącza na ziemi nagle zamarły — i skuliły się, jakby się wystraszyły.

Joana uniosła głowę.

Niebo nad parkiem się zmieniło. Szare chmury pociemniały, ciągnęły ku horyzontowi — tam, gdzie za miastem zaczynał się las. I tam, nad wierzchołkami drzew, w gęstniejącym mroku wznosiła się sylwetka.

Wysoka. Ciemna. Nieruchoma.

Tobiasz.

Łuk pojawił się w dłoni sam — bez wezwania, bez wysiłku. Joana się nie poruszyła. Tylko zacisnęła rączkę mocniej i spojrzała wprost na mroczną postać.

On poczuł. On idzie.`
  }
};

// ── Save Polish texts to files ─────────────────────────────────────────────
Object.entries(polishTexts).forEach(([chapter, pages]) => {
  Object.entries(pages).forEach(([page, text]) => {
    const filePath = path.join(__dirname, 'Главы', chapter, page, 'сценарий_pl.md');
    fs.writeFileSync(filePath, `# ${page.replace('Страница', 'Strona')} — tekst po polsku\n\n${text}\n`, 'utf8');
  });
});
console.log('Polish texts saved. Generating PDF...\n');

// ── PDF Generation ─────────────────────────────────────────────────────────
const doc = new PDFDocument({
  layout: 'landscape',
  size: 'A4',
  margins: { top: 0, bottom: 0, left: 0, right: 0 },
  autoFirstPage: false
});

const outputPath = path.join(__dirname, 'Joana_Ksiazka_PL.pdf');
const outStream = fs.createWriteStream(outputPath);
doc.pipe(outStream);

const pageW  = 841.89;
const pageH  = 595.28;
const halfW  = pageW / 2;
const padH   = 36;   // horizontal padding inside text column
const padTop = 16;   // top padding

const FONT      = 'C:\\Windows\\Fonts\\arial.ttf';
const FONT_BOLD = 'C:\\Windows\\Fonts\\arialbd.ttf';
const FONT_ITAL = 'C:\\Windows\\Fonts\\ariali.ttf';

const chapters = [
  { dir: 'Глава 01', title: 'Rozdział 1: Przebudzenie Mocy', color: '#2D5A27' },
  { dir: 'Глава 02', title: 'Rozdział 2: Pierwsza Walka',    color: '#7A2020' },
  { dir: 'Глава 03', title: 'Rozdział 3: Tajemnicza Księga', color: '#1E3A6E' },
  { dir: 'Глава 04', title: 'Rozdział 4: Trening',           color: '#6E4A10' },
];

chapters.forEach(ch => {
  const chDir = path.join(__dirname, 'Главы', ch.dir);
  if (!fs.existsSync(chDir)) return;

  const pages = fs.readdirSync(chDir)
    .filter(p => p.startsWith('Страница'))
    .sort();

  pages.forEach((pg, idx) => {
    const plFile  = path.join(chDir, pg, 'сценарий_pl.md');
    const imgFile = path.join(chDir, pg, 'render.png');
    if (!fs.existsSync(plFile) || !fs.existsSync(imgFile)) {
      console.log('Skip (missing): ' + pg); return;
    }

    // Clean text
    const rawText = fs.readFileSync(plFile, 'utf8');
    const cleanText = rawText.split('\n').filter(l => !l.startsWith('#')).join('\n').trim();

    doc.addPage({ layout: 'landscape', size: 'A4' });

    // ── Left half: cream background ───────────────────────────────────────
    doc.rect(0, 0, halfW, pageH).fill('#F9F7F2');

    let cursorY = padTop;

    if (idx === 0) {
      // First page of chapter: colored header with chapter title
      doc.rect(0, 0, halfW, 48).fill(ch.color);
      doc.font(FONT_BOLD).fontSize(14).fillColor('#FFFFFF')
         .text(ch.title, padH, 16, { width: halfW - padH * 2 });
      cursorY = 58;
    } else {
      // Subsequent pages: small colored chapter label
      doc.font(FONT_ITAL).fontSize(8.5).fillColor(ch.color)
         .text(ch.title, padH, cursorY, { width: halfW - padH * 2 });
      cursorY += 13;
      doc.save()
         .moveTo(padH, cursorY).lineTo(halfW - padH, cursorY)
         .lineWidth(0.8).strokeColor(ch.color).stroke()
         .restore();
      cursorY += 7;
    }

    // Main text — HEIGHT CAPPED so it never overflows to next page
    const maxTextH = pageH - cursorY - 22;   // leave 22pt for page number
    doc.font(FONT).fontSize(15).fillColor('#1A1A1A')
       .text(cleanText, padH, cursorY, {
         width:   halfW - padH * 2,
         height:  maxTextH,          // ← key fix: text is clipped, never spills
         lineGap: 5,
         align:   'left'
       });

    // Page number at bottom
    doc.font(FONT).fontSize(9).fillColor('#BBBBBB')
       .text(String(idx + 1), padH, pageH - 18, {
         width: halfW - padH * 2, align: 'center'
       });

    // ── Right half: full-bleed image ──────────────────────────────────────
    try {
      doc.image(imgFile, halfW, 0, {
        width: halfW, height: pageH,
        cover: [halfW, pageH], align: 'center', valign: 'center'
      });
    } catch (e) {
      doc.rect(halfW, 0, halfW, pageH).fill('#CCCCCC');
      console.log('Image error: ' + e.message);
    }

    // White divider line between text and image
    doc.save()
       .moveTo(halfW, 0).lineTo(halfW, pageH)
       .lineWidth(3).strokeColor('#FFFFFF').stroke()
       .restore();

    console.log('✓ ' + ch.dir + ' / ' + pg);
  });
});

doc.end();
outStream.on('finish', () => {
  const size = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(1);
  console.log(`\n✅ PDF ready: ${outputPath}  (${size} MB)`);
});
