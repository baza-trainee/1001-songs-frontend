import Iexpediton from "src/app/shared/interfaces/expedition.interface";

export const testExpeditionsData: Iexpediton[] = [
    {
      id: '1',
      name: 'Благовіщеня',
      shortDescription: 'Зустріч Весни на Благовіщеня на Поліссі',
      mediaSrc: 'https://youtu.be/EDU2xd_bRvM',
      eventDate: '7 квітня 2006 року',
      location: 'Село Осівка, Житомирщина'
    }
  ];

export const testCategories: string[] = [
  'expeditions.categories.all',
  'expeditions.categories.exploring',
  'expeditions.categories.static',
  'expeditions.categories.interdisciplinary',
  'expeditions.categories.thematic',
  'expeditions.categories.video-of-ritual',
  'expeditions.categories.digital-rcord'
];
