import { useState } from "react";
import { useNavigate } from "react-router";

const itemColumns = [
  { field: "Quantity", label: "Quantity", type: "number" },
  { field: "Unit", label: "Unit", type: "text" },
  { field: "Descriptions", label: "Item Description", type: "text" },
  { field: "Purpose", label: "Purpose", type: "text" },
  { field: "Remarks", label: "Remarks", type: "text" },
];

const supplierColumns = [
  { field: "SName", label: "Supplier Name", type: "text" },
  { field: "IDesc", label: "Item Description", type: "text" },
  { field: "Price", label: "Price", type: "number" },
  { field: "Remarks", label: "Remarks", type: "text" },
];

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const addButtonClass =
  "rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700";

const deleteButtonClass =
  "rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50";

function EditableTable({ rows, columns, onUpdate, numberLabel }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-300">
      <table className="w-full min-w-200 border-collapse text-left text-sm">
        <thead className="bg-blue-50 text-gray-800">
          <tr>
            <th
              scope="col"
              className="border-b border-r border-gray-300 px-4 py-3"
            >
              {numberLabel}
            </th>

            {columns.map((column) => (
              <th
                key={column.field}
                scope="col"
                className="border-b border-r border-gray-300 px-4 py-3 last:border-r-0"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.id}
              className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
            >
              <td className="border-r border-gray-300 px-4 py-3 text-center">
                {index + 1}
              </td>

              {columns.map((column) => (
                <td
                  key={column.field}
                  className="border-r border-gray-300 p-2 last:border-r-0"
                >
                  <input
                    type={column.type}
                    min={column.type === "number" ? "0" : undefined}
                    step={
                      column.type === "number"
                        ? column.field === "Price"
                          ? "0.01"
                          : "any"
                        : undefined
                    }
                    placeholder={column.label}
                    aria-label={`${numberLabel} ${index + 1}: ${column.label}`}
                    value={row[column.field]}
                    onChange={(event) =>
                      onUpdate(row.id, column.field, event.target.value)
                    }
                    className="w-full rounded border border-transparent bg-transparent px-2 py-2 text-gray-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </td>
              ))}
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="p-6 text-center text-gray-500"
              >
                No records. Add a row to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function PurchaseRequisitionForm() {
  const navigate = useNavigate();

  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const today = new Date()
  const referenceNumber = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  }).format(today).replace(/\//g, '')

  function getLocalDateKey() {
  const date = new Date();

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function getDailyCounter() {
  const date = getLocalDateKey();

  try {
    const saved = JSON.parse(
      localStorage.getItem("purchaseRequisitionCounter")
    );

    if (
      saved?.date === date &&
      Number.isSafeInteger(saved.count) &&
      saved.count >= 0
    ) {
      return saved;
    }
  } catch {
    // Start from zero if the saved data cannot be read.
  }

  return { date, count: 0 };
}

const [index, setIndex] = useState(() => getDailyCounter().count);

  const pname = "MST"

  const [rows, setRows] = useState([
    {
      id: 1,
      Quantity: 2,
      Unit: 2,
      Descriptions: "Monitor",
      Purpose: "Repair",
      Remarks: "None",
    },
  ]);

  const [supplierRows, setSupplierRows] = useState([
    {
      id: 1,
      SName: "Supplier Company A",
      IDesc: "New Monitor",
      Price: 12000,
      Remarks: "Repeat Service",
    },
    {
      id: 2,
      SName: "Supplier Company B",
      IDesc: "New Keyboard",
      Price: 6000,
      Remarks: "Repeat Service",
    },
    {
      id: 3,
      SName: "Supplier Company C",
      IDesc: "New Mouse",
      Price: 1000,
      Remarks: "Repeat Service",
    },
  ]);

  // Keep the two kinds of records grouped.
  const combined = {
    items: rows,
    suppliers: supplierRows,
  };

  const totalPrice = supplierRows.reduce(
    (total, supplier) => total + Number(supplier.Price || 0),
    0
  );

  const isAbove = totalPrice > 20000;

  const approver = isAbove
    ? "Executive Vice President"
    : "Sr. Director - HR & Admin";

  const formattedTotal = totalPrice.toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  function addRow() {
    setRows((previousRows) => [
      ...previousRows,
      {
        id: crypto.randomUUID(),
        Quantity: "",
        Unit: "",
        Descriptions: "",
        Purpose: "",
        Remarks: "",
      },
    ]);
  }

  function deleteRow() {
    setRows((previousRows) => previousRows.slice(0, -1));
  }

  function updateRow(id, field, value) {
    setRows((previousRows) =>
      previousRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  }

  function addSupplier() {
    setSupplierRows((previousRows) => [
      ...previousRows,
      {
        id: crypto.randomUUID(),
        SName: "",
        IDesc: "",
        Price: "",
        Remarks: "",
      },
    ]);
  }

  function deleteSupplier() {
    setSupplierRows((previousRows) => previousRows.slice(0, -1));
  }

  function updateSupplier(id, field, value) {
    setSupplierRows((previousRows) =>
      previousRows.map((supplier) =>
        supplier.id === id
          ? { ...supplier, [field]: value }
          : supplier
      )
    );
  }

  function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const dailyCounter = getDailyCounter();

  const submissionDate = new Date();

  const submissionReferenceDate = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  })
    .format(submissionDate)
    .replace(/\//g, "");

  const referenceNo =
    `QSI-BS/PUR-${submissionReferenceDate}-${dailyCounter.count}${pname}`;

  const order = {
    items: rows,
    suppliers: supplierRows,
    requestorName: formData.get("requestorName") ?? "",
    department: formData.get("department") ?? "",
    referenceNo,
    dateRequest: submissionDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    processedBy: formData.get("processedBy") ?? "",
    approvedBy: formData.get("approvedBy") ?? "",
    totalPrice,
    approver,
  };

  const nextCount = dailyCounter.count + 1;

  try {
    localStorage.setItem(
      "purchaseRequisitionCounter",
      JSON.stringify({
        date: dailyCounter.date,
        count: nextCount,
      })
    );
  } catch {
    alert("Could not save the request counter. Please try again.");
    return;
  }

  setIndex(nextCount);

  navigate("/purchaseOrder/PurchaseOrders", {
    state: { order },
  });
}

  return (
    <div className="main-container text-gray-900">
      <h1 className="mb-6 text-2xl font-bold">
        Purchase Requisition Form
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-4 rounded-lg border border-gray-300 bg-blue-50 p-5 md:grid-cols-2">
          <input
            name="requestorName"
            placeholder="Requestor Name"
            aria-label="Requestor Name"
            className={inputClass}
          />

          <input
            name="department"
            placeholder="Department"
            aria-label="Department"
            className={inputClass}
          />

          <input
            name="referenceNo"
            placeholder="Reference No."
            aria-label="Reference Number"
            defaultValue={`QSI-BS/PUR-${referenceNumber}-${index}${pname}`}
            className={inputClass}
          />

          <p className="self-center text-sm text-gray-700">Date: {" "}
            <input 
              name="DateRequested" 
              defaultValue={formattedDate} 
              aria-label="Formatted Date" 
              className="text-blue-700 font-bold" readOnly/>
          </p>
        </div>

        <section>
          <h2 className="mb-3 text-lg font-semibold">
            Requested Items
          </h2>

          <EditableTable
            rows={rows}
            columns={itemColumns}
            onUpdate={updateRow}
            numberLabel="Item No."
          />

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={addRow}
              className={addButtonClass}
            >
              + Add Item
            </button>

            <button
              type="button"
              onClick={deleteRow}
              disabled={rows.length === 0}
              className={deleteButtonClass}
            >
              Delete Item
            </button>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">
            Supplier Details
          </h2>

          <EditableTable
            rows={supplierRows}
            columns={supplierColumns}
            onUpdate={updateSupplier}
            numberLabel="Supplier No."
          />

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={addSupplier}
              className={addButtonClass}
            >
              + Add Supplier
            </button>

            <button
              type="button"
              onClick={deleteSupplier}
              disabled={supplierRows.length === 0}
              className={deleteButtonClass}
            >
              Delete Supplier
            </button>
          </div>

          <div
            aria-live="polite"
            className="mt-5 rounded-lg border border-gray-300 bg-blue-50 p-4"
          >
            <p className="text-lg font-bold">
              Total Price: {formattedTotal}
            </p>

            <p
              className={`mt-1 text-sm ${
                isAbove ? "text-red-600" : "text-blue-700"
              }`}
            >
              {isAbove ? "Above ₱20,000" : "₱20,000 or less"}
              {" — "}
              {approver} approval required.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 border-t border-gray-200 pt-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="processedBy"
              className="mb-2 block text-sm font-semibold"
            >
              Processed By:
            </label>

            <input
              id="processedBy"
              name="processedBy"
              placeholder="Name"
              className={inputClass}
            />

            <p className="mt-2 text-sm text-gray-600">
              Purchasing/Admin
            </p>
          </div>

          <div>
            <label
              htmlFor="approvedBy"
              className="mb-2 block text-sm font-semibold"
            >
              Approved By:
            </label>

            <input
              id="approvedBy"
              name="approvedBy"
              placeholder="Name"
              className={inputClass}
            />

            <p className="mt-2 text-sm font-semibold text-blue-700">
              {approver}
            </p>
          </div>
        </div>

        <button
          type="submit"
          onClick={() => setIndex(index + 1)}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Submit Purchase Request
        </button>
      </form>
    </div>
  );
}