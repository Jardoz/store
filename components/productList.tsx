import { Product } from "@/types"
import { NoResults } from "@/components/noResults"
import { ProductCard } from "@/components/ui/productCard"

interface ProductListProps {
    title: string
    items: Product[]
}

export const ProductList: React.FC<ProductListProps> = ({
    title,
    items
}) => {
    const isEmptyItemsList = items.length === 0

  return (
    <div className="space-y-4">
      <h1 className="font-bold text-3xl">{title}</h1>
      {isEmptyItemsList && <NoResults />}
      <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {!isEmptyItemsList && items.map((item) => {
            return <ProductCard key={item.id} product={item} />
        })}
      </div>
    </div>
  );
}
