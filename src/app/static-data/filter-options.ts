export interface SongFilterOption {
  key: string;
  value: string;
}

export const coruntries = [
  'filterOptions.countries.belarus',
  'filterOptions.countries.lithuania',
  'filterOptions.countries.moldova',
  'filterOptions.countries.poland',
  'filterOptions.countries.romania',
  'filterOptions.countries.slovakia',
  'filterOptions.countries.hungary',
  'filterOptions.countries.ukraine',
  'filterOptions.countries.russia'
];

export enum Coruntries {
  'Біорусь' = 'filterOptions.countries.belarus',
  'Литва' = 'filterOptions.countries.lithuania',
  'Молдова' = 'filterOptions.countries.moldova',
  'Польща' = 'filterOptions.countries.poland',
  'Румунія' = 'filterOptions.countries.romania',
  'Словаччина' = 'filterOptions.countries.slovakia',
  'Болгарія' = 'filterOptions.countries.hungary',
  'Україна' = 'filterOptions.countries.ukraine',
  'росія' = 'filterOptions.countries.russia'
}

export const CountriesSelectOptions: SongFilterOption[] = [
  { key: 'filterOptions.countries.belarus', value: 'Біорусь' },
  { key: 'filterOptions.countries.lithuania', value: 'Литва' },
  { key: 'filterOptions.countries.moldova', value: 'Молдова' },
  { key: 'filterOptions.countries.poland', value: 'Польща' },
  { key: 'filterOptions.countries.romania', value: 'Румунія' },
  { key: 'filterOptions.countries.slovakia', value: 'Словаччина' },
  { key: 'filterOptions.countries.hungary', value: 'Болгарія' },
  { key: 'filterOptions.countries.ukraine', value: 'Україна' },
  { key: 'filterOptions.countries.russia', value: 'росія' }
];

export const RegionsSelectOptions: SongFilterOption[] = [
  { key: 'filterOptions.regions.ivanoFrankivsk', value: 'Івано-Франківська область' },
  { key: 'filterOptions.regions.crimea', value: 'Автономна республіка Крим' },
  { key: 'filterOptions.regions.brest', value: 'Берестейська область' },
  { key: 'filterOptions.regions.bryansk', value: 'Брянська область' },
  { key: 'filterOptions.regions.bilgorod', value: 'Бєлгородська область' },
  { key: 'filterOptions.regions.warmian', value: 'Вармінсько-Мазурське воєводство' },
  { key: 'filterOptions.regions.greaterPoland', value: 'Великопольське воєводство' },
  { key: 'filterOptions.regions.volgograd', value: 'Волгоградська область' },
  { key: 'filterOptions.regions.volyn', value: 'Волинська область' },
  { key: 'filterOptions.regions.voronizh', value: 'Воронезька область' },
  { key: 'filterOptions.regions.vinnytsya', value: 'Вінницька область' },
  { key: 'filterOptions.regions.vitebsk', value: 'Вітебська область' },
  { key: 'filterOptions.regions.gomel', value: 'Гомельська область' },
  { key: 'filterOptions.regions.grodno', value: 'Гродненська область' },
  { key: 'filterOptions.regions.dnipro', value: 'Дніпропетровська область' },
  { key: 'filterOptions.regions.donetsk', value: 'Донецька область' },
  { key: 'filterOptions.regions.zhytomyr', value: 'Житомирська область' },
  { key: 'filterOptions.regions.zakarpattia', value: 'Закарпатська область' },
  { key: 'filterOptions.regions.zaporizhia', value: 'Запорізька область' },
  { key: 'filterOptions.regions.westPomeranian', value: 'Західнопоморське воєводство' },
  { key: 'filterOptions.regions.kyiv', value: 'Київська область' },
  { key: 'filterOptions.regions.krasnodar', value: 'Краснодарський край' },
  { key: 'filterOptions.regions.kurks', value: 'Курська область' },
  { key: 'filterOptions.regions.kuyavianPomeranian', value: 'Куявсько-Поморське воєводство' },
  { key: 'filterOptions.regions.khirovohrad', value: 'Кіровоградська область' },
  { key: 'filterOptions.regions.lodz', value: 'Лодзинське воєводство' },
  { key: 'filterOptions.regions.luhansk', value: 'Луганська область' },
  { key: 'filterOptions.regions.lviv', value: 'Львівська область' },
  { key: 'filterOptions.regions.lublin', value: 'Люблінське воєводство' },
  { key: 'filterOptions.regions.lubusk', value: 'Любуське воєводство' },
  { key: 'filterOptions.regions.masovian', value: 'Мазовецьке воєводство' },
  { key: 'filterOptions.regions.lesserPoland', value: 'Малопольське воєводство' },
  { key: 'filterOptions.regions.mykolayiv', value: 'Миколаївська область' },
  { key: 'filterOptions.regions.mohyliv', value: 'Могильовська область' },
  { key: 'filterOptions.regions.minsk', value: 'Мінська область' },
  { key: 'filterOptions.regions.kyivCiity', value: 'Місто Київ' },
  { key: 'filterOptions.regions.minskCity', value: 'Місто Мінськ' },
  { key: 'filterOptions.regions.sevastopolCiy', value: 'Місто Севастополь' },
  { key: 'filterOptions.regions.lowerSilesian', value: 'Нижньосілезьке воєводство' },
  { key: 'filterOptions.regions.odesa', value: 'Одеська область' },
  { key: 'filterOptions.regions.opole', value: 'Опольське воєводство' },
  { key: 'filterOptions.regions.poltava', value: 'Полтавська область' },
  { key: 'filterOptions.regions.pomeranian', value: 'Поморське воєводство' },
  { key: 'filterOptions.regions.pskov', value: 'Псковська область' },
  { key: 'filterOptions.regions.subcarpathian', value: 'Підкарпатське воєводство' },
  { key: 'filterOptions.regions.podlaskie', value: 'Підляське воєводство' },
  { key: 'filterOptions.regions.rostov', value: 'Ростовська область' },
  { key: 'filterOptions.regions.rivne', value: 'Рівненська область' },
  { key: 'filterOptions.regions.swietokrzyskie ', value: 'Свентокшиське воєводство' },
  { key: 'filterOptions.regions.smolensk', value: 'Смоленська область' },
  { key: 'filterOptions.regions.sumy', value: 'Сумська область' },
  { key: 'filterOptions.regions.silezian', value: 'Сілезьке воєводство' },
  { key: 'filterOptions.regions.ternopil', value: 'Тернопільська область' },
  { key: 'filterOptions.regions.kharkiv', value: 'Харківська область' },
  { key: 'filterOptions.regions.kherson', value: 'Херсонська область' },
  { key: 'filterOptions.regions.khmelnytskyi', value: 'Хмельницька область' },
  { key: 'filterOptions.regions.cherkasy', value: 'Черкаська область' },
  { key: 'filterOptions.regions.chernivtsi', value: 'Чернівецька область' },
  { key: 'filterOptions.regions.chernihiv', value: 'Чернігівська область' }
];

export const GenresSelectOptions: SongFilterOption[] = [
  { key: 'filterOptions.genres.spring', value: 'Весна' },
  { key: 'filterOptions.genres.wedding', value: 'Весілля' },
  { key: 'filterOptions.genres.harvest', value: 'Жнива' },
  { key: 'filterOptions.genres.trinity', value: 'Зелена неділя(Трійця)' },
  { key: 'filterOptions.genres.winter', value: 'Зима' },
  { key: 'filterOptions.genres.lullabies', value: 'Колискові' },
  { key: 'filterOptions.genres.kolyada', value: 'Колодій' },
  { key: 'filterOptions.genres.mowing', value: 'Косовиця' },
  { key: 'filterOptions.genres.kupalo', value: 'Купало' },
  { key: 'filterOptions.genres.lyrics', value: 'Лірика' },
  { key: 'filterOptions.genres.shrovetide', value: 'Мвсляна' },
  { key: 'filterOptions.genres.occasion', value: 'Оказія' },
  { key: 'filterOptions.genres.autumn', value: 'Осінь' },
  { key: 'filterOptions.genres.funeral', value: 'Похорон' },
  { key: 'filterOptions.genres.rantsyuvannya', value: 'Ранцювання' },
  { key: 'filterOptions.genres.christening', value: 'Родини: Хрестини' },
  { key: 'filterOptions.genres.christFeast', value: 'Родини: Застілля' }
];

export const regions = [
  'filterOptions.regions.ivanoFrankivsk',
  'filterOptions.regions.crimea',
  'filterOptions.regions.brest',
  'filterOptions.regions.bryansk',
  'filterOptions.regions.bilgorod',
  'filterOptions.regions.warmian',
  'filterOptions.regions.greaterPoland',
  'filterOptions.regions.volgograd',
  'filterOptions.regions.volyn',
  'filterOptions.regions.voronizh',
  'filterOptions.regions.vinnytsya',
  'filterOptions.regions.vitebsk',
  'filterOptions.regions.gomel',
  'filterOptions.regions.grodno',
  'filterOptions.regions.dnipro',
  'filterOptions.regions.donetsk',
  'filterOptions.regions.zhytomyr',
  'filterOptions.regions.zakarpattia',
  'filterOptions.regions.zaporizhia',
  'filterOptions.regions.westPomeranian',
  'filterOptions.regions.kyiv',
  'filterOptions.regions.krasnodar',
  'filterOptions.regions.kurks',
  'filterOptions.regions.kuyavianPomeranian',
  'filterOptions.regions.khirovohrad',
  'filterOptions.regions.lodz',
  'filterOptions.regions.luhansk',
  'filterOptions.regions.lviv',
  'filterOptions.regions.lublin',
  'filterOptions.regions.lubusk',
  'filterOptions.regions.masovian',
  'filterOptions.regions.lesserPoland',
  'filterOptions.regions.mykolayiv',
  'filterOptions.regions.mohyliv',
  'filterOptions.regions.minsk',
  'filterOptions.regions.kyivCiity',
  'filterOptions.regions.minskCity',
  'filterOptions.regions.sevastopolCiy',
  'filterOptions.regions.lowerSilesian',
  'filterOptions.regions.odesa',
  'filterOptions.regions.opole',
  'filterOptions.regions.poltava',
  'filterOptions.regions.pomeranian',
  'filterOptions.regions.pskov',
  'filterOptions.regions.subcarpathian',
  'filterOptions.regions.podlaskie',
  'filterOptions.regions.rostov',
  'filterOptions.regions.rivne',
  'filterOptions.regions.swietokrzyskie ',
  'filterOptions.regions.smolensk',
  'filterOptions.regions.sumy',
  'filterOptions.regions.silezian',
  'filterOptions.regions.ternopil',
  'filterOptions.regions.kharkiv',
  'filterOptions.regions.kherson',
  'filterOptions.regions.khmelnytskyi',
  'filterOptions.regions.cherkasy',
  'filterOptions.regions.chernivtsi',
  'filterOptions.regions.chernihiv'
];

export const genres = [
  'filterOptions.genres.spring',
  'filterOptions.genres.wedding',
  'filterOptions.genres.harvest',
  'filterOptions.genres.trinity',
  'filterOptions.genres.winter',
  'filterOptions.genres.lullabies',
  'filterOptions.genres.kolyada',
  'filterOptions.genres.mowing',
  'filterOptions.genres.kupalo',
  'filterOptions.genres.lyrics',
  'filterOptions.genres.shrovetide',
  'filterOptions.genres.occasion',
  'filterOptions.genres.autumn',
  'filterOptions.genres.funeral',
  'filterOptions.genres.rantsyuvannya',
  'filterOptions.genres.christening',
  'filterOptions.genres.christFeast'
];
