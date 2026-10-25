import { useState } from 'react'
import { useLocation } from "react-router"
import "../../styles/purchaseOrder/purchaseOrder.css"

export default function PurchaseOrders() {

  const location = useLocation()
  const order = location.state?.order
  const telNO = "8856-77-00"

  const requestedItems = order?.items ?? []

  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const [rows, setRows] = useState(() =>
  requestedItems.map((item) => ({
    id: item.id,
    Item: item.Descriptions ?? "",
    Quantity: item.Quantity ?? "",
    IDesc: item.Descriptions ?? "",
    Unit: item.Unit ?? "",
    Purpose: item.Purpose ?? "",
    Remarks: item.Remarks ?? "",
    UPrice: "",
    Price: "",

  }))
)

function addRow() {
  setRows((previousRows) => [
    ...previousRows,
    {
      id: crypto.randomUUID(),
      Item: "",
      Quantity: "",
      IDesc: "",
      UPrice: "",
      Price: "",
    },
  ])
}

function deleteRow() {
  setRows((previousRows) => previousRows.slice(0, -1))
}

function updateRow(id, field, value) {
  setRows((previousRows) =>
    previousRows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    )
  )
}

  const inputClass =
    "w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"

  const tableInputClass =
    "w-full min-w-0 rounded border border-transparent bg-transparent px-2 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-blue-500 focus:bg-white"

  const headingClass =
    "border-b border-r border-gray-300 px-4 py-3 font-semibold last:border-r-0"

  const cellClass =
    "border-r border-gray-200 p-2 last:border-r-0"

  const addButtonClass =
    "rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"

  const deleteButtonClass =
    "rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"


  return (
    <div className="main-container w-full text-gray-900">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
          Procurement Workspace
        </p>

        <h1 className="mt-1 text-2xl font-bold">
          Purchase Order
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Enter supplier details, delivery information, and order items.
        </p>
      </div>

      <form
        onSubmit={(event) => event.preventDefault()}
        className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm"
      >
        {/* Document header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 bg-blue-50 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-blue-800">
              PURCHASE ORDER
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              Quantity Solution INC
            </p>
          </div>

          <p className="text-sm text-gray-600">
            {formattedDate}
          </p>
        </div>

        <div className="space-y-6 p-6">
          {/* Supplier, delivery, and PO information */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <section className="rounded-lg border border-gray-200 p-4">
              <h3 className="mb-4 text-sm font-bold text-blue-700">
                TO / SUPPLIER
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="supplierName"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Company Name
                  </label>

                  <input
                    id="supplierName"
                    name="supplierName"
                    type="text"
                    placeholder="Supplier Company Name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="supplierAddress"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Company Address
                  </label>

                  <textarea
                    id="supplierAddress"
                    name="supplierAddress"
                    rows={3}
                    placeholder="Supplier Company Address"
                    className={`${inputClass} resize-y`}
                  />
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-gray-200 p-4">
              <h3 className="mb-4 text-sm font-bold text-blue-700">
                SHIP TO
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="shipCompany"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Company Name
                  </label>

                  <input
                    id="shipCompany"
                    name="shipCompany"
                    type="text"
                    defaultValue={"Quantity Solutions Inc"}
                    placeholder="Company name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="shipAddress"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Delivery Address
                  </label>

                  <textarea
                    id="shipAddress"
                    name="shipAddress"
                    rows={3}
                    defaultValue={"5F Southkey Hub 2, Indo-China Drive, Northgate Cyberzone Filinvest, Alabang Muntinlupa City 1781"}
                    placeholder="Company Address"
                    className={`${inputClass} resize-y`}
                  />
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-gray-200 p-4">
              <h3 className="mb-4 text-sm font-bold text-blue-700">
                ORDER INFORMATION
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="poNumber"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    P.O. Number
                  </label>

                  <input
                    id="poNumber"
                    name="poNumber"
                    type="text"
                    defaultValue={order?.referenceNo ?? ""}
                    placeholder="e.g. QSI-PO-001"
                    className={inputClass}
                  />
                </div>

                <div>
                  <p className="mb-1.5 text-sm font-medium">
                    P.O. Date
                  </p>

                  <p className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-600">
                    {order?.dateRequest || "—"}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="telephone"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Telephone Number
                  </label>

                  <input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    defaultValue={telNO}
                    placeholder="Contact number"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="attentionTo"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Attention To
                  </label>

                  <input
                    id="attentionTo"
                    name="attentionTo"
                    type="text"
                    placeholder="Contact person"
                    className={inputClass}
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Ordered by */}
          <div className="grid grid-cols-1 items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="orderedBy"
                className="mb-1.5 block text-sm font-semibold"
              >
                Ordered By
              </label>

              <input
                id="orderedBy"
                name="orderedBy"
                type="text"
                defaultValue={order?.processedBy ?? ""}
                placeholder="Name"
                className={inputClass}
              />
            </div>
          </div>

          {/* Order items */}
          <section>
            <h3 className="mb-3 text-lg font-semibold">
              Order Items
            </h3>

            <div className="overflow-x-auto rounded-lg border border-gray-300">
              <table className="w-full min-w-212.5 border-collapse text-left text-sm">
                <thead className="bg-blue-50 text-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className={`${headingClass} w-20`}
                    >
                      Item ID
                    </th>

                    <th
                      scope="col"
                      className={`${headingClass} w-40`}
                    >
                      Item
                    </th>

                    <th
                      scope="col"
                      className={`${headingClass} w-28`}
                    >
                      Quantity
                    </th>

                    <th scope="col" className={headingClass}>
                      Description
                    </th>

                    <th
                      scope="col"
                      className={`${headingClass} w-36 text-right`}
                    >
                      Unit Price
                    </th>

                    <th
                      scope="col"
                      className={`${headingClass} w-36 text-right`}
                    >
                      Price (PHP)
                    </th>
                  </tr>
                </thead>

                <tbody>
                {rows.map((row, index) => (
                    <tr
                    key={row.id}
                    className="border-b border-solid border-gray-200 hover:bg-gray-50"
                    >
                    <td className={`${cellClass} text-center`}>
                        {index + 1}
                    </td>

                    <td className={cellClass}>
                        <input
                        type="text"
                        placeholder="Item name"
                        aria-label={`Item ${index + 1} name`}
                        className={tableInputClass}
                        value={row.Item}
                        onChange={(event) =>
                            updateRow(row.id, "Item", event.target.value)
                        }
                        />
                    </td>

                    <td className={cellClass}>
                        <input
                        type="number"
                        min="0"
                        step="any"
                        placeholder="0"
                        aria-label={`Item ${index + 1} quantity`}
                        className={`${tableInputClass} text-center`}
                        value={row.Quantity}
                        onChange={(event) =>
                            updateRow(row.id, "Quantity", event.target.value)
                        }
                        />
                    </td>

                    <td className={cellClass}>
                        <input
                        type="text"
                        placeholder="Item description"
                        aria-label={`Item ${index + 1} description`}
                        className={tableInputClass}
                        value={row.IDesc}
                        onChange={(event) =>
                            updateRow(row.id, "IDesc", event.target.value)
                        }
                        />
                    </td>

                    <td className={cellClass}>
                        <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        aria-label={`Item ${index + 1} unit price`}
                        className={`${tableInputClass} text-right`}
                        value={row.UPrice}
                        onChange={(event) =>
                            updateRow(row.id, "UPrice", event.target.value)
                        }
                        />
                    </td>

                    <td className={cellClass}>
                        <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        aria-label={`Item ${index + 1} price in pesos`}
                        className={`${tableInputClass} text-right`}
                        value={row.Price}
                        onChange={(event) =>
                            updateRow(row.id, "Price", event.target.value)
                        }
                        />
                    </td>
                    </tr>
                ))}

                {rows.length === 0 && (
                    <tr>
                    <td
                        colSpan={6}
                        className="p-6 text-center text-gray-500"
                    >
                        No items. Click Add Row to create one.
                    </td>
                    </tr>
                )}
                </tbody>
                <tfoot className="border-t border-gray-300 bg-gray-50">
                  <tr>
                    <td colSpan={4} />
                    <th scope="row" className="border-r border-gray-300 px-4 py-3 text-right font-semibold">
                      SUB-TOTAL
                    </th>
                    <td className="border-b border-gray-300 p-2">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        aria-label="Sub-total"
                        className="w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-right outline-none focus:border-blue-500"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={4} />
                    <th scope="row" className="border-r border-gray-300 px-4 py-3 text-right font-semibold">
                      TAX
                    </th>
                    <td className="border-b border-gray-300 p-2">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        aria-label="Tax"
                        className="w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-right outline-none focus:border-blue-500"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={4} />
                    <th scope="row" className="border-r border-gray-300 px-4 py-3 text-right font-bold">
                      TOTAL
                    </th>
                    <td className="border-b border-gray-300 p-2">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        aria-label="Total"
                        className="w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-right outline-none focus:border-blue-500"
                      />
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div className="ml-2 mb-1 mt-4 flex gap-3">
                <button
                type="button"
                onClick={addRow}
                className={addButtonClass}
                >
                + Add Row
                </button>

                <button
                type="button"
                onClick={deleteRow}
                disabled={rows.length === 0}
                className={deleteButtonClass}
                >
                Delete Row
                </button>
            </div>
            </div>
          </section>
        </div>

        <div className="w-full border-b border-gray-300"/>

        <div className="rounded-lg bg-blue-50 m-6">
          <div className="flex pl-2 pt-1 gap-4">
            <p><strong>APPROVED BY: </strong></p>
            <input type="text" defaultValue={order?.processedBy ?? ""} placeholder="name" className="w-80 px-3 py-1 rounded-lg border border-gray-300 bg-white"/>

            <p><strong>P.O ACKNOWLEDGED BY: </strong></p>
            <input type="text" placeholder="name" className="w-80 px-3 py-1 rounded-lg border border-gray-300 bg-white"/>
          </div>
          <div className="flex mb-2 ml-50 gap-75">
            <p><strong>BSD. Purchasing Section</strong></p>
            <p><strong>DATE: </strong><input type="text" defaultValue={order?.dateRequest ?? formattedDate} placeholder="Date" /></p>
          </div>

          <h1 className="pl-2"><strong>NOTICE:</strong></h1>
          <ol className="ml-8 list-decimal pb-1">
            <li>Please send two copies of your invoice</li>
            <li>Enter this order in accordance with the prices terms, delivery method, and specifications listed above</li>
            <li>Please notify us immediately if you are unable to deliver/ship as specified</li>
            <li>Seller must execute acknowledgement copy hereof and return to buyer</li>
          </ol>
        </div>
        <div className="mb-2 ml-6">
          <button type="submit" className="w-50 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
}