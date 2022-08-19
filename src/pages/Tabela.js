import React, { useState, useEffect } from "react";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";

export default function Tabela() {
  const url = "http://localhost:3005";

  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState({ key: "id", order: "asc" });

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 50,
  });

  const handleOnColumnSort =
    (data, setData, setSortBy) =>
    ({ key, order }) => {
      const dataSorted = [...data].sort((a, b) =>
        order === "asc" ? a[key] - b[key] : b[key] - a[key]
      );
      setSortBy({ key, order });
      setData([...dataSorted]);
    };

  useEffect(() => {
    fetch(url).then((data) =>
      data.json().then((data) =>
        setData(
          [...Array(data.length).keys()].map((i) => ({
            id: i,
            product: data[i].product,
            quantity: data[i].quantity,
            price: data[i].price,
            type: data[i].type,
            industry: data[i].industry,
            origin: data[i].origin,
          }))
        )
      )
    );
  }, []);

  console.log(data);

  return (
    <div style={{ width: "100%", height: "100vh", rowHeight: 45 }}>
      <AutoSizer>
        {({ width, height, rowHeight }) => (
          <List
            data={data}
            width={width}
            height={height}
            rowCount={data.length}
            rowHeight={rowHeight}
            sortBy={sortBy}
            onColumnSort={handleOnColumnSort(data, setData, setSortBy)}
            deferredMeasurementCache={cache}
            rowRenderer={({ index, key, style, parent }) => {
              return (
                <CellMeasurer
                  key={key}
                  cache={cache}
                  parent={parent}
                  columnIndex={0}
                  rowIndex={index}
                >
                  <div style={style}>
                    <table>
                      <thead>
                        <tr>
                          <th>Produto</th>
                          <th>Quantidade</th>
                          <th>Preço</th>
                          <th>Tipo</th>
                          <th>Induústria</th>
                          <th>Origem</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item) => (
                          <tr key={item.id}>
                            <td>{item.product}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.type}</td>
                            <td>{item.industry}</td>
                            <td>{item.origin}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CellMeasurer>
              );
            }}
          />
        )}
      </AutoSizer>
    </div>
  );
}
