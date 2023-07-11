import s from './Paginator.module.scss'
import { ChevronLeftFilled, ChevronRightFilled } from '@fluentui/react-icons';

export const Paginator = ({page, pages, setPage}) => {
	const pagesArr = Array.from({length: pages}, (_, i) => i + 1)

	return (
		<div className={s.wrapper}>
			<button 
			className={s.prevBtn} 
			disabled={page === 1}
			onClick={() => setPage(page - 1)}>
				<span>
					<ChevronLeftFilled/>
				</span>
			</button>
			{pages > 6 ?  <div>
				{[...pagesArr].slice(
					(pages - 6 >= page ? page - 1 : pages- 5), 
					page + 5)
				.map(el => (
					<span 
					className={`${s.page} ${page === el && s.active}`} 
					key={'paginator_articles' + el}
					onClick={() => setPage(el)}>{el}</span>
				))}{(pages - 6 >= page)&&<>
				 {(pages - 7 >= page)&&<span>...</span>}
					<span 
						className={s.page} 
						onClick={() => setPage(pages)}>{pages}</span>
				</>}
			</div> :
				<div>
				{pagesArr.map(el => (
					<span 
					className={`${s.page} ${page === el && s.active}`} 
					key={'paginator_articles' + el}
					onClick={() => setPage(el)}>{el}</span>
				))} 
			</div>}
			<button 
			className={s.nextBtn} 
			disabled={page >= pages || !pages}
			onClick={() => setPage(page + 1)}>
				<span>
					<ChevronRightFilled/>
				</span>
			</button>
		</div>
	)
}
