//#f3e7c9 favorite color ni maam Marj
import "../styles/Dashboard.css";
import PurchaseOrderDetails from "./purchaseOrder/PurchaseOrderDetails";
import PurchaseOrders from "./purchaseOrder/PurchaseOrders";

const content = [
  {
    key: 1,
    label: "Awaiting your review",
    num: 0,
    label1: "QS Manager Queue",
  },
  {
    key: 2,
    label: "Pending Order Value",
    num: 0,
    label1: "Unapproved commitments",
  },
  {
    key: 3,
    label: "Oldest Request",
    num: 0,
    label1: "Ready for review",
  },
];

const sections = [
  {
    key: 4,
    title: "Review Queue",
    component: PurchaseOrders,
  },
  {
    key: 5,
    title: "Order Review",
    component: PurchaseOrderDetails,
  },
];

export default function DashboardPage() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>

        <p className="dashboard-content">
          Welcome to Quantity Solution INC
        </p>
      </header>

      <div className="content-cards-container">
        <section
          className="content-cards"
          aria-label="Dashboard overview"
        >
          {content.map((item) => (
            <article
              key={item.key}
              className="content-card-small"
            >
              <h2 className="dashboard-metric-label">
                {item.label}
              </h2>

              <p className="dashboard-metric-value">
                {item.num}
              </p>

              <p className="dashboard-metric-description">
                {item.label1}
              </p>
            </article>
          ))}
        </section>

        <div className="dashboard-review-grid">
          {sections.map((item) => {
            const PageContent = item.component;

            return (
              <section
                key={item.key}
                className="content-card-large"
                aria-labelledby={`dashboard-section-${item.key}`}
              >
                <div className="dashboard-section-header">
                  <h2 id={`dashboard-section-${item.key}`}>
                    {item.title}
                  </h2>

                  <input
                    className="dashboard-search"
                    type="search"
                    placeholder="Search order or supplier"
                    aria-label={`Search ${item.title}`}
                  />
                </div>

                <div className="dashboard-section-body">
                  <PageContent />
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}