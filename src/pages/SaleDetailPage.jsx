import React from 'react'
import { useParams } from 'react-router-dom'

const SaleDetailPage = () => {
  const { id } = useParams()

  return (
    <div className="sale-detail-page">
      <div className="container">
        <h1 className="text-serif">Sale Detail</h1>
        <p>Sale ID: {id}</p>
        <p>Detailed sale information will be displayed here.</p>
      </div>
    </div>
  )
}

export default SaleDetailPage
