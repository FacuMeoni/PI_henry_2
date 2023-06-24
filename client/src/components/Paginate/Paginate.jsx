import css from './Paginate.module.css'

const Paginate =({currentPage, totalPages, paginate}) => {
  

  return (
    <div className={css.allPage_container}>
     <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}> Prev </button>
      {totalPages && totalPages.map(page => (
        <button  key={page}onClick={() => paginate(page)} className={currentPage === page ? css.pageCurrent : css.page}>{page}</button>
      ))}
      <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === 22}> Next </button>
    </div>
  );
}


export default Paginate