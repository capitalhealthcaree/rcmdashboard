import React, { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Table,
  Spinner,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

const ITEMS_PER_PAGE = 5;

const Appointment = () => {
  const [data, setData] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const tableData = data.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const paginationItems = [...Array(pageCount)].map((_, index) => {
    return (
      <PaginationItem key={index} active={currentPage === index}>
        <PaginationLink onClick={() => handleClick(index)}>
          {index + 1}
        </PaginationLink>
      </PaginationItem>
    );
  });

  useEffect(() => {
    async function fetchData() {
      const res = await api.get("/demo/getDemoRequestsByPagination");
      if (res.status === 200) {
        if (res && res.data && res.data.data) setData(res.data.data);
      }
    }
    fetchData();
  }, []);

  return data ? (
    <Table bordered>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Organization Name</th>
          <th>No. of Physicians</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((data, index) => (
          <tr key={index}>
            <td>{data.name}</td>
            <td>{data.phone}</td>
            <td>{data.email}</td>
            <td>{data.organization}</td>
            <td>{data.numberOfPhysicians}</td>
            <td>{data.message}</td>
          </tr>
        ))}
      </tbody>
      <Pagination>
        <PaginationItem disabled={currentPage === 0}>
          <PaginationLink
            previous
            onClick={() => handleClick(currentPage - 1)}
          />
        </PaginationItem>
        {paginationItems}
        <PaginationItem disabled={currentPage === pageCount - 1}>
          <PaginationLink next onClick={() => handleClick(currentPage + 1)} />
        </PaginationItem>
      </Pagination>
    </Table>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "10%",
      }}
    >
      <Spinner children={false} color="dark" />
      <h3 style={{ marginLeft: "10px" }}>Loading...</h3>
    </div>
  );
};
export default Appointment;
