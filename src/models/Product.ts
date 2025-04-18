import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    barcode: string;
    category: mongoose.Types.ObjectId;
    price: number;
    stock: number;
    minStock: number;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema({
    name: { type: String, required: true },
    barcode: { type: String, required: true, unique: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    minStock: { type: Number, required: true, default: 0 }
}, {
    timestamps: true
});

export default mongoose.model<IProduct>('Product', productSchema);