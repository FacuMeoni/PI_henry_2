import css from './Paginate.module.css'

const Paginate =({ currentPage, totalPages, paginate}) => {
  

  return (
    <div className={css.allPage_container}>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <span>{currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
    </div>
  );
}


export default Paginate