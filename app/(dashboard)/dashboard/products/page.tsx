import ProductsHeader from "@/components/products/products-header";

interface ProductsPageProps {}

export default function ProductsPage({}: ProductsPageProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
      <ProductsHeader />
    </div>
  );
}
