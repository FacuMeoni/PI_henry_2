import css from './Paginate.module.css'

const Paginate =({currentPage, totalPages, paginate}) => {
  

  return (
    <div className={css.allPage_container}>
      {totalPages && totalPages.map(page => (
        <button  key={page}onClick={() => paginate(page)} className={currentPage === page ? css.pageCurrent : css.page}>{page}</button>
      ))}
    </div>
  );
}


export default Paginate