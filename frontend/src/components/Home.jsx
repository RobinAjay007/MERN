import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import { getProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./layouts/loader";
import Product from "./Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );

  useEffect(() => {
    if (error) {
      return toast.error(error);
    }

    dispatch(getProducts(null,null,null,null,currentPage));
  }, [error, dispatch,currentPage]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products"} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => {
                  return <Product col={3} key={product._id} product={product} />;
                })}
            </div>
          </section>
          {productsCount > 0 && productsCount > resPerPage ? (
            <div className="d-flex justify-content-center">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass={"page-item"}
                linkClass={"page-link"}
              />
            </div>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
