/* ============================================================
   Elenco di parole italiane per le frasi di accesso
   ------------------------------------------------------------
   Parole comuni, corte, senza accenti e senza apostrofi: facili
   da ricordare e da digitare anche su una tastiera del telefono.

   L'elenco serve solo a comporre frasi casuali: piu' parole
   contiene, piu' robusta e' ogni frase generata. Il conteggio
   esatto viene mostrato nell'app e usato per calcolare l'entropia.
   ============================================================ */

window.PAROLE = (
  'abaco abete abito acero acqua aereo affare agenda aglio agosto aiuto alba ' +
  'albero alce alfabeto alga alito allegro alloro altezza altare amaca amico ' +
  'ancora anello angolo anima anitra antenna ape aprile aquila arancia arco ' +
  'argento aria arpa arte asino aspetto asse astro atomo attore autore avena ' +
  'avorio azzurro babbo bacio badia baffo bagno balcone balena ballo bambu ' +
  'banco bandiera barca barile basilico basso bastone batteria baule becco ' +
  'belva bene benzina berretto bestia betulla bianco bibita bicchiere bidone ' +
  'biglia bilancia binario biscotto bisonte bocca bollo bomba borsa bosco ' +
  'bottone braccio brace branco bravo brezza brina brodo bronzo bruco budino ' +
  'bufalo bugia buio bulbo burro bussola busta cabina cacao caccia cactus ' +
  'caduta caffe calamaio calcio caldo calma calza cambio camino campana ' +
  'canale candela cane canoa cantina capra capello cappello carbone cardo ' +
  'carota carro carta cascata casco caserma castagna castello catena cavallo ' +
  'caverna cavolo cedro cena cenere centro cera cervo cesto chiave chiodo ' +
  'chitarra cibo ciliegia cima cinema cintura cipolla circo citta civetta ' +
  'classe clima cocco coda colla collina colomba colore coltello comodo ' +
  'compasso conchiglia coniglio cono corallo corda corno corona corsa corvo ' +
  'coscia cosmo costa cotone cratere creta cresta crosta cubo cucchiaio ' +
  'cucina cugino cuore cupola curva cuscino dado dama danza dattero delfino ' +
  'dente deserto destino dettaglio diamante diario dicembre dito divano ' +
  'dolce domanda donna dono dorso dose dote drago druido duna duomo ebano ' +
  'eco edera elica elmo enigma enorme entrata epoca erba eremo eroe esame ' +
  'esca estate etica fabbrica faggio fagiolo falco fame fango fantasia farfalla ' +
  'farina faro fascia fata fatica fava favola febbraio felce felice fenice ' +
  'ferro festa fiaba fiamma fianco fibbia fico fienile fiera figura filo ' +
  'finestra fiore fiume flauto flotta foca foglia folla fondo fonte forbice ' +
  'forchetta foresta forma formica forno forte fosso fragola frana frassino ' +
  'freccia freno fresco fretta frutto fuga fulmine fumo fune fungo fuoco ' +
  'gabbiano galassia galleria gallo gamba gancio garofano gatto gazza gelato ' +
  'gelso gemma genio gente gesso ghiaccio ghianda ghiro giacca giardino ' +
  'ginepro ginocchio giornata giostra giovane girasole gita giudice giugno ' +
  'giungla gloria gnomo gola gomito gomma gonna gradino grano granchio grappolo ' +
  'grazia grillo grotta gruppo guancia guanto guardia guerra gufo guida gusto ' +
  'idea idolo iena iglu impero incenso indice inverno ippodromo iride isola ' +
  'istante labbro lago lama lampada lancia lato latte lava lavagna legno ' +
  'lente leone lepre lettera letto libro lievito lima limone linea lingua ' +
  'lino lira lista litro logica lotta luce luglio luna lupo lupino macchia ' +
  'madre maggio maglia mago magnete mais malto mandorla mango manico mano ' +
  'mantello marea margine marmo marte martello marzo maschera massa matita ' +
  'mattone medaglia mela melodia mensola menta mercato merlo mese mestolo ' +
  'meta metallo miele miglio miniera minuto mirto misura mobile moda molla ' +
  'moneta monte morso mosaico mosca mostro motore mucca muffa mulino muro ' +
  'muschio museo musica nastro natura nave nebbia negozio neve nido nipote ' +
  'nocciola nodo nome nonna nord nota notte novembre nube numero nuvola oasi ' +
  'oca occhio oceano odore offerta olio oliva ombra ombrello onda onice opera ' +
  'ora orchidea ordine orecchio orizzonte orma oro orologio orso ortica orzo ' +
  'osso ostrica ottobre ovest pacco padella padre paese paglia palazzo palco ' +
  'palla palma palude panca pane panno papavero parco parete parola passo ' +
  'pasta patata pausa pavone pecora pelle penna pensiero pepe pera perla ' +
  'pesca pesce peso petalo pettine pezzo piano pianta piatto piazza picco ' +
  'piede pietra pigna pilastro pineta pino pioggia piombo piuma platano ' +
  'poesia polvere pomodoro ponte popolo porta porto posta pozzo prato premio ' +
  'presa prezzo prugna pugno pulce punta puntino quaderno quadro quaglia ' +
  'quercia quiete quintale radice raggio ragno ramo rana rapa raso rete ' +
  'ricamo riccio riga rima ripa riso ritmo riva roccia rombo rondine rosa ' +
  'rospo rotta rovere rubino ruggine rullo ruota sabbia sacco sale salice ' +
  'salsa salto sapone sarto sasso savana sbarra scala scatola scarpa scena ' +
  'scheda schiuma scoglio scopa scorza scudo secchio secolo sedano sedia ' +
  'seme sentiero sera serpente sete settembre sfera sguardo sipario sirena ' +
  'smalto sogno soldato sole solco sonno sorriso spada spalla specchio spiga ' +
  'spina spugna stagno stalla stampa stanza stella stagione stivale storia ' +
  'strada stufa succo sughero suono tacco talpa tamburo tana tappeto tarlo ' +
  'tasca tavolo teatro tela telaio tempesta tempio tenda terra tesoro testa ' +
  'tetto tigre timone tino tordo torre torta tosse traccia trave treno ' +
  'triangolo tromba tronco trota tuffo tulipano tuono turbine uccello ulivo ' +
  'umore unghia uovo urlo uva vaglio valle vantaggio vapore vasca vaso vela ' +
  'veleno velluto vena vento verbo verde verme vernice vetro via viaggio ' +
  'vicolo vigna villa vino viola violino virgola visione vista vite vitello ' +
  'voce volpe volo volta vulcano zaino zampa zebra zecca zenzero zero zolfo ' +
  'zolla zucca zuppa'
).split(' ').filter(Boolean);
