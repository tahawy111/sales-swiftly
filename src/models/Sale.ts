import mongoose, { Document, Schema } from 'mongoose';

export interface ISale extends Document {
  products: {
    product: Schema.Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  cashier: Schema.Types.ObjectId;
  customer?: Schema.Types.ObjectId;
  paymentMethod: 'cash' | 'card';
  createdAt: Date;
}

const saleSchema = new Schema({
  products: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  cashier: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  paymentMethod: { type: String, enum: ['cash', 'card'], required: true }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export default mongoose.model<ISale>('Sale', saleSchema);