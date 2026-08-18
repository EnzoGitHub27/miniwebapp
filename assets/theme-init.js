/* Applica il tema salvato prima che la pagina venga disegnata.
   Va incluso nel <head>, senza defer, altrimenti si vede il lampo bianco.
   Se l'utente non ha mai scelto, non scrive nulla: comanda il sistema. */
(function () {
  try {
    var t = localStorage.getItem('mwa.theme');
    if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
  } catch (e) { /* navigazione privata: pazienza, resta la preferenza di sistema */ }
})();
