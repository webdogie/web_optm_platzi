import h from 'hyperscript'
import lozad from 'lozad'
import { fetchPopular, fetchHighestRated, fetchTrending } from './api'
import { modalListener } from './modal'
import CarouselItem from './CarouselItem'

// async function applyObserverImage() {
//   const targets = document.querySelectorAll('img.carousel-item__img')

//   const lazyLoad = target => {
//     const io = new IntersectionObserver((entries, observer) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           const img = entry.target
//           const src = img.getAttribute('data-src')

//           img.setAttribute('src', src)

//           observer.disconnect()
//         }
//       })
//     })

//     io.observe(target)
//   }

//   targets.forEach(lazyLoad)
// }

const SectionTitle = title => h('h3.carousel__title', title)

const Carousel = ({ itemsList = [] }) =>
  h(
    'section.carousel',
    h(
      'div.carousel__container',
      itemsList.map(
        ({
          attributes: { titles, posterImage, slug, youtubeVideoId, startDate },
        }) =>
          CarouselItem({
            imageUrl: posterImage.small,
            title: titles.en,
            subtitle: titles.ja_jp,
            slug,
            youtubeVideoId,
            startDate,
          })
      )
    )
  )

!(async function(document) {
  const mountReference = document.querySelector('.main').lastElementChild

  if (!mountReference) {
    return 0
  }

  const trending = await fetchTrending()
  const popular = await fetchPopular()
  const highestRated = await fetchHighestRated()

  mountReference
    .insertAdjacentElement('afterend', SectionTitle('Trending Anime'))
    .insertAdjacentElement(
      'afterend',
      Carousel({
        itemsList: trending,
      })
    )
    .insertAdjacentElement('afterend', SectionTitle('Highest Rated Anime'))
    .insertAdjacentElement(
      'afterend',
      Carousel({
        itemsList: highestRated,
      })
    )
    .insertAdjacentElement('afterend', SectionTitle('Most Popular Anime'))
    .insertAdjacentElement(
      'afterend',
      Carousel({
        itemsList: popular,
      })
    )
  // applyObserverImage()

  const carouseImages = document.querySelectorAll('.carousel-item__img')
  const observer = lozad(carouseImages)
  observer.observe()

  document.body.addEventListener('click', event => {
    //IMG A
    const tagName = event.target.tagName
    if (['IMG', 'A'].includes(tagName)) {
      modalListener(event)
    }

    // modalListener
  })

  // const allYouTubeLinks = document.querySelectorAll('.js-video-link-yt')
  // // console.log(allYouTubeLinks);
  // allYouTubeLinks.forEach(link => {
  //   link.addEventListener('click', modalListener)
  // })
})(document, window)
