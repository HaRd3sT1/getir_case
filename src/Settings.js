import React from 'react';

export const defaultHesapAdi = "BEAL UG (haftungsbeschränkt)";
export const defaultIban = "BE44 9671 7792 5345";
export const defaultBic = "TRWIBEB1XXX";
export const defaultTemplate = "3";
export const TenorKey = "VI0C0AMTC9K0";
export const defaultCurrency = "€";
export const defaultHomeTemplate = "2";
export const defaultLanguage = "de";
export const defaultCountry = "de";
export const template2Type = "";
export const defaultFakeId = "fake";
export const defaultTitle = "Beepr";
export const defaultMicropaymentLink = "micropayment.de";
export const defaultMail = "info@beepr.de";
export const defaultColors ={
  primary:"#dc4d7a",
  primaryH:"#de668c",
  success:"#1dd1a1",
  successH:"#10ac84",
};
export const defaultVip = true;
export const defaultPaysafecard = true;
export const defaultVorkasse = true;
export const defaultSocial = true;
export const defaultApplink = false;
export const defaultLogoLink = "https://firebasestorage.googleapis.com/v0/b/beepr-de.appspot.com/o/beepr.svg?alt=media&token=185f5e22-aa53-4439-80ca-ca8225037620";
export const defaultLogoIconLink = "https://firebasestorage.googleapis.com/v0/b/beepr-de.appspot.com/o/icon.png?alt=media&token=3a33db6c-6195-448f-93e1-f4eee2abfbe7";
export const defaultLogo = <img style={{height:46}} src="https://firebasestorage.googleapis.com/v0/b/beepr-de.appspot.com/o/beepr.svg?alt=media&token=185f5e22-aa53-4439-80ca-ca8225037620" alt="" />;
export const defaultLogoWhite = <img style={{height:140}} src="https://firebasestorage.googleapis.com/v0/b/beepr-de.appspot.com/o/beeprWhite.svg?alt=media&token=fc0119ce-78cf-43d2-8311-8707b51bda47" alt="" />;
export const defaultPayments = [
        { title: "Paypal", img: require('./assets/img/paypal.png'), value: "paypal" },
        { title: "Kreditkarte", img: require('./assets/img/visa.png'), value: "creditcard" },
        { title: "Sofort-Überweisung", img: require('./assets/img/sofort.png'), value: "directbanking" },
        { title: "Paysafecard", img: require('./assets/img/paysafecard.png'), value: "paysafecard" },
        { title: "Vorkasse", img: require('./assets/img/vorkasse.png'), value: "prepayment" },
    ];
export const defaultVucutYapisi = ["Schlank", "Normal", "Athletisch", "Muskulös", "Mollig", "Rundlich"]
export const defaultSport = ["Fitness", "Fußball", "Golf", "Gymnastik", "Hockey", "Reiten", "Jazz", "Joggen", "Schwimmen", "Volleyball", "Darts", "Tanzen","Tennis","Yoga","Andere"]
export const defaultMusic = ["Hip-Hop", "Country", "Rock", "Classic", "Dance", "House", "Jazz", "Pop", "Rap", "Hard Rock", "Soul", "Techno","Metal ","Andere"]
export const defaultFilm = ["Action", "Fantasy", "Drama", "Animation", "Comedy", "Anime", "Horror", "Thriller", "Andere"]
export const defaultActivite = ["Kino", "Konzerte", "Karaoke", "Events", "Bar", "Disco", "Restaurant", "Theater", "Andere"]
export const defaultBody = ["Schlank", "Normal", "Athletisch", "Muskolös", "Mollig"]
export const defaultEyeColor = ["Blau", "Braun", "Grün", "Grau", "Andere"]
export const defaultHairColor = ["Blond", "Schwarz", "Braun", "Rot", "Grau", "Weiß", "Andere"]
export const defaultStyle = ["Sportlich", "Klassich", "Lässig", "Alternativ"]
export const defaultExtra = ["Tattoo", "Piercing", "Beides", "Keins"]
export const defaultMeslek = ["Angestellte/r", "Selbstständige/r", "Student/in", "Rentner/in", "Offizier/in", "Auszubildende/r", "Beamte/r", "Hausfrau/mann", "Arbeitssuchend"]
export const defaultMezuniyet = ["Universität / Hochschule", "Gymnasium", "Realschule", "Berufsschule", "kein Abschluss"]
export const defaultIliskiDurumu = ["Single", "In einer Beziehung", "Verheiratet", "Verwitwet", "Geschieden", "Romanze", "Offene Beziehung", "Es ist Kompliziert"]
export const defaultCocuklar = ["Ja", "Nein"]
export const defaultRelation = ["Feste Beziehung", "Abenteuer", "Affäre", "Flirt", "Freundschaft"]
export const defaultLanguages = ['Deutsch', 'Englisch', 'Französisch', 'Spanisch', 'Italienisch', 'Polnisch', 'Andere']
export const defaultHobs = ["Lesen", "Reisen", "Musik hören", "Kochen", "Schwimmen", "Joggen", "Fitnessstudio", "Reiten", "Kino", "Wandern", "Extremsport", "Fernsehen", "Computerspiele", "Sport", "Fotografie", "Gesellschaftspiele", "Backen", "Sammeln", "Angeln", "Camping", "Karaoke", "Frag mich"];
export const userId_S = (id) => {
  return id.replace("fake", "user");
}
export const userId_2_S = (id) => {
  return id.replace("user", "fake");
}

export const emojiList = ["😀","😁","😂","🤣","😃","😄","😅","😆","😉","😊","😋","😎","😍","😘","😗","😙","😚","🙂","🤗","🤩","🤔","🤨","😐","😑","😶","🙄","😏","😣","😥","😮","🤐","😯","😪","😫","😴","😌","😛","😜","😝","🤤","😒","😓","😔","😕","🙃","🤑","😲","☹️","🙁","😖","😞","😟","😤","😢","😭","😦","😧","😨","😩","🤯","😬","😰","😱","😳","🤪","😵","😡","😠","🤬","😷","🤒","🤕","🤢","🤮","🤧","😇","🤠","🤡","🤥","🤫","🤭","🧐","🤓","😈","👿","👹","👺","💀","☠️","👻","👽","👾","🤖","💩","😺","😸","😹","😻","😼","😽","🙀","😿","😾","🙈","🙉","🙊","😀","😁","😂","🤣","😃","😄","😅","😆","😉","😊","😋","😎","😍","😘","😗","😙","😚","🙂","🤗","🤩","🤔","🤨","😐","😑","😶","🙄","😏","😣","😥","😮","🤐","😯","😪","😫","😴","😌","😛","😜","😝","🤤","😒","😓","😔","😕","🙃","🤑","😲","☹️","🙁","😖","😞","😟","😤","😢","😭","😦","😧","😨","😩","🤯","😬","😰","😱","😳","🤪","😵","😡","😠","🤬","😷","🤒","🤕","🤢","🤮","🤧","😇","🤠","🤡","🤥","🤫","🤭","🧐","🤓","😈","👿","👹","👺","💀","☠️","👻","👽","👾","🤖","💩","😺","😸","😹","😻","😼","😽","🙀","😿","😾","🙈","🙉","🙊"]