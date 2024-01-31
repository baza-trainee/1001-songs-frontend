import {ScienceCategory} from "../shared/interfaces/science.interface";

export const scienceCategories: ScienceCategory[] = [
  {
    title: "science.primary-categories.winters",
    url: 'https://1001-fe-data-storage.s3.eu-north-1.amazonaws.com/science-categories-images/science-categories-images/winters.jfif',
    routerLink: 'winters',
    genreGroups: [
      {
        title: "science.sub-categories.early-traditional",
        genres: [
          { title: "science.genres.childrens", query: "childrens" },
          { title: "science.genres.praise", query: "praise" },
          { title: "science.genres.carnival", query: "carnival" },
          { title: "science.genres.sowing", query: "sowing" },
        ]
      },
      {
        title: "science.sub-categories.late",
        genres: [
          { title: "science.genres.church-canticles", query: "church-canticles" },
          { title: "science.genres.christmas-psalms", query: "christmas-psalms" },
          { title: "science.genres.parody-carols", query: "parody-carols" },
          { title: "science.genres.nativity-scene", query: "nativity-scene" }
        ]
      }
    ]
  },
  {
    title: "science.primary-categories.spring",
    url: 'https://1001-fe-data-storage.s3.eu-north-1.amazonaws.com/science-categories-images/science-categories-images/spring.jfif',
    routerLink: "spring",
    genreGroups: [
      {
        title: "science.sub-categories.early-spring",
        genres: [
          { title: "science.genres.farewell-to-winter", query: "farewell-to-winter" },
          { title: "science.genres.spring-summons", query: "spring-summons" },
          { title: "science.genres.shrovetide-songs", query: "shrovetide-songs" },
          { title: "science.genres.welcoming-spring", query: "welcoming-spring" },
          { title: "science.genres.spring-rituals", query: "spring-rituals" },
          { title: "science.genres.porridge", query: "porridge" }
        ]
      },
      {
        title: "science.sub-categories.spring-equinox",
        genres: [
          { title: "science.genres.easter-morning-songs", query: "easter-morning-songs" },
          { title: "science.genres.spring-dances", query: "spring-dances" },
        ]
      },
      {
        title: "science.sub-categories.green-holidays",
        genres: [
          { title: "science.genres.arrow-funeral", query: "arrow-funeral" },
          { title: "science.genres.bush-walking", query: "bush-walking" },
          { title: "science.genres.mermaid-farewell", query: "mermaid-farewell" },
        ]
      }
    ]
  },
  {
    title: "science.primary-categories.summer",
    url: 'https://1001-fe-data-storage.s3.eu-north-1.amazonaws.com/science-categories-images/science-categories-images/summer.jfif',
    routerLink: "summer",
    genreGroups: [
      {
        title: "science.sub-categories.early-lyrical",
        genres: [
          { title: "science.genres.berry-picking", query: "berry-picking" },
          { title: "science.genres.harvest-thanks", query: "harvest-thanks" },
          { title: "science.genres.scything-songs", query: "scything-songs" },
          { title: "science.genres.mower-songs", query: "mower-songs" },
          { title: "science.genres.summer-feelings", query: "summer-feelings" },
          { title: "science.genres.before-harvest", query: "before-harvest" },
        ]
      },
      {
        title: "science.sub-categories.kupala-songs",
        genres: [
          { title: "science.genres.kupala", query: "kupala" },
        ]
      },
      {
        title: "science.sub-categories.harvest",
        genres: [
          { title: "science.genres.harvest", query: "harvest" },
        ]
      },
    ]
  },
  {
    title: "science.primary-categories.wedding",
    url: "https://1001-fe-data-storage.s3.eu-north-1.amazonaws.com/science-categories-images/science-categories-images/wedding.jfif",
    routerLink: "wedding",
    genreGroups: [
      {
        title: "science.sub-categories.pre-wedding-rituals",
        genres: [
          { title: "science.genres.pre-wedding", query: "pre-wedding" },
        ]
      },
      {
        title: "science.sub-categories.wedding-ceremony",
        genres: [
          { title: "science.genres.wedding-ceremony", query: "wedding-ceremony" },
        ]
      },
      {
        title: "science.sub-categories.post-wedding-customs",
        genres: [
          { title: "science.genres.post-wedding", query: "post-wedding" },
        ]
      },
    ]
  },
  {
    title: "science.primary-categories.family",
    url: "https://1001-fe-data-storage.s3.eu-north-1.amazonaws.com/science-categories-images/science-categories-images/family.jfif",
    routerLink: "family",
    genreGroups: [
      {
        title: "science.sub-categories.musical-decoration",
        genres: [
          { title: "science.genres.birth-christening", query: "birth-christening" },
        ]
      },
      {
        title: "science.sub-categories.maternal-folk",
        genres: [
          { title: "science.genres.lullabies", query: "lullabies" },
          { title: "science.genres.nursery-rhymes", query: "nursery-rhymes" },
          { title: "science.genres.singing-tales", query: "singing-tales" },
        ]
      },
      {
        title: "science.sub-categories.children's-repertoire",
        genres: [
          { title: "science.genres.carols", query: "carols" },
          { title: "science.genres.spring-songs", query: "spring-songs" },
          { title: "science.genres.occasional-choruses", query: "occasional-choruses" },
        ]
      },
    ]
  },
  {
    title: "science.primary-categories.ordinary-songs",
    url: "https://1001-fe-data-storage.s3.eu-north-1.amazonaws.com/science-categories-images/science-categories-images/ordinary.jfif",
    routerLink: "ordinary",
    genreGroups: [
      {
        title: "science.sub-categories.lyrical",
        genres: [
          { title: "science.genres.early", query: "early" },
          { title: "science.genres.polyphonic", query: "polyphonic" },
        ]
      },
      {
        title: "science.sub-categories.lyrical-songs-by-theme",
        genres: [
          { title: "science.genres.love", query: "love" },
          { title: "science.genres.family", query: "family" },
          { title: "science.genres.ballads", query: "ballads" },
          { title: "science.genres.chumak", query: "chumak" },
          { title: "science.genres.barge-hauler", query: "barge-hauler" },
          { title: "science.genres.hirer", query: "hirer" },
          { title: "science.genres.cossack-historical", query: "cossack-historical" },
          { title: "science.genres.recruit-soldier-drayman", query: "recruit-soldier-drayman" },
          { title: "science.genres.humorous", query: "humorous" },
        ]
      },
      {
        title: "science.sub-categories.kolomyiky",
        genres: [
          { title: "science.genres.kolomyiky", query: "kolomyiky" },
        ]
      },
      {
        title: "science.sub-categories.dances-choruses",
        genres: [
          { title: "science.genres.dances-choruses", query: "dances-choruses" },
        ]
      },
      {
        title: "science.sub-categories.later-era-song-creations",
        genres: [
          { title: "science.genres.folk-romances-cruel-romances", query: "folk-romances-cruel-romances" },
          { title: "science.genres.shooter-insurgent-songs", query: "shooter-insurgent-songs" },
          { title: "science.genres.psalms", query: "psalms" },
          { title: "science.genres.kychi", query: "kychi" },
          { title: "science.genres.chants", query: "chants" },
        ]
      },
    ]
  },
  {
    title: "science.primary-categories.musical-epos",
    url: "https://1001-fe-data-storage.s3.eu-north-1.amazonaws.com/science-categories-images/science-categories-images/epos.jfif",
    routerLink: "epos",
    genreGroups: [
      {
        title: "science.sub-categories.byliny",
        genres: [
          { title: "science.genres.kiev-cycle-byliny", query: "kiev-cycle-byliny" },
        ]
      },
      {
        title: "science.sub-categories.dumas",
        genres: [
          { title: "science.genres.kobzar-artistry", query: "kobzar-artistry" },
        ]
      },
      {
        title: "science.sub-categories.traditional-lyrical",
        genres: [
          { title: "science.genres.lyre-playing-psalms", query: "lyre-playing-psalms" },
        ]
      },
    ]
  },
  {
    title: "science.primary-categories.instrumental-music",
    url: "https://1001-fe-data-storage.s3.eu-north-1.amazonaws.com/science-categories-images/science-categories-images/instumental.jfif",
    routerLink: "instrumental",
    genreGroups: [
      {
        title: "science.sub-categories.ukrainian-traditional",
        genres: [
          { title: "science.genres.self-playing", query: "self-playing" },
          { title: "science.genres.wind", query: "wind" },
          { title: "science.genres.string", query: "string" },
          { title: "science.genres.percussion", query: "percussion" },
        ]
      },   {
        title: "science.sub-categories.instrumental-ensembles",
        genres: [
          { title: "science.genres.instrumental-ensembles", query: "instrumental-ensembles" },
        ]
      },   {
        title: "science.sub-categories.dance-music",
        genres: [
          { title: "science.genres.ritual-dances", query: "ritual-dances" },
          { title: "science.genres.influx-dances", query: "influx-dances" },
        ]
      },
    ]
  },
  {
    title: "science.primary-categories.funeral-music",
    url: "https://1001-fe-data-storage.s3.eu-north-1.amazonaws.com/science-categories-images/science-categories-images/funeral.jpg",
    routerLink: "funeral",
    genreGroups: [
      {
        title: "science.sub-categories.lamentation",
        genres: [
          { title: "science.genres.lamentation", query: "lamentation" },
        ]
      },
      {
        title: "science.sub-categories.memorial-psalms",
        genres: [
          { title: "science.genres.memorial-psalms", query: "memorial-psalms" },
        ]
      },
    ]
  }
]
