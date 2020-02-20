import React, { useEffect } from 'react'
import styles from './Carousel.module.scss'
import Swiper from 'swiper'

interface CatalogProps {
	items: object[]
}

export default function Catalog({ items }: CatalogProps) {
	useEffect(() => {
		const swiper = new Swiper('.swiper-container', {
			effect: 'slide',
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: 3,
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				480: {
					slidesPerView: 2,
					spaceBetween: 30,
				},
				640: {
					slidesPerView: 3,
					spaceBetween: 40,
				},
				960: {
					slidesPerView: 6,
					spaceBetween: 40,
				},
			},
			pagination: {
				el: '.swiper-pagination',
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		})
	}, [items])

	return (
		<section className={`${styles.carousel} swiper-container`}>
			<div className="swiper-wrapper">
				{items.map((item, index) => (
					<div className={`${styles.item} swiper-slide`} key={`Item-${index}`}>
						{item}
					</div>
				))}
			</div>
			<div className={`swiper-button-prev ${styles.navbutton}`}></div>
			<div className={`swiper-button-next ${styles.navbutton}`}></div>
			<div className={`swiper-pagination`}></div>
		</section>
	)
}
