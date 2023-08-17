
export interface Article {
  id: number,
  title: string,
  text: string [],
  images: string[],
  location: string,
  eventDate: string,
  authors: Author[]
}

export interface Author {
  seekers: string [],
  editor: string,
  video: string,
  records:string
}

export const mockArticles: Article[] = [
  {
    id: 1,
    title: "Є.Єфремов провів майстеркласи для мішаного та чоловічого гурту у Торунському етнографічному музеї ",
    location: "Торунь, Польща",
    text: [`У Торуні, одному з найбільш привабливих міст Польщі, цієї неділі відбулися захоплюючі майстер-класи для мішаних та чоловічих гуртів, проведені відомим музикантом та харизматичним виконавцем Євгеном Єфремовим. Майстер-класи пройшли у приміщенні Торунського етнографічного музею і зібрали учасників із різних куточків країни, а також гостей з-за кордону.
    Знаменитий баритоніст і диригент, Євген Єфремов, відомий своєю талановитістю та великим досвідом у галузі музики та хорового мистецтва, приїхав до Торуня з метою поділитися своїми знаннями та вміннями з іншими музикантами. Мета майстер-класів полягала не лише у вивченні нових музичних технік та підвищенні виконавської майстерності, але й у сприянні творчому обміну і взаємному натхненню між учасниками.`, `Торунський етнографічний музей, відомий своєю великою зацікавленістю у збереженні та пропаганді традиційної культури та народних звичаїв, став ідеальним місцем для проведення цих майстер-класів. Учасники отримали можливість не лише попрактикуватися у творчих заняттях з визнаним музикантом, але й зазирнути в історію та традиції різних народів, представлених експозиціями музею.
    Перший день майстер-класів був присвячений мішаним гуртам. Учасники, що представляли різні хорові колективи, мали можливість працювати з Євгеном Єфремовим над технікою вокального виконання, виразності та драматургією в музиці. Харизматичний ведучий зміг підтримати та мотивувати кожного учасника, стимулюючи їхню творчість та висловлюючи слова похвали за те, що робить кожен хор особливим.`],
    images: ["../mockData/img.png", "../mockData/image21.png"],
    eventDate: '9-14 квітня 2022',
    authors: [
      {seekers: ["Поліщук Петро", "Поліщук Петро"], editor: "Поліщук Петро", video: "Поліщук Петро", records: "Поліщук Петро"}
    ]

  },
  {
    id: 2,
    title: "Є.Єфремов провів майстеркласи для мішаного та чоловічого гурту у Торунському етнографічному музеї ",
    location: "Торунь, Польща",
    text: [`У Торуні, одному з найбільш привабливих міст Польщі, цієї неділі відбулися захоплюючі майстер-класи для мішаних та чоловічих гуртів, проведені відомим музикантом та харизматичним виконавцем Євгеном Єфремовим. Майстер-класи пройшли у приміщенні Торунського етнографічного музею і зібрали учасників із різних куточків країни, а також гостей з-за кордону.
    Знаменитий баритоніст і диригент, Євген Єфремов, відомий своєю талановитістю та великим досвідом у галузі музики та хорового мистецтва, приїхав до Торуня з метою поділитися своїми знаннями та вміннями з іншими музикантами. Мета майстер-класів полягала не лише у вивченні нових музичних технік та підвищенні виконавської майстерності, але й у сприянні творчому обміну і взаємному натхненню між учасниками.`, `Торунський етнографічний музей, відомий своєю великою зацікавленістю у збереженні та пропаганді традиційної культури та народних звичаїв, став ідеальним місцем для проведення цих майстер-класів. Учасники отримали можливість не лише попрактикуватися у творчих заняттях з визнаним музикантом, але й зазирнути в історію та традиції різних народів, представлених експозиціями музею.
    Перший день майстер-класів був присвячений мішаним гуртам. Учасники, що представляли різні хорові колективи, мали можливість працювати з Євгеном Єфремовим над технікою вокального виконання, виразності та драматургією в музиці. Харизматичний ведучий зміг підтримати та мотивувати кожного учасника, стимулюючи їхню творчість та висловлюючи слова похвали за те, що робить кожен хор особливим.`],
    images: ["../mockData/img.png", "../mockData/image21.png"],
    eventDate: '9-14 квітня 2022',
    authors: [
      {seekers: ["Поліщук Петро", "Поліщук Петро"], editor: "Поліщук Петро", video: "Поліщук Петро", records: "Поліщук Петро"}
    ]

  },
  {
    id: 3,
    title: "Є.Єфремов провів майстеркласи для мішаного та чоловічого гурту у Торунському етнографічному музеї ",
    location: "Торунь, Польща",
    text: [`У Торуні, одному з найбільш привабливих міст Польщі, цієї неділі відбулися захоплюючі майстер-класи для мішаних та чоловічих гуртів, проведені відомим музикантом та харизматичним виконавцем Євгеном Єфремовим. Майстер-класи пройшли у приміщенні Торунського етнографічного музею і зібрали учасників із різних куточків країни, а також гостей з-за кордону.
    Знаменитий баритоніст і диригент, Євген Єфремов, відомий своєю талановитістю та великим досвідом у галузі музики та хорового мистецтва, приїхав до Торуня з метою поділитися своїми знаннями та вміннями з іншими музикантами. Мета майстер-класів полягала не лише у вивченні нових музичних технік та підвищенні виконавської майстерності, але й у сприянні творчому обміну і взаємному натхненню між учасниками.`, `Торунський етнографічний музей, відомий своєю великою зацікавленістю у збереженні та пропаганді традиційної культури та народних звичаїв, став ідеальним місцем для проведення цих майстер-класів. Учасники отримали можливість не лише попрактикуватися у творчих заняттях з визнаним музикантом, але й зазирнути в історію та традиції різних народів, представлених експозиціями музею.
    Перший день майстер-класів був присвячений мішаним гуртам. Учасники, що представляли різні хорові колективи, мали можливість працювати з Євгеном Єфремовим над технікою вокального виконання, виразності та драматургією в музиці. Харизматичний ведучий зміг підтримати та мотивувати кожного учасника, стимулюючи їхню творчість та висловлюючи слова похвали за те, що робить кожен хор особливим.`],
    images: ["../mockData/img.png", "../mockData/image21.png"],
    eventDate: '9-14 квітня 2022',
    authors: [
      {seekers: ["Поліщук Петро", "Поліщук Петро"], editor: "Поліщук Петро", video: "Поліщук Петро", records: "Поліщук Петро"}
    ]

  },
  {
    id: 4,
    title: "Є.Єфремов провів майстеркласи для мішаного та чоловічого гурту у Торунському етнографічному музеї ",
    location: "Торунь, Польща",
    text: [`У Торуні, одному з найбільш привабливих міст Польщі, цієї неділі відбулися захоплюючі майстер-класи для мішаних та чоловічих гуртів, проведені відомим музикантом та харизматичним виконавцем Євгеном Єфремовим. Майстер-класи пройшли у приміщенні Торунського етнографічного музею і зібрали учасників із різних куточків країни, а також гостей з-за кордону.
    Знаменитий баритоніст і диригент, Євген Єфремов, відомий своєю талановитістю та великим досвідом у галузі музики та хорового мистецтва, приїхав до Торуня з метою поділитися своїми знаннями та вміннями з іншими музикантами. Мета майстер-класів полягала не лише у вивченні нових музичних технік та підвищенні виконавської майстерності, але й у сприянні творчому обміну і взаємному натхненню між учасниками.`, `Торунський етнографічний музей, відомий своєю великою зацікавленістю у збереженні та пропаганді традиційної культури та народних звичаїв, став ідеальним місцем для проведення цих майстер-класів. Учасники отримали можливість не лише попрактикуватися у творчих заняттях з визнаним музикантом, але й зазирнути в історію та традиції різних народів, представлених експозиціями музею.
    Перший день майстер-класів був присвячений мішаним гуртам. Учасники, що представляли різні хорові колективи, мали можливість працювати з Євгеном Єфремовим над технікою вокального виконання, виразності та драматургією в музиці. Харизматичний ведучий зміг підтримати та мотивувати кожного учасника, стимулюючи їхню творчість та висловлюючи слова похвали за те, що робить кожен хор особливим.`],
    images: ["../mockData/img.png", "../mockData/image21.png"],
    eventDate: '9-14 квітня 2022',
    authors: [
      {seekers: ["Поліщук Петро", "Поліщук Петро"], editor: "Поліщук Петро", video: "Поліщук Петро", records: "Поліщук Петро"}
    ]

  },
]
