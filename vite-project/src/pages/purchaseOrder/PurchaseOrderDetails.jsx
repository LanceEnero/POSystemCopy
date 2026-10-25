import { useNavigate, useParams } from 'react-router'


export default function PurchaseOrderDetails() {

    const {id} = useParams()
    const navigate = useNavigate()

    return(
        <>
            <div>
                 <h2>
                   PO number: {id}
                </h2>
                 <p>For Review</p>
                 <div>
                    <p>Order Name</p>
                    <p>Company Name</p>
                    <p>Pending Date</p>
                    <p>Price</p>
                 </div>
                 <button type="button" onClick={() => navigate("/purchaseOrder/PurchaseOrders")}>Back to Purchase Orders</button>
            </div>
        </>
    )
}