enum NavLinksEnum {
   About = 'header.nav-menu.about',
   Map = 'header.nav-menu.map',
   Education = 'header.nav-menu.educational-section',
   News = 'header.nav-menu.news',
   Expedition = 'header.nav-menu.expedition',
}

export const navLinksHeader = [
   {name: NavLinksEnum.About, route:'/about'},
  {name: NavLinksEnum.Education, route:'/science'},
  {name: NavLinksEnum.Expedition, route:'/expeditions'},
  {name: NavLinksEnum.Map, route:'/map'},
  {name: NavLinksEnum.News, route:'/news'}
]
