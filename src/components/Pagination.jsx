import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ items, itemsPerpage, parentCallback }) => {
    // Start with an empty list of items.
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = itemsPerpage;
  
    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(items.sort((a, b) => parseFloat(b.reviewId) - parseFloat(a.reviewId)).slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, items]);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };

    useEffect(() => {
      parentCallback(currentItems);
    }, [currentItems]);

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel=">>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="<<"
            renderOnZeroPageCount={null}
            containerClassName="flex justify-center items-center gap-1.5"
            pageLinkClassName="py-2 px-4 cursor-pointer rounded-md hover:bg-headingColor/[0.5] hover:text-white"
            previousClassName="py-2 px-4 cursor-pointer rounded-md hover:bg-headingColor/[0.5] hover:text-white"
            nextLinkClassName="py-2 px-4 cursor-pointer rounded-md hover:bg-headingColor/[0.5] hover:text-white"
            activeLinkClassName="bg-headingColor text-white"
        />
    )
}

export default Pagination;
