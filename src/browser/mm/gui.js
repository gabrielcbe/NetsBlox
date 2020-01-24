// para criar menu no como "dropdown" ao clicar bom botão direito no palco ou ator.
/*
SpriteIconMorph.prototype.originalUserMenu = SpriteIconMorph.prototype.userMenu;
SpriteIconMorph.prototype.userMenu = function() {
  menu = this.originalUserMenu();
  menu.addLine();
  var myself = this;
  menu.addItem(
    'connect to mBot',
    function() {
      myself.statusConnectionmBot();
    });
  menu.addItem(
    'disconnect mBot',
    function() {
      this.registraDesconexaoMBOT();
    });

  return menu;
};

*/
/*
 * Override setLanguage function
 */

IDE_Morph.prototype.originalSetLanguage = IDE_Morph.prototype.setLanguage;
IDE_Morph.prototype.setLanguage = function(lang, callback) {
  var myself = this;

  myself.originalSetLanguage(lang, function() {
    myself.setLanguageMM(lang, callback);
  });
};

IDE_Morph.prototype.setLanguageMM = function(lang, callback) {

  var mmTranslation = document.getElementById('mm-language'),
    mmSrc = 'mm/lang-' + lang + '.js',
    myself = this;
  if (mmTranslation) {
    document.head.removeChild(mmTranslation);
  }
  if (lang === 'en') {
    return this.reflectLanguage('en', callback);
  }
  mmTranslation = document.createElement('script');
  mmTranslation.id = 'mm-language';
  mmTranslation.onload = function() {
    myself.reflectLanguage(lang, callback);
  };
  document.head.appendChild(mmTranslation);
  mmTranslation.src = mmSrc;

};
