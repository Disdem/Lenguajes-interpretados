import './style/index.css'

interface NavPageProps {
    page: number;
    setPage: (page: number) => void;
  }
  
  function NavPage(props: NavPageProps) {
    return (
      <header className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-primary"
          onClick={() => props.setPage(props.page - 1)}
          disabled={props.page === 1}
        >
          Previous
        </button>
        <h2 className="mx-5">Page: {props.page}</h2>
        <button
          className="btn btn-primary"
          onClick={() => props.setPage(props.page + 1)}
        >
          Next
        </button>
      </header>
    );
  }
  
  export default NavPage;