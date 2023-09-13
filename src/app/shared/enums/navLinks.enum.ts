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

export enum ShareModalLink {
  text = 'share.dialog.text',
  copy = 'share.dialog.copy',
  facebook = 'share.dialog.facebook',
  telegram = 'share.dialog.telegram',
  instagram = 'share.dialog.instagram',
}

export enum errorPage {
  toHome = 'error.actions.block-btn',
  title = 'error.error-inner.title',
  text = 'error.error-inner.text'
}



