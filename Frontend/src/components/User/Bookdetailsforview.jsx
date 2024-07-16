import React from 'react'

export default function Bookdetailsforview({bookinforview, closeViewInfoModel, Addtocart}) {
  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">View Book Information</h5>
                <button type="button" className="close" onClick={closeViewInfoModel} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <center><img src={bookinforview?.thumbnail} style={{height:'300px', width:'250px'}}></img></center>
                <h5>Name: {bookinforview?.name}</h5>
                <h5>Title: {bookinforview?.title}</h5>
                <h5>Author: {bookinforview?.author}</h5>
                <h5>Tags: {bookinforview?.tag}</h5>
                <h5>Pages Of Book: {bookinforview?.pageNo}</h5>
                <h4>Qty: 1</h4>
                <h3 style={{color:'Highlight'}}>Price: {bookinforview?.price} Rupees.</h3>
                <center><button className='btn btn-success' onClick={()=>Addtocart(bookinforview)}>Add to Cart</button></center>
            </div>
            <div className="modal-footer">
                <button type="button" className='btn btn-primary' onClick={() => closeViewInfoModel()}>Close</button>
            </div>
        </div>
    </div>
</div>
  )
}
